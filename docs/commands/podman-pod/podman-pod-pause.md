% podman-pod-pause 1

## NAME

podman\-pod\-pause - Pause one or more pods

## SYNOPSIS

**podman pod pause** [*options*] _pod_ ...

## DESCRIPTION

Pauses all the running processes in the containers of one or more pods. You may use pod IDs or names as input.

## OPTIONS

#### **--all**, **-a**

Pause all pods.

#### **--latest**, **-l**

Instead of providing the pod name or ID, pause the last created pod. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

## EXAMPLE

Pause a pod with a given name

```
podman pod pause mywebserverpod
```

Pause a pod with a given ID

```
podman pod pause 860a4b23
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-pod(1)](podman-pod/podman-pod.md)**, **[podman-pod-unpause(1)](podman-pod/podman-pod-unpause.md)**, **[podman-pause(1)](podman-pause.md)**

## HISTORY

July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
