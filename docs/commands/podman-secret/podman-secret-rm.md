% podman-secret-rm 1

## NAME

podman\-secret\-rm - Remove one or more secrets

## SYNOPSIS

**podman secret rm** [*options*] _secret_ [...]

## DESCRIPTION

Removes one or more secrets.

`podman secret rm` is safe to use on secrets that are in use by a container.
The created container will still have access to the secret data because secrets are
copied and mounted into the container when a container is created. If a secret is deleted and
another secret is created with the same name, the secret inside the container will not change;
the old secret value will still remain.

## OPTIONS

#### **--all**, **-a**

Remove all existing secrets.

#### **--help**

Print usage statement.

## EXAMPLES

```
$ podman secret rm mysecret1 mysecret2
```

## SEE ALSO

**[podman(1)](commands/podman.md)**, **[podman-secret(1)](commands/podman-secret/podman-secret.md)**

## HISTORY

January 2021, Originally compiled by Ashley Cui <acui@redhat.com>
