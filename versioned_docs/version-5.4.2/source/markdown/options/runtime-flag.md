---
title: Documentation
version: v5.4.2
---

####> This option file is used in:
####>   podman build, farm build
####> If file is edited, make sure the changes
####> are applicable to all of those.
#### **--runtime-flag**=*flag*

Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.

Note: Do not pass the leading -- to the flag. To pass the runc flag --log-format json to buildah build, the option given is --runtime-flag log-format=json.
