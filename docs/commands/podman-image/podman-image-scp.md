% podman-image-scp 1

## NAME

podman-image-scp - Securely copy an image from one host to another

## SYNOPSIS

**podman image scp** [*options*] _name_[:*tag*]

## DESCRIPTION

**podman image scp** copies container images between hosts on a network. This command can copy images to the remote host or from the remote host as well as between two remote hosts.
Note: `::` is used to specify the image name depending on Podman is saving or loading. Images can also be transferred from rootful to rootless storage on the same machine without using sshd. This feature is not supported on the remote client, including Mac and Windows (excluding WSL2) machines.

**podman image scp [GLOBAL OPTIONS]**

**podman image** _scp [OPTIONS] NAME[:TAG] [HOSTNAME::]_

**podman image** _scp [OPTIONS] [HOSTNAME::]IMAGENAME_

**podman image** _scp [OPTIONS] [HOSTNAME::]IMAGENAME [HOSTNAME::]_

## OPTIONS

#### **--help**, **-h**

Print usage statement

#### **--quiet**, **-q**

Suppress the output

## EXAMPLES

```
$ podman image scp alpine
Loaded image: docker.io/library/alpine:latest
```

```
$ podman image scp alpine Fedora::/home/charliedoern/Documents/alpine
Getting image source signatures
Copying blob 72e830a4dff5 done
Copying config 85f9dc67c7 done
Writing manifest to image destination
Storing signatures
Loaded image: docker.io/library/alpine:latest
```

```
$ podman image scp Fedora::alpine RHEL::
Loaded image: docker.io/library/alpine:latest
```

```
$ podman image scp charliedoern@19268.6826:22/run/user/1000/podman/podman.sock::alpine
WARN[0000] Unknown connection name given. Please use system connection add to specify the default remote socket location
Getting image source signatures
Copying blob 9450ef9feb15 [--------------------------------------] 0.0b / 0.0b
Copying config 1f97f0559c done
Writing manifest to image destination
Storing signatures
Loaded image: docker.io/library/alpine:latest
```

```
$ sudo podman image scp root@localhost::alpine username@localhost::
Copying blob e2eb06d8af82 done
Copying config 696d33ca15 done
Writing manifest to image destination
Storing signatures
Getting image source signatures
Copying blob 5eb901baf107 skipped: already exists
Copying config 696d33ca15 done
Writing manifest to image destination
Storing signatures
Loaded image: docker.io/library/alpine:latest
```

```
$ sudo podman image scp root@localhost::alpine
Copying blob e2eb06d8af82 done
Copying config 696d33ca15 done
Writing manifest to image destination
Storing signatures
Getting image source signatures
Copying blob 5eb901baf107
Copying config 696d33ca15 done
Writing manifest to image destination
Storing signatures
Loaded image: docker.io/library/alpine:latest
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-load(1)](commands/podman-load.md)**, **[podman-save(1)](commands/podman-save.md)**, **[podman-remote(1)](commands/podman-remote.md)**, **[podman-system-connection-add(1)](commands/podman-system-connection/podman-system-connection-add.md)**, **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)**, **[containers-transports(5)](https://github.com/containers/image/blob/main/docs/containers-transports.5.md)**

## HISTORY

July 2021, Originally written by Charlie Doern <cdoern@redhat.com>
