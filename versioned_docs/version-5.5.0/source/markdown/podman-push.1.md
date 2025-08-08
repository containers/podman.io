---
title: podman-push
version: v5.5.0
---

% podman-push 1

## NAME
podman\-push - Push an image, manifest list or image index from local storage to elsewhere

## SYNOPSIS
**podman push** [*options*] *image* [*destination*]

**podman image push** [*options*] *image* [*destination*]

## DESCRIPTION
Pushes an image, manifest list or image index from local storage to a specified
destination.

## Image storage
Images are pushed from those stored in local image storage.

## DESTINATION

 DESTINATION is the location the container image is pushed to. It supports all transports from `containers-transports(5)`. If no transport is specified, the `docker` (i.e., container registry) transport is used.  For remote clients, including Mac and Windows (excluding WSL2) machines, `docker` is the only supported transport.

```
# Push to a container registry
$ podman push quay.io/podman/stable

# Push to a container registry via the docker transport
$ podman push docker://quay.io/podman/stable

# Push to a container registry with another tag
$ podman push myimage quay.io/username/myimage

# Push to a local directory
$ podman push myimage dir:/tmp/myimage

# Push to a tarball in the docker-archive format
$ podman push myimage docker-archive:/tmp/myimage

# Push to a local docker daemon
$ sudo podman push myimage docker-daemon\:docker.io/library/myimage:33

# Push to a tarball in the OCI format
$ podman push myimage oci-archive:/tmp/myimage
```

## OPTIONS


