# Podman Community Cabal Meeting Notes

Attendees: Anders F Björklund, Ashley Cui, Avery Blanchard, Brent Baude, Chetan Giradkar, Christopher Evich, Daniel Walsh, David Chisnall, Ed Santiago Munoz, George Almasi, Gerry Seidman, Giuseppe Scrivano, Jake Correnti, James Bottomley, Johns Gresham, Lokesh Mandvekar, Martin Jackson, Matt Heon, Maya Costantini, Michael Peters, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Preethi Thomas, Tom Sweeney, Urvashi Mohnani, Valentin Rothberg

## October 19, 2023 Topics

1. Sharing storage between podman and CRI-O, for Podman Desktop - Anders Björklund
	* to avoid having to do "podman save | nerdctl load" [https://kind.sigs.k8s.io/docs/user/quick-start/](https://kind.sigs.k8s.io/docs/user/quick-start/#loading-an-image-into-your-cluster)
	* including change from "kind" to "minikube" (for CRI-O) https://github.com/kubernetes/minikube/issues/17415

2. Building Trust in Containers - Avery Blanchard

3. Podman machine, ssh keys, connections name-spacing - Brent Baude
  * https://github.com/containers/podman/pull/18487
  * https://github.com/containers/podman/issues/17521

4. Allow specifying a guest OS in `podman machine init` Part 2 - Brent Baude (No updates)


### Meeting Notes
Video [Recording](https://youtu.be/JndjmrZBEKc)

Meeting start 11:02 a.m. Thursday, October 19, 2023

#### Sharing storage between Podman and CRI-0, for Podman Desktop - Anders Björklund - (0:57 in the video)

This is for the OpenShift space. The kind container runs containerd, but to make this happen you need to do a Podman build, save and then upload.  The thought is to have the desktop talk directly to the cluster. https://podman-desktop.io/docs/kubernetes/kind/building-an-image-and-testing-it-in-kind

I.e., land a privileged container inside of a kind container, but there are issues.  Maybe do a minikube container with CRI-O.  Is it enough to volume mount container storage from the host?   Might be able to get a rootless Kubernetes cluster talking to a rootless CRI-O cluster.  Kubernets monitors the mounting of storage, and will sometimes disallow mounts created elsewhere.  An issue filed with MiniKube: https://github.com/kubernetes/minikube/issues/17415

Might be able to do this with microshift too.  The end result would be to get Podman Desktop to run directly with CRI-O.  Dan thinks it should be doable.  Nalin expects it would work but is concerned about garbage collecting.

#### Building Trust in Containers - Avery Blanchard - (10:48 in the video)

Duke Ph.D. student working on Trust.

[Presentation (pdf)](./ContainersTalk-RH.pdf)

Motivation
Build trust in container through cryptographic measurements rooted in trusted hardware
Measurement and attestation of containerized workloads
Goal: Enable container attestation through the measurement of individual container integrity

Started work as a Red Hat Intern.

Using Trusted Platform Module
Cryptographic coprocessor designed to secure hardware
Components
	Key Generation
	Secure Storage
		Unique hardware identity
Applications
		Secure boot
		Disk encryption
		Attestation and trust (Keylime)
    
Linux Integrity Measurement Architecture IMA
	Can't be used currently in containers
	Measurement, appraisal and storage of file integrity data
	Cryptographic hashes of file contents are stored in a TPM-based non-repudiable logs
    
Attestation
	Verification of system integrity relying on trusted hardware
	TPM enables remote attestation of system software from boot measurements through runtime

Kernel Extensions
User-defined programs loaded into the OS kernel
Kernel Modules
Programs that can be loaded into the OS (device drivers, file systems, etc)
eBPF
Mechanism allowing user-define programs to run sandboxes in the privileged kernel context
Wide variety of hooks located across subsystems
    
Extending IMA to Containers using eBPF
	IMA currently does not have namespace support
    		Cannot be used to verify the integrity of individual containers
	Though leveraging the kernel’s support of eBPF, we can add namespace support of IMA without requiring changes to the kernel 
	[GitHub Repository](https://github.com/avery-blanchard/container-ima)
    
Extending IMA to Containers using eBPF
	eBPF
    	Provides visibility into a container's executable content without changes to the OS
    		Sleepable eBPF program hooking into mmap_file LSM
			Same LSM hook used by IMA to provoke measurements in the kernel
		Provokes measurement through calling kernel module exported function
	Kernel module
		Measures and stores integrity data in the host IMA log
		Namespaced measurements are stored
			HASH(FILE HASH | NS)
   	 
Container Integrity Measurement
With the eBPF extension of IMA, container file integrity is measurement throughout runtime
Building a policy for this system introduces more and more complexity to do attestation at this scale
Whitelist of file hashes for every container
Where can we go from here?

Container Image Measurement
From the operating system level, visibility into container creation is limited
Unshare system call 
Disassociate parts of a process' execution context that are currently being
Shared
Through filtering calls to unshare based on policy, we have visibility into container images through the file system of the new namespace

Provoking Container Image Measurements
	Add an LSM hook into the unshare system call to provoke a measurement based on policy
The introduction of this hook allows for future work on image appraisal and access control from the OS-level

Image Measurement
	Single measurement for the image
Traverse the file system, concatenating after each measurement

Image Measurement Storage
Image digests are stored as a single entry in the host IMA log
Digests are logged with their namespace as an identifier
Digests are extended to PCR on a TPM

Policy Enforcement
	Image measurements are enforced based on a system policy
This policy determines what flags passed to unshare warrant a measurement
Container runtimes affect which flags should provoke a measurement and should be reflected in the policy
Overhead is more than not having the security, but it's not terrible.

Current State of Image Digests
	Current image digests are dependent on image layers, manifest files, image ids, …
From the operating system, the only thing visible in the final image
A digest of the image itself is needed to be provided to extend the chain of trust from hardware up to each container instance
What does the path to kernel-verifiable measurement of the container look like?

Future Work
	Improve policy enforcement
	Container attestation with Keylime
    
Giuseppe is doing things with composeFS, and there might be overlap.  Dan also asked about how volumes are handled.

OCI unhooks might be something to be looked at too.  Podman calls an executable after a container is created, and can provide information via the hook.  Look for OCI hooks, and they can be used by most container runtime engines.

ComposeFS is what the Podman team is looking into, but Avery's approach might be more secure.  Talks to continue.

#### Podman machine, ssh keys, connections name-spacing - Brent Baude - (29:55 in the video)
Links of interest:

  * https://github.com/containers/podman/pull/18487
  * https://github.com/containers/podman/issues/17521

The machine doesn't detect collision on ssh, until machine is almost inited, which is fairly costly.  New code in that cleans that up if it fails from Ashley.  The ssh keys are not checked and it doesn't fail nicely from a user experience space.  

One possibility is to create a unique key for Podman and system connections with the machine name include in the name of the key.

The two links above are the feeders to the issue.  

Where should the keys live?  Standard ssh space, or to put them in a designated spot for Machine.  In Lima, you are able to specify on a command line.  A key is generated and used by the machines, and it's stored under the Lima configuration.  

Issues have occured with key limits in the default space.  Dan thinks storing in a private ssh key stored away somewhere per machine makes sense, Brent likes the idea of one key for all machines.  

Matt likes the idea but wants to be able to find it when necessary.  `~/config/containers/podman.machine` might be a good location.

Currently, we remove the key when we remove the machine, so a change would need to be made to machine to keep it from removing the key on exit.  It's copying a public key, not the private key, so low security risk.

### Allow specifying a guest OS in `podman machine init` - (41:04 in the video)

Brent Owes review of document to David.  David has made the changes, but ran into issues that have been fixed yesterday.  More testing to continue.

#### Open discussion - (43:23 in the video)
1. Podman farm build by Urvashi and Nalin.  Will allow for easy builds of multi arch image from a container file with one build.  Works well on Linux, but on Mac/Windows it becomes interesting when determining where to make the images to.  Thought is to pull the image to the local Mac/Windows, then push it to the primary machine.  Need to pull to Mac first, as that knows about the local configuration.  Still a WIP.  PR up for review, once done, work on the Mac will commence.  Valentin thinks the mac should know where the push has been done, then a JSON for the OCI manifest would need to be created, and is theoretically doable.  The push could be done to the registry, possibly, without storing locally. (43:45 in the video)
2. Podman v4.8 coming out in mid to late November.  Podman v5.0 should be coming out early next year.  v5.0 will be the main branch after v4.8 is released. (52:28 in the video)
 
### Next Meeting: Tuesday, November 21, 2023, 11:00 a.m. EDT (UTC-5)

The Cabal meetings are moving to the third Tuesday of every month starting in November due to meeting conflicts for many of the Red Hat attendees.

#### Possible Topics
None


### Next Community Meeting: Tuesday, December 5, 2023, 11:00 a.m. EDT (UTC-5)

#### Possible Topics:
None

Meeting finished 11:57 a.m.

Raw Meeting Chat:

```

Transcript
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
Tom Sweeney: This meaning is held for discussing your design topics, rather than doing demos and such And today we have four subjects that we're going to be talking about the first one. Anders This can be talking about sharing storage between podman and cryo for cloud, mandisa, and then Thanks for coming today. Avery as well. Anders and others representing too Avery will be looking talking about building trust and containers. And then Brent will be talking about public machine. Ssh keys connections and namespacing and then as time will also be doing a very quick update from what I hear about allowing specifying, a guestos and quad man mission with the talent. So with that, we've got a rather pack schedule, I'm going to hand it over to Anders.
Anders F Björklund: Yeah, I hope you can hear me, And I was,…
Tom Sweeney: Yep, coming through that.
Anders F Björklund: I was talking to the podman desktop team about different ways of Being able to build and run containers.
Anders F Björklund: Since the one that already they have a workflow. When they have a podman machine, they start with cores and interact with it and you run your containers and you deploy a couple of pods and so on. And then you want to deploy them to Kubernetes and then they have the option of starting a kind container in Podma. and this can continue with unrunner container D inside this container, but that also means that every time you want to build a new image, you have to do podman build, and then you have to do POD month save, And then you have to load this saved archive into the community's cluster with the CTR import or some other containerdy command.
Anders F Björklund: So we were talking about different alternatives than one alternative would be to have the portman desktop, talk directly to The podman inside the cluster so it would talk to the prodman inside the container support, man in podman if you would but it's an older version and you would still not be able to use your images that you had in the other GUI. So the question from the team was, if it was a possible to share the storage. from the PORTMAN engine on the host with Trial engine running in a container on that same VM host.
Anders F Björklund: That is something we started to explore. I haven't gone so far with myself, I think? Mini cube in podman with player with a bit out of date and has a number of barges. So
Daniel Walsh: So, she would launch a pride privilege container inside of Right,…
Anders F Björklund: So kind only runs contain a D and…
Daniel Walsh: kind? And then have Apartment.
Anders F Björklund: that makes sharing images between container D and putman and in probably more of a no-go. but, An alternative would be to start mini-cube. Container with cryo. And very similar fashion and then have that…
Daniel Walsh: Yep.
Anders F Björklund: share the storage. So I was wondering is it enough to volume The Continuous storage from the house or How many other interesting issues really run into one year when you have two engines fighting over the same storage?
Daniel Walsh: I did I have a feeling it would work.
Anders F Björklund: Because we have used it on singing machine. We use podman to do podman build and portman load and then use those images in trial.
Daniel Walsh: Right, right? The container storage itself to be able to do to handle that situation.
Anders F Björklund: Yeah.
Daniel Walsh: As long as they're in the same username space and things like that.
Miloslav Trmac: adding up,…
Anders F Björklund: I,
Daniel Walsh: but,
Miloslav Trmac: they used to do builds in the storage shared with cryo We eventually isolated it but if I remember correctly, this did work at some point. But I have no idea how much thicker was involved.
Anders F Björklund: And the initial approach would be to run the route full hortman machine.
Daniel Walsh: I think.
00:05:00
Anders F Björklund: To cut down on the number of moving pieces. I think eventually you can have a root left Kubernetes cluster to torque into rootless container engine but Since it's all running in a VM,…
Daniel Walsh: Yeah.
Anders F Björklund: that's not the priority.
Miloslav Trmac: Okay, if you are selling storage then the build container. The supposedly are privileged one has full privileges of cryo anyway for the most part. That's not presentation to be a resident against malicious trade.
Anders F Björklund: Yeah, that is true.
Daniel Walsh: Yeah.
Anders F Björklund: Of course.
Daniel Walsh: the only issue I would see in this is, Some Kubernetes likes to monitor now to the images and storage and Sometimes Kubernetes likes to come in and…
Anders F Björklund: Yeah.
Daniel Walsh: say I didn't that. Get it out of there, all right.
Anders F Björklund: Yeah, yeah. What is correctly? The cube that will start garbage collecting the problem machine. So that's something to look out for.
Daniel Walsh: Yeah.
Anders F Björklund: I think with a newer version, you can pin them different images that you care about, but it's also only support to start deleting stuff when you're run out of disk. So allocating a bigger image for machine might have
Daniel Walsh: But how out of date is the pod man that's inside of the machine.
Anders F Björklund: It's open to container so it's three four. Something
Daniel Walsh: So three, four we even have a service for three foot. probably the service Because pushing an image to contain a storage, probably would work even with that big. It just mismatch
Anders F Björklund: Yeah yeah I mean the basics work but There'd be no fancy things.
Daniel Walsh: and the man, another you could do with Microshift as well. Michael Shift might be a little more.
Anders F Björklund: Yeah, yeah You can do the open Shift cluster instead and not to deploy Kubernetes cluster at all that could cause but that is something that is being looked into because for different reasons. Podman desktop might want to be able to run with cryo And not you.
Daniel Walsh: I think the …
Anders F Björklund: Containing the Olympian.
Daniel Walsh: with trial, you don't have a problem. All the container storage locking is done. Inside that we don't use any. Time profess any content in slash run, so that shouldn't be a problem.
Anders F Björklund: But you do need both of our and…
Daniel Walsh: So, as long as you have the right, it should be right.
Anders F Björklund: run, right? So you need to run route and the route To have the looks and everything in place.
Anders F Björklund: I need to.
Daniel Walsh: You have to nalin, do you know if they're I don't think container storage does any locking in?
Nalin Dahyabhai: It doesn't look like miles in the run route.
Daniel Walsh: And slash run.
Nalin Dahyabhai: It stores them under the root. That's why it has to be rewrite. So I expected will work. But yeah, the main thing I would worry about is garbage. Collecting From one,…
Anders F Björklund: Yeah, and…
Daniel Walsh: Yeah.
Anders F Björklund: I think that's a later concern,…
Nalin Dahyabhai: the other.
Anders F Björklund: but it's going. With a Kubernetes 129 it started to garbage collect the pause image in Doctor that's interesting for,…
Nalin Dahyabhai: Wow.
Anders F Björklund: for those. So Let's say it may around this area with the back, parting the support for pin the containers, otherwise there will be garbage collecting.
Anders F Björklund: But the post image is small, you can pull it quickly. Yeah. And now that was just a topic. I linked in Russia, link to the meaning here issue. And the alternatives and so on. If you are interested in this, I think it will be ongoing minikub. I'm not sure how much the podman desktop team will be involved in it other than trying to make it work that interface, but
Daniel Walsh: Just gonna give Mini Cube to move to Cryo get off of Rebuntu. Okay.
Anders F Björklund: You mean to I think kind change their container from Ubuntu to Debian. So the mini cube container is just suffering,…
Daniel Walsh: Yeah.
Anders F Björklund: a bit of neglect, it doesn't moved in a way.
Anders F Björklund: But natural also be possible right now.
Daniel Walsh: Yeah. A little more.
Anders F Björklund: It's sharing the image between all the run times. So it runs Dr. And container and trial And the cryo will pull it out of date. I think it's like 124 or something. It's supposed to be I mean,…
Daniel Walsh: Yeah.
Anders F Björklund: reasonably within versions of the Kubernetes. and they are now started to release cryo in lockstep with Kubernetes, so each, Kubernetes release will have a player release
00:10:00
Tom Sweeney: Any other thoughts or comments here? So, we move on.
Tom Sweeney: Anders you mentioned a link but I don't see it in the chat.
Anders F Björklund: Sorry, it was in the documents in the Hack MD.
Tom Sweeney: Okay.
Anders F Björklund: As I can post it in the chat as well, but
Tom Sweeney: I got Brancha.
Tom Sweeney: those to the notes and thank you. So next up we're going to be talking about building trust and containers Avery.
Avery Blanchard: Hi, thank you. I'm going to share my screen if that's okay.
Tom Sweeney: Sure thing. If the meeting gods will allow it.
Avery Blanchard: All right, great.
Tom Sweeney: Looks good coming through just fine. And would you mind sending me this? So after the meeting PDF or…
Avery Blanchard: Yes. Yes,…
Tom Sweeney: something, thank you.
Avery Blanchard: so high, I'm Avery. I'm a first year PhD student at Duke. and I'm going to be talking about our ongoing efforts to build trust in containers.
Avery Blanchard: and so, Our proposed solution is centered around leveraging, on the power of cryptographic measurements, rooted and trusted hardware. So, we're working from inside the operating system, to use, cryptographic measurements, and attestation to build a framework for verifying container integrity. and so, I started this work actually as a Red Hat, intern. So, it's fun to be back So, here's a background on some of the technologies that we're using to build the solution. So we use the Trusted Platform module, and so the Trusted Platform module serves as a dedicated cryptographic program processor designed to secure hardware. Some of the key components that we're using in this solution are secure storage and unique hardware identities.
Avery Blanchard: So Tpms contain a number of platform. Configuration registers that can be changed by firmware in the OS only by concatenating With the prior value held in the register. The TPM is used in applications. Such as secure boot, disk encryption, and attestation and trust through technologies, like Key Lime.
Avery Blanchard: The Linux integrity measurement architecture is used to file integrity throughout runtime. This currently cannot be used on containers because Does the measurement appraisal and storage of file integrity data. These measurements are provoked when files are mapped with an executable protocol and I'm a creates a hash of the file contents and stores them in non-reputable logs. These files can be measured based on system policy and are used to detect changes in file integrity due to remote or local attacks.
Avery Blanchard: And for some more background attestation involves the verification of system. Integrity relying on these cryptographic measurements and trusted hardware, the TPM ens remote attestation from boot measurements throughout runtime using I'm a logs and the measurements conducted by IMA throughout runtime. You see, a diagram here of how keyline can be used to attest an environment through registration and verification of I'm a logs using a TPM quote.
Avery Blanchard: And so in our solutions we use a variety of kernel extensions are users find programs loaded into the Kernel kernel modules are used for adding device drivers or file systems to load into the OS. We also use EVPF which is a mechanism that allows for user-defined programs to run sandboxed in the operating system kernel. And so this is useful for a variety of applications because of the wide, variety of hooks located across kernel subsystems.
Avery Blanchard: And so the first step of finding the solution was extending, I'ma to containers using ebpf. This was possible through the Ellison hook in that file which We used in order to grab the files that were mapped, as executable through an ebpf hook that we placed and then setting a call back to the kernel module that we defined to add namespacing to this measurement. This is important because as I said, previously, I'm currently does not have names, say support in the kernel and due to this, we were unable to verify the integrity of individual containers from these measurements because you can't differentiate between a host measurement and measurement of a container. And so through leveraging the kernel support of Evpf, we can add namespace support without requiring changes to the kernel.
00:15:00
Avery Blanchard: So, Evpf provides the visibility that we needed to. Measure a container's executable content without requiring changes to the OS. We used to sleepable Evpf program to hook into the IMAP file LSM which is actually the same ellison hook used by IMA to provoke measurements inside the kernel. And so, we used a patch that was available in Kernel 6.0, which allowed ebpf programs to use kernel module functions. And so, in our kernel module, we defined the routines for measuring and storing integrity data. We did this through utilizing some existing, I'm infrastructure and we added namespacing to these measurements. And extended them all to the host, hardware TPM, while rather than having a TPM per container.
Avery Blanchard: and so, from here, we have measurements of a container's executable content throughout runtime but as you can imagine doing attestation for a system this is Extremely complex. It requires building a policy for each container that would run on the system. So, while we have this integrity measurement for the containers, what can we do with them? It becomes more and more complex to do attestation at the scale. so We seem to be kind of at a crossroads of how can we measure container integrity? Which led us to our next solution. And so, from the operating system, you have very little visibility into container creation.
Avery Blanchard: And so we're using the unshare system call, which is central to container virtualization, we're able to have a little bit of visibility from the operating system level. So the unshare system call just associates parts of processes. Execution context that are currently being shared And so through, looking at the unshare system call, we can filter based on policy to have visibility into the container creation process. And so from Unshare, we're able to see the current task that is being disassociated. And when we're looking at this task, the file system of the task is the container image that is being started. So from Unshare, We're able to get the information of the new namespace that is being created for this container, as well as the container image, that is being started.
Avery Blanchard: and so, We added a LSM hook into the unshare system. Call to provoke this measurement, Based off of a policy. And so this hook provides a callback to functions that we have defined in IMA to measure the container image based off of the policy. The introduction of this hook also allows for future, work on appraisal and access control from the operating system level.
Avery Blanchard: And so, as we talked about the complexity of creating a policy for container attestation Having these, I'm a measurements of a container and a log just means that the analog is just going to grow increasingly with the scale of the container. And so having a single measurement for each image, really cuts down on this complexity and so we propose a single measurement for the image which is created through traversing the file system and concatenating. After each measurement, we do a depth first traversal of the image file system and form a single measurement for the container that we then write to the IMO log with its associated namespace.
Avery Blanchard: And so these image digests are stored as a single entry, they are logged with a namespace as they're identifier, and they are extended to the PCR of the TPM. This image might be small, but you can see that a container image was measured with its namespace. This image also shows the imextension where it executed something called And so you can see the differentiation between a system with namespacing. Versus not.
00:20:00
Avery Blanchard: And so, We're also working on policy enforcement. And so to measure this based off policy unshares being called for more than just container creation. And so having a system policy that can be changed dynamically is what we would need to Determine what flags would provoke a measurement or what environment would need to be measured. When unshare is called,
Avery Blanchard: and so, the overhead for measuring these images is not too terrible. The security comes at a price but this benchmarking is done on container startup time when the image is measured with a machine with a hardware TPM.
Avery Blanchard: and so, as you can imagine current image digests that are provided by container repositories or dependent on image layers, manifest files, IDs and times and from the operating systems level, the only thing that we really have visibility into is this final a digest of the image itself is needed to provide the extension of a chain of trust from hardware to each container image. And so our question today is What does the path to colonel verifiable measurements of a container look like because as we can create these measurements from the operating systems level,
Avery Blanchard: we have no way to verify against the container provider or the container Maintainer. What if these image digests that were storing and creating are correct? We would need a kernel Container digest to be provided that we could then build policy based off of
Avery Blanchard: and so, Future work is to improve policy enforcement and connect container attestation with key lime.
Avery Blanchard: that's most what I have for today, but I'd appreciate
Daniel Walsh: So I got a couple of questions for you. First of all, if you looked at all at what we're doing, was composed of us.
Avery Blanchard: no, I have not.
Daniel Walsh: Okay, so that's something that you should investigate, so, compose a message doing sort of a dmvarity of Content put down on disk. so it's similar to what you're trying to prevent and that's what actually just Giuseppe on this call is actually working on so you should take a look at that and see if there's overlap or something you can take advantage of it and that category Other issues. I see with what you're doing is, How do you handle volumes? Because you could get random content, a Mac and Mount slash user inside of a container. And what happens then?
Avery Blanchard: Mmm.
Avery Blanchard: Yes, that's kind of where we need to deal with policy. We only really see the container image and so volumes are left behind in this scenario.
Daniel Walsh: Because when you say an image too, you're talking about a root of us, right? There's all you're seeing,…
Avery Blanchard: Yeah.
Daniel Walsh: is that? The Mount Unshare, it happened and we then mounted this with us. And then you really even understand. Out the relationship between that root of fast and the original image name that was pulled down. to be right and see so you're looking for some way to track that back To some like, what? Baude man did to start that image, right?
Avery Blanchard: Yes, we have The namespace that we can associate with the measurement versus the container running on the system, but that's the connection that we have now.
Daniel Walsh: Yeah.
Daniel Walsh: David asked You question?
David Chisnall: Yeah, Thanks Avery. That was really interesting. You might also be interested in reaching out to my former team at Azure Research. We did the initial version. What was deployed as Azure Confidential containers. So this gives you as a station over containers running in T's With.
00:25:00
David Chisnall: Rego policy to tie that into whatever your constraints are. The version I did was running an sgx enclaves, which had awful performance. The one that actually shipped it running in Snpvms, but that's actually now a deployed product. And so, I think they'd be really interested in looking at some of what you're doing and seeing if there's any intersection.
Avery Blanchard: Great. Thank you.
Tom Sweeney: David can you send a mail to Avery? Or are you willing to hear on chat?
David Chisnall: Yeah. Found your on LinkedIn. So I'll ping you there.
Avery Blanchard: Thank you.
Daniel Walsh: So other things that you might want to look at is Into odd, Has the concept of oci hooks. you could use the OCI hook to basically got an information about the application that's about to call on share. So I I guess it's giuseppe's a call down here at that point.
Giuseppe Scrivano: The Cisco? Yeah.
Daniel Walsh: So basically we can call pod, We'll call a program or any of our container engines will call and Right after it establishes the container and will provide information basically the entire Mouse information to call it to the application. so if you had a hook, you could gather all the information from Pod Man that this is what is Ron, This is the command line, that's being executed, and then, that would give you information that you could even display to the user or in your logs, to say that container ID, blah, blah using image.
Daniel Walsh: Fedora, executed this command and failed, and I'm a test because that's really what you need. So that I was so look up Oci hooks. and I think just about you run C, does it and see run. So actually this is the image specific to pod, Man R, you can do with docker, you can do with any of the container engines.
Daniel Walsh: they use an OCR runtime hook, so that would be where you would garner in dishes or information then you could use that to have a database of what the Iowa measurements that you want to hook up to your system Reason compose a vest is interesting to us is that it would take care of the content, making sure that the content was a modified so that we pull down an image from the Internet. We want to make sure that the content to the image has not been modified after. So during the pull, we use signatures of the image that's pulled down when we write that to disk, we actually able to write stuff to
Daniel Walsh: Compose a fest database which all goes through a similar chain of trust and we know that the file has not been modified, but we don't know. whether or not the container was run with the correct command. So you're check would be looking to say I downloaded this executable and I expected to be run with this command and Not some mash grip to something like that and so you could argue that yours was me more secure, but I think, what you really need to look at is whether or not compose of us investing would plug in together. the other thing you'd be able to tell by using an OCI hook, is whether or not there's volume is mounted. And so,
Daniel Walsh: So if you have a volume mounted in and you rhyme that's illegal or you don't want volumes back mounted. And then you could block that execution of that container at that point.
Avery Blanchard: Thank you. I'll look into that.
Daniel Walsh: Yep.
Tom Sweeney: The other questions and comments, I want to wrap this up, great job, but we do have another topic or two to go.
Tom Sweeney: Right, I'm going to hand it over to Brent, then to talk about Podmann machine, ssh, keys and connection Namespacing.
00:30:00
Brent Baude: Thank Tom, would you mind pasting the links in there? Just for those that are following the agenda there were two Links on the agenda.
Brent Baude: But while he's doing that that just sort of fills in some of the gaps. I think generally the core team is Purdue where this problem and there have been community members or non-core members, let's just say that have tried to submit PRS. About. Nibbling in on a fix on some of this. But the base problem statement, here is that
Brent Baude: Podman uses when you do a machine and it kind of has all these different places. It has to go and set up. So There's SSH keys that it needs to write an SSH connections. If we just primarily, look at those three. Right now, we don't detect collision on.
Brent Baude: Ssh are system connections until the machine is almost totally emitted. Which means it's gone through a pull It's gone through a decompression. And a disk resize before it catches it. Now Ashley just added some really good code in with callbacks that go and clean that up. After the fact, if something fails and I'm sitting on a that Check system connections before. Really any work gets done. And fails the Annette. If there's a collision. But the Ssh keys, get kind of interesting because today, We don't check, we generate a key, we use the key Gen and we give it the name of the
Brent Baude: machine and it goes and if it fails, it gives sort of Whoops there So that's not the ideal user experience, but all these different approaches have kind of come up with. Do we need the name space? Somehow our machines either by the provider or by identifying it as a podman machine. Component. So, for example, should the key be written to something like dot ssh, slash podman machine, slash my new key. So that we don't have collisions with other keys.
Brent Baude: Same with system, connections.
Brent Baude: I guess theoretically, you could have a system connection with a name and have the same machine name and want to somehow keep that working together. But this idea of namespacing has been kicked back and forth for quite some time and within five. Beginning to sort of come together in terms of what we want to do. I'm wondering if we need to Go down this rabbit hole here. those two links that Tom posted then, Are sort of the feeders for this issue. So long, I'll stop talking and see what folks think.
Brent Baude: Cool. I'll do what I want.
Anders F Björklund: Do you have to put the keys in Dot SSH or can they just live in the apartment machine namespace somewhere like a key file?
Brent Baude: Yeah, I think that's exactly it. Anders It's a matter of. Where is it? I have to look at On that intimately familiar with the options about where to write with. Ssh Keygen, but there's a way to prefix it to get where you want.
Anders F Björklund: .
Brent Baude: and is that overly confusing to people, Are they looking for that key in that? Ssh to the care. Those kinds of ideas.
Anders F Björklund: so what we ended up doing for Lima was to generate Config So in order to do SSH, you only have to do the minus if and then you will get all the parameters for the connection including key. And the user and so on.
00:35:00
Brent Baude: Does that mean that all the keys are going into a singular file?
Anders F Björklund: so it generates a key that is shared with all the VMs and that goes into a file under the lima configuration. And I think when we started it, it would also copy or existing keys from into authorized keys, on the VM. But in terms of some people have a large number of key in third of and there was also some Maybe not security, but yeah, it went from opt out to opt in at least to copy, all existing keys but that's different from where you generate the keys.
Brent Baude: Indeed.
Anders F Björklund: But I mean, without the downside of that is that you have to do a min minus capital F or something to specify where your key is hiding. …
Brent Baude: Yep.
Anders F Björklund: mess with a key agent or something.
Brent Baude: We do that today, anyways, because of the,…
Anders F Björklund: Yeah.
Brent Baude: the key limit of six and…
Anders F Björklund: Right.
Brent Baude: a lot of people including me suffer with that because we have more than six keys. Good then.
Anders F Björklund: Yeah.
Daniel Walsh: I think we also hide that in primary machine, So it's Like we can figure out where the keys are Based on the machine that you're trying to start. Yeah, so it can be hidden from the user,…
Brent Baude: Yeah. Yeah.
Daniel Walsh: I like that. I mean, I want to get to multiple machines running simultaneously. So, I think having a private primary machine, key file, somewhere we find and to me, that makes sense. All multiple.
Brent Baude: what if folks, think of us singular key,
Daniel Walsh: Le key for all machines. That's fine too.
Brent Baude: That makes a lot of sense to me. Paul or…
Daniel Walsh: Yeah.
Brent Baude: Matt, you guys have danced around this Issues as well. Anything to add.
Brent Baude: We do have this nice directory on all our providers, which is till they Utility config containers podman machine. So we could stick it at that. Level use the same key for all providers.
Brent Baude: Anyone see any downside to having a singular key? Remember, it's a password list key.
Ashley Cui: The only thing is, when we remove a machine, we have to maybe add a flag that says, Remove key instead of gastruct safe keys and not remove it by default.
Daniel Walsh: Aren't you using the same key for every machine?
Daniel Walsh: Okay, right. Yeah. Start removing the keys.
Brent Baude: Yeah.
Daniel Walsh: Create the key once and use it everywhere.
Brent Baude: Okay.
Brent Baude: So, generally supportive of this idea, it sounds like I don't think it'll actually be all that hard to implement either. And we can do we.
Daniel Walsh: I don't see this, there's no security risk because it only goes one way. it's setting up a trust from the VM back to host. So since it's only one way, it's you just copying your public key into This is hdmen on the other end so it's not really a huge risk that I see.
Anders F Björklund: And you already mapped your home directory room.
Brent Baude: We do allow user injection of. Go ahead, Anders.
Anders F Björklund: Are you already mapped your home directory into the machine, right? So The secret out there.
Daniel Walsh: Yeah.
Brent Baude: Yep.
Daniel Walsh: We probably shouldn't that directory,…
Anders F Björklund: I think it.
Daniel Walsh:
Anders F Björklund: it came down to a matter of difference in philosophy, between podman machine department desktop, if you will, and it's the extension of your host, should you have access to everything on your whatever MAC windows the host in the Linux VM because it's just extension or toast or is the separate entity with A Different use or in a different key So there are no rights right or wrong to that issue. But we came from different places on the machine versus desktop.
00:40:00
Daniel Walsh: Yeah, I think most users expect their home directory to presence of the machine though.
Anders F Björklund: Yeah, unfortunately.
Daniel Walsh: Yeah.
Daniel Walsh: Yeah, I think also because that's the way things like Visual Studio and things like that, sort of make that requirement.
Brent Baude: I'm happy.
Tom Sweeney: Did you want to touch it all up on the other topic that we had here earlier? the guest OS?
Brent Baude: He's still on, is it David? Is that right?
Tom Sweeney: Yes.
Brent Baude: He's David, you're still on my list. I got yanked in some prioritization exercises that Took all my gumption away from reviewing but I owe you a review. I don't think our current materials changed in the sense that we would like to see a provider for free BSD machine. But still shy away from the guest OS aspect of that. So we'll work with you on that. And I'll get that review here as I unbury myself.
David Chisnall: Yeah, I made the changes that we talked about last time and…
Brent Baude:
David Chisnall: I have to. Yeah. and then I hit an issue that The firmware variables file system, flag was set incorrectly, which I saw you fixed yesterday. thanks for that. So now that's fixed, I'll Do a bit more testing and see why is unhappy with me?
Brent Baude: Okay.
Tom Sweeney: Should I put another topic in the next meeting for this as well? Just or…
Brent Baude: If you like we can do a checkpoint.
Tom Sweeney: at least a status update. I'll add that for the next one. Which before I forget, we are due to conflicts with meetings for most of the folks at Red Hat on Thursdays afternoons that have come up recently. We're going to be moving the Cabal meetings from the Thursday to the third Tuesday of each month. so the other team And so they'll still be at the same time. 11:00 AM Eastern utc5. By the time we get to the next one, which will be on November 21st, in our next community meeting where we do more demos and that kind of thing around is on December 5th, which is also to stay, which is the first Tuesday of the month. So we'll have meetings on the third Tuesday of the month, although the first one of the month is every other month on the evening months.
Tom Sweeney: and that is all that we had for the topics that were defined beforehand. Does anybody have any topics or questions? I'd like to do themselves Brent?
Brent Baude: I'll give everyone else a chance. But if we need to Fill some time. I would love to give an early. Present everyone and maybe talk about a few pod man, five things.
Daniel Walsh: So before we get to that, I'm going to put Urvashi on the spot here. Urvashii and I She's been working on this project along with nalin to do what we're calling Pod, Man, Fileman farm The basic idea is Allow to make it easy to build Multi Arch Images. So if you had two primary machines or two more, pardon me a connections to other machines that are running on different architectures, that you could assemble a multi action image from a container file, so you give that container file. It goes out to three different pod, man. Services somewhere in the Internet or on your local machine and
Daniel Walsh: then creates a manifest pulls the images from those machines back to The original machine assembles an image and then allows you to assemble some manife manifest list and then you could push that manifest list and all the images up to container registry and you have a multi-atch. Build
00:45:00
Daniel Walsh: so Herbert she's being very quiet here, but one of the interesting things is that works very well on a Linux box. But if you run it on a Mac or a windows, where is the assemble point for, the image where you're going to create the manifest list, where you're going to pull the images to So say you're building x86 and I don't know. all the same time you want to pull all three of those images back to The primary machine and then create a manifest list. So, wherever she want to talk about where we're currently thinking,
Urvashi Mohnani: Yeah So last that we had a discussion we were thinking of basically pulling the images from the machines or the VMs onto the primary Not one in machine, learn to the local Mac or Windows basically. So that will probably pulled in a dirt format and then we can push that to the primary machine so that I can end up in your Container Store. So then when you do a partment images from, your client you'll be able to see that manifest list and images there as well. The reason we need to I believe pull it on to the Mac directly versus because the Mac is the one that would know about the connections that we have with the other machines, that's where we store the system connection information, and the farm information and the containers.com file.
Urvashi Mohnani: So that's what we were thinking and that's kind of something I'm testing out. I haven't completed that yet. So that's a work in progress. It's right now the local Linux work is done and the PR is about to be merged hopefully soon. I think it's in its final stages of reviews. So once that's and then the next part would be getting this working on the Mac with the remote case.
Daniel Walsh: Yeah, so the primary machine in that case will be the default. But machine.
Urvashi Mohnani: Yeah, that is yes.
Daniel Walsh: So anybody have any thoughts on this? Is everybody thoroughly confused by what we're doing.
Valentin Rothberg: I think the VMs or the images, the individuals can be pushed from the VMs and then the manifest list be assembled locally and then pushed
Valentin Rothberg: This would prevent pulling the images around.
Urvashi Mohnani: I think the issue there is that the primary machine wouldn't have information of the connections and the farm like that would be stored on the Mac itself. I think because that's what the containers are gone, file So that's why we were thinking, it has to come first to the Mac and then go there before, instead of us trying to figure out how to set up those connections from the primary machines, as well.
Valentin Rothberg: So, if the idea is to push the manifest list, then I think that the push can be done from each of the connections individually to the registry. Then. The MAC client knows, which images have been pushed. He knows the digests. And then on the client side, the thing that has to be done is then to create the manifest list or the OCI index. And it's pretty much just the JSON file. And I think this can be done in the Oci transport locally which works on the Mac and Windows as well.
Daniel Walsh: so when you say on the Mac, you talking about in the machine or locally on the Mac,
Valentin Rothberg: On the client side. So even though the multi-arch images, the individual ones could be pushed directly from the VMs from the machines. Then they're on the registry…
Daniel Walsh: And then you create a manifest Yeah,…
Valentin Rothberg: we have the dig.
Daniel Walsh: you credit manifest list. Assembled with the Digest. Basically, it's just a JSON file. Locally on the back of the Windows box and then you're going to push that to the registry as well, right?
Valentin Rothberg: So once the individual images are pushed, that they're on the registry, then you can create the manifest list or the OCI index with a specific digests. Those have to be known And then you don't have to pull an images around but you can push them. Once then, assemble the JSON file, and push it to the registry.
Urvashi Mohnani: So basically then this one exists in your local storage, You just pushing it directly to a registry.
Valentin Rothberg: yeah, container storage does not exist on the Mac, the strength,
Urvashi Mohnani: I'm talking about the primary apartment machine that has container storage.
Valentin Rothberg: Yes, they're the image. You can push it directly to the registry. So to avoid conflicts on the tech. You can do a digest push. instead of having attack, you can specify the digest, I seamless love unmuting, maybe he has lots as
00:50:00
Miloslav Trmac: Each other. There's a snug in there in that you can't do a digest push without first compress in the data. And image doesn't really have a way to do that right now. you could do it if you know that I just in advance, so You don't.
Valentin Rothberg: but after building the image, the Digest,
Miloslav Trmac: Delete attack, but it's something that probably can be built in some other way.
Urvashi Mohnani: Go ahead, nalin.
Daniel Walsh: He?
Nalin Dahyabhai: One thing I will worry about in that case. two things is you be sharing a credentials that you use to write to the registry with whatever your endpoints are that are doing the bill work and assuming that they can connect to the registry, you also have as most outside you would have to tag it because you can't push the digest until the digest and that may change during the Problem with trying to untagging images that I registry that's doing aggressive garbage collection will get rid of that image very quickly. Perhaps before you even have a chance to write a manifest list that references that image that you just pushed.
Valentin Rothberg: I'm not that worried about the credentials because I would assume that I have to trust the registry where I built my images on because Is where, potentially mine said My sensitive data will be, in any case, I maybe need even credentials for pulling. so, I would guess that the credentials for pushing should be okay.
Urvashi Mohnani: Isn't that more of a requirement than from the user to get into the machines and…
Daniel Walsh: He doesn't.
Urvashi Mohnani: get all the credentials and everything set up there before they can do these builds.
Nalin Dahyabhai: While presumably,…
Valentin Rothberg: Just credentials are passed from the client side.
Nalin Dahyabhai: this is something that we
Valentin Rothberg: You don't have to set them up.
Urvashi Mohnani: Okay.
Valentin Rothberg: Those are part of the rest API.
Tom Sweeney: Was a great discussion and I think we can go on for quite a bit more, but we've only got a couple months left in the meeting is Urvashi could you include a link to the PR that you're working on in the chat?
Daniel Walsh: All right.
Urvashi Mohnani: Yep.
Tom Sweeney: Go ahead and included The notes. And if folks have for the talks, we can do that there. we can add a topic to the next couple meeting if that's appropriate. And thank you all for that. And Brent, did you want to do a quickie on the 5.0?
Brent Baude: Probably not. But what I can do is say that there will be a pod man 4-8 Coming out in. November sometime, and we have planned for, and in some cases begun to Work upon Man 5 that should theoretically come out. Very early next year. And we'll continue to share as we go along with that We intend to branch after we release for eight four, five. I'll repeat that we plan to branch podman 5 will be the main branch. After we release for eight.
Brent Baude: I think that keeps you more on time.
Daniel Walsh: we had talked about a fortnight for real but that'll just be like a 485 of, just bug fixes for four eight, There we'll go into actual right.
Tom Sweeney: Good.
Tom Sweeney: I just don't know whether or not would release not to start over but probably so I would think the 49 or whatever. But five of those that started.
Daniel Walsh: Yeah, and there's no reason to go to 49 unless we had new features. So yeah, we had new features and we had to go before 9 but it'd be very limited features. If there is any
Tom Sweeney: Right. Any other questions comments thoughts?
Tom Sweeney: David did bring up a note. I think aimed at you She in the messages, in the chat. And I'll let you take a look at that, not just that on your own. And so again, the next ball meeting will be on Tuesday, November 21st at 11 am. And the next community meeting will be a couple weeks after that. after the Thanksgiving holiday in the US, on December 5th. Also at 11:00 AM eastern time. with that, I'm gonna close up the recording
Tom Sweeney: And thank everybody for coming here today.
Meeting ended after 00:55:03
```

### Raw Google Meet Transcript

```
Christopher Evich11:13 AM
I love the title
Anders F Björklund11:13 AM
this was the issue link: https://github.com/kubernetes/minikube/issues/17415
You11:32 AM
podman machine ssh keys
* https://github.com/containers/podman/pull/18487
  * https://github.com/containers/podman/issues/17521
Urvashi Mohnani11:54 AM
https://github.com/containers/podman/pull/20050
David Chisnall11:54 AM
If you're doing the control on a developer's Mac, rather than on something in a secure deployment flow, you're already not in a great place for security.
```
