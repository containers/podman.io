# Podman Community Meeting
## February 4, 2025, 11:00 a.m. Eastern (UTC-5)

### Attendees (23 total)
Aditya Rajan, Ashley Cui, Aykut Bulgu, Brent Baude, Dan Walsh, Danish Prakash, E. Castedo Ellerman, Gerry Seidman, Jan Rodak, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Mark Russell, Matt Heon, Michael Winters, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Nicola Sella, Paul Holzinger, Peter Volkov, Tim deBoer, Tom Sweeney,

 ### Topics

 1) Podman 5.4 Update - Matt Heon
 2) Firewalld in Podman 5.4 Update - Matt Heon
 3) CNCF Update - Neil Smith
 4) Artifacts Demo - Brent Baude
 5) Netavark 1.14 New Features Demo - Paul Holzinger
 6) Personal Multisession Containers & cnest Demo/Questions - Castedo Ellerman


## Meeting Start: 11:02 a.m. EST
### Video [Recording](https://www.youtube.com/watch?v=451s1B31VGA)

##  Podman 5.4 Update
### Matt Heon
#### (1:47 in the video)

In the release candidate phase for Podman v5.4, the Final release is expected next week.  OCI artifacts is the most significant new feature.  This will be an ongoing work.

There are two breaking changes this time. Podman on Mac, especially Intel, support is moving to the best effort as the Red Hat team doesn't have hardware access.

There are also some minor changes in how comments are handled in quadlets, such as moving to semi-colons as separators.

In addition, a number of bug fixes as noted in the [Release Announcement](https://github.com/containers/podman/releases/tag/v5.4.0-rc2).

##  Firewalld in Podman 5.4 Update
### Matt Heon
#### (4:54 in the video)

New feature strict port forwarding, can't run port through the firewall, and this is not a general configuration.

##  CNCF Update
### Neil Smith
#### (6:20 in the video)

We've been accepted by CNCF and are going through the onboarding process. CNCF is likely to create a Slack channel. Our Matrix may be moving, and the same goes for the mailing list.

The podman.io domains need to be hosted by CNCF, and artwork will be moving over, too.  

Code of Conduct and Maintainer pages will be changed to the CNCF’s version.

Eventually, we will have to move our GitHub Repositories. All changes except the GitHub move will happen in the month.

CNCF Tracking page: https://github.com/cncf/sandbox/issues/338

##  Artifacts Demo
### Brent Baude
#### (9:48 in the video)

This includes verbs/commands for add, inspect, ls, pull, push, and rm. As it deals with container registries, pull and push will operate as they do for images.

Demo - (11:04 in the video)

Showed how to do an ls, similar to how an image ls is done.

He then pulled an artifact, which was like an image. If an artifact has multiple files, its size is the sum of all of the files.

Podman inspect shows all of the info on the artifact, again it's similar to inspecting an image.

Podman add allows you to add one or more files to tha artifact, and it returns the digest.

The rm command acts like rm for containers.

We will be adding append and extract over time, they may or may not be happening in Podman v5.4.

ALS doesn't require the artifact to pull and expand the artifact.  Brent said we're not expanding, just pulling and pushing it into the container.  Gerry, Brent and Dan discussed potential uses, and will talk further post meeting.

This is especially useful in Kubernetes and the AI space.

Brent is trying to avoid tagging as it complicates things, but is thinking it may need to be done.  Dan wants to be able to push from artifact A to B, and that's not doable at the moment.	Dan would be OK with us just being able to push with a new name being used.

##  Netavark 1.14 New Features Demo
### Paul Holzinger
#### (25:35 in the video)

Demo - (25:53 in the video)
Showed a bridge with a normal interface.  He showed changes with DHCP, traditionally it only worked on VLAN.  He has an IP that's the same as the VM, and was able to see the network.  You can now see which IP is owned by what.

The bridge driver supports a new ability to disable DNS.  And he showed the rules that were in play.  

You can now create a bridge with DHCP, similar to macVlan.  Which allows for connectivity that had not been available before.

Bridge is useful if you have an existing bridge, and you can set up a new bridge for all of the container related devices and the host to talk.  This wasn't possible in macVlan.

Another new feature is Vlan support for a bridge, however no demo at this time.  He showed how you create the network in that scenario.

Paul will be working on a blog.  Vlan support will be in Podman v5.4 and netavark 1.14.

## Personal Multisession Containers & cnest
### Castedo Ellerman
#### (35:22 in the video)

The cnest project started out like toolbox, evolved from a monolithic Python CLI.

Due to Podman additions, his script was shrunk, and now it's a guide and a few bash scripts.

[Guide](https://cnest.readthedocs.io/en/latest)

How do people use local containers for local development isolation?  Who has heard the term "host-op"?

Core Target Functionality
 	containers are neither auto-removed nor long-term/permanent
 	persistenc of isolated changes in containr
 	use both Debian and RHEL based container distros
 	partial isolation from hostop (desktop/laptop), and partial integration.
     
Generally his containers last few a few weeks or months at most.  

He likes the partial isolation of Podman.

Dan asked how Castedo decides to move a container?  Does he see how long a container has stayed around, and should be moved?  Generally he uses scripts, Buildah and Podman.

Demo - (41:55 in the video)

He generally runs a wrapper script, under 100 lines, and he thinks most people would just copy the script.  The cnest utility is a wrapper around Podman.

He uses different visual prompts showing if he's in the host or in a container.  

When he goes into a container via the script, it runs the container, and then cleans up as you leave.

Are there any special configuration files with cnest?  He'll talk about that after the next script demo.

The script, if jumping into a container with a shared directory, it keeps the directory focus.

Configuration is done in `create-cnest`, largely a wrapper for `podman create`.  He found that with Podman, you can have a lot of options, and then the image at the end.  He's reversed that, having the image first, which allows for autocompletion to complete more easily.

Note, cnest doesn't run the command in the container, rather it runs a vim shell and exes in.

He then showed a number of commands being run with cnest.

The wrapping of create cnest, due to the image being at the beginning, has made him modify the script slightly based on what he needs in that particular environment.

The base image is the quay.io/podman/stable image.

Castedo asked if folks do Podman in containers?  Dan pointed out the Podman modules are used which allows you to specify a specific containers.conf file to use for the container to create.  A number of HPCP shops are using this method.  It's something that went into Podman about a year ago and Castedo will take a look at it for cnest.

He sometimes has a few more containers that he'd like, he noted..

Dan said, let the team know if you have suggestions that will help cnest.

## Open Forum/Questions?
#### (1:01:01 in the video)
1) None

## Topics for Next Meeting
1) None