[//]: # (BEGIN included file options/authfile.md)
#### **--authfile**=*path*

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **[podman login](podman-login.1.md)**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

[//]: # (END   included file options/authfile.md)


[//]: # (BEGIN included file options/cert-dir.md)
#### **--cert-dir**=*path*

Use certificates at *path* (\*.crt, \*.cert, \*.key) to connect to the registry. (Default: /etc/containers/certs.d)
For details, see **[containers-certs.d(5)](https://github.com/containers/image/blob/main/docs/containers-certs.d.5.md)**.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/cert-dir.md)


[//]: # (BEGIN included file options/dir-compress.md)
#### **--compress**

Compress tarball image layers when pushing to a directory using the 'dir' transport. (default is same compression type, compressed or uncompressed, as source)

[//]: # (END   included file options/dir-compress.md)

Note: This flag can only be set when using the **dir** transport


[//]: # (BEGIN included file options/compression-format.md)
#### **--compression-format**=**gzip** | *zstd* | *zstd:chunked*

Specifies the compression format to use.  Supported values are: `gzip`, `zstd` and `zstd:chunked`.  The default is `gzip` unless overridden in the containers.conf file.
`zstd:chunked` is incompatible with encrypting images, and will be treated as `zstd` with a warning in that case.

[//]: # (END   included file options/compression-format.md)


[//]: # (BEGIN included file options/compression-level.md)
#### **--compression-level**=*level*

Specifies the compression level to use.  The value is specific to the compression algorithm used, e.g. for zstd the accepted values are in the range 1-20 (inclusive) with a default of 3, while for gzip it is 1-9 (inclusive) and has a default of 5.

[//]: # (END   included file options/compression-level.md)


[//]: # (BEGIN included file options/creds.md)
#### **--creds**=*[username[\:password]]*

The [username[:password]] to use to authenticate with the registry, if required.
If one or both values are not supplied, a command line prompt appears and the
value can be entered. The password is entered without echo.

Note that the specified credentials are only used to authenticate against
target registries.  They are not used for mirrors or when the registry gets
rewritten (see `containers-registries.conf(5)`); to authenticate against those
consider using a `containers-auth.json(5)` file.

[//]: # (END   included file options/creds.md)


[//]: # (BEGIN included file options/digestfile.md)
#### **--digestfile**=*Digestfile*

After copying the image, write the digest of the resulting image to the file.

[//]: # (END   included file options/digestfile.md)


[//]: # (BEGIN included file options/disable-content-trust.md)
#### **--disable-content-trust**

This is a Docker-specific option to disable image verification to a container
registry and is not supported by Podman. This option is a NOOP and provided
solely for scripting compatibility.

[//]: # (END   included file options/disable-content-trust.md)

#### **--encrypt-layer**=*layer(s)*

Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, encrypts all layers if encryption-key flag is specified.

#### **--encryption-key**=*key*

The [protocol\:keyfile] specifies the encryption protocol, which can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption. For instance, jwe:/path/to/key.pem or pgp\:admin@example.com or pkcs7:/path/to/x509-file.


[//]: # (BEGIN included file options/force-compression.md)
#### **--force-compression**

If set, push uses the specified compression algorithm even if the destination contains a differently-compressed variant already.
Defaults to `true` if `--compression-format` is explicitly specified on the command-line, `false` otherwise.

[//]: # (END   included file options/force-compression.md)

#### **--format**, **-f**=*format*

Manifest Type (oci, v2s2, or v2s1) to use when pushing an image.

#### **--quiet**, **-q**

When writing the output image, suppress progress output

#### **--remove-signatures**

Discard any pre-existing signatures in the image.


[//]: # (BEGIN included file options/retry.md)
#### **--retry**=*attempts*

Number of times to retry pulling or pushing images between the registry and
local storage in case of failure. Default is **3**.

[//]: # (END   included file options/retry.md)


[//]: # (BEGIN included file options/retry-delay.md)
#### **--retry-delay**=*duration*

Duration of delay between retry attempts when pulling or pushing images between
the registry and local storage in case of failure. The default is to start at two seconds and then exponentially back off. The delay is used when this value is set, and no exponential back off occurs.

[//]: # (END   included file options/retry-delay.md)

#### **--sign-by**=*key*

Add a “simple signing” signature at the destination using the specified key. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)


[//]: # (BEGIN included file options/sign-by-sigstore.md)
#### **--sign-by-sigstore**=*param-file*

Add a sigstore signature based on further options specified in a container's sigstore signing parameter file *param-file*.
See containers-sigstore-signing-params.yaml(5) for details about the file format.

[//]: # (END   included file options/sign-by-sigstore.md)

#### **--sign-by-sigstore-private-key**=*path*

Add a sigstore signature at the destination using a private key at the specified path. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)


[//]: # (BEGIN included file options/sign-passphrase-file.md)
#### **--sign-passphrase-file**=*path*

If signing the image (using either **--sign-by** or **--sign-by-sigstore-private-key**), read the passphrase to use from the specified path.

[//]: # (END   included file options/sign-passphrase-file.md)


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)

## EXAMPLE

Push the specified image to a local directory:
```
# podman push imageID dir:/path/to/image
```

Push the specified image to a local directory in OCI format:
```
# podman push imageID oci-archive:/path/to/layout:image:tag
```

Push the specified image to a container registry:
```
# podman push imageID docker://registry.example.com/repository:tag
```

Push the specified image to a container registry and save the digest in the specified file:
```
# podman push --digestfile=/tmp/mydigest imageID docker://registry.example.com/repository:tag
```

Push the specified image into the local Docker daemon container store:
```
# podman push imageID docker-daemon:image:tag
```

Push the specified image with a different image name using credentials from an alternate authfile path:
```
# podman push --authfile temp-auths/myauths.json alpine docker://docker.io/umohnani/alpine
Getting image source signatures
Copying blob sha256:5bef08742407efd622d243692b79ba0055383bbce12900324f75e56f589aedb0
 4.03 MB / 4.03 MB [========================================================] 1s
Copying config sha256:ad4686094d8f0186ec8249fc4917b71faa2c1030d7b5a025c29f26e19d95c156
 1.41 KB / 1.41 KB [========================================================] 1s
Writing manifest to image destination
Storing signatures
```

Push the specified image to a local directory as an OCI image:
```
# podman push --format oci registry.access.redhat.com/rhel7 dir\:rhel7-dir
Getting image source signatures
Copying blob sha256:9cadd93b16ff2a0c51ac967ea2abfadfac50cfa3af8b5bf983d89b8f8647f3e4
 71.41 MB / 71.41 MB [======================================================] 9s
Copying blob sha256:4aa565ad8b7a87248163ce7dba1dd3894821aac97e846b932ff6b8ef9a8a508a
 1.21 KB / 1.21 KB [========================================================] 0s
Copying config sha256\:f1b09a81455c351eaa484b61aacd048ab613c08e4c5d1da80c4c46301b03cf3b
 3.01 KB / 3.01 KB [========================================================] 0s
Writing manifest to image destination
Storing signatures
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-pull(1)](podman-pull.1.md)**, **[podman-login(1)](podman-login.1.md)**, **[containers-certs.d(5)](https://github.com/containers/image/blob/main/docs/containers-certs.d.5.md)**, **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**, **[containers-transports(5)](https://github.com/containers/image/blob/main/docs/containers-transports.5.md)**

### Troubleshooting

See [podman-troubleshooting(7)](https://github.com/containers/podman/blob/main/troubleshooting.md)
for solutions to common issues.
