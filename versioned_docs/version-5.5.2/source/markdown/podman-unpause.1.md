---
title: podman-unpause
version: v5.5.2
---

% podman-unpause 1

## NAME
podman\-unpause - Unpause one or more containers

## SYNOPSIS
**podman unpause** [*options*]|[*container* ...]

**podman container unpause** [*options*]|[*container* ...]

## DESCRIPTION
Unpauses the processes in one or more containers.  Container IDs or names can be used as input.

## OPTIONS

#### **--all**, **-a**

Unpause all paused containers.


[//]: # (BEGIN included file options/cidfile.read.md)
#### **--cidfile**=*file*

Read container ID from the specified *file* and unpause the container.
Can be specified multiple times.

[//]: # (END   included file options/cidfile.read.md)

#### **--filter**, **-f**=*filter*

Filter what containers unpause.
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


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)

## EXAMPLE

Unpause specified container:
```
podman unpause mywebserver
```

Unpause container by a partial container ID:
```
podman unpause 860a4b23
```

Unpause all **paused** containers:
```
podman unpause --all
```

Unpause container using ID specified in given files:
```
podman unpause --cidfile /home/user/cidfile-1
podman unpause --cidfile /home/user/cidfile-1 --cidfile ./cidfile-2
```

Unpause the latest container. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
podman unpause --latest
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-pause(1)](podman-pause.1.md)**

## HISTORY
September 2017, Originally compiled by Dan Walsh <dwalsh@redhat.com>
