####> This option file is used in:
####> podman create, run
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--pod-id-file**=_file_

Run container in an existing pod and read the pod's ID from the specified _file_.
If a container is run within a pod, and the pod has an infra-container, the infra-container will be started before the container is.
