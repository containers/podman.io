####> This option file is used in:
####> podman create, pull, run
####> If file is edited, make sure the changes
####> are applicable to all of those.

#### **--decryption-key**=_key[:passphrase]_

The [key[:passphrase]] to be used for decryption of images. Key can point to keys and/or certificates. Decryption will be tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.
