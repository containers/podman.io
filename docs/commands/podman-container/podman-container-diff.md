% podman-container-diff 1

## NAME

podman\-container\-diff - Inspect changes on a container's filesystem

## SYNOPSIS

**podman container diff** [*options*] _container_ [*container*]

## DESCRIPTION

Displays changes on a container's filesystem. The container will be compared to its parent layer or the second argument when given.

The output is prefixed with the following symbols:

| Symbol | Description                      |
| ------ | -------------------------------- |
| A      | A file or directory was added.   |
| D      | A file or directory was deleted. |
| C      | A file or directory was changed. |

## OPTIONS

#### **--format**

Alter the output into a different format. The only valid format for **podman container diff** is `json`.

@@option latest

## EXAMPLE

```
# podman container diff container1
C /usr
C /usr/local
C /usr/local/bin
A /usr/local/bin/docker-entrypoint.sh
```

```
$ podman container diff --format json container1 container2
{
     "added": [
          "/test"
     ]
}
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-container(1)](commands/podman-container/podman-container.md)**

## HISTORY

July 2021, Originally compiled by Paul Holzinger <pholzing@redhat.com>
