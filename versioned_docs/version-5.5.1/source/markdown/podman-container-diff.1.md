---
title: podman-container-diff
version: v5.5.1
---

% podman-container-diff 1

## NAME
podman\-container\-diff - Inspect changes on a container's filesystem

## SYNOPSIS
**podman container diff** [*options*] *container* [*container*]

## DESCRIPTION
Displays changes on a container's filesystem. The container is compared to its parent layer or the second argument when given.

The output is prefixed with the following symbols:

| Symbol | Description |
|--------|-------------|
| A | A file or directory was added.   |
| D | A file or directory was deleted. |
| C | A file or directory was changed. |

## OPTIONS

#### **--format**

Alter the output into a different format. The only valid format for **podman container diff** is `json`.


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)

## EXAMPLE

```
# podman container diff container1
C /usr
C /usr/local
C /usr/local/bin
A /usr/local/bin/docker-entrypoint.sh
```

```
$ podman container diff --format json container1 container2
{
     "added": [
          "/test"
     ]
}
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-container(1)](podman-container.1.md)**

## HISTORY
July 2021, Originally compiled by Paul Holzinger <pholzing@redhat.com>
