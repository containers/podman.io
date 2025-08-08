---
title: podman-logout
version: v5.5.0
---

% podman-logout 1

## NAME
podman\-logout - Log out of a container registry

## SYNOPSIS
**podman logout** [*options*] *registry*

## DESCRIPTION
**podman logout** logs out of a specified registry server by deleting the cached credentials
stored in the **auth.json** file. If the registry is not specified, the first registry under [registries.search]
from registries.conf is used. The path of the authentication file can be overridden by the user by setting the **authfile** flag.
The default path used is **${XDG\_RUNTIME\_DIR}/containers/auth.json**. For more details about format and configurations of the auth,json file, see containers-auth.json(5)
All the cached credentials can be removed by setting the **all** flag.

**podman [GLOBAL OPTIONS]**

**podman logout [GLOBAL OPTIONS]**

**podman logout [OPTIONS] REGISTRY [GLOBAL OPTIONS]**

## OPTIONS

#### **--all**, **-a**

Remove the cached credentials for all registries in the auth file


[//]: # (BEGIN included file options/authfile.md)
#### **--authfile**=*path*

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **[podman login](podman-login.1.md)**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

[//]: # (END   included file options/authfile.md)


[//]: # (BEGIN included file options/compat-auth-file.md)
#### **--compat-auth-file**=*path*

Instead of updating the default credentials file, update the one at *path*, and use a Docker-compatible format.

[//]: # (END   included file options/compat-auth-file.md)

#### **--help**, **-h**

Print usage statement

## EXAMPLES

Remove login credentials for the docker.io registry from the authentication file:
```
$ podman logout docker.io
```

Remove login credentials for the docker.io registry from the authdir/myauths.json file:
```
$ podman logout --authfile authdir/myauths.json docker.io
```

Remove login credentials for all registries:
```
$ podman logout --all
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-login(1)](podman-login.1.md)**, **[containers-auth.json(5)](https://github.com/containers/image/blob/main/docs/containers-auth.json.5.md)**

## HISTORY
August 2017, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
