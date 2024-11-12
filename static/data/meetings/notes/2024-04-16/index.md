# Podman Community Cabal Meeting Notes
## April 16, 2024 11:00 a.m. Eastern (UTC-4)

### Attendees
Ashley Cui, Brent Baude, Ed Santiago Munoz, Gerry Seidman, Kevin Clevenger, Lokesh Mandvekar, Matt Heon, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Nicola Sella, Paul Holzinger, Shion Tanaka (田中 司恩), Tom Sweeney, Urvashi Mohnani, Vikas Goel

### April 16, 2024 Topics

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=aLKET_3loWw&t=4s)

Meeting start 11:02 a.m. Tuesday, April 16, 2024

 1. Data production for appliances backup application - Vikas Goel


#### Data production for appliances backup application - Vikas Goel - (0:29 in the video) 

Data production appliance, a black box for Veritas customers.  It's a platform that is specialized for their customers.   There are multiple applications that can be used, and they're securely signed.  Appliance customers can upload their own particular software and version.

Data production application runs in non-root containers in a hardened environment.  Some of them applications expose the luns.  Customers can also decide which ports they want to access.  

Luns are exported as devices so the application can access them.  The application can't create a device inside of the container.  VMware can change the devices in the environment.  For Veritas, making these new devices available inside of the container has been problematic.  This has caused problems.

Can we make new devices exposed to a running container?

Matt was working on podman update, and he ran across code that had stopped that from happening.  Podman could potentially mount up the devices if the devices were specified in a known folder.  Matt doesn't know if we can do without restarting a container.  He thinks it might be best to manage this through a directory that's opened at the container start time.

In the past, Veritas had been moving the devices to a separate folder.  They ran into issues when systemd restarted any service, it made the devices invalid.

Dan asked if a process outside of the container to monitor the devices on the host and add it to the container once the device shows up,  Dan and Vikas discussed and decided it would be possible in a rootful environment, but would probably not work in rootles due to the bind mount.

Vikas thinks they tried that, but ran into problems, he needs to check.

Toolbox is playing around in this area where they escape the container and add devices.  You need to be careful to do this securely.  You have to make sure the SELinux labels are all lined up.  Dan offered to act as a contact.

They had been using a directory in RHEL 7, but not working now.

The other issue is similar, working with volumes.  They'd like to be able to increase the volume size.  The problem is when you add a new volume, you need to restart.

You could join the mount namespace, then you should be able to mount.  However, you'd only be able to see the volumes within the container.

Vikas asked if there could be a cleaner interface.  The supported way would be to do autofs or something similar where you could add volumes to that.  For instance, create a container with a volume under /mount, then if you create a /mount/foo or /mount/bar, you could see the device.

Vikas had looked at this but believes there is a security issue with that approach that he discovered.  So Veritas didn't go that way.

Vikas wonders if they could do a volume mount into the container. When Podman starts a container, we create a mount namespace and then start mounting there, but after that, we can't mount ontop of it at the moment. So we can't see new mounts on the host unless the host mounts something into a namespace the container already has mounted.

Paul thinks the new mount API's might help in this area.  But that doesn't help with the current software.  Paul says this is part of OSCI mounting and not really something a container can change or manipulate.  

Dan thinks if we can do something, it should be done as a tool outside of Podman itself.  In RHEL 9+, you can open a file descriptor to a mount, then you can join that later.  This is a new feature.

Security issues here include leaking files from the host into the container, which is the main challenge in this space.  

You could possibly create a process to inject a new mount point, but the admin doing this needs to be sure it's done correctly.

RHEL 9 has the kernel changes to make this happen more easily, Vikas will go investigate further.

Vikas also had a question on iSCSI support on the kernel.  Podman depends mostly on bind mounts, and Dan would prefer to keep iSCSI outside of the containers.

The Linux Kernel only allows a small subset of filesystems, and that's all that's allowed in rootless mode.

Vikas noted that someone from SUSE had looked into adding an iSCSI namespace and was wondering what the challenges are?  Dan's not sure, but noted that dealing with API's not being aware of namespaces outside of the container.

Vikas thinks a number of containers can each have iSCSI namespace, but the containers keep their own setup, and can't see outside.

Vikas had seen a patch, but it didn't go through.  Dan suggested contacting the developer.  Dan also suggested touching base with the Red Hat Kernel team.

