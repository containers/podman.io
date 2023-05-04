% podman-pod-ps 1

## NAME

podman\-pod\-ps - Prints out information about pods

## SYNOPSIS

**podman pod ps** [*options*]

## DESCRIPTION

**podman pod ps** lists the pods on the system.
By default it lists:

- pod ID
- pod name
- the time the pod was created
- number of containers attached to pod
- container ID of the pod infra container
- status of pod as defined by the following table

| **Status** | **Description**                                 |
| ---------- | ----------------------------------------------- |
| Created    | No containers running nor stopped               |
| Running    | at least one container is running               |
| Stopped    | At least one container stopped and none running |
| Exited     | All containers stopped in pod                   |
| Dead       | Error retrieving state                          |

## OPTIONS

#### **--ctr-ids**

Display the container IDs

#### **--ctr-names**

Display the container names

#### **--ctr-status**

Display the container statuses

#### **--filter**, **-f**=_filter_

Provide filter values.

The _filters_ argument format is of `key=value`. If there is more than one _filter_, then pass multiple OPTIONS: **--filter** _foo=bar_ **--filter** _bif=baz_.

Supported filters:

| Filter       | Description                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------ |
| _ctr-ids_    | Filter by container ID within the pod.                                                           |
| _ctr-names_  | Filter by container name within the pod.                                                         |
| _ctr-number_ | Filter by number of containers in the pod.                                                       |
| _ctr-status_ | Filter by container status within the pod.                                                       |
| _id_         | Filter by pod ID.                                                                                |
| _label_      | Filter by container with (or without, in the case of label!=[...] is used) the specified labels. |
| _name_       | Filter by pod name.                                                                              |
| _network_    | Filter by network name or full ID of network.                                                    |
| _status_     | Filter by pod status.                                                                            |
| _until_      | Filter by pods created before given timestamp.                                                   |

The `ctr-ids`, `ctr-names`, `id`, `name` filters accept `regex` format.

The `ctr-status` filter accepts values: `created`, `running`, `paused`, `stopped`, `exited`, `unknown`.

The `label` _filter_ accepts two formats. One is the `label`=_key_ or `label`=_key_=_value_, which removes containers with the specified labels. The other format is the `label!`=_key_ or `label!`=_key_=_value_, which removes containers without the specified labels.

The `until` _filter_ can be Unix timestamps, date formatted timestamps, or Go duration strings (e.g. 10m, 1h30m) computed relative to the machine’s time.

The `status` filter accepts values: `stopped`, `running`, `paused`, `exited`, `dead`, `created`, `degraded`.

#### **--format**=_format_

Pretty-print containers to JSON or using a Go template

Valid placeholders for the Go template are listed below:

| **Placeholder**     | **Description**                                    |
| ------------------- | -------------------------------------------------- |
| .Cgroup             | Cgroup path of pod                                 |
| .ContainerIds       | Comma-separated list of container IDs in the pod   |
| .ContainerNames     | Comma-separated list of container names in the pod |
| .ContainerStatuses  | Comma-separated list of container statuses         |
| .Created            | Creation time of pod                               |
| .ID                 | Container ID                                       |
| .InfraID            | Pod infra container ID                             |
| .Labels             | All the labels assigned to the pod                 |
| .Name               | Name of pod                                        |
| .Networks           | Show all networks connected to the infra container |
| .NumberOfContainers | Show the number of containers attached to pod      |
| .Status             | Status of pod                                      |

#### **--help**, **-h**

Print usage statement

#### **--latest**, **-l**

Show the latest pod created (all states) (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

#### **--namespace**, **--ns**

Display namespace information of the pod

#### **--no-trunc**

Do not truncate the output (default _false_).

@@option noheading

#### **--quiet**, **-q**

Print the numeric IDs of the pods only

#### **--sort**

Sort by created, ID, name, status, or number of containers

Default: created

## EXAMPLES

```
$ podman pod ps
POD ID         NAME              STATUS    CREATED          INFRA ID       # OF CONTAINERS
00dfd6fa02c0   jolly_goldstine   Running   31 hours ago     ba465ab0a3a4   1
f4df8692e116   nifty_torvalds    Created   10 minutes ago   331693bff40a   2
```

```
$ podman pod ps --ctr-names
POD ID         NAME              STATUS    CREATED          INFRA ID       NAMES
00dfd6fa02c0   jolly_goldstine   Running   31 hours ago     ba465ab0a3a4   loving_archimedes
f4df8692e116   nifty_torvalds    Created   10 minutes ago   331693bff40a   thirsty_hawking,wizardly_golick
```

```
$ podman pod ps --ctr-status --ctr-names --ctr-ids
POD ID         NAME              STATUS    CREATED          INFRA ID       IDS                         NAMES                             STATUS
00dfd6fa02c0   jolly_goldstine   Running   31 hours ago     ba465ab0a3a4   ba465ab0a3a4                loving_archimedes                 running
f4df8692e116   nifty_torvalds    Created   10 minutes ago   331693bff40a   331693bff40a,8e428daeb89e   thirsty_hawking,wizardly_golick   configured,configured
```

```
$ podman pod ps --format "{{.ID}}  {{.ContainerNames}}  {{.Cgroup}}"
00dfd6fa02c0   loving_archimedes   /libpod_parent
f4df8692e116   thirsty_hawking,wizardly_golick   /libpod_parent
```

```
$ podman pod ps --sort id --filter ctr-number=2
POD ID         NAME             STATUS    CREATED          INFRA ID       # OF CONTAINERS
f4df8692e116   nifty_torvalds   Created   10 minutes ago   331693bff40a   2
```

```
$ podman pod ps  --ctr-ids
POD ID         NAME              STATUS    CREATED          INFRA ID       IDS
00dfd6fa02c0   jolly_goldstine   Running   31 hours ago     ba465ab0a3a4   ba465ab0a3a4
f4df8692e116   nifty_torvalds    Created   10 minutes ago   331693bff40a   331693bff40a,8e428daeb89e
```

```
$ podman pod ps --no-trunc --ctr-ids
POD ID                                                             NAME              STATUS    CREATED          INFRA ID                                                           IDS
00dfd6fa02c0a2daaedfdf8fcecd06f22ad114d46d167d71777224735f701866   jolly_goldstine   Running   31 hours ago     ba465ab0a3a4e15e3539a1e79c32d1213a02b0989371e274f98e0f1ae9de7050   ba465ab0a3a4e15e3539a1e79c32d1213a02b0989371e274f98e0f1ae9de7050
f4df8692e116a3e6d1d62572644ed36ca475d933808cc3c93435c45aa139314b   nifty_torvalds    Created   10 minutes ago   331693bff40a926b6d52b184e116afd15497610c378d5d4c42945dd6e33b75b0   331693bff40a926b6d52b184e116afd15497610c378d5d4c42945dd6e33b75b0,8e428daeb89e69b71e7916a13accfb87d122889442b5c05c2d99cf94a3230e9d
```

```
$ podman pod ps --ctr-names
POD ID         NAME   STATUS    CREATED        INFRA ID       NAMES
314f4da82d74   hi     Created   17 hours ago   a9f2d2165675   jovial_jackson,hopeful_archimedes,vibrant_ptolemy,heuristic_jennings,keen_raman,hopeful_newton,mystifying_bose,silly_lalande,serene_lichterman ...
```

## pod ps

Print a list of pods

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-pod(1)](commands/podman-pod/podman-pod.md)**

## HISTORY

July 2018, Originally compiled by Peter Hunt <pehunt@redhat.com>