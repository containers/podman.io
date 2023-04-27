####> This option file is used in:
####> podman create, run
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--gidmap**=_container_gid:host_gid:amount_

Run the container in a new user namespace using the supplied GID mapping. This
option conflicts with the **--userns** and **--subgidname** options. This
option provides a way to map host GIDs to container GIDs in the same way as
**--uidmap** maps host UIDs to container UIDs. For details see **--uidmap**.

Note: the **--gidmap** flag cannot be called in conjunction with the **--pod** flag as a gidmap cannot be set on the container level when in a pod.
