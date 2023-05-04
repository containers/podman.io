####> This option file is used in:
####> podman attach, exec, run, start
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--detach-keys**=_sequence_

Specify the key sequence for detaching a container. Format is a single character `[a-Z]` or one or more `ctrl-<value>` characters where `<value>` is one of: `a-z`, `@`, `^`, `[`, `,` or `_`. Specifying "" will disable this feature. The default is _ctrl-p,ctrl-q_.

This option can also be set in **containers.conf**(5) file.
