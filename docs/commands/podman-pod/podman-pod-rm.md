% podman-pod-rm 1

## NAME

podman\-pod\-rm - Remove one or more stopped pods and containers

## SYNOPSIS

**podman pod rm** [*options*] _pod_

## DESCRIPTION

**podman pod rm** will remove one or more stopped pods and their containers from the host. The pod name or ID can be used. The \-f option stops all containers and then removes them before removing the pod. If all containers added by the user are in an exited state, the pod will be removed.

## OPTIONS

#### **--all**, **-a**

Remove all pods. Can be used in conjunction with \-f as well.

#### **--force**, **-f**

Stop running containers and delete all stopped containers before removal of pod.

@@option ignore

@@option latest

@@option pod-id-file.pod
If specified, the pod-id-file will be removed along with the pod.

@@option time

The --force option must be specified to use the --time option.

## EXAMPLE

Remove pod with a given name

```
podman pod rm mywebserverpod
```

Remove multiple pods with given names and/or IDs

```
podman pod rm mywebserverpod myflaskserverpod 860a4b23
```

Forcefully remove pod with a given ID

```
podman pod rm -f 860a4b23
```

Forcefully remove all pods

```
podman pod rm -f -a
podman pod rm -fa
```

Remove pod using ID specified in a given file

```
podman pod rm --pod-id-file /path/to/id/file
```

## Exit Status

**0** All specified pods removed

**1** One of the specified pods did not exist, and no other failures

**2** One of the specified pods is attached to a container

**125** The command fails for any other reason

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-pod(1)](commands/podman-pod/podman-pod.md)**

## HISTORY

July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
