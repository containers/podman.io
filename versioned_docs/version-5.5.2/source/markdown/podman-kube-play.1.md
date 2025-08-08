---
title: podman-kube-play
version: v5.5.2
---

% podman-kube-play 1

## NAME
podman-kube-play - Create containers, pods and volumes based on Kubernetes YAML

## SYNOPSIS
**podman kube play** [*options*] *file.yml|-|https://website.io/file.yml*

## DESCRIPTION
**podman kube play** reads in a structured file of Kubernetes YAML.  It recreates the containers, pods, or volumes described in the YAML.  Containers within a pod are then started, and the ID of the new Pod or the name of the new Volume is output. If the YAML file is specified as "-", then `podman kube play` reads the YAML file from stdin.
The input can also be a URL that points to a YAML file such as https://podman.io/demo.yml. `podman kube play` reads the YAML from the URL and create pods and containers from it.

Using the `--down` command line option, it is also capable of tearing down the pods created by a previous run of `podman kube play`.

Using the `--replace` command line option, it tears down the pods(if any) created by a previous run of `podman kube play` and recreate the pods with the Kubernetes YAML file.

Ideally the input file is created by the Podman command (see podman-kube-generate(1)).  This guarantees a smooth import and expected results.

Currently, the supported Kubernetes kinds are:

- Pod
- Deployment
- PersistentVolumeClaim
- ConfigMap
- Secret
- DaemonSet
- Job

`Kubernetes Pods or Deployments`

Only five volume types are supported by kube play, the *hostPath*, *emptyDir*, *configMap*, *persistentVolumeClaim*, and *image* volume types.

- When using the *hostPath* volume type, only the  *default (empty)*, *DirectoryOrCreate*, *Directory*, *FileOrCreate*, *File*, *Socket*, *CharDevice* and *BlockDevice* subtypes are supported. Podman interprets the value of *hostPath* *path* as a file path when it contains at least one forward slash, otherwise Podman treats the value as the name of a named volume.
- When using a *persistentVolumeClaim*, the value for *claimName* is the name for the Podman named volume.
- When using an *emptyDir* volume, Podman creates an anonymous volume that is attached the containers running inside the pod and is deleted once the pod is removed.
- When using an *configMap* volume, Podman creates an anonymous volume that is attached the containers running inside the pod and is deleted once the pod is removed.
- When using an *image* volume, Podman creates a read-only image volume with an empty subpath (the whole image is mounted). The image must already exist locally. It is supported in rootful mode only.

Note: The default restart policy for containers is `always`.  You can change the default by setting the `restartPolicy` field in the spec.

Note: When playing a kube YAML with init containers, the init container is created with init type value `once`. To change the default type, use the `io.podman.annotations.init.container.type` annotation to set the type to `always`.

Note: *hostPath* volume types created by kube play is given an SELinux shared label (z), bind mounts are not relabeled (use `chcon -t container_file_t -R <directory>`).

Note: To set userns of a pod, use the **io.podman.annotations.userns** annotation in the pod/deployment definition. For example, **io.podman.annotations.userns=keep-id** annotation tells Podman to create a user namespace where the current rootless user's UID\:GID are mapped to the same values in the container. This can be overridden with the `--userns` flag.

Note: Use the **io.podman.annotations.volumes-from** annotation to bind mount volumes of one container to another. You can mount volumes from multiple source containers to a target container. The source containers that belong to the same pod must be defined before the source container in the kube YAML. The annotation format is `io.podman.annotations.volumes-from/targetContainer: "sourceContainer1\:mountOpts1;sourceContainer2:mountOpts2"`.

Note: If the `:latest` tag is used, Podman attempts to pull the image from a registry. If the image was built locally with Podman or Buildah, it has `localhost` as the domain, in that case, Podman uses the image from the local store even if it has the `\:latest` tag.

Note: The command `podman play kube` is an alias of `podman kube play`, and performs the same function.

Note: The command `podman kube down` can be used to stop and remove pods or containers based on the same Kubernetes YAML used
by `podman kube play` to create them.

Note: To customize the name of the infra container created during `podman kube play`, use the **io.podman.annotations.infra.name** annotation in the pod definition. This annotation is automatically set when generating a kube yaml from a pod that was created with the `--infra-name` flag set.

Note: Use the **io.podman.annotations.pids-limit/$ctrname** annotation to configure the pod's pids limit.

`Kubernetes PersistentVolumeClaims`

