% podman-system-connection-list 1

## NAME

podman\-system\-connection\-list - List the destination for the Podman service(s)

## SYNOPSIS

**podman system connection list** [*options*]

**podman system connection ls** [*options*]

## DESCRIPTION

List ssh destination(s) for podman service(s).

## OPTIONS

#### **--format**, **-f**=_format_

Change the default output format. This can be of a supported type like 'json' or a Go template.
Valid placeholders for the Go template listed below:

| **Placeholder** | **Description**                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .Default        | Indicates whether connection is the default                                                                                                                      |
| .Identity       | Path to file containing SSH identity                                                                                                                             |
| .Name           | Connection Name/Identifier                                                                                                                                       |
| .URI            | URI to podman service. Valid schemes are ssh://[user@]_host_[:port]_Unix domain socket_[?secure=True], unix://_Unix domain socket_, and tcp://localhost[:*port*] |

#### **--quiet**, **-q**

Only show connection names

## EXAMPLE

```
$ podman system connection list
Name URI                                                      Identity	    Default
devl ssh://root@example.com:/run/podman/podman.sock           ~/.ssh/id_rsa True
devl ssh://user@example.com:/run/user/1000/podman/podman.sock ~/.ssh/id_rsa False
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-system(1)](commands/podman-system/podman-system.md)**, **[podman-system-connection(1)](commands/podman-system-connection/podman-system-connection.md)**

## HISTORY

July 2020, Originally compiled by Jhon Honce (jhonce at redhat dot com)
