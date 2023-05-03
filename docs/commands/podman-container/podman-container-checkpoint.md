% podman-container-checkpoint 1

## NAME

podman\-container\-checkpoint - Checkpoints one or more running containers

## SYNOPSIS

**podman container checkpoint** [*options*] _container_ [*container* ...]

## DESCRIPTION

**podman container checkpoint** checkpoints all the processes in one or more _containers_. A _container_ can be restored from a checkpoint with **[podman-container-restore](commands/podman-container/podman-container-restore.md)**. The _container IDs_ or _names_ are used as input.

_IMPORTANT: If the container is using **systemd** as **entrypoint** checkpointing the container might not be possible._

## OPTIONS

#### **--all**, **-a**

Checkpoint all running _containers_.\
The default is **false**.\
_IMPORTANT: This OPTION does not need a container name or ID as input argument._

#### **--compress**, **-c**=**zstd** | _none_ | _gzip_

Specify the compression algorithm used for the checkpoint archive created
with the **--export, -e** OPTION. Possible algorithms are **zstd**, _none_
and _gzip_.\
One possible reason to use _none_ is to enable faster creation of checkpoint
archives. Not compressing the checkpoint archive can result in faster checkpoint
archive creation.\
The default is **zstd**.

#### **--create-image**=_image_

Create a checkpoint image from a running container. This is a standard OCI image
created in the local image store. It consists of a single layer that contains
all of the checkpoint files. The content of this image layer is in the same format as a
checkpoint created with **--export**. A checkpoint image can be pushed to a
standard container registry and pulled on a different system to enable container
migration. In addition, the image can be exported with **podman image save** and
inspected with **podman inspect**. Inspecting a checkpoint image would display
additional information, stored as annotations, about the host environment used
to do the checkpoint:

- **io.podman.annotations.checkpoint.name**: Human-readable name of the original
  container.

- **io.podman.annotations.checkpoint.rawImageName**: Unprocessed name of the
  image used to create the original container (as specified by the user).

- **io.podman.annotations.checkpoint.rootfsImageID**: ID of the image used to
  create the original container.

- **io.podman.annotations.checkpoint.rootfsImageName**: Image name used to
  create the original container.

- **io.podman.annotations.checkpoint.podman.version**: Version of Podman used to
  create the checkpoint.

- **io.podman.annotations.checkpoint.criu.version**: Version of CRIU used to
  create the checkpoint.

- **io.podman.annotations.checkpoint.runtime.name**: Container runtime (e.g.,
  runc, crun) used to create the checkpoint.

- **io.podman.annotations.checkpoint.runtime.version**: Version of the container
  runtime used to create the checkpoint.

- **io.podman.annotations.checkpoint.conmon.version**: Version of conmon used
  with the original container.

- **io.podman.annotations.checkpoint.host.arch**: CPU architecture of the host
  on which the checkpoint was created.

- **io.podman.annotations.checkpoint.host.kernel**: Version of Linux kernel
  of the host where the checkpoint was created.

- **io.podman.annotations.checkpoint.cgroups.version**: cgroup version used by
  the host where the checkpoint was created.

- **io.podman.annotations.checkpoint.distribution.version**: Version of host
  distribution on which the checkpoint was created.

- **io.podman.annotations.checkpoint.distribution.name**: Name of host
  distribution on which the checkpoint was created.

#### **--export**, **-e**=_archive_

Export the checkpoint to a tar.gz file. The exported checkpoint can be used
to import the _container_ on another system and thus enabling container live
migration. This checkpoint archive also includes all changes to the _container's_
root file-system, if not explicitly disabled using **--ignore-rootfs**.

#### **--file-locks**

Checkpoint a _container_ with file locks. If an application running in the container
is using file locks, this OPTION is required during checkpoint and restore. Otherwise
checkpointing _containers_ with file locks is expected to fail. If file locks are not
used, this option is ignored.\
The default is **false**.

#### **--ignore-rootfs**

If a checkpoint is exported to a tar.gz file it is possible with the help of **--ignore-rootfs** to explicitly disable including changes to the root file-system into the checkpoint archive file.\
The default is **false**.\
_IMPORTANT: This OPTION only works in combination with **--export, -e**._

#### **--ignore-volumes**

