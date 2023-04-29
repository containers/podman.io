% podman-secret-inspect 1

## NAME

podman\-secret\-inspect - Display detailed information on one or more secrets

## SYNOPSIS

**podman secret inspect** [*options*] _secret_ [...]

## DESCRIPTION

Inspects the specified secret.

By default, this renders all results in a JSON array. If a format is specified, the given template will be executed for each result.
Secrets can be queried individually by providing their full name or a unique partial name.

## OPTIONS

#### **--format**, **-f**=_format_

Format secret output using Go template.

| **Placeholder**          | **Description**                                                   |
| ------------------------ | ----------------------------------------------------------------- |
| .CreatedAt               | When secret was created (relative timestamp, human-readable)      |
| .ID                      | ID of secret                                                      |
| .Spec ...                | Details of secret                                                 |
| .Spec.Driver             | Driver info                                                       |
| .Spec.Driver.Name        | Driver name (string)                                              |
| .Spec.Driver.Options ... | Driver options (map of driver-specific options)                   |
| .Spec.Labels             | Labels for this secret                                            |
| .Spec.Name               | Name of secret                                                    |
| .UpdatedAt               | When secret was last updated (relative timestamp, human-readable) |

#### **--help**

Print usage statement.

#### **--pretty**

Print inspect output in human-readable format

## EXAMPLES

```
$ podman secret inspect mysecret
$ podman secret inspect --format "{{.Name} {{.Scope}}" mysecret
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-secret(1)](podman-secret/podman-secret.md)**

## HISTORY

January 2021, Originally compiled by Ashley Cui <acui@redhat.com>
