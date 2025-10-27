# Podman Community Meeting Notes 
## October 7, 2025 11:00 a.m. Eastern (UTC-4)

### Attendees
Tom Sweeney, Mario Loriedo, Mark Russell, Tim deBoer, Kevin Clevenger, Lokesh Mandvekhar, Brent Baud, Matt Heon, Nicola Sella, Jan Rodak, Nalin Dahyabhai, Alex Guidi, Neil Smith, Paul Holzinger, Anders Bjorklund, Dan Walsh, Roberto Majadas, Shivang Raghuvanshi, Gerald Seidman

### Topics

 1. oci-dev-binder-hook demo + discussion - Roberto Majadas & Albert Esteve 
 2. Running Podman containers in Apple Container VM - Anders F Björklund
 3. Performance Analysis (podman build improvement) - Jan Rodak
 4. Podman 6.0 updates - Brent Baude

### Quick Recap

The Podman Community Meeting covered several technical discussions, including Roberto and Albert's presentation on a new OCI Dev Binder Hook demo and their exploration of device management solutions for automotive projects. Anders introduced Apple Container, a new product for running Linux containers on Mac, while Jan presented performance improvements for Podman builds that significantly reduced copying times on various platforms. The team discussed upcoming releases and feature development, including artifact handling and library management, while also addressing various technical limitations and future meeting schedules.

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=jw2zKOi-fvs&t=138s)

Meeting start: 11:03 a.m. EDT (UTC-4)

### oci-dev-binder-hook demo + discussion ([1:06](https://www.youtube.com/watch?v=jw2zKOi-fvs&t=66s) in the video)

[Slides](./oci-dev-binder-hook.pdf)

#### Dynamic Device Management in Containers:
Roberto and Albert discussed challenges in dynamically managing device access and configuration in containers for automotive projects. They explored solutions, including leveraging Open Container Initiative hooks, Linux's UDEV for device management, and multi-seat support in Linux for dynamic device handling. They aimed to avoid reinventing the wheel by utilizing existing standards and technologies to address the dynamic discovery and management of devices in containers.

#### UDIF Container Hook Implementation:
Roberto presented a new container hook that uses UDIF to inspect the system for devices to include in a container during its creation. He suggested moving the implementation to GitHub and discussed potential improvements to the annotation system. Daniel asked if the hook only works at container creation time, and Roberto acknowledged this limitation but suggested using UDIF rules for hot-plugged devices. Daniel proposed a potential solution involving a special Podman command to add devices to existing containers.

#### Container Device Management Implementation:
The team discussed implementing device management for containers, focusing on two main use cases: adding devices at container startup and handling hot-plug events during runtime. Matthew suggested creating a dedicated OCI runtime command for device management, while Roberto proposed a combination approach using UDEV rules with container annotations to identify which containers should have devices added. The group agreed that while OCI hooks could be used at startup, they wouldn't work for runtime device additions, and Albert noted that this feature had been considered but was limited by OCI's current hook implementation.


### Running Podman containers in Apple Container VM ([19:49](https://www.youtube.com/watch?v=jw2zKOi-fvs&t=1189s) in the video)

[Slides](./PodmanApple.pdf)

Anders presented on Apple Container, a new product for running Linux containers on Mac using lightweight virtual machines, written in Swift and optimized for ARM. He explained how it works similarly to Kata Containers but with its own containerization library, and demonstrated running Podman containers inside Apple Containers, including handling SystemD and volumes. The discussion covered limitations such as requiring macOS 12.6, networking issues, and lack of GPU support, with Daniel asking questions about multi-arch support and kernel handling.

### Performance Analysis (podman build improvement) ([35:41](https://www.youtube.com/watch?v=jw2zKOi-fvs&t=2141s) in the video)

Jan presented performance analysis on Podman build improvements, focusing on reducing the time taken to copy large context directories into virtual machines. He demonstrated a new API that avoids copying entire files by instead using paths to actual files, resulting in significant speed improvements on macOS (from 73 seconds to 9 seconds compared to Docker) and some improvements on Windows despite the limitations of the 9P file system. The benchmark results showed reduced CPU and network usage with the new implementation, though Daniel noted that even with Docker ignore files, there would still be benefits from the improvement since it avoids unnecessary file copying.

### Podman 6.0 updates ([47:00](https://www.youtube.com/watch?v=jw2zKOi-fvs&t=2820s) in the video)

The team discussed the limitations of VertFS on Windows and the state-of-the-art 9P implementation in WSL. They reviewed the status of PRs, with Jan's PRs awaiting reviews, and discussed the upcoming Podman 6.0 update and its design documentation. Daniel inquired about the timeline for his changes to be included in a release version of Podman, and Baude confirmed that the 5.7 release is approaching feature freeze, with 6.0 development to follow. The team also discussed a potential issue with artifact naming conflicts and agreed to implement checks both during creation and at runtime to prevent errors when mounting artifacts.

### Open discussion - ([55:29](https://www.youtube.com/watch?v=jw2zKOi-fvs&t=3329s) in the video)

The team discussed moving artifacts to Container Libs after the 5.7 release, with Paul noting that the next version would be for Podman 6 and suggesting this could be a long wait for external library consumers. Baude proposed following up with the team to find a solution to this mechanics issue, as they were less concerned about previous worries. 

### Next Steps
 * Roberto to send PDF of OCI Dev Binder Hook presentation slides to Tom for inclusion in meeting notes.
 * Roberto to contact Brent about getting the OCI Dev Binder Hook into the containers organization.
 * Anders to send PDF of Apple Container VMs presentation slides to Tom for inclusion in meeting notes.
 * Reviewers to review Jan's PR for Podman build improvements that's waiting for LGTMs.
 * Brent to assign someone to take over the PR that Daniel mentioned was closed without comment.
 * Daniel to update his pull request to throw an error when creating artifacts with duplicate names.
 * Brent to follow up with Paul about moving Artifacts into Container Libs after the 5.7 release.