A Kubernetes PersistentVolumeClaim represents a Podman named volume. Only the PersistentVolumeClaim name is required by Podman to create a volume. Kubernetes annotations can be used to make use of the available options for Podman volumes.

- volume.podman.io/driver
- volume.podman.io/device
- volume.podman.io/type
- volume.podman.io/uid
- volume.podman.io/gid
- volume.podman.io/mount-options
- volume.podman.io/import-source
- volume.podman.io/image

Use `volume.podman.io/import-source` to import the contents of the tarball (.tar, .tar.gz, .tgz, .bzip, .tar.xz, .txz) specified in the annotation's value into the created Podman volume

Kube play is capable of building images on the fly given the correct directory layout and Containerfiles. This
option is not available for remote clients, including Mac and Windows (excluding WSL2) machines, yet. Consider the following excerpt from a YAML file:
```
apiVersion: v1
kind: Pod
metadata:
...
spec:
  containers:
  - name: container
    image: foobar
...
```

If there is a directory named `foobar` in the current working directory with a file named `Containerfile` or `Dockerfile`,
Podman kube play builds that image and name it `foobar`.  An example directory structure for this example looks
like:
```
|- mykubefiles
    |- myplayfile.yaml
    |- foobar
         |- Containerfile
```

The build considers `foobar` to be the context directory for the build. If there is an image in local storage
called `foobar`, the image is not built unless the `--build` flag is used. Use `--build=false` to completely
disable builds.

Kube play supports CDI (Container Device Interface) device selectors to share
host devices (e.g. GPUs) with containers. The configuration format follows
Kubernetes extended resource management:
```
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: container
    resources:
      limits:
        nvidia.com/gpu=all: 1
```

To enable sharing host devices, analogous to using the `--device` flag Podman
kube supports a custom CDI selector: `podman.io/device=<host device path>`.

`Kubernetes ConfigMap`

Kubernetes ConfigMap can be referred as a source of environment variables or volumes in Pods or Deployments.
ConfigMaps aren't a standalone object in Podman; instead, when a container uses a ConfigMap, Podman creates environment variables or volumes as needed.

For example, the following YAML document defines a ConfigMap and then uses it in a Pod:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: foo
data:
    FOO: bar
---
apiVersion: v1
kind: Pod
metadata:
  name: foobar
spec:
  containers:
  - name: container-1
    image: foobar
    envFrom:
    - configMapRef:
        name: foo
        optional: false
```

and as a result environment variable `FOO` is set to `bar` for container `container-1`.

`Kubernetes Secret`

Kubernetes Secret represents a Podman named secret. The Kubernetes Secret is saved as a whole and may be referred to as a source of environment variables or volumes in Pods or Deployments.

For example, the following YAML document defines a Secret and then uses it in a Pod:

```
kind: Secret
apiVersion: v1
metadata:
  name: foo
data:
  foo: YmFy # base64 for bar
---
apiVersion: v1
kind: Pod
metadata:
  name: foobar
spec:
  containers:
  - name: container-1
    image: foobar
    env:
    - name: FOO
      valueFrom:
        secretKeyRef:
          name: foo
          key: foo
