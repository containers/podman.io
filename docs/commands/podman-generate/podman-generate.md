% podman-generate 1

## NAME

podman\-generate - Generate structured data based on containers, pods or volumes

## SYNOPSIS

**podman generate** _subcommand_

## DESCRIPTION

The generate command will create structured output (like YAML) based on a container, pod or volume.

## COMMANDS

| Command | Man Page                                                                          | Description                                                    |
| ------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| kube    | [podman-kube-generate(1)](commands/podman-kube/podman-kube-generate.md)           | Generate Kubernetes YAML based on containers, pods or volumes. |
| spec    | [podman-generate-spec(1)](commands/podman-generate/podman-generate-spec.md)       | Generate Specgen JSON based on containers or pods.             |
| systemd | [podman-generate-systemd(1)](commands/podman-generate/podman-generate-systemd.md) | Generate systemd unit file(s) for a container or pod.          |

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-pod(1)](commands/podman-pod/podman-pod.md)**, **[podman-container(1)](commands/podman-container/podman-container.md)**
