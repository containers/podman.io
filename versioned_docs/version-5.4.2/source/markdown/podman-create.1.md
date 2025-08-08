---
title: podman-create
version: v5.4.2
---

% podman-create 1

## NAME
podman\-create - Create a new container

## SYNOPSIS
**podman create** [*options*] *image* [*command* [*arg* ...]]

**podman container create** [*options*] *image* [*command* [*arg* ...]]

## DESCRIPTION

Creates a writable container layer over the specified image and prepares it for
running the specified command. The container ID is then printed to STDOUT. This
is similar to **podman run -d** except the container is never started. Use the
**podman start** *container* command to start the container at any point.

The initial status of the container created with **podman create** is 'created'.

Default settings for flags are defined in `containers.conf`. Most settings for
remote connections use the server's containers.conf, except when documented in
man pages.

## IMAGE

  The image is specified using transport\:path format. If no transport is specified, the `docker` (container registry)
transport is used by default. For remote Podman, including Mac and Windows (excluding WSL2) machines, `docker` is the only allowed transport.

  **dir:**_path_
  An existing local directory _path_ storing the manifest, layer tarballs and signatures as individual files. This
is a non-standardized format, primarily useful for debugging or noninvasive container inspection.

    $ podman save --format docker-dir fedora -o /tmp/fedora
    $ podman create dir:/tmp/fedora echo hello

  **docker://**_docker-reference_ (Default)
  An image reference stored in  a remote container image registry. Example: "quay.io/podman/stable:latest".
The reference can include a path to a specific registry; if it does not, the
registries listed in registries.conf is queried to find a matching image.
By default, credentials from `podman login` (stored at
$XDG_RUNTIME_DIR/containers/auth.json by default) is used to authenticate;
otherwise it falls back to using credentials in $HOME/.docker/config.json.

    $ podman create registry.fedoraproject.org/fedora\:latest echo hello

  **docker-archive:**_path_[**:**_docker-reference_]
An image stored in the `docker save` formatted file. _docker-reference_ is only used when creating such a
file, and it must not contain a digest.

    $ podman save --format docker-archive fedora -o /tmp/fedora
    $ podman create docker-archive:/tmp/fedora echo hello

  **docker-daemon:**_docker-reference_
  An image in _docker-reference_ format stored in the docker daemon internal storage. The _docker-reference_ can also be an image ID (docker-daemon\:algo\:digest).

    $ sudo docker pull fedora
    $ sudo podman create docker-daemon\:docker.io/library/fedora echo hello

  **oci-archive:**_path_**:**_tag_
  An image in a directory compliant with the "Open Container Image Layout Specification" at the specified _path_
and specified with a _tag_.

    $ podman save --format oci-archive fedora -o /tmp/fedora
    $ podman create oci-archive:/tmp/fedora echo hello

## OPTIONS


