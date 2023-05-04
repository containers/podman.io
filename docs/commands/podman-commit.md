% podman-commit 1

## NAME

podman\-commit - Create new image based on the changed container

## SYNOPSIS

**podman commit** [*options*] _container_ [*image*]

**podman container commit** [*options*] _container_ [*image*]

## DESCRIPTION

**podman commit** creates an image based on a changed _container_. The author of the image can be set using the **--author** OPTION. Various image instructions can be configured with the **--change** OPTION and a commit message can be set using the **--message** OPTION. The _container_ and its processes aren't paused while the image is committed. If this is not desired, the **--pause** OPTION can be set to _true_. When the commit is complete, Podman will print out the ID of the new image.

If `image` does not begin with a registry name component, `localhost` will be added to the name.
If `image` is not provided, the values for the `REPOSITORY` and `TAG` values of the created image will each be set to `<none>`.

## OPTIONS

#### **--author**, **-a**=_author_

Set the author for the committed image.

#### **--change**, **-c**=_instruction_

Apply the following possible instructions to the created image:

- _CMD_
- _ENTRYPOINT_
- _ENV_
- _EXPOSE_
- _LABEL_
- _ONBUILD_
- _STOPSIGNAL_
- _USER_
- _VOLUME_
- _WORKDIR_

Can be set multiple times.

#### **--format**, **-f**=**oci** | _docker_

Set the format of the image manifest and metadata. The currently supported formats are **oci** and _docker_.\
The default is **oci**.

#### **--iidfile**=_ImageIDfile_

Write the image ID to the file.

#### **--include-volumes**

Include in the committed image any volumes added to the container by the **--volume** or **--mount** OPTIONS to the **[podman create](commands/podman-create.md)** and **[podman run](commands/podman-run.md)** commands.\
The default is **false**.

#### **--message**, **-m**=_message_

Set commit message for committed image.\
_IMPORTANT: The message field is not supported in `oci` format._

#### **--pause**, **-p**

Pause the container when creating an image.\
The default is **false**.

#### **--quiet**, **-q**

Suppresses output.\
The default is **false**.

#### **--squash**, **-s**

Squash newly built layers into a single new layer.\
The default is **false**.

## EXAMPLES

Create image from container with entrypoint and label

```
$ podman commit --change CMD=/bin/bash --change ENTRYPOINT=/bin/sh --change "LABEL blue=image" reverent_golick image-committed
Getting image source signatures
Copying blob sha256:b41deda5a2feb1f03a5c1bb38c598cbc12c9ccd675f438edc6acd815f7585b86
 25.80 MB / 25.80 MB [======================================================] 0s
Copying config sha256:c16a6d30f3782288ec4e7521c754acc29d37155629cb39149756f486dae2d4cd
 448 B / 448 B [============================================================] 0s
Writing manifest to image destination
Storing signatures
e3ce4d93051ceea088d1c242624d659be32cf1667ef62f1d16d6b60193e2c7a8
```

Create image from container with commit message

```
$ podman commit -q --message "committing container to image"
reverent_golick image-committed
e3ce4d93051ceea088d1c242624d659be32cf1667ef62f1d16d6b60193e2c7a8
```

Create image from container with author

```
$ podman commit -q --author "firstName lastName" reverent_golick image-committed
e3ce4d93051ceea088d1c242624d659be32cf1667ef62f1d16d6b60193e2c7a8
```

Pause a running container while creating the image

```
$ podman commit -q --pause=true containerID image-committed
e3ce4d93051ceea088d1c242624d659be32cf1667ef62f1d16d6b60193e2c7a8
```

Create an image from a container with a default image tag

```
$ podman commit containerID
e3ce4d93051ceea088d1c242624d659be32cf1667ef62f1d16d6b60193e2c7a8
```

Create an image from container with default required capabilities are SETUID and SETGID

```
$ podman commit -q --change LABEL=io.containers.capabilities=setuid,setgid epic_nobel privimage
400d31a3f36dca751435e80a0e16da4859beb51ff84670ce6bdc5edb30b94066
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-run(1)](commands/podman-run.md)**, **[podman-create(1)](commands/podman-create.md)**

## HISTORY

December 2017, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