#### Dan Walsh - emulation mode  - (33:48 in the video)

Running the commands, Podman, Buildah, Skopeo in emulation mode is not working at the moment due to a reexec issue with argv0.  Emulation mode runs argv1 inside of argv0.  I.e., can't touch `/` with Skopeo in emulation.  Dan doesn't know what the fix is.  This is a QEMU issue that has had a bug on it since 2020.



#### Open discussion -
 1. None

### Next Cabal Meeting: Tuesday, May 21, 2024, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1. None

### Next Community Meeting: Tuesday, June 4, 2024, 11:00 a.m. EDT (UTC-5)

#### Possible Topics:

 bootc demo

Meeting finished 11:41 a.m.

### Raw Meeting Chat:

 ```
 You
 11:12 AM
 Vikas, fyi, that's Dan Walsh talking
 You
 11:17 AM
 Vikas:  dwalsh@redhat.com
 Paul Holzinger
 11:25 AM
 https://brauner.io/2023/02/28/mounting-into-mount-namespaces.html
 ```

### Raw Google Meet Transcript
#### Note: Dan Walsh and Nalin Dahyabhai shared a video link as “Nalin Dahyabhai” in the transcript 

 ```
Transcript
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
Tom Sweeney: So if you have some thing that you want to talk about afterwards, that would be great. Currently we're gonna have vikascal goal talking about data production for appliance backup applications. And before we get into that I'm going to put in a quick word for devcon. oops gonna click my actual window that shine abstracts for that for call for papers is coming up next Monday. So if you're interested, please get those in and just confused itself is happening on August 14th and 16th in Boston, Mass us. hope to see a bunch of you there. And with that I'm going to stop presenting and hand it over to vikas.
Vikas Goel: Thanks, So I think I have explained the data protection of lines where it does flex Appliance in the previous. I think a month or two back. But I can give you a quick summary again and there are two or three different items. I wanted to talk about in the same context. So let's Appliance is a data protection Appliance. It's a multitenant Appliance. What that means is that again, it's a black box for our customers and we ship a physical Hardware. Appliance so customers can deploy the appliance. It's like a platform that supports continuous applications for our customers.
Vikas Goel: Is the container part is transparent. It doesn't matter whether it's container or running in a host or some of the form factor the appliance supports the backup application, which is again where it does proprietary. So we package the applications independently and there are multiple such applications. So we Veritas packages for Securities and sign them and the appance. Now that are different types of applications and different versions. So Appliance customers can choose to
Vikas Goel: upload their own type and deploy one or multiple instances of those applications at the same time and as I said is a multitagency is supported there's a lot of security and segregation in in terms of storage. All that is a ha Appliance as well. with that said one of the use cases of the data protection application itself, which is running in a containerized form factor. Is and these containers are running in non-produced mode by the way, very hardened and secure environment.
Vikas Goel: One of the use cases is accessing the fiber channel devices. And the fiber General devices for that matter, it could be let's say backup. Right. So ESX server is exposing. lungs for the devices as Target and the appliance works as an in initiator mode accessing those lungs. It's the zoning Etc is all customer configuration which ESX server which learns are connected to there can be multiple also for that matter. but again in the multi-tenancy context one instance of
Vikas Goel: a plan backup application can say I want to access port one? And another instance can say I want to access code too all the devices basically of Port one and the other one all the devices are portal that level of segregation can be done.
Vikas Goel: So when the platform starts the container applications at that time, whatever lens are available for a given code assigned to that instance. All of those lens are bind mounted or exported as Inside the container so that the application can access them. Now apply X the application itself doesn't have a ability to create devices inside the container. We have restricted that access the use of American audience Etc. So
Vikas Goel: when the container starts all the devices attached to the respective fiber channel code are exported to the container for backup purpose. now the VMware admin on the Fly change the devices number of lines can increase right more VMware more storage. The number of devices can change now on the host using you'd have and there is a schedule everybody Etc using that it can Auto detect the lungs. So on the host, you can see the lens any newly added lunch on the ESX server. To Appliance can detect it. However for us to make it available inside the container. The application container has to be restarted.
00:05:00
Vikas Goel: Because at the moment, there is no way to say that. Okay, I have discovered but go and on the Fly make them available inside the container. So that's one problem statement where the challenge is that customers get annoyed. that's it, Your host can see but application is not able to. Use it because it can't say it and every time there is a change in the backend the VMware or ESX data store. It requires a restart of the application which downtime and planning and there's a lot of memory also warm up needed for the back of application to get started working functional. So there's some sort of frustration. So there's one thing I was looking for that how can we have the newly discovered devices
Vikas Goel: exported to a running container
Matt Heon: so I am working on pod man update right now and I just came into something very similar where there is the potential we could have added new devices to The Container but I deliberately chose not to at that point largely because it's feels questionable to me whether we should be able to do this.
Matt Heon: I mean our general answer to this would be if you can guarantee that all the devices are in the specific folder in slash Dev. You could Mount just that folder into the container and then you get changes within the folder IE devices being added and potentially removed without having to change the actual container config. and even here I should say the Pod made update case would have taken effect on container restart. There is no question that we can do this on a running container. I don't think we want to get to the territory of managing devices in a sense of pod man itself creating and removing them. That's the job of the OCR runtime the runtime only lets us update resource limits around time. It doesn't let us create and remove devices so
Vikas Goel: here so in the past in a different context not in the fiber channel, but Loop device context. Okay. Give me a second.
Vikas Goel: Sorry in a different context Loop devices. We were sort of doing something similar moving the Loop devices to folder.
Vikas Goel: And then rather than bind mounting the directory will still mounting the loop devices inside the container, but there was a challenge operating system itself that
Vikas Goel: when up any other system these service was getting restarted. It would nullify or make those invalid and redact support team suggested that we should not move the devices to directory. Let it be original location. and then we have to change this thing the way we were doing it, so if you can talk more about how we can.
00:10:00
Vikas Goel: Solve this 5% that we uses moving to directory and without running to those kind of problems. I can look into that part for sure.
Nalin Dahyabhai: I'm impersonating nalin right now. Why couldn't you just have a process outside of the container that is monitoring say you live and then enter the container to add a device. One of the device shows up in the host.
Vikas Goel: and that's exactly what a mask or actually use the way we can do that. So as I said is able to detect any newly discovered so we can write another UW rule for that matter that there's a
Nalin Dahyabhai: Right if you'd have rule for. Your container then it could exactly as a privileged process and create the device inside of the container and don't think it could add a bind Mount so for ruthless containers, it probably wouldn't work. But for ruthful, I think you might be able to work.
Vikas Goel: so you're talking about the process running on the host or inside the container that can do it.
Nalin Dahyabhai: Which a process on the host that would enter the containers at least enter the mountain namespace to create the device. Maybe it does not enter the pin namespace. So the container wouldn't see it.
Vikas Goel: Okay using make node or something you're talking about, right? We have tried.
Nalin Dahyabhai: Correct.
Vikas Goel: that part also and I think somehow we felt that there was some challenges in that respect now. I need to go back and see that in worse than edues. It was a problem.
Vikas Goel: But there were some difficulties in that doing.
Nalin Dahyabhai: Yeah, we don't have it. I mean in a normal case podman's not even running at that point. So you have a little process card line that's waiting for exit code. So there's nothing running inside of the container. if you're running a privilege container, you can also do stuff like escaping from which is what I think toolbox is doing so toolbox is playing around a little bit in this area but they escaped the container and add devices on the Fly. But in this case I think now you have to be real careful with this because you're sticking your published process into the container that you have to make sure that you want to make sure that the container processes can get access to your privilege process. That's why I said potentially you just had to the mountain namespace and don't into the pit name space to correct the great advice.
Vikas Goel: 
Vikas Goel: Yeah sure, I think. as I said I need to go back and see what the challenges with this approach. and not in ours anyway,…
Nalin Dahyabhai: Yeah.
Vikas Goel: but there were scenarios when the devices were not getting were not usable after creating inside that but
Nalin Dahyabhai: Yeah, you'd have to make sure that they were created with correct as he's Linux labels and things like that. So yeah.
Vikas Goel: Yeah. when entering into name space, of course Dash Z option will help dear rate.
Nalin Dahyabhai: I know because the Pod man knows about the Dashie. That's but if you have issues with this probably and by the way, if you don't know, this is Dan Walsh, you can contact me and…
Vikas Goel: Yeah.
Nalin Dahyabhai: I could tell you how to It basically you could just set the contacts based on the Parent Directory or…
Vikas Goel: Sure.
Nalin Dahyabhai: something like that.
Vikas Goel: Okay, so we are still talking about. Exporting the devices directly not moving to a directory, right?
Nalin Dahyabhai: that's how you could do it without going to the directory one.
Vikas Goel: Yeah, because moving to directory was all sort of like we were doing and we had to revert that after moving to relate in real seven. It was working fine something and Change that was invalidating the devices. So
Vikas Goel: But we'll see that we'll get in touch then. Thanks.
Nalin Dahyabhai: Yeah, yeah contact me if you should contact me or at least point me to where the error is unrelated. With you creating a device because I could take a look at it and see if it's a permission things but use them rootful containers or this.
Vikas Goel: root for right now all the containers are Yeah,…
Nalin Dahyabhai: Yeah, so fruitful we should be able to make it work without a problem.
Vikas Goel: okay. Okay. Sure.
Vikas Goel: So that topic I'll get back to you then. Yeah. Thanks. The other one somewhat similar is about but the volumes right that applications running with some specific volumes. And the customer says the user says that for this application. I want to increase the volume size by let's say 100 terabyte 200 terabyte. what that means is that internally platform will translate that size depending on the size new increase. Now it can create one or more new volumes. And would want to export them. Mount them in to the same application container
00:15:00
Vikas Goel: Problem again today that anytime you want to add a new volume you have to restart right? Because the amount option is available only at the time of starting the container. So Similar problem is there with the new volumes getting mounted?
Nalin Dahyabhai: I mean you could do the same hack you can basically join the mountain namespace amount of File system I believe right?
Nalin Dahyabhai: Yes, between the money space you can manipulate that if you join the mountain namespace without joining their full container, then you should be able to mount. Although would you lose sight of the mountain hand space at that point? I mean if I join the mountain namespace, but I'm trying to join a creative directory and the host operating system. I join them on a space. I no longer see the only place it would be visible is inside the containerspace that would be on the hook. It would be visible on the Note. Yeah, and of course you have to be really promoting blocks.
Vikas Goel: Is this something? Can there be a rapper around, clean interface?
Vikas Goel: Which can do something similar. I'm looking for something in a supported fashion. Right that. but when we do something that is supported non doesn't go unsupported
Nalin Dahyabhai: I mean the supported way of doing this would be to use something like faster some kind of. System where you'd have a directory that you mount into the container and then your mouth these additional. volumes into that mile point
Nalin Dahyabhai: But by default we'll use an example. I create a container with a at slash inside of the container now later on I have and…
Vikas Goel: Yeah.
Nalin Dahyabhai: it has another directory underneath that mount slash fool now if I mount onto that mount slash bar Then the container will see the new Mount point.
Vikas Goel: Yes again, this approach six years back when I started this Appliance. I thought of but there was a security problem. I think I found in that approach from inside the container you could delete or unmount some sort of thing. Again. It's been a while. I'm not able to recollect but there was some security problem. I found that was not viable option a mounting the Uber ory Parent Directory.
Vikas Goel: so that's why we didn't go with that approach.
Vikas Goel: But is there a challenge with the providing a
Vikas Goel: mount option the runtime when container is running and then you want to mount a volume.
Nalin Dahyabhai: I just don't know how I mean we would pretend we would run into the same problem that you're talking about. I mean all
Vikas Goel: No, I'm talking about directly mounting not Parent Directory. The way we mount it at the time of starting the container can there be an option to say that? But volume down to this container.
Nalin Dahyabhai: but
Nalin Dahyabhai: The way we start a containers we create a mountain namespace and then we start mounting into the different directories then we enter the mountain namespace. And from that point on we can't really Mount anything. after that From the bill and…
Vikas Goel: Yeah.
Nalin Dahyabhai: not edit because we mounted over slash. So we're not going to see anything on the host at that point. Even if he had a privilege process inside the container won't be able to Stuff from the hose unless that was less the stuff from the host is mounted onto a volume that's already knotted into the container.
00:20:00
Vikas Goel: But you just explain right that entering into name space again same mountain in space. A previous process can do it.
Nalin Dahyabhai: And I think once you enter the mountains say that the previous case we created a mountain namespace.
Nalin Dahyabhai: And then the final step is We basically switch process them. yeah, I'm out from one namespace into another could be tricky. Yeah, you want to buy Mount From the note's namespace and the containers namespace. this is something that I don't think example that right now. this
Paul Holzinger: It should be possible With the new mod apis, you can first open amount and then join and mod namespace and then to the actual mount on FD stuff like that.
Nalin Dahyabhai: okay open up amount To a note and then hold it without I note.
Paul Holzinger: yeah, something like that.
Nalin Dahyabhai: And we are talking really here though. Yeah that really.
Paul Holzinger: Yeah. yeah, I don't know but in general I think this is really outside of the business of Portland because I run times through the mounting and…
Nalin Dahyabhai: Yeah.
Paul Holzinger: Currently, there's no way that oci runtimes update a running container with black mounts or something like that as Matt mentioned earlier. The only update is resource limits.
Nalin Dahyabhai: Yeah, so you would have to ride this through the oci if you wanted this to be supported by five, man.
Nalin Dahyabhai: Because we would have an issue. Obviously we used other types of Obviously. This would not work who was them? It wouldn't work with someone like he run VM or caught a containers things like that. So be very difficult for us to special cases. So I would say this is probably be best to be a tool outside about man.
Vikas Goel: You just talked about. having relate kernel having ability to do that. So is that some system calls?
Nalin Dahyabhai: Yeah, there's new system calls and I think they don't even know if they're in real nine, but probably in real nine and Beyond there's a syscall where you it basically open a file descriptor to a mountain. And then have that mount point then join the mountain namespace. So you're doing in two steps, rather than one step which currently I don't believe it would work. So if you have an open file descriptor that points to the previous Mountain namespace. Then you use it inside the new Mountain namespace.
Vikas Goel: 
Vikas Goel: Is there a reason why it's not? implemented in
Vikas Goel: The container engine technology not just podman, but other if you consider Docker Etc.
Nalin Dahyabhai: I think it's brand new. I mean all it's within the last year. So that this feature showed up.
Vikas Goel: now I'm talking about just that mounting new volume inside the container itself that Docker apartment none of these support. Is there a reason behind that I was reading. very old Blog or some response on GitHub of yours then. Somebody had requested something similar where it's been four years. Maybe you're more.
Nalin Dahyabhai: Yeah.
Vikas Goel: And you mentioned that there could be some security issue with that if we Mounting a volume runtime when the container is running there could be some security issue. So
Nalin Dahyabhai: I mean you get the security issues would be if I leaked access to files from the host into the container. That's right. Just it'd be more about you have to be very careful when you do it.
Vikas Goel: Okay. So basically if you trust your Process is running on the operating system. or who is making the
Nalin Dahyabhai: Yeah, I would be more worried. I mean usually I consider what's happening inside of the container to be untrustworthy. So that's where I'm looking at. This is if you just add mounting directories in without careful, then the prices inside of the container might be able to gain access outside of the container.
Vikas Goel: but isn't it that same thing when you try to start a container with these? Volumes, isn't it the same problem?
Nalin Dahyabhai: Yes. Yes.
Nalin Dahyabhai: It's just your expanding the problem.
Vikas Goel: Just extending the problem. Yeah, I mean when your other we are doing the same thing right that either mounted running or…
Nalin Dahyabhai: Yeah, yeah.
Vikas Goel: restart the container. To make it happen, but the previous process on the host that is making it happen.
00:25:00
Nalin Dahyabhai: I mean, yes, you could if we built a totally at the Pod man then. We could do it To make sure that all the security functions line up the problem is if you do it out if you just inject something into the Container, then you're likely to hit things like using a space problems. I see Linux problems and potentially some of that issues. That's what I'm talking about.
Vikas Goel: Okay.
Nalin Dahyabhai: So you have to becomes your problem. If you want to inject a new mile Point into the Container you have to make sure it's labeled correctly and it's Fallout. It's inside of the correct username space.
Vikas Goel: Okay.
Vikas Goel: So relate the way Paul was suggesting really invalid. That is not possible Right.
Nalin Dahyabhai: Yeah, and really from pod man's point of view. I believe is complete There's not gonna be any more updates for relepod man. Is that right, Tom?
Vikas Goel: I'm just asking for that kernel ability that update.
Nalin Dahyabhai: but
Vikas Goel: Is that possible in relate or if you were to write our own custom some program that?
Nalin Dahyabhai: yeah, I don't know if that was ever backport to relate I would doubt it, but
Tom Sweeney: I don't think it was and the only updates were doing our critical bugs pretty much for real.
Nalin Dahyabhai: Yeah, but I'm talking about the code whether the colonel backpoint of the ability to. the new Mount API
Paul Holzinger: yeah, I looked at this last year and then it wasn't the case and unlikely that it's now.
Nalin Dahyabhai: Yeah. I agree.
Tom Sweeney: Yeah. set
Vikas Goel: And line has it, right?
Nalin Dahyabhai: I would figure yes.
Vikas Goel: Okay.
Vikas Goel: Okay, that's a good info. I think. I'll go back and evaluate these options real line versus relate mounting going into the name space and those options. Let's see how it happens will come back.
Vikas Goel: the findings
Vikas Goel: Okay, thanks on that also and the third and last part is. Not a strictly tied to pod man, but more of like kernel plus but it is in the container context again that ice Kazi support.
Vikas Goel: There's no name space for ice crazy that you can create. So. You can't have multiple containers. manage their own eyes crazy devices directly running in container, right?
Vikas Goel: You need to have only one previous container which again? Is not something can be used in our environment. the data protection these applications For example nutanix, they expose the ice skating devices and they say that you want to backup overlays because that's preferred. for various reasons rather than NFS or other protocol, so
Nalin Dahyabhai: We rely obviously on buying out so Guys, cuz he would be happy we would prefer the ice cuz he'd be managed outside of the container in order to manage. I had something like ice goes inside the container. You probably gonna need capsuadmin which is pretty much going to give you control the system.
Vikas Goel: and it will be the similar problem like fiber channel I mentioned but I think you talked about over there that
Vikas Goel: previous process Eating the device inside. You will see that yeah.
Nalin Dahyabhai: the links kind of only allows you to know. a very small subset of file systems since without capsid and those are all the ones we allow on ruthless mode.
Nalin Dahyabhai: All right. Yeah, you can't even do NFS right now.
Vikas Goel: That Few years back. There was some principles committed
Gerry Seidman: Thanks for noting that then I do that was one of the things I was going to bring up at some point.
Vikas Goel: a while back. There was somebody from suse or somebody trying to make ice Cuisine namespace aware.
00:30:00
Vikas Goel: but that didn't go in the Linux resource
Vikas Goel: the one to understand is there a challenge with making ice because he named space here. That's not there yet.
Nalin Dahyabhai: when they making a namespace aware. I'm not sure what they were trying to do. usually a remote API we're basically doing some kind of network storage if there's any enforcement on the server side. It's going to come in conflict with the username space. So that's the classic problem we have with Mounts that we might be able to use the namespace and the NFS Mount server side doesn't know about the user namespace, but other things that we want to make a namespace away. I'm not sure what else they would be looking at.
Vikas Goel: yeah, what I meant to say is that because it's Running inside containers and that can be multiple such containers. but they have their own network name space. So again, our networking is such a way that Every container is through maculan.
Nalin Dahyabhai: All good.
Vikas Goel: their independent they're not sharing any networking space any two containers. They don't share Network base. So they are totally independent isolated.
Vikas Goel: And these application containers can then what we want is that run their own eyes because they servers listening on their own network name is space.
Nalin Dahyabhai: Yeah, I think the problem there is is again that the is probably Colonel information being passed back and forth at the colonel Canon Sure isolation on
Vikas Goel: Right, right.
Vikas Goel: That's where I was talking about making it name spaceware because today it's easy as in the kernel namespace of you can't Run it in multiple Network container. Yeah.
Nalin Dahyabhai: yeah.
Vikas Goel: So the patch I saw for making it. Ability to containerize was pretty content. Not a lot But for whatever reason I don't know didn't merge into the open source.
Nalin Dahyabhai: Yeah, I would contact the developer and see if he has any comments on it.
Vikas Goel: Yeah, it's been four five years when I saw that that was Eden. But I thought it was also working on something From that comment or something?
Nalin Dahyabhai: Yeah, I wouldn't know about that. I would contact the red hat Carl system teams like Steven White House one of those guys and see if they have any comments on that.
Vikas Goel: And okay.
Vikas Goel: okay, I think those were the topics I had
Nalin Dahyabhai: Okay.
Tom Sweeney: Right great. Thanks vikas and…
Vikas Goel: yeah.
Tom Sweeney: I think that is all the topics that we've had in advanced. Everybody have anything they'd like to ask about or talk about today.
Nalin Dahyabhai: I guess I had.
Nalin Dahyabhai: An issue that has come up that I want to make everybody aware of that. Running podman in emulation mode or podman commands or Scorpio commands to build a commands and emulation mode. Is not going to work. or anybody that attempts to run say pod man that are acute you use a static application doesn't work because nalin figured out that programs that reex itself use it acume you use a static screws up AG vizro. Ordinarily aggraves Arrow should point to the executable with exacting itself. And for some reason an emulation mode. the emulation puts RV one into the place about zero
Nalin Dahyabhai: so if anybody's ever tried to run a pod man build with a podman command inside of it on a different act than the native Arch, you're going to see weird errors there podman complaints about the second parameter and can't find in the case of when I was doing with Scorpio comes up and says can't exact slash or something. And so it's just something that a lot of people are now that they're on Max are attempting to run things in emulation mode when I'm system to an x86. So it's something that everybody should be aware of if you start seeing these types of issues. That's because they're running an emulation. I don't know how we can fix it. But it is what it is the emulate the whole BM. For you, yeah.
00:35:00
Nalin Dahyabhai: But yet another reason to push back on people asking us to support you use a static.
Nalin Dahyabhai: It's great. But it does have some limitations. Yeah. it's kind of
Brent Baude: Damn, aren't you the one asking us to support that? And does anyone else weirding out that the nalin's picture is speaking and…
Nalin Dahyabhai: yes, I'm not asking.
Brent Baude: Dan's voice is coming out.
Nalin Dahyabhai: Yeah, we're both in a conference room, but we got here late didn't side to hook up the conference system. We just hooked up nalin's already running talk if it makes it easy to pretend like Dan Walsh. Impression has flawless.
Brent Baude: I like that better.
Nalin Dahyabhai: now it's been living here for a while so he could talk to Boston accent pretty well.
Tom Sweeney: e
Nalin Dahyabhai: That's on it Brent.
Brent Baude: is the human user static thing is it declared as a bug and is it going to be tracked Upstream?
Nalin Dahyabhai: It's been track since 2020. This one was right about dashboard.
Brent Baude: another one of those. Okay. Thank you.
Nalin Dahyabhai: Yeah. Other things like the multi-threaded the part where the program here emulating uses. Depends on call certain apis you can't call when you're multi-thread it because the emulator is usually compiled multi threaded that will fail too. really? Yeah, there's some quarter cases. they ran into is up is also I know you can't use any said your ID apps while you're in. yeah. So, there's quite a few. you can configure there's a lot of people pushing to use c** you use the stack but support it and as I've been playing with it. I'm finding it less and less. useful just because it's gonna blow up and weird ways that we're not a necessarily able to explain to the customer.
Nalin Dahyabhai: But they're going to come up more and more because people are on jumping on to Max.
Tom Sweeney: Yeah.
Tom Sweeney: Okay, any other topics are questions?
Tom Sweeney: just more we're thinking about that. I'm just go for the next meetings that we've got coming up our next meeting for the cabal meeting. We'll be on May 21st 2024 again at 11 am Eastern the GCC minus 5 at that point time and then our next community meeting will be a couple weeks after that on June 4th. Also a Tuesday at 11AM and that against Eastern Daily Time UTC minus five. one less call for topics questions announcements
Nalin Dahyabhai: And Tom the next time we do one of these we should probably try to get the Pod man boot C team to do a demo.
Tom Sweeney: Okay, I will add that's a possible topics.
Nalin Dahyabhai: Was anybody hasn't seen it? It's pretty impressive.
Tom Sweeney: And by yourself have any other possible topics for next time, let me know. Or Adam to our agendas.
Tom Sweeney: and with that I'm going to thank everybody for being here today and for the talks and I'm going to stop the recording.
Vikas Goel: Thank you guys.
Meeting ended after 00:39:06 👋
```
