% podman-secret-exists 1

## NAME

podman\-secret\-exists - Check if the given secret exists

## SYNOPSIS

**podman secret exists** _secret_

## DESCRIPTION

**podman secret exists** checks if a secret exists. Podman will return an exit code
of `0` when the secret is found. A `1` will be returned otherwise. An exit code of
`125` indicates there was another issue.

## OPTIONS

#### **--help**, **-h**

Print usage statement

## EXAMPLE

Check if a secret called `mysecret` exists (the secret does actually exist).

```
$ podman secret exists mysecret
$ echo $?
0
$
```

Check if a secret called `mypassword` exists (the secret does not actually exist).

```
$ podman secret exists mypassword
$ echo $?
1
$
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-secret(1)](commands/podman-secret/podman-secret.md)**

## HISTORY

April 2023, Originally compiled by Ygal Blum `<ygal.blum@gmail.com>`
