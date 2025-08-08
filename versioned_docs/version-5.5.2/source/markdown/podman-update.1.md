---
title: podman-update
version: v5.5.2
---

% podman-update 1

## NAME
podman\-update - Update the configuration of a given container

## SYNOPSIS
**podman update** [*options*] *container*

**podman container update** [*options*] *container*

## DESCRIPTION

Updates the configuration of an existing container, allowing changes to resource limits and healthchecks.

## OPTIONS


[//]: # (BEGIN included file options/blkio-weight.md)
#### **--blkio-weight**=*weight*

Block IO relative weight. The _weight_ is a value between **10** and **1000**.

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/blkio-weight.md)


[//]: # (BEGIN included file options/blkio-weight-device.md)
#### **--blkio-weight-device**=*device:weight*

Block IO relative device weight.

[//]: # (END   included file options/blkio-weight-device.md)


[//]: # (BEGIN included file options/cpu-period.md)
#### **--cpu-period**=*limit*

Set the CPU period for the Completely Fair Scheduler (CFS), which is a
duration in microseconds. Once the container's CPU quota is used up, it will not
be scheduled to run until the current period ends. Defaults to 100000
microseconds.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpu-period.md)


[//]: # (BEGIN included file options/cpu-quota.md)
#### **--cpu-quota**=*limit*

Limit the CPU Completely Fair Scheduler (CFS) quota.

Limit the container's CPU usage. By default, containers run with the full
CPU resource. The limit is a number in microseconds. If a number is provided,
the container is allowed to use that much CPU time until the CPU period
ends (controllable via **--cpu-period**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpu-quota.md)


[//]: # (BEGIN included file options/cpu-rt-period.md)
#### **--cpu-rt-period**=*microseconds*

Limit the CPU real-time period in microseconds.

Limit the container's Real Time CPU usage. This option tells the kernel to restrict the container's Real Time CPU usage to the period specified.

This option is only supported on cgroups V1 rootful systems.

[//]: # (END   included file options/cpu-rt-period.md)


[//]: # (BEGIN included file options/cpu-rt-runtime.md)
#### **--cpu-rt-runtime**=*microseconds*

Limit the CPU real-time runtime in microseconds.

Limit the containers Real Time CPU usage. This option tells the kernel to limit the amount of time in a given CPU period Real Time tasks may consume. Ex:
Period of 1,000,000us and Runtime of 950,000us means that this container can consume 95% of available CPU and leave the remaining 5% to normal priority tasks.

The sum of all runtimes across containers cannot exceed the amount allotted to the parent cgroup.

This option is only supported on cgroups V1 rootful systems.

[//]: # (END   included file options/cpu-rt-runtime.md)


[//]: # (BEGIN included file options/cpu-shares.md)
#### **--cpu-shares**, **-c**=*shares*

CPU shares (relative weight).

By default, all containers get the same proportion of CPU cycles. This
proportion can be modified by changing the container's CPU share weighting
relative to the combined weight of all the running containers.
Default weight is **1024**.

The proportion only applies when CPU-intensive processes are running.
When tasks in one container are idle, other containers can use the
left-over CPU time. The actual amount of CPU time varies depending on
the number of containers running on the system.

For example, consider three containers, one has a cpu-share of 1024 and
two others have a cpu-share setting of 512. When processes in all three
containers attempt to use 100% of CPU, the first container receives
50% of the total CPU time. If a fourth container is added with a cpu-share
of 1024, the first container only gets 33% of the CPU. The remaining containers
receive 16.5%, 16.5% and 33% of the CPU.

On a multi-core system, the shares of CPU time are distributed over all CPU
cores. Even if a container is limited to less than 100% of CPU time, it can
use 100% of each individual CPU core.

For example, consider a system with more than three cores.
If the container _C0_ is started with **--cpu-shares=512** running one process,
and another container _C1_ with **--cpu-shares=1024** running two processes,
this can result in the following division of CPU shares:

| PID  |  container  | CPU     | CPU share    |
| ---- | ----------- | ------- | ------------ |
| 100  |  C0         | 0       | 100% of CPU0 |
| 101  |  C1         | 1       | 100% of CPU1 |
| 102  |  C1         | 2       | 100% of CPU2 |

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpu-shares.md)


[//]: # (BEGIN included file options/cpus.container.md)
#### **--cpus**=*number*

Number of CPUs. The default is *0.0* which means no limit. This is shorthand
for **--cpu-period** and **--cpu-quota**, therefore the option cannot be specified with
**--cpu-period** or **--cpu-quota**.

On some systems, changing the CPU limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpus.container.md)


[//]: # (BEGIN included file options/cpuset-cpus.md)
#### **--cpuset-cpus**=*number*

CPUs in which to allow execution. Can be specified as a comma-separated list
(e.g. **0,1**), as a range (e.g. **0-3**), or any combination thereof
(e.g. **0-3,7,11-15**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpuset-cpus.md)


[//]: # (BEGIN included file options/cpuset-mems.md)
#### **--cpuset-mems**=*nodes*

Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on
NUMA systems.

If there are four memory nodes on the system (0-3), use **--cpuset-mems=0,1**
then processes in the container only uses memory from the first
two memory nodes.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/cpuset-mems.md)


[//]: # (BEGIN included file options/device-read-bps.md)
#### **--device-read-bps**=*path:rate*

Limit read rate (in bytes per second) from a device (e.g. **--device-read-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-read-bps.md)


[//]: # (BEGIN included file options/device-read-iops.md)
#### **--device-read-iops**=*path:rate*

Limit read rate (in IO operations per second) from a device (e.g. **--device-read-iops=/dev/sda:1000**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-read-iops.md)


[//]: # (BEGIN included file options/device-write-bps.md)
#### **--device-write-bps**=*path:rate*

Limit write rate (in bytes per second) to a device (e.g. **--device-write-bps=/dev/sda:1mb**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-write-bps.md)


[//]: # (BEGIN included file options/device-write-iops.md)
#### **--device-write-iops**=*path:rate*

Limit write rate (in IO operations per second) to a device (e.g. **--device-write-iops=/dev/sda:1000**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/device-write-iops.md)


[//]: # (BEGIN included file options/env.update.md)
#### **--env**, **-e**=*env*

Add a value (e.g. env=*value*) to the container. Can be used multiple times.
If the value already exists in the container, it is overridden.
To remove an environment variable from the container, use the `--unsetenv`
option.

Note that the env updates only affect the main container process after
the next start.

[//]: # (END   included file options/env.update.md)


[//]: # (BEGIN included file options/health-cmd.md)
#### **--health-cmd**=*"command"* | *'["command", "arg1", ...]'*

Set or alter a healthcheck command for a container. The command is a command to be executed inside the
container that determines the container health. The command is required for other healthcheck options
to be applied. A value of **none** disables existing healthchecks.

Multiple options can be passed in the form of a JSON array; otherwise, the command is interpreted
as an argument to **/bin/sh -c**.

Note: The default values are used even if healthcheck is configured in the image.

[//]: # (END   included file options/health-cmd.md)


[//]: # (BEGIN included file options/health-interval.md)
#### **--health-interval**=*interval*

Set an interval for the healthchecks. An _interval_ of **disable** results in no automatic timer setup. The default is **30s**.

Note: This parameter will overwrite related healthcheck configuration from the image.

[//]: # (END   included file options/health-interval.md)

Changing this setting resets the timer.


[//]: # (BEGIN included file options/health-log-destination.md)
#### **--health-log-destination**=*directory_path*

Set the destination of the HealthCheck log. Directory path, local or events_logger (local use container state file) (Default: local)

* `local`: (default) HealthCheck logs are stored in overlay containers. (For example: `$runroot/healthcheck.log`)
* `directory`: creates a log file named `<container-ID>-healthcheck.log` with HealthCheck logs in the specified directory.
* `events_logger`: The log will be written with logging mechanism set by events_logger. It also saves the log to a default directory, for performance on a system with a large number of logs.

[//]: # (END   included file options/health-log-destination.md)

Warning: Changing this setting may cause the loss of previous logs.


[//]: # (BEGIN included file options/health-max-log-count.md)
#### **--health-max-log-count**=*number of stored logs*

Set maximum number of attempts in the HealthCheck log file. ('0' value means an infinite number of attempts in the log file) (Default: 5 attempts)

[//]: # (END   included file options/health-max-log-count.md)


[//]: # (BEGIN included file options/health-max-log-size.md)
#### **--health-max-log-size**=*size of stored logs*

Set maximum length in characters of stored HealthCheck log. ("0" value means an infinite log length) (Default: 500 characters)

[//]: # (END   included file options/health-max-log-size.md)


[//]: # (BEGIN included file options/health-on-failure.md)
#### **--health-on-failure**=*action*

Action to take once the container transitions to an unhealthy state.  The default is **none**.

- **none**: Take no action.
- **kill**: Kill the container.
- **restart**: Restart the container.  Do not combine the `restart` action with the `--restart` flag.  When running inside of a systemd unit, consider using the `kill` or `stop` action instead to make use of systemd's restart policy.
- **stop**: Stop the container.

[//]: # (END   included file options/health-on-failure.md)


[//]: # (BEGIN included file options/health-retries.md)
#### **--health-retries**=*retries*

The number of retries allowed before a healthcheck is considered to be unhealthy. The default value is **3**.

Note: This parameter can overwrite the healthcheck configuration from the image.

[//]: # (END   included file options/health-retries.md)


[//]: # (BEGIN included file options/health-start-period.md)
#### **--health-start-period**=*period*

The initialization time needed for a container to bootstrap. The value can be expressed in time format like
**2m3s**. The default value is **0s**.

Note: The health check command is executed as soon as a container is started, if the health check is successful
the container's health state will be updated to `healthy`. However, if the health check fails, the health state will
stay as `starting` until either the health check is successful or until the `--health-start-period` time is over. If the
health check command fails after the `--health-start-period` time is over, the health state will be updated to `unhealthy`.
The health check command is executed periodically based on the value of `--health-interval`.

Note: This parameter will overwrite related healthcheck configuration from the image.

[//]: # (END   included file options/health-start-period.md)


[//]: # (BEGIN included file options/health-startup-cmd.md)
#### **--health-startup-cmd**=*"command"* | *'["command", "arg1", ...]'*

Set a startup healthcheck command for a container. This command is executed inside the container and is used to gate the regular
healthcheck. When the startup command succeeds, the regular healthcheck begins and the startup healthcheck ceases. Optionally,
if the command fails for a set number of attempts, the container is restarted. A startup healthcheck can be used to ensure that
containers with an extended startup period are not marked as unhealthy until they are fully started. Startup healthchecks can only be
used when a regular healthcheck (from the container's image or the **--health-cmd** option) is also set.

[//]: # (END   included file options/health-startup-cmd.md)


[//]: # (BEGIN included file options/health-startup-interval.md)
#### **--health-startup-interval**=*interval*

Set an interval for the startup healthcheck. An _interval_ of **disable** results in no automatic timer setup. The default is **30s**.

[//]: # (END   included file options/health-startup-interval.md)

Changing this setting resets the timer, depending on the state of the container.


[//]: # (BEGIN included file options/health-startup-retries.md)
#### **--health-startup-retries**=*retries*

The number of attempts allowed before the startup healthcheck restarts the container. If set to **0**, the container is never restarted. The default is **0**.

[//]: # (END   included file options/health-startup-retries.md)


[//]: # (BEGIN included file options/health-startup-success.md)
#### **--health-startup-success**=*retries*

The number of successful runs required before the startup healthcheck succeeds and the regular healthcheck begins. A value
of **0** means that any success begins the regular healthcheck. The default is **0**.

[//]: # (END   included file options/health-startup-success.md)


[//]: # (BEGIN included file options/health-startup-timeout.md)
#### **--health-startup-timeout**=*timeout*

The maximum time a startup healthcheck command has to complete before it is marked as failed. The value can be expressed in a time
format like **2m3s**. The default value is **30s**.

[//]: # (END   included file options/health-startup-timeout.md)


[//]: # (BEGIN included file options/health-timeout.md)
#### **--health-timeout**=*timeout*

The maximum time allowed to complete the healthcheck before an interval is considered failed. Like start-period, the
value can be expressed in a time format such as **1m22s**. The default value is **30s**.

Note: A timeout marks the healthcheck as failed but does not terminate the running process.
This ensures that a slow but eventually successful healthcheck does not disrupt the container
but is still accounted for in the health status.

Note: This parameter will overwrite related healthcheck configuration from the image.

[//]: # (END   included file options/health-timeout.md)


[//]: # (BEGIN included file options/memory.md)
#### **--memory**, **-m**=*number[unit]*

Memory limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Allows the memory available to a container to be constrained. If the host
supports swap memory, then the **-m** memory setting can be larger than physical
RAM. If a limit of 0 is specified (not using **-m**), the container's memory is
not limited. The actual limit may be rounded up to a multiple of the operating
system's page size (the value is very large, that's millions of trillions).

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/memory.md)


[//]: # (BEGIN included file options/memory-reservation.md)
#### **--memory-reservation**=*number[unit]*

Memory soft limit. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

After setting memory reservation, when the system detects memory contention
or low memory, containers are forced to restrict their consumption to their
reservation. So always set the value below **--memory**, otherwise the
hard limit takes precedence. By default, memory reservation is the same
as memory limit.

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/memory-reservation.md)


[//]: # (BEGIN included file options/memory-swap.md)
#### **--memory-swap**=*number[unit]*

A limit value equal to memory plus swap.
A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).

Must be used with the **-m** (**--memory**) flag.
The argument value must be larger than that of
 **-m** (**--memory**) By default, it is set to double
the value of **--memory**.

Set _number_ to **-1** to enable unlimited swap.

This option is not supported on cgroups V1 rootless systems.

[//]: # (END   included file options/memory-swap.md)


[//]: # (BEGIN included file options/memory-swappiness.md)
#### **--memory-swappiness**=*number*

Tune a container's memory swappiness behavior. Accepts an integer between *0* and *100*.

This flag is only supported on cgroups V1 rootful systems.

[//]: # (END   included file options/memory-swappiness.md)


[//]: # (BEGIN included file options/no-healthcheck.md)
#### **--no-healthcheck**

Disable any defined healthchecks for container.

[//]: # (END   included file options/no-healthcheck.md)


[//]: # (BEGIN included file options/pids-limit.md)
#### **--pids-limit**=*limit*

Tune the container's pids limit. Set to **-1** to have unlimited pids for the container. The default is **2048** on systems that support "pids" cgroup controller.

[//]: # (END   included file options/pids-limit.md)


[//]: # (BEGIN included file options/restart.md)
#### **--restart**=*policy*

Restart policy to follow when containers exit.
Restart policy does not take effect if a container is stopped via the **podman kill** or **podman stop** commands.

Valid _policy_ values are:

- `no`                       : Do not restart containers on exit
- `never`                    : Synonym for **no**; do not restart containers on exit
- `on-failure[\:max_retries]` : Restart containers when they exit with a non-zero exit code, retrying indefinitely or until the optional *max_retries* count is hit
- `always`                   : Restart containers when they exit, regardless of status, retrying indefinitely
- `unless-stopped`           : Identical to **always**

Podman provides a systemd unit file, podman-restart.service, which restarts containers after a system reboot.

When running containers in systemd services, use the restart functionality provided by systemd.
In other words, do not use this option in a container unit, instead set the `Restart=` systemd directive in the `[Service]` section.
See **podman-systemd.unit**(5) and **systemd.service**(5).

[//]: # (END   included file options/restart.md)


[//]: # (BEGIN included file options/unsetenv.update.md)
#### **--unsetenv**=*env*

Unset environment variables from the container.

Note that the env updates only affect the main container process after
the next start.

[//]: # (END   included file options/unsetenv.update.md)


## EXAMPLEs

Update a container with a new cpu quota and period.
```
podman update --cpus=5 myCtr
```

Update a container with all available options for cgroups v2.
```
podman update --cpus 5 --cpuset-cpus 0 --cpu-shares 123 --cpuset-mems 0 --memory 1G --memory-swap 2G --memory-reservation 2G --blkio-weight-device /dev/zero:123 --blkio-weight 123 --device-read-bps /dev/zero:10mb --device-write-bps /dev/zero:10mb --device-read-iops /dev/zero:1000 --device-write-iops /dev/zero:1000 --pids-limit 123 ctrID
```

Update a container with all available options for cgroups v1.
```
podman update --cpus 5 --cpuset-cpus 0 --cpu-shares 123 --cpuset-mems 0 --memory 1G --memory-swap 2G --memory-reservation 2G --memory-swappiness 50 --pids-limit 123 ctrID
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-create(1)](podman-create.1.md)**, **[podman-run(1)](podman-run.1.md)**

## HISTORY
August 2022, Originally written by Charlie Doern <cdoern@redhat.com>
