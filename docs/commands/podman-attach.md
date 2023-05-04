---
label: Podman Attach
---

## NAME

podman\-attach - Attach to a running container

## SYNOPSIS

**podman attach** [*options*] _container_

**podman container attach** [*options*] _container_

## DESCRIPTION

**podman attach** attaches to a running _container_ using the _container's name_ or _ID_, to either view its ongoing output or to control it interactively.\
The _container_ can be detached from (and leave it running) using a configurable key sequence. The default sequence is `ctrl-p,ctrl-q`. Configure the keys sequence using the **--detach-keys** OPTION, or specifying it in the `containers.conf` file: see **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)** for more information.

## OPTIONS

@@option detach-keys

@@option latest

#### **--no-stdin**

Do not attach STDIN. The default is **false**.

@@option sig-proxy

The default is **true**.

## EXAMPLES

Attach to a container called "foobar".

```
$ podman attach foobar
```

Attach to the latest created container.

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

**[podman(1)](podman.md)**, **[podman-exec(1)](commands/podman-exec.md)**, **[podman-run(1)]\commands/podman-run.md)**, **[containers.conf(5)](https://github.com/containers/common/blob/main/docs/containers.conf.5.md)**
