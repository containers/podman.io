---
title: podman-manifest-push
version: v5.4.1
---

% podman-manifest-push 1

## NAME
podman\-manifest\-push - Push a manifest list or image index to a registry

## SYNOPSIS
**podman manifest push** [*options*] *listnameorindexname* [*destination*]

## DESCRIPTION
Pushes a manifest list or image index to a registry.

## RETURN VALUE
The list image's ID and the digest of the image's manifest.

## OPTIONS

#### **--add-compression**=*compression*

Makes sure that requested compression variant for each platform is added to the manifest list keeping original instance
intact in the same manifest list. Supported values are (`gzip`, `zstd` and `zstd:chunked`). Following flag can be used
multiple times.

Note that `--compression-format` controls the compression format of each instance in the manifest list. `--add-compression`
will add another variant for each instance in the list with the specified compressions. `--compression-format` gzip `--add-compression`
zstd will push a manifest list with each instance being compressed with gzip plus an additional variant of each instance
being compressed with zstd.

#### **--all**

Push the images mentioned in the manifest list or image index, in addition to
the list or index itself. (Default true)


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


[//]: # (BEGIN included file options/force-compression.md)
#### **--force-compression**

If set, push uses the specified compression algorithm even if the destination contains a differently-compressed variant already.
Defaults to `true` if `--compression-format` is explicitly specified on the command-line, `false` otherwise.

[//]: # (END   included file options/force-compression.md)

#### **--format**, **-f**=*format*

Manifest list type (oci or v2s2) to use when pushing the list (default is oci).

#### **--quiet**, **-q**

When writing the manifest, suppress progress output

#### **--remove-signatures**

Don't copy signatures when pushing images.

#### **--rm**

Delete the manifest list or image index from local storage if pushing succeeds.

#### **--sign-by**=*fingerprint*

Sign the pushed images with a “simple signing” signature using the specified key. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)


[//]: # (BEGIN included file options/sign-by-sigstore.md)
#### **--sign-by-sigstore**=*param-file*

Add a sigstore signature based on further options specified in a container's sigstore signing parameter file *param-file*.
See containers-sigstore-signing-params.yaml(5) for details about the file format.

[//]: # (END   included file options/sign-by-sigstore.md)

#### **--sign-by-sigstore-private-key**=*path*

Sign the pushed images with a sigstore signature using a private key at the specified path. (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)


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

## DESTINATION

 DESTINATION is the location the container image is pushed to. It supports all transports from `containers-transports(5)`. If no transport is specified, the `docker` (i.e., container registry) transport is used.  For remote clients, including Mac and Windows (excluding WSL2) machines, `docker` is the only supported transport.

## EXAMPLE

Push manifest list to container registry:
```
podman manifest push mylist:v1.11 docker://registry.example.org/mylist:v1.11
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-manifest(1)](podman-manifest.1.md)**, **[containers-transports(5)](https://github.com/containers/image/blob/main/docs/containers-transports.5.md)**
