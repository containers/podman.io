---
title: podman-search
version: v5.4.1
---

% podman-search 1

## NAME
podman\-search - Search a registry for an image

## SYNOPSIS
**podman search** [*options*] *term*

## DESCRIPTION
**podman search** searches a registry or a list of registries for a matching image.
The user can specify which registry to search by prefixing the registry in the search term
(e.g., **registry.fedoraproject.org/fedora**).  By default, all
unqualified-search registries in `containers-registries.conf(5)` are used.

The default number of results is 25. The number of results can be limited using the **--limit** flag.
If more than one registry is being searched, the limit is applied to each registry. The output can be filtered
using the **--filter** flag. To get all available images in a registry without a specific
search term, the user can just enter the registry name with a trailing "/" (example **registry.fedoraproject.org/**).

Note that **podman search** is not a reliable way to determine the presence or existence of an image.
The search behavior of the v1 and v2 Docker distribution API is specific to the implementation of each registry.
Some registries may not support searching at all.
Further note that searching without a search term only works for registries that implement the v2 API.

**podman [GLOBAL OPTIONS]**

**podman search [GLOBAL OPTIONS]**

**podman search [OPTIONS] TERM**

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

#### **--compatible**

After the name and the description, also show the stars, official and automated descriptors as Docker does.
Podman does not show these descriptors by default since they are not supported by most public container registries.


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

#### **--filter**, **-f**=*filter*

Filter output based on conditions provided (default [])

Supported filters are:

* stars (int) - minimum number of stars required for images to show
* is-automated (boolean - true | false) - is the image automated or not
* is-official (boolean - true | false) - is the image official or not

#### **--format**=*format*

Change the output format to a Go template

Valid placeholders for the Go template are listed below:

| **Placeholder** | **Description**              |
| --------------- | ---------------------------- |
| .Automated      | "[OK]" if image is automated |
| .Description    | Image description            |
| .Index          | Registry                     |
| .Name           | Image name                   |
| .Official       | "[OK]" if image is official  |
| .Stars          | Star count of image          |
| .Tag            | Repository tag               |

Note: use .Tag only if the --list-tags is set.

#### **--help**, **-h**

Print usage statement

#### **--limit**=*limit*

Limit the number of results (default 25).
Note: The results from each registry is limited to this value.
Example if limit is 10 and two registries are being searched, the total
number of results is 20, 10 from each (if there are at least 10 matches in each).
The order of the search results is the order in which the API endpoint returns the results.

#### **--list-tags**

List the available tags in the repository for the specified image.
**Note:** --list-tags requires the search term to be a fully specified image name.
The result contains the Image name and its tag, one line for every tag associated with the image.

#### **--no-trunc**

Do not truncate the output (default *false*).


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)

## EXAMPLES

Search for images containing the specified name, returning the first three images from each defined registry.
```
$ podman search --limit 3 fedora
NAME                                     DESCRIPTION
NAME                                           DESCRIPTION
registry.fedoraproject.org/f29/fedora-toolbox
registry.fedoraproject.org/f30/fedora-toolbox
registry.fedoraproject.org/f31/fedora-toolbox
docker.io/library/fedora                       Official Docker builds of Fedora
docker.io/kasmweb/fedora-37-desktop            Fedora 37 desktop for Kasm Workspaces
docker.io/kasmweb/fedora-38-desktop            Fedora 38 desktop for Kasm Workspaces
quay.io/fedora/fedora
quay.io/containerdisks/fedora                  # Fedora Containerdisk Images  <img src="htt...
quay.io/fedora/fedora-minimal
```

Note that the Stars, Official and Automated descriptors are only available on Docker Hub and are hence not displayed by default.
```
$ podman search --format "{{.Name}}\t{{.Stars}}\t{{.Official}}" alpine --limit 3
docker.io/library/alpine       7956        [OK]
docker.io/alpine/git           192
docker.io/anapsix/alpine-java  474
quay.io/libpod/alpine          0
quay.io/vqcomms/alpine-tools   0
quay.io/wire/alpine-deps       0
```

Search and list tags for the specified image returning the first four images from each defined registry.
```
$ podman search --list-tags registry.access.redhat.com/ubi8 --limit 4
NAME                             TAG
registry.access.redhat.com/ubi8  8.4-211
registry.access.redhat.com/ubi8  8.4-206.1626828523-source
registry.access.redhat.com/ubi8  8.4-199
registry.access.redhat.com/ubi8  8.4-211-source
```
Note: This works only with registries that implement the v2 API. If tried with a v1 registry an error is returned.

## FILES

**registries.conf** (`/etc/containers/registries.conf`)

registries.conf is the configuration file which specifies which container registries is consulted when completing image names which do not include a registry or domain portion.

## SEE ALSO
**[podman(1)](podman.1.md)**, **[containers-registries(5)](https://github.com/containers/image/blob/main/docs/containers-registries.5.md)**

## HISTORY
January 2018, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