[//]: # (BEGIN included file options/add-host.md)
#### **--add-host**=*hostname[;hostname[;...]]*:*ip*

Add a custom host-to-IP mapping to the container's `/etc/hosts` file.

The option takes one or multiple semicolon-separated hostnames to be mapped to
a single IPv4 or IPv6 address, separated by a colon. It can also be used to
overwrite the IP addresses of hostnames Podman adds to `/etc/hosts` by default
(also see the **--name** and **--hostname** options). This option can be
specified multiple times to add additional mappings to `/etc/hosts`. It
conflicts with the **--no-hosts** option and conflicts with *no_hosts=true* in
`containers.conf`.

Instead of an IP address, the special flag *host-gateway* can be given. This
resolves to an IP address the container can use to connect to the host. The
IP address chosen depends on your network setup, thus there's no guarantee that
Podman can determine the *host-gateway* address automatically, which will then
cause Podman to fail with an error message. You can overwrite this IP address
using the *host_containers_internal_ip* option in *containers.conf*.

The *host-gateway* address is also used by Podman to automatically add the
`host.containers.internal` and `host.docker.internal` hostnames to `/etc/hosts`.
You can prevent that by either giving the **--no-hosts** option, or by setting
*host_containers_internal_ip="none"* in *containers.conf*. If no *host-gateway*
address was configured manually and Podman fails to determine the IP address
automatically, Podman will silently skip adding these internal hostnames to
`/etc/hosts`. If Podman is running in a virtual machine using `podman machine`
(this includes Mac and Windows hosts), Podman will silently skip adding the
internal hostnames to `/etc/hosts`, unless an IP address was configured
manually; the internal hostnames are resolved by the gvproxy DNS resolver
instead.

Podman will use the `/etc/hosts` file of the host as a basis by default, i.e.
any hostname present in this file will also be present in the `/etc/hosts` file
of the container. A different base file can be configured using the
*base_hosts_file* config in `containers.conf`.

[//]: # (END   included file options/add-host.md)


[//]: # (BEGIN included file options/annotation.container.md)
#### **--annotation**=*key=value*

Add an annotation to the container. This option can be set multiple times.

[//]: # (END   included file options/annotation.container.md)


[//]: # (BEGIN included file options/arch.md)
#### **--arch**=*ARCH*
Override the architecture, defaults to hosts, of the image to be pulled. For example, `arm`.
Unless overridden, subsequent lookups of the same image in the local storage matches this architecture, regardless of the host.

[//]: # (END   included file options/arch.md)


[//]: # (BEGIN included file options/attach.md)
#### **--attach**, **-a**=*stdin* | *stdout* | *stderr*

Attach to STDIN, STDOUT or STDERR.

In foreground mode (the default when **-d**
is not specified), **podman run** can start the process in the container
and attach the console to the process's standard input, output, and
error. It can even pretend to be a TTY (this is what most command-line
executables expect) and pass along signals. The **-a** option can be set for
each of **stdin**, **stdout**, and **stderr**.

[//]: # (END   included file options/attach.md)


[//]: # (BEGIN included file options/authfile.md)
#### **--authfile**=*path*

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **[podman login](podman-login.1.md)**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

[//]: # (END   included file options/authfile.md)


[//]: # (BEGIN included file options/blkio-weight.md)
#### **--blkio-weight**=*weight*

Block IO relative weight. The _weight_ is a value between **10** and **1000**.

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/blkio-weight.md)


[//]: # (BEGIN included file options/blkio-weight-device.md)
#### **--blkio-weight-device**=*device:weight*

Block IO relative device weight.

[//]: # (END   included file options/blkio-weight-device.md)


[//]: # (BEGIN included file options/cap-add.md)
#### **--cap-add**=*capability*

Add Linux capabilities.

[//]: # (END   included file options/cap-add.md)


[//]: # (BEGIN included file options/cap-drop.md)
#### **--cap-drop**=*capability*

Drop Linux capabilities.

[//]: # (END   included file options/cap-drop.md)


[//]: # (BEGIN included file options/cgroup-conf.md)
#### **--cgroup-conf**=*KEY=VALUE*

When running on cgroup v2, specify the cgroup file to write to and its value. For example **--cgroup-conf=memory.high=1073741824** sets the memory.high limit to 1GB.

[//]: # (END   included file options/cgroup-conf.md)


[//]: # (BEGIN included file options/cgroup-parent.md)
#### **--cgroup-parent**=*path*

Path to cgroups under which the cgroup for the container is created. If the
path is not absolute, the path is considered to be relative to the cgroups path
of the init process. Cgroups are created if they do not already exist.

[//]: # (END   included file options/cgroup-parent.md)


[//]: # (BEGIN included file options/cgroupns.md)
#### **--cgroupns**=*mode*

Set the cgroup namespace mode for the container.

- **host**: use the host's cgroup namespace inside the container.
- **container:**_id_: join the namespace of the specified container.
- **private**: create a new cgroup namespace.
- **ns:**_path_: join the namespace at the specified path.

If the host uses cgroups v1, the default is set to **host**. On cgroups v2, the default is **private**.

[//]: # (END   included file options/cgroupns.md)


[//]: # (BEGIN included file options/cgroups.md)
#### **--cgroups**=*how*

Determines whether the container creates CGroups.

Default is **enabled**.

The **enabled** option creates a new cgroup under the cgroup-parent.
The **disabled** option forces the container to not create CGroups, and thus conflicts with CGroup options (**--cgroupns** and **--cgroup-parent**).
The **no-conmon** option disables a new CGroup only for the **conmon** process.
The **split** option splits the current CGroup in two sub-cgroups: one for conmon and one for the container payload. It is not possible to set **--cgroup-parent** with **split**.

[//]: # (END   included file options/cgroups.md)


[//]: # (BEGIN included file options/chrootdirs.md)
#### **--chrootdirs**=*path*

Path to a directory inside the container that is treated as a `chroot` directory.
Any Podman managed file (e.g., /etc/resolv.conf, /etc/hosts, etc/hostname) that is mounted into the root directory is mounted into that location as well.
Multiple directories are separated with a comma.

[//]: # (END   included file options/chrootdirs.md)


[//]: # (BEGIN included file options/cidfile.write.md)
#### **--cidfile**=*file*

Write the container ID to *file*.  The file is removed along with the container, except
when used with podman --remote run on detached containers.

[//]: # (END   included file options/cidfile.write.md)


[//]: # (BEGIN included file options/conmon-pidfile.md)
#### **--conmon-pidfile**=*file*

Write the pid of the **conmon** process to a file. As **conmon** runs in a separate process than Podman, this is necessary when using systemd to restart Podman containers.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/conmon-pidfile.md)


[//]: # (BEGIN included file options/cpu-period.md)
#### **--cpu-period**=*limit*

Set the CPU period for the Completely Fair Scheduler (CFS), which is a
duration in microseconds. Once the container's CPU quota is used up, it will not
be scheduled to run until the current period ends. Defaults to 100000
microseconds.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpu-period.md)


[//]: # (BEGIN included file options/cpu-quota.md)
#### **--cpu-quota**=*limit*

Limit the CPU Completely Fair Scheduler (CFS) quota.

Limit the container's CPU usage. By default, containers run with the full
CPU resource. The limit is a number in microseconds. If a number is provided,
the container is allowed to use that much CPU time until the CPU period
ends (controllable via **--cpu-period**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpu-quota.md)


[//]: # (BEGIN included file options/cpu-rt-period.md)
#### **--cpu-rt-period**=*microseconds*

Limit the CPU real-time period in microseconds.

Limit the container's Real Time CPU usage. This option tells the kernel to restrict the container's Real Time CPU usage to the period specified.

This option is only supported on cgroups V1 rootful systems.

[//]: # (END   included file options/cpu-rt-period.md)


[//]: # (BEGIN included file options/cpu-rt-runtime.md)
#### **--cpu-rt-runtime**=*microseconds*

Limit the CPU real-time runtime in microseconds.

Limit the containers Real Time CPU usage. This option tells the kernel to limit the amount of time in a given CPU period Real Time tasks may consume. Ex:
Period of 1,000,000us and Runtime of 950,000us means that this container can consume 95% of available CPU and leave the remaining 5% to normal priority tasks.

The sum of all runtimes across containers cannot exceed the amount allotted to the parent cgroup.

This option is only supported on cgroups V1 rootful systems.

[//]: # (END   included file options/cpu-rt-runtime.md)


[//]: # (BEGIN included file options/cpu-shares.md)
#### **--cpu-shares**, **-c**=*shares*

CPU shares (relative weight).

By default, all containers get the same proportion of CPU cycles. This
proportion can be modified by changing the container's CPU share weighting
relative to the combined weight of all the running containers.
Default weight is **1024**.

The proportion only applies when CPU-intensive processes are running.
When tasks in one container are idle, other containers can use the
left-over CPU time. The actual amount of CPU time varies depending on
the number of containers running on the system.

For example, consider three containers, one has a cpu-share of 1024 and
two others have a cpu-share setting of 512. When processes in all three
containers attempt to use 100% of CPU, the first container receives
50% of the total CPU time. If a fourth container is added with a cpu-share
of 1024, the first container only gets 33% of the CPU. The remaining containers
receive 16.5%, 16.5% and 33% of the CPU.

On a multi-core system, the shares of CPU time are distributed over all CPU
cores. Even if a container is limited to less than 100% of CPU time, it can
use 100% of each individual CPU core.

For example, consider a system with more than three cores.
If the container _C0_ is started with **--cpu-shares=512** running one process,
and another container _C1_ with **--cpu-shares=1024** running two processes,
this can result in the following division of CPU shares:

| PID  |  container  | CPU     | CPU share    |
| ---- | ----------- | ------- | ------------ |
| 100  |  C0         | 0       | 100% of CPU0 |
| 101  |  C1         | 1       | 100% of CPU1 |
| 102  |  C1         | 2       | 100% of CPU2 |

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpu-shares.md)


[//]: # (BEGIN included file options/cpus.container.md)
#### **--cpus**=*number*

Number of CPUs. The default is *0.0* which means no limit. This is shorthand
for **--cpu-period** and **--cpu-quota**, therefore the option cannot be specified with
**--cpu-period** or **--cpu-quota**.

On some systems, changing the CPU limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpus.container.md)


[//]: # (BEGIN included file options/cpuset-cpus.md)
#### **--cpuset-cpus**=*number*

CPUs in which to allow execution. Can be specified as a comma-separated list
(e.g. **0,1**), as a range (e.g. **0-3**), or any combination thereof
(e.g. **0-3,7,11-15**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpuset-cpus.md)


[//]: # (BEGIN included file options/cpuset-mems.md)
#### **--cpuset-mems**=*nodes*

Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on
NUMA systems.

If there are four memory nodes on the system (0-3), use **--cpuset-mems=0,1**
then processes in the container only uses memory from the first
two memory nodes.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpuset-mems.md)


[//]: # (BEGIN included file options/decryption-key.md)
#### **--decryption-key**=*key[\:passphrase]*

The [key[:passphrase]] to be used for decryption of images. Key can point to keys and/or certificates. Decryption is tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.

[//]: # (END   included file options/decryption-key.md)


[//]: # (BEGIN included file options/device.md)
#### **--device**=*host-device[:container-device][\:permissions]*

Add a host device to the container. Optional *permissions* parameter
can be used to specify device permissions by combining
**r** for read, **w** for write, and **m** for **mknod**(2).

Example: **--device=/dev/sdc:/dev/xvdc\:rwm**.

Note: if *host-device* is a symbolic link then it is resolved first.
The container only stores the major and minor numbers of the host device.

Podman may load kernel modules required for using the specified
device. The devices that Podman loads modules for when necessary are:
/dev/fuse.

In rootless mode, the new device is bind mounted in the container from the host
rather than Podman creating it within the container space. Because the bind
mount retains its SELinux label on SELinux systems, the container can get
permission denied when accessing the mounted device. Modify SELinux settings to
allow containers to use all device labels via the following command:

$ sudo setsebool -P  container_use_devices=true

[//]: # (END   included file options/device.md)

Note: if the user only has access rights via a group, accessing the device
from inside a rootless container fails. Use the `--group-add keep-groups`
flag to pass the user's supplementary group access into the container.


[//]: # (BEGIN included file options/device-cgroup-rule.md)
#### **--device-cgroup-rule**=*"type major\:minor mode"*

Add a rule to the cgroup allowed devices list. The rule is expected to be
in the format specified in the Linux kernel documentation
[admin-guide/cgroup-v1/devices](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v1/devices.html):
- *type*: `a` (all), `c` (char), or `b` (block);
- *major* and *minor*: either a number, or `*` for all;
- *mode*: a composition of `r` (read), `w` (write), and `m` (mknod(2)).

[//]: # (END   included file options/device-cgroup-rule.md)


[//]: # (BEGIN included file options/device-read-bps.md)
#### **--device-read-bps**=*path:rate*

Limit read rate (in bytes per second) from a device (e.g. **--device-read-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-read-bps.md)


[//]: # (BEGIN included file options/device-read-iops.md)
#### **--device-read-iops**=*path:rate*

Limit read rate (in IO operations per second) from a device (e.g. **--device-read-iops=/dev/sda:1000**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-read-iops.md)


[//]: # (BEGIN included file options/device-write-bps.md)
#### **--device-write-bps**=*path:rate*

Limit write rate (in bytes per second) to a device (e.g. **--device-write-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-write-bps.md)


[//]: # (BEGIN included file options/device-write-iops.md)
#### **--device-write-iops**=*path:rate*

Limit write rate (in IO operations per second) to a device (e.g. **--device-write-iops=/dev/sda:1000**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-write-iops.md)


[//]: # (BEGIN included file options/disable-content-trust.md)
#### **--disable-content-trust**

This is a Docker-specific option to disable image verification to a container
registry and is not supported by Podman. This option is a NOOP and provided
solely for scripting compatibility.

[//]: # (END   included file options/disable-content-trust.md)


[//]: # (BEGIN included file options/dns.md)
#### **--dns**=*ipaddr*

Set custom DNS servers.

This option can be used to override the DNS
configuration passed to the container. Typically this is necessary when the
host DNS configuration is invalid for the container (e.g., **127.0.0.1**). When this
is the case the **--dns** flag is necessary for every run.

The special value **none** can be specified to disable creation of _/etc/resolv.conf_ in the container by Podman.
The _/etc/resolv.conf_ file in the image is used without changes.

[//]: # (END   included file options/dns.md)

This option cannot be combined with **--network** that is set to **none** or **container:**_id_.


[//]: # (BEGIN included file options/dns-option.container.md)
#### **--dns-option**=*option*

Set custom DNS options. Invalid if using **--dns-option** with **--network** that is set to **none** or **container:**_id_.

[//]: # (END   included file options/dns-option.container.md)


[//]: # (BEGIN included file options/dns-search.container.md)
#### **--dns-search**=*domain*

Set custom DNS search domains. Invalid if using **--dns-search** with **--network** that is set to **none** or **container:**_id_.
Use **--dns-search=.** to remove the search domain.

[//]: # (END   included file options/dns-search.container.md)


[//]: # (BEGIN included file options/entrypoint.md)
#### **--entrypoint**=*"command"* | *'["command", "arg1", ...]'*

Override the default ENTRYPOINT from the image.

The ENTRYPOINT of an image is similar to a COMMAND
because it specifies what executable to run when the container starts, but it is
(purposely) more difficult to override. The ENTRYPOINT gives a container its
default nature or behavior. When the ENTRYPOINT is set, the
container runs as if it were that binary, complete with default options. More options can be
passed in via the COMMAND. But, if a user wants to run
something else inside the container, the **--entrypoint** option allows a new
ENTRYPOINT to be specified.

Specify multi option commands in the form of a json string.

[//]: # (END   included file options/entrypoint.md)


[//]: # (BEGIN included file options/env.md)
#### **--env**, **-e**=*env*

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

[//]: # (END   included file options/env.md)

See [**Environment**](#environment) note below for precedence and examples.


[//]: # (BEGIN included file options/env-file.md)
#### **--env-file**=*file*

Read in a line-delimited file of environment variables.

[//]: # (END   included file options/env-file.md)

See [**Environment**](#environment) note below for precedence and examples.


[//]: # (BEGIN included file options/env-host.md)
#### **--env-host**

Use host environment inside of the container. See **Environment** note below for precedence. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/env-host.md)


[//]: # (BEGIN included file options/env-merge.md)
#### **--env-merge**=*env*

Preprocess default environment variables for the containers. For example
if image contains environment variable `hello=world` user can preprocess
it using `--env-merge hello=${hello}-some` so new value is `hello=world-some`.

Please note that if the environment variable `hello` is not present in the image,
then it'll be replaced by an empty string and so using `--env-merge hello=${hello}-some`
would result in the new value of `hello=-some`, notice the leading `-` delimiter.

[//]: # (END   included file options/env-merge.md)


[//]: # (BEGIN included file options/expose.md)
#### **--expose**=*port[/protocol]*

Expose a port or a range of ports (e.g. **--expose=3300-3310**).
The protocol can be `tcp`, `udp` or `sctp` and if not given `tcp` is assumed.
This option matches the EXPOSE instruction for image builds and has no effect on
the actual networking rules unless **-P/--publish-all** is used to forward to all
exposed ports from random host ports. To forward specific ports from the host
into the container use the **-p/--publish** option instead.

[//]: # (END   included file options/expose.md)


[//]: # (BEGIN included file options/gidmap.container.md)
#### **--gidmap**=*[flags]container_uid\:from_uid[\:amount]*

Run the container in a new user namespace using the supplied GID mapping. This
option conflicts with the **--userns** and **--subgidname** options. This
option provides a way to map host GIDs to container GIDs in the same way as
__--uidmap__ maps host UIDs to container UIDs. For details see __--uidmap__.

Note: the **--gidmap** option cannot be called in conjunction with the **--pod** option as a gidmap cannot be set on the container level when in a pod.

[//]: # (END   included file options/gidmap.container.md)


[//]: # (BEGIN included file options/gpus.md)
#### **--gpus**=*ENTRY*

GPU devices to add to the container ('all' to pass all GPUs) Currently only
Nvidia devices are supported.

[//]: # (END   included file options/gpus.md)


[//]: # (BEGIN included file options/group-add.md)
#### **--group-add**=*group* | *keep-groups*

Assign additional groups to the primary user running within the container process.

- `keep-groups` is a special flag that tells Podman to keep the supplementary group access.

Allows container to use the user's supplementary group access. If file systems or
devices are only accessible by the rootless user's group, this flag tells the OCI
runtime to pass the group access into the container. Currently only available
with the `crun` OCI runtime. Note: `keep-groups` is exclusive, other groups cannot be specified
with this flag. (Not available for remote commands, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/group-add.md)


[//]: # (BEGIN included file options/group-entry.md)
#### **--group-entry**=*ENTRY*

Customize the entry that is written to the `/etc/group` file within the container when `--user` is used.

The variables $GROUPNAME, $GID, and $USERLIST are automatically replaced with their value at runtime if present.

[//]: # (END   included file options/group-entry.md)


[//]: # (BEGIN included file options/health-cmd.md)
#### **--health-cmd**=*"command"* | *'["command", "arg1", ...]'*

Set or alter a healthcheck command for a container. The command is a command to be executed inside the
container that determines the container health. The command is required for other healthcheck options
to be applied. A value of **none** disables existing healthchecks.

Multiple options can be passed in the form of a JSON array; otherwise, the command is interpreted
as an argument to **/bin/sh -c**.

[//]: # (END   included file options/health-cmd.md)


[//]: # (BEGIN included file options/health-interval.md)
#### **--health-interval**=*interval*

Set an interval for the healthchecks. An _interval_ of **disable** results in no automatic timer setup. The default is **30s**.

[//]: # (END   included file options/health-interval.md)


[//]: # (BEGIN included file options/health-log-destination.md)
#### **--health-log-destination**=*directory_path*

Set the destination of the HealthCheck log. Directory path, local or events_logger (local use container state file) (Default: local)

* `local`: (default) HealthCheck logs are stored in overlay containers. (For example: `$runroot/healthcheck.log`)
* `directory`: creates a log file named `<container-ID>-healthcheck.log` with HealthCheck logs in the specified directory.
* `events_logger`: The log will be written with logging mechanism set by events_logger. It also saves the log to a default directory, for performance on a system with a large number of logs.

[//]: # (END   included file options/health-log-destination.md)


[//]: # (BEGIN included file options/health-max-log-count.md)
#### **--health-max-log-count**=*number of stored logs*

Set maximum number of attempts in the HealthCheck log file. ('0' value means an infinite number of attempts in the log file) (Default: 5 attempts)

[//]: # (END   included file options/health-max-log-count.md)


[//]: # (BEGIN included file options/health-max-log-size.md)
#### **--health-max-log-size**=*size of stored logs*

Set maximum length in characters of stored HealthCheck log. ("0" value means an infinite log length) (Default: 500 characters)

[//]: # (END   included file options/health-max-log-size.md)


[//]: # (BEGIN included file options/health-on-failure.md)
#### **--health-on-failure**=*action*

Action to take once the container transitions to an unhealthy state.  The default is **none**.

- **none**: Take no action.
- **kill**: Kill the container.
- **restart**: Restart the container.  Do not combine the `restart` action with the `--restart` flag.  When running inside of a systemd unit, consider using the `kill` or `stop` action instead to make use of systemd's restart policy.
- **stop**: Stop the container.

[//]: # (END   included file options/health-on-failure.md)


[//]: # (BEGIN included file options/health-retries.md)
#### **--health-retries**=*retries*

The number of retries allowed before a healthcheck is considered to be unhealthy. The default value is **3**.

[//]: # (END   included file options/health-retries.md)


[//]: # (BEGIN included file options/health-start-period.md)
#### **--health-start-period**=*period*

The initialization time needed for a container to bootstrap. The value can be expressed in time format like
**2m3s**. The default value is **0s**.

Note: The health check command is executed as soon as a container is started, if the health check is successful
the container's health state will be updated to `healthy`. However, if the health check fails, the health state will
stay as `starting` until either the health check is successful or until the `--health-start-period` time is over. If the
health check command fails after the `--health-start-period` time is over, the health state will be updated to `unhealthy`.
The health check command is executed periodically based on the value of `--health-interval`.

[//]: # (END   included file options/health-start-period.md)


[//]: # (BEGIN included file options/health-startup-cmd.md)
#### **--health-startup-cmd**=*"command"* | *'["command", "arg1", ...]'*

Set a startup healthcheck command for a container. This command is executed inside the container and is used to gate the regular
healthcheck. When the startup command succeeds, the regular healthcheck begins and the startup healthcheck ceases. Optionally,
if the command fails for a set number of attempts, the container is restarted. A startup healthcheck can be used to ensure that
containers with an extended startup period are not marked as unhealthy until they are fully started. Startup healthchecks can only be
used when a regular healthcheck (from the container's image or the **--health-cmd** option) is also set.

[//]: # (END   included file options/health-startup-cmd.md)


[//]: # (BEGIN included file options/health-startup-interval.md)
#### **--health-startup-interval**=*interval*

Set an interval for the startup healthcheck. An _interval_ of **disable** results in no automatic timer setup. The default is **30s**.

[//]: # (END   included file options/health-startup-interval.md)


[//]: # (BEGIN included file options/health-startup-retries.md)
#### **--health-startup-retries**=*retries*

The number of attempts allowed before the startup healthcheck restarts the container. If set to **0**, the container is never restarted. The default is **0**.

[//]: # (END   included file options/health-startup-retries.md)


[//]: # (BEGIN included file options/health-startup-success.md)
#### **--health-startup-success**=*retries*

The number of successful runs required before the startup healthcheck succeeds and the regular healthcheck begins. A value
of **0** means that any success begins the regular healthcheck. The default is **0**.

[//]: # (END   included file options/health-startup-success.md)


[//]: # (BEGIN included file options/health-startup-timeout.md)
#### **--health-startup-timeout**=*timeout*

The maximum time a startup healthcheck command has to complete before it is marked as failed. The value can be expressed in a time
format like **2m3s**. The default value is **30s**.

[//]: # (END   included file options/health-startup-timeout.md)


[//]: # (BEGIN included file options/health-timeout.md)
#### **--health-timeout**=*timeout*

The maximum time allowed to complete the healthcheck before an interval is considered failed. Like start-period, the
value can be expressed in a time format such as **1m22s**. The default value is **30s**.

[//]: # (END   included file options/health-timeout.md)

#### **--help**

Print usage statement


[//]: # (BEGIN included file options/hostname.container.md)
#### **--hostname**, **-h**=*name*

Set the container's hostname inside the container.

This option can only be used with a private UTS namespace `--uts=private`
(default). If `--pod` is given and the pod shares the same UTS namespace
(default), the pod's hostname is used. The given hostname is also added to the
`/etc/hosts` file using the container's primary IP address (also see the
**--add-host** option).

[//]: # (END   included file options/hostname.container.md)


[//]: # (BEGIN included file options/hosts-file.md)
#### **--hosts-file**=*path* | *none* | *image*

Base file to create the `/etc/hosts` file inside the container. This must either
be an absolute path to a file on the host system, or one of the following
special flags:
  ""      Follow the `base_hosts_file` configuration in _containers.conf_ (the default)
  `none`  Do not use a base file (i.e. start with an empty file)
  `image` Use the container image's `/etc/hosts` file as base file

[//]: # (END   included file options/hosts-file.md)


[//]: # (BEGIN included file options/hostuser.md)
#### **--hostuser**=*name*

Add a user account to /etc/passwd from the host to the container. The Username
or UID must exist on the host system.

[//]: # (END   included file options/hostuser.md)


[//]: # (BEGIN included file options/http-proxy.md)
#### **--http-proxy**

By default proxy environment variables are passed into the container if set
for the Podman process. This can be disabled by setting the value to **false**.
The environment variables passed in include **http_proxy**,
**https_proxy**, **ftp_proxy**, **no_proxy**, and also the upper case versions of
those. This option is only needed when the host system must use a proxy but
the container does not use any proxy. Proxy environment variables specified
for the container in any other way overrides the values that have
been passed through from the host. (Other ways to specify the proxy for the
container include passing the values with the **--env** flag, or hard coding the
proxy environment at container build time.)
When used with the remote client it uses the proxy environment variables
that are set on the server process.

Defaults to **true**.

[//]: # (END   included file options/http-proxy.md)


[//]: # (BEGIN included file options/image-volume.md)
#### **--image-volume**=**bind** | *tmpfs* | *ignore*

Tells Podman how to handle the builtin image volumes. Default is **bind**.

- **bind**: An anonymous named volume is created and mounted into the container.
- **tmpfs**: The volume is mounted onto the container as a tmpfs, which allows the users to create
content that disappears when the container is stopped.
- **ignore**: All volumes are just ignored and no action is taken.

[//]: # (END   included file options/image-volume.md)


[//]: # (BEGIN included file options/init.md)
#### **--init**

Run an init inside the container that forwards signals and reaps processes.
The container-init binary is mounted at `/run/podman-init`.
Mounting over `/run` breaks container execution.

[//]: # (END   included file options/init.md)

#### **--init-ctr**=*type*

(Pods only).
When using pods, create an init style container, which is run after the infra container is started
but before regular pod containers are started.  Init containers are useful for running
setup operations for the pod's applications.

Valid values for `init-ctr` type are *always* or *once*.  The *always* value
means the container runs with each and every `pod start`, whereas the *once*
value means the container only runs once when the pod is started and then the container is removed.

Init containers are only run on pod `start`.  Restarting a pod does not execute
any init containers.  Furthermore, init containers can only be created in a
pod when that pod is not running.


[//]: # (BEGIN included file options/init-path.md)
#### **--init-path**=*path*

Path to the container-init binary.

[//]: # (END   included file options/init-path.md)


[//]: # (BEGIN included file options/interactive.md)
#### **--interactive**, **-i**

When set to **true**, make stdin available to the contained process. If **false**, the stdin of the contained process is empty and immediately closed.

If attached, stdin is piped to the contained process. If detached, reading stdin will block until later attached.

**Caveat:** Podman will consume input from stdin as soon as it becomes available, even if the contained process doesn't request it.

[//]: # (END   included file options/interactive.md)


[//]: # (BEGIN included file options/ip.md)
#### **--ip**=*ipv4*

Specify a static IPv4 address for the container, for example **10.88.64.128**.
This option can only be used if the container is joined to only a single network - i.e., **--network=network-name** is used at most once -
and if the container is not joining another container's network namespace via **--network=container\:_id_**.
The address must be within the network's IP address pool (default **10.88.0.0/16**).

To specify multiple static IP addresses per container, set multiple networks using the **--network** option with a static IP address specified for each using the `ip` mode for that option.

[//]: # (END   included file options/ip.md)


[//]: # (BEGIN included file options/ip6.md)
#### **--ip6**=*ipv6*

Specify a static IPv6 address for the container, for example **fd46\:db93\:aa76\:ac37::10**.
This option can only be used if the container is joined to only a single network - i.e., **--network=network-name** is used at most once -
and if the container is not joining another container's network namespace via **--network=container\:_id_**.
The address must be within the network's IPv6 address pool.

To specify multiple static IPv6 addresses per container, set multiple networks using the **--network** option with a static IPv6 address specified for each using the `ip6` mode for that option.

[//]: # (END   included file options/ip6.md)


[//]: # (BEGIN included file options/ipc.md)
#### **--ipc**=*ipc*

Set the IPC namespace mode for a container. The default is to create
a private IPC namespace.

- "": Use Podman's default, defined in containers.conf.
- **container:**_id_: reuses another container's shared memory, semaphores, and message queues
- **host**: use the host's shared memory, semaphores, and message queues inside the container. Note: the host mode gives the container full access to local shared memory and is therefore considered insecure.
- **none**:  private IPC namespace, with /dev/shm not mounted.
- **ns:**_path_: path to an IPC namespace to join.
- **private**: private IPC namespace.
- **shareable**: private IPC namespace with a possibility to share it with other containers.

[//]: # (END   included file options/ipc.md)


[//]: # (BEGIN included file options/label.md)
#### **--label**, **-l**=*key=value*

Add metadata to a container.

[//]: # (END   included file options/label.md)


[//]: # (BEGIN included file options/label-file.md)
#### **--label-file**=*file*

Read in a line-delimited file of labels.

[//]: # (END   included file options/label-file.md)


[//]: # (BEGIN included file options/link-local-ip.md)
#### **--link-local-ip**=*ip*

Not implemented.

[//]: # (END   included file options/link-local-ip.md)


[//]: # (BEGIN included file options/log-driver.md)
#### **--log-driver**=*driver*

Logging driver for the container. Currently available options are **k8s-file**, **journald**, **none**, **passthrough** and **passthrough-tty**, with **json-file** aliased to **k8s-file** for scripting compatibility. (Default **journald**).

The podman info command below displays the default log-driver for the system.
```
$ podman info --format '{{ .Host.LogDriver }}'
journald
```
The **passthrough** driver passes down the standard streams (stdin, stdout, stderr) to the
container.  It is not allowed with the remote Podman client, including Mac and Windows (excluding WSL2) machines, and on a tty, since it is
vulnerable to attacks via TIOCSTI.

The **passthrough-tty** driver is the same as **passthrough** except that it also allows it to be used on a TTY if the user really wants it.

[//]: # (END   included file options/log-driver.md)


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


[//]: # (BEGIN included file options/mac-address.md)
#### **--mac-address**=*address*

Container network interface MAC address (e.g. 92\:d0\:c6:0a:29:33)
This option can only be used if the container is joined to only a single network - i.e., **--network=_network-name_** is used at most once -
and if the container is not joining another container's network namespace via **--network=container\:_id_**.

Remember that the MAC address in an Ethernet network must be unique.
The IPv6 link-local address is based on the device's MAC address
according to RFC4862.

To specify multiple static MAC addresses per container, set multiple networks using the **--network** option with a static MAC address specified for each using the `mac` mode for that option.

[//]: # (END   included file options/mac-address.md)


[//]: # (BEGIN included file options/memory.md)
#### **--memory**, **-m**=*number[unit]*

Memory limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Allows the memory available to a container to be constrained. If the host
supports swap memory, then the **-m** memory setting can be larger than physical
RAM. If a limit of 0 is specified (not using **-m**), the container's memory is
not limited. The actual limit may be rounded up to a multiple of the operating
system's page size (the value is very large, that's millions of trillions).

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/memory.md)


[//]: # (BEGIN included file options/memory-reservation.md)
#### **--memory-reservation**=*number[unit]*

Memory soft limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

After setting memory reservation, when the system detects memory contention
or low memory, containers are forced to restrict their consumption to their
reservation. So always set the value below **--memory**, otherwise the
hard limit takes precedence. By default, memory reservation is the same
as memory limit.

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/memory-reservation.md)


[//]: # (BEGIN included file options/memory-swap.md)
#### **--memory-swap**=*number[unit]*

A limit value equal to memory plus swap.
A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Must be used with the **-m** (**--memory**) flag.
The argument value must be larger than that of
 **-m** (**--memory**) By default, it is set to double
the value of **--memory**.

Set _number_ to **-1** to enable unlimited swap.

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/memory-swap.md)


[//]: # (BEGIN included file options/memory-swappiness.md)
#### **--memory-swappiness**=*number*

Tune a container's memory swappiness behavior. Accepts an integer between *0* and *100*.

This flag is only supported on cgroups V1 rootful systems.

[//]: # (END   included file options/memory-swappiness.md)


[//]: # (BEGIN included file options/mount.md)
#### **--mount**=*type=TYPE,TYPE-SPECIFIC-OPTION[,...]*

Attach a filesystem mount to the container

Current supported mount TYPEs are **bind**, **devpts**, **glob**, **image**, **ramfs**, **tmpfs** and **volume**.

Options common to all mount types:

- *src*, *source*: mount source spec for **bind**, **glob**, and **volume**.
  Mandatory for **bind** and **glob**.

- *dst*, *destination*, *target*: mount destination spec.

When source globs are specified without the destination directory,
the files and directories are mounted with their complete path
within the container. When the destination is specified, the
files and directories matching the glob on the base file name
on the destination directory are mounted. The option
`type=glob,src=/foo*,destination=/tmp/bar` tells container engines
to mount host files matching /foo* to the /tmp/bar/
directory in the container.

Options specific to type=**volume**:

- *ro*, *readonly*: *true* or *false* (default if unspecified: *false*).

- *U*, *chown*: *true* or *false* (default if unspecified: *false*). Recursively change the owner and group of the source volume based on the UID and GID of the container.

- *idmap*: If specified, create an idmapped mount to the target user namespace in the container.
  The idmap option is only supported by Podman in rootful mode. The Linux kernel does not allow the use of idmaped file systems for unprivileged users.
  The idmap option supports a custom mapping that can be different than the user namespace used by the container.
  The mapping can be specified after the idmap option like: `idmap=uids=0-1-10#10-11-10;gids=0-100-10`.  For each triplet, the first value is the
  start of the backing file system IDs that are mapped to the second value on the host.  The length of this mapping is given in the third value.
  Multiple ranges are separated with #.  If the specified mapping is prepended with a '@' then the mapping is considered relative to the container
  user namespace. The host ID for the mapping is changed to account for the relative position of the container user in the container user namespace.

Options specific to type=**image**:

- *rw*, *readwrite*: *true* or *false* (default if unspecified: *false*).

- *subpath*: Mount only a specific path within the image, instead of the whole image.

Options specific to **bind** and **glob**:

- *ro*, *readonly*: *true* or *false* (default if unspecified: *false*).

- *bind-propagation*: *shared*, *slave*, *private*, *unbindable*, *rshared*, *rslave*, *runbindable*, or **rprivate** (default).<sup>[[1]](#Footnote1)</sup> See also mount(2).

- *bind-nonrecursive*: do not set up a recursive bind mount. By default it is recursive.

- *relabel*: *shared*, *private*.

- *idmap*: *true* or *false* (default if unspecified: *false*).  If true, create an idmapped mount to the target user namespace in the container. The idmap option is only supported by Podman in rootful mode.

- *U*, *chown*: *true* or *false* (default if unspecified: *false*). Recursively change the owner and group of the source volume based on the UID and GID of the container.

- *no-dereference*: do not dereference symlinks but copy the link source into the mount destination.

Options specific to type=**tmpfs** and **ramfs**:

- *ro*, *readonly*: *true* or *false* (default if unspecified: *false*).

- *tmpfs-size*: Size of the tmpfs/ramfs mount, in bytes. Unlimited by default in Linux.

- *tmpfs-mode*: Octal file mode of the tmpfs/ramfs (e.g. 700 or 0700.).

- *tmpcopyup*: Enable copyup from the image directory at the same location to the tmpfs/ramfs. Used by default.

- *notmpcopyup*: Disable copying files from the image to the tmpfs/ramfs.

- *U*, *chown*: *true* or *false* (default if unspecified: *false*). Recursively change the owner and group of the source volume based on the UID and GID of the container.

Options specific to type=**devpts**:

- *uid*: numeric UID of the file owner (default: 0).

- *gid*: numeric GID of the file owner (default: 0).

- *mode*: octal permission mask for the file (default: 600).

- *max*: maximum number of PTYs (default: 1048576).

Examples:

- `type=bind,source=/path/on/host,destination=/path/in/container`

- `type=bind,src=/path/on/host,dst=/path/in/container,relabel=shared`

- `type=bind,src=/path/on/host,dst=/path/in/container,relabel=shared,U=true`

- `type=devpts,destination=/dev/pts`

- `type=glob,src=/usr/lib/libfoo*,destination=/usr/lib,ro=true`

- `type=image,source=fedora,destination=/fedora-image,rw=true`

- `type=ramfs,tmpfs-size=512M,destination=/path/in/container`

- `type=tmpfs,tmpfs-size=512M,destination=/path/in/container`

- `type=tmpfs,destination=/path/in/container,noswap`

- `type=volume,source=vol1,destination=/path/in/container,ro=true`

[//]: # (END   included file options/mount.md)


[//]: # (BEGIN included file options/name.container.md)
#### **--name**=*name*

Assign a name to the container.

The operator can identify a container in three ways:

- UUID long identifier (“f78375b1c487e03c9438c729345e54db9d20cfa2ac1fc3494b6eb60872e74778”);
- UUID short identifier (“f78375b1c487”);
- Name (“jonah”).

Podman generates a UUID for each container, and if no name is assigned to the
container using **--name**, Podman generates a random string name. The name can
be useful as a more human-friendly way to identify containers. This works for
both background and foreground containers. The container's name is also added
to the `/etc/hosts` file using the container's primary IP address (also see the
**--add-host** option).

[//]: # (END   included file options/name.container.md)


[//]: # (BEGIN included file options/network.md)
#### **--network**=*mode*, **--net**

Set the network mode for the container.

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
    name, are copied from the host. If port forwarding isn't configured, ports
    are forwarded dynamically as services are bound on either side (init
    namespace or container namespace). Port forwarding preserves the original
    source IP address. Options described in pasta(1) can be specified as
    comma-separated arguments. \
    In terms of pasta(1) options, **--config-net** is given by default, in
    order to configure networking when the container is started, and
    **--no-map-gw** is also assumed by default, to avoid direct access from
    container to host using the gateway address. The latter can be overridden
    by passing **--map-gw** in the pasta-specific options (despite not being an
    actual pasta(1) option). \
    Also, **-t none** and **-u none** are passed if, respectively, no TCP or
    UDP port forwarding from host to container is configured, to disable
    automatic port forwarding based on bound ports. Similarly, **-T none** and
    **-U none** are given to disable the same functionality from container to
    host. \
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

Invalid if using **--dns**, **--dns-option**, or **--dns-search** with **--network** set to **none** or **container:**_id_.

If used together with **--pod**, the container does not join the pod's network namespace.


[//]: # (BEGIN included file options/network-alias.md)
#### **--network-alias**=*alias*

Add a network-scoped alias for the container, setting the alias for all networks that the container joins. To set a
name only for a specific network, use the alias option as described under the **--network** option.
If the network has DNS enabled (`podman network inspect -f {{.DNSEnabled}} <name>`),
these aliases can be used for name resolution on the given network. This option can be specified multiple times.
NOTE: When using CNI a container only has access to aliases on the first network that it joins. This limitation does
not exist with netavark/aardvark-dns.

[//]: # (END   included file options/network-alias.md)


[//]: # (BEGIN included file options/no-healthcheck.md)
#### **--no-healthcheck**

Disable any defined healthchecks for container.

[//]: # (END   included file options/no-healthcheck.md)


[//]: # (BEGIN included file options/no-hostname.md)
#### **--no-hostname**

Do not create the _/etc/hostname_ file in the containers.

By default, Podman manages the _/etc/hostname_ file, adding the container's own hostname.  When the **--no-hostname** option is set, the image's _/etc/hostname_ will be preserved unmodified if it exists.

[//]: # (END   included file options/no-hostname.md)


[//]: # (BEGIN included file options/no-hosts.md)
#### **--no-hosts**

Do not modify the `/etc/hosts` file in the container.

Podman assumes control over the container's `/etc/hosts` file by
default and adds entries for the container's name (see **--name** option) and
hostname (see **--hostname** option), the internal `host.containers.internal`
and `host.docker.internal` hosts, as well as any hostname added using the
**--add-host** option. Refer to the **--add-host** option for details. Passing
**--no-hosts** disables this, so that the image's `/etc/hosts` file is kept
unmodified. The same can be achieved globally by setting *no_hosts=true* in
`containers.conf`.

[//]: # (END   included file options/no-hosts.md)

This option conflicts with **--add-host**.


[//]: # (BEGIN included file options/oom-kill-disable.md)
#### **--oom-kill-disable**

Whether to disable OOM Killer for the container or not.

This flag is not supported on cgroups V2 systems.

[//]: # (END   included file options/oom-kill-disable.md)


[//]: # (BEGIN included file options/oom-score-adj.md)
#### **--oom-score-adj**=*num*

Tune the host's OOM preferences for containers (accepts values from **-1000** to **1000**).

When running in rootless mode, the specified value can't be lower than
the oom_score_adj for the current process. In this case, the
oom-score-adj is clamped to the current process value.

[//]: # (END   included file options/oom-score-adj.md)


[//]: # (BEGIN included file options/os.pull.md)
#### **--os**=*OS*

Override the OS, defaults to hosts, of the image to be pulled. For example, `windows`.
Unless overridden, subsequent lookups of the same image in the local storage matches this OS, regardless of the host.

[//]: # (END   included file options/os.pull.md)


[//]: # (BEGIN included file options/passwd-entry.md)
#### **--passwd-entry**=*ENTRY*

Customize the entry that is written to the `/etc/passwd` file within the container when `--passwd` is used.

The variables $USERNAME, $UID, $GID, $NAME, $HOME are automatically replaced with their value at runtime.

[//]: # (END   included file options/passwd-entry.md)


[//]: # (BEGIN included file options/personality.md)
#### **--personality**=*persona*

Personality sets the execution domain via Linux personality(2).

[//]: # (END   included file options/personality.md)


[//]: # (BEGIN included file options/pid.container.md)
#### **--pid**=*mode*

Set the PID namespace mode for the container.
The default is to create a private PID namespace for the container.

- **container:**_id_: join another container's PID namespace;
- **host**: use the host's PID namespace for the container. Note the host mode gives the container full access to local PID and is therefore considered insecure;
- **ns:**_path_: join the specified PID namespace;
- **private**: create a new namespace for the container (default).

[//]: # (END   included file options/pid.container.md)


[//]: # (BEGIN included file options/pidfile.md)
#### **--pidfile**=*path*

When the pidfile location is specified, the container process' PID is written to the pidfile. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)
If the pidfile option is not specified, the container process' PID is written to /run/containers/storage/${storage-driver}-containers/$CID/userdata/pidfile.

After the container is started, the location for the pidfile can be discovered with the following `podman inspect` command:

    $ podman inspect --format '{{ .PidFile }}' $CID
    /run/containers/storage/${storage-driver}-containers/$CID/userdata/pidfile

[//]: # (END   included file options/pidfile.md)


[//]: # (BEGIN included file options/pids-limit.md)
#### **--pids-limit**=*limit*

Tune the container's pids limit. Set to **-1** to have unlimited pids for the container. The default is **2048** on systems that support "pids" cgroup controller.

[//]: # (END   included file options/pids-limit.md)


[//]: # (BEGIN included file options/platform.md)
#### **--platform**=*OS/ARCH*

Specify the platform for selecting the image.  (Conflicts with --arch and --os)
The `--platform` option can be used to override the current architecture and operating system.
Unless overridden, subsequent lookups of the same image in the local storage matches this platform, regardless of the host.

[//]: # (END   included file options/platform.md)


[//]: # (BEGIN included file options/pod.run.md)
#### **--pod**=*name*

Run container in an existing pod. Podman makes the pod automatically if the pod name is prefixed with **new:**.
To make a pod with more granular options, use the **podman pod create** command before creating a container.
When a container is run with a pod with an infra-container, the infra-container is started first.

[//]: # (END   included file options/pod.run.md)


[//]: # (BEGIN included file options/pod-id-file.container.md)
#### **--pod-id-file**=*file*

Run container in an existing pod and read the pod's ID from the specified *file*.
When a container is run within a pod which has an infra-container, the infra-container starts first.

[//]: # (END   included file options/pod-id-file.container.md)


[//]: # (BEGIN included file options/privileged.md)
#### **--privileged**

Give extended privileges to this container. The default is **false**.

By default, Podman containers are unprivileged (**=false**) and cannot, for
example, modify parts of the operating system. This is because by default a
container is only allowed limited access to devices. A "privileged" container
is given the same access to devices as the user launching the container, with
the exception of virtual consoles (_/dev/tty\d+_) when running in systemd
mode (**--systemd=always**).

A privileged container turns off the security features that isolate the
container from the host. Dropped Capabilities, limited devices, read-only mount
points, Apparmor/SELinux separation, and Seccomp filters are all disabled.
Due to the disabled security features, the privileged field should almost never
be set as containers can easily break out of confinement.

Containers running in a user namespace (e.g., rootless containers) cannot have
more privileges than the user that launched them.

[//]: # (END   included file options/privileged.md)


[//]: # (BEGIN included file options/publish.md)
#### **--publish**, **-p**=*[[ip:][hostPort]:]containerPort[/protocol]*

Publish a container's port, or range of ports, to the host.

Both *hostPort* and *containerPort* can be specified as a range of ports.
When specifying ranges for both, the number of container ports in the
range must match the number of host ports in the range.

If host IP is set to 0.0.0.0 or not set at all, the port is bound on all IPs on the host.

By default, Podman publishes TCP ports. To publish a UDP port instead, give
`udp` as protocol. To publish both TCP and UDP ports, set `--publish` twice,
with `tcp`, and `udp` as protocols respectively. Rootful containers can also
publish ports using the `sctp` protocol.

Host port does not have to be specified (e.g. `podman run -p 127.0.0.1::80`).
If it is not, the container port is randomly assigned a port on the host.

Use **podman port** to see the actual mapping: `podman port $CONTAINER $CONTAINERPORT`.

Note that the network drivers `macvlan` and `ipvlan` do not support port forwarding,
it will have no effect on these networks.

[//]: # (END   included file options/publish.md)

**Note:** If a container runs within a pod, it is not necessary to publish the port for
the containers in the pod. The port must only be published by the pod itself. Pod network
stacks act like the network stack on the host - when there are a variety of containers in the pod,
and programs in the container, all sharing a single interface and IP address, and
associated ports. If one container binds to a port, no other container can use that port
within the pod while it is in use. Containers in the pod can also communicate over localhost
by having one container bind to localhost in the pod, and another connect to that port.


[//]: # (BEGIN included file options/publish-all.md)
#### **--publish-all**, **-P**

Publish all exposed ports to random ports on the host interfaces. The default is **false**.

When set to **true**, publish all exposed ports to the host interfaces.
If the operator uses **-P** (or **-p**) then Podman makes the
exposed port accessible on the host and the ports are available to any
client that can reach the host.

When using this option, Podman binds any exposed port to a random port on the host
within an ephemeral port range defined by */proc/sys/net/ipv4/ip_local_port_range*.
To find the mapping between the host ports and the exposed ports, use **podman port**.

[//]: # (END   included file options/publish-all.md)


[//]: # (BEGIN included file options/pull.md)
#### **--pull**=*policy*

Pull image policy. The default is **missing**.

- **always**: Always pull the image and throw an error if the pull fails.
- **missing**: Pull the image only when the image is not in the local containers storage.  Throw an error if no image is found and the pull fails.
- **never**: Never pull the image but use the one from the local containers storage.  Throw an error if no image is found.
- **newer**: Pull if the image on the registry is newer than the one in the local containers storage.  An image is considered to be newer when the digests are different.  Comparing the time stamps is prone to errors.  Pull errors are suppressed if a local image was found.

[//]: # (END   included file options/pull.md)

#### **--quiet**, **-q**

Suppress output information when pulling images


[//]: # (BEGIN included file options/rdt-class.md)
#### **--rdt-class**=*intel-rdt-class-of-service*

Rdt-class sets the class of service (CLOS or COS) for the container to run in. Based on the Cache Allocation Technology (CAT) feature that is part of Intel's Resource Director Technology (RDT) feature set, all container processes will run within the pre-configured COS, representing a part of the cache. The COS has to be created and configured using a pseudo file system (usually mounted at `/sys/fs/resctrl`) that the resctrl kernel driver provides. Assigning the container to a COS requires root privileges and thus doesn't work in a rootless environment. Currently, the feature is only supported using `runc` as a runtime. See <https://docs.kernel.org/arch/x86/resctrl.html> for more details on creating a COS before a container can be assigned to it.

[//]: # (END   included file options/rdt-class.md)


[//]: # (BEGIN included file options/read-only.md)
#### **--read-only**

Mount the container's root filesystem as read-only.

By default, container root filesystems are writable, allowing processes
to write files anywhere. By specifying the **--read-only** flag, the containers root filesystem are mounted read-only prohibiting any writes.

[//]: # (END   included file options/read-only.md)


[//]: # (BEGIN included file options/read-only-tmpfs.md)
#### **--read-only-tmpfs**

When running --read-only containers, mount a read-write tmpfs on _/dev_, _/dev/shm_, _/run_, _/tmp_, and _/var/tmp_. The default is **true**.

| --read-only | --read-only-tmpfs |  /   | /run, /tmp, /var/tmp|
| ----------- | ----------------- | ---- | ----------------------------------- |
| true        |  true             | r/o  | r/w                                 |
| true        |  false            | r/o  | r/o                                 |
| false       |  false            | r/w  | r/w                                 |
| false       |  true             | r/w  | r/w                                 |

When **--read-only=true** and **--read-only-tmpfs=true** additional tmpfs are mounted on
the /tmp, /run, and /var/tmp directories.

When **--read-only=true** and **--read-only-tmpfs=false** /dev and /dev/shm are marked
Read/Only and no tmpfs are mounted on /tmp, /run and /var/tmp. The directories
are exposed from the underlying image, meaning they are read-only by default.
This makes the container totally read-only. No writable directories exist within
the container. In this mode writable directories need to be added via external
volumes or mounts.

By default, when **--read-only=false**, the /dev and /dev/shm are read/write, and the /tmp, /run, and /var/tmp are read/write directories from the container image.

[//]: # (END   included file options/read-only-tmpfs.md)


[//]: # (BEGIN included file options/replace.md)
#### **--replace**

If another container with the same name already exists, replace and remove it. The default is **false**.

[//]: # (END   included file options/replace.md)


[//]: # (BEGIN included file options/requires.md)
#### **--requires**=*container*

Specify one or more requirements.
A requirement is a dependency container that is started before this container.
Containers can be specified by name or ID, with multiple containers being separated by commas.

[//]: # (END   included file options/requires.md)


[//]: # (BEGIN included file options/restart.md)
#### **--restart**=*policy*

Restart policy to follow when containers exit.
Restart policy does not take effect if a container is stopped via the **podman kill** or **podman stop** commands.

Valid _policy_ values are:

- `no`                       : Do not restart containers on exit
- `never`                    : Synonym for **no**; do not restart containers on exit
- `on-failure[\:max_retries]` : Restart containers when they exit with a non-zero exit code, retrying indefinitely or until the optional *max_retries* count is hit
- `always`                   : Restart containers when they exit, regardless of status, retrying indefinitely
- `unless-stopped`           : Identical to **always**

Podman provides a systemd unit file, podman-restart.service, which restarts containers after a system reboot.

When running containers in systemd services, use the restart functionality provided by systemd.
In other words, do not use this option in a container unit, instead set the `Restart=` systemd directive in the `[Service]` section.
See **podman-systemd.unit**(5) and **systemd.service**(5).

[//]: # (END   included file options/restart.md)


[//]: # (BEGIN included file options/retry.md)
#### **--retry**=*attempts*

Number of times to retry pulling or pushing images between the registry and
local storage in case of failure. Default is **3**.

[//]: # (END   included file options/retry.md)


[//]: # (BEGIN included file options/retry-delay.md)
#### **--retry-delay**=*duration*

Duration of delay between retry attempts when pulling or pushing images between
the registry and local storage in case of failure. The default is to start at two seconds and then exponentially back off. The delay is used when this value is set, and no exponential back off occurs.

[//]: # (END   included file options/retry-delay.md)

#### **--rm**

Automatically remove the container and any anonymous unnamed volume associated with
the container when it exits. The default is **false**.


[//]: # (BEGIN included file options/rootfs.md)
#### **--rootfs**

If specified, the first argument refers to an exploded container on the file system.

This is useful to run a container without requiring any image management, the rootfs
of the container is assumed to be managed externally.

  `Overlay Rootfs Mounts`

   The `\:O` flag tells Podman to mount the directory from the rootfs path as
storage using the `overlay file system`. The container processes
can modify content within the mount point which is stored in the
container storage in a separate directory. In overlay terms, the source
directory is the lower, and the container storage directory is the
upper. Modifications to the mount point are destroyed when the container
finishes executing, similar to a tmpfs mount point being unmounted.

Note: On **SELinux** systems, the rootfs needs the correct label, which is by default
**unconfined_u\:object_r\:container_file_t\:s0**.

  `idmap`

If `idmap` is specified, create an idmapped mount to the target user
namespace in the container.
The idmap option supports a custom mapping that can be different than the user
namespace used by the container.  The mapping can be specified after the idmap
option like: `idmap=uids=0-1-10#10-11-10;gids=0-100-10`.  For each triplet, the
first value is the start of the backing file system IDs that are mapped to the
second value on the host.  The length of this mapping is given in the third value.
Multiple ranges are separated with #.

[//]: # (END   included file options/rootfs.md)


[//]: # (BEGIN included file options/sdnotify.md)
#### **--sdnotify**=**container** | *conmon* | *healthy* | *ignore*

Determines how to use the NOTIFY_SOCKET, as passed with systemd and Type=notify.

Default is **container**, which means allow the OCI runtime to proxy the socket into the
container to receive ready notification. Podman sets the MAINPID to conmon's pid.
The **conmon** option sets MAINPID to conmon's pid, and sends READY when the container
has started. The socket is never passed to the runtime or the container.
The **healthy** option sets MAINPID to conmon's pid, and sends READY when the container
has turned healthy; requires a healthcheck to be set. The socket is never passed to the runtime or the container.
The **ignore** option removes NOTIFY_SOCKET from the environment for itself and child processes,
for the case where some other process above Podman uses NOTIFY_SOCKET and Podman does not use it.

[//]: # (END   included file options/sdnotify.md)


[//]: # (BEGIN included file options/seccomp-policy.md)
#### **--seccomp-policy**=*policy*

Specify the policy to select the seccomp profile. If set to *image*, Podman looks for a "io.containers.seccomp.profile" label in the container-image config and use its value as a seccomp profile. Otherwise, Podman follows the *default* policy by applying the default profile unless specified otherwise via *--security-opt seccomp* as described below.

Note that this feature is experimental and may change in the future.

[//]: # (END   included file options/seccomp-policy.md)


[//]: # (BEGIN included file options/secret.md)
#### **--secret**=*secret[,opt=opt ...]*

Give the container access to a secret. Can be specified multiple times.

A secret is a blob of sensitive data which a container needs at runtime but
is not stored in the image or in source control, such as usernames and passwords,
TLS certificates and keys, SSH keys or other important generic strings or binary content (up to 500 kb in size).

When secrets are specified as type `mount`, the secrets are copied and mounted into the container when a container is created.
When secrets are specified as type `env`, the secret is set as an environment variable within the container.
Secrets are written in the container at the time of container creation, and modifying the secret using `podman secret` commands
after the container is created affects the secret inside the container.

Secrets and its storage are managed using the `podman secret` command.

Secret Options

- `type=mount|env`    : How the secret is exposed to the container.
                        `mount` mounts the secret into the container as a file.
                        `env` exposes the secret as an environment variable.
                        Defaults to `mount`.
- `target=target`     : Target of secret.
                        For mounted secrets, this is the path to the secret inside the container.
                        If a fully qualified path is provided, the secret is mounted at that location.
                        Otherwise, the secret is mounted to
                        `/run/secrets/target` for linux containers or
                        `/var/run/secrets/target` for freebsd containers.
                        If the target is not set, the secret is mounted to `/run/secrets/secretname` by default.
                        For env secrets, this is the environment variable key. Defaults to `secretname`.
- `uid=0`             : UID of secret. Defaults to 0. Mount secret type only.
- `gid=0`             : GID of secret. Defaults to 0. Mount secret type only.
- `mode=0`            : Mode of secret. Defaults to 0444. Mount secret type only.


Examples

Mount at `/my/location/mysecret` with UID 1:
```
--secret mysecret,target=/my/location/mysecret,uid=1
```

Mount at `/run/secrets/customtarget` with mode 0777:
```
--secret mysecret,target=customtarget,mode=0777
```

Create a secret environment variable called `ENVSEC`:
```
--secret mysecret,type=env,target=ENVSEC
```

[//]: # (END   included file options/secret.md)


[//]: # (BEGIN included file options/security-opt.md)
#### **--security-opt**=*option*

Security Options

- **apparmor=unconfined** : Turn off apparmor confinement for the container
- **apparmor**=_alternate-profile_ : Set the apparmor confinement profile for the container

- **label=user:**_USER_: Set the label user for the container processes
- **label=role:**_ROLE_: Set the label role for the container processes
- **label=type:**_TYPE_: Set the label process type for the container processes
- **label=level:**_LEVEL_: Set the label level for the container processes
- **label=filetype:**_TYPE_: Set the label file type for the container files
- **label=disable**: Turn off label separation for the container

Note: Labeling can be disabled for all containers by setting label=false in the **containers.conf** (`/etc/containers/containers.conf` or `$HOME/.config/containers/containers.conf`) file.

- **label=nested**: Allows SELinux modifications within the container. Containers are allowed to modify SELinux labels on files and processes, as long as SELinux policy allows. Without **nested**, containers view SELinux as disabled, even when it is enabled on the host. Containers are prevented from setting any labels.

- **mask**=_/path/1:/path/2_: The paths to mask separated by a colon. A masked path cannot be accessed inside the container.

- **no-new-privileges**: Disable container processes from gaining additional privileges.

- **seccomp=unconfined**: Turn off seccomp confinement for the container.
- **seccomp=profile.json**: JSON file to be used as a seccomp filter. Note that the `io.podman.annotations.seccomp` annotation is set with the specified value as shown in `podman inspect`.

- **proc-opts**=_OPTIONS_ : Comma-separated list of options to use for the /proc mount. More details
  for the possible mount options are specified in the **proc(5)** man page.

- **unmask**=_ALL_ or _/path/1:/path/2_, or shell expanded paths (/proc/*): Paths to unmask separated by a colon. If set to **ALL**, it unmasks all the paths that are masked or made read-only by default.
  The default masked paths are **/proc/acpi, /proc/kcore, /proc/keys, /proc/latency_stats, /proc/sched_debug, /proc/scsi, /proc/timer_list, /proc/timer_stats, /sys/firmware, and /sys/fs/selinux**, **/sys/devices/virtual/powercap**.  The default paths that are read-only are **/proc/asound**, **/proc/bus**, **/proc/fs**, **/proc/irq**, **/proc/sys**, **/proc/sysrq-trigger**, **/sys/fs/cgroup**.

Note: Labeling can be disabled for all containers by setting **label=false** in the **containers.conf**(5) file.

[//]: # (END   included file options/security-opt.md)


[//]: # (BEGIN included file options/shm-size.md)
#### **--shm-size**=*number[unit]*

Size of _/dev/shm_. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, there is no limit on the amount of memory used for IPC by the container.
This option conflicts with **--ipc=host**.

[//]: # (END   included file options/shm-size.md)


[//]: # (BEGIN included file options/shm-size-systemd.md)
#### **--shm-size-systemd**=*number[unit]*

Size of systemd-specific tmpfs mounts such as /run, /run/lock, /var/log/journal and /tmp.
A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, the usage is limited to 50% of the host's available memory.

[//]: # (END   included file options/shm-size-systemd.md)


[//]: # (BEGIN included file options/stop-signal.md)
#### **--stop-signal**=*signal*

Signal to stop a container. Default is **SIGTERM**.

[//]: # (END   included file options/stop-signal.md)


[//]: # (BEGIN included file options/stop-timeout.md)
#### **--stop-timeout**=*seconds*

Timeout to stop a container. Default is **10**.
Remote connections use local containers.conf for defaults.

[//]: # (END   included file options/stop-timeout.md)


[//]: # (BEGIN included file options/subgidname.md)
#### **--subgidname**=*name*

Run the container in a new user namespace using the map with _name_ in the _/etc/subgid_ file.
If running rootless, the user needs to have the right to use the mapping. See **subgid**(5).
This flag conflicts with **--userns** and **--gidmap**.

[//]: # (END   included file options/subgidname.md)


[//]: # (BEGIN included file options/subuidname.md)
#### **--subuidname**=*name*

Run the container in a new user namespace using the map with _name_ in the _/etc/subuid_ file.
If running rootless, the user needs to have the right to use the mapping. See **subuid**(5).
This flag conflicts with **--userns** and **--uidmap**.

[//]: # (END   included file options/subuidname.md)


[//]: # (BEGIN included file options/sysctl.md)
#### **--sysctl**=*name=value*

Configure namespaced kernel parameters at runtime.

For the IPC namespace, the following sysctls are allowed:

- kernel.msgmax
- kernel.msgmnb
- kernel.msgmni
- kernel.sem
- kernel.shmall
- kernel.shmmax
- kernel.shmmni
- kernel.shm_rmid_forced
- Sysctls beginning with fs.mqueue.\*

Note: if using the **--ipc=host** option, the above sysctls are not allowed.

For the network namespace, only sysctls beginning with net.\* are allowed.

Note: if using the **--network=host** option, the above sysctls are not allowed.

[//]: # (END   included file options/sysctl.md)


[//]: # (BEGIN included file options/systemd.md)
#### **--systemd**=*true* | *false* | *always*

Run container in systemd mode. The default is **true**.

- **true** enables systemd mode only when the command executed inside the container is *systemd*, */usr/sbin/init*,
*/sbin/init* or */usr/local/sbin/init*.

- **false** disables systemd mode.

- **always** enforces the systemd mode to be enabled.

Running the container in systemd mode causes the following changes:

* Podman mounts tmpfs file systems on the following directories
  * _/run_
  * _/run/lock_
  * _/tmp_
  * _/sys/fs/cgroup/systemd_ (on a cgroup v1 system)
  * _/var/lib/journal_
* Podman sets the default stop signal to **SIGRTMIN+3**.
* Podman sets **container_uuid** environment variable in the container to the
first 32 characters of the container ID.
* Podman does not mount virtual consoles (_/dev/tty\d+_) when running with **--privileged**.
* On cgroup v2, */sys/fs/cgroup* is mounted writeable.

This allows systemd to run in a confined container without any modifications.

Note that on **SELinux** systems, systemd attempts to write to the cgroup
file system. Containers writing to the cgroup file system are denied by default.
The **container_manage_cgroup** boolean must be enabled for this to be allowed on an SELinux separated system.
```
setsebool -P container_manage_cgroup true
```

[//]: # (END   included file options/systemd.md)


[//]: # (BEGIN included file options/timeout.md)
#### **--timeout**=*seconds*

Maximum time a container is allowed to run before conmon sends it the kill
signal.  By default containers run until they exit or are stopped by
`podman stop`.

[//]: # (END   included file options/timeout.md)


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)


[//]: # (BEGIN included file options/tmpfs.md)
#### **--tmpfs**=*fs*

Create a tmpfs mount.

Mount a temporary filesystem (**tmpfs**) mount into a container, for example:

```
$ podman create -d --tmpfs /tmp\:rw,size=787448k,mode=1777 my_image
```

This command mounts a **tmpfs** at _/tmp_ within the container. The supported mount
options are the same as the Linux default mount flags. If no options are specified,
the system uses the following options:
**rw,noexec,nosuid,nodev**.

[//]: # (END   included file options/tmpfs.md)


[//]: # (BEGIN included file options/tty.md)
#### **--tty**, **-t**

Allocate a pseudo-TTY. The default is **false**.

When set to **true**, Podman allocates a pseudo-tty and attach to the standard
input of the container. This can be used, for example, to run a throwaway
interactive shell.

**NOTE**: The --tty flag prevents redirection of standard output.  It combines STDOUT and STDERR, it can insert control characters, and it can hang pipes. This option is only used when run interactively in a terminal. When feeding input to Podman, use -i only, not -it.

[//]: # (END   included file options/tty.md)


[//]: # (BEGIN included file options/tz.md)
#### **--tz**=*timezone*

Set timezone in container. This flag takes area-based timezones, GMT time, as well as `local`, which sets the timezone in the container to match the host machine. See `/usr/share/zoneinfo/` for valid timezones.
Remote connections use local containers.conf for defaults

[//]: # (END   included file options/tz.md)


[//]: # (BEGIN included file options/uidmap.container.md)
#### **--uidmap**=*[flags]container_uid\:from_uid[\:amount]*

Run the container in a new user namespace using the supplied UID mapping. This
option conflicts with the **--userns** and **--subuidname** options. This
option provides a way to map host UIDs to container UIDs. It can be passed
several times to map different ranges.

The possible values of the optional *flags* are discussed further down on this page.
The *amount* value is optional and assumed to be **1** if not given.

The *from_uid* value is based upon the user running the command, either rootful or rootless users.

* rootful user:  [*flags*]*container_uid*:*host_uid*[:*amount*]
* rootless user: [*flags*]*container_uid*:*intermediate_uid*[:*amount*]

  `Rootful mappings`


When **podman create** is called by a privileged user, the option **--uidmap**
works as a direct mapping between host UIDs and container UIDs.

host UID -> container UID

The _amount_ specifies the number of consecutive UIDs that is mapped.
If for example _amount_ is **4** the mapping looks like:

|   host UID     |    container UID    |
| ----------     | ----------------    |
| *from_uid*     | *container_uid*     |
| *from_uid* + 1 | *container_uid* + 1 |
| *from_uid* + 2 | *container_uid* + 2 |
| *from_uid* + 3 | *container_uid* + 3 |

  `Rootless mappings`

When **podman create** is called by an unprivileged user (i.e. running rootless),
the value *from_uid* is interpreted as an "intermediate UID". In the rootless
case, host UIDs are not mapped directly to container UIDs. Instead the mapping
happens over two mapping steps:

host UID -> intermediate UID -> container UID

The **--uidmap** option only influences the second mapping step.

The first mapping step is derived by Podman from the contents of the file
_/etc/subuid_ and the UID of the user calling Podman.

First mapping step:

| host UID            | intermediate UID |
| --------            | ---------------- |
| UID for Podman user |                0 |
| 1st subordinate UID |                1 |
| 2nd subordinate UID |                2 |
| 3rd subordinate UID |                3 |
| nth subordinate UID |                n |

To be able to use intermediate UIDs greater than zero, the user needs to have
subordinate UIDs configured in _/etc/subuid_. See **subuid**(5).

The second mapping step is configured with **--uidmap**.

If for example _amount_ is **5** the second mapping step looks like:

|   intermediate UID   |    container UID    |
| ------------------   | ----------------    |
| *from_uid*           | *container_uid*     |
| *from_uid* + 1       | *container_uid* + 1 |
| *from_uid* + 2       | *container_uid* + 2 |
| *from_uid* + 3       | *container_uid* + 3 |
| *from_uid* + 4       | *container_uid* + 4 |

When running as rootless, Podman uses all the ranges configured in the _/etc/subuid_ file.

The current user ID is mapped to UID=0 in the rootless user namespace.
Every additional range is added sequentially afterward:

|   host                | rootless user namespace | length              |
| ------                | ----------------------- | ------              |
| $UID                  | 0                       | 1                   |
| 1                     | $FIRST_RANGE_ID         | $FIRST_RANGE_LENGTH |
| 1+$FIRST_RANGE_LENGTH | $SECOND_RANGE_ID        | $SECOND_RANGE_LENGTH|

  `Referencing a host ID from the parent namespace`

As a rootless user, the given host ID in **--uidmap** or **--gidmap**
is mapped from the *intermediate namespace* generated by Podman. Sometimes
it is desirable to refer directly at the *host namespace*. It is possible
to manually do so, by running `podman unshare cat /proc/self/gid_map`,
finding the desired host id at the second column of the output, and getting
the corresponding intermediate id from the first column.

Podman can perform all that by preceding the host id in the mapping
with the `@` symbol. For instance, by specifying `--gidmap 100000:@2000:1`,
podman will look up the intermediate id corresponding to host id `2000` and
it will map the found intermediate id to the container id `100000`. The
given host id must have been subordinated (otherwise it would not be mapped
into the intermediate space in the first place).

If the length is greater than one, for instance with `--gidmap 100000:@2000:2`,
Podman will map host ids `2000` and `2001` to `100000` and `100001`, respectively,
regardless of how the intermediate mapping is defined.

  `Extending previous mappings`

Some mapping modifications may be cumbersome. For instance, a user
starts with a mapping such as `--gidmap="0:0:65000"`, that needs to be
changed such as the parent id `1000` is mapped to container id `100000`
instead, leaving container id `1` unassigned. The corresponding `--gidmap`
becomes `--gidmap="0:0:1" --gidmap="2:2:65534" --gidmap="100000:1:1"`.

This notation can be simplified using the `+` flag, that takes care of
breaking previous mappings removing any conflicting assignment with
the given mapping. The flag is given before the container id
as follows: `--gidmap="0:0:65000" --gidmap="+100000:1:1"`


 Flag      | Example       | Description
-----------|---------------|-------------
 `+`       | `+100000:1:1` | Extend the previous mapping

This notation leads to gaps in the assignment, so it may be convenient to
fill those gaps afterwards: `--gidmap="0:0:65000" --gidmap="+100000:1:1" --gidmap="1:65001:1"`

One specific use case for this flag is in the context of rootless
users. A rootless user may specify mappings with the `+` flag as
in `--gidmap="+100000:1:1"`. Podman will then "fill the gaps" starting
from zero with all the remaining intermediate ids. This is convenient when
a user wants to map a specific intermediate id to a container id, leaving
the rest of subordinate ids to be mapped by Podman at will.

  `Passing only one of --uidmap or --gidmap`

Usually, subordinated user and group ids are assigned simultaneously, and
for any user the subordinated user ids match the subordinated group ids.
For convenience, if only one of **--uidmap** or **--gidmap** is given,
podman assumes the mapping refers to both UIDs and GIDs and applies the
given mapping to both. If only one value of the two needs to be changed,
the mappings should include the `u` or the `g` flags to specify that
they only apply to UIDs or GIDs and should not be copied over.

 flag    | Example         | Description
---------|-----------------|-----------------
  `u`    | `u20000:2000:1` |The mapping only applies to UIDs
  `g`    | `g10000:1000:1` |The mapping only applies to GIDs

For instance given the command

    podman create --gidmap "0:0:1000" --gidmap "g2000:2000:1"

Since no **--uidmap** is given, the **--gidmap** is copied to **--uidmap**,
giving a command equivalent to

    podman create --gidmap "0:0:1000" --gidmap "2000:2000:1" --uidmap "0:0:1000"

The `--gidmap "g2000:2000:1"` used the `g` flag and therefore it was
not copied to **--uidmap**.

  `Rootless mapping of additional host GIDs`

A rootless user may desire to map a specific host group that has already been
subordinated within _/etc/subgid_ without specifying the rest of the mapping.

This can be done with **--gidmap "+g*container_gid*:@*host_gid*"**

Where:

- The host GID is given through the `@` symbol
- The mapping of this GID is not copied over to **--usermap** thanks to the `g` flag.
- The rest of the container IDs will be mapped starting from 0 to n,
  with all the remaining subordinated GIDs, thanks to the `+` flag.

For instance, if a user belongs to the group `2000` and that group is
subordinated to that user (with `usermod --add-subgids 2000-2000 $USER`),
the user can map the group into the container with: **--gidmap=+g100000:@2000**.

If this mapping is combined with the option, **--group-add=keep-groups**, the
process in the container will belong to group `100000`, and files belonging
to group `2000` in the host will appear as being owned by group `100000`
inside the container.

    podman run --group-add=keep-groups --gidmap="+g100000:@2000" ...

  `No subordinate UIDs`

Even if a user does not have any subordinate UIDs in  _/etc/subuid_,
**--uidmap** can be used to map the normal UID of the user to a
container UID by running `podman create --uidmap $container_uid:0:1 --user $container_uid ...`.

  `Pods`

The **--uidmap** option cannot be called in conjunction with the **--pod** option as a uidmap cannot be set on the container level when in a pod.

[//]: # (END   included file options/uidmap.container.md)


[//]: # (BEGIN included file options/ulimit.md)
#### **--ulimit**=*option*

Ulimit options. Sets the ulimits values inside of the container.

--ulimit with a soft and hard limit in the format <type>=<soft limit>[:<hard limit>]. For example:

$ podman run --ulimit nofile=1024:1024 --rm ubi9 ulimit -n
1024

Set -1 for the soft or hard limit to set the limit to the maximum limit of the current
process. In rootful mode this is often unlimited.


If nofile and nproc are unset, a default value of 1048576 will be used, unless overridden
in containers.conf(5).  However, if the default value exceeds the hard limit for the current
rootless user, the current hard limit will be applied instead.

Use **host** to copy the current configuration from the host.

Don't use nproc with the ulimit flag as Linux uses nproc to set the
maximum number of processes available to a user, not to a container.

Use the --pids-limit option to modify the cgroup control to limit the number
of processes within a container.

[//]: # (END   included file options/ulimit.md)


[//]: # (BEGIN included file options/umask.md)
#### **--umask**=*umask*

Set the umask inside the container. Defaults to `0022`.
Remote connections use local containers.conf for defaults

[//]: # (END   included file options/umask.md)


[//]: # (BEGIN included file options/unsetenv.md)
#### **--unsetenv**=*env*

Unset default environment variables for the container. Default environment
variables include variables provided natively by Podman, environment variables
configured by the image, and environment variables from containers.conf.

[//]: # (END   included file options/unsetenv.md)


[//]: # (BEGIN included file options/unsetenv-all.md)
#### **--unsetenv-all**

Unset all default environment variables for the container. Default environment
variables include variables provided natively by Podman, environment variables
configured by the image, and environment variables from containers.conf.

[//]: # (END   included file options/unsetenv-all.md)


[//]: # (BEGIN included file options/user.md)
#### **--user**, **-u**=*user[\:group]*

Sets the username or UID used and, optionally, the groupname or GID for the specified command. Both *user* and *group* may be symbolic or numeric.

Without this argument, the command runs as the user specified in the container image. Unless overridden by a `USER` command in the Containerfile or by a value passed to this option, this user generally defaults to root.

When a user namespace is not in use, the UID and GID used within the container and on the host match. When user namespaces are in use, however, the UID and GID in the container may correspond to another UID and GID on the host. In rootless containers, for example, a user namespace is always used, and root in the container by default corresponds to the UID and GID of the user invoking Podman.

[//]: # (END   included file options/user.md)


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

**ns:**_namespace_: run the container in the given existing user namespace.

[//]: # (END   included file options/userns.container.md)


[//]: # (BEGIN included file options/uts.container.md)
#### **--uts**=*mode*

Set the UTS namespace mode for the container. The following values are supported:

- **host**: use the host's UTS namespace inside the container.
- **private**: create a new namespace for the container (default).
- **ns:[path]**: run the container in the given existing UTS namespace.
- **container:[container]**: join the UTS namespace of the specified container.

[//]: # (END   included file options/uts.container.md)


[//]: # (BEGIN included file options/variant.container.md)
#### **--variant**=*VARIANT*

Use _VARIANT_ instead of the default architecture variant of the container image. Some images can use multiple variants of the arm architectures, such as arm/v5 and arm/v7.

[//]: # (END   included file options/variant.container.md)


[//]: # (BEGIN included file options/volume.md)
#### **--volume**, **-v**=*[[SOURCE-VOLUME|HOST-DIR:]CONTAINER-DIR[\:OPTIONS]]*

Create a bind mount. If `-v /HOST-DIR:/CONTAINER-DIR` is specified, Podman
bind mounts `/HOST-DIR` from the host into `/CONTAINER-DIR` in the Podman
container. Similarly, `-v SOURCE-VOLUME:/CONTAINER-DIR` mounts the named
volume from the host into the container. If no such named volume exists,
Podman creates one. If no source is given, the volume is created
as an anonymously named volume with a randomly generated name, and is
removed when the container is removed via the `--rm` flag or
the `podman rm --volumes` command.

(Note when using the remote client, including Mac and Windows (excluding WSL2) machines, the volumes are mounted from the remote server, not necessarily the client machine.)

The _OPTIONS_ is a comma-separated list and can be one or more of:

* **rw**|**ro**
* **z**|**Z**
* [**O**]
* [**U**]
* [**no**]**copy**
* [**no**]**dev**
* [**no**]**exec**
* [**no**]**suid**
* [**r**]**bind**
* [**r**]**shared**|[**r**]**slave**|[**r**]**private**[**r**]**unbindable** <sup>[[1]](#Footnote1)</sup>
* **idmap**[=**options**]

The `CONTAINER-DIR` must be an absolute path such as `/src/docs`. The volume
is mounted into the container at this directory.

If a volume source is specified, it must be a path on the host or the name of a
named volume. Host paths are allowed to be absolute or relative; relative paths
are resolved relative to the directory Podman is run in. If the source does not
exist, Podman returns an error. Users must pre-create the source files or
directories.

Any source that does not begin with a `.` or `/` is treated as the name of
a named volume. If a volume with that name does not exist, it is created.
Volumes created with names are not anonymous, and they are not removed by the `--rm`
option and the `podman rm --volumes` command.

Specify multiple **-v** options to mount one or more volumes into a
container.

`Write Protected Volume Mounts`

Add **\:ro** or **\:rw** option to mount a volume in read-only or
read-write mode, respectively. By default, the volumes are mounted read-write.
See examples.

`Chowning Volume Mounts`

By default, Podman does not change the owner and group of source volume
directories mounted into containers. If a container is created in a new
user namespace, the UID and GID in the container may correspond to another UID
and GID on the host.

The `\:U` suffix tells Podman to use the correct host UID and GID based on the
UID and GID within the container, to change recursively the owner and
group of the source volume. Chowning walks the file system under the volume and
changes the UID/GID on each file. If the volume has thousands of inodes, this
process takes a long time, delaying the start of the container.

**Warning** use with caution since this modifies the host filesystem.

`Labeling Volume Mounts`

Labeling systems like SELinux require that proper labels are placed on volume
content mounted into a container. Without a label, the security system
might prevent the processes running inside the container from using the
content. By default, Podman does not change the labels set by the OS.

To change a label in the container context, add either of two suffixes
**\:z** or **\:Z** to the volume mount. These suffixes tell Podman to relabel file
objects on the shared volumes. The **z** option tells Podman that two or more
containers share the volume content. As a result, Podman labels the
content with a shared content label. Shared volume labels allow all containers
to read/write content. The **Z** option tells Podman to label the content with
a private unshared label Only the current container can use a private
volume. Note: all containers within a `pod` share the same SELinux label. This
means all containers within said pod can read/write volumes shared into the
container created with the `\:Z` on any of one the containers. Relabeling walks
the file system under the volume and changes the label on each file, if the
volume has thousands of inodes, this process takes a long time, delaying the
start of the container. If the volume was previously relabeled with the
`z` option, Podman is optimized to not relabel a second time. If files are
moved into the volume, then the labels can be manually change with the
`chcon -Rt container_file_t PATH` command.

Note: Do not relabel system files and directories. Relabeling system content
might cause other confined services on the machine to fail.  For these types
of containers we recommend disabling SELinux separation.  The option
**--security-opt label=disable** disables SELinux separation for the container.
For example if a user wanted to volume mount their entire home directory into a
container, they need to disable SELinux separation.

    $ podman create --security-opt label=disable -v $HOME:/home/user fedora touch /home/user/file

`Overlay Volume Mounts`

The `\:O` flag tells Podman to mount the directory from the host as a
temporary storage using the `overlay file system`. The container processes
can modify content within the mountpoint which is stored in the
container storage in a separate directory. In overlay terms, the source
directory is the lower, and the container storage directory is the
upper. Modifications to the mount point are destroyed when the container
finishes executing, similar to a tmpfs mount point being unmounted.

For advanced users, the **overlay** option also supports custom non-volatile
**upperdir** and **workdir** for the overlay mount. Custom **upperdir** and
**workdir** can be fully managed by the users themselves, and Podman does not
remove it on lifecycle completion.
Example **\:O,upperdir=/some/upper,workdir=/some/work**

Subsequent executions of the container sees the original source directory
content, any changes from previous container executions no longer exist.

One use case of the overlay mount is sharing the package cache from the
host into the container to allow speeding up builds.

Note: The `O` flag conflicts with other options listed above.

Content mounted into the container is labeled with the private label.
On SELinux systems, labels in the source directory must be readable
by the  container label. Usually containers can read/execute `container_share_t`
and can read/write `container_file_t`. If unable to change the labels on a
source volume, SELinux container separation must be disabled for the  container
to work.

Do not modify the source directory mounted into the container with an overlay mount,
it can cause unexpected failures. Only modify the directory after the container finishes running.

`Mounts propagation`

By default, bind-mounted volumes are `private`. That means any mounts done
inside the container are not visible on the host and vice versa.
One can change this behavior by specifying a volume mount propagation property.
When a volume is `shared`, mounts done under that volume inside the container
are visible on host and vice versa. Making a volume **slave**<sup>[[1]](#Footnote1)</sup>
enables only one-way mount propagation: mounts done on the host under that volume
are visible inside the container but not the other way around.

To control mount propagation property of a volume one can use the [**r**]**shared**,
[**r**]**slave**, [**r**]**private** or the [**r**]**unbindable** propagation flag.
Propagation property can be specified only for bind mounted volumes and not for
internal volumes or named volumes. For mount propagation to work the source mount
point (the mount point where source dir is mounted on) has to have the right propagation
properties. For shared volumes, the source mount point has to be shared. And for
slave volumes, the source mount point has to be either shared or slave.
<sup>[[1]](#Footnote1)</sup>

To recursively mount a volume and all of its submounts into a
container, use the **rbind** option. By default the bind option is
used, and submounts of the source directory is not mounted into the
container.

Mounting the volume with a **copy** option tells podman to copy content from
the underlying destination directory onto newly created internal volumes. The
**copy** only happens on the initial creation of the volume. Content is not
copied up when the volume is subsequently used on different containers. The
**copy** option is ignored on bind mounts and has no effect.

Mounting volumes with the **nosuid** options means that SUID executables on the
volume can not be used by applications to change their privilege. By default
volumes are mounted with **nosuid**.

Mounting the volume with the **noexec** option means that no executables on the
volume can be executed within the container.

Mounting the volume with the **nodev** option means that no devices on the volume
can be used by processes within the container. By default volumes
are mounted with **nodev**.

If the _HOST-DIR_ is a mount point, then **dev**, **suid**, and **exec** options are
ignored by the kernel.

Use **df HOST-DIR** to figure out the source mount, then use
**findmnt -o TARGET,PROPAGATION _source-mount-dir_** to figure out propagation
properties of source mount. If **findmnt**(1) utility is not available, then one
can look at the mount entry for the source mount point in _/proc/self/mountinfo_. Look
at the "optional fields" and see if any propagation properties are specified.
In there, **shared:N** means the mount is shared, **master:N** means mount
is slave, and if nothing is there, the mount is private. <sup>[[1]](#Footnote1)</sup>

To change propagation properties of a mount point, use **mount**(8) command. For
example, if one wants to bind mount source directory _/foo_, one can do
**mount --bind /foo /foo** and **mount --make-private --make-shared /foo**. This
converts /foo into a shared mount point. Alternatively, one can directly
change propagation properties of source mount. Say _/_ is source mount for
_/foo_, then use **mount --make-shared /** to convert _/_ into a shared mount.

Note: if the user only has access rights via a group, accessing the volume
from inside a rootless container fails.

`Idmapped mount`

If `idmap` is specified, create an idmapped mount to the target user
namespace in the container. The idmap option supports a custom mapping
that can be different than the user namespace used by the
container. The mapping can be specified after the idmap option like:
`idmap=uids=0-1-10#10-11-10;gids=0-100-10`.
For each triplet, the first value is the start of the backing file
system IDs that are mapped to the second value on the host.  The
length of this mapping is given in the third value.
Multiple ranges are separated with #.

[//]: # (END   included file options/volume.md)

Use the **--group-add keep-groups** option to pass the user's supplementary group access into the container.


[//]: # (BEGIN included file options/volumes-from.md)
#### **--volumes-from**=*CONTAINER[\:OPTIONS]*

Mount volumes from the specified container(s). Used to share volumes between
containers. The *options* is a comma-separated list with the following available elements:

* **rw**|**ro**
* **z**

Mounts already mounted volumes from a source container onto another
container. _CONTAINER_ may be a name or ID.
To share a volume, use the --volumes-from option when running
the target container. Volumes can be shared even if the source container
is not running.

By default, Podman mounts the volumes in the same mode (read-write or
read-only) as it is mounted in the source container.
This can be changed by adding a `ro` or `rw` _option_.

Labeling systems like SELinux require that proper labels are placed on volume
content mounted into a container. Without a label, the security system might
prevent the processes running inside the container from using the content. By
default, Podman does not change the labels set by the OS.

To change a label in the container context, add `z` to the volume mount.
This suffix tells Podman to relabel file objects on the shared volumes. The `z`
option tells Podman that two entities share the volume content. As a result,
Podman labels the content with a shared content label. Shared volume labels allow
all containers to read/write content.

If the location of the volume from the source container overlaps with
data residing on a target container, then the volume hides
that data on the target.

[//]: # (END   included file options/volumes-from.md)


[//]: # (BEGIN included file options/workdir.md)
#### **--workdir**, **-w**=*dir*

Working directory inside the container.

The default working directory for running binaries within a container is the root directory (**/**).
The image developer can set a different default with the WORKDIR instruction. The operator
can override the working directory by using the **-w** option.

[//]: # (END   included file options/workdir.md)

## EXAMPLES

Create a container using a local image:
```
$ podman create alpine ls
```

Create a container using a local image and annotate it:
```
$ podman create --annotation HELLO=WORLD alpine ls
```

Create a container using a local image, allocating a pseudo-TTY, keeping stdin open and name it myctr:
```
  podman create -t -i --name myctr alpine ls
```

Running a container in a new user namespace requires a mapping of
the UIDs and GIDs from the host:
```
$ podman create --uidmap 0:30000:7000 --gidmap 0:30000:7000 fedora echo hello
```

Setting automatic user-namespace separated containers:
```
# podman create --userns=auto\:size=65536 ubi8-init
```

Configure the timezone in a container:
```
$ podman create --tz=local alpine date
$ podman create --tz=Asia/Shanghai alpine date
$ podman create --tz=US/Eastern alpine date
```

Ensure the first container (container1) is running before the second container (container2) is started:
```
$ podman create --name container1 -t -i fedora bash
$ podman create --name container2 --requires container1 -t -i fedora bash
$ podman start --attach container2
```

Create a container which requires multiple containers:
```
$ podman create --name container1 -t -i fedora bash
$ podman create --name container2 -t -i fedora bash
$ podman create --name container3 --requires container1,container2 -t -i fedora bash
$ podman start --attach container3
```

Expose shared libraries inside of container as read-only using a glob:
```
$ podman create --mount type=glob,src=/usr/lib64/libnvidia\*,ro -i -t fedora /bin/bash
```

Create a container allowing supplemental groups to have access to the volume:
```
$ podman create -v /var/lib/design:/var/lib/design --group-add keep-groups ubi8
```

Configure execution domain for containers using the personality option:
```
$ podman create --name container1 --personality=LINUX32 fedora bash
```

Create a container with external rootfs mounted as an overlay:
```
$ podman create --name container1 --rootfs /path/to/rootfs:O bash
```

Create a container connected to two networks (called net1 and net2) with a static ip:
```
$ podman create --network net1\:ip=10.89.1.5 --network net2:ip=10.89.10.10 alpine ip addr
```

### Rootless Containers

Podman runs as a non-root user on most systems. This feature requires that a new enough version of shadow-utils
be installed. The shadow-utils package must include the newuidmap and newgidmap executables.

In order for users to run rootless, there must be an entry for their username in /etc/subuid and /etc/subgid which lists the UIDs for their user namespace.

Rootless Podman works better if the fuse-overlayfs and slirp4netns packages are installed.
The fuse-overlayfs package provides a userspace overlay storage driver, otherwise users need to use
the vfs storage driver, which can be disk space expensive and less performant
than other drivers.

To enable VPN on the container, slirp4netns or pasta needs to be specified;
without either, containers need to be run with the --network=host flag.

## ENVIRONMENT

Environment variables within containers can be set using multiple different options:  This section describes the precedence.

Precedence order (later entries override earlier entries):

- **--env-host** : Host environment of the process executing Podman is added.
- **--http-proxy**: By default, several environment variables are passed in from the host, such as **http_proxy** and **no_proxy**. See **--http-proxy** for details.
- Container image : Any environment variables specified in the container image.
- **--env-file** : Any environment variables specified via env-files. If multiple files specified, then they override each other in order of entry.
- **--env** : Any environment variables specified overrides previous settings.

Create containers and set the environment ending with a __*__.
The trailing __*__ glob functionality is only active when no value is specified:

```
$ export ENV1=a
$ podman create --name ctr1 --env 'ENV*' alpine env
$ podman start --attach ctr1 | grep ENV
ENV1=a
$ podman create --name ctr2 --env 'ENV*=b' alpine env
$ podman start --attach ctr2 | grep ENV
ENV*=b
```

## CONMON

When Podman starts a container it actually executes the conmon program, which
then executes the OCI Runtime.  Conmon is the container monitor.  It is a small
program whose job is to watch the primary process of the container, and if the
container dies, save the exit code.  It also holds open the tty of the
container, so that it can be attached to later. This is what allows Podman to
run in detached mode (backgrounded), so Podman can exit but conmon continues to
run.  Each container has their own instance of conmon. Conmon waits for the
container to exit, gathers and saves the exit code, and then launches a Podman
process to complete the container cleanup, by shutting down the network and
storage.   For more information about conmon, see the conmon(8) man
page.

## FILES

**/etc/subuid**
**/etc/subgid**

NOTE: Use the environment variable `TMPDIR` to change the temporary storage location of downloaded container images. Podman defaults to use `/var/tmp`.

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-save(1)](podman-save.1.md)**, **[podman-ps(1)](podman-ps.1.md)**, **[podman-attach(1)](podman-attach.1.md)**, **[podman-pod-create(1)](podman-pod-create.1.md)**, **[podman-port(1)](podman-port.1.md)**, **[podman-start(1)](podman-start.1.md)**, **[podman-kill(1)](podman-kill.1.md)**, **[podman-stop(1)](podman-stop.1.md)**, **[podman-generate-systemd(1)](podman-generate-systemd.1.md)**, **[podman-rm(1)](podman-rm.1.md)**, **[subgid(5)](https://www.unix.com/man-page/linux/5/subgid)**, **[subuid(5)](https://www.unix.com/man-page/linux/5/subuid)**, **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)**, **[systemd.unit(5)](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)**, **[setsebool(8)](https://man7.org/linux/man-pages/man8/setsebool.8.html)**, **[slirp4netns(1)](https://github.com/rootless-containers/slirp4netns/blob/master/slirp4netns.1.md)**, **[pasta(1)](https://passt.top/builds/latest/web/passt.1.html)**, **[fuse-overlayfs(1)](https://github.com/containers/fuse-overlayfs/blob/main/fuse-overlayfs.1.md)**, **proc(5)**, **[conmon(8)](https://github.com/containers/conmon/blob/main/docs/conmon.8.md)**, **personality(2)**

### Troubleshooting

See [podman-troubleshooting(7)](https://github.com/containers/podman/blob/main/troubleshooting.md)
for solutions to common issues.

See [podman-rootless(7)](https://github.com/containers/podman/blob/main/rootless.md)
for rootless issues.

## HISTORY
October 2017, converted from Docker documentation to Podman by Dan Walsh for Podman `<dwalsh@redhat.com>`

November 2014, updated by Sven Dowideit `<SvenDowideit@home.org.au>`

September 2014, updated by Sven Dowideit `<SvenDowideit@home.org.au>`

August 2014, updated by Sven Dowideit `<SvenDowideit@home.org.au>`

## FOOTNOTES
<a name="Footnote1">1</a>: The Podman project is committed to inclusivity, a core value of open source. The `master` and `slave` mount propagation terminology used here is problematic and divisive, and needs to be changed. However, these terms are currently used within the Linux kernel and must be used as-is at this time. When the kernel maintainers rectify this usage, Podman will follow suit immediately.
