---
title: podman-manifest-create
version: v5.5.0
---

% podman-manifest-create 1

## NAME
podman\-manifest\-create - Create a manifest list or image index

## SYNOPSIS
**podman manifest create** [*options*] *listnameorindexname* [*imagename* ...]

## DESCRIPTION

Creates a new manifest list and stores it as an image in local storage using
the specified name.

If additional images are specified, they are added to the newly-created list or
index.

## OPTIONS

#### **--all**

If any of the images added to the new list or index are
themselves lists or indexes, add all of their contents.  By default, only one
image from such a list is added to the newly-created list or index.

#### **--amend**, **-a**

If a manifest list named *listnameorindexname* already exists, modify the
preexisting list instead of exiting with an error.  The contents of
*listnameorindexname* are not modified if no *imagename*s are given.

#### **--annotation**=*value*

Set an annotation on the newly-created image index.


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)

## EXAMPLES

Create the specified manifest.
```
podman manifest create mylist:v1.11
9cfd24048d5fc80903f088f1531a21bff01172abe66effa8941a4c2308dc745f
```

Create the specified manifest manifest or modify it if it previously exist.
```
podman manifest create --amend mylist:v1.11
9cfd24048d5fc80903f088f1531a21bff01172abe66effa8941a4c2308dc745f
```

Create the named manifest including the specified image matching the current platform.
```
podman manifest create mylist:v1.11 docker://fedora
5c2bc76bfb4ba6665a7973f7e1c05ee0536b4580637f27adc9fa5a4b2bc03cf1
```

Create the named manifest including all images referred to with the specified image reference.
```
podman manifest create --all mylist\:v1.11 docker://fedora
30330571e79c65288a4fca421d9aed29b0210d57294d9c2056743fdcf6e3967b
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-manifest(1)](podman-manifest.1.md)**
