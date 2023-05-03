% podman-volume 1

## NAME

podman\-volume - Simple management tool for volumes

## SYNOPSIS

**podman volume** _subcommand_

## DESCRIPTION

podman volume is a set of subcommands that manage volumes.

## SUBCOMMANDS

| Command | Man Page                                                           | Description                                             |
| ------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| create  | [podman-volume-create(1)](podman-volume/podman-volume-create.md)   | Create a new volume.                                    |
| exists  | [podman-volume-exists(1)](podman-volume/podman-volume-exists.md)   | Check if the given volume exists.                       |
| export  | [podman-volume-export(1)](podman-volume/podman-volume-export.md)   | Exports volume to external tar.                         |
| import  | [podman-volume-import(1)](podman-volume/podman-volume-import.md)   | Import tarball contents into an existing podman volume. |
| inspect | [podman-volume-inspect(1)](podman-volume/podman-volume-inspect.md) | Get detailed information on one or more volumes.        |
| ls      | [podman-volume-ls(1)](podman-volume/podman-volume-ls.md)           | List all the available volumes.                         |
| mount   | [podman-volume-mount(1)](podman-volume/podman-volume-mount.md)     | Mount a volume filesystem.                              |
| prune   | [podman-volume-prune(1)](podman-volume/podman-volume-prune.md)     | Remove all unused volumes.                              |
| reload  | [podman-volume-reload(1)](podman-volume/podman-volume-reload.md)   | Reload all volumes from volumes plugins.                |
| rm      | [podman-volume-rm(1)](podman-volume/podman-volume-rm.md)           | Remove one or more volumes.                             |
| unmount | [podman-volume-unmount(1)](podman-volume/podman-volume-unmount.md) | Unmount a volume.                                       |

## SEE ALSO

**[podman(1)](podman.md)**

## HISTORY

November 2018, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
