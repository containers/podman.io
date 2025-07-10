---
title: podman-pod-kill
version: v5.4.1
---

% podman-pod-kill 1

## NAME
podman\-pod\-kill - Kill the main process of each container in one or more pods

## SYNOPSIS
**podman pod kill** [*options*] *pod* ...

## DESCRIPTION
The main process of each container inside the pods specified is sent SIGKILL, or any signal specified with option --signal.

## OPTIONS
#### **--all**, **-a**

Sends signal to all containers associated with a pod.


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the pod name or ID, use the last created pod.
Note: the last started pod can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)


[//]: # (BEGIN included file options/signal.md)
#### **--signal**, **-s**=**signal**

Signal to send to the containers in the pod. For more information on Linux signals, refer to *signal(7)*.
The default is **SIGKILL**.

[//]: # (END   included file options/signal.md)

## EXAMPLE

Kill pod with a given name:
```
podman pod kill mywebserver
```

Kill pod with a given ID:
```
podman pod kill 860a4b23
```

Terminate pod by sending `TERM` signal:
```
podman pod kill --signal TERM 860a4b23
```

Kill the latest pod. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
podman pod kill --latest
```

Terminate all pods by sending `KILL` signal:
```
podman pod kill --all
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-pod(1)](podman-pod.1.md)**, **[podman-pod-stop(1)](podman-pod-stop.1.md)**

## HISTORY
July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
