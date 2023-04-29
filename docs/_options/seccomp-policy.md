####> This option file is used in:
####> podman create, run
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--seccomp-policy**=_policy_

Specify the policy to select the seccomp profile. If set to _image_, Podman will look for a "io.containers.seccomp.profile" label in the container-image config and use its value as a seccomp profile. Otherwise, Podman will follow the _default_ policy by applying the default profile unless specified otherwise via _--security-opt seccomp_ as described below.

Note that this feature is experimental and may change in the future.
