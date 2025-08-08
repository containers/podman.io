---
title: podman-manifest-inspect
version: v5.5.1
---

% podman-manifest-inspect 1

## NAME
podman\-manifest\-inspect - Display a manifest list or image index

## SYNOPSIS
**podman manifest inspect** [*options*] *listnameorindexname*

## DESCRIPTION

Displays the manifest list or image index stored using the specified image name.
## RETURN VALUE

A formatted JSON representation of the manifest list or image index.

## OPTIONS


[//]: # (BEGIN included file options/authfile.md)
#### **--authfile**=*path*

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **[podman login](podman-login.1.md)**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

[//]: # (END   included file options/authfile.md)


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)

## EXAMPLES

Inspect the manifest of mylist:v1.11.
```
podman manifest inspect mylist\:v1.11
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-manifest(1)](podman-manifest.1.md)**
