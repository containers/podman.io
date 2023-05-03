% podman-image 1

## NAME

podman\-image - Manage images

## SYNOPSIS

**podman image** _subcommand_

## DESCRIPTION

The image command allows the management of images

## COMMANDS

| Command | Man Page                                                                 | Description                                            |
| ------- | ------------------------------------------------------------------------ | ------------------------------------------------------ |
| build   | [podman-build(1)](commands/podman-build.md)                              | Build a container using a Dockerfile.                  |
| diff    | [podman-image-diff(1)](commands/podman-image/podman-image-diff.md)       | Inspect changes on an image's filesystem.              |
| exists  | [podman-image-exists(1)](commands/podman-image/podman-image-exists.md)   | Check if an image exists in local storage.             |
| history | [podman-history(1)](commands/podman-history.md)                          | Show the history of an image.                          |
| import  | [podman-import(1)](commands/podman-import.md)                            | Import a tarball and save it as a filesystem image.    |
| inspect | [podman-image-inspect(1)](commands/podman-image/podman-image-inspect.md) | Display an image's configuration.                      |
| list    | [podman-images(1)](commands/podman-images.md)                            | List the container images on the system.(alias ls)     |
| load    | [podman-load(1)](commands/podman-load.md)                                | Load an image from the docker archive.                 |
| mount   | [podman-image-mount(1)](commands/podman-image/podman-image-mount.md)     | Mount an image's root filesystem.                      |
| prune   | [podman-image-prune(1)](commands/podman-image/podman-image-prune.md)     | Remove all unused images from the local store.         |
| pull    | [podman-pull(1)](commands/podman-pull.md)                                | Pull an image from a registry.                         |
| push    | [podman-push(1)](commands/podman-push.md)                                | Push an image from local storage to elsewhere.         |
| rm      | [podman-rmi(1)](commands/podman-rmi.md)                                  | Removes one or more locally stored images.             |
| save    | [podman-save(1)](commands/podman-save.md)                                | Save an image to docker-archive or oci.                |
| scp     | [podman-image-scp(1)](commands/podman-image/podman-image-scp.md)         | Securely copy an image from one host to another.       |
| search  | [podman-search(1)](commands/podman-search.md)                            | Search a registry for an image.                        |
| sign    | [podman-image-sign(1)](commands/podman-image/podman-image-sign.md)       | Create a signature for an image.                       |
| tag     | [podman-tag(1)](commands/podman-tag.md)                                  | Add an additional name to a local image.               |
| tree    | [podman-image-tree(1)](commands/podman-image/podman-image-tree.md)       | Prints layer hierarchy of an image in a tree format.   |
| trust   | [podman-image-trust(1)](commands/podman-image/podman-image-trust.md)     | Manage container registry image trust policy.          |
| unmount | [podman-image-unmount(1)](commands/podman-image/podman-image-unmount.md) | Unmount an image's root filesystem.                    |
| untag   | [podman-untag(1)](commands/podman-untag.md)                              | Removes one or more names from a locally-stored image. |

## SEE ALSO

**[podman(1)](commands/podman.md)**
