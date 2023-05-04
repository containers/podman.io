####> This option file is used in:
####> podman create, run
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--timeout**=_seconds_

Maximum time a container is allowed to run before conmon sends it the kill
signal. By default containers will run until they exit or are stopped by
`podman stop`.
