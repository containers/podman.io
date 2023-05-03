% podman-machine-list 1

## NAME

podman\-machine\-list - List virtual machines

## SYNOPSIS

**podman machine list** [*options*]

**podman machine ls** [*options*]

## DESCRIPTION

List Podman managed virtual machines.

Podman on MacOS and Windows requires a virtual machine. This is because containers are Linux -
containers do not run on any other OS because containers' core functionality are
tied to the Linux kernel. Podman machine must be used to manage MacOS and Windows machines,
but can be optionally used on Linux.

Rootless only.

NOTE: The podman-machine configuration file is managed under the
`$XDG_CONFIG_HOME/containers/podman/machine/` directory. Changing the `$XDG_CONFIG_HOME`
environment variable while the machines are running can lead to unexpected behavior.
(see [podman(1)](podman.md))

## OPTIONS

#### **--format**=_format_

Change the default output format. This can be of a supported type like 'json'
or a Go template.
Valid placeholders for the Go template are listed below:

| **Placeholder**     | **Description**                           |
| ------------------- | ----------------------------------------- |
| .CPUs               | Number of CPUs                            |
| .Created            | Time since VM creation                    |
| .Default            | Is default machine                        |
| .DiskSize           | Disk size of machine                      |
| .IdentityPath       | Path to ssh identity file                 |
| .LastUp             | Time machine was last up                  |
| .LastUp             | Time since the VM was last run            |
| .Memory             | Allocated memory for machine              |
| .Name               | VM name                                   |
| .Port               | SSH Port to use to connect to VM          |
| .RemoteUsername     | VM Username for rootless Podman           |
| .Running            | Is machine running                        |
| .Stream             | Stream name                               |
| .UserModeNetworking | Whether machine uses user-mode networking |
| .VMType             | VM type                                   |

#### **--help**

Print usage statement.

@@option noheading

#### **--quiet**, **-q**

Only print the name of the machine. This also implies no table heading
is printed.

## EXAMPLES

```
$ podman machine list
NAME                    VM TYPE     CREATED      LAST UP      CPUS        MEMORY      DISK SIZE
podman-machine-default  qemu        2 weeks ago  2 weeks ago  1           247GB     10.74GB

$ podman machine ls --format "table {{.Name}}\t{{.VMType}}\t{{.Created}}\t{{.LastUp}}"
NAME                    VM TYPE     CREATED      LAST UP
podman-machine-default  qemu        2 weeks ago  2 weeks ago

$ podman machine ls --format json
[
    {
        "Name": "podman-machine-default",
        "Default": false,
        "Created": "2021-12-27T10:36:14.373347492-05:00",
        "Running": false,
        "LastUp": "2021-12-27T11:22:507333371-05:00",
        "Stream": "default",
        "VMType": "qemu",
        "CPUs": 1,
        "Memory": "2147483648",
        "DiskSize": "10737418240"
    }
]
```

## SEE ALSO

**[podman(1)](podman.md)**, **[podman-machine(1)](commands/podman-machine/podman-machine.md)**

## HISTORY

March 2021, Originally compiled by Ashley Cui <acui@redhat.com>