```

and as a result environment variable `FOO` is set to `bar` for container `container-1`.

`Automounting Volumes (deprecated)`

Note: The automounting annotation is deprecated. Kubernetes has [native support for image volumes](https://kubernetes.io/docs/tasks/configure-pod-container/image-volumes/) and that should be used rather than this podman-specific annotation.

An image can be automatically mounted into a container if the annotation `io.podman.annotations.kube.image.automount/$ctrname` is given. The following rules apply:

- The image must already exist locally.
- The image must have at least 1 volume directive.
- The path given by the volume directive will be mounted from the image into the container. For example, an image with a volume at `/test/test_dir` will have `/test/test_dir` in the image mounted to `/test/test_dir` in the container.
- Multiple images can be specified. If multiple images have a volume at a specific path, the last image specified trumps.
- The images are always mounted read-only.
- Images to mount are defined in the annotation "io.podman.annotations.kube.image.automount/$ctrname" as a semicolon-separated list. They are mounted into a single container in the pod, not the whole pod. The annotation can be specified for additional containers if additional mounts are required.

## OPTIONS


[//]: # (BEGIN included file options/annotation.container.md)
#### **--annotation**=*key=value*

Add an annotation to the container or pod. This option can be set multiple times.

[//]: # (END   included file options/annotation.container.md)


[//]: # (BEGIN included file options/authfile.md)
#### **--authfile**=*path*

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **[podman login](podman-login.1.md)**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

[//]: # (END   included file options/authfile.md)

#### **--build**

Build images even if they are found in the local storage. Use `--build=false` to completely disable builds. (This option is not available with the remote Podman client)

Note:  You  can also override the default isolation type by setting the BUILDAH_ISOLATION environment variable.  export BUILDAH_ISOLATION=oci. See podman-build.1.md for more information.


[//]: # (BEGIN included file options/cert-dir.md)
#### **--cert-dir**=*path*

Use certificates at *path* (\*.crt, \*.cert, \*.key) to connect to the registry. (Default: /etc/containers/certs.d)
For details, see **[containers-certs.d(5)](https://github.com/containers/image/blob/main/docs/containers-certs.d.5.md)**.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/cert-dir.md)

#### **--configmap**=*path*

Use Kubernetes configmap YAML at path to provide a source for environment variable values within the containers of the pod.  (This option is not available with the remote Podman client)

Note: The *--configmap* option can be used multiple times or a comma-separated list of paths can be used to pass multiple Kubernetes configmap YAMLs.
The YAML file may be in a multi-doc YAML format. But, it must container only configmaps

#### **--context-dir**=*path*

Use *path* as the build context directory for each image. Requires --build option be true. (This option is not available with the remote Podman client)


[//]: # (BEGIN included file options/creds.md)
#### **--creds**=*[username[\:password]]*

The [username[:password]] to use to authenticate with the registry, if required.
If one or both values are not supplied, a command line prompt appears and the
value can be entered. The password is entered without echo.

Note that the specified credentials are only used to authenticate against
target registries.  They are not used for mirrors or when the registry gets
rewritten (see `containers-registries.conf(5)`); to authenticate against those
consider using a `containers-auth.json(5)` file.

[//]: # (END   included file options/creds.md)

#### **--force**

Tear down the volumes linked to the PersistentVolumeClaims as part of --down

#### **--help**, **-h**

Print usage statement

#### **--ip**=*IP address*

Assign a static ip address to the pod. This option can be specified several times when kube play creates more than one pod.
Note: When joining multiple networks use the **--network name\:ip=\<ip\>** syntax.

#### **--log-driver**=*driver*

Set logging driver for all created containers.


[//]: # (BEGIN included file options/log-opt.md)
#### **--log-opt**=*name=value*

Logging driver specific options.

Set custom logging configuration. The following *name*s are supported:

**path**: specify a path to the log file
    (e.g. **--log-opt path=/var/log/container/mycontainer.json**);

**max-size**: specify a max size of the log file
    (e.g. **--log-opt max-size=10mb**);

**tag**: specify a custom log tag for the container
    (e.g. **--log-opt tag="{{.ImageName}}"**.
It supports the same keys as **podman inspect --format**.
This option is currently supported only by the **journald** log driver.

[//]: # (END   included file options/log-opt.md)

#### **--mac-address**=*MAC address*

Assign a static mac address to the pod. This option can be specified several times when kube play creates more than one pod.
Note: When joining multiple networks use the **--network name\:mac=\<mac\>** syntax.


[//]: # (BEGIN included file options/network.md)
#### **--network**=*mode*, **--net**

Set the network mode for the pod.

Valid _mode_ values are:

- **bridge[\:OPTIONS,...]**: Create a network stack on the default bridge. This is the default for rootful containers. It is possible to specify these additional options:
    - **alias=**_name_: Add network-scoped alias for the container.
    - **ip=**_IPv4_: Specify a static IPv4 address for this container.
    - **ip6=**_IPv6_: Specify a static IPv6 address for this container.
    - **mac=**_MAC_: Specify a static MAC address for this container.
    - **interface_name=**_name_: Specify a name for the created network interface inside the container.
    - **host_interface_name=**_name_: Specify a name for the created network interface outside the container.

    Any other options will be passed through to netavark without validation. This can be useful to pass arguments to netavark plugins.

    For example, to set a static ipv4 address and a static mac address, use `--network bridge\:ip=10.88.0.10,mac=44:33:22:11:00:99`.

- _\<network name or ID\>_**[\:OPTIONS,...]**: Connect to a user-defined network; this is the network name or ID from a network created by **[podman network create](podman-network-create.1.md)**. It is possible to specify the same options described under the bridge mode above. Use the **--network** option multiple times to specify additional networks. \
  For backwards compatibility it is also possible to specify comma-separated networks on the first **--network** argument, however this prevents you from using the options described under the bridge section above.

- **none**: Create a network namespace for the container but do not configure network interfaces for it, thus the container has no network connectivity.

- **container:**_id_: Reuse another container's network stack.

- **host**: Do not create a network namespace, the container uses the host's network. Note: The host mode gives the container full access to local system services such as D-bus and is therefore considered insecure.

- **ns:**_path_: Path to a network namespace to join.

- **private**: Create a new namespace for the container. This uses the **bridge** mode for rootful containers and **slirp4netns** for rootless ones.

- **slirp4netns[\:OPTIONS,...]**: use **slirp4netns**(1) to create a user network stack. It is possible to specify these additional options, they can also be set with `network_cmd_options` in containers.conf:

  - **allow_host_loopback=true|false**: Allow slirp4netns to reach the host loopback IP (default is 10.0.2.2 or the second IP from slirp4netns cidr subnet when changed, see the cidr option below). The default is false.
  - **mtu=**_MTU_: Specify the MTU to use for this network. (Default is `65520`).
  - **cidr=**_CIDR_: Specify ip range to use for this network. (Default is `10.0.2.0/24`).
  - **enable_ipv6=true|false**: Enable IPv6. Default is true. (Required for `outbound_addr6`).
  - **outbound_addr=**_INTERFACE_: Specify the outbound interface slirp binds to (ipv4 traffic only).
  - **outbound_addr=**_IPv4_: Specify the outbound ipv4 address slirp binds to.
  - **outbound_addr6=**_INTERFACE_: Specify the outbound interface slirp binds to (ipv6 traffic only).
  - **outbound_addr6=**_IPv6_: Specify the outbound ipv6 address slirp binds to.
  - **port_handler=rootlesskit**: Use rootlesskit for port forwarding. Default. \
  Note: Rootlesskit changes the source IP address of incoming packets to an IP address in the container network namespace, usually `10.0.2.100`. If the application requires the real source IP address, e.g. web server logs, use the slirp4netns port handler. The rootlesskit port handler is also used for rootless containers when connected to user-defined networks.
  - **port_handler=slirp4netns**: Use the slirp4netns port forwarding, it is slower than rootlesskit but preserves the correct source IP address. This port handler cannot be used for user-defined networks.

- **pasta[\:OPTIONS,...]**: use **pasta**(1) to create a user-mode networking
    stack. \
    This is the default for rootless containers and only supported in rootless mode. \
    By default, IPv4 and IPv6 addresses and routes, as well as the pod interface
    name, are copied from the host. Port forwarding preserves the original
    source IP address. Options described in pasta(1) can be specified as
    comma-separated arguments. \
    In terms of pasta(1) options, **--config-net** is given by default, in
    order to configure networking when the container is started, and
    **--no-map-gw** is also assumed by default, to avoid direct access from
    container to host using the gateway address. The latter can be overridden
    by passing **--map-gw** in the pasta-specific options (despite not being an
    actual pasta(1) option). \
    For better integration with DNS handling, **--dns-forward 169.254.1.1** is passed,
    and this address is added to resolv.conf(5) as first resolver. It is possible to pass
    **--dns-forward** explicitly in case a different IP address should be used.
    To make the `host.containers.internal` /etc/hosts entry work and allow connections
    to the host, **--map-guest-addr 169.254.1.2** is passed. Again, it can be set
    explicitly to choose a different IP address. \
    Also, **-t none** and **-u none** are passed if, respectively, no TCP or
    UDP port forwarding from host to container is configured (via Podman's
    **--publish** or by passing the pasta **-t**/**-u** options directly),
    to disable automatic port forwarding based on bound ports. Similarly, **-T none**
    and **-U none** are given to disable the same functionality from container to
    host. \
    All options can also be set in **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)**;
    see the `pasta_options` key under the network section in that file. \
    Some examples:
    - **pasta:--map-gw**: Allow the container to directly reach the host using the
        gateway address.
    - **pasta:--mtu,1500**: Specify a 1500 bytes MTU for the _tap_ interface in
        the container.
    - **pasta:--ipv4-only,-a,10.0.2.0,-n,24,-g,10.0.2.2,--dns-forward,10.0.2.3,-m,1500,--no-ndp,--no-dhcpv6,--no-dhcp**,
        equivalent to default slirp4netns(1) options: disable IPv6, assign
        `10.0.2.0/24` to the `tap0` interface in the container, with gateway
        `10.0.2.3`, enable DNS forwarder reachable at `10.0.2.3`, set MTU to 1500
        bytes, disable NDP, DHCPv6 and DHCP support.
    - **pasta:-I,tap0,--ipv4-only,-a,10.0.2.0,-n,24,-g,10.0.2.2,--dns-forward,10.0.2.3,--no-ndp,--no-dhcpv6,--no-dhcp**,
        equivalent to default slirp4netns(1) options with Podman overrides: same as
        above, but leave the MTU to 65520 bytes
    - **pasta:-t,auto,-u,auto,-T,auto,-U,auto**: enable automatic port forwarding
        based on observed bound ports from both host and container sides
    - **pasta:-T,5201**: enable forwarding of TCP port 5201 from container to
        host, using the loopback interface instead of the tap interface for improved
        performance

[//]: # (END   included file options/network.md)

When no network option is specified and *host* network mode is not configured in the YAML file, a new network stack is created and pods are attached to it making possible pod to pod communication.


[//]: # (BEGIN included file options/no-hostname.md)
#### **--no-hostname**

Do not create the _/etc/hostname_ file in the containers.

By default, Podman manages the _/etc/hostname_ file, adding the container's own hostname.  When the **--no-hostname** option is set, the image's _/etc/hostname_ will be preserved unmodified if it exists.

[//]: # (END   included file options/no-hostname.md)


[//]: # (BEGIN included file options/no-hosts.md)
#### **--no-hosts**

Do not modify the `/etc/hosts` file in the pod.

Podman assumes control over the pod's `/etc/hosts` file by
default and adds entries for the container's name (see **--name** option) and
hostname (see **--hostname** option), the internal `host.containers.internal`
and `host.docker.internal` hosts, as well as any hostname added using the
**--add-host** option. Refer to the **--add-host** option for details. Passing
**--no-hosts** disables this, so that the image's `/etc/hosts` file is kept
unmodified. The same can be achieved globally by setting *no_hosts=true* in
`containers.conf`.

[//]: # (END   included file options/no-hosts.md)

This option conflicts with host added in the Kubernetes YAML.

#### **--publish**=*[[ip:][hostPort]:]containerPort[/protocol]*

Define or override a port definition in the YAML file.

The lists of ports in the YAML file and the command line are merged. Matching is done by using the **containerPort** field.
If **containerPort** exists in both the YAML file and the option, the latter takes precedence.

#### **--publish-all**

Setting this option to `true` will expose all ports to the host,
even if only specified via **containerPort** in the K8 YAML.
In terms of which port will be exposed, **--publish** has higher priority than **hostPort**, has higher priority than
**containerPort**.

If set to `false` (which is the default), only ports defined via **hostPort**
or **--publish** are published on the host.

#### **--quiet**, **-q**

Suppress output information when pulling images

#### **--replace**

Tears down the pods created by a previous run of `kube play` and recreates the pods. This option is used to keep the existing pods up to date based upon the Kubernetes YAML.

#### **--seccomp-profile-root**=*path*

Directory path for seccomp profiles (default: "/var/lib/kubelet/seccomp"). (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

#### **--start**

Start the pod after creating it, set to false to only create it.


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)


[//]: # (BEGIN included file options/userns.container.md)
#### **--userns**=*mode*

Set the user namespace mode for the container.

If `--userns` is not set, the default value is determined as follows.
- If `--pod` is set, `--userns` is ignored and the user namespace of the pod is used.
- If the environment variable **PODMAN_USERNS** is set its value is used.
- If `userns` is specified in `containers.conf` this value is used.
- Otherwise, `--userns=host` is assumed.

`--userns=""` (i.e., an empty string) is an alias for `--userns=host`.

This option is incompatible with **--gidmap**, **--uidmap**, **--subuidname** and **--subgidname**.

Rootless user --userns=Key mappings:

Key                     | Host User | Container User
------------------------|-----------|---------------------
auto                    | $UID      | nil (Host User UID is not mapped into container.)
host                    | $UID      | 0 (Default User account mapped to root user in container.)
keep-id                 | $UID      | $UID (Map user account to same UID within container.)
keep-id\:uid=200,gid=210 | $UID      | 200:210 (Map user account to specified UID, GID value within container.)
nomap                   | $UID      | nil (Host User UID is not mapped into container.)

Valid _mode_ values are:

**auto**[\:_OPTIONS,..._]: automatically create a unique user namespace.

* `rootful mode`: The `--userns=auto` flag requires that the user name __containers__ be specified in the /etc/subuid and /etc/subgid files, with an unused range of subordinate user IDs that Podman containers are allowed to allocate.

  	   Example: `containers:2147483647:2147483648`.

* `rootless mode`: The users range from the /etc/subuid and /etc/subgid files will be used. Note running a single container without using --userns=auto will use the entire range of UIDs and not allow further subdividing. See subuid(5).

Podman allocates unique ranges of UIDs and GIDs from the `containers` subordinate user IDs. The size of the ranges is based on the number of UIDs required in the image. The number of UIDs and GIDs can be overridden with the `size` option.

The option `--userns=keep-id` uses all the subuids and subgids of the user.
The option `--userns=nomap` uses all the subuids and subgids of the user except the user's own ID.
Using `--userns=auto` when starting new containers does not work as long as any containers exist that were started with `--userns=nomap` or `--userns=keep-id` without limiting the user namespace size.

  Valid `auto` options:

  - *gidmapping*=_CONTAINER\_GID\:HOST\_GID\:SIZE_: to force a GID mapping to be present in the user namespace.
  - *size*=_SIZE_: to specify an explicit size for the automatic user namespace. e.g. `--userns=auto\:size=8192`. If `size` is not specified, `auto` estimates a size for the user namespace.
  - *uidmapping*=_CONTAINER\_UID\:HOST\_UID\:SIZE_: to force a UID mapping to be present in the user namespace.

The host UID and GID in *gidmapping* and *uidmapping* can optionally be prefixed with the `@` symbol.
In this case, podman will look up the intermediate ID corresponding to host ID and it will map the found intermediate ID to the container id.
For details see **--uidmap**.

**container:**_id_: join the user namespace of the specified container.

**host** or **""** (empty string): run in the user namespace of the caller. The processes running in the container have the same privileges on the host as any other process launched by the calling user.

**keep-id**: creates a user namespace where the current user's UID\:GID are mapped to the same values in the container. For containers created by root, the current mapping is created into a new user namespace.

  Valid `keep-id` options:

  - *uid*=UID: override the UID inside the container that is used to map the current user to.
  - *gid*=GID: override the GID inside the container that is used to map the current user to.
  - *size*=SIZE: override the size of the configured user namespace.  It is useful to not saturate all the available IDs.  Not supported when running as root.

**nomap**: creates a user namespace where the current rootless user's UID\:GID are not mapped into the container. This option is not allowed for containers created by the root user.

**ns:**_namespace_: run the pod in the given existing user namespace.

[//]: # (END   included file options/userns.container.md)

#### **--wait**, **-w**

Run pods and containers in the foreground. Default is false.

At  any time you can run `podman pod ps` in another shell to view a list of
the running pods and containers.

When  attached  in the tty mode, you can kill the pods and containers by pressing
Ctrl-C or receiving any other interrupt signals.

All pods, containers, and volumes created with `podman kube play` is removed
upon exit.

## EXAMPLES

Recreate the pod and containers described in the specified host YAML file.
```
$ podman kube play demo.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Recreate the pod and containers specified in a YAML file sent to stdin.
```
$ cat demo.yml | podman kube play -
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Tear down the pod and containers as described in the specified YAML file.
```
$  podman kube play --down demo.yml
Pods stopped:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
Pods removed:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Provide multiple configmap files as sources for environment variables within the specified pods and containers.
```
$ podman kube play demo.yml --configmap configmap-foo.yml,configmap-bar.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6

$ podman kube play demo.yml --configmap configmap-foo.yml --configmap configmap-bar.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Create a pod connected to two networks with a static ip on each.
```
$ podman kube play demo.yml --network net1\:ip=10.89.1.5 --network net2\:ip=10.89.10.10
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```
Please take into account that networks must be created first using podman-network-create(1).

Create and teardown from a URL pointing to a YAML file.
```
$ podman kube play https://podman.io/demo.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6