## Next Meeting: Tuesday, April 1, 2025, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, March 4, 2025, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 12:01 p.m. Eastern (UTC-5)


## Google Meet Chat copy/paste:
```
 Aykut Bulgu
 11:10 AM
 could you share the link for this if possible?
 Neil Smith
 11:10 AM
 https://github.com/cncf/sandbox/issues/338
 Aykut Bulgu
 11:10 AM
 thanks
 Dan Walsh
 11:16 AM
 Should we have a podman artifact tag?
 You
 11:20 AM
 I'm having some construction work going on outside my window, apologies if the noise bleeds over.
 Matt Heon
 11:22 AM
 I think what I'm hearing is we need to consider an Additional Artifact Store
 Aditya Rajan
 11:27 AM
 artifact tag, sounds useful
```

## Raw Google Meet Transcription
```
Tom Sweeney: Morning everybody and welcome to the plot man community meeting. Today is Tuesday February 4th 2025 report. as a reminder what this meetings is all about. We meet on the first Tuesday of even a number of months such as February, April so forth and we may move the timing from time to time to make it friendlier for India to China and Australia although we haven't done that for a while. We probably ought to.  topics are driven from prior meetings or requests to me at tweeny redhot.com or you can add them to the agenda as Castello did which is great love that we accept any discussions that are related to podman buildilda scopio or any related container projects here we also have a kind of a cousin meeting a podman cabal meeting which happens on the odd number of months on Tuesdays first one of the month and that's more of a design and ideas for changes for podman kind of a meeting I'll be taking the meeting notes inside the hack committee
Tom Sweeney: noted here. If you see that I've messed anything up or you want to add to it, especially if you have any URLs that you want to include, please let me know. And presenters, if you could send me any of your slides after the meeting, I would appreciate it and I will include those. So, today we are going to start off with a Podman v 5.4 update which is coming up in the next couple weeks here. And then Matt will also go and talk about the firewall D and Podman update. Neil's going to give us an update on where we stand in our move to CNCF for Podman buildcopying and others.  Brent's going to be giving us a demo for artifacts which is a new feature that's coming in with pod 5.4. Paul will be talking about netark's new features that are coming up shortly. That tool will be involved with 54.4 release although net itself but kind of tagged together. And then Gustto will be talking about personal multi session containers and cest. And with that I will hand it off to Matt to start us up.
Matt Heon: All right, we have a packed schedule. So, I will try and keep things brief. let me go ahead and share the release notes and just Okay, so as people may be tracking, we are in the release candidate phase for Podman two weeks ago we did RC1. Last week we did RC2.  I am expecting RC3 today or maybe early tomorrow depending on how things go and final release should be next week assuming all goes just a brief overview of what to expect. Our starring feature is support for OCI artifacts. This is still very early. it's not fully feature complete and we reserve the right to change the user interface because obviously we're still figuring out what the best way of doing things is.
Matt Heon: feedback very welcomed. But we've added a suite of commands under part man artifacts which are used for interacting with OCI artifacts, pushing them to registries, pulling them down and obviousations for this are going to be putting large files particularly AI models but basically anything inside of containers easily. we have a bunch of other updates.  We have some updates to podman update which allows you to make changes to health checks. We now have subpath support for volumes. We do have two breaking changes I would like to highlight. we don't usually do these outside of major releases, but we decided these were not sufficiently large to require a major release. number one, Podman on Mac and specifically Podman on Intel Macs.
Matt Heon: We don't have sufficient hardware to adequately test this and at the moment we're basically moving it over to best effort support. We will still accept patches related to it. We are still going to be producing binaries and machine images so you can still use it. But our ability to fix bugs is limited by developer access to hardware. If anyone wants to step up and help us maintain this, we would welcome that. But for now, we are moving it down to best ever support only.  And second one, there is a minor change to how comments were handled in quadlets which involves an accident where instead of using semicolons for comments like system D does, we accidentally coded it up to use colons instead. we're fixing that so it uses semicolons. I doubt many people found this feature but if you did, you will have to change your quad files for podman 54. So that I believe is a good summary of what to expect.
Matt Heon: We have a good bevy of bug fixes. We've got some minor API changes and I'm expecting some additional fixes to land shortly related to putting NVIDIA devices inside of containers, particularly using the remote API and Docker Compose. And yeah, that's about it for Podman 54 updates. next up was Podman Firewall D. I will also keep this one brief.  So Firewald D has added a new feature in Firewall D230 which isn't released yet. No, I'm wrong about that. It's released, but it's not in DRO yet. That's what I was trying to say. but it's called strict forward ports. Is not enabled by default, but if it is turned on, it basically prevents all port forwarding from happening with Podman containers.
00:05:00
Matt Heon: We have included a patch in the net version that will ship with podman 5.4 that will throw a helpful error if this happens. But basically TLDDR if you turn on strict forward ports and firewall D you cannot use podman run hyphen P you're going to have to manually forward the ports with the firewall D API. and the reason behind this I imagine is system administrators who don't want podman automatically forwarding ports through the firewall. So not enabled by default but if you do enable it things get very different. Okay. Tom, back to you.
Tom Sweeney: Okay, great, Matt. Thanks. Anybody have any questions on any of that?
Tom Sweeney: Righty, I'm just going to give it a quick beat between these since we do have a number of talks today. And with that, I will hand it over to Neil to start up our CNCF discussion.
Neil Smith: Okay, I'm just sharing my screen with and…
Neil Smith: I'll give you the issue tone to put in the minutes. But we're very happy what they call the TOC has accepted our application to contribute podman and build and scopio and a few other things to CNCF and we're going through the onboarding process right now which may have some changes that will be impacting us in the future.
Neil Smith: which is like we're going to set up a Slack channel in CNCF so we might have to think about how the messaging platforms we already use matrix and stuff like that and we'll probably have to think about our mailing lists and stuff like that as well but we'll be going through these tasks.  So basically some of these things are here where we have to figure out we have our podman io domains that we have to give change to CNCF ownership. We have to send them our artwork the seals etc. And some more website changes. we've done already the DCO.
Neil Smith: we have to make sure our code of conduct is up to date and our list of maintainers is sent to them etc. So not big things but we'll be starting that and one of the big things was that we were supposed to move our GitHub to a standalone repository but we will be not doing that immediately because it has large impacts to our CI/CD and that's the update.  So, we're planning on they want us to try to get this all done within a month. So, we'll be working on that and then we'll move on to work on moving through sandbox into incubation. And I can put the link in chat. That's it. Any questions? Correct.
Tom Sweeney: Just a clarification, the GitHub move isn't planned within a month, Is all the documentation,…
Neil Smith: Yeah. Yes.
Tom Sweeney: procedural kind of stuff.
Neil Smith: Mostly documentation procedural except for I think the messaging might be something that we move a bit quicker on or something like that. But we'll figure it out. We'll let everybody know and do it publicly. It's all in the CNCF world.
Tom Sweeney: So given that, thank you, And next up, Brent doing demos for the artifacts that we're just talking about a little while ago.
Neil Smith: You're on mute, Brent. Yeah,…
Brent Baude: How are we looking? Is that legible?
Neil Smith: good size. Yeah, good side.
Brent Baude: All so as has been mentioned, one of the features going into 54 that we're excited about is revolves around OCI artifacts. And this is our initial implementation.  It's largely at this point around the ability to be able to manage these artifacts and they are managed much container images and so in the sense that they're managed on the local file system unlike manifests purely they're kind of managed they have I'll say a little bit of a state information you can see
00:10:00
Brent Baude: the typical verbs associated with most of our objects in that we have an add and an inspect and a list a push and remove. the upside here is because you're dealing with image registries pull and push are going to be largely the same as pushing with images including the various TLS certificate related options that come with that.  So, I thought I'd just walk through a typical workflow and show it off a little bit and then please, if there are questions, just do the hand raised thing and I'll pause and you can ask a question. All right. So, to look at what's in our current local store, you can use something like LS. here we've got a very similar look.
Brent Baude: I currently don't have anything pulled. It should be very similar as images there. that's intentional to try to keep some comfortability between what folks already know and what we're displaying.  The ls command has is one of the ones that has a few different options. we can much like images there's a format, there's a no trunk which means you get the f full digest and then the no heading which just removes the header off of what's returned.
Brent Baude: we can also do things like pull. I have a multifile artifact sitting on quay that I'll pull. and you can see there very quickly it's the same user experience you get with container images, which is intentional.  And if we take a look there, that's how that is displayed. if you have multiple files, the size is the summary of all of them or the accumulation of all of them.
Brent Baude: Inspecting an artifact is very much the same as what you're used to seeing in the sense that it's the same format options, but the output is slightly different. And this is just a makeup of what an artifact more or less looks like with the exception of the name and in the digest.
Brent Baude: here we have a single artifact image. It's can be reflected as a single layer in there. And the original title of the file was one two three. If we look at here now you see there are multiple layers.
Brent Baude: Dan, I'll hit that at the end if that's cool. and you can see there they're just RD1 and RD2 and they see the size and bytes. also there I have a file called new artifact. It's just a gzipped data file if you will and you can add that to your store.
Brent Baude: by doing something like I mean it doesn't even have to be that it can be fooar latest and you give it the name and then the path to it pod man artifact add  the fully qualified image reference. We will not do short names with artifacts. And then you can pass one or more files. So there's another one called homework. I can do two files and the digest comes back. It's worth looking at the add command.
00:15:00
Brent Baude: There's also now the ability to annotate the artifact files as well as set an artifact type which is the overall type for the  artifact ad will we have a teammate who is currently got a PR that's probably quite close it won't make 54 I don't believe but it allows you to go in and do something like let's say you wanted to do something like this and you already have that local we're going to
Brent Baude: have an append flag here that would allow you to take an existing artifact and add a new file to it. which will y. It'll be a nice feature. All right. probably we already saw a push.  I'm not going to demo cuz it just will take up bandwidth. But a very very similar experience as before. And then if you want to remove it's quite simple here pod man artifact remove hit enter and you get the digest back just as an acknowledgement that it removed it.
Brent Baude: So, where we're going, I talked about the append one. There's a soon to be introduced extract where you can take a artifact file out of the manage store and pipe it to somewhere on your file system.  And then the big clencher is and the whole reason we're doing this is we'll write a volume driver for artifacts such that you can mount an artifact right into the container as a volume. you can easily imagine that you're trying to run some AI workload and you want an ML that's distributed artifact inside your container.
Brent Baude: that will become almost trivial to do. and that's really use case number one and goal number one for us. So you'll see development on that over the course of the next quarter. Questions before I talk about Dan's question with our volumes.
Gerry Seidman: I have a question regarding additional layer storage. this when I'm sure you're aware of the image volumes in the Kubernetes world but what you're talking about mapping a volume is analogous it will artifacts travel through the ALS path in order to take advantage of the advant of ALS or not with your volumes. Yeah.
Gerry Seidman: where you're going with mounting artifact volumes…
Brent Baude: No, it'll be largely a bind mount.
Gerry Seidman: if there…
Gerry Seidman: but will it do a bind mount from will ALS also does a bind mount but are there without ALS it downloads the artifact and…
Brent Baude: Okay. …
Brent Baude: can you tell us?
Gerry Seidman: and expands it locally and with ALS doesn't have to do that. Additional air storage.
Brent Baude: We're not actually touching the artifact. However, we're pulling it down and in the form that it was pushed will be the same form it ends up in the container. Yep.
Gerry Seidman: Understood. Okay. I'll have to see how you implement it because there are many advantages of additional layer storage for artifacts.  In fact, this came up in a meeting with a client with an end user yesterday.
Brent Baude: Jerry, I'm happy to continue to have conversations with you on that. I am being asked.
Paul Holzinger: I think the answer is our artifact store is completely separate from our existing image storage and…
00:20:00
Paul Holzinger: and the additional storage that are attached to that. So the artifact location is separate and there's no sharing going on.
Gerry Seidman: …
Gerry Seidman: since it goes through the storage libraries, if you have ALS enabled, it would automatically do that because the storage libraries don't care. Is that what you're saying, Paul? does not okay. All right. There would be advantages of it doing it though.
Dan Walsh: I think Jerry why don't you take a look at what's been implemented and if you have ideas we consider obviously pulling these things locally is I mean when you're talking about AI images or…
Gerry Seidman: right.
Dan Walsh: if you're talking about things like cucos and things like that they are huge. So if there was advantages that we could allow customers to take advantage of them to needed to pull…
Dan Walsh: then that would be helpful.
Brent Baude: Yeah, what we're trying really Jerry that the technology behind it's not been much of a challenge.
Brent Baude: The challenge is determining how people are going to actually use these and not some weird edge use case that we better, our interface on.
Brent Baude: So the hardest part has been really kind of narrowing down how do we get the most use out of managing artifacts for folks and getting them in the K container because the reality is for advanced function we have manifests we have a manifest command with all its verbs and it's quite flexible here we're just trying to do simplification of how to deal with manifests and how  going to deal with artifacts.
Gerry Seidman: Okay. Again,…
Tom Sweeney: Yeah. Thank you.
Gerry Seidman: I haven't looked at the implementation. I'll have to look at it.
Dan Walsh: there is the drivers for this right now are mainly AI and getting something into Kubernetes so you can imagine if you had right now in Kubernetes when people are running AI models they're just using S3 content so Kubernetes really doesn't know about what's going on but as an OCI content then Kubernetes could manage it so it would know when to pull it,…
Dan Walsh: which containers are using things like that. So that's the number one goal for and similarly for colets and things like that. Image artifacts versus images. Yeah, it does.
Gerry Seidman: Yeah, I was under the impression that image volumes were going through the same storage.
Gerry Seidman: No, no, the Kubernetes 131 new volume type called an image volume.
Dan Walsh: So that's in there,…
Gerry Seidman: Yeah. right? Yeah.
Dan Walsh: but that's basically a bastardization of images, So what people are doing right now is they're taking an AI model and they're basically doing a container file that just does a copy of the AI model into an image. So instead now you have a massive file. instead of having a massive file, you have a tied up massive file and you lose the ability to do certain things in it or really what happens is everybody's sort of developing their own way of doing it. so right now everybody's using OCI images with just single files in them and the goal of artifacts is to not have to do that mechanism. Yeah.
Brent Baude: Yeah, I think Dan,…
Brent Baude: I'm trying to avoid tagging because it certainly complicates things. I think if in the end use cases bear that out, we'll have to cross that bridge. and we may already be on that bridge. but for now, no. Yep.
Dan Walsh: Yeah. can I push from A to B?
Dan Walsh: So yes, because I'm thinking more around if I create an artifact that is labeled latest and…
Tom Sweeney: f***.
Dan Walsh: Als I also want to have it labeled as 5.0 go to have two labels to the same artifact so that's…
Dan Walsh: where I'm seeing because certain people are going to want to freeze on a certain version of the artifact and then there'll be newer versions of the artifact coming along I think…
00:25:00
Brent Baude: I think it's a fair ask that when we push we can name a destination that's different.
Brent Baude: Yes. Yep.
Dan Walsh: if you had that that would probably eliminate the need for tagging
Brent Baude: Any other questions? So, we'll kick her back to Tom and move along. Wait. Mhm.
Tom Sweeney: over to Paul to talk about NetVark 1.14 new features that are coming up. Take it away, Paul.
Paul Holzinger: Okay, you should see my terminal. so this is showcasing a few features that were added and most of them were actually contributed by community contributors. So many thanks to them. just showing them off here. So it's not all my work.  And so first of all just to give you an overview of the system here.
Paul Holzinger: so I have a bridge and I have the normal Ethernet device connected to that bridge and so I want all my traffic going through this bridge basically and connected to my containers and before that so today the bridge code in net always assumed we create our own separate bridge and then do  masquerading and DNET and stuff for all the traffic and now it's a bit different but the first thing I want to show is some DHCP change where we sent the container host name to the DHCP server. So traditionally DHCP only worked on MC VLAN. So I'm just showing real quick MC van example.
Paul Holzinger: So if you now run this, I of course didn't enable the unit. Lovely life demos, aren't it? That's fun. That happens when you reboot before you do your stuff. So all right but the start should now perfect. So now you have the usual DHCP. So this is in the network the same as the VM on the bridge also. And you can see in the locks from the DHCP server.
Paul Holzinger: So DNS MQ on my host. we got the host name here. So if you have your average home router or any advanced router with graphical interfaces, they have some form of showing you the host names from the DHCP request and then you can actually understand which IP is owned by what device and not just see the MAC addresses which are randomly generated for container.  So that was a bit annoying to work with and now you just have the host name and that's much better. And then there was to the bridge driver a new mode added. It's called unmanaged. So if you have the command you the opt mode unmanaged.
Paul Holzinger: And what that does is basically disables our management of the bridge how we think we do it with the masquerading and the nut and instead we don't create firewall rules. We just assume it's an existing bridge that must exist.  So I'm using the BR0 bridge from M host and then you just create the network with that and it will sort of just directly attach it like most VM manager would handle it. So now the network is created and I just run a container on it and I list the rule set. So right now it's a bit these are all firewall D rules.
Paul Holzinger: So you can ignore them. But at the bottom usually if you do it in the normal way you get the netavark table with our new NF tables driver and there are no firewall rules at all needed because you're directly connected to a bridge that is directly bridged to some external interface. so it can look at the interfaces. Now you have the web pair for the container.  So the one part is attached to the bridge and the other part is in the container. so let's remove these networks. And now you can combine that with the HCP. So the current version just used the hardcoded IPs which are the default just the subnet range that is a site normally.
00:30:00
Paul Holzinger: But now I'm requesting the IPM driver DHCP and that is now very similar to the MAC van which was the first example but what we only did before and with that created so I start a container and I can exit to show the IP addresses. again from my local network connectivity is also working. It pulls the gateway from the DHCP server. and yeah it's again just some web pair assigned and attached. And with that you now have this bridge driver working similar to McVan.
Paul Holzinger: The main difference why you would want to use bridge is if you have an existing bridge setup with virtual machines or for whatever reason then you can have your containers via the same setup and then all the devices can talk over the bridge and the bridge also is the bridge IP exists on the host and you can talk to the host system which is not possible via MCVAN because McVlan  in the kernel. it's special that it bypasses the host network and that also means it bypasses host network firewall rules and routing policies that exist there and it's good straight to the MC through the McVin interface. and with bridge the bridge is on the host.
Paul Holzinger: So these are the main two difference why you would want to use bridge and if you need that that depends totally on what you want to do. for most people make van works fine and There's another new feature which is VLAN support for the bridge. So you can have two networks with VLAN assigned.  So it would look like I don't have a working demo here because I didn't manage to get the VLAN on my bridge interface correctly working without killing my SSH connection before the demo. but I can show you how it looks really quick.
Paul Holzinger: So you do again the network create and then you again want to combine this with the mode unmanaged and then you just say op vlan and then you use your number that you want to use for this network.  So I don't know Ver number 10 and then I just call the network Ver number 10 and say the bridge interface name BR.
Paul Holzinger: So yeah that would look something like that for the net config and then you would run it in the same way but if I do it that it doesn't work on that bridge but in the end so if you do bridge van show unfortunately I don't have it working you would have the website assigned to the other van ID basically from the ports
Paul Holzinger: And what you can do is basically on the same bridge so PR0 you can create another network for van 20 and so on and then you would have all the different vans on the same bridge which if you have physical networks and need this vain separation through the subnet that might be of use for that So, I'm probably going to write a small blog about these features and then I will hopefully have a working van example to show there. And with that, any questions?
Tom Sweeney: I just have a quick one on the VLAN support. Is that expected to land 54 fully?
Paul Holzinger: That is all expected or that's all merged.
Paul Holzinger: It's in Portman 54 and Netherwalk 1.14. All these features together
00:35:00
Tom Sweeney: Any other questions? With that, I will thank Paul a nice demo and we will move on to our last topic of the day or not last topic but our last demo of the day and have Castto Ellerman show us about personal multi session containers and CN nest. Go ahead.
E. Castedo Ellerman: Thank you. Let me share my window.
Tom Sweeney: Thanks for coming.
E. Castedo Ellerman: Oops. One second. So I I guess give some background first. thanks for having me show this. is the size look okay as far as text size?
Dan Walsh: Yep.
Tom Sweeney: Yep.
E. Castedo Ellerman: So just for some background on C nest the kind of starting point was I would say a decade ago I would s SSH from my Mac laptop into local Linux VMs.
E. Castedo Ellerman: So when containers came around that was super exciting to do something bit better and when podman came around I was super excited about podman rather than using docker for many reasons. cest originally started out as a monolithic python utility kind of similar to toolbox. It was inspired by toolbox but at the time toolbox was not something I wanted to use for a variety of reasons. it was pod that this utility in its old form was largely motivated by shortcomings of podman. And last year I did a massive revamp of this utility because podman has advanced so much and basically made most of what I had written obsolete. So I wanted to give kudos to the podman team to basically slowly been adding functionality that made my original script less and less necessary.
E. Castedo Ellerman: So what the script is now is really mainly a guide and some starter bash scripts because I really figured out that the vast majority of functionality could be done by just a thin layer of bash scripts on top of existing podband functionality. so the website or this guide is it's in the notes cest. and it's mainly talking about how to use Podman. but it also, has an RPM package where you can start out with these two scripts.
E. Castedo Ellerman: in terms of a little bit of background for this presentation, I'm partly motivated because I'm curious what other people do or to the extent that other people are using local containers and actually doing development inside the containers. over the past 10 years, I've been somewhat surprised that I don't know, just something that else has come along. so I find myself still kind of using these scripts on top of podband which and toolbox has become very much a tool that integrates very tightly which is actually isolation is one of the things that I like doing development.
E. Castedo Ellerman: and I'm also mildly curious as quickly whether anyone has heard people using the term hosttop hoptop. because that is often how I've been identifying the operating system that's not containerized. as far as the functionality that I'm going to demo next and kind of the core functional because there are a lot of bells and whistles that are thrown into these bash scripts and what I'm going to show but at the core level or the key traits is that the containers are not ephemeral. They're not immediately auto removed and they're also not long-term permanent containers. I get it.
E. Castedo Ellerman: It seems that a lot of users that are doing toolbox are really using containers as a long-term like they're holding on these things for a year or two and at least for my usage scenario they're very much not permanent but they're also not auto remove so they're persistent and that your isolated changes that you might be doing are staying in the container not immediately getting removed but eventually I stop using them and my containers probably live it kind of depends on the project what I'm doing but they generally
E. Castedo Ellerman: live maybe months but generally they're not the permanent because I use container files or docker files with builda to actually make what's permanent some of I guess toolbox the other key thing is that I switch between doing development on debian based distros and red based ones so even though my laptop is on red hat I'm often, flipping back and forth between doing development and the command line on totally different distros, which is one of the things I love about containers. and then at least for my scenario, I know a lot of users don't seem to want this or they want lots of integration. That's actually one of the things I liked about Podman it's isolated first and so I like this aspect of having partial isolation and partial integration.
00:40:00
E. Castedo Ellerman: Yeah, Dan,…
E. Castedo Ellerman: your hand is raised.
Dan Walsh: Yeah. …
Dan Walsh: do you have to make a human decision when you want to auto to remove an image or I mean not a container do you have tooling to help you that list a container I haven't used in the last month two months
E. Castedo Ellerman: For the most part, I'm trying to use Builda and Podman as much as possible. So separately I'm not showing it here but I have kind of a setup for building images that's actually continue integration with GitLab but it could be locally but whatever however someone is building images this is kind of independent of that and this is more once you have images then how are you kind of creating these medium-term containers. I don't…
Dan Walsh: Okay.
E. Castedo Ellerman: if that answered your question.
E. Castedo Ellerman: at least in this guide I just suggest people use podman ps and I don't do anything fancy. I also have this little trivial script that pitifies and shows things in a certain way but I'll show u what it looks like. and if anyone has questions feel free to interrupt. I won't get thrown off. so that was the last thing.  So, let me quickly show so what you're looking at right now is my hosttop or the non-containerized environment and I rely on a little bit of embellishment of having the icons to know where I am on a typical situation is I'm running one of these wrapper scripts which it's maybe 80 lines it is part of this RPM that the
E. Castedo Ellerman: guide suggests, but it's really trivy enough that I imagine most people would just, want to copy it and integrate it into their own scripts. But this CS is really just a wrapper to calling Podman. But in my typical usage, I have a couple of containers that I'm, hopping into. One of them is development on Fedora.  So I'll run C nest and I'll drop in to a container environment that has some visual indication that I'm in a different container. one of the details is that I like is that I choose not to have so much integration that my entire home drive is shared.
E. Castedo Ellerman: So, this home drive has less crap in it than say when I'm back at my hosttop, where I have, much more stuff I should do do all, much stuff going on. and so depending on the env in the container, so there I've got another one that's I use for building packages, it'll be much, more minimal. so that's an example of, these different degrees of isolation that at least and I also somewhat curious to what extent people seek that degree of ol it's ugly message. as in terms of listing the containers u so typically more or less what I do I have a script that makes it a little bit nicer to look at is I'm just doing psall.
E. Castedo Ellerman: So I'll have containers. They might be running, they Doesn't matter. I'll just ps and so you can see I've got these containers that have been around for a while. what was the and I should mention that you'll notice that none of them are currently running.  So even though I enter a container so I'm in this container and now if I go to a different window and I do ps all you can see that container has been up for 7 seconds. the script cleans up. So it automatically logs out. and now you can see that the container is no longer running.
E. Castedo Ellerman: So it does a little bit of accounting just to kind of but for the most part one of the things that I found I was always kind of working around was this awkwardness of whether containers are running or not when really what I'm going for is multi-session being able to have multiple terminal windows and be able to jump in and jump out of the container with its separate semiisolated environment for development. so that covers C nest there's a lot of bells and…
00:45:00
E. Castedo Ellerman: whistles. you know what question?
Dan Walsh: is in CDS do you have some kind of special configuration file I mean when you saw your limited home directory there those are bind mounts from the home directory or…
Dan Walsh: volume mounts from the home directory in  Okay.
E. Castedo Ellerman: Yes. Yeah.
E. Castedo Ellerman: So one of actually let me answer that question after I show the other bash script that's basically a wrapper for build odman create. So CS is basically just a wrapper for podman run or actually exec now that I think about it it's a wrapper for podman exec. because if you notice the command that's running in the background is always sleep in.  So, these containers these personal multi-session containers, they're just always sleep in the background with a couple of settings so that it's just quietly running in the background if it hasn't been cleaned up.
E. Castedo Ellerman: one other nice thing with this bash script is if you are jumping into a container from a directory that's shared it's smart enough know to stay in it. So for instance right now I'm in a source off my home drive. If I jump into this container I'm still in the source subdirectory.  So that med makes a lot more convenient hopping between the hosttop and one of these containers and that if you're in a subdirectory that's shared you don't have to constantly be cding back into that directory. and there are other bells and whistles.
E. Castedo Ellerman: as far as configuration and how did those, only part of the home drive show up, something that I ended up kind of settling on for the other script, it's called create seest and it's largely a wrapper of podman create. but what I found is if the image is done as the first part of the parameter.
E. Castedo Ellerman: So, Podman has a bit of this what I found awkwardness in the command line and that you have lots and lots of options almost at the end you then have the image and then you have potentially a command and what I found with this wrapper script is that because of autocomp completion if the image is at the beginning it makes it very conducive to having wrapper scripts that then just tack on options on the end and I end up  wrapping these scripts and doing configuration by just adding things in and by having the image be first it makes it easy to have autocomp completion set up.
E. Castedo Ellerman: So for instance, what I'm going to show here is using the podman on Quay the Podman image, but with all the configuration goodness that kind of like. I'm going to start out running this create C nest without a lot of configuration. but I'm going to do tab completion now. And you can see I'm getting all the images that are on my machine.  And one thing that I've really liked is so for inance I'll start typing quay and I'll do tab and it'll complete it podman stable. So right now because the image is the very first thing on the command line it's easy to get the autocomp completion set up and have the nice features of podband but in a much simpler wrapper script that doesn't require all this extra stuff.
E. Castedo Ellerman: So yes yeah when the container is created the command is sleep in.
Dan Walsh: So that's to do that, right? Yeah.
E. Castedo Ellerman: So it's basically always sleep in. So as long as the container has sleep in it's basically happy.
E. Castedo Ellerman: And then when I run the wrapper script c nest is I think it's doing bin bash I can't yeah and I'm exeing in yeah exactly so a very typical workflow is I'll do create nest I'll grab some image often these images are continuous integration images that I've built that I'm using both for kind of local developments and also using them in a continuous inter integration environment
Dan Walsh: That's what you're expecting the command at that point.
E. Castedo Ellerman: So, one thing that I've kind of liked is not having the requirement of starting with a base that has a bunch of extra stuff in it. I start with images that are just kind of bare bones. and then maybe add on a few other things, but a lot of the personalization is getting added on the fly by this create seest. So, I'm going to do podman and I'm going to tack on a name. I can add other things. what's nice is that because these are getting added on the end I may not do a volume. all these options that usually go to podman create I can just tack on over and over again. and I found that very very nice for wrapper scripts.
00:50:00
E. Castedo Ellerman: So I'm going to show just a base level create C nest here where I'm creating potty. I'm going to now c nest into this potty that I named potty. And it's got basically nothing because I haven't added anything. let me see if I can do this on the fly. I could have added a volume where I said I see source home. See if I can do this quickly enough.  And I need to give it a different name. So this one I just tapped on a volume, on the command line. and so now when I go in, you can see it actually detected that the source subdirectory is shared. And so it's just popped me down into source in the container. but now I've got, this subdirectory that I shared as a volume is now in that container.
E. Castedo Ellerman: and it automatically detects that if I'm in that subdirectory on the hosttop htop when I c nest in it detects that I'm there and puts me in that subdirectory. So it's been very convenient. the last thing I'll show is the wrapping of create cest and that's partly because the image is at the beginning is I have various different configurations.  So right now I've gone into a subdirectory on my hosttop with a variety of wrappers of this wrapper script. depending on the environment. So for instance if I want to use one of my development settings I will get all the yummy goodness of autocomp completion because it's called C nest.
E. Castedo Ellerman: So if I tab complete, I can still get all these containers. it's so this script is actually just a wrapper calling create CNS and it's adding on a bunch of volumes and extra configuration. Answer Dan your question. it's just tacking on the end all these extra things that I want when I'm going into my own container on the end.  And so now I get this nice combination of autocomp completion where I can say, quay podman latest. I can just tack on, a different name pod awesome. I could add on some more things. but because I'm going to call this wrapper script, it just is tacking on all these things.
E. Castedo Ellerman: this container has been created with all the users and what I I call this pod awesome and so now I have all this extra stuff that's in there but this is actually the base of it is the podman stable container image so the container image is I pulled it off it it has very few assumptions it did not assume anything about the user ID I'm actually coming in as a completely different user ID but it's actually the  user, that I'm on the system. So, I can, write things to the hosttop. oops. so I think that's basically it.
Tom Sweeney: Yeah, you hate Russ getting
E. Castedo Ellerman: So yeah so my main big question is…
E. Castedo Ellerman: what do other people have kind of isolated environments? do most people do development kind of on the hosttop in the non-containerized environment? is if anyone does do development actually inside the containers would they just do kind of raw podman or wing their own shell scripts or use I guess maybe some fancy gooey I don't know
Dan Walsh: So one thing you're not using right now that we added to pod man is the concept of modules. I don't know if are you familiar with modules. So what modules is basically you probably know what a containers.com file is right basically you're able to modify the way podman works. so what modules do is allow you to specify a specific containers.com file for the container you're going to create. and one of the things for instance you were showing that your scripts have sort of hard-coded volume mounts that you're putting into them.
00:55:00
Dan Walsh: You could create a containers.com file that would list out the common source directory and SSH directory or whatever you want to volume out into your containers. And instead of having to have individual scripts, you could have, the equivalent of podman odule equals standard volumes or something like that and it would automatically mount those volumes. so now you could have a name for your standard configuration and…
Dan Walsh: you could do everything you just did with modules and then I don't know just if auto so contain so modules inherit from each other so they would nest …
E. Castedo Ellerman: And can you include these into each other?
E. Castedo Ellerman: I mean as far as nesting so having a base configuration. okay.
Dan Walsh: but if you put volumes in one I think there is a syntax plus equals volumes. Anyways, the people who doing that caught us to do that was HBC world. so this is a lot of government agencies that are doing really really complex podman commands for their users do that. the way they're doing usually it's like I have this I want all my users to run the same podman command…
Dan Walsh: but it has 45 options on it so now they consolidate all those options into a single modules it can be used with create yeah so it's something I would definitely look into…
E. Castedo Ellerman: And is that for podman run or…
E. Castedo Ellerman: can it be used with create? okay. Yeah.
Dan Walsh: because it might I don't know if I haven't probably about maybe a year ago.
E. Castedo Ellerman: When did that go into Podman? So, I probably should update the guide to talk about or…
Dan Walsh: And…
E. Castedo Ellerman: I should start using them and…
Dan Walsh: I would look at it…
E. Castedo Ellerman: update the guide.
Dan Walsh: because it can do things like I mean you could set pretty much any option you want. and so if you're currently doing everything along the lines of podman commands, - security opt equals,…
E. Castedo Ellerman: Yeah. okay.
Dan Walsh: sec disabled or whatever. then you could put that into a configuration file and then just use that configuration file as something standard.  But it's actually for exactly the use case that you're doing where you want these complic I like the idea of the thin down home directory. So the most people that similar to this are using obviously toolkit. So that's probably our biggest user of longlasting containers but the HPC was looking into again modules.com for similar page toolbox.
Dan Walsh: Sorry, did I say toolbox. the other area that I've been interested in is podman shell, which is basically lockdown shells that stick users in and what we're using there for is quadlets. So, the other area where will become interesting is basically defining a quadlet as a mechanism for defining what the user environment is going to be when user success into it. I kind of like that. I think you have some interesting ideas for setting up these type of environments. my only thing is you must have to deal with a huge amount of containers that you're always getting and…
Dan Walsh: destroying and things like that.
E. Castedo Ellerman: Yeah. Yeah.
E. Castedo Ellerman: It's probably I sometimes think I'm going a bit crazy with containers and creating lots of them. So yeah, it does seem sometimes it's getting a bit crazy, but yeah, is I think I may be creating and destroying the same profile or there are certain kind of job roles and I'll use different containers on the job role, but I'm probably destroying one some of these maybe every few weeks. I'll be
E. Castedo Ellerman: Yeah.
Dan Walsh: So, you're doing a rename but if the container is running, you're going to stop it, restart it, that type of thing, right?
E. Castedo Ellerman: Yeah, they're usually not running that often. I mean, it's easy to stop. There's not much to stopping them, but yeah, I do rename. And to be honest, that when that feature went into Podman, that really improved my workflow a lot because I was doing all kinds of workarounds and extra scripting to work around this limitation of not renaming.
01:00:00
E. Castedo Ellerman: so yeah, and you may have noticed that I actually had a container there that was called dev.ld because that was, what I had before and it was kind of gotten all dirty but yeah, I use rename. Yes.
Tom Sweeney: wrap this up only because we're past time at this point in time. So, are there any more questions or comments here?
Dan Walsh: to build then I think that would be please suggest them.
E. Castedo Ellerman: Yeah. Yeah. after I update modules, I'll try to I feel like there's been a nice trend where all this stuff that I wrapped is getting more and more obsolete as Podman does more and more stuff. So, I'm more than happy to help contribute to that obsolescence.
Dan Walsh: Excellent. All right.
E. Castedo Ellerman: All right. Thank you very much. Thanks.
Tom Sweeney: Thank you,…
Tom Sweeney: It was great little talk and great demo as Okay, I'm going to skip over forms questions. If anybody has any, please let us know offline. We don't have any topics currently for the next meeting, which will be in two months in April. love to have something there if you have any thoughts there. And our next meeting again will be go fulling April Fool's Day, April 1st, 2025 again at 11 am. And our next cabal meeting is coming up on Tuesday,…
Neil Smith: Thanks everyone.
Tom Sweeney: March 4th.
Brent Baude: Yep. Thank you.
Tom Sweeney: So with that, I am going to thank everybody for coming, especially the presenters, and I'm going to stop recording.
Gerry Seidman: Thank you.
```
