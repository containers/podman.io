---
title: podman-pod-rm
version: v5.4.1
---

% podman-pod-rm 1

## NAME
podman\-pod\-rm - Remove one or more stopped pods and containers

## SYNOPSIS
**podman pod rm** [*options*] *pod*

## DESCRIPTION
**podman pod rm** removes one or more stopped pods and their containers from the host.  The pod name or ID can be used. The \-f option stops all containers and then removes them before removing the pod. If all containers added by the user are in an exited state, the pod is removed.

## OPTIONS

#### **--all**, **-a**

Remove all pods.  Can be used in conjunction with \-f as well.

#### **--force**, **-f**

Stop running containers and delete all stopped containers before removal of pod.


[//]: # (BEGIN included file options/ignore.md)
#### **--ignore**, **-i**

Ignore errors when specified pods are not in the container store.  A user
might have decided to manually remove a pod which leads to a failure
during the ExecStop directive of a systemd service referencing that pod.

[//]: # (END   included file options/ignore.md)


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the pod name or ID, use the last created pod.
Note: the last started pod can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)


[//]: # (BEGIN included file options/pod-id-file.pod.md)
#### **--pod-id-file**=*file*

Read pod ID from the specified *file* and rm the pod. Can be specified multiple times.

[//]: # (END   included file options/pod-id-file.pod.md)
If specified, the pod-id-file is removed along with the pod.


[//]: # (BEGIN included file options/time.md)
#### **--time**, **-t**=*seconds*

Seconds to wait before forcibly stopping running containers within the pod.
Use -1 for infinite wait.

[//]: # (END   included file options/time.md)

The --force option must be specified to use the --time option.

## EXAMPLE

Remove pod with a given name:
```
podman pod rm mywebserverpod
```

Remove multiple pods with given names and/or IDs:
```
podman pod rm mywebserverpod myflaskserverpod 860a4b23
```

Forcefully remove pod with a given ID:
```
podman pod rm -f 860a4b23
```

Forcefully remove all pods:
```
podman pod rm -f -a
podman pod rm -fa
```

Remove pod using ID specified in a given file:
```
podman pod rm --pod-id-file /path/to/id/file
```

## Exit Status
  **0**   All specified pods removed

  **1**   One of the specified pods did not exist, and no other failures

  **2**   One of the specified pods is attached to a container

  **125** The command fails for any other reason

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-pod(1)](podman-pod.1.md)**

## HISTORY
July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
