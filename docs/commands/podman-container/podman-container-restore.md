% podman-container-restore 1

## NAME

podman\-container\-restore - Restores one or more containers from a checkpoint

## SYNOPSIS

**podman container restore** [*options*] _name_ [...]

## DESCRIPTION

**podman container restore** restores a container from a container checkpoint or
checkpoint image. The _container IDs_, _image IDs_ or _names_ are used as input.

## OPTIONS

#### **--all**, **-a**

Restore all checkpointed _containers_.\
The default is **false**.\
_IMPORTANT: This OPTION does not need a container name or ID as input argument._

#### **--file-locks**

Restore a _container_ with file locks. This option is required to
restore file locks from a checkpoint image. If the checkpoint image
does not contain file locks, this option is ignored. Defaults to not
restoring file locks.\
The default is **false**.

#### **--ignore-rootfs**

If a _container_ is restored from a checkpoint tar.gz file it is possible that it also contains all root file-system changes. With **--ignore-rootfs** it is possible to explicitly disable applying these root file-system changes to the restored _container_.\
The default is **false**.\
_IMPORTANT: This OPTION is only available in combination with **--import, -i**._

#### **--ignore-static-ip**

If the _container_ was started with **--ip** the restored _container_ also tries to use that
IP address and restore fails if that IP address is already in use. This can happen, if
a _container_ is restored multiple times from an exported checkpoint with **--name, -n**.

Using **--ignore-static-ip** tells Podman to ignore the IP address if it was configured
with **--ip** during _container_ creation.

The default is **false**.

#### **--ignore-static-mac**

If the _container_ was started with **--mac-address** the restored _container_ also
tries to use that MAC address and restore fails if that MAC address is already
in use. This can happen, if a _container_ is restored multiple times from an
exported checkpoint with **--name, -n**.

Using **--ignore-static-mac** tells Podman to ignore the MAC address if it was
configured with **--mac-address** during _container_ creation.

The default is **false**.

#### **--ignore-volumes**

This option must be used in combination with the **--import, -i** option.
When restoring _containers_ from a checkpoint tar.gz file with this option,
the content of associated volumes will not be restored.\
The default is **false**.

#### **--import**, **-i**=_file_

Import a checkpoint tar.gz file, which was exported by Podman. This can be used
to import a checkpointed _container_ from another host.\
_IMPORTANT: This OPTION does not need a container name or ID as input argument._

During the import of a checkpoint file Podman will select the same container runtime
which was used during checkpointing. This is especially important if a specific
(non-default) container runtime was specified during container creation. Podman will
also abort the restore if the container runtime specified during restore does
not much the container runtime used for container creation.

#### **--import-previous**=_file_

Import a pre-checkpoint tar.gz file which was exported by Podman. This option
must be used with **-i** or **--import**. It only works on `runc 1.0-rc3` or `higher`.
_IMPORTANT: This OPTION is not supported on the remote client, including Mac and Windows (excluding WSL2) machines._

#### **--keep**, **-k**

Keep all temporary log and statistics files created by `CRIU` during
checkpointing as well as restoring. These files are not deleted if restoring
fails for further debugging. If restoring succeeds these files are
theoretically not needed, but if these files are needed Podman can keep the
files for further analysis. This includes the checkpoint directory with all
files created during checkpointing. The size required by the checkpoint
directory is roughly the same as the amount of memory required by the
processes in the checkpointed _container_.\
Without the **--keep**, **-k** option the checkpoint will be consumed and cannot be used again.\
The default is **false**.

#### **--latest**, **-l**

Instead of providing the _container ID_ or _name_, use the last created _container_. If other tools than Podman are used to run _containers_ such as `CRI-O`, the last started _container_ could be from either tool.\
The default is **false**.\
_IMPORTANT: This OPTION is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines. This OPTION does not need a container name or ID as input argument._

#### **--name**, **-n**=_name_

If a _container_ is restored from a checkpoint tar.gz file it is possible to rename it with **--name, -n**. This way it is possible to restore a _container_ from a checkpoint multiple times with different
names.

If the **--name, -n** option is used, Podman will not attempt to assign the same IP
address to the _container_ it was using before checkpointing as each IP address can only
be used once and the restored _container_ will have another IP address. This also means
that **--name, -n** cannot be used in combination with **--tcp-established**.\
_IMPORTANT: This OPTION is only available for a checkpoint image or in combination
with **--import, -i**._

#### **--pod**=_name_

Restore a container into the pod _name_. The destination pod for this restore
has to have the same namespaces shared as the pod this container was checkpointed
from (see **[podman pod create --share](commands/podman-pod/podman-pod-create.md#--share)**).\
_IMPORTANT: This OPTION is only available for a checkpoint image or in combination
with **--import, -i**._

This option requires at least CRIU 36.

#### **--print-stats**

Print out statistics about restoring the container(s). The output is
rendered in a JSON array and contains information about how much time different
restore operations required. Many of the restore statistics are created
by CRIU and just passed through to Podman. The following information is provided
in the JSON array:

- **podman_restore_duration**: Overall time (in microseconds) needed to restore
  all checkpoints.

- **runtime_restore_duration**: Time (in microseconds) the container runtime
  needed to restore the checkpoint.

- **forking_time**: Time (in microseconds) CRIU needed to create (fork) all
  processes in the restored container (measured by CRIU).

- **restore_time**: Time (in microseconds) CRIU needed to restore all processes
  in the container (measured by CRIU).

- **pages_restored**: Number of memory pages restored (measured by CRIU).

The default is **false**.

#### **--publish**, **-p**=_port_

Replaces the ports that the _container_ publishes, as configured during the
initial _container_ start, with a new set of port forwarding rules.

For more details please see **[podman run --publish](commands/podman-run.md#--publish)**.

#### **--tcp-established**

Restore a _container_ with established TCP connections. If the checkpoint image
contains established TCP connections, this option is required during restore.
If the checkpoint image does not contain established TCP connections this
option is ignored. Defaults to not restoring _containers_ with established TCP
connections.\
The default is **false**.

## EXAMPLE

Restores the container "mywebserver".

```
# podman container restore mywebserver
```

Import a checkpoint file and a pre-checkpoint file.

```
# podman container restore --import-previous pre-checkpoint.tar.gz --import checkpoint.tar.gz
```

Start the container "mywebserver". Make a checkpoint of the container and export it. Restore the container with other port ranges from the exported file.

```
$ podman run --rm -p 2345:80 -d webserver
# podman container checkpoint -l --export=dump.tar
# podman container restore -p 5432:8080 --import=dump.tar
```

Start a container with the name "foobar-1". Create a checkpoint image "foobar-checkpoint". Restore the container from the checkpoint image with a different name.

```
# podman run --name foobar-1 -d webserver
# podman container checkpoint --create-image foobar-checkpoint foobar-1
# podman inspect foobar-checkpoint
# podman container restore --name foobar-2 foobar-checkpoint
# podman container restore --name foobar-3 foobar-checkpoint
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-container-checkpoint(1)](commands/podman-container/podman-container-checkpoint.md)**, **[podman-run(1)](commands/podman-run.md)**, **[podman-pod-create(1)](commands/podman-pod/podman-pod-create.md)**, **criu(8)**

## HISTORY

September 2018, Originally compiled by Adrian Reber <areber@redhat.com>
