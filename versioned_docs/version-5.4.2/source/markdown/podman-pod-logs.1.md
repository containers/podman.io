---
title: podman-pod-logs
version: v5.4.2
---

% podman-pod-logs 1

## NAME
podman\-pod\-logs - Display logs for pod with one or more containers

## SYNOPSIS
**podman pod logs** [*options*] *pod*

## DESCRIPTION
The podman pod logs command batch-retrieves whatever logs are present with all the containers of a pod. Pod logs can be filtered by container name or ID using flag **-c** or **--container** if needed.

Note: A long-running `podman pod log` command with a `-f` or `--follow` option needs to be reinvoked if a new container is added to the pod dynamically; otherwise, logs of newly added containers are not visible in the log stream.

## OPTIONS


[//]: # (BEGIN included file options/color.md)
#### **--color**

Output the containers with different colors in the log.

[//]: # (END   included file options/color.md)

#### **--container**, **-c**

By default, `podman pod logs` retrieves logs for all the containers available within the pod, differentiated by the field `container`. However, there are use cases where the user wants to limit the log stream only to a particular container of a pod. For such cases, `-c` can be used like `podman pod logs -c ctrNameorID podname`.


[//]: # (BEGIN included file options/follow.md)
#### **--follow**, **-f**

Follow log output.  Default is false.

Note: When following a pod which is removed by `podman pod rm`
or removed on exit (`podman run --rm ...`), there is a chance that the log
file is removed before `podman pod logs` reads the final content.

[//]: # (END   included file options/follow.md)


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the pod name or ID, use the last created pod.
Note: the last started pod can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)


[//]: # (BEGIN included file options/names.md)
#### **--names**, **-n**

Output the container names instead of the container IDs in the log.

[//]: # (END   included file options/names.md)


[//]: # (BEGIN included file options/since.md)
#### **--since**=*TIMESTAMP*

Show logs since TIMESTAMP. The --since option can be Unix timestamps, date formatted timestamps, or Go duration
strings (e.g. 10m, 1h30m) computed relative to the client machine's time. Supported formats for date formatted
time stamps include RFC3339Nano, RFC3339, 2006-01-02T15:04:05, 2006-01-02T15:04:05.999999999, 2006-01-02Z07:00,
and 2006-01-02.

[//]: # (END   included file options/since.md)


[//]: # (BEGIN included file options/tail.md)
#### **--tail**=*LINES*

Output the specified number of LINES at the end of the logs.  LINES must be an integer.  Defaults to -1,
which prints all lines

[//]: # (END   included file options/tail.md)


[//]: # (BEGIN included file options/timestamps.md)
#### **--timestamps**, **-t**

Show timestamps in the log outputs.  The default is false

[//]: # (END   included file options/timestamps.md)


[//]: # (BEGIN included file options/until.md)
#### **--until**=*TIMESTAMP*

Show logs until TIMESTAMP. The --until option can be Unix timestamps, date formatted timestamps, or Go duration
strings (e.g. 10m, 1h30m) computed relative to the client machine's time. Supported formats for date formatted
time stamps include RFC3339Nano, RFC3339, 2006-01-02T15:04:05, 2006-01-02T15:04:05.999999999, 2006-01-02Z07:00,
and 2006-01-02.

[//]: # (END   included file options/until.md)

## EXAMPLE

To view a pod's logs:
```
podman pod logs -t podIdorName
```

To view logs of a specific container on the pod:
```
podman pod logs -c ctrIdOrName podIdOrName
```

To view all pod logs:
```
podman pod logs -t --since 0 myserver-pod-1
```

To view a pod's logs since a certain time:
```
podman pod logs -t --since 2017-08-07T10:10:09.055837383-04:00 myserver-pod-1
```

To view a pod's logs generated in the last 10 minutes:
```
podman pod logs --since 10m myserver-pod-1
```

To view a pod's logs until 30 minutes ago:
```
podman pod logs --until 30m myserver-pod-1
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-pod(1)](podman-pod.1.md)**, **[podman-pod-rm(1)](podman-pod-rm.1.md)**, **[podman-logs(1)](podman-logs.1.md)**
