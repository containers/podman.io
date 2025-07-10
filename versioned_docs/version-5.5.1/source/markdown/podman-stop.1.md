---
title: podman-stop
version: v5.5.1
---

% podman-stop 1

## NAME
podman\-stop - Stop one or more running containers

## SYNOPSIS
**podman stop** [*options*] *container* ...

**podman container stop** [*options*] *container* ...

## DESCRIPTION
Stops one or more containers using container IDs or names as input. The **--time** option
specifies the number of seconds to wait before forcibly stopping the container after the stop command
is issued to the container. The default is 10 seconds. By default, containers are stopped with SIGTERM
and then SIGKILL after the timeout. The SIGTERM default can be overridden by the image used to create the
container and also via command line when creating the container.

## OPTIONS

#### **--all**, **-a**

Stop all running containers.  This does not include paused containers.


[//]: # (BEGIN included file options/cidfile.read.md)
#### **--cidfile**=*file*

Read container ID from the specified *file* and stop the container.
Can be specified multiple times.

[//]: # (END   included file options/cidfile.read.md)

Command does not fail when *file* is missing and user specified --ignore.

#### **--filter**, **-f**=*filter*

Filter what containers are going to be stopped.
Multiple filters can be given with multiple uses of the --filter flag.
Filters with the same key work inclusive with the only exception being
`label` which is exclusive. Filters with different keys always work exclusive.

Valid filters are listed below:

| **Filter** | **Description**                                                                                 |
|------------|-------------------------------------------------------------------------------------------------|
| id         | [ID] Container's ID (CID prefix match by default; accepts regex)                                |
| name       | [Name] Container's name (accepts regex)                                                         |
| label      | [Key] or [Key=Value] Label assigned to a container                                              |
| exited     | [Int] Container's exit code                                                                     |
| status     | [Status] Container's status: 'created', 'initialized', 'exited', 'paused', 'running', 'unknown' |
| ancestor   | [ImageName] Image or descendant used to create container                                        |
| before     | [ID] or [Name] Containers created before this container                                         |
| since      | [ID] or [Name] Containers created since this container                                          |
| volume     | [VolumeName] or [MountpointDestination] Volume mounted in container                             |
| health     | [Status] healthy or unhealthy                                                                   |
| pod        | [Pod] name or full or partial ID of pod                                                         |
| network    | [Network] name or full ID of network                                                            |
| until      | [DateTime] Containers created before the given duration or time.                                |
| command    | [Command] the command the container is executing, only argv[0] is taken  |


[//]: # (BEGIN included file options/ignore.md)
#### **--ignore**, **-i**

Ignore errors when specified containers are not in the container store.  A user
might have decided to manually remove a container which leads to a failure
during the ExecStop directive of a systemd service referencing that container.

[//]: # (END   included file options/ignore.md)


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)


[//]: # (BEGIN included file options/time.md)
#### **--time**, **-t**=*seconds*

Seconds to wait before forcibly stopping the container.
Use -1 for infinite wait.

[//]: # (END   included file options/time.md)

## EXAMPLES

Stop the specified container via its name.
```
$ podman stop mywebserver
```

Stop the container via its id.
```
$ podman stop 860a4b235279
```

Stop multiple containers.
```
$ podman stop mywebserver 860a4b235279
```

Stop the container identified in the cidfile.
```
$ podman stop --cidfile /home/user/cidfile-1
```

Stop the containers identified in the cidfiles.
```
$ podman stop --cidfile /home/user/cidfile-1 --cidfile ./cidfile-2
```

Stop the specified container in 2 seconds.
```
$ podman stop --time 2 860a4b235279
```

Stop all running containers.
```
$ podman stop -a
```

Stop the last created container (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)
```
$ podman stop --latest
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-rm(1)](podman-rm.1.md)**

## HISTORY
September 2018, Originally compiled by Brent Baude <bbaude@redhat.com>
