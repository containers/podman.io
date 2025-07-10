---
title: podman-login
version: v5.5.2
---

% podman-login 1

## NAME
podman\-login - Log in to a container registry

## SYNOPSIS
**podman login** [*options*] [*registry*]

## DESCRIPTION
**podman login** logs into a specified registry server with the correct username
and password. If the registry is not specified, the first registry under [registries.search]
from registries.conf is used. **podman login** reads in the username and password from STDIN.
The username and password can also be set using the **username** and **password** flags.
The path of the authentication file can be specified by the user by setting the **authfile**
flag. The default path for reading and writing credentials is **${XDG\_RUNTIME\_DIR}/containers/auth.json**.
Podman uses existing credentials if the user does not pass in a username.
Podman first searches for the username and password in the **${XDG\_RUNTIME\_DIR}/containers/auth.json**, if they are not valid,
Podman then uses any existing credentials found in **$HOME/.docker/config.json**.
If those credentials are not present, Podman creates **${XDG\_RUNTIME\_DIR}/containers/auth.json** (if the file does not exist) and
then stores the username and password from STDIN as a base64 encoded string in it.
For more details about format and configurations of the auth.json file, see containers-auth.json(5)

**podman [GLOBAL OPTIONS]**

**podman login [GLOBAL OPTIONS]**

**podman login [OPTIONS] [REGISTRY] [GLOBAL OPTIONS]**

## OPTIONS


[//]: # (BEGIN included file options/authfile.md)
#### **--authfile**=*path*

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json` on Linux, and `$HOME/.config/containers/auth.json` on Windows/macOS.
The file is created by **[podman login](podman-login.1.md)**. If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using **docker login**.

Note: There is also the option to override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable. This can be done with **export REGISTRY_AUTH_FILE=_path_**.

[//]: # (END   included file options/authfile.md)


[//]: # (BEGIN included file options/cert-dir.md)
#### **--cert-dir**=*path*

Use certificates at *path* (\*.crt, \*.cert, \*.key) to connect to the registry. (Default: /etc/containers/certs.d)
For details, see **[containers-certs.d(5)](https://github.com/containers/image/blob/main/docs/containers-certs.d.5.md)**.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

[//]: # (END   included file options/cert-dir.md)


[//]: # (BEGIN included file options/compat-auth-file.md)
#### **--compat-auth-file**=*path*

Instead of updating the default credentials file, update the one at *path*, and use a Docker-compatible format.

[//]: # (END   included file options/compat-auth-file.md)

#### **--get-login**

Return the logged-in user for the registry.  Return error if no login is found.

#### **--help**, **-h**

Print usage statement

#### **--password**, **-p**=*password*

Password for registry

#### **--password-stdin**

Take the password from stdin

#### **--secret**=*name*

Read the password for the registry from the podman secret `name`.
If --username is not specified --username=`name` is used.


[//]: # (BEGIN included file options/tls-verify.md)
#### **--tls-verify**

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**

[//]: # (END   included file options/tls-verify.md)

#### **--username**, **-u**=*username*

Username for registry

#### **--verbose**, **-v**

print detailed information about credential store

## EXAMPLES

Add login credentials for specified registry to default authentication file;
note that unlike the `docker` default, the default credentials are under `$XDG_RUNTIME_DIR`
which is a subdirectory of `/run` (an emphemeral directory) and hence do not persist across reboot.

```
$ podman login quay.io
Username: umohnani
Password:
Login Succeeded!
```

To explicitly preserve credentials across reboot, you will need to specify
the default persistent path:

```
$ podman login --authfile ~/.config/containers/auth.json quay.io
Username: umohnani
Password:
Login Succeeded!
```

Add login credentials using specified username and password for local registry to default authentication file.
```
$ podman login -u testuser -p testpassword localhost:5000
Login Succeeded!
```

Add login credentials for alternate authfile path for the specified registry.
```
$ podman login --authfile authdir/myauths.json quay.io
Username: umohnani
Password:
Login Succeeded!
```

Add login credentials using a Podman secret for the password.
```
$ echo -n MySecret! | podman secret create secretname -
a0ad54df3c97cf89d5ca6193c
$ podman login --secret secretname -u testuser quay.io
Login Succeeded!
```

Add login credentials for user test with password test to localhost:5000 registry disabling tls verification requirement.
```
$ podman login --tls-verify=false -u test -p test localhost:5000
Login Succeeded!
```

Add login credentials for user foo with password bar to localhost:5000 registry using the certificate directory /etc/containers/certs.d.
```
$ podman login --cert-dir /etc/containers/certs.d/ -u foo -p bar localhost:5000
Login Succeeded!
```

Add login credentials for specified registries to default authentication file for given user with password information provided via stdin from a file on disk.
```
$ podman login -u testuser  --password-stdin < testpassword.txt docker.io
Login Succeeded!
```

Add login credentials for specified registry to default authentication file for given user with password information provided via stdin from a pipe.
```
$ echo $testpassword | podman login -u testuser --password-stdin quay.io
Login Succeeded!
```

Add login credentials for specified registry to default authentication file in verbose mode.
```
$ podman login quay.io --verbose
Username: myusername
Password:
Used: /run/user/1000/containers/auth.json
Login Succeeded!
```

## SEE ALSO
**[podman(1)](podman.1.md)**, **[podman-logout(1)](podman-logout.1.md)**, **[containers-auth.json(5)](https://github.com/containers/image/blob/main/docs/containers-auth.json.5.md)**, **[containers-certs.d(5)](https://github.com/containers/image/blob/main/docs/containers-certs.d.5.md)**, **[containers-registries.conf(5)](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)**, **[podman-secret(1)](podman-secret.1.md)**, **[podman-secret-create(1)](podman-secret-create.1.md)**

## HISTORY
August 2017, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
