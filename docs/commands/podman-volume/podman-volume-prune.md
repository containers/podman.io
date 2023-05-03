% podman-volume-prune 1

## NAME

podman\-volume\-prune - Remove all unused volumes

## SYNOPSIS

**podman volume prune** [*options*]

## DESCRIPTION

Removes unused volumes. By default all unused volumes will be removed, the **--filter** flag can
be used to filter specific volumes. You will be prompted to confirm the removal of all the
unused volumes. To bypass the confirmation, use the **--force** flag.

## OPTIONS

#### **--filter**

Provide filter values.

The _filters_ argument format is of `key=value`. If there is more than one _filter_, then pass multiple OPTIONS: **--filter** _foo=bar_ **--filter** _bif=baz_.

Supported filters:

| Filter  | Description                                                                                       |
| :-----: | ------------------------------------------------------------------------------------------------- |
| _label_ | Only remove volumes, with (or without, in the case of label!=[...] is used) the specified labels. |
| _until_ | Only remove volumes created before given timestamp.                                               |

The `label` _filter_ accepts two formats. One is the `label`=_key_ or `label`=_key_=_value_, which removes volumes with the specified labels. The other format is the `label!`=_key_ or `label!`=_key_=_value_, which removes volumes without the specified labels.

The `until` _filter_ can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. 10m, 1h30m) computed relative to the machine’s time.

#### **--force**, **-f**

Do not prompt for confirmation.

#### **--help**

Print usage statement

## EXAMPLES

```
$ podman volume prune

$ podman volume prune --force

$ podman volume prune --filter label=mylabel=mylabelvalue
```

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-volume(1)](commands/podman-volume/podman-volume.md)**

## HISTORY

November 2018, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
