% podman-container-cleanup 1

## NAME

podman\-container\-cleanup - Clean up the container's network and mountpoints

## SYNOPSIS

**podman container cleanup** [*options*] _container_ [*container* ...]

## DESCRIPTION

**podman container cleanup** cleans up exited _containers_ by removing all mountpoints and network configuration from the host. The _container name_ or _ID_ can be used. The cleanup command does not remove the _containers_. Running _containers_ will not be cleaned up.\
Sometimes container mount points and network stacks can remain if the podman command was killed or the _container_ ran in daemon mode. This command is automatically executed when _containers_ are run in daemon mode by the `conmon process` when the _container_ exits.

## OPTIONS

#### **--all**, **-a**

Clean up all _containers_.\
The default is **false**.\
_IMPORTANT: This OPTION does not need a container name or ID as input argument._

#### **--exec**=_session_

Clean up an exec session for a single _container_.
Can only be specified if a single _container_ is being cleaned up (conflicts with **--all** as such). If **--rm** is not specified, temporary files for the exec session will be cleaned up; if it is, the exec session will be removed from the _container_.\
_IMPORTANT: Conflicts with **--rmi** as the container is not being cleaned up so the image cannot be removed._

#### **--latest**, **-l**

Instead of providing the _container ID_ or _name_, use the last created _container_. If other methods than Podman are used to run _containers_ such as `CRI-O`, the last started _container_ could be from either of those methods.\
The default is **false**.\
_IMPORTANT: This OPTION is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines. This OPTION does not need a container name or ID as input argument._

#### **--rm**

After cleanup, remove the _container_ entirely.\
The default is **false**.

#### **--rmi**

After cleanup, remove the image entirely.\
The default is **false**.

## EXAMPLES

Clean up the container "mywebserver".

```
$ podman container cleanup mywebserver
```

Clean up the containers with the names "mywebserver", "myflaskserver", "860a4b23".

```
$ podman container cleanup mywebserver myflaskserver 860a4b23
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-container(1)](podman-container/podman-container.md)**, **[conmon(8)](https://github.com/containers/conmon/blob/main/docs/conmon.8.md)**

## HISTORY

Jun 2018, Originally compiled by Dan Walsh <dwalsh@redhat.com>
