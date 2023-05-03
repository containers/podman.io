% podman-manifest-inspect 1

## NAME

podman\-manifest\-inspect - Display a manifest list or image index

## SYNOPSIS

**podman manifest inspect** [*options*] _listnameorindexname_

## DESCRIPTION

Displays the manifest list or image index stored using the specified image name.

## RETURN VALUE

A formatted JSON representation of the manifest list or image index.

## OPTIONS

@@option tls-verify

## EXAMPLES

```
podman manifest inspect mylist:v11
```

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-manifest(1)](commands/podman-manifest/podman-manifest.md)**
