####> This option file is used in:
####> podman pod clone, pod create
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--userns**=_mode_

Set the user namespace mode for all the containers in a pod. It defaults to the `PODMAN_USERNS` environment variable. An empty value ("") means user namespaces are disabled.

Rootless user --userns=Key mappings:

| Key     | Host User | Container User                                             |
| ------- | --------- | ---------------------------------------------------------- |
| ""      | $UID      | 0 (Default User account mapped to root user in container.) |
| keep-id | $UID      | $UID (Map user account to same UID within container.)      |
| auto    | $UID      | nil (Host User UID is not mapped into container.)          |
| nomap   | $UID      | nil (Host User UID is not mapped into container.)          |

Valid _mode_ values are:

- _auto[:__OPTIONS,...__]_: automatically create a namespace. It is possible to specify these options to `auto`:

- _gidmapping=\_\_CONTAINER_GID:HOST_GID:SIZE_ to force a GID mapping to be present in the user namespace.

- _size=\_\_SIZE_: to specify an explicit size for the automatic user namespace. e.g. `--userns=auto:size=8192`. If `size` is not specified, `auto` will estimate a size for the user namespace.

- _uidmapping=\_\_CONTAINER_UID:HOST_UID:SIZE_ to force a UID mapping to be present in the user namespace.

- _host_: run in the user namespace of the caller. The processes running in the container will have the same privileges on the host as any other process launched by the calling user (default).

- _keep-id_: creates a user namespace where the current rootless user's UID:GID are mapped to the same values in the container. This option is not allowed for containers created by the root user.

- _nomap_: creates a user namespace where the current rootless user's UID:GID are not mapped into the container. This option is not allowed for containers created by the root user.
