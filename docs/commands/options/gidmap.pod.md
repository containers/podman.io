####> This option file is used in:
####> podman pod clone, pod create
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--gidmap**=_pod_gid:host_gid:amount_

GID map for the user namespace. Using this flag will run all containers in the pod with user namespace enabled.
It conflicts with the **--userns** and **--subgidname** flags.
