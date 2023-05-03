% podman-system-connection 1

## NAME

podman\-system\-connection - Manage the destination(s) for Podman service(s)

## SYNOPSIS

**podman system connection** _subcommand_

## DESCRIPTION

Manage the destination(s) for Podman service(s).

The user will be prompted for the ssh login password or key file pass phrase as required. The `ssh-agent` is supported if it is running.

## COMMANDS

| Command | Man Page                                                                                                      | Description                                             |
| ------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| add     | [podman-system-connection\-add(1)](commands/podman-system-connection/podman-system-connection-add.md)         | Record destination for the Podman service               |
| default | [podman-system-connection\-default(1)](commands/podman-system-connection/podman-system-connection-default.md) | Set named destination as default for the Podman service |
| list    | [podman-system-connection\-list(1)](commands/podman-system-connection/podman-system-connection-list.md)       | List the destination for the Podman service(s)          |
| remove  | [podman-system-connection\-remove(1)](commands/podman-system-connection/podman-system-connection-remove.md)   | Delete named destination                                |
| rename  | [podman-system-connection\-rename(1)](commands/podman-system-connection/podman-system-connection-rename.md)   | Rename the destination for Podman service               |

## EXAMPLE

```
$ podman system connection list
Name URI                                           Identity	  Default
devl ssh://root@example.com/run/podman/podman.sock ~/.ssh/id_rsa  true
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-system(1)](commands/podman-system/podman-system.md)**

## HISTORY

June 2020, Originally compiled by Jhon Honce (jhonce at redhat dot com)
