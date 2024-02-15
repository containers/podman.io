# Podman Community Meeting Notes
## February 6, 2024 11:00 a.m. Eastern (UTC-5)


### Attendees ( total)
Anders F Björklund, Ashley Cui, Brent Baude, Christopher Evich, Daniel Walsh, Ed Santiago Munoz, Giuseppe Scrivano, Jake Correnti, Jhon Honce, Jon Masters, Lokesh Mandvekar, Mario Loriedo, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Paul Holzinger, Thiago Mendes, Tim deBoer, Tom Sweeney, Urvashi Mohnani, Vivek Goyal, Zeh Ninguem

### Topics

 1) Podman at Home - Jon Masters
 2) Podman `build farm` demo - Urvashi Mohnani
 3) Apple Hypervisor - Brent Baude
 4) Podman 5.0 changes - Matt Heon

## Meeting Start: 11:02 a.m. EST
### Video [Recording](https://youtu.be/soxBbexH_VA)

## Podman at Home
### Jon Masters
#### (1:10 in the video)
Working with Podman for his home automation.  Basically, his home automation journey with a bunch of smart assistants.  You can do a lot of services to run stuff in your system.  Or you can run stuff by yourself, with onprem automation.  Using [Zigbee](https://www.techtarget.com/iotagenda/definition/ZigBee) or [Zwave](https://www.z-wave.com/) devices, in a low-range mesh network.  

He's replaced every light switch with a Zigbee light switch.  When you're trying to deploy something, you want it to just work.  So Jon needed something robust to make sure it stayed up.  This is where containerization and Podman comes in.

He's gone a bit overboard with 200 endpoints.  He has a container with a Zigbee daemon running in it.  He has a contingency broker, a home assistant, and others in containers.  

What he's found useful with Podman is being able to do a test container and not have to deal with his production.  He hasn't looked into monitoring but is using Selinux with enforcement.  That took some effort but is secure.  He's also added cameras using Frigate.  He's looking to offload image recognition.

His biggest challenge to do is hardware passthrough.  Especially so since he wanted to run Virtual Machines with the containers within.  

He also has to work a bit to map from Docker containers to Podman containers based on info on the web.

He's doing this as rootless.  Not using quadlets yet but is thinking about it.  He also runs home assistants, not just the Google variety, and it all works without the internet being available.

He knows about [Matter](https://csa-iot.org/all-solutions/matter/), a new standard.  He has not tried it himself but might migrate to it.

He went with Zigbee 3.0, which can be secured. He used it, given it's been out for a while.

He went with Zigbee instead of Zwave, as Zwave started as a proprietary interface.  He'd also heard of Zigbee more and likes the 3.0 encryption available with it.


## Podman `build farm` demo
### Urvashi Mohnani
#### (14:59 in the video)

New command in Podman.  Can do builds locally, but emulation slows them down.  So thought about how to do them on the appropriate machines.  This is where farm comes in.  It uses SSH connections to "native" machines to build a farm which you can send the builds out to.

You can do build, create, list, remove and update.  This builds much more quickly than emulating.

If you build on farm nodes, you must first ensure the authentication is set on those nodes.

#### Demo - (16:56 in the video)
Showed a farm build command, setting local to false, ensuring the build would not happen locally, but on the "farm nodes".

After all the builds are successful, the machine will push the images to the registry.  So locally, the images that were built on the farm nodes are not present.

The second build created an image locally and on the farm node.

Then Urvashi showed [quay.io](https://www.quay.io) with the images that came down.

Showed a diagram of the architecture.

What's the biggest buy for doing farm vs on each machine?  Not much for just two, but for three, four or more.  

Working on getting this into Desktop now.

The initial connection login sets up the authentication.  The pre-config steps is just setting up the Podman socket on each of the machines.

Can you do multi arch on the local machine, and then farm out more to other machines?   One machine arm, x86, second machine in s390, can you do this with emulation on the first machine?  Maybe, but not tested now.

##  Apple Hypervisor
### Brent Baude
#### (28:25 in the video)
Podman [#21351](https://github.com/containers/podman/pull/21351) PR shown.	

Using code in the machine-dev-5 branch off Podman GitHub.

For Apple, it starts with `podman machine init`.

It's pulling form quay.io for now, still working on where the pull will come from.

Then `podman machine start` and the machine started running.  With Apple it uses virt-fs, which is relatively fast.  He showed and old and a new config file, the new one is a lot smaller and less detail required.

There's a stanza for AppleHypervisor.  Note, we will be deprecating qemu for Macs.

Difference between AppleHypervisor and qemu.  Network communications use vsock with AppleHyperVisor is one of the primary reasons.

Qcow images are handled a bit better with AppleHV.

Mounts are a lot faster in AppleHypervisor.  

The Podman team would love to have VirtFS on Windows, but it's not, at least at the moment.   The biggest priority for Podman v5 was working on the configuration files.

Qemu on Mac hasn't been as stable as we'd like and upstream wasn't very mac-centric.  


## Podman 5.0 Changes
### Matt Heon
#### (45:10 in the video)
V5 is a breaking change release due to a number of API changes.  cgroups v1 will be deprecated, likely gone in Podman 6.  The BoltDB database will be usable if you upgrade, but new installs won't allow it.

RC1 out likely tomorrow, an early preview.   He expects a long RC cycle.   Hoping to get a release out in early March for Fedora 40.

If you're dependent upon Podman, you might want to wait a release or two for bubbling of issues that may come out.  Very heavily under development.

Matt feels very confident in the core Podman code.  The instablity will most likely be in the `podman machine` area.

Dan thinks the breaking changes won't be seen for folks outside of Mac folks.	The API changes will emulate Dockers, but should not out right break as it did between 3.0 and 4.0.  We will check to see if we have a check to disallow 4.0 to 5.0 API and will soften those.  

Podman info will have changes.

How to get Podman v5 when it comes out?   Still being considered.


## Open Forum/Questions?
#### 

 1) None

## Topics for Next Meeting

 1) Deploy LLMs with Podman and K8s - Steffen Röcker
 2) podman manifest support for artifacts.
 3) Podman Desktop update demo


