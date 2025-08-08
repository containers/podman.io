---
title: podman-attach
version: v5.4.1
---

% podman-attach 1

## NAME
podman\-attach - Attach to a running container

## SYNOPSIS
**podman attach** [*options*] *container*

**podman container attach** [*options*] *container*

## DESCRIPTION
**podman attach** attaches to a running *container* using the *container's name* or *ID*, to either view its ongoing output or to control it interactively.\
The *container* can be detached from (and leave it running) using a configurable key sequence. The default sequence is `ctrl-p,ctrl-q`. Configure the keys sequence using the **--detach-keys** OPTION, or specifying it in the `containers.conf` file: see **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)** for more information.

## OPTIONS

[//]: # (BEGIN included file options/detach-keys.md)
#### **--detach-keys**=*sequence*

Specify the key sequence for detaching a container. Format is a single character `[a-Z]` or one or more `ctrl-<value>` characters where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,` or `_`. Specifying "" disables this feature. The default is *ctrl-p,ctrl-q*.

This option can also be set in **containers.conf**(5) file.

[//]: # (END   included file options/detach-keys.md)


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)

#### **--no-stdin**

Do not attach STDIN. The default is **false**.


[//]: # (BEGIN included file options/sig-proxy.md)
#### **--sig-proxy**

Proxy received signals to the container process. SIGCHLD, SIGURG, SIGSTOP, and SIGKILL are not proxied.

[//]: # (END   included file options/sig-proxy.md)

The default is **true**.

## EXAMPLES
Attach to a container called "foobar".
```
$ podman attach foobar
```

Attach to the latest created container. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)
```
$ podman attach --latest
```

Attach to a container that start with the ID "1234".
```
$ podman attach 1234
```

Attach to a container without attaching STDIN.
```
$ podman attach --no-stdin foobar
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-exec(1)](podman-exec.1.md)**, **[podman-run(1)](podman-run.1.md)**, **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)**
