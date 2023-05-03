% podman-history 1

## NAME

podman\-history - Show the history of an image

## SYNOPSIS

**podman history** [*options*] _image_[:*tag*|@*digest*]

**podman image history** [*options*] _image_[:*tag*|@*digest*]

## DESCRIPTION

**podman history** displays the history of an image by printing out information
about each layer used in the image. The information printed out for each layer
include Created (time and date), Created By, Size, and Comment. The output can
be truncated or not using the **--no-trunc** flag. If the **--human** flag is
set, the time of creation and size are printed out in a human readable format.
The **--quiet** flag displays the ID of the image only when set and the **--format**
flag is used to print the information using the Go template provided by the user.

## OPTIONS

#### **--format**=_format_

Alter the output for a format like 'json' or a Go template.

Valid placeholders for the Go template are listed below:

| **Placeholder** | **Description**                                                           |
| --------------- | ------------------------------------------------------------------------- |
| .Comment        | Comment for the layer                                                     |
| .Created        | if --human, time elapsed since creation, otherwise time stamp of creation |
| .CreatedAt      | Time when the image layer was created                                     |
| .CreatedBy      | Command used to create the layer                                          |
| .CreatedSince   | Elapsed time since the image layer was created                            |
| .ID             | Image ID                                                                  |
| .Size           | Size of layer on disk                                                     |
| .Tags           | Image tags                                                                |

#### **--help**, **-h**

Print usage statement

#### **--human**, **-H**

Display sizes and dates in human readable format (default _true_).

#### **--no-trunc**

Do not truncate the output (default _false_).

#### **--quiet**, **-q**

Print the numeric IDs only (default _false_).

## EXAMPLES

```
$ podman history debian
ID              CREATED       CREATED BY                                      SIZE       COMMENT
b676ca55e4f2c   9 weeks ago   /bin/sh -c #(nop) CMD ["bash"]                  0 B
<missing>       9 weeks ago   /bin/sh -c #(nop) ADD file:ebba725fb97cea4...   454 MB
```

```
$ podman history --no-trunc=true --human=false debian
ID              CREATED                CREATED BY                                      SIZE       COMMENT
b676ca55e4f2c   2017-07-24T16:52:55Z   /bin/sh -c #(nop) CMD ["bash"]                  0
<missing>       2017-07-24T16:52:54Z   /bin/sh -c #(nop) ADD file:ebba725fb97cea4...   45142935
```

```
$ podman history --format "{{.ID}} {{.Created}}" debian
b676ca55e4f2c   9 weeks ago
<missing>       9 weeks ago
```

```
$ podman history --format json debian
[
    {
	"id": "b676ca55e4f2c0ce53d0636438c5372d3efeb5ae99b676fa5a5d1581bad46060",
	"created": "2017-07-24T16:52:5595062314Z",
	"createdBy": "/bin/sh -c #(nop)  CMD [\"bash\"]",
	"size": 0,
	"comment": ""
    },
    {
	"id": "b676ca55e4f2c0ce53d0636438c5372d3efeb5ae99b676fa5a5d1581bad46060",
	"created": "2017-07-24T16:52:54.898893387Z",
	"createdBy": "/bin/sh -c #(nop) ADD file:ebba725fb97cea45d0b1b35ccc8144e766fcfc9a78530465c23b0c4674b14042 in / ",
	"size": 45142935,
	"comment": ""
    }
]
```

## SEE ALSO

**[podman(1)](podman.md)**

## HISTORY

July 2017, Originally compiled by Urvashi Mohnani <umohnani@redhat.com>
