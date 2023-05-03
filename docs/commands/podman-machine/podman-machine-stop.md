% podman-machine-stop 1

## NAME

podman\-machine\-stop - Stop a virtual machine

## SYNOPSIS

**podman machine stop** [*name*]

## DESCRIPTION

Stops a virtual machine.

Rootless only.

Podman on MacOS and Windows requires a virtual machine. This is because containers are Linux -
containers do not run on any other OS because containers' core functionality are
tied to the Linux kernel. Podman machine must be used to manage MacOS and Windows machines,
but can be optionally used on Linux.

**podman machine stop** stops a Linux virtual machine where containers are run.

## OPTIONS

#### **--help**

Print usage statement.

## EXAMPLES

```
$ podman machine stop myvm
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-machine(1)](podman-machine.md)**

## HISTORY

March 2021, Originally compiled by Ashley Cui <acui@redhat.com>
