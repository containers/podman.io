####> This option file is used in:
####> podman create, run
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--passwd-entry**=_ENTRY_

Customize the entry that is written to the `/etc/passwd` file within the container when `--passwd` is used.

The variables $USERNAME, $UID, $GID, $NAME, $HOME are automatically replaced with their value at runtime.
