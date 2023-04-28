% podman-network-prune 1

## NAME

podman\-network\-prune - Remove all unused networks

## SYNOPSIS

**podman network prune** [*options*]

## DESCRIPTION

Remove all unused networks. An unused network is defined by a network which
has no containers connected or configured to connect to it. It will not remove
the so-called default network which goes by the name of _podman_.

## OPTIONS

#### **--filter**

Provide filter values.

The _filters_ argument format is of `key=value`. If there is more than one _filter_, then pass multiple OPTIONS: **--filter** _foo=bar_ **--filter** _bif=baz_.

Supported filters:

| Filter  | Description                                                                                        |
| :-----: | -------------------------------------------------------------------------------------------------- |
| _label_ | Only remove networks, with (or without, in the case of label!=[...] is used) the specified labels. |
| _until_ | Only remove networks created before given timestamp.                                               |

The `label` _filter_ accepts two formats. One is the `label`=_key_ or `label`=_key_=_value_, which removes networks with the specified labels. The other format is the `label!`=_key_ or `label!`=_key_=_value_, which removes networks without the specified labels.

The `until` _filter_ can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. 10m, 1h30m) computed relative to the machine’s time.

#### **--force**, **-f**

Do not prompt for confirmation

## EXAMPLE

Prune networks

```
podman network prune
```

Prune all networks created before 2h

```
podman network prune --filter until=2h
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-network(1)](podman-network.md)**, **[podman-network-rm(1)](podman-network-rm.md)**

## HISTORY

February 2021, Originally compiled by Brent Baude <bbaude@redhat.com>
