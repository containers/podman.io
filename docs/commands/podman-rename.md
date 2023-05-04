% podman-rename 1

## NAME

podman\-rename - Rename an existing container

## SYNOPSIS

**podman rename** _container_ _newname_

**podman container rename** _container_ _newname_

## DESCRIPTION

Rename changes the name of an existing container.
The old name will be freed, and will be available for use.
This command can be run on containers in any state.
However, running containers may not fully receive the effects until they are restarted - for example, a running container may still use the old name in its logs.
At present, only containers are supported; pods and volumes cannot be renamed.

## OPTIONS

## EXAMPLES

Rename container with a given name

```
$ podman rename oldContainer aNewName
```

Rename container with a given ID

```
$ podman rename 717716c00a6b testcontainer
```

Create an alias for container with a given ID

```
$ podman container rename 6e7514b47180 databaseCtr
```

## SEE ALSO

**[podman(1)](podman.md)**
