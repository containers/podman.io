# Podman Community Cabal Meeting Notes

### December 12, 2023 Topics

 1. Backports for sub-projects without a Release Branch - Paul Holzinger
 2. Confidential Containers - Dan Walsh and Friends


### Meeting Notes
 Video [Recording](https://youtu.be/snmlDKDcMRg)

 Meeting start 11:03 a.m. Tuesday, November 21, 2023


#### Backports for sub-projects without a Release Branch - Tom Sweeney - (0:56 in the video)
##### CRI-O requires fixes to c/common v0.53 which doesn't have a release branch currently.

 CRI-O project needed to use a v0.53 version that was not officially release branched.  How should we handle situations like this?

 Perhaps we can work more closely with CRI-O.  We need to sync due to the storage.conf.

 Peter thinks they could create their own branch in the repo and handle it there.

 For other projects that we have, we should extend the same option to them.  Then name the branch with the name of the project that relies on it.  We may want to do RHEL branch names too.

 Peter will check again in the future, and will create a branch, and will keep CRI-O as part of the name of the branch.

 Paul is a little concerned about the CI in the branch, but for c/common, the vendor bump PR in CRI-O would be the one to make sure is included.

 Peter will work with Brent to get into common as an admin, along with Sascha.

#### Confidential Containers - Dan Walsh, Nalin Dhayabi, Sergio Pascual, Tyler Fanelli - (10:48 in the video)

 Focus on krun using crun.  When you build an image, there’s a mkcw option to build the image that builds it specially for krun.  Things are encrypted on the build, and decrypted at run time by talking to the original machine that created it.  

 Trusted execution environments that are supported.  For cloud servers, they're exploring extenstions to the ARM architecture.  Dan is looking at it from the Edge.  Tyler is working on atestation which is used to prove that you're running securely.

 Dwayne is looking for it on the Edge.  Tyler is looking at the edge, but it's in it's infancy at the moment.  Tyler is trying to get Emulators.  No time lines to give now.

 At the moment you need to be on hardware that supports trusted execution environment.  Currently two AMD boxes and one Intel box that are available now.

 Dan sees this as a real good use case for Edge computing, the hard problem now is the cost of hardware.  He thinks from a security side of things, confidential computing make a lot of sense.

 Tyler doesn't think we'll see Epyc support in the near term, for the edge, it's more likely the extensions for confidential computing will be found on ARM.

 Dan thinks cloud vendors will like confidential computing as they could charge a premium.  Other than government and banks, he's not sure who else might want this.

 Martin says they've employed Epyc processor in retail, but the confidential computing was not part of the solution there.

#### Artifacts in OCI registry - Brent Baude - (26:12 in the video)

 What tools can be used to handle the artifacts.  Others are looking at artifact storage as a pure storage.  The question is how to reflect architecture and possibly the type.  Nalin asked why we're using manifest lists at all?

 Dan stepped back.  RH has working on making bootable images like qcow.  What we're hoping to do is to specify something like quay.io/podman-machine/mac or quay.io/podman-machine/qcow.  Then podman machine could hit up quay.io to get the right image that it needs based on the machine it resides on.

 Useful if you're looking for a qcow that corresponds with an image that would normally run with Podman.  When you search for an artifact that corresponds to a particular image, would you look at the digest? Brent thinks the digest will get you to the manifest list.  Brent thought the manifest would be tied to the image, rather than the architecture.

 Links from Nalin:
 https://github.com/opencontainers/image-spec/blob/main/artifacts-guidance.md

 Brent has been looking at:
 https://github.com/opencontainers/image-spec/blob/main/manifest.md#guidelines-for-artifact-usage

 Miloslav shared:
 ( https://github.com/opencontainers/image-spec/blob/main/image-index.md "subject" + https://github.com/opencontainers/distribution-spec/blob/main/spec.md#listing-referrers is the subject/referrers feature ref)


 Dan thinks Podman machine is going to ask for quay.io/podman/machine:5.0 for Linux/X86 qcow2 which includes the architecture and type.

 Nalin says you can query machine:5.0 to get a pointer to the associated qcow2.

 Nalin is tryiing to avoid manifests with artifacts within it.  Nalin thinks things in a manifest should be more or less interchangeable.  Brent asked if his solution would be a singular file, and/or would it have a a referal.  Nalin agreed.  Miloslav thinks we should have an image which specified the type of architecture it is.  He thinks using a manifest list in this space could be confusing.

 Brent envisions a case in the future when a CVE is reported.  The podman machine could automatically recognize the update, get it, and just keep running.

 Brent, Dan, Valentin, and Nalin will get together later to discuss further.  Dan is considering coming up with a tool to do this.

 Need to also support an OCI image that doesn't support a manifest.

 Currenly can we pull a singular artifact?  Only if it identifies itself as an image.   Skopeo can pull qcow now, Podman can't.  Dan thinks that will suffice.

#### Open discussion - (49:10 in the video)
 1. Podman Desktop switching between rootful and rootless is painful.  Can you have both a rootful and rootless socket at the same time on a mac to one machine.  Brent says not at the moment, but a possible new feature.  Brent will discuss further, a possible good hack-a-thon topic.
 2. First machine file rework went into the Podman main branch.  Compiled, not yet used/hooked.  Once it is, it will probably become ugly for a bit, the team will make sure tests pass.
  
### Next Meeting: Tuesday, January 16, 2024, 11:00 a.m. EDT (UTC-5)


#### Possible Topics
 1. Krun and Podman - Talk to Tyler Fanelli
 2. crun qemu - Talk to Dan Walsh


### Next Community Meeting: Tuesday, February 6, 2024, 11:00 a.m. EDT (UTC-5)

#### Possible Topics:
 1. Home Automaition

 Meeting finished 11:55 a.m.

 Raw Meeting Chat:

 ```
00:13:50.654,00:13:53.654
Dewayne Branch: Tyler I am interested

00:20:16.726,00:20:19.726
Brent Baude: in more ways than one!

00:22:21.445,00:22:24.445
Martin Jackson: Where I Was Before, we deployed Epyc processors to the edge for video processing to prevent retail theft

00:23:09.468,00:23:12.468
Martin Jackson: It was a bit of a disjoint thing, we had to run 220 power in lots of stores to run them

00:23:38.214,00:23:41.214
Tyler Fanelli: healthcare as well

00:26:47.086,00:26:50.086
Daniel Walsh: Tom the next meeting, I might be able to line you up with crun-qemu, running VMs as containers.

00:27:55.647,00:27:58.647
Tom Sweeney: thx Dan!

00:35:41.648,00:35:44.648
Nalin Dahyabhai: https://github.com/opencontainers/image-spec/blob/main/artifacts-guidance.md

00:36:29.754,00:36:32.754
Brent Baude: https://github.com/opencontainers/image-spec/blob/main/manifest.md#guidelines-for-artifact-usage  <-- iw as looking at this

00:37:32.760,00:37:35.760
Daniel Walsh: Podman machine is going to ask for quay.io/podman/machine:5.0 for Linux/X86 qcow2

00:39:02.030,00:39:05.030
Miloslav Trmac: ( https://github.com/opencontainers/image-spec/blob/main/image-index.md "subject" + https://github.com/opencontainers/distribution-spec/blob/main/spec.md#listing-referrers is the subject/referrers feature ref)

 ```

### Raw Google Meet Transcript

 ```
Did not record.
 ```
