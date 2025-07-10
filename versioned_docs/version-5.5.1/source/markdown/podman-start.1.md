---
title: podman-start
version: v5.5.1
---

% podman-start 1

## NAME
podman\-start - Start one or more containers

## SYNOPSIS
**podman start** [*options*] *container* ...

**podman container start** [*options*] *container* ...

## DESCRIPTION
Start one or more containers using container IDs or names as input.  The *attach* and *interactive*
options cannot be used to override the *--tty* and *--interactive* options from when the container
was created. Starting an already running container with the *--attach* option, Podman simply
attaches to the container.

## OPTIONS

#### **--all**

Start all the containers, default is only running containers.

#### **--attach**, **-a**

Attach container's STDOUT and STDERR.  The default is false. This option cannot be used when
starting multiple containers.


[//]: # (BEGIN included file options/detach-keys.md)
#### **--detach-keys**=*sequence*

Specify the key sequence for detaching a container. Format is a single character `[a-Z]` or one or more `ctrl-<value>` characters where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,` or `_`. Specifying "" disables this feature. The default is *ctrl-p,ctrl-q*.

This option can also be set in **containers.conf**(5) file.

[//]: # (END   included file options/detach-keys.md)

#### **--filter**, **-f**

Filter what containers are going to be started from the given arguments.
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


[//]: # (BEGIN included file options/interactive.md)
#### **--interactive**, **-i**

When set to **true**, make stdin available to the contained process. If **false**, the stdin of the contained process is empty and immediately closed.

If attached, stdin is piped to the contained process. If detached, reading stdin will block until later attached.

**Caveat:** Podman will consume input from stdin as soon as it becomes available, even if the contained process doesn't request it.

[//]: # (END   included file options/interactive.md)


[//]: # (BEGIN included file options/latest.md)
#### **--latest**, **-l**

Instead of providing the container name or ID, use the last created container.
Note: the last started container can be from other users of Podman on the host machine.
(This option is not available with the remote Podman client, including Mac and Windows
(excluding WSL2) machines)

[//]: # (END   included file options/latest.md)


[//]: # (BEGIN included file options/sig-proxy.md)
#### **--sig-proxy**

Proxy received signals to the container process. SIGCHLD, SIGURG, SIGSTOP, and SIGKILL are not proxied.

[//]: # (END   included file options/sig-proxy.md)

The default is **true** when attaching, **false** otherwise.

## EXAMPLE

Start specified container:
```
podman start mywebserver
```

Start multiple containers:
```
podman start 860a4b231279 5421ab43b45
```

Start specified container in interactive mode with terminal attached:
```
podman start --interactive --attach 860a4b231279
```

Start last created container in interactive mode (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines):
```
podman start -i -l
```

## SEE ALSO
**[podman(1)](podman.1.md)**

## HISTORY
November 2018, Originally compiled by Brent Baude <bbaude@redhat.com>
