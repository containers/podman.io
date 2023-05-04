% podman-volume-export 1

## NAME

podman\-volume\-export - Exports volume to external tar

## SYNOPSIS

**podman volume export** [*options*] _volume_

## DESCRIPTION

**podman volume export** exports the contents of a podman volume and saves it as a tarball
on the local machine. **podman volume export** writes to STDOUT by default and can be
redirected to a file using the `--output` flag.

Note: Following command is not supported by podman-remote.

**podman volume export [OPTIONS] VOLUME**

## OPTIONS

#### **--help**

Print usage statement

#### **--output**, **-o**=_file_

Write to a file, default is STDOUT

## EXAMPLES

```
$ podman volume export myvol --output myvol.tar

```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-volume(1)](commands/podman-volume/podman-volume.md)**, **[podman-volume-import(1)](commands/podman-volume/podman-volume-import.md)**