$ podman kube play --down https://podman.io/demo.yml
Pods stopped:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
Pods removed:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```
`podman kube play --down` does not work with a URL if the YAML file the URL points to
has been changed or altered.


[//]: # (BEGIN included file ../../kubernetes_support.md)
# Podman Kube Play Support

This document outlines the kube yaml fields that are currently supported by the **podman kube play** command.

Note: **N/A** means that the option cannot be supported in a single-node Podman environment.

## Pod Fields

| Field                                               | Support |
|-----------------------------------------------------|---------|
| containers                                          | ✅      |
| initContainers                                      | ✅      |
| imagePullSecrets                                    | no      |
| enableServiceLinks                                  | no      |
| os\.name                                            | no      |
| volumes                                             | ✅      |
| nodeSelector                                        | N/A     |
| nodeName                                            | N/A     |
| affinity\.nodeAffinity                              | N/A     |
| affinity\.podAffinity                               | N/A     |
| affinity\.podAntiAffinity                           | N/A     |
| tolerations\.key                                    | N/A     |
| tolerations\.operator                               | N/A     |
| tolerations\.effect                                 | N/A     |
| tolerations\.tolerationSeconds                      | N/A     |
| schedulerName                                       | N/A     |
| runtimeClassName                                    | no      |
| priorityClassName                                   | no      |
| priority                                            | no      |
| topologySpreadConstraints\.maxSkew                  | N/A     |
| topologySpreadConstraints\.topologyKey              | N/A     |
| topologySpreadConstraints\.whenUnsatisfiable        | N/A     |
| topologySpreadConstraints\.labelSelector            | N/A     |
| topologySpreadConstraints\.minDomains               | N/A     |
| restartPolicy                                       | ✅      |
| terminationGracePeriodSeconds                       | ✅      |
| activeDeadlineSeconds                               | no      |
| readinessGates\.conditionType                       | no      |
| hostname                                            | ✅      |
| setHostnameAsFQDN                                   | no      |
| subdomain                                           | no      |
| hostAliases\.hostnames                              | ✅      |
| hostAliases\.ip                                     | ✅      |
| dnsConfig\.nameservers                              | ✅      |
| dnsConfig\.options\.name                            | ✅      |
| dnsConfig\.options\.value                           | ✅      |
| dnsConfig\.searches                                 | ✅      |
| dnsPolicy                                           | no      |
| hostNetwork                                         | ✅      |
| hostPID                                             | ✅      |
| hostIPC                                             | ✅      |
| shareProcessNamespace                               | ✅      |
| serviceAccountName                                  | no      |
| automountServiceAccountToken                        | no      |
| securityContext\.runAsUser                          | ✅      |
| securityContext\.runAsNonRoot                       | no      |
| securityContext\.runAsGroup                         | ✅      |
| securityContext\.supplementalGroups                 | ✅      |
| securityContext\.fsGroup                            | no      |
| securityContext\.fsGroupChangePolicy                | no      |
| securityContext\.seccompProfile\.type               | no      |
| securityContext\.seccompProfile\.localhostProfile   | no      |
| securityContext\.seLinuxOptions\.level              | ✅      |
| securityContext\.seLinuxOptions\.role               | ✅      |
| securityContext\.seLinuxOptions\.type               | ✅      |
| securityContext\.seLinuxOptions\.user               | ✅      |
| securityContext\.sysctls\.name                      | ✅      |
| securityContext\.sysctls\.value                     | ✅      |
| securityContext\.windowsOptions\.gmsaCredentialSpec | no      |
| securityContext\.windowsOptions\.hostProcess        | no      |
| securityContext\.windowsOptions\.runAsUserName      | no      |

## Container Fields

| Field                                               | Support |
|-----------------------------------------------------|---------|
| name                                                | ✅      |
| image                                               | ✅      |
| imagePullPolicy                                     | ✅      |
| command                                             | ✅      |
| args                                                | ✅      |
| workingDir                                          | ✅      |
| ports\.containerPort                                | ✅      |
| ports\.hostIP                                       | ✅      |
| ports\.hostPort                                     | ✅      |
| ports\.name                                         | ✅      |
| ports\.protocol                                     | ✅      |
| env\.name                                           | ✅      |
| env\.value                                          | ✅      |
| env\.valueFrom\.configMapKeyRef\.key                | ✅      |
| env\.valueFrom\.configMapKeyRef\.name               | ✅      |
| env\.valueFrom\.configMapKeyRef\.optional           | ✅      |
| env\.valueFrom\.fieldRef                            | ✅      |
| env\.valueFrom\.resourceFieldRef                    | ✅      |
| env\.valueFrom\.secretKeyRef\.key                   | ✅      |
| env\.valueFrom\.secretKeyRef\.name                  | ✅      |
| env\.valueFrom\.secretKeyRef\.optional              | ✅      |
| envFrom\.configMapRef\.name                         | ✅      |
| envFrom\.configMapRef\.optional                     | ✅      |
| envFrom\.prefix                                     | no      |
| envFrom\.secretRef\.name                            | ✅      |
| envFrom\.secretRef\.optional                        | ✅      |
| volumeMounts\.mountPath                             | ✅      |
| volumeMounts\.name                                  | ✅      |
| volumeMounts\.mountPropagation                      | no      |
| volumeMounts\.readOnly                              | ✅      |
| volumeMounts\.subPath                               | ✅      |
| volumeMounts\.subPathExpr                           | no      |
| volumeDevices\.devicePath                           | no      |
| volumeDevices\.name                                 | no      |
| resources\.limits                                   | ✅      |
| resources\.requests                                 | ✅      |
| lifecycle\.postStart                                | no      |
| lifecycle\.preStop                                  | no      |
| terminationMessagePath                              | no      |
| terminationMessagePolicy                            | no      |
| livenessProbe                                       | ✅      |
| readinessProbe                                      | no      |
| startupProbe                                        | no      |
| securityContext\.runAsUser                          | ✅      |
| securityContext\.runAsNonRoot                       | no      |
| securityContext\.runAsGroup                         | ✅      |
| securityContext\.readOnlyRootFilesystem             | ✅      |
| securityContext\.procMount                          | ✅      |
| securityContext\.privileged                         | ✅      |
| securityContext\.allowPrivilegeEscalation           | ✅      |
| securityContext\.capabilities\.add                  | ✅      |
| securityContext\.capabilities\.drop                 | ✅      |
| securityContext\.seccompProfile\.type               | no      |
| securityContext\.seccompProfile\.localhostProfile   | no      |
| securityContext\.seLinuxOptions\.level              | ✅      |
| securityContext\.seLinuxOptions\.role               | ✅      |
| securityContext\.seLinuxOptions\.type               | ✅      |
| securityContext\.seLinuxOptions\.user               | ✅      |
| securityContext\.windowsOptions\.gmsaCredentialSpec | no      |
| securityContext\.windowsOptions\.hostProcess        | no      |
| securityContext\.windowsOptions\.runAsUserName      | no      |
| stdin                                               | no      |
| stdinOnce                                           | no      |
| tty                                                 | no      |

## PersistentVolumeClaim Fields

| Field               | Support |
|---------------------|---------|
| volumeName          | no      |
| storageClassName    | ✅      |
| volumeMode          | no      |
| accessModes         | ✅      |
| selector            | no      |
| resources\.limits   | no      |
| resources\.requests | ✅      |

## ConfigMap Fields

| Field      | Support |
|------------|---------|
| binaryData | ✅      |
| data       | ✅      |
| immutable  | no      |

## Deployment Fields

| Field                                   | Support                                               |
|-----------------------------------------|-------------------------------------------------------|
| replicas                                | ✅ (the actual replica count is ignored and set to 1) |
| selector                                | ✅                                                    |
| template                                | ✅                                                    |
| minReadySeconds                         | no                                                    |
| strategy\.type                          | no                                                    |
| strategy\.rollingUpdate\.maxSurge       | no                                                    |
| strategy\.rollingUpdate\.maxUnavailable | no                                                    |
| revisionHistoryLimit                    | no                                                    |
| progressDeadlineSeconds                 | no                                                    |
| paused                                  | no                                                    |

## DaemonSet Fields

| Field                                   | Support |
|-----------------------------------------|---------|
| selector                                | ✅      |
| template                                | ✅      |
| minReadySeconds                         | no      |
| strategy\.type                          | no      |
| strategy\.rollingUpdate\.maxSurge       | no      |
| strategy\.rollingUpdate\.maxUnavailable | no      |
| revisionHistoryLimit                    | no      |

## Job Fields

| Field                   | Support                          |
|-------------------------|----------------------------------|
| activeDeadlineSeconds   | no                               |
| selector                | no (automatically set by k8s)    |
| template                | ✅                               |
| backoffLimit            | no                               |
| completionMode          | no                               |
| completions             | no (set to 1 with kube generate) |
| manualSelector          | no                               |
| parallelism             | no (set to 1 with kube generate) |
| podFailurePolicy        | no                               |
| suspend                 | no                               |
| ttlSecondsAfterFinished | no                               |

[//]: # (END   included file ../../kubernetes_support.md)

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-kube(1)](podman-kube.1.md)**, **[podman-kube-down(1)](podman-kube-down.1.md)**, **[podman-network-create(1)](podman-network-create.1.md)**, **[podman-kube-generate(1)](podman-kube-generate.1.md)**, **[podman-build(1)](podman-build.1.md)**, **[containers-certs.d(5)](https://github.com/containers/image/blob/main/docs/containers-certs.d.5.md)**
