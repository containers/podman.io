---
title: podman-secret-ls
version: v5.5.2
---

% podman-secret-ls 1

## NAME
podman\-secret\-ls - List all available secrets

## SYNOPSIS
**podman secret ls** [*options*]

## DESCRIPTION

Lists all the secrets that exist. The output can be formatted to a Go template using the **--format** option.

## OPTIONS

#### **--filter**, **-f**=*filter=value*

Filter output based on conditions given.
Multiple filters can be given with multiple uses of the --filter option.

Valid filters are listed below:

| **Filter** | **Description**                                                   |
| ---------- | ----------------------------------------------------------------- |
| name       | [Name] Secret name (accepts regex)                                |
| id         | [ID] Full or partial secret ID                                    |

#### **--format**=*format*

Format secret output using Go template.

Valid placeholders for the Go template are listed below:

| **Placeholder**          | **Description**                                                   |
| ------------------------ | ----------------------------------------------------------------- |
| .CreatedAt ...           | When secret was created (relative timestamp, human-readable)      |
| .ID                      | ID of secret                                                      |
| .SecretData              | Secret Data (Displayed only with --showsecret option)		       |
| .Spec ...                | Details of secret                                                 |
| .Spec.Driver ...         | Driver info                                                       |
| .Spec.Driver.Name        | Driver name (string)                                              |
| .Spec.Driver.Options ... | Driver options (map of driver-specific options)                   |
| .Spec.Labels ...         | Labels for this secret                                            |
| .Spec.Name               | Name of secret                                                    |
| .UpdatedAt ...           | When secret was last updated (relative timestamp, human-readable) |


[//]: # (BEGIN included file options/noheading.md)
#### **--noheading**, **-n**

Omit the table headings from the listing.

[//]: # (END   included file options/noheading.md)

#### **--quiet**, **-q**

Print secret IDs only.

## EXAMPLES

List all secrets.
```
$ podman secret ls
```

List the name field of all secrets.
```
$ podman secret ls --format "{{.Name}}"
```

List all secrets whose name includes the specified string.
```
$ podman secret ls --filter name=confidential
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-secret(1)](podman-secret.1.md)**

## HISTORY
January 2021, Originally compiled by Ashley Cui <acui@redhat.com>
