---
title: podman-exec
version: v5.4.2
---

% podman-exec 1

## NAME
podman\-exec - Execute a command in a running container

## SYNOPSIS
**podman exec** [*options*] *container* *command* [*arg* ...]

**podman container exec** [*options*] *container* *command* [*arg* ...]

## DESCRIPTION
**podman exec** executes a command in a running container.

## OPTIONS

#### **--detach**, **-d**

Start the exec session, but do not attach to it. The command runs in the background, and the exec session is automatically removed when it completes. The **podman exec** command prints the ID of the exec session and exits immediately after it starts.


[//]: # (BEGIN included file options/detach-keys.md)
#### **--detach-keys**=*sequence*

Specify the key sequence for detaching a container. Format is a single character `[a-Z]` or one or more `ctrl-<value>` characters where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,` or `_`. Specifying "" disables this feature. The default is *ctrl-p,ctrl-q*.

This option can also be set in **containers.conf**(5) file.

[//]: # (END   included file options/detach-keys.md)


[//]: # (BEGIN included file options/env.md)
#### **--env**, **-e**=*env*

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

[//]: # (END   included file options/env.md)


[//]: # (BEGIN included file options/env-file.md)
#### **--env-file**=*file*

Read in a line-delimited file of environment variables.

[//]: # (END   included file options/env-file.md)


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


[//]: # (BEGIN included file options/preserve-fd.md)
#### **--preserve-fd**=*FD1[,FD2,...]*

Pass down to the process the additional file descriptors specified in the comma separated list.  It can be specified multiple times.
This option is only supported with the crun OCI runtime.  It might be a security risk to use this option with other OCI runtimes.

(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/preserve-fd.md)


[//]: # (BEGIN included file options/preserve-fds.md)
#### **--preserve-fds**=*N*

Pass down to the process N additional file descriptors (in addition to 0, 1, 2).
The total FDs are 3+N.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/preserve-fds.md)


[//]: # (BEGIN included file options/privileged.md)
#### **--privileged**

Give extended privileges to this container. The default is **false**.

By default, Podman containers are unprivileged (**=false**) and cannot, for
example, modify parts of the operating system. This is because by default a
container is only allowed limited access to devices. A "privileged" container
is given the same access to devices as the user launching the container, with
the exception of virtual consoles (_/dev/tty\d+_) when running in systemd
mode (**--systemd=always**).

A privileged container turns off the security features that isolate the
container from the host. Dropped Capabilities, limited devices, read-only mount
points, Apparmor/SELinux separation, and Seccomp filters are all disabled.
Due to the disabled security features, the privileged field should almost never
be set as containers can easily break out of confinement.

Containers running in a user namespace (e.g., rootless containers) cannot have
more privileges than the user that launched them.

[//]: # (END   included file options/privileged.md)


[//]: # (BEGIN included file options/tty.md)
#### **--tty**, **-t**

Allocate a pseudo-TTY. The default is **false**.

When set to **true**, Podman allocates a pseudo-tty and attach to the standard
input of the container. This can be used, for example, to run a throwaway
interactive shell.

**NOTE**: The --tty flag prevents redirection of standard output.  It combines STDOUT and STDERR, it can insert control characters, and it can hang pipes. This option is only used when run interactively in a terminal. When feeding input to Podman, use -i only, not -it.

[//]: # (END   included file options/tty.md)


[//]: # (BEGIN included file options/user.md)
#### **--user**, **-u**=*user[:group]*

Sets the username or UID used and, optionally, the groupname or GID for the specified command. Both *user* and *group* may be symbolic or numeric.

Without this argument, the command runs as the user specified in the container image. Unless overridden by a `USER` command in the Containerfile or by a value passed to this option, this user generally defaults to root.

When a user namespace is not in use, the UID and GID used within the container and on the host match. When user namespaces are in use, however, the UID and GID in the container may correspond to another UID and GID on the host. In rootless containers, for example, a user namespace is always used, and root in the container by default corresponds to the UID and GID of the user invoking Podman.

[//]: # (END   included file options/user.md)


[//]: # (BEGIN included file options/workdir.md)
#### **--workdir**, **-w**=*dir*

Working directory inside the container.

The default working directory for running binaries within a container is the root directory (**/**).
The image developer can set a different default with the WORKDIR instruction. The operator
can override the working directory by using the **-w** option.

[//]: # (END   included file options/workdir.md)

## Exit Status

The exit code from `podman exec` gives information about why the command within the container failed to run or why it exited.  When `podman exec` exits with a
non-zero code, the exit codes follow the `chroot` standard, see below:

  **125** The error is with Podman itself

    $ podman exec --foo ctrID /bin/sh; echo $?
    Error: unknown flag: --foo
    125

  **126** The _contained command_ cannot be invoked

    $ podman exec ctrID /etc; echo $?
    Error: container_linux.go:346: starting container process caused "exec: \"/etc\": permission denied": OCI runtime error
    126

  **127** The _contained command_ cannot be found

    $ podman exec ctrID foo; echo $?
    Error: container_linux.go:346: starting container process caused "exec: \"foo\": executable file not found in $PATH": OCI runtime error
    127

  **Exit code** The _contained command_ exit code

    $ podman exec ctrID /bin/sh -c 'exit 3'; echo $?
    3

## EXAMPLES

Execute command in selected container with a stdin and a tty allocated:
```
$ podman exec -it ctrID ls
```

Execute command with the overridden working directory in selected container with a stdin and a tty allocated:
```
$ podman exec -it -w /tmp myCtr pwd
```

Execute command as the specified user in selected container:
```
$ podman exec --user root ctrID ls
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-run(1)](podman-run.1.md)**

## HISTORY
December 2017, Originally compiled by Brent Baude<bbaude@redhat.com>
