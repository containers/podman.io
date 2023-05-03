% podman-pod-kill 1

## NAME

podman\-pod\-kill - Kill the main process of each container in one or more pods

## SYNOPSIS

**podman pod kill** [*options*] _pod_ ...

## DESCRIPTION

The main process of each container inside the pods specified will be sent SIGKILL, or any signal specified with option --signal.

## OPTIONS

#### **--all**, **-a**

Sends signal to all containers associated with a pod.

@@option latest

@@option signal

## EXAMPLE

Kill pod with a given name

```
podman pod kill mywebserver
```

Kill pod with a given ID

```
podman pod kill 860a4b23
```

Terminate pod by sending `TERM` signal

```
podman pod kill --signal TERM 860a4b23
```

Kill the latest pod created by Podman

```
podman pod kill --latest
```

Terminate all pods by sending `KILL` signal

```
podman pod kill --all
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-pod(1)](podman-pod/podman-pod.md)**, **[podman-pod-stop(1)](podman-pod/podman-pod-stop.md)**

## HISTORY

July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
