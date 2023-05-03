% podman-tag 1

## NAME

podman\-tag - Add an additional name to a local image

## SYNOPSIS

**podman tag** _image_[:*tag*] [_target-name_[:*tag*]...] [*options*]

**podman image tag** _image_[:*tag*] [_target-name_[:*tag*]...] [*options*]

## DESCRIPTION

Assigns a new image name to an existing image. A full name refers to the entire
image name, including the optional _tag_ after the `:`. If there is no _tag_
provided, then podman will default to `latest` for both the _image_ and the
_target-name_.

## OPTIONS

#### **--help**, **-h**

Print usage statement

## EXAMPLES

```
$ podman tag 0e3bbc2 fedora:latest

$ podman tag httpd myregistryhost:5000/fedora/httpd:v2
```

## SEE ALSO

**[podman(1)](commands/podman.md)**

## HISTORY

December 2019, Update description to refer to 'name' instead of 'alias' by Sascha Grunert <sgrunert@suse.com>
July 2017, Originally compiled by Ryan Cole <rycole@redhat.com>