## Next Meeting: Tuesday, April 2, 2024, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, February 20, 2024, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:58 p.m. Eastern (UTC-5)


## Google Meet Chat copy/paste:
 ```
 Daniel Walsh
 11:09 AM
 Are you using quadlets to run  your services?
 Tim deBoer
 11:12 AM
 interested if you've tried Matter - but not really a Podman topic :)
 Ed Santiago Munoz
 11:14 AM
 In 2 hours or less, why did you go with Zigbee instead of Z-Wave?
 Anders F Björklund
 11:14 AM
 Sounds like IPv6 ("just landing")
 Christopher Evich
 11:17 AM
 Have you tried to white-hat hack into your own mesh?
 You
 11:24 AM
 Thoughts on doing "farm login" command?
 Anders F Björklund
 11:25 AM
 I thought it would piggyback on "login"?
 You
 11:25 AM
 Are there pre-config steps other than setting up ssh keys?
 Paul Holzinger
 11:26 AM
 you need to setup system connection and farms
 Anders F Björklund
 11:27 AM
 you need to setup or configure a registry
 Paul Holzinger
 11:32 AM
 How many Skip()'s are in there?
 Anders F Björklund
 11:35 AM
 Why do you need a special image for applehv, when compared to qemu?
 Vivek Goyal
 11:47 AM
 Tom you are on mute. You were saying something, we did not hear it
 You
 11:47 AM
 oops, and ty
 Brent Baude
 11:55 AM
 Paul, less than a handful of skips and we are attacking those each day
 Paul Holzinger
 11:56 AM
 perfect
 Anders F Björklund
 11:57 AM
 discussion on podman machine for linux: https://github.com/containers/podman-desktop/discussions/5762
 xrq-uemd-bzy
 ```

