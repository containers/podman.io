% podman-machine 1

## NAME

podman\-machine - Manage Podman's virtual machine

## SYNOPSIS

**podman machine** _subcommand_

## DESCRIPTION

`podman machine` is a set of subcommands that manage Podman's virtual machine.

Podman on MacOS and Windows requires a virtual machine. This is because containers are Linux -
containers do not run on any other OS because containers' core functionality are
tied to the Linux kernel. Podman machine must be used to manage MacOS and Windows machines,
but can be optionally used on Linux.

All `podman machine` commands are rootless only.

NOTE: The podman-machine configuration file is managed under the
`$XDG_CONFIG_HOME/containers/podman/machine/` directory. Changing the `$XDG_CONFIG_HOME`
environment variable while the machines are running can lead to unexpected behavior.

## SUBCOMMANDS

| Command | Man Page                                                        | Description                          |
| ------- | --------------------------------------------------------------- | ------------------------------------ |
| info    | [podman-machine-info(1)](commands/podman-machine-info.md)       | Display machine host info            |
| init    | [podman-machine-init(1)](commands/podman-machine-init.md)       | Initialize a new virtual machine     |
| inspect | [podman-machine-inspect(1)](commands/podman-machine-inspect.md) | Inspect one or more virtual machines |
| list    | [podman-machine-list(1)](commands/podman-machine-list.md)       | List virtual machines                |
| os      | [podman-machine-os(1)](commands/podman-machine-os.md)           | Manage a Podman virtual machine's OS |
| rm      | [podman-machine-rm(1)](commands/podman-machine-rm.md)           | Remove a virtual machine             |
| set     | [podman-machine-set(1)](commands/podman-machine-set.md)         | Sets a virtual machine setting       |
| ssh     | [podman-machine-ssh(1)](commands/podman-machine-ssh.md)         | SSH into a virtual machine           |
| start   | [podman-machine-start(1)](commands/podman-machine-start.md)     | Start a virtual machine              |
| stop    | [podman-machine-stop(1)](commands/podman-machine-stop.md)       | Stop a virtual machine               |

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-machine-info(1)](commands/podman-machine-info.md)**, **[podman-machine-init(1)](commands/podman-machine-init.md)**, **[podman-machine-list(1)](commands/podman-machine-list.md)**, **[podman-machine-os(1)](commands/podman-machine-os.md)**, **[podman-machine-rm(1)](commands/podman-machine-rm.md)**, **[podman-machine-ssh(1)](commands/podman-machine-ssh.md)**, **[podman-machine-start(1)](commands/podman-machine-start.md)**, **[podman-machine-stop(1)](commands/podman-machine-stop.md)**, **[podman-machine-inspect(1)](commands/podman-machine-inspect.md)**

## HISTORY

March 2021, Originally compiled by Ashley Cui <acui@redhat.com>
