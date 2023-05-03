% podman-network-connect 1

## NAME

podman\-network\-connect - Connect a container to a network

## SYNOPSIS

**podman network connect** [*options*] network container

## DESCRIPTION

Connects a container to a network. A container can be connected to a network by name or by ID.
Once connected, the container can communicate with other containers in the same network.

## OPTIONS

#### **--alias**=_name_

Add network-scoped alias for the container. If the network has DNS enabled (`podman network inspect -f {{.DNSEnabled}} <NAME>`),
these aliases can be used for name resolution on the given network. Multiple _--alias_ options may be specified as input.
NOTE: When using CNI a container will only have access to aliases on the first network that it joins. This limitation does
not exist with netavark/aardvark-dns.

#### **--ip**=_address_

Set a static ipv4 address for this container on this network.

#### **--ip6**=_address_

Set a static ipv6 address for this container on this network.

#### **--mac-address**=_address_

Set a static mac address for this container on this network.

## EXAMPLE

Connect a container named _web_ to a network named _test_

```
podman network connect test web
```

Connect a container name _web_ to a network named _test_ with two aliases: web1 and web2

```
podman network connect --alias web1 --alias web2 test web
```

Connect a container name _web_ to a network named _test_ with a static ip.

```
podman network connect --ip 10.893 test web
```

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-network(1)](commands/podman-network/podman-network.md)**, **[podman-network-inspect(1)](commands/podman-network/podman-network-inspect.md)**, **[podman-network-disconnect(1)](commands/podman-network/podman-network-disconnect.md)**

## HISTORY

November 2020, Originally compiled by Brent Baude <bbaude@redhat.com>