### Next Cabal Meeting: Tuesday, November 4, 2025, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1.  None discussed

### Next Community Meeting: Tuesday, December 2, 2025, 11:00 a.m. EDT (UTC-5)

#### Possible Topics:
 1. None discussed.

Meeting finished 11:59 a.m.

### Raw Meeting Chat:

```
Not Captured
```

### Raw Zoom Meet Transcript

The first 11 or so minute of the meeting were cut, so the timestamps in here are off by that amount.
```
11:03
And so, with that, I am showing 1103 on my…
system, so I'm going to start this meeting.
So welcome, folks, to the Podman Community Meeting. Today is Tuesday, October 7th, 2025.
And today, well, actually, we'll go through this real quickly. Generally, we meet on the first Tuesday of even-numbered months for the Podman community meeting. About number months, we do a cabal, which is more of a design kind of thing.
We will move the timing from time to time to make it a little more friendly for folks in India, China, Australia.
Tropics… topics, not tropics. Topics are driven from prior meetings, so request me.
tsweeney at redhead.com, or we have the agenda, feel free to go ahead, as some people have this time, to just go ahead and add topics there. Discussions will be accepted for Podman, Builder, Scopia, or any container-related projects, as you'll see with a couple today.
And then, the meeting notes are in this HackMD, so I'll be taking some notes today, just to make sure the AI doesn't fall down badly.
And otherwise, we'll be using the AI for the meeting minutes, which is kind of neat and nifty and quick.
So, given all that, I'm going to try to stop sharing our screen.
And our first topic for today.
is, OCI Dev Binder Hook Demo.
By Roberto, and… Estebus. Or Albert, I'm sorry.
Feel free to take it away.
Roberto Majadas
Roberto Majadas
00:12:15
Thank you, Tom. So, can you see my presentation?
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:12:21
Looks good to me.
Roberto Majadas
Roberto Majadas
00:12:22
Okay.
Okay, so… Okay, then, this is a…
Proof of concept that we have been working
the last weeks, maybe Mounts Alberta and I.
It's about dynamic discovery… dynamic device access and management in containers.
The challenge that we faced, last year in…
our project that we are working right now, we… Albert and I work… we work in… in automotive.
So, the challenge that we have is the containers by itself, using Quadrant or Potman itself, offers the way to introduce static devices using the device, right?
But we face some situations where we don't know beforehand
Which are going to be the devices that are going to be placed there, because mostly we could have different boards.
And the different boards, saw different devices, and we needed a way to
At some point, when we want to sew a demo in different boards, we leave a way.
To dispatch these different devices, and sometimes it's not enough with
With the static, device flag.
An example that we have is, for instance, when, when…
when we are using the QM container, the quality managed container, Maybe we could have
To give access to this container to the, their, cards, or inputs, or wherever.
As I said, this… sometimes, change a lot before the devices. So, this is the challenge, okay?
The first thing that we thought when we faced the situation is, okay, let's not reinvent the wheel. So, who…
What can't help us to solve this challenge?
So, first thing that we discovered is… is that the… in the Open Container Initiative standard defines a way to introduce hooks in order to modify the behavior of the container configuration even before the start of this configuration. This is,
This is part of the standard, and it's… it could fit for a proposal. Because what we could do is to create a…
Aussie Hook in using the press start stage, and collect, in some way, the information of the devices that we want to use, okay, and inject it in the container configuration.
Other technology that we thought that could be…
useful for us is, well, we thought, okay, this is Linux, we have been working with devices for a long, long time.
We have, technology to handle these devices dynamically. For instance, SystemD and UTIF.
UDIV is the standard way to… to handle the devices in Linux. For instance, every time that you get up your Linux systems, you will…
you could see the UDIV, DMON and the SystemD,
gathering all the… all the UDIF information and all the devices information in order to
Well, sometimes it's in order to rename the devices, or just in order to have an inventory of the devices.
The other thing that, we found, and this is a very old one, is that the multi-seat support in Linux. For desktop defiance.
a way to…
a way to define a seat, like, for instance, when you are running, a desktop instance in Linux, you normally are… you are using the seat zero device, the seat zero seat define it, but… but yes. And that means
from the point of view of UDIV, a set of devices that are attached to that session, okay?
So… Putting all together all this,
technologies together. What we created is the… OCDeadBinder hook.
The Aussie binder hook is just an Aussie hook.
As I said, it… triggers when the start configuration starts.
What this Aussie hood does is to inspect the UDIF database, looking for the devices that you want to include in the container.
Okay. And the funny thing about this is that it's so easy to configure, because, well, it's running outside of Podman, because it's…
It's a different process.
Botman triggers these, hooks
for each stage in the lifetime of the container, and this hook can be configured using annotations. For instance, this is a regular Potman-run command line, and we include this annotation, indicating that we want to include all the devices that
from the point of view of UDF, Attached to the seat zero.
Okay.
The good thing is that
we use the current technologies and very, very battle-tested technologies that we have right now in order to
just to scan the tags or the information that we want from… that we want, from UDIF, and attach those devices.
A demo of this is the same as we saw earlier. If we run in… if we have installed this hook, we can run this Podman container using Tedora, and we added this annotation, and you will see that, obviously, my last dev last year card.
will be present.
Well, that more or less,
What we would like to discuss is, well, first of all, if you like the idea about this hook.
If we could have in test, and to move this into github.com, containers in a space.
Maybe…
For the moment, we only implemented, because it's a very small process, we only implemented the semantic in order to include the devices related with the seat.
X, it's 0, seat 1, sit wherever, but maybe we could improve the semantics of the annotation in order to include
Things like, I don't know, a subsistent task, or… or a specific U…
you, device ID, or device category, or maybe…
I don't know, to include AI renders, or whatever.
So… Well, it's something that we would like to discuss in the community, so…
I guess that's all. Thank you, everyone. Any questions?
Daniel J Walsh
Daniel J Walsh
00:20:09
Yeah, A…
I think it's a decent idea. The question I have is, that would just be at container creation time, right? So if I…
If I plugged in a new device and you devs saw it, that device wouldn't automatically get added to my container.
Roberto Majadas
Roberto Majadas
00:20:28
True.
Daniel J Walsh
Daniel J Walsh
00:20:29
Is that a shortcoming of this?
Roberto Majadas
Roberto Majadas
00:20:32
You're right. It will only include the devices that are present right on the system.
But…
maybe we could improve the hook, maybe not the hook, but we could use UDIF in order to… with the UDIF rules, in order to include
Devices that are hot plugged.
Because, in fact, that's another… issue that we are facing with, with the QM, container, because
maybe we want to include inside things like, I don't know, a USB… something.
And that probably is going to be hot black.
So… Yeah, it's going on.
Daniel J Walsh
Daniel J Walsh
00:21:19
Yeah, but… Because one potential option… And…
I don't know if… I looked, and Giuseppe's not on, but… would be to…
somehow have a special pod man command where you could enter the mountain namespace With privileges and added device.
I mean, I don't know how complicated that would be.
To the existing container, so…
Right now, inside of the container itself.
You know, underneath its security controls, it has limited ability to create device nodes.
But… If… if you could enter the mountain namespace, join the mountain namespace as a container, but still have
The privileges of the… the user or privileges of root, you theoretically could mount
the new content, if you're in rootless mode, or, create the device.
If you're in rudeful mode on the fly.
So, it's just, it's interesting that, you know, does anybody else have any opinions on that?
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:22:34
So Giuseppe has been thinking about doing this as a dedicated OCI runtime command. He was initially thinking about it just for mounts, but I think it would be pretty easy to apply it to devices as well. I don't see any reason why you couldn't do that. And that strikes me as more natural than trying to do it through Podman, like,
I should be able to just ask the runtime, hey, can you add a new device for me? Hey, can you add a new, whatever for me? And then we'll pipe that through to Podman, but I don't… basically, my point is, I don't want to be responsible for this, because we have weird VM-based runtimes that don't have namespaces, etc, etc.
But I think it is… it's a good idea. I could see us exposing it via Podman update, and then…
I don't know if we have hooks for that, but you could probably do some sort of service that just listens for new devices, and then if it detects any, it does a Podman update on the container and adds a device.
Daniel J Walsh
Daniel J Walsh
00:23:32
Well, would that add to a running container, or is that only gonna…
Mmm.
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:23:38
That's a good question. I think it would work on running containers, but that's a… that's another Giuseppe thing, and Giuseppe's not here.
Daniel J Walsh
Daniel J Walsh
00:23:45
Yeah, if you think about the, I mean, the use case with auto is basically they have a… I mean.
A running container.
that's running in the length of the car, and in this case, you know, someone sticks a USB device in, or something like that, into the
you know, into the dashboard, and they would like to have that device show up so that a QM
For those that don't know, QM is the part of the car that's not functionally safe. So it's things like the radio and other types of apps. So in this case, you'd be plugging in a USB device that now
you'd have your unsafe software able to interact with, so it's very legitimate that this use case would be something that
You know, for that. But I think in general, just having a way for you, Dev, to…
to make devices available to containers that are currently running would be an interesting use case. But yeah, Matt, I would be fine with if, you know, we documented a way for CRUN to be able to do that, or… but to have some kind of tooling or scripting that would make that easy for the users, or at least example programs that…
use a C run or a run C to…
to enter a current, you know, the mount namespace, and add a device.
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:25:15
Yeah, I think this is more broadly applicable, like, this is… I could see people doing this on their home systems if they plug in a USB key and they want to get to it in the container. So this is just… I think it's useful, I think it's something we should probably expose.
I'm a little unsure about putting UDEF integration into Podman Mainline, but the ability to update mounts on the.
Daniel J Walsh
Daniel J Walsh
00:25:38
No, no, I'm just… yeah, I don't… I don't think it would be mainline Podman, it would just be… it'd be whether or not you could expose
a command that UDEV could… could then trigger, and then people could write examples, you know. Basically, what Roberto here is doing is he's running a UDev that's…
no, you could have a UDEF script that just…
Automator looks for containers that have a certain, annotation, and then…
You know, adds the device to those running containers.
Roberto Majadas
Roberto Majadas
00:26:12
But what you are proposing, Don, is…
Instead of… to have something looking for the devices?
Instead of that, having,
I think a combination of something?
Daniel J Walsh
Daniel J Walsh
00:26:30
I think a combination of the two, because you want…
I mean, a hot plug event is going to happen after the container is started, but, you know, in your case, you want to basically have a list of devices that you want to have automatically.
Generated when the container starts.
Right, that, that is variable.
So some way… some way for you to list those so that they…
Can either, I guess, you, Dev, once the container starts at them, or…
So what you're doing right now is probably fine, the way you did it. For an OCI at start time, it just doesn't handle what I think is another problem, which is…
If one of those devices gets added after the fact, it does, you know, you have to stop the container. Yep.
Roberto Majadas
Roberto Majadas
00:27:18
I've been thinking about the hot plug situation for a while, X… I think that…
A way could be that you could annotate the container.
Saying… providing some information to the running container?
In order to have this information in the information structure in the container.
And from… on the other hand, you could have, I just said, a potman suf comment, or wherever in the UDF rules, saying that
If this device appears, I want to add this device in… in the containers that has these annotations.
Daniel J Walsh
Daniel J Walsh
00:28:04
Right.
I think we're in violence.
Roberto Majadas
Roberto Majadas
00:28:06
I'll do something like that.
Daniel J Walsh
Daniel J Walsh
00:28:08
Yep, yep.
Roberto Majadas
Roberto Majadas
00:28:10
Obviously, it's… this… I mean, they're…
The situation is the same. The difference is that we are…
Well, I mean, the life cycle is different, because it's not the same when you are… when you have the device, and you…
You don't have it, and you want to, enable it, hot plug.
So, obviously, it's not… the Aussie hooks is not the way to handle the Aussie hooks. Sorry, the Aussie hooks is not the way to handle hot blue devices.
But I think.
Albert Esteve
Albert Esteve
00:28:46
But we had it in our radar. I remember that we had it in our radar when we discovered the OCI hooks, but yeah, unfortunately, the state says that the OCI hook enabled to…
To inject the script are only before or after the creation of the.
Daniel J Walsh
Daniel J Walsh
00:29:04
Right.
Albert Esteve
Albert Esteve
00:29:05
container, so it won't work with that. But yeah, we saw it as promising, and the solution that
We are discussing nosons.
Nice.
Daniel J Walsh
Daniel J Walsh
00:29:15
I mean?
Albert Esteve
Albert Esteve
00:29:16
like.
Daniel J Walsh
Daniel J Walsh
00:29:16
I mean, basically, you would do it as an OCI hook at startup, and then have UDIV, but the annotation would be the way to figure out which containers you want to add these devices to.
Albert Esteve
Albert Esteve
00:29:28
Right.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:29:30
We're starting to crunch up on time a little bit here, and we did have one open question about getting this into the containers org. Is that something, Brent, you can talk with Roberto or Albert about going forward, or what's the best way forward there?
Baude
Baude
00:29:46
Yeah, I can… I can talk about it, yeah, Roberto, you can… You can hit me up.
Roberto Majadas
Roberto Majadas
00:29:55
Okay.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:30:07
And I just sent this email in the chat there for you, Roberto. And is there any other questions or comments here?
And I will ask Roberto, if you could send me a PDF of your slides, I'd appreciate it. I'll include it in the meeting notes.
Roberto Majadas
Roberto Majadas
00:30:22
I will send it in a moment.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:30:33
I'm not hearing anything else at the moment?
Huh?
I will thank Albert and Roberto for coming here and presenting. It was a great talk.
And we'll turn it over to Anders, who's going to be talking about running Podman containers in Apple container VMs.
Anders F Björklund
Anders F Björklund
00:30:50
Yeah, I hope you can hear me. Let's see if I can share my screen as well.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:31:09
Oh, looks good.
Anders F Björklund
Anders F Björklund
00:31:15
See if we can start it as well.
Nope.
Oh, well.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:31:27
It's fair.
Anders F Björklund
Anders F Björklund
00:31:27
Can you see it, even though I was unable to enter presentation mode?
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:31:32
Yep. Yeah, I think that'd be fine, I just scroll through.
Anders F Björklund
Anders F Björklund
00:31:37
Yeah, so I, I was gonna talk about this, new, product called Apple Container.
And it was something that Apple announced on the developer conference as a way to create and run Linux containers on a Mac using lightweight virtual machines or microVMs.
It's written in the Swift language that you might not have encountered, and it's optimized for ARM.
It's still only at version 0.5, but it's getting along very nicely. I will show you where it's at.
It's similar to CATA containers, if you know that from before, so it's running VMs for each container, so it would be more accurate to say that it actually runs Linux container images.
But, that's, common mix-up between those two. It's also kind of similar to the WSL for Windows.
Except in this case, we don't have a shared kernel. We have one kernel for each and every container that we start.
Daniel J Walsh
Daniel J Walsh
00:32:50
So, would you say it's similar to K-Run more than Carter, or would it.
Anders F Björklund
Anders F Björklund
00:32:55
Yeah, it's similar to RunV and KRUN, yes, except that it's not using… it's not OCI.
since it's written in Swift, they have done their whole, their own containerization library.
Daniel J Walsh
Daniel J Walsh
00:33:10
But basically, it's a kernel, and then it runs PID1 is the process inside the container.
Anders F Björklund
Anders F Björklund
00:33:16
Yeah, so, similar to, it will actually use the CATA kernel.
And then it will add an init.
to the VM, and then boot the VM, and then add your root diffus.
So,
it does not read the kernel or the init from the container root file system. It will add them from the…
container system.
So, these, containers, Apple containers, are fairly limited, especially on Mac OS 15. You need macOS 26 for all the features to work. One of the features is for one container to be able to talk to another container over the network. That does not work.
Also, volumes were broken, and users were broken. There were a lot of things broken, but 0.4 made it almost work, and 0.5 seems to be…
having the basics, at least. So,
Since this is a VM, I thought we would run containers inside of the VM.
And it basically,
work something like this. You will run your Fedora, your operating system in your VM with a command called container run, which is very similar to Docker run or podman run.
And then it will start, and it's a micro-VM, so it starts in a second compared to, like, 10 seconds, or what have you, on your regular VM.
And then you have, fairly standard container environment where you can install, Podman, for instance.
And then you can run, pod run, so that's… that's simple, right? You… you run the container, and then you run even more containers inside the container.
And there was just one problem, and that was if you wanted to run the… Service.
Then you would try to start, the socket, right?
And then we would normally use SystemD, but since this is using a special init system, also written in Swift.
System D will not, cooperate, since it's not been, started with, SystemD.
So, we could have it as a workaround. We could start the…
Padma system in the background, indefinite, and then we could connect to it, and we see that it has mounted the Z groups and everything.
So, it was working this time for a while.
But in the later versions, they have actually now added support for SystemD as well to this VM initd, so the VM will boot with VM initd, do its stuff, and then it will hand over to SystemD that will,
Complete the, the… The process and start your, various, init-type things.
So
Since this is a container file or docu-file-based system, it's… at the moment, it's bundling build kit, but they are rewriting their own build kit in Swift as well, so it will have a native builder.
But we can,
make our own image, add SystemD to it, set this as the entry point, and then we can run this… we can build this image, and we can run it. And then we have SystemD running as the main process.
And then we can exec and start a bash.
Because, the main, console, or what have you, is, now occupied by SystemD, normal logging output.
And then we actually have SystemD running in the VM, or container, what have you.
And, it works.
And we can also go ahead and add Podman to the basic image installation, then we don't have to wait for that as well, so we can bundle everything into this image.
And we can also add… it's a fairly recent features, volumes are now working.
So we can add a volume for storing our container images and containers on, so we have it on a separate disk from the root file system.
And then you can mount it using a fairly, familiar syntax from,
Podman machine in it, or even Podman, run.
Daniel J Walsh
Daniel J Walsh
00:38:00
I think… Are they using Vert.iofs for this, do you know?
Anders F Björklund
Anders F Björklund
00:38:04
And it's about IOFS for the mounts, that is correct.
And, the interesting part is for the file systems, and for the file systems that they are using.
X4. So… so each of these, systems is actually a separate image, so the…
The kernel is added as a binary from the Carter containers, and then you have the Swift stuff.
the init VM and so on, that's on the init file system. And then you have your root file system. In my case, it is Fedora. So all the layers from that Fedora image are unpacked and put into this root FS.
And then you can, edit that.
And, since I created an additional volume, that is another X4,
Create that in a separate namespace, so containers are under containers, and volumes are the volumes.
So, it eats up a lot of disk, but I guess it's fairly performant, so there's pros and cons to collapsing that file system like this.
Yeah, and as I mentioned, you… you want to run this on macOS 26. Everything I showed today was run on macOS 15, so it works, but it has severe networking implications, and they're not really accepting bugs.
There was an issue open with Podman about adding support for this.
My… my own goal was to try to add this as an alternative to WS Rank 2 for the Lima product, so that you can run your
VMs from container images instead of from the cloud images.
And, I also thought I would mention that it's the CNCF 10th anniversary, so we're also celebrating 10 years of Doctor Machine, and Minikube Machine, and Podman Machine, and Lima, so…
Been doing this for a while.
And feel free to contact me if you think this is interesting. There was a, issue opened, also for Podman as an alternative to Podman Machine on Mac, but I think it was closed by Brent, so…
Something to discuss, perhaps.
Daniel J Walsh
Daniel J Walsh
00:40:36
Were you able to get,
Pyman machine… Pyman Remote from the host to interact with the Pyman service inside of your machine?
Anders F Björklund
Anders F Björklund
00:40:45
Yeah, so when I did it in Lima, I was just starting SSH on the VM.
But I think you should be able to do it over Virt.io as well. It was just that it was quite buggy after a while with sharing files, so I went with the safe option, which was SSH.
Daniel J Walsh
Daniel J Walsh
00:41:01
Done.
There is, by the way, there is a… I believe there's a Fenora-init container image that does all the SystemD stuff for you, so you wouldn't have to…
So if you're based on…
Anders F Björklund
Anders F Björklund
00:41:11
Yeah, but it was just… you can add… I did one example where it's running Kind, and then there's one when it's running Kubernetes, and so on. So, since it's a Dockerfile, you can fairly easily customize it.
People have a bit more learning threshold when it comes to Bootsy and so on, so…
Daniel J Walsh
Daniel J Walsh
00:41:32
Does this container handle the multi-atch stuff correctly?
Anders F Björklund
Anders F Björklund
00:41:37
Sorry, the multi…
Daniel J Walsh
Daniel J Walsh
00:41:40
It's on it.
Anders F Björklund
Anders F Björklund
00:41:41
We only support one architecture.
Daniel J Walsh
Daniel J Walsh
00:41:43
Okay.
Anders F Björklund
Anders F Björklund
00:41:45
So, it's only for Mac Silicon, but
It's supposed to do it eventually, I think it's quite buggy at the moment. It was pulling old architectures from the registry, which was bloating the disk even more, but I think they are getting that fixed.
Daniel J Walsh
Daniel J Walsh
00:42:03
And they also don't handle GPU passively at this point, right?
Anders F Björklund
Anders F Björklund
00:42:07
No, not as far as I know. It's using the regular VSED, so everything that the virtualization framework on macOS does, it's… it can do.
But for Podman Machine, we've dropped back to hypervisor Framework to access GPUs and stuff, so…
Daniel J Walsh
Daniel J Walsh
00:42:26
And does it handle the stuff that GBProxy's handling, where if I bound to a.
Anders F Björklund
Anders F Björklund
00:42:31
Yeah, so each of your VMs will get a proper IP on the virtualization network, but it's isolated from each other, so that was one of the reasons why networking didn't work on microscopic.
Daniel J Walsh
Daniel J Walsh
00:42:48
Right, but if I wanted to just bind to port 80, run a container that's running Apache, and bind to port 80 and have that exposed to the
So the max…
Anders F Björklund
Anders F Björklund
00:42:57
Yeah, that's not handled for you either, so…
Daniel J Walsh
Daniel J Walsh
00:43:00
Okay, yeah.
Anders F Björklund
Anders F Björklund
00:43:02
So I was using the Lima host engine to do that, but you can also use SSH forwarding, or what have you, probably the GBProxies.
Daniel J Walsh
Daniel J Walsh
00:43:10
Yeah.
Anders F Björklund
Anders F Björklund
00:43:15
Yep.
But my goal is to have this on parity with WSL2, and I think it… it's more or less… it has the basics.
And while I was debugging this, or testing this, I also, made it run with, CATA containers, so you could run,
it on Linux, because, WSL requires Windows, and…
this Apple container requires macOS, but everything in CI and all the developer machines were Linux, so I wanted something container-based.
So I was running, Carter Container or RunV. There's also one older product called RunQ, which uses QMU directly. It was kind of neat as well.
Daniel J Walsh
Daniel J Walsh
00:44:06
And how up-to-date is the… the kernel that's running in there. Is it a…
Anders F Björklund
Anders F Björklund
00:44:11
It's a slightly older version of,
data containers. You can build your own kernel, but, you get,
See, if I dump the car now, it's 6, something, 6'6".
Peace.
I thought I had it in the output somewhere, but, never mind.
But it's fairly new, and you can replace it.
Daniel J Walsh
Daniel J Walsh
00:44:40
But you… could you… could we do something with Bootsy type of thing?
Anders F Björklund
Anders F Björklund
00:44:45
Do you mean, read the kernel from the image, or…
So, so, in the container run command, you have a dash dash kernel where you can supply your own file.
So I guess you could extract it from the…
Daniel J Walsh
Daniel J Walsh
00:44:58
Yeah, but not automatically, okay, yeah.
Anders F Björklund
Anders F Björklund
00:45:01
But not automatically, no.
Daniel J Walsh
Daniel J Walsh
00:45:03
You know, the kernel probably has to have special flags to be able to support.
this, I would figure.
Anders F Björklund
Anders F Björklund
00:45:10
Yep.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:45:11
We're starting to run up against the clock a little bit here. Is there any…
Anders F Björklund
Anders F Björklund
00:45:15
I will just, I will just leave you with the obvious.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:45:19
Yes.
Anders F Björklund
Anders F Björklund
00:45:20
Bugs are not the facts, well…
Yeah, containers are not virtual machines.
Daniel J Walsh
Daniel J Walsh
00:45:30
Very interesting.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:45:32
this.
Thank you, Andrews. If you wouldn't mind, if you could send me the slides in a PDF, that'd be great.
Anders F Björklund
Anders F Björklund
00:45:37
Yeah, I will do that.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:45:39
African stubbish.
Anders F Björklund
Anders F Björklund
00:45:39
varying as well.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:45:41
Alright, thank you.
And our last topic for the day is from Hansa, talking about performances, that he's, performance analysis on Pod1 Build Improvements. Hansa.
Jan Rodák
Jan Rodák
00:45:52
Yeah, sure. I will share my screen, well…
Anders F Björklund
Anders F Björklund
00:45:57
You were trying to very briefly.
Jan Rodák
Jan Rodák
00:45:59
Yeah, okay.
Anders F Björklund
Anders F Björklund
00:46:03
I'm seeing firms right now.
Jan Rodák
Jan Rodák
00:46:07
Sure.
Anders F Björklund
Anders F Björklund
00:46:07
Can you unshare me somehow? I will try to find my way back into Zoom, and I see if I can do it.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:46:14
Yeah, it should be at the very top of the Zoom window. It should be…
Anders F Björklund
Anders F Björklund
00:46:17
Yeah, unless you hide it.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:46:19
Yeah.
Anders F Björklund
Anders F Björklund
00:46:22
My screen…
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:46:28
Thanks, Andres.
Anders F Björklund
Anders F Björklund
00:46:31
Yeah, well. Okay.
Jan Rodák
Jan Rodák
00:46:34
So… can you see the issue?
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:46:39
Yes.
Jan Rodák
Jan Rodák
00:46:40
Yes, great. So, behind… either behind my improvement, what I did is…
That when you are building image and you have big, context directory, the…
Portman will copy all files which are placed in the context directory into virtual machine, yeah? And this takes time, and if context is huge, it takes more time. So, and if you are not using,
all files, which are in that context directory, you can
avoid this using the Docker ignore file. But, well, if you don't have this file, you will run into these problems with copying everything inside your bottom machine. So.
Yeah. Improvement is…
I… so I did this improvement in a way that I implemented a new API that,
that instead of getting a whole tarball with all context, we'll get paths to actual file, which should be mounted in VM.
and use… use this, use these files instead of copying them. There are… there is one catch with Hypree on Windows, because, P9…
9P file system, or protocol for file system, doesn't correctly, handless,
translation between, NTFS file system to Linux Word.
And, ReSL did this with…
new layer over this, and it is their proprietary stuff for VSL, so…
this doesn't work, in Hyper-V.
So, yeah, this is sketch, but most of… so… Here's Benchmark, how are you?
benchmark this improvement. So, I will measure time, how long the build command takes, but here is a contact directory. The context directory contains 10 1GB files.
and one Dockerfile, and all… and Dockerfile just copied just two files inside the image.
Yeah, this is pretty simple. And mo… people who was on team demos already saw improvement for macOS, but as part of my thesis, I worked on tooling to run this benchmark automated.
And also on macOS and Windows, and in feature on Linux also. So, here are results for…
For macOS, I ran it against Docker to compare it.
Same benchmark 5 times for each platform, and…
Here are those results. Docker takes 31 seconds, which is… Pretty… pretty interesting how… It works, because…
Yeah, I will get to it later. And for Portman version 5.4, we get 73 seconds, and for custom version of Podman, which is built based on that PR, it took just 9 seconds, yeah? Which is…
Pretty good improvement.
Yeah, and here are averages of usage, of CPU, memory, networking, sending, and receiving, also discrete reads and writes.
Yeah, and also, here is comparison what was different between, each… each benchmark, yeah? So…
There is only one, small differences between host memory, Which is…
which is 100MB, which doesn't matter, I think. And also, I run it with all CPUs, for that VM, so 12 CPUs.
And, yeah, that's…
that's… these are those differences, which are basically version, and that we are running permanent in AppIHV, comparing to Docker, which they use own implementation of this.
And… yeah.
Here are graphs for custom version. These are pretty boring because it was pretty close.
Yeah, so…
Pretty short, and… but for, older version of Podman, we can see here that most… most time was usage of CPU over the 50%, because
the files was, put into TAR file and then sent to VM, yeah?
And… Also… Yeah, this is shown in a network usage that lots of
The resource of sending and receiving, these two… overlaying these two lines, so you can… you cannot see the blue, blue one for sending stuff.
Yeah. It's also… disk usage for all the version, and here is for Docker, and here is
in the beginning, also some huge usage of CPU, so probably Docker copied somewhere, or…
do some transfer, but I didn't get how actually Docker is implemented, and how Docker does this. Yeah, these are results for macOS.
And… right now, let's move to Windows.
And on Windows, it is pretty different, because it uses Pina… 9P mounting file system.
And it is pretty slow, so… the difference is… is…
much smaller between our version of Podeman and, the…
Version with improvement, just a few seconds.
Yeah, and for Docker, It is, well, much… much bigger.
Or take a much longer time.
Yeah, and for this benchmark on Windows, I use a backing hypervisor VSL.
And for VSL, I set global to 2GB, and all CPUs for machine on which I run the tests, yeah? And on VSL, I find an interesting
Stuff that, when you… put the, the limit VSL with memory, it, it starts.
be slower, so… I run also this width much higher
Much higher, memory, with 8GB, yeah?
And… here are the…
times are slower, much faster, sorry. Yeah, so here you can, improve it also.
Yeah.
So… Yeah, that's… That's it. Any questions?
Daniel J Walsh
Daniel J Walsh
00:54:50
I seem to be the only one talking, but I would… I mean, right now, you're trying to do a real horrible case where you're not using Docker Ignore, but I'd still think you'd get a speedup, even if you were doing, with Docker Ignore, because obviously you're having to tear up
Those 2GB files, copying it in, untie them into the machine, and then allow…
Jan Rodák
Jan Rodák
00:55:14
Yeah.
Daniel J Walsh
Daniel J Walsh
00:55:15
to basically tie them up again, to put them into storage. So you're doing twice as much work for the
you know.
Jan Rodák
Jan Rodák
00:55:25
Yeah.
Daniel J Walsh
Daniel J Walsh
00:55:25
Potentially.
Jan Rodák
Jan Rodák
00:55:27
Yeah, yeah, but in this case, well, I didn't use…
Daniel J Walsh
Daniel J Walsh
00:55:31
You're proving the point by making it better. Yeah. Yeah. But it was good.
I guess the only other question, does VertiFS not work on Windows?
Jan Rodák
Jan Rodák
00:55:48
Well… For VSL, it doesn't… well, it doesn't work, or… well, it wasn't available for VSL.
Yeah, at least on my machine. Yeah, I just run, put my machine in it, and it doesn't dig inside that much. I just find out that on Hyper-V, there is missing translational layer over the 9P mount.
Yeah.
Daniel J Walsh
Daniel J Walsh
00:56:17
Yeah.
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:56:18
Even on…
Baude
Baude
00:56:19
In general, there's no… there's no WSL… I mean, in general, there's no VertiOS S daemon.
or implementation on Windows.
Daniel J Walsh
Daniel J Walsh
00:56:29
Okay.
Baude
Baude
00:56:29
In general.
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:56:31
Even WSL is using 9P. It's admittedly a very customized 9P that's directly in the kernel, but it seems like that's just state-of-the-art in Windows right now.
Daniel J Walsh
Daniel J Walsh
00:56:48
So, I guess, I guess.
Baude
Baude
00:56:51
WSL is open source now, Dan, you could do a bird.
Daniel J Walsh
Daniel J Walsh
00:56:56
Oh, my face.
Yeah, my comments are no… should not be interpreted as me volunteering to do anything.
Just curiosity.
Jan Rodák
Jan Rodák
00:57:06
Yeah.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:57:07
Any other questions, comments here?
Great, Hansa, thanks so much for doing that.
Good on Matt.
Baude
Baude
00:57:17
For the… for the record, is this stuff gonna be part… is it part of 5-6 already, or…
Are there still some things trailing to go in that we'll see in the next release?
Jan Rodák
Jan Rodák
00:57:28
Well, PR's still waiting for reviewers, yeah.
I got 2 reviews from you and Addy, but yeah, missing, LGDMs and Auto Flex.
Flaggers.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:57:43
Also, could you put the PR you're waiting for reviews to send some chat, and…
Jan Rodák
Jan Rodák
00:57:47
Yeah, yeah, yeah.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
00:57:50
Maybe we'll dig some people up.
I'm gonna, get pinged offline a little bit by somebody named Anders, said there would be a Podman 6.0 update today. Matt or Brent, do you have anything to share on that?
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:58:04
The high-level design that we committed to is now in the repo, so, you can see in… it lives in contribib slash design docs, but, the list of what we're hoping to accomplish is up there, as is the design doc for KonMonv3, which is one of the big features we're hoping to get in.
On the whole, I'd say we're on schedule and sticking to our spring and next year timeframe.
Baude
Baude
00:58:30
There's also a new design document from John Hans on, Quadlet.
RESTful API.
That went up today, I believe.
Daniel J Walsh
Daniel J Walsh
00:58:43
So I… I made a bunch of changes to the artifact command, and other people, have. When could I see those in a release version of Podman?
I mean, there's 3 more of I'm gonna go in, but…
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:58:57
57 is… second week in November, I want to say?
Daniel J Walsh
Daniel J Walsh
00:59:01
Okay, so it's fairly close.
Baude
Baude
00:59:04
Except that the RC is being cut.
Very soon, right, Matt?
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
00:59:10
Yes, so we will feature freeze and start cutting next week, I wanna say? It's either next week or the week after, I'm not 100% on that, but we're getting very close to 5-7 feature freeze.
Daniel J Walsh
Daniel J Walsh
00:59:25
Alright.
Oh.
Baude
Baude
00:59:26
And then, at that time.
Daniel J Walsh
Daniel J Walsh
00:59:28
Yeah.
Baude
Baude
00:59:28
Maine is gonna branch to 6. I mean, Maine is gonna be a 6 development.
Daniel J Walsh
Daniel J Walsh
00:59:33
Right.
Baude
Baude
00:59:34
So, 5-7 is the last…
It maybe isn't gonna be the last, but…
It's supposed to be kind of the last feature release.
Daniel J Walsh
Daniel J Walsh
00:59:46
Oof.
Baude
Baude
00:59:47
I don't see any reason why you can't get your stuff in, we just need people to review it, and on the one that you pinged me about today.
Matt is gonna review it, as well as… Nikola.
Daniel J Walsh
Daniel J Walsh
00:59:59
Yeah, no, the one I was really curious about is the one that got closed, but I don't know, without… without comment.
But.
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
01:00:08
I think we could have someone take that one over. I think it was a community contributor who just, didn't want to work on it anymore.
Daniel J Walsh
Daniel J Walsh
01:00:15
Yeah, I'll take it over if that's the case, but… Wow.
I mean, it was 90% done, that's why it was surprising, but okay.
Baude
Baude
01:00:28
Well, just, let us know, Dan, if you're gonna wanna take it over, or you want someone from the team to do it.
Daniel J Walsh
Daniel J Walsh
01:00:33
Wow.
All right.
Baude
Baude
01:00:37
Actually, why don't you…
Daniel J Walsh
Daniel J Walsh
01:00:40
I can let AI do it for me.
Baude
Baude
01:00:42
No, I'd like to actually assign someone in particular on that.
Daniel J Walsh
Daniel J Walsh
01:00:46
Yeah, if you've got someone to take it over, that'd be great.
Baude
Baude
01:00:49
Yeah.
I'll, I would imagine you'll see something tomorrow.
Daniel J Walsh
Daniel J Walsh
01:00:54
Yeah, as long… long as we can get it in for the next release, so I can…
move my release around Lama.
Baude
Baude
01:01:01
I have somebody in mind.
Daniel J Walsh
Daniel J Walsh
01:01:02
Yeah.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
01:01:04
Mr. somebody.
Okay, any other questions or comments?
Daniel J Walsh
Daniel J Walsh
01:01:09
I guess… I guess the last one… so, the last one to go in is basically on modifying the title.
field of the artifact, so I think we should have a quick discussion on that. So right now, you could have conflicts on the artifact name.
So, it's brought… brought… for those that don't know, you can do a Podman artifact.
add dash dash append, and then give a file name. And one of the changes…
I want to allow is to specify an OCI, basically a name for that object you're adding. If you just add a file to an artifact, it ends up being a checksum, by default, and…
what I want is when I mount that into a container, to have the original name. So, say I add a file called foobar, I want it to be, when it's mounted into the container, to be named FUBAR. But if I…
right now, artifacts does not have a rule that I couldn't add two objects to the artifact, both named FUBAR, and in that case, the, you know, when I mount it, there's obviously, you know, it's not going to work properly, and we don't have a defined behavior on what that would mean.
you know, for now, I would just fail and say you're not allowed to mount it, because it's the same name twice.
you know, potentially, or when you go to add the second file that's named foobar, then blow up. So it's either at creation time that we blow it up, or at runtime, you know, when we try to mount it, that it would blow up.
the thing is, I can create an object like this.
outside of Podman, and we still need to blow it up when we mount it.
So, I mean, we're gonna have to handle the mount case already.
So the question is, do we… do we want to check when you're creating it to tell them not to create two objects with the same name?
Or do we just let them crate them and then deal with it only if you mount it?
Any thoughts?
Baude
Baude
01:03:19
I think in the Podran case, I would do both.
Daniel J Walsh
Daniel J Walsh
01:03:23
And…
Baude
Baude
01:03:25
That covers than if they used, like, manifests to create it.
Daniel J Walsh
Daniel J Walsh
01:03:30
Okay.
I'm fine with that. As long as we have that conclusion, I'll update my pull request to…
Baude
Baude
01:03:38
Does anyone like Paul disagree?
Or Nylon?
Paul Holzinger
Paul Holzinger
01:03:43
I think both makes the most sense.
Baude
Baude
01:03:51
Okay.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
01:03:54
One last call for any other questions or comments.
that?
Baude
Baude
01:03:59
I was gonna say that, I'm getting…
This is a topic that we are going to have to do… to deal with, which is also artifacts. I'm getting.
Questions from, other interested parties on make… on getting artifacts moved into container libs?
And we've been hesitant to do so, because we still were tweaking API, but, I was thinking about proposing that we do that after the 5-7.
Release.
What do, what would others say? You think that's a good time?
Paul Holzinger
Paul Holzinger
01:04:41
I… I think the…
Well, if you do it after 5-7, which, timing-wise, is now pretty much guaranteed, I guess.
The… the thing is that the next version… like, the entire branching strategy follows Potman, so the next…
cut version on the monoreapos would also be for Portman6, so that could be a long time for whoever wants this new library, using externally.
Baude
Baude
01:05:13
Do we have a way to wiggle that?
Paul Holzinger
Paul Holzinger
01:05:18
Well, we can cut the release, but I know that if you're talking about the consumer cryo.
We have the… Soft agreement to keep our versions locked, like, synced.
To not mess with the storage and so on.
Which is very…
Matthew Heon (Red Hat, Inc.)
Matthew Heon (Red Hat, Inc.)
01:05:36
When we don't… when we don't hard-lock these things, very bad things have happened in the past.
Baude
Baude
01:05:42
Sure, sure, but I gotta see a way through this.
Okay, so I'll follow up with you guys, but the gist of it is, I guess we're less worried about what we were worried about before, now it's more mechanics. Is that fair to say?
Paul Holzinger
Paul Holzinger
01:06:01
Yeah, I mean, we haven't changed much there.
So I think it's fine to move.
It will still be the same pain of if we have to change something, but, well, that's just how it is.
Baude
Baude
01:06:15
I guess that's APIs.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
01:06:17
Yup.
Paul Holzinger
Paul Holzinger
01:06:18
Yeah.
Tom Sweeney (Red Hat, Inc.)
Tom Sweeney (Red Hat, Inc.)
01:06:20
Hey, before we run out of the clock here, I'm just gonna point out real quick that our next
Project, yeah, Bobman Community Meeting is on December 2nd at 11 a.m. Our next Cabal meeting is coming up next month on Tuesday, November 4th, 2025. One last call for any other topics, otherwise I'm going to stop the recording.
Right, folks, thanks for coming today.
```