## Raw Google Meet Transcription
 ```
to replacing the cellscript with the single command click.
Urvashi Mohnani: Yeah.
Urvashi Mohnani: Yeah.
Daniel Walsh: The goal is to make it so. Normal humans doing it could fail some more comfortable with it. And we want to get it eventually into modern desktop so that it would support Farm building. So it becomes right from the goalies and a container file and…
Anders F Björklund: but
Daniel Walsh: you want to click these three arches and it goes out and figures out how to build those reactions.
Anders F Björklund: As far as they know you would also have to add connections Department desktop, so that could be a prerequisite.
00:25:00
Daniel Walsh: Yeah, but they said if most people that building multi ads right now attempting to do with you use the static which is if you have anything really complex can really be bad performance solo better on a Mac. So here we're looking at how could we support this in Native building? As long as you have VMS access to physical machines that are different architectures.
Tom Sweeney: I just had a couple hopefully quick questions Paul's been answering some of it. what about Farm login? Do you have to log in from each machine before you start running this or is that happening under the covers the farm?
Urvashi Mohnani: No, you don't have to log into each machine. Once you have set up the appointment socket on your farm machines and you just do apartment system connection ad that adds the connection logic that's needed and farm just piggybacks on that. So there's no need to log in anywhere. You will have to log into your registry.
Tom Sweeney: Okay, great.
Urvashi Mohnani: If you want to store credentials, you're just a Portman login for the registry. And then the farm bill command is able to read your auth file and send that over basically.
Tom Sweeney: So great. Let's say something steps and any other preconfig steps that people have to worry about.
Urvashi Mohnani: Not just setting up the socket on your machines and then doing quadman system connection add to connect to that.
Daniel Walsh: if I wanted to do A build where I did one of the Arches and emulation mode and then a different one. So I don't know has three ninety, I wanted to do that and found but I wanted to do x86 and both of my Mac. from a single machine Can I do that?
Urvashi Mohnani: What do you mean from a single machine?
Daniel Walsh: So we're identifying the connections based on Arch. Is that correct?
Urvashi Mohnani: No, we're not based on Arch. So it's when you want to add a connection, right and you create the farm it goes and just Builds on all the machines there. If you have a machine in the form that has the same architecture like two machines and it will build on the first machine. It finds of that architecture.
Daniel Walsh: Yeah, if I have a machine that can build me an x86 and an arm and I have another machine that is s390 and…
Urvashi Mohnani: Yeah.
Daniel Walsh: I want to build for all three hatches, but the one locally Has to do it in emulation mode. Is that possible…
Urvashi Mohnani: so It is so right now.
Daniel Walsh: if I'm right now?
Urvashi Mohnani: I think we're just working using the native architecture. There is good in there to determine the emulated architecture, but we haven't tested that part yet, so it's not completely done. But if that's something we want available as well, then we can test that and ensure it's working. Yeah.
Daniel Walsh: Yeah. I mean, I guess right now if you do just an appointment build with two arches on a single connection It will attempt to the emulation anyways. but
Urvashi Mohnani: Yeah.
Daniel Walsh: good.
Tom Sweeney: Any other questions? for one Right. Thanks. Great.
Tom Sweeney: You're up with apple hypervisor updates or demos. I'm not sure which. Yeah, okay.
Brent Baude: me either All right. I got a little shindling. I can run through here and I'm going to purse the demo Gods by doing it live. So let's start with the end product. I think that. Tells an interesting story. It will begin sharing here.
Brent Baude: Some folks see that.
Daniel Walsh: right
Tom Sweeney: We can it just popped up.
Brent Baude: This is the end product. So after this we've been doing a lot of refactoring for podmin 5 and it's pretty intrusive for machine and this particular PR comes from a teammate of ours Chris. And essentially it's saying we need our apple and Mac CI to pass before a new PR can go in and this is the enforcement that says it must pass as opposed to hey, we're on it, but whatever.
Brent Baude: The point being here. This is the big celebratory piece. Which is that the refactoring has allowed us to get the machine tests on Mac pass. So this is the big deal and one of the big benefits of our refactoring work
00:30:00
Brent Baude: so if we go and look at what the refactor actually kind of looks and behaves like
Brent Baude: I'll ask the jail wise how I'm doing here?
Tom Sweeney: She could bump it up. At least one that probably be good.
Brent Baude: was one
Brent Baude: better
Tom Sweeney: Yeah, that's better for me anyway.
Brent Baude: all right, so let's just clear this off and I want to show that I'm in.
Brent Baude: I'm using code that's at least checked in are committed rather and I'm on a detached Branch from the Upstream machine to five. So this is a Proof of Life and I've already made on the make of the binary So it's got podman there and I've got it sort of linked there. and when I call Paul man, it's calling the branched one All right.
Brent Baude: So for Apple it always starts. For all of them and always starts like this.
Brent Baude: And I have removed the cash and everything that will make it go fast on this one because I kind of want to talk through it. So the first thing I want to point out for those that haven't been closely watching as you'll see that it's quite as opposed to pulling from the Fedora chorus distribution server using http. And that will be how things work in the future right now as far as exactly what that looks like. We're still ironing that out. This is sort of some trickery going on at present. But you saw that the pull occurred. And we went out to Kuwait to get it.
Brent Baude: It's not as impressive because right now it's using the version which is podman 5 to Determine which version of Paul? so that doesn't really stick out but it's you doing in comparison on the version and pulling just that.
Brent Baude: All right, and now I'll further. First Myself by not running. That's what debug.
Brent Baude: And this will take I don't know 30 seconds or so. I'm not mean while I can kind of talk about what's going on. So right now it's actually used a ton of common code between all the providers Q mu hyper-v wso. an apple it's using common code to set up almost everything but the final call to actually the machine itself. And then as far as what happens when it's successful, it looks exactly the same. at this point so that was just a little start.
Brent Baude: I take a peek. It looks like it's running.
Brent Baude: and we can pop into it yet or
Brent Baude: We can. Do some things One thing I want to point out is that
Brent Baude: we do on Apple use virtofs. So we have a reasonably fast. sharing mechanism and
Brent Baude: this could be an interesting example here. I want to show some differences. the
Brent Baude: old configuration file for Apple machines look something like this.
Brent Baude: and the new looks something like
Brent Baude: something like that. It's maybe difficult to tell in this sort of environment, but it's considerably smaller. There's a lot less detail in here. Most of it is now abstracted. And this is the key part. This is all common now. There's a bug Ashley.
00:35:00
Brent Baude: That's all common, which is nice because now we have a common set apis to work with but this is where it differs and so this is just the specific stuff you see for Apple if we were doing Q mu and the Apple hypervisor stuff wouldn't be here. It would be strictly. Cameo stuff worth repeating but our will be deprecating qmu For Max so Apple hypervisor will be your only future option.
Brent Baude: Okay, and
Brent Baude: just another sort of proof of life here since it's something I actually run reasonably frequently on my Mac when I'm doing development is I'm pulling the golang the docker going container image and I am using amount. to mount this repository inside
Brent Baude: and so if you look here We're in the Repository. We've got good speed for things and one of the things we like to do is something like make validate
Brent Baude: To see that our code is passing linters. I won't subject everyone to watching this because it does take quite a bit of time, but it seems to work quite nicely.
Brent Baude: and of course everything else is as you would expect.
Brent Baude: Business as usual which is what we're hoping for. before I dump the terminal any questions
Tom Sweeney: We had one from Anders earlier leaves asking what you need a special image for Apple height HP when compared to Q. He and you and I cannot speak that say that.
Brent Baude: What are you getting that honors?
Anders F Björklund: Why is it not the same OS image? Why do you need different OS images for different type of Rights?
Brent Baude: There's two reasons one. Is that the apple hypervisor does not. honor the cute cow image
Anders F Björklund: right So you have to convert the format?
Brent Baude: And I really don't want to do that on users machines…
Anders F Björklund: Yeah, okay.
Brent Baude: because I think that adds a level of difficulty the second thing. However, is that humu and Apple? implementations differ enough then it makes sense. one example is that we besock Communications instead of the Native cumia Communications for Network So we need a binary or two that are inside.
Brent Baude: The Restless stuff we could largely adapt in the sense that it's all just ignition but that's primarily why.
Anders F Björklund: I was just wondering it's a different decision.
Brent Baude: Yeah, one of the big hurdles Anders and all in all honesty here was the fact that using a raw image really
Brent Baude: Really sort of stinks because it just doesn't out of the box support sparse operations. so when you make a hundred gig disc like we do when that kind of stuff happens certain operations can take this Parsons away from that disc, and now you're dealing with a massive binary blob.
Anders F Björklund: Yeah, I mean that we are doing it for Lima but I think so. the first attempt was using qmu image the program to do a great image, but obviously that's not a good idea. If you haven't installed qmu the wrote some kind of program to create the image now, but I haven't really used it myself. I think it kind of this Partners, but I can look that up. So it converts the qawi image into raw image. With the downsides that you are implying to you you also lose today so far for the Cure image you have the actual cow.
00:40:00
Brent Baude: Yeah.
Anders F Björklund: An aspect so you can have a base statistic and then your layers on top of that and that layering is not present in the Raw images. That means they end up duplicating that always disc…
Brent Baude: IND
Anders F Björklund: if you have a lot of VMS.
Brent Baude: right I am contemplating some apfs trickery. For CI to make things even faster, which would make copy on rights, potentially. the only thing being written but
Brent Baude: But for now, I'm satisfied that it's running.
Daniel Walsh: Hey.
Tom Sweeney: If you've garnered any kind of performance games Apple hyperview versus cumulus.
Brent Baude: The big thing is amounts are.
Brent Baude: That's the big thing.
Anders F Björklund: have you compared it with the virtue I or FS on qmu, or Maybe you're not doing it.
Brent Baude: We all in large. You can look at part.
Anders F Björklund: So yeah, I'm not sure it works much.
Brent Baude: My understanding is that. the c** you still doesn't have The one nice thing about VF kit and the way it designed and we contributed to it is that since it's running the VM technically. It holds the very fast demon if you will open and allows that connection to work. My understanding is that's not quite there in qmu. I may be mistaken, but that's what my reading leads me to believe and…
Anders F Björklund: I
Brent Baude: that's why we're still nine p
Anders F Björklund: It's very manual CMU still bundles the old but I fft so you have to deploy the new one the rust demon yourself and then you can connect to it, but I'm not sure the max support is there so probably only support Linux and not Darwin.
Vivek Goyal: Yeah, I think Max support is not there yet later than run as the sheer memory solution is not there.
Brent Baude: Correct.
Vivek Goyal: So that's one thing. Some of the people are looking at that how to make what ifsd work on Mac as a separate process. so I think your character understanding that as of now what iifesty will not work on Mac the way we have implemented in as a separate process in
Brent Baude: And we as a team and code maintainers would really love Very fast the work done windows. but nope, so we have kind of this since we're already have a deviation we might as well just deal with it. So Kim you still uses If someone says hey We really wished. here's a use case that we use it on Linux and we really need to move it over to boroughfs we would get that on the list, but
Brent Baude: The bigger priority for us for pod Man 5 was the refactoring to the singular configuration file. and sort of making
Brent Baude: Dead ends of our mistakes in the past and getting those out.
Daniel Walsh: I think No,…
Vivek Goyal: stop
Brent Baude: Daniel look like you want to ask a question.
Daniel Walsh: I don't want to ask a question. I just want to state that Q mu is not been a great experience for us from a stability point of view either and…
Brent Baude: on max
Daniel Walsh: probably on Max and the reason for that is mainly that we didn't have control over when the thing is released and Upstream didn't seem to really care that much about the quality of the releases on a Mac. And so getting to the point where we sort of maintain the vmn outside of being updated the air. Brew is going to be hopefully very nice for us from the stability point of view.
Brent Baude: once they get over the shock that we took it away.
Brent Baude: other questions
Brent Baude: So I think just in general a message, I would send to the community if they were asking me there are some new things going on. There's a lot of the changes that we couldn't make without breaking API or breaking Music Experience. I've been made. But as far as huge technical leaps in podman 5, that's not a thing. You're more likely to feature-driven Development begin after five all goes out and stabilizes
00:45:00
Tom Sweeney: Okay, I'm going to wrap this up since we're getting close to the end. We have one more topic get to go and turn it over to Matt talking about Bobby m5o changes.
Matt Heon: This is largely going to be a follow-on from what Brent was already talking about 50 is very much a breaking change release and that we've had a bunch of stuff over the last two years where we haven't been able to fix it because it would be a breaking change to API or be a great change to the command line output a small things like better Docker compatibility for man stats pod, man and specs other things like what do you call it? A big deprecations are coming. C groups one is being deprecated. We're not removing the code. We thought we might be but we're not completely removing it but groups who will probably be gone in six. It's deprecated in five. The old multi-b database will still work if you have an existing one, but we're restricting creation of new ones. So this is very much a
Matt Heon: stability release in the sense that we are addressing a lot of old Tech debt and not a feature release so don't expect that much the way a new features now as for schedule, we were just discussing the hour for this and we're hoping to get a release candidate one out either later today or probably tomorrow morning. This is very much going to be an early preview and I'm expecting a long release candidate face for this release a lot of the work we're doing especially the refactoring that Brent has been doing
Matt Heon: Odd man machine is still very much ongoing and we're just trying to get test builds out the community so they can look at what works and what doesn't I'm expecting machine is probably going to be on what doesn't part for a while. But yeah, we are hoping to have a final release out but for Fedora 40 and ideally that's gonna be sometime in early March, but we don't want to commit strongly to that right now when there is still a lot of deaf work on going.
Brent Baude: There's a subtlety. I'd like to add Matt that this morning. We talked with padman desktop folks and I think one or more of them is here. as well and I think we kind of came to a good conclusion or at least something I feel comfortable with which is as we're doing the releases and as podman 5 releases if you're extremely dependent on pod, I think the advice would be to just pause before jumping on top upon and five. give it a little bit of soap time and let a square off some of the yet sharp edges in particular with machine migration if we can do anything for folks and things like that, but this is something we're hoping that.
Brent Baude: We can slow down and brew and don't release immediately. as we try to improve the user experience that we expect from ourselves.
Matt Heon: Yeah, and hopefully most of us is going to get fixed up in RC. So. We'll see…
Brent Baude: Yep.
Matt Heon: we'll see where we land and how much time we have. But I release candidates are going to start appearing and we are still very much in development. We're just trying to give people snapshots of where we are.
Brent Baude: Matt I would just Bank this off you and you can drive it home, but also I would say that we feel very confident in the core pod, code and that base of code in terms of the things we've changed and that they're good and solidly done
Matt Heon: Yeah, there are. Core pod man is very much stable at this point. Most of the instability is going to be coming in the machine side. That's probably why we're gonna end up doing so many RCS. So I think even rc1 is going to have a pretty complete preview of what you can expect in podman 50 if you don't expect to be using partnership,
Daniel Walsh: Yeah, I would also like to point out the breaking changes are probably not going to be noticed by 99% of the people in the world. It's
Brent Baude: Unless you're on a Mac.
Daniel Walsh: Yeah. …
Anders F Björklund: but It's good news API for five hours.
Daniel Walsh: I mean I'm talking about the Good.
Anders F Björklund: So is it client compatible? Otherwise? You will notice it. we noticed it between padman 3 and 4 because there's the new API so it's not API compatible, but
00:50:00
Daniel Walsh: But the API is pretty much the same. There's just certain field. So you're going to change because of compatibility with darker. So, certain you might programs that my break…
Anders F Björklund: Okay,
Daniel Walsh: because they're looking for. rs an uppercase ID being returned in the Json file or
Anders F Björklund: but it will not outright break the way it did with the three and four so it will just refuse the connection there is no
Daniel Walsh: Yeah. I would think it would.
Brent Baude: Correct.
Matt Heon: Yeah, that's something we might have a hard coded check for API version in there. But I think we can probably relax that we're not doing massive cranking changes between four and five they're gonna be small things pod man stats might be broken in the sense that we've changed some of the Json it might not the code properly but most commands most API endpoints still identical.
Daniel Walsh: Yeah.
Brent Baude: And big changes to the network. We could have Paul speak on that, but there's been some subtle. things done but not like when we came out with four and so I don't here's net of Arc and so forth
Matt Heon: We are hoping to default to pasta for rootless containers as opposed to the current slope for net and S default, but that hasn't gotten yet. I'm actually going to be working on this afternoon. So
Tom Sweeney: Alright sounds like we're wrapping up and I thought we'd wrap up the meeting as well pretty quick. Here there any other questions for Matt's about this or about anything else from today? Okay.
Anders F Björklund: so if you want to test this new apartment 5, how would you Like to have a plan to get it in the hands of ubuntuous or Debian users or what have you.
Brent Baude: We're not going to release binaries for the distroses. That was your asking.
Anders F Björklund: If we had a discussion whether it would be worse to have the linuxy resources pod manage machine compared to having them run Paul man B3, which is the word scenario running V3 in 2024 are running what mission that because it was triggered by what is nice blog post on how you can use pod man to run your Watson binaries. And it's Mac and Lynn Mac and windows users. You can use awesome binaries, but a lot of the Linux users were not able to follow that article because their apartment version was older than What was required in the article? so it doesn't
Daniel Walsh: So it was many mainly Ubuntu users right on older they never update their apartment.
Anders F Björklund: Yeah.
Anders F Björklund: yeah,
Daniel Walsh: So they …
Daniel Walsh: the idea would be to install pod have Filed man remote statically and…
Tom Sweeney: Okay.
Anders F Björklund: yeah,
Daniel Walsh: then they could use that to launching machine.
Anders F Björklund: yeah, because that actually works it's like a plan B, so
Anders F Björklund: Obviously it would be nicer to have them run the apartment before So one thing I was experimenting is this week and what's the build podman B for using padman B3? I thought that was quick interesting and I have it running on Debian bullet science and so on so It seems to be working. Put it up. So that could be one way instead of the next bins because those were hard to maintain. So this one is not actually static. It's just building. They did the same for not CTL which requires new container data that are not available and a distro. So they just put all of the biners in the tarball and hope for the best. Same you can do for part man, if you're distribution is updated and you don't want to build it yourself from source.
Tom Sweeney: Okay, just need to wrap up here Anders. Can we have you contact Brenton or matt? would
Anders F Björklund: Yes, but I think we can't follow up on coming meetings while will be a while.
Tom Sweeney: the special
Tom Sweeney: Okay, sounds great. Are there any other questions that people want to bring up or topics for next time? We do have a couple of topics already for next time having somebody come in to show us how to deploy llms with podman and kubernetes and we have podman manifest support broad effects and part man desktop. It's gonna be doing a demo. So if anybody has any other thoughts, please let me know or add them to the agendas move along as it's up after this. And one last chance for questions. Before we close out.
00:55:00
Tom Sweeney: I'm not hearing anything. thank everybody especially the presenters today and I'm going to stop the recording.
Meeting ended after 00:55:21
```
