% podman-kill

## NAME

podman\-kill - Kill the main process in one or more containers

## SYNOPSIS

**podman kill** [*options*] [*container* ...]

**podman container kill** [*options*] [*container* ...]

## DESCRIPTION

The main process inside each container specified will be sent SIGKILL, or any signal specified with option --signal.

## OPTIONS

#### **--all**, **-a**

Signal all running and paused containers.

@@option cidfile.read

@@option latest

@@option signal

## EXAMPLE

Kill container with a given name

```
podman kill mywebserver
```

Kill container with a given ID

```
podman kill 860a4b23
```

Terminate container by sending `TERM` signal

```
podman kill --signal TERM 860a4b23
```

Kill the latest container created by Podman

```
podman kill --latest
```

Terminate all containers by sending `KILL` signal

```
podman kill --signal KILL -a
```

Kill container using ID specified in a given files

```
podman kill --cidfile /home/user/cidfile
podman kill --cidfile /home/user/cidfile --cidfile ./cidfile-2
```

## SEE ALSO

**[podman](podman.md)**, **[podman-stop](podman-stop.md)**

## HISTORY

September 27, Originally compiled by Brent Baude <bbaude@redhat.com>
