% podman-volume-unmount 1

## NAME

podman\-volume\-unmount - Unmount a volume

## SYNOPSIS

**podman volume unmount** _volume_ [...]

**podman volume umount** _volume_ [...]

## DESCRIPTION

Unmounts the specified volume, if there are no other containers
using it.

Volume storage increments a mount counter each time a volume is mounted.
When a volume is unmounted, the mount counter is decremented, and the
volume's filesystem is physically unmounted only when the mount
counter reaches zero indicating no other processes are using the mount.

## EXAMPLE

Unmount volume with a given ID

```
podman volume unmount volumeID
```

Unmount multiple volumes with given IDs

```
podman volume unmount volumeID1 volumeID2 volumeID3
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-volume(1)](commands/podman-volume/podman-volume.md)**, **[podman-volume-mount(1)](commands/podman-volume/podman-volume-mount.md)**
