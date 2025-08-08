---
title: podman-port
version: v5.5.1
---

% podman-port 1

## NAME
podman\-port - List port mappings for a container

## SYNOPSIS
**podman port** [*options*] *container* [*private-port*[/*proto*]]

**podman container port** [*options*] *container* [*private-port*[/*proto*]]

## DESCRIPTION
List port mappings for the *container* or look up the public-facing port that is NAT-ed to the *private-port*.

## OPTIONS

#### **--all**, **-a**

List all known port mappings for running containers; when using this option, container names or private ports/protocols filters cannot be used.


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)

## EXAMPLE

List all port mappings:
```
# podman port -a
b4d2f05432e482e017b1a4b2eae15fa7b4f6fb7e9f65c1bde46294fdef285906
80/udp -> 0.0.0.0:44327
80/tcp -> 0.0.0.0:44327
#
```

List port mappings for a specific container:
```
# podman port b4d2f054
80/udp -> 0.0.0.0:44327
80/tcp -> 0.0.0.0:44327
#
```
List the specified port mappings for a specific container:
```
# podman port b4d2f054 80
 0.0.0.0:44327
#
```

List the port mappings for a specific container for port 80 and the tcp protocol:
```
# podman port b4d2f054 80/tcp
0.0.0.0:44327
#
```
## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-inspect(1)](podman-inspect.1.md)**

## HISTORY
January 2018, Originally compiled by Brent Baude <bbaude@redhat.com>
