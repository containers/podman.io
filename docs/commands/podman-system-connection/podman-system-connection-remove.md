% podman-system-connection-remove 1

## NAME

podman\-system\-connection\-remove - Delete named destination

## SYNOPSIS

**podman system connection remove** [*options*] _name_

## DESCRIPTION

Delete named ssh destination.

## OPTIONS

#### **--all**, **-a**

Remove all connections.

## EXAMPLE

```
$ podman system connection remove production
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-system(1)](commands/podman-system/podman-system.md)**, **[podman-system-connection(1)](commands/podman-system-connection/podman-system-connection.md)**

## HISTORY

July 2020, Originally compiled by Jhon Honce (jhonce at redhat dot com)
