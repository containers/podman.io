% podman-system 1

## NAME

podman\-system - Manage podman

## SYNOPSIS

**podman system** _subcommand_

## DESCRIPTION

The system command allows management of the podman systems

## COMMANDS

| Command    | Man Page                                                                                     | Description                                                            |
| ---------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| connection | [podman-system-connection(1)](commands/podman-system-connection/podman-system-connection.md) | Manage the destination(s) for Podman service(s)                        |
| df         | [podman-system-df(1)](commands/podman-system/podman-system-df.md)                            | Show podman disk usage.                                                |
| events     | [podman-events(1)](commands/podman-events.md)                                                | Monitor Podman events                                                  |
| info       | [podman-info(1)](commands/podman-info.md)                                                    | Displays Podman related system information.                            |
| migrate    | [podman-system-migrate(1)](commands/podman-system/podman-system-migrate.md)                  | Migrate existing containers to a new podman version.                   |
| prune      | [podman-system-prune(1)](commands/podman-system/podman-system-prune.md)                      | Remove all unused pods, containers, images, networks, and volume data. |
| renumber   | [podman-system-renumber(1)](commands/podman-system/podman-system-renumber.md)                | Migrate lock numbers to handle a change in maximum number of locks.    |
| reset      | [podman-system-reset(1)](commands/podman-system/podman-system-reset.md)                      | Reset storage back to initial state.                                   |
| service    | [podman-system-service(1)](commands/podman-system/podman-system-service.md)                  | Run an API service                                                     |

## SEE ALSO

**[podman(1)](podman.md)**
