# Podman performance guide

The performance of Podman may be influenced by a number of factors, such as,

- the specified Podman command-line options and configuration
- the OCI runtime
- the host file system
- the container image

Changing any of these may or may not have any noticeable effect on the performance of Podman on your system.

## Using a separate user account for benchmarking

Some performance tips, such as using a different storage driver would require the user to run `podman system reset`,
which erases all containers and container images for the user.
Instead of benchmarking different alternatives in your own home directory, you could create a new user
that afterwards can be removed.

### Example: Specify the storage driver _vfs_ and run `/bin/true` in an Alpine container

Interactively

```
sudo useradd testuser
sudo machinectl testuser@
podman pull docker.io/library/alpine
/usr/bin/time -v podman --storage-driver=vfs run --rm docker.io/library/alpine /bin/true
exit
```

Noninteractively

```
sudo useradd testuser
systemd-run --machine=testuser@ --quiet --user --collect --pipe --wait \
   podman --storage-driver=vfs pull docker.io/library/alpine
systemd-run --machine=testuser@ --quiet --user --collect --pipe --wait \
   /usr/bin/time -v podman --storage-driver=vfs run --rm docker.io/library/alpine /bin/true
```

The command `/usr/bin/time -v` measures and displays benchmarking information.

## Performance considerations

### Use a fast OCI runtime

Podman uses an OCI runtime when running containers.
The fastest OCI runtime is probably [**crun**](https://github.com/containers/crun).

Check that you are using crun

```
$ podman info --format={{.Host.OCIRuntime.Name}}
crun
```

To benchmark an OCI runtime, create a test user account and
specify the OCI runtime path with [**--runtime**](https://docs.podman.io/en/latest/markdown/podman.1.html#runtime-value).

### Choosing a storage driver

The following storage drivers are listed from fastest to slowest:

1. native overlayfs
2. fuse-overlayfs
3. vfs

Using native overlayfs as an unprivileged user is only available for Podman version >= 3.1 on a Linux kernel version >= 5.12.

To show the current storage driver

```
$ podman info -f {{.Store.GraphDriverName}}
overlay
$ podman info -f '{{index .Store.GraphStatus "Native Overlay Diff"}}'
true
```

| Storage driver   | Result of `podman info -f {{.Store.GraphDriverName}}` | Result of `podman info -f '{{index .Store.GraphStatus "Native Overlay Diff"}}` |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| native overlayfs | overlay                                               | true                                                                           |
| fuse-overlayfs   | overlay                                               | false                                                                          |
| VFS              | vfs                                                   | false                                                                          |

Before changing the storage driver, running `podman system reset` is required.
The command erases all containers and container images for the user.
See the example above "_Using a separate user account for benchmarking_" for how to benchmark a storage driver in a separate test account.

#### Specifying the storage driver with command-line options

| Storage driver   | Podman command                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| native overlayfs | `podman --storage-driver=overlay run ...`                                                             |
| fuse-overlayfs   | `podman --storage-driver=overlay --storage-opt overlay.mount_program=/usr/bin/fuse-overlayfs run ...` |
| VFS              | `podman --storage-driver=vfs run ...`                                                                 |

#### Configuring the default storage driver

The default storage driver can be configured in
_/etc/containers/storage.conf_ and overridden by a user in
_~/.config/containers/storage.conf_

To configure native overlayfs:

```
[storage]
driver = "overlay"
```

To configure fuse-overlayfs:

```
[storage]
driver = "overlay"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
```

To configure VFS:

```
[storage]
driver = "vfs"
```

See storage.conf(5) for all available configuration settings.

### Network performance for rootless Podman

When using rootless Podman, network traffic is normally passed through
[slirp4netns](https://github.com/containers/podman/blob/main/docs/tutorials/basic_networking.md#slirp4netns).
This comes with a performance penalty.

You can avoid using slirp4netns in the following ways:

- Use socket activation for listening network sockets. Communication over the activated socket does not pass through
  slirp4netns, so it has the same performance characteristics as the normal network on the host.
  Socket-activated services can be started and stopped in different ways:

  - Let systemd start the service when the first client connects. Let the service terminate by itself after some time of inactivity.
    Using a service on demand, can free up compute resources.
  - Start the service explicitly (`systemctl --user enable foobar.service`). If the service is already
    running when the first client connects, there will be no delay due to container startup.
    The [socket activation tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/socket_activation.md)
    provides more information about socket activation support in Podman.

- Use the network driver [_pasta_](https://passt.top/passt/about/#pasta). Pasta is under development and currently needs a patched Podman to run.

- Set up the network manually as root. Create a bridge and virtual ethernet pair (VETH). See the [example](https://lists.podman.io/archives/list/podman@lists.podman.io/thread/W6MCYO6RY5YFRTSUDAOEZA7SC2EFXRZE/) posted on the Podman mailing list. See also the section _DIY networking_ in [Podman-Rootless-Networking.pdf](https://podman.io/community/meeting/notes/2021-10-05/Podman-Rootless-Networking.pdf).

- Use `--network=host`. No network namespace is created. The container will use the host’s network.
  Note: By using `--network=host`, the container is given full access to local system services such as D-bus and is therefore considered insecure.

### Lazy pulling of container images

Podman supports lazy pulling for the following container image formats:

- **zstd:chunked**

- **eStargz**

**zstd:chunked** has better performance than **eStargz**.

See the article [_Pull container images faster with partial pulls_](https://www.redhat.com/sysadmin/faster-container-image-pulls) by Giuseppe Scrivano and Dan Walsh.

### Choosing a host file system

Lazy pulling of container images can run more efficiently when the file system has reflink support. The file systems XFS and BTRFS have reflink support.

### Option --log-driver

The `podman run` option [**--log-driver**](https://docs.podman.io/en/latest/markdown/podman-run.1.html#log-driver-driver) specifies the logging driver for the container.

If logging is not needed, consider using `--log-driver=none` to disable logging.

### Reuse the package repository cache when building container images

The first step of a container build is often to download metadata from
the package repositories and post-process that data.

To speed up container builds, you could prepare a directory on the host
that contains the package metadata and then make the directory available
to the container build by using an _overlay mount_.

#### Example : Speed up _podman build_ by reusing the DNF metadata cache

In this example the containers are based on Fedora 36.

First create an empty directory on the host, for example _$HOME/dnf_cache_f36_.

```
$ mkdir $HOME/dnf_cache_f36
```

Fill the directory with the most recent **dnf** metadata cache.

```
$ podman run --rm -v $HOME/dnf_cache_f36:/var/cache/dnf:Z registry.fedoraproject.org/fedora:36 dnf makecache
```

Create a new directory, for example, _$HOME/ctr_ and a file _$HOME/ctr/Containerfile_ with these contents

```
FROM registry.fedoraproject.org/fedora:36
RUN dnf -y update && dnf -y install cowsay && dnf clean all
```

To build the Containerfile using the prepared metadata cache, provide the directory _$HOME/dnf_cache_f36_ as an _overlay mount_ (volume option `:O`)

```
$ podman build -v $HOME/dnf_cache_f36:/var/cache/dnf:O -t cowsay $HOME/ctr
```

The article [_Speeding up container image builds with Buildah_](https://www.redhat.com/sysadmin/speeding-container-buildah) by Dan Walsh provides more details.
