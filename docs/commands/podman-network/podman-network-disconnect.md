% podman-network-disconnect 1

## NAME

podman\-network\-disconnect - Disconnect a container from a network

## SYNOPSIS

**podman network disconnect** [*options*] network container

## DESCRIPTION

Disconnects a container from a network. A container can be disconnected from a network by name or by ID.
If all networks are disconnected from the container, it will behave like a container created with `--network=none`
and it will longer have network connectivity until a network is connected again.

## OPTIONS

#### **--force**, **-f**

Force the container to disconnect from a network

## EXAMPLE

Disconnect a container named _web_ from a network called _test_.

```
podman network disconnect test web
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-network(1)](commands/podman-network/podman-network.md)**, **[podman-network-connect(1)](commands/podman-network/podman-network-connect.md)**

## HISTORY

November 2020, Originally compiled by Brent Baude <bbaude@redhat.com>
