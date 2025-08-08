---
title: podman-pod-top
version: v5.4.2
---

% podman-pod-top 1

## NAME
podman\-pod\-top - Display the running processes of containers in a pod

## SYNOPSIS
**podman pod top** [*options*] *pod* [*format-descriptors*]

## DESCRIPTION
Display the running processes of containers in a pod. The *format-descriptors* are ps (1) compatible AIX format
descriptors but extended to print additional information, such as the seccomp mode or the effective capabilities
of a given process. The descriptors can either be passed as separate arguments or as a single comma-separated argument.

## OPTIONS

#### **--help**, **-h**

  Print usage statement


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the pod name or ID, use the last created pod.
Note: the last started pod can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)

## FORMAT DESCRIPTORS

For a full list of available descriptors, see podman-top(1)

## EXAMPLES

Print top data for the specified pod.
By default, `podman-pod-top` prints data similar to `ps -ef`:
```
$ podman pod top b031293491cc
USER   PID   PPID   %CPU    ELAPSED             TTY   TIME   COMMAND
root   1     0      0.000   2h5m38.737137571s   ?     0s     top
root   8     0      0.000   2h5m15.737228361s   ?     0s     top
```

The output can be controlled by specifying format descriptors as arguments after the pod.

Print the pod top data fields pid,seccomp, args and %C on the latest pod created. (This -l option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)
```
$ podman pod top -l pid seccomp args %C
PID   SECCOMP   COMMAND   %CPU
1     filter    top       0.000
1     filter    /bin/sh   0.000
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-pod(1)](podman-pod.1.md)**, **ps(1)**, **seccomp(2)**, **proc(5)**, **capabilities(7)**

## HISTORY
August 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