This OPTION must be used in combination with the **--export, -e** OPTION.
When this OPTION is specified, the content of volumes associated with
the _container_ will not be included into the checkpoint tar.gz file.\
The default is **false**.

#### **--keep**, **-k**

Keep all temporary log and statistics files created by CRIU during checkpointing. These files are not deleted if checkpointing fails for further debugging. If checkpointing succeeds these files are theoretically not needed, but if these files are needed Podman can keep the files for further analysis.\
The default is **false**.

#### **--latest**, **-l**

Instead of providing the _container ID_ or _name_, use the last created _container_. If other methods than Podman are used to run _containers_ such as `CRI-O`, the last started _container_ could be from either of those methods.\
The default is **false**.\
_IMPORTANT: This OPTION is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines. This OPTION does not need a container name or ID as input argument._

#### **--leave-running**, **-R**

Leave the _container_ running after checkpointing instead of stopping it.\
The default is **false**.

#### **--pre-checkpoint**, **-P**

Dump the _container's_ memory information only, leaving the _container_ running. Later
operations will supersede prior dumps. It only works on `runc 1.0-rc3` or `higher`.\
The default is **false**.

The functionality to only checkpoint the memory of the container and in a second
checkpoint only write out the memory pages which have changed since the first
checkpoint relies on the Linux kernel's soft-dirty bit, which is not available
on all systems as it depends on the system architecture and the configuration
of the Linux kernel. Podman will verify if the current system supports this
functionality and return an error if the current system does not support it.

#### **--print-stats**

Print out statistics about checkpointing the container(s). The output is
rendered in a JSON array and contains information about how much time different
checkpoint operations required. Many of the checkpoint statistics are created
by CRIU and just passed through to Podman. The following information is provided
in the JSON array:

- **podman_checkpoint_duration**: Overall time (in microseconds) needed to create
  all checkpoints.

- **runtime_checkpoint_duration**: Time (in microseconds) the container runtime
  needed to create the checkpoint.

- **freezing_time**: Time (in microseconds) CRIU needed to pause (freeze) all
  processes in the container (measured by CRIU).

- **frozen_time**: Time (in microseconds) all processes in the container were
  paused (measured by CRIU).

- **memdump_time**: Time (in microseconds) needed to extract all required memory
  pages from all container processes (measured by CRIU).

- **memwrite_time**: Time (in microseconds) needed to write all required memory
  pages to the corresponding checkpoint image files (measured by CRIU).

- **pages_scanned**: Number of memory pages scanned to determine if they need
  to be checkpointed (measured by CRIU).

- **pages_written**: Number of memory pages actually written to the checkpoint
  image files (measured by CRIU).

The default is **false**.

#### **--tcp-established**

Checkpoint a _container_ with established TCP connections. If the checkpoint
image contains established TCP connections, this OPTION is required during
restore. Defaults to not checkpointing _containers_ with established TCP
connections.\
The default is **false**.

#### **--with-previous**

Check out the _container_ with previous criu image files in pre-dump. It only works on `runc 1.0-rc3` or `higher`.\
The default is **false**.\
_IMPORTANT: This OPTION is not available with **--pre-checkpoint**_.

This option requires that the option **--pre-checkpoint** has been used before on the
same container. Without an existing pre-checkpoint, this option will fail.

Also see **--pre-checkpoint** for additional information about **--pre-checkpoint**
availability on different systems.

## EXAMPLES

Make a checkpoint for the container "mywebserver".

```
# podman container checkpoint mywebserver
```

Create a checkpoint image for the container "mywebserver".

```
# podman container checkpoint --create-image mywebserver-checkpoint-1 mywebserver
```

Dumps the container's memory information of the latest container into an archive.

```
# podman container checkpoint -P -e pre-checkpoint.tar.gz -l
```

Keep the container's memory information from an older dump and add the new container's memory information.

```
# podman container checkpoint --with-previous -e checkpoint.tar.gz -l
```

Dump the container's memory information of the latest container into an archive with the specified compress method.

```
# podman container checkpoint -l --compress=none --export=dump.tar
# podman container checkpoint -l --compress=gzip --export=dump.tar.gz
```

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-container-restore(1)](commands/podman-container/podman-container-restore.md)**, **criu(8)**

## HISTORY

September 2018, Originally compiled by Adrian Reber <areber@redhat.com>
