# Podman Community Cabal Meeting Notes
### Attendees

Alberto Faria, Anders F Björklund, Ashley Cui, Christopher Evich, Daniel Walsh, Ed Santiago Munoz, Gerry Seidman, Giuseppe Scrivano, Johns Gresham, Leila Hardy, Lokesh Mandvekar, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Shion Tanaka (田中 司恩), Steve Gordon, Tom Sweeney, Tyler Fanelli, Urvashi Mohnani, Vivek Goyal

### January 16, 2024 Topics

1. podman kube apply
   - Remove it?
   - Add support for pulling kube.yaml? Others?
2. Podman support for VMs
   - crun-vm - Dan Walsh / Alberto Faria
 	- https://github.com/containers/crun-vm
   - Krun and Podman - Tyler Fanelli
3. Image ID consistency - Matt Heon
	3.5. Details in [#21198](https://github.com/containers/podman/issues/21198)
4. Podman v5.0 Schedule Updates - Matt Heon

### Meeting Notes
Video [Recording](https://youtu.be/pOiu3qoplAA)

Meeting start 11:02 a.m. Tuesday, January  16, 2023

#### podman kube apply - Dan Walsh - (1:00 in the video)

A community member asked if `podman kube apply` should still exist.  It takes a yaml file and applies it to a Kube instance.  We were given feedback that we should not have done this as we didn't supply full Kubelet commands.

Should we drop support for apply or fill in the additional features?  Urvashi doesn't think we should add more features.  Urvashi's thinking is since the apply command can be useful, we should add documentation saying we will just supply apply, or perhaps add just the retrieve command and document that.

We pushed for Kube at one point, given requests from the community.  We don't know how many people use the apply command, but Podman Desktop demos it, so there is likely some demand.

Urvashi to add an item in the Red Hat team’s backlog to have the `podman kube retrieve` command created and then all of this documented.

#### crun-vm - Dan Walsh / Alberto Faria - (7:30 in the video) -

##### [Repo](https://github.com/containers/crun-vm)

Not yet packaged in Fedora, but the packaging work is underway.  Take a container with a VM image or an artifact and then just run it as a VM.  So taking a VM and running it as a container.

### Demo - (10:20 in the video)

Showed a `podman run --runtime crun-vm -it --rm --rootfs fedora-39/ ""` command to run the image.

He ran a cloud based image and got to the command prompt.  He was also able to pass a password into another VM.  He showed another example where he was able to mount a directory witin the VM.  He was able to verify that.

It's an OCI runtime, not specific version of Podman required.  Usable with Docker too.

You could theoretically snapshot a container and run it later.

It's similar to Kubevirt, and there's some confusion with that.  The team is trying to flesh out where it fits.  It uses Libvirt under the covers.

#### Krun and Podman - Tyler Fanelli - (19:16 in the video) - 19

Krun is packaged with crun.

What is libkrun?  It's architecture is up to the container runtime.  A container context is managed by crun which runs a lightweight VM that is run by libkrun.

Given the workload is in a vm, it can be protect other applications running within.

More protection is needed to protect against leaking secrets and other high value resources.

The solution is Confidential Computing.  It relies on data in memory, rather than on rest on a disk or database.  It works on a Trusted Execution Environment, which varies between hardware manufacturers.

All data can be encrypted, so nothing in the VM can be read.  It's then written to a LUKS-encrypted disk.

The system must be attested in order for this to work.

How can you verify attestation?
       * Hardware: verify that you're running on TEE hardware from chip supplier
       * Software: Verify that our entire environment (and only our environment) is included in secure enclave (that being the VM)
    
4 step attestation protocol for workloads/containers/VMs running on TEE hardware
  * Request - Challenge - Attestation - Response
   * libkrun adds a 5th step, Registration

Keybrokder Client (KBC): The guest workload being attested
Key Broker Server (KBS): Server with pre-registered measurements and workload information for comparison.

Recall that libkrun’s application data/code is hidden behind LUKS-encrypted disk.  The passphrase to unlock this disk is stored on attestation server.

Podman's role

 * Podman facilitates the bring-up and aids in the attestation of krun.
 * Buildah helps to create it.
	* Use the --cw option to create the image appropriately.
* Podman offers crun/krun runtime, which runs containers with krun protection.
* krun facilitates KBS attestation with server to verify environment, receives the LUKS passphrase, and unlocks the LUKS disk to begin running the workload.
    
Once set up, libkrun protects you.

##### Demo - (30:14 in the video)

On the right he had a attestation server running.  On the top left he has a webserver running with the secret in memory there.  Nothing is confidential at the moment.  When talking to the server it shows the secret.

He then ran the webserver confidentially.

When he mounted the filesystem in the bottom left now, and was still able to get the secret.  He tried dumping the memory again, but this time was not able to find it as it had been encrypted.

Next Steps:
	ARM CCA support
	Buildah support for other attestation servers.
   	    	 
Podman Build has the same support given it's pulling in Buildah Build.  

No process on the host is trusted.

They are still looking at how to host images in registries, rather than just using images created on the local host.  Workin on allowing pusshing to an OCI registry now, with decryption done once the image is presented locally.

Vivek thinks that at some time in the future, what you can do in confidential computing can also be done in crun.  

The difference between the two is crun uses VM, and krun uses a container.  But it's kind of getting towards a kubevirt environment.

Looking at the virtulization stack for future.  So far are Linux centric, still talking about expanding Podman machine to run VM's on other platforms.

#### Image ID consistency - Matt Heon - (46:22 in the video)

Details in [#21198](https://github.com/containers/podman/issues/21198)

#### Podman v5.0 Schedule Updates - Matt Heon - (46:45 in the video)

Podman main branch is now v5.0, lost of breaking changes.

Late January, early Februar is the first planned RCs.  Planning to be done at the end of February for v5.0.  Expected to have an extended Release Candidate (RC) cadence.

Apple hypervisor will be used in podman machine on mac.

#### Open discussion - (49:10 in the video)
1. Being able to run a container with a VM in a pod.  Alberto thinks it's possible.  More work.
2. qemu code will be left in podman machine for non-mac environemnts.
 
### Next Cabal Meeting: Tuesday, February 20, 2024, 11:00 a.m. EDT (UTC-5)


#### Possible Topics
1. Podman kube to handle vm's too?  Vivek.

### Next Community Meeting: Tuesday, February 6, 2024, 11:00 a.m. EDT (UTC-5)

#### Possible Topics:
1. Podman at home

Meeting finished 11:59 a.m.

### Raw Meeting Chat:

```
Daniel Walsh11:14 AM
repo: github.com/containers/crun-qm
Lokesh Mandvekar11:14 AM
crun-vm
Daniel Walsh11:14 AM
Yup typo
Anders F Björklund11:15 AM
I don't think cloud has a password
Shion Tanaka (田中 司恩)11:17 AM
Is there a mechanism to cache the startup process? Or are there any plans to expand it?
Vivek Goyal11:19 AM
annotations?
Shion Tanaka (田中 司恩)11:20 AM
Thanks, I will try crun-vm.
Alberto Faria11:21 AM
github.com/containers/crun-qm
github.com/containers/crun-vm
Daniel Walsh11:23 AM
Cool slide
Vivek Goyal11:23 AM
indeed
Daniel Walsh11:30 AM
podman build --cw ... also exists now.
Daniel Walsh11:32 AM
Even root on the host running libkrun will not allow access.
be allowed access,.
Christopher Evich11:39 AM
I always worry about the attestation server being the SPoF here.  Any attacker that compromises it and a host, can effectively run untraceable, and difficult to detect "workloads".  Granted this may be hard to pull off, but the consequences are also really really really bad.
Miloslav Trmac11:41 AM
I think the question to ask is "compared to what baseline?" Without attestation, just compromising the application host is sufficient, so this is probably more than twice as hard.
Christopher Evich11:42 AM
of course.  It's the fact that the owner cannot observe the compromise that's extra bad.
"We're notifying all customers that we've had a security breach.  Unfortunately we don't know what data was leaked or who leaked it.  So sorry, here's your free credit monitoring"
Miloslav Trmac11:45 AM
Yeah, this kills "antivirus products".
Again, compared to what baseline? (in-memory-only malware injecting itself into existing Windows processes is a thing, so it seems to me that "we don’t know _for sure_ what was stolen” is the usual situation)
Christopher Evich11:46 AM
Maybe...Can the attestation server be short lived?  as in, does it only need to be active while starting up a confidential workload?  That could offer some more protection.
Vivek Goyal11:47 AM
So while we are at podman + VM topic, I wanted to hear about the possibility of extending "podman kube" to handle VMs as well.
Anders F Björklund11:47 AM
"podman kubevirt"
Christopher Evich11:48 AM
This sounds like "Let's replace podman machine with crun-kubevirt"
Miloslav Trmac11:48 AM
I’d expect most of the protection to be just in firewalling/restricted access/smaller attack surface.
A short-lived server providing encryption keys needs to be started on-demand… with a stored-on-disk encryption key. That’s not really _worse_ than a long-lived server but also probably not much better, depending on how exactly the attacker is assumed to have compromised the attestation server’s system.
Vivek Goyal11:48 AM
podman machine will not use containrs, IIUC
So podman machine will be little differnet and a separate flavor
Christopher Evich11:50 AM
mmm true.  Another worry is a nefarious actor running their bad-thing-server using their own confidential computing setup.  So authorities cannot observe what it's doing (assuming attestation-server lockdown).
Johns Gresham11:51 AM
really looking forward to the podman machine changes/improvements in 5.0! thanks everyone
Tyler Fanelli11:53 AM
@Christopher "of course.  It's the fact that the owner cannot observe the compromise that's extra bad." this is not automatically true. the exact purpose of an attestation server is that you could be able to run it on your own and trust it
Anders F Björklund11:54 AM
will podman machine (5) still run qemu on linux ? or raw kvm or libvirt or whatever
Christopher Evich11:54 AM
oh right.
Matt Heon11:54 AM
QEMU + Linux is Good
QEMU + Mac is gone
QEMU + Windows is only a PR right now
QEMU + FreeBSD is being added
Johns Gresham11:56 AM
Does QEMU + Windows look promising? Would be nice for me to remove WSL2 install flow in my app.
Anders F Björklund11:56 AM
there is QEMU + WHPX, which is "decent"
main issue was Windows, not qemu
xrq-uemd-bzy

```

### Raw Google Meet Transcript

```
Transcript
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
Tom Sweeney: Looks so going the transcriptions going. Okay, great. Welcome folks to my community cabal meeting. Today is Tuesday, January 16th, 2023. We have a pretty long list of topics this week to talk about. So we're starting off with talking about automatic Cube apply. Not sure who's running. That one. Is that matters again? Do you know?
Daniel Walsh: I think I can lead the discussion on it. I think is everything on.
Tom Sweeney: I don't see her yet. But before we hop in that I'll just go quickly through the others. We're gonna do the Pod man support for VMS that one then and Alberto here for see her on VM and…
Daniel Walsh: Yeah.
Tom Sweeney: Tyler be talking about and then Matt had wanted to talk about an image ID consistency with a Issue that's popped up in the podman issues. That's in the agenda. If you want to take a look at it, and then finally we'll be talking a little bit about podman V 50 schedule updates. So given all that. I'm going to talk to the primary on keep applied down run with that.
Daniel Walsh: so I think someone has brought up the fact. There's an issue on whether or not we should be doing ube apply at all. The main problem with Kube apply as a Paul wrote War Robbie. I promise name brought this up. Very urvashi you're involved in this. we have now as part man to play POD man Coop generate and we added Prime man Coupe apply and apply basically will take the locally running cui ammo and apply it to a
Daniel Walsh: remote or a local kubernetes instance. And so the comment that we got was they didn't believe that we should have implemented it because we didn't implement the entire Kubla and I think original thought I think whenever she and I will building this was that it sort of completes this, you build it locally you test a locally and then you push it into openshift and that's why we added it. I'll push it into kubernetes.
Daniel Walsh: I think when we've talked about on the past, we also said you could also pull it back. And right now we don't really have the ability to pull it from a kubernetes cluster but it is a slippery slope and to implementing all cool it and a certain point. We basically want people Just use couplet for it. So the question is should we drop support for We continue on and additional features to it. Urvashi you have any comments on it?
Urvashi Mohnani: Not really just in terms of adding additional features. I don't think we should delve more into that space because at that point, however, we separate how much of cubelet are we trying to replicate then I think initial discussions this came up when we were talking about Cube apply. And I think we said that we just want to have that, developer to kind of cluster path and would end it at this point. And after you have deployed into your cluster, then you can use Cube CDL or the web console to manage your workloads on the cluster. so yes, I don't think we should add more features. I also don't think we should remove this. It's already there. We can add documentation to clarify that this is where it ends and we're not going to add anything more really, but it's open for discussion like whatever everyone else thinks.
Daniel Walsh: Do you think it would make sense though, just to add retrieve.
Urvashi Mohnani: Yeah, we could do that to match the opposite behavior that shouldn't be difficult to do.
Daniel Walsh: Anybody else have any comments?
Daniel Walsh: Yeah, I think we just throw that in the man page then, if we've handled that go back.
Tom Sweeney: Yeah, we just need the landing spot where we can point people out if this question again in the future, but I too likely the addition of the three of command if we can and then documenting it all.
Daniel Walsh: an go Vivek
Vivek Goyal: I just have a generic question. So. The way I see I was introduced to this traditional podman Matt mode where I just run containers and pass everything on the command line. And now this thing was Parliament q and then Associated options where you can deal with kubernetes objects and different use cases to play locally and then apply to Cluster. So this is just generally question. is there any sense at what users find more interesting or the equally interesting or any sense in terms of user adoption? Apartment you versus regular apartment.
00:05:00
Daniel Walsh: still I think the reason we pushed for coup obviously is a Docker compose alternative because lots of people looking for mechanisms for managing multiple containers multiple Pods at the same time. And so that's how we originally Envision that makes more sense to work developers towards kubernetes than it does to basically sitting in an island compose so that was the original idea I don't know how many people are apply. Although I do know that we could bring in the Pod man desktop team to talk more about this, but I know at least they demonstrate quite a bit that this workflow. I don't know if they have data on how many times people actually take a kubernetes yaml file with the developing and pushing into
Daniel Walsh: into a running instance of kubernetes. No.
Vivek Goyal: So it's sort of follow-up question why I'm asking this is some people are interested in sportman Cube that can we extend it to VMS as well.
Daniel Walsh: Yeah that you're jumping ahead to the next section.
Vivek Goyal: Yeah, yeah. Okay. yeah forget about it. Thank you.
Daniel Walsh: Anybody else have any comments? So I think the output would be let's just add a poll or whatever we gonna call it and then document in the man page that this is the end of our pod man support for playing basically at this point everything else you should use Google. If you need more features than this then you need to go and get cool. But
Tom Sweeney: No, that sounds good.
Urvashi Mohnani: Sounds good to me. Thanks.
Tom Sweeney: Urvashi, can I ask you to make sure that gets put into our backlog some more? Or thank…
Urvashi Mohnani: Yeah, I'll create a card for it.
Tom Sweeney: All right, next up. We have sea run VM Dan Walsh and Alberto febria, and I'm apologize if I messed up your last name over.
Daniel Walsh: Yeah, quickly and Alberto's gonna do a demo and then we're going to talk about this and some of this it's kind of a really cool feature and I wanted expose it outside Red Hat. It isn't packaged right now although this pull requests to start the packaging process. Thanks to location. So one of the things that When Giuseppe introduce Iran, one of the interesting things is we basically added sort of a C library plug-in interface. So run would take care of processing the oci runtime spec and then we could add additional.
Daniel Walsh: additional I run times to it. So over time now we had sea run k run which was so the first one which Elijah run a container inside of a kbm separated environment similar to iconic and do but a little later way in a little bit different and then eventually that evolved into sea run Kay run Sev, which I think Tyler's could be demonstrating which is using five minute to run confidential containers. later, we added sea run Wasim, which allows you to run wasn't workloads as
Daniel Walsh: as a container and basically use the wasm that's from the host operating system. So you don't have to package. It was them in every single container in the universe what we use in OCR runtime for it similar to that. we had discussions internally about should we run Ciroc will we originally called raccoon the idea was to take a container or if a container that just contained a VM image. So the Q cow to our
Daniel Walsh: a artifact that Christian contained at qat too and just run it as a VM. So the basic idea is taking VMS and running them as containers as opposed to a container and running. It is a VM. So Alberto went off and looked at this and he's about to give it demonstration of It Go, Alberto.
00:10:00
Alberto Faria: So hopefully screen sharing works. second
Alberto Faria: All…
Tom Sweeney: It looks good the size.
Alberto Faria: Okay, just get right into it. So we have a VM image here. You've got two file and with the Syrian VM or Sharon time we can use Potomac actually run that so Let's talk with some time. development runs like this around VM runtime. Let's make it interactive and some more standard options and now then mentioned we can run VMS from container images that contain VM images, which is true and I'm going to show that in a second, but we can also A duality container image if we have just the image file. Like I do here we can also use the router fastpotment run flag and give it here the directory or the VM is contained the images content and currently so that butman run doesn't complain. We have to give the command, but of course we don't actually use that so I'm just passing an empty argument here.
Alberto Faria: So a couple seconds later we should get again. There it is. I'm just gonna let it put
Alberto Faria: It is. I can't actually log in yet because this is just a base Cloud Explorer image. So I don't know what a password is, but we're going to fix that in a second. I mentioned we can Container images right? And that's what I'm doing here. This is the exact same command. I used earlier, but now instead of put a fast I just passing the Image thanks that that's in the image that in contains a image file inside. Yeah, so we're just using container images as a sort of packaging format for VM images. And this is the same thing. Okay. so
Alberto Faria: let's try to make this command line a bit better. I mentioned I couldn't log in yet as I don't know the password but Serenity, I'm also accepts some custom options and of course podman run doesn't understand this, but we can pass them and as what would be arguments to the image and Syrian DM will interpret those one of those is password and these lets me set password for the default user for the VM. Now this internally uses cloud in it. So the password blank will only work if the VM support in it, and there and there's a bunch of other flags as well, which I'm not going to show in the interest of time. But you can also pass in any cloud in it config to the VM. You can also pass in ignition config Etc. So now I should be able to plug in Yep with the best password. Okay, here it is.
Alberto Faria: something cool we can do is actually exact interview. And the only work currently here is that as the first argument I have to pass in the username of the user to exact guess because behind the scenes is just sshing into VM and there we go. That's a VM. probably took enough time already. So I'm just gonna Show a last command just showing a couple more things that Simon PM can do. And that is one of those is actually mounting directories and those regular files into the VM.
Alberto Faria: So let's Mount the current rectory which is what the director that has the VM image into the VM add some path that we can see it and also another thing we can do is as block devices any blocked device and you can pass through other things as well, but I'm just gonna show this.
Alberto Faria: Right now it should see those here. There's a demography with the Fedora 39 directory which in turn has the VM image and we also have not here but we have the run0 device here. All right. Okay, so that's what I had shown now. So any questions or comments?
00:15:00
Alberto Faria: Okay. there's a
Tom Sweeney: Just a quick particular podman version on this works on starting with.
Alberto Faria: I didn't really test that Sirens GM is just a nucy I run time. So I'd expect it to be very widely compatible with probably what mentions that are currently news.
Tom Sweeney: Are you?
Alberto Faria: Yeah, there's not really any Department specific logic in this and by the way, this works with ruthless podman, which is what I'm using. You can also useful apartment. It's also compatible with darker and so So is there a mechanism to catch the central process? Right. So some sort of snapshot mechanism for the there's no such thing at the moment. At least. We haven't really thought about that.
Daniel Walsh: it's potentially interesting use case because obviously we have the ability to snapshot a container right now. So, theoretically Might be something we could look into.
Daniel Walsh: The key thing here as we do this as we don't want to change. We don't want to make this podcast so that this theoretically could be used in. other container engines and including kubernetes so theoretically cryo and continuity you could use it as well as Docker and that's why he's interpreting some options. We also don't want this thing to even if this is vasless successful, we don't want to be looking at a huge amounts of options like, basically building this into a
Daniel Walsh: A vagrant type thing but I envisioned this as being a decent way to it's somewhat similar to kubert which is causing some controversy because I think will cause some controversy because people are asking when you use Cooper when you use this tool, but I just want to see this tool, this. I run time develop and figure out where we want to how people gonna use it and how it develops. One thing that has been talked about is potentially using ribute To further enhance it so Ryan already I think k run does this type functionality. So there might be again things that we special attributes to see right? You run M could take
Daniel Walsh: did I say the wrong thing again? I said attributes that notations. All right. I have a brain fight on that all the time. So yeah use the annotations to customize the way the O'Shea runtime works and there is some decent precedence for that. I think Alberto also has the ability to it's using libbert underneath the covers and so you can specify we've talked about specifying lebaric XML as a way for people who are very Advanced VM uses to do it. I'm going to give a little Tyler do a quick demo of what he's got and then I want to bring back for a discussion VMS in general and some thoughts that we have around partner machine handling some of the stuff so
Tom Sweeney: Yeah, quick question to Alberto and you can do this for Tyler's going on. Do you have a link for any documents Pages project, GitHub sites or anything for this?
Alberto Faria: Yes, there's a link to the GitHub which then you'll post it. I'm just gonna write that again. That's a guitar for the oops.
Tom Sweeney: Great.
Alberto Faria: Okay, there's a title there.
Daniel Walsh: Yeah, you cut and paste in my typo.
Alberto Faria: Yes. So the last one is a link to that for the project.
Daniel Walsh: There's really great read me there too. So it should help people really sort of understand how to use it.
Tom Sweeney: Thank you. Alberto's great. Fanelli my hopefullying up butchering your name as well. two in a row Tehran and…
Tyler Fanelli: You got it now. That's right. Yeah. Sure,…
Tom Sweeney: Putnam take it away.
Tyler Fanelli: so I have a few slides that I'd like to give I can go through them quickly. I just like to talk about what the camera is actually trying to solve and especially with respect to confidential Computing. So I'll start that's this slide real quick, but I'll go through pretty quickly as everybody able to see that. All right.
Tom Sweeney: Looks good.
Tyler Fanelli: All right then. So I'm Tyler and I'm talking about a testable confidential workloads. Podman k run and save S&P as Dan mentioned k run in this instance is a package up with Sean in the sea run runtime. So I'll just be going through what is lip Cave Run give an introduction on confidential Computing and SMP talking about attestation and showing how we kind of bring that together and giving a demo. So the first question is what is loop k run so To try to explain this think of a scenario that we have three containers On a normal container runtime and they're all running happily and so one.
00:20:00
Tyler Fanelli: Attempts with some malicious code to escape the container I'd get some privilege escalation and get access to host OS resources. There are security measures in place, but this is still possibility with host OS resources. It could potentially look about the system With data or simply spy on other processes other containers on a system. So the imagine that scenario not good and we'd like to try to quarantine as much potentially malicious applications as much as possible. So if we think about Loop here runs architecture, it's up until the container runtime as far as anybody running containers is concerned. It's pretty much the same. We have a container context that's managed by sea presents itself
Tyler Fanelli: to The Container runtime as such but inside that sea run is a virtual machine. It's a lightweight based virtual machine that's managed by lid k run and the applications put inside that virtual machine. So if we compare the two it's As far as container run times into presented the same. It's just inside. They can't context there's a And applications running inside that virtual machine and loop 1 pretend provides the context to communicate between the two. That being the sea run runtime and the application in the virtual machine itself. So for our previous example, we have that application again, and it's running malicious code to
Tyler Fanelli: escalate the Privileges and break out the container, but it's still in a virtual machine. So this provides some process isolation for potentially malicious workloads. Right. and the question is are we fully protected at that point? these three are now running as krun VMS. And they're protected from each other. What are they fully protected? Not really because what about the host hypervisor some type of malicious acting administrator still able to appear into the containers themselves. So there's no barrier from malicious hypervisor or an administrator from reading or tampering with the memory. With this you can have the potential leaking of Secrets and sensitive workloads require a bit more protection.
Tyler Fanelli: So the question is, how can we prevent everyone even the hypervisors are self from reading the use data being the ram of the containers? For that we can use confidential Computing. It's basically a technology that isolates sensitive data in a protected Enclave. And only the guest owner of that virtual machine is able to read the contents of that memory. and it focuses on data, that's basically hot memory such as RAM and CPU rather than data at rest such as files on file system or a database something that's sitting on disk. And this is implemented using trusted execution environments.
Tyler Fanelli: And The Trusted execution environment that we're going to be focusing on today. There's some differences between every CPU manufacturers trusted execution environment technology. But today we'll be focusing on AMD set S&P and basically includes a platform secure processor that manages So the encrypted VMS running on a system with these Keys they're able to determine who can access which memory of a virtual machine all the ram of virtual machine is less encrypted and it needs that key to decrypt that memory in order to read from Ram.
Tyler Fanelli: Neither the hypervisor nor other VMS have access to this key. It's only available to the guest itself and all that management is done by the PSP. So this is done on the chip rather than unless is even hypervisor software itself cannot access these Keys. There's also some other features like data replay memory remapping and such. These are other attacks that can kind of compromise a system and this is also what said S&P looks to prevent.
00:25:00
Tyler Fanelli: So we just see how lived here on uses of S&P. We basically measure our entire environment of the virtual machine and tell the secure processor that this is all to be encrypted. So when we're running nobody can read any of the BIOS kernel Etc everything that's going to go into our virtual machine and then we actually hide our actual application that's going to be run in that virtual machine is going to be hidden on a lux encrypted disk. And the one thing we'd like to prove is that our systems not actually lying to us and saying that we're encrypted saying that we're confidential when we're actually not so there's a one thing that needs to be done is a testing that system and basically the result of of a successful attestation is that you get the passphrase to the Lux encrypted disk
Tyler Fanelli: So basically it's talk about attestation. So we're told that our application is running confidentially on trusted Hardware, but how can we be? The one thing you have to verify is that the hardware you're running on is TE Hardware from a chip supplier from it's actually running unverified hardware and that the software That is running on that system is what you expect it to be as in they don't map some pages in that could leak Secrets itself. that map some unencrypted memory that could be used to.
Tyler Fanelli: the skirt around the confidential guarantee
Tyler Fanelli: So how lip k run does this a communicates with what's known as an attestation server? We call it here the r server. Basically that key that it's looking to get is the passage to the Lux encrypted disk. There's a five-step process of the communication between the lip care on client and the server itself. in this instance Live Care on is known as the key broker client. it's wanting to be attested. It's the guest that's looking to be attested and the server has pre-registered measurements and workload information that I can use to compare from what the client's looking for so just to recall that care runs code and application is hidden behind as luxury disk and the passphrase to unlock. This disc is stored on the So a successful attestation means that your application can run if you don't successfully attest
Tyler Fanelli: Your application will never run in that Loop k run it won't be able to unlock the disc that assignment. So we talked about how podman's role in this. It's a pod man facilitates to bring up and gives the necessary information needed for attestation. So build authors a CW flag that stores container contents inside encrypted Lux disk so does this for us builds that looks disk and then it registers the Luxe passphrase and attestation information anything that's needed to attest with the attestation server. and then it creates that container image and gives the container access to the attestation server address so it knows where to reach out to a test. so builda is the essential registration part of when we're building our container image and then we can encrypt the
Tyler Fanelli: Application behind the Luxe disc so then padmean offers obviously the sea k run runtime so runs the containers with Care on protection and then run facilitates the attestation to verify the environment and unlock the disc using the passphrase. So just a quick demonstration of build not a demonstration but a diagram of Builder basically you would use Builders of the build command and build that has a CW flag. With some of the details that's needed to register with an attestation server. So would then create that container image with the luxury Cryptid disk and then given the address the attestation server it'll register the pastries with. the information that's needed to attest.
Tyler Fanelli: when run goes to a test, then it'll give its attestation evidence and the isolation server will examine that evidence and with the information previously registered it'll either successfully attest and give back that passphrase. So the k run virtual machine can start running or it'll say the attestation failed and there's no looks passphrase you haven't successfully attested so you can't run your application yet. So it's just basically ver Thing that you're actually running confidentially. If so, then it's unlocking your disc and you're going to be able to run so at that point the attestations complete and then through the set S&P encryption live camera now protects your processes from potentially malicious hypervisors, and it allows users to run their process without worrying about potential spying or tampering.
00:30:00
Tyler Fanelli: I can give a quick demo at the moment.
Tyler Fanelli: And it went on to share a woman's up.
Tyler Fanelli: first a quick demo Of how we're going to be using it. So on the right here, we have an
Tyler Fanelli: on the right here. We haven't had a station server running. It's known as reference KBS I can link. To that itself, but it's an attitude server running that's going to receive things from build and test it with Karen.
Tyler Fanelli: So at the moment we have this if you see in the top left here, basically the application that we're going to run is just a simple web server that you're going to reach out and it'll tell you a secret. So if you see the secret right here, I originally gave this presentation for the virtualization team. So the secret is vert team. see that that was stored in static memory. So as part of the memory of the guest you should be able to read that from another process on the system and we'll see what I'm talking about the moment. So we're just starting up a
Tyler Fanelli: A regular web server. It's not confidential at this point. So. There's nothing special going on here. We're just running this web server in a container.
Tyler Fanelli: everyone
Tyler Fanelli: we'll run that on poor 8080 so we see the application started. It's just a normal container at the moment. If we go to reach out to that server.
Tyler Fanelli: We can see that the serversaver to return with the secret is verse team. there's nothing surprising there. It's able to read its memory and go back to it. Then we'll dump the contents of that process that's running that web server. And we'll try to read that secret that stored in static memory. So we'll see the process ID and then we'll dump the product the contents of the memory of that process.
Tyler Fanelli: Then we'll search for that secret that we just read from the web server will search that secret in the processes memory.
Tyler Fanelli: And we're able to see So nothing special It's stored in static memory and we're able to read it. Let's run it confidentially. And see if we're still able to read that secret. from another process on the same host So if we go through there's no. Deleted the can container. So I'm running this If you see on the top left, basically this was done before we had the Builder support So in this example, it's using oci 2cw. But everything that I'm showing right now is actually able to be done in Builder instead. And so this is a bit outdated at the moment. So we have a configuration file. This is what's going to be given to the k run guests. So when the k run guests eventually loads the
Tyler Fanelli: The initial code that's going to be running is going to be able to read some of this information. This is all the attestation information that it needs to reach out. So if you see the URL there that's the attestation server running to the right side of the screen. I mean
Tyler Fanelli: So what we're going to do we're building would be doing this at this point is we're going to build that container image confidentially. And register the contents with the attestation server, which you'll see them. One moment.
Tyler Fanelli: So you see there's been a workload ID and some adaptation information such as the passphrase that's going to be used to unlock the disk and information used to attested. It's going to require we can then run with the k run runtime
Tyler Fanelli: where we'll then reach out to the statistic server again in a test.
Tyler Fanelli: So obviously we've mounted the Rocks the Lux root file system. And if you see on the right here, there's just some information showing that we successfully attested we at a station is a multi-step process with validating certain certificates with an attestation report comparing launch measurements, which is the contents of your software checking some hashes Etc. But if you see the k run virtual machine has done all of that and then the bottom left here what we'll try to do again. We're for the bottom left here. We're going to try to see if we're actually confidential. So we'll read what we're going to do is reach out to the server again.
00:35:00
Tyler Fanelli: And we see that the server running in that virtual machine is able to run is able to view its memory contents. So that will now are going to try to dump the contents of that virtual machine and read that secret again, we were able to do that with non-confidential. a container running But if we try to read the memory now.
Tyler Fanelli: And then we'll grip for that secret again. from another process
Tyler Fanelli: And we're not able to find it. That's because that secret is now encrypted. So it's not just in plain text over the process.
Tyler Fanelli: So that is the podman demo, so I went a little faster, which usually
Tyler Fanelli: the faster even one second. Next steps that we're thinking for podman in k run his arm CCA support. It's the confidential Computing architecture from arm and it's useful for Edge scenarios that we could see and then how we also looking at build a support for other at a station servers such as there are some known as key broker. Cocoa more mature implementations of KBS attestation servers. So there's any questions?
Daniel Walsh: It alright. I just want to put point out that podman build has the same support the Builder has so obviously it's sucking in Builder. So all that all is available other things you should know is that unlike the previous demo where?
Tyler Fanelli: Okay, yeah.
Daniel Walsh: But I guess theoretically this would work but you could when we're not allowed to SSH so pod man exact into confidence or container by default does not work and I think that's sort of expected. The whole idea here is that we don't trust any process on the host operating system and…
Tyler Fanelli: That's right.
Daniel Walsh: confidential workload so that even the admin someone running full route full capabilities is not able to See the system, the he can do is denial of service that he can kill it. That's about it. Go Vivek.
Vivek Goyal: So I have two questions. First question is you generated this disk image. This is local. So the very fact you are protecting against hypervisor. I'm assuming you will generate the disk image on some sub separate build server and host them somewhere in some sort of registry, right? So it has been figured out that…
Tyler Fanelli: Yes.
Vivek Goyal: how will you host these images and registry?
Tyler Fanelli: That's also what we're still looking at because obviously like you said that's being generated on that same host. So it doesn't make sense at the moment. There's still ways for you to violate that Integrity. But yeah, so we'll still need to be some way that lux encryption is already done beforehand on the host. As to not leak any access of Secrets because at the same time build that at that point is creating the secret so it can just store it somewhere at that point. even if it goes through
Vivek Goyal: right
Tyler Fanelli: Even if it does, does create it looks encrypted. It has access to the passphrase.
Vivek Goyal: Yeah. …
Daniel Walsh: but the idea is that we push the Encrypted image to an oci registry and…
Vivek Goyal: So here's my sorry.
Daniel Walsh: then the tooling should be able to pull the encrypted image down and it'll pull it…
Tyler Fanelli: right
Daniel Walsh: but So it's not decrypted until it gets a secret and I believe now in nalin did most of the work on the part the probably bill. I don't think er. Reveals to the user running podman Bill what the secret is. So the secret actually is exchanged. I mean, obviously if you estrace and you could see it but the secrets exchange with the attestation server directly and it's not even human control. That's just a random secret that's generated. now and
Nalin Dahyabhai: No, you're correct. But you can specify Pathways. But if you don't we just generate one of them throw it away after it's registered.
00:40:00
Vivek Goyal: So here is the follow-up question after that. So with this assumption that there's a crypted disk. You'll have to host and registry somewhere. And I think this is where it overlaps for the seed and VM stuff. That the only difference I see here is if I understand correctly. You don't have the kernel and rest of the operating system you have it. Outside somewhere the custom one your kernel and internet FS. All you have done is in a disc loaded the actual workload you want to run?
Vivek Goyal: And then while you're presenting I will just comparing these two models that in the confidential VM use case. We are let's say using boot C or whatever we pack the actual kerneline interim fs. And that will allow me to do the easy upgrades later without resealing things and talking to the registration server, but let me not go there yet. So I wanted to hear your thoughts. I feel that technically at some point of time. We are not there yet that it should be the same thing. Should we doable with the serum VM as well and using the confidential VMS the bill those disk images push it to some registry goate attestations are unlocks it you boot the kernel which is content says inside the desk and not the your custom kernel. And I was just thinking that what are the advantage and disadvantages of these two current waste approach? Probably the one thing is probably lightweight you probably are going to boot faster because you have done some customization you can take some shortcuts. apart from that Can you think of other advantages?
Daniel Walsh: The fun and fundamentally one's running container. The bodman k run one is running containers and BOD Man sea run PM is running VMS. so theoretically we could run a VM inside of a container in a confidential mode, but right now what he was demonstrating is running a container inside of a confidential environment.
Vivek Goyal: from users perspective but go ahead and
Nalin Dahyabhai: It's a micro VM but it looks like a container the main difference is if you're booting with a kernel and an IT Rd that's part of the shared library, then the disk is still encrypted and it's not visible to the host at all because the internet Rd is the bit that's contacting the server and then decrypts the disk in the VM. Whereas if you wanted to boot just the disk you'd have to decrypt it first which means the content that this would be exposed to The Host.
Vivek Goyal: So in case of confidential VM, what people are doing that using the similar things like at least the proposal is the root disk is still be encrypted and then the decryption key will be tied to the vtpm and it's actually the vtpm secrets which you'll get some from the attestation server. So what I'm trying there are many flavors to it and even there are three four flavors. So I think that this flavor can change a little bit that's perfectly fine. But ultimately in my mind it boils down to that how a certain approaches more lightweight or heavy weight and we necessarily don't have a good answer but I'm just sort of like Brainstorming a bit, I will see that. How does it evolve?
Daniel Walsh: yeah, I think there's a potential for allowing us to run a VM inside of a confidential workflow I mean, but that's sort of leading towards a kubert type environment where you'd basically have embedded in the container image the ability to run a VM
Vivek Goyal: I would say both what is managing it, then it's qubit environment. But if it's without keyword and warmed in Standalone as devices or anything where people using
Daniel Walsh: but what I'm saying is we wouldn't trust the sea run qmu that's installed on the Post so the sea around here was trusting this Iran the sea run VM is trusting the cui qmu that's installed on the host. In this case. We're trusting in this case. We're trusting nothing or trusting the k run command,…
Vivek Goyal: So you have to trust that right in confidential we have model that we are not building trust into the key on you.
Daniel Walsh: but the cable unit commandant Commission.
Vivek Goyal: That's interested entity if I understand correctly.
Daniel Walsh: No, no, it's trusted in that the measurements have to be done. So we're measuring k run. So the attestation has managed is measuring everything Through the running of the lab k run.
Vivek Goyal: Yeah, so in confidential VM what I'm trying to say, you don't rely on the trust from the Kiyomi you rely from where you are loading and how many companies you're measuring we can have this debate some of the time like,…
Daniel Walsh: Yeah. Yeah.
Vivek Goyal: there are many components to it.
Daniel Walsh: I think we're gonna run out of time. So
Vivek Goyal: I don't know. Yeah exactly so we can have this limit.
Tom Sweeney: That's a good question. I hate to stop it, but that's more topics than just about 10 minutes left.
Daniel Walsh: yeah, I just quickly so obviously one of the things that's happening here is where we're looking at different types of things that we can do with virtualization stack and in addition to the OCA run times and that's really what this discussion about one of the things going forward. We might want to look at is and we were out of time for this maybe in the next cabal meaning we talk about it more is everything we've showed right now is Linux Centric and Tom obviously most users of pod man going forward are going to be on Max and windows. So one of the things that we've been talking about internally is potentially expanding the use of primary machine to allow us to Launch.
00:45:00
Daniel Walsh: VMS potentially generated via pod man containers natively for the particular host that you're on right now if we generated a VM on a Mac is a rare image. How would you run it if we generated a type of V image on I Windows Live from how would you run and what we're looking at is can we get support for launching VMS natively on different platforms? we'll see around here. So those are things that we're talking about but as well totally run out of time for the subject and I know we have someone else so I'm gonna give up anymore.
Tom Sweeney: Thank If you could send me your slides at some point and if you have any project links for GitHub or anything mention for that to the notes, that'd be great. next up.
Tyler Fanelli: although
Tom Sweeney: Thank you. We have image ID consistency. I think Matt this is your topic.
Matt Heon: But I think we can actually skip this one this time. I've been looking into it. this was going on. I think it's more investig.
Tom Sweeney: If anybody's interested, I'll leave it in the notes. We have some discussion going on in an issue on GitHub and podman Some feel free to dive into that then we'll segue right into part man v5.0 which I know Dan have been taking tickling about Matt. You were going to talk about it believe.
Matt Heon: Us sure so podman 5 people probably noticed that we switched the main branch of podman over to 50 Dev. I think it was during December and we've been working on things since then 50 was going to be a breaking change release. We have a bunch of changes scheduled for it. And just to go into some details on scheduling we're expecting to start cutting release candidates in call it late January early February. It will definitely be out by the first what do they call it Fedora RC?
Matt Heon: Or Fedora beta whatever there's a fedora deadline in early February that we're going to meet and ideally we are going to be completely done by call it late February for podman 50 final but that is not completely certain yet. There's a lot of work going on the podman machine side of things that we're going to wait for that to be done. Even if it takes a while. So we're expecting this to be an extended release period probably a lot of release candidates and the Linux side of things should be fairly stable early on we're expecting a lot of our seas on pot and machine and desktop stuff.
Daniel Walsh: Yeah, and the biggest change in partner machine is that we'll be moving to the Apple hypervisor.
Matt Heon: Yeah, there are a bunch of big under the hood changes to machine, but we are going to be defaulting to Apple hypervisor completely removing support for the qemu driver on Apple. And yeah, that's basically a maintenance thing for us. Apple HV is maintained a lot easier to work with and it offers some other advantages like faster files here.
Matt Heon: Okay, and the questions on that are?
Tom Sweeney: Okay, we'll give them that then we are open for discussions of any sort the same if I have any questions or comments that they want to make.
Tom Sweeney: Good.
Vivek Goyal: So just because I have time the question I had asked initially and I think I had jumped the gun at that point of time. are there any thoughts of extending permanent Q to handle VMS as well?
Vivek Goyal: This is a little different from Portman machine. So that will be a separate thing permanent machine is not going to use containers. It will not deal with the kubernetes objects and everything. So it will be separate flavors submit machine of course will be there and that development to be able to move VMS.
00:50:00
Vivek Goyal: this is something you boot the VMS in containers something like what's here and VM is doing but what you deal is you deal with the Google. It is objects The Way Apartment you've seems to be I don't know much about it yesterday. I looked at the apartment you man basis, so, please correct me if I am completely misunderstanding things.
Daniel Walsh: So Bob and coobe should just use standard cool yaml is but sometimes people use. I'm gonna get it right this time annotations to customize the way kubernetes handles different workloads. Does anybody know if kubernetes supports annotations to change the OCR runtime?
Daniel Walsh: because that would be the way we would have to because you're really asking that I want to run a container inside of a pod that actually happens to be a VM.
Vivek Goyal: Yeah, something like which keyword is already doing so if I understand correctly I Define a VM.
Daniel Walsh: At Cooper it's not doing that Cooper is running a container that contains software to run a VM.
Alberto Faria: The answer is You can change the OCR runtime for a skip the name of the different runtime which has to be installed on the
Daniel Walsh: Okay, so that would be so if we're gonna support this that's the way we would because It's a standard kubernetes procedure. So if we should support the ability to swap out the run time based on the kubernetes yaml file.
Daniel Walsh: So that would be the way to do it. I want to think when the cool things I think of run cute run VM is that it actually run the ATMs via quadlet and have full management of VM. This is if they were, same way we're gonna manage containers, but if kubernetes Hammer can do this, too. That's it. Seems like a nice feature.
Daniel Walsh: I have no idea for currently works, but probably went out that far away from it should be fairly easy to make it work just to swap out the runtime if cooby animal supports it. What do you think urvashi she disappeared?
Daniel Walsh: She's gone. Yeah.
Tom Sweeney: I think she's left.
Tom Sweeney: Right any other topics or questions?
Daniel Walsh: Though Anders is asking about part my machine.
Anders F Björklund: I mean would you leave the qmu code for non-max or…
Daniel Walsh: was Yeah. Yes. So the answer to that is yes.
Anders F Björklund: would you just remove?
Daniel Walsh: The problem is not with qmue of the problem is the problem we've had on a Mac is more humus support for a Mac And secondarily has been through in that people change you very recently over the holiday break.
Anders F Björklund: Okay, yeah.
Daniel Walsh: You release something that lowest totally out of the water and…
Anders F Björklund: Yeah, the firmware Instagram. Yeah.
Daniel Walsh: there's no control over when these things happen and I don't really think the Upstream Community is that much about how they work on max?
Anders F Björklund: And neither just the Brew how they test their qmue versions.
Daniel Walsh: Right and I think that's a problem too. And finally everyone else that we know of that started using qmu on a Mac is eventually switched to the Apple hypervisor. So Docker is Switched. I'm CRC or open shift local and I switched and…
Anders F Björklund: No.
Daniel Walsh: with our instability on a Mac. It's just seems like okay, let's just switch.
Anders F Björklund: And now I think it's more important ability. if it was to stick around, but that's not going to be the default Target anyways.
Daniel Walsh: Right.
Anders F Björklund: It's like the qmu is the new virtualbox. portability
Daniel Walsh: right
Tom Sweeney: Freddy
Daniel Walsh: any other questions?
Tom Sweeney: cut everybody here. I'll just put a couple plugs for upcoming meetings. We have our next community meeting on Tuesday, February 6. We have a podman at home demonstration by John Masters scheduled and looking for more topics for that one. And then for the ball meeting that the next be happening on Tuesday February 20th, which is two weeks after the community meeting and I've put in at the moment anyway to handle VMS from Vivek of chat here today fanelli says any other topics I'd like to discuss and that or any other one or in the community meeting. Please let me know. And going to go to Tyler.
Tyler Fanelli: I just have to say I sent you the slides and I'm going to send some other information about k run on Slack.
00:55:00
Tom Sweeney: Awesome. Thank you.
Daniel Walsh: I got asked My number one question that he knows is coming. When can I get cheap Hardware to try this stuff out? Keep me less than a thousand bucks.
Tyler Fanelli: that's what we're Looking that's the idea when I mentioned with arm as we discussed that we arm would hopefully be able to apply to bearing up Confidential virtual machines on cheap Hardware right now the example. I just showed on seven S&P. And also if you take it further to Intel TDX, those are not cheap Hardware they run on big cloud machines that are expensive. So that's the main motivation for doing CCA is that we can run on arm Hardware which will be cheaper.
Daniel Walsh:
Tyler Fanelli: When is that? I'm starting to actually ramp up working on that implementation now so I don't have a set time frame but I can keep up with you on that where we are working on it.
Daniel Walsh: Great, so I just want to get up my high horse real quick and say that I believe the confidence Computing. This is critical for Edge Computing. So any computer that can be touched by a human being that's an untrusted human being should be running in a confidential workload type environment and in the cloud, I believe it's more of a play for the cloud vendors to make more money. So it's like you want to ride confidential mode? Because basically what you're saying is when you run an Amazon Google or Microsoft, you don't trust their admins to do the right thing. there is some security stuff that Tyler talked about earlier. But again Edge deployments. This is where I think this thing really should take off, but that means cheap Hardware
Tom Sweeney: Right with that unless there's any real quick questions comments. I'm going to wrap us up for today. Thank you everybody for inventing it especially the folks that were presenting and talking today. And you quick last thoughts before I hang up on the recording. All right. Thanks everybody.
Meeting ended after 00:57:12 
```
