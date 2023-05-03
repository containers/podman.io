% podman-container 1

## NAME

podman\-container - Manage containers

## SYNOPSIS

**podman container** _subcommand_

## DESCRIPTION

The container command allows management of containers

## COMMANDS

| Command    | Man Page                                                                                   | Description                                                                 |
| ---------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| attach     | [podman-attach(1)](commands/podman-attach.md)                                              | Attach to a running container.                                              |
| checkpoint | [podman-container-checkpoint(1)](commands/podman-container/podman-container-checkpoint.md) | Checkpoints one or more running containers.                                 |
| cleanup    | [podman-container-cleanup(1)](commands/podman-container/podman-container-cleanup.md)       | Clean up the container's network and mountpoints.                           |
| clone      | [podman-container-clone(1)](commands/podman-container/podman-container-clone.md)           | Creates a copy of an existing container.                                    |
| commit     | [podman-commit(1)](commands/podman-commit.md)                                              | Create new image based on the changed container.                            |
| cp         | [podman-cp(1)](commands/podman-cp.md)                                                      | Copy files/folders between a container and the local filesystem.            |
| create     | [podman-create(1)](commands/podman-create.md)                                              | Create a new container.                                                     |
| diff       | [podman-container-diff(1)](commands/podman-container/podman-container-diff.md)             | Inspect changes on a container's filesystem                                 |
| exec       | [podman-exec(1)](commands/podman-exec.md)                                                  | Execute a command in a running container.                                   |
| exists     | [podman-container-exists(1)](commands/podman-container/podman-container-exists.md)         | Check if a container exists in local storage                                |
| export     | [podman-export(1)](commands/podman-export.md)                                              | Export a container's filesystem contents as a tar archive.                  |
| init       | [podman-init(1)](commands/podman-init.md)                                                  | Initialize a container                                                      |
| inspect    | [podman-container-inspect(1)](commands/podman-container/podman-container-inspect.md)       | Display a container's configuration.                                        |
| kill       | [podman-kill(1)](commands/podman-kill.md)                                                  | Kill the main process in one or more containers.                            |
| list       | [podman-ps(1)](commands/podman-ps.md)                                                      | List the containers on the system.(alias ls)                                |
| logs       | [podman-logs(1)](commands/podman-logs.md)                                                  | Display the logs of a container.                                            |
| mount      | [podman-mount(1)](commands/podman-mount.md)                                                | Mount a working container's root filesystem.                                |
| pause      | [podman-pause(1)](commands/podman-pause.md)                                                | Pause one or more containers.                                               |
| port       | [podman-port(1)](commands/podman-port.md)                                                  | List port mappings for the container.                                       |
| prune      | [podman-container-prune(1)](commands/podman-container/podman-container-prune.md)           | Remove all stopped containers from local storage.                           |
| ps         | [podman-ps(1)](commands/podman-ps.md)                                                      | Prints out information about containers.                                    |
| rename     | [podman-rename(1)](commands/podman-rename.md)                                              | Rename an existing container.                                               |
| restart    | [podman-restart(1)](commands/podman-restart.md)                                            | Restart one or more containers.                                             |
| restore    | [podman-container-restore(1)](commands/podman-container/podman-container-restore.md)       | Restores one or more containers from a checkpoint.                          |
| rm         | [podman-rm(1)](commands/podman-rm.md)                                                      | Remove one or more containers.                                              |
| run        | [podman-run(1)](commands/podman-run.md)                                                    | Run a command in a container.                                               |
| runlabel   | [podman-container-runlabel(1)](commands/podman-container/podman-container-runlabel.md)     | Executes a command as described by a container-image label.                 |
| start      | [podman-start(1)](commands/podman-start.md)                                                | Starts one or more containers.                                              |
| stats      | [podman-stats(1)](commands/podman-stats.md)                                                | Display a live stream of one or more container's resource usage statistics. |
| stop       | [podman-stop(1)](commands/podman-stop.md)                                                  | Stop one or more running containers.                                        |
| top        | [podman-top(1)](commands/podman-top.md)                                                    | Display the running processes of a container.                               |
| unmount    | [podman-unmount(1)](commands/podman-unmount.md)                                            | Unmount a working container's root filesystem.(Alias unmount)               |
| unpause    | [podman-unpause(1)](commands/podman-unpause.md)                                            | Unpause one or more containers.                                             |
| update     | [podman-update(1)](commands/podman-update.md)                                              | Updates the cgroup configuration of a given container.                      |
| wait       | [podman-wait(1)](commands/podman-wait.md)                                                  | Wait on one or more containers to stop and print their exit codes.          |

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-exec(1)](commands/podman-exec.md)**, **[podman-run(1)](commands/podman-run.md)**
