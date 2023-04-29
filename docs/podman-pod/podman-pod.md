% podman-pod 1

## NAME

podman\-pod - Management tool for groups of containers, called pods

## SYNOPSIS

**podman pod** _subcommand_

## DESCRIPTION

podman pod is a set of subcommands that manage pods, or groups of containers.

## SUBCOMMANDS

| Command | Man Page                                                  | Description                                                                       |
| ------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| clone   | [podman-pod-clone(1)](podman-pod/podman-pod-clone.md)     | Creates a copy of an existing pod.                                                |
| create  | [podman-pod-create(1)](podman-pod/podman-pod-create.md)   | Create a new pod.                                                                 |
| exists  | [podman-pod-exists(1)](podman-pod/podman-pod-exists.md)   | Check if a pod exists in local storage.                                           |
| inspect | [podman-pod-inspect(1)](podman-pod/podman-pod-inspect.md) | Displays information describing a pod.                                            |
| kill    | [podman-pod-kill(1)](podman-pod/podman-pod-kill.md)       | Kill the main process of each container in one or more pods.                      |
| logs    | [podman-pod-logs(1)](podman-pod/podman-pod-logs.md)       | Displays logs for pod with one or more containers.                                |
| pause   | [podman-pod-pause(1)](podman-pod/podman-pod-pause.md)     | Pause one or more pods.                                                           |
| prune   | [podman-pod-prune(1)](podman-pod/podman-pod-prune.md)     | Remove all stopped pods and their containers.                                     |
| ps      | [podman-pod-ps(1)](podman-pod/podman-pod-ps.md)           | Prints out information about pods.                                                |
| restart | [podman-pod-restart(1)](podman-pod/podman-pod-restart.md) | Restart one or more pods.                                                         |
| rm      | [podman-pod-rm(1)](podman-pod/podman-pod-rm.md)           | Remove one or more stopped pods and containers.                                   |
| start   | [podman-pod-start(1)](podman-pod/podman-pod-start.md)     | Start one or more pods.                                                           |
| stats   | [podman-pod-stats(1)](podman-pod/podman-pod-stats.md)     | Display a live stream of resource usage stats for containers in one or more pods. |
| stop    | [podman-pod-stop(1)](podman-pod/podman-pod-stop.md)       | Stop one or more pods.                                                            |
| top     | [podman-pod-top(1)](podman-pod/podman-pod-top.md)         | Display the running processes of containers in a pod.                             |
| unpause | [podman-pod-unpause(1)](podman-pod/podman-pod-unpause.md) | Unpause one or more pods.                                                         |

## SEE ALSO

**[podman(1)](podman.md)**

## HISTORY

July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>
