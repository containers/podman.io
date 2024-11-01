# Podman Community Meeting
## Oct 1, 2024 11:00 a.m. Eastern (UTC-4)

### Attendees ( ? total)


### Topics

1) DOSU demonstration - Devin Stein
2) Four Podman mini Topics - Mario Loriedo

## Meeting Start: 11:02 a.m. EDT
### Video [Recording](https://youtu.be/NeFsVLS-2lY)

## Dosu Demonstration
### Devin Stein
#### (0:16 in the video) -

Dosu is a tool for open-source maintainers. LLM solution which can auto-respond to Github issues and discussions (configurable, can do other things) if it can identify a solution. It can also do automatic labeling of issues as they arrive. It can also be used to identify gaps in documentation and assist in updating documentation to address those. It will soon have the ability to preview its responses and have maintainers edit them before posting. Could replace some of our bots (stale issue and labeling, for example). Broadly available to CNCF projects

## Four Podman mini Topics - Windows Installer, WSL disk image as OCI artifact, build -v, and kube play with volume of type image. 
### Mario Loriedo
#### (10:50 in the video) - 

Mario has been working on a number of things recently, and this series of demos will go over them. The first is an installer improvement - the Podman windows installer now has a radio button to select what backend you want to use (Hyper-V or WSL), which was previously not able to be set by the installer. This prompt only occurs on fresh install, not upgrade - upgrades will use the same configuration as the initial install. The second demo is of pulling the WSL image for Podman Machine VMs from a container registry as an artifact, as opposed to the prior approach of fetching directly via HTTP. This matches the way that our other backends pull images, and unifies code between WSL and the other backends. The third demo is of `podman build -v` on Windows, which did not function properly as it could not interpret paths beginning with a drive layer (e.g. `C:\`). The final demo is about `podman kube play`, which now allows Kubernetes YAML using image volumes. This is a very new Kubernetes feature which allows images to be mounted into pods as data volumes.


## Open Forum/Questions?
#### (23:54 in the video) 

1) None

## Topics for Next Meeting

None


## Next Meeting: Tuesday, December 3, 2024, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, November 5, 2024, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:28 p.m. Eastern (UTC-5)


## Google Meet Chat copy/paste:
```
00:10:39.522,00:10:42.522
Neil Smith: Looked really interesting - thanks

00:22:46.908,00:22:49.908
Neil Smith: Thanks Mario
```

## Raw Google Meet Transcription
```
Not Captured
```
