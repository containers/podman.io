---
title: podman-init
version: v5.5.2
---

% podman-init 1

## NAME
podman\-init - Initialize one or more containers

## SYNOPSIS
**podman init** [*options*] *container* [*container*...]

**podman container init** [*options*] *container* [*container*...]

## DESCRIPTION
Initialize one or more containers.
You may use container IDs or names as input.
Initializing a container performs all tasks necessary for starting the container (mounting filesystems, creating an OCI spec, initializing the container network) but does not start the container.
If a container is not initialized, the `podman start` and `podman run` commands initialize it automatically prior to starting it.
This command is intended to be used for inspecting a container's filesystem or OCI spec prior to starting it.
This can be used to inspect the container before it runs, or debug why a container is failing to run.

## OPTIONS

#### **--all**, **-a**

Initialize all containers. Containers that have already initialized (including containers that have been started and are running) are ignored.


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)

## EXAMPLE

Initialize specified container with a given ID.
```
podman init 35480fc9d568
```

Initialize specified container with a given name.
```
podman init test1
```

Initialize the latest container. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)
```
podman init --latest
```
## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-start(1)](podman-start.1.md)**

## HISTORY
April 2019, Originally compiled by Matthew Heon <mheon@redhat.com>
