# Podman Community Meeting Notes
## October 3, 2023, 11:00 a.m. Eastern (UTC-4)
### Attendees (28 total)

Aditya Rajan, Adrian De Jesus Perez Dominguez, Ashley Cui, Blaise Pabon, Brent Baude, Chetan Giradkar, Christopher Evich, Daniel Walsh, David Chisnall, Doug Rabson, Ed Maste, Ed Santiago Munoz, Gerry Seidman, Giuseppe Scrivano, Jad Bsaibes, Jake Correnti, Jennings, Johns Gresham, Kiran, Lokesh Mandvekar, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Preethi Thomas, Tom Sweeney, Urvashi Mohnani, Valentin Rothberg, Ygal Blum

### Topics

1) Modules Demo/Intro - Valentin Rothberg
2) Allow specifying a guest OS in podman machine init - Brent Baude
3) Quadlet Demo - Dan Walsh

## Meeting Start: 11:02 a.m. EDT
### Video [Recording](https://youtu.be/kjsQVJRQlJU)

## Modules Demo/Intro
### Valentin Rothberg
#### (2:02 in the video)

Feature with the v4.7.0 release on Fedora and others.  Many new options.  This allows you to specify a number of options that you use across multiple Podman commands to be included in a config file.  This helps lessen the complexity of the command line.

#### Demo - 3:25 in the video

Showed a Podman command with a lot of options defined with it.  He showed a containers.conf file with several environment variables and capabilities set.

The `--module` option can be used to specify the location of the file.  He then showed a much shorter Podman command by specifying the module configuration file.  You could ship the containers.conf to multiple users if you wanted them to start up in a certain way.

The file can be named anything, but needs to be a `.conf` file.

If you specify multiple files, the later ones override anything that had been specified prior.  Work on going to allow flexibility to specify order significance.

Will --module be supported in quadlets?  Not supported at the moment there?  Valentin asked for an RFE issue for quadlet support.

The --module option needs to be specified before the command.  i.e.
`podman --module=123.conf run` and not `podman run --module=123.conf`.  It's a "root" type of command that works for any command in Podman.

The modules demo can be found here: https://github.com/vrothberg/tutorials/blob/main/modules/01-containers-conf-modules.sh

## Allow specifying a guest OS in podman machine init
### Brent Baude
#### (16:59 in the video)

David Chisnall showed a PR (https://github.com/containers/podman/pull/19939) which allows for FreeBSD to be run by a machine, and then further, any other Operating System.

#### Demo - 20:22 in the video

He has been working on getting Podman to work on FreeBSD.  He showed a terminal into a Mac Book, and he's added a `--machine-os` option to specify the OS.  In about 20 seconds it was up, and in FreeBSD.  He then went on to show a number of commands.

He was surprised a bit by the push back on the PR that he has received to getting it in.  

Brent noted the demo was good.  He asked if the image had been customized.  He's hoping the FreeBSD team can create the images necessary for Podman over time.  David noted that the changes to Podman are a few hundred lines.  The changes to FreeBSD are much more significant.

He wants to have an images that will use ignition that's fully configured.  They have that now and it has the ignition pieces built in.

Dan said if FreeBSD folks are willing to support this, then it's something we should consider.

Doug Rabson added that he doesn't expect Podman to support all of the FreeBSD.

Dan is not worried about the FreeBSD support, but later drive by commits for "My OS", that wouldn't have the backing from the new OS that Podman has from FreeBSD.

Brent is concerned about QEMU, and David and he exchanged comments on it.  FreeBSD would also like to get working with a Mac hypervisor too.

Another hurdle is trying to get tests working with CI.  Brent asked if they could run their code against the CI machine test.  We don't have a FreeBSD CI, they have that, but would need a Mac CI.   Chris talked about a number of options.

They have a small FreeBSD in the CI now.


## Quadlet Demo
### Dan Walsh
#### (40:34 in the video)

Hoped right into the demo.  Quadlet is an integration between systemd and Podman.  He wrote a blog https://www.redhat.com/sysadmin/quadlet-podman

systemd has a unit file, and quadlet created a [Container] section which is allowed now by quadlet.  Dan talked his way through there.

Ygal Blum created "Deploying a multi-cotainer application using Podman and Quadle" (https://www.redhat.com/sysadmin/multi-container-application-podman-quadlet) with more advanced features.

Dan then showed quadlet allowed for android to run under a container on his desktop.  It does take a bit to get going.

Quadlet is a way to let you use files to declare container setups.

Can specify if systemd should auto restart the service or not.  

You can also set pidslimit to -1.

Is Quadlet k8s for humans?  (poor man k8s).  You still need to write the config files.

You can define the application with a k8s yaml, so you can use your old deployments, you don't need to have two "sources of truth". In Podman v4.8, `podman volume create` will allow you to pull an image if necessary.

Quadlet is biased to systemd use cases, but can run Kubernetes workloads too.

## Open Forum/Questions?
#### (55:10 in the video)

1) Running a rootless container, how to block from other users getting in, especially root.  Dan pointed out that confidential computing is the way to handle that, but that's six to nine months out.  It will encrypt the content.  He's mostly concerned about his source code in hte container, can he use secret?  No, it can't hide the code.  You could use secret to encrypt the code, but it could still be seen now by root.

2) Jennings asked about `pasta`, he raised an issue https://github.com/containers/podman/issues/19577.  He's having problems with a self hosted Google drive.  He's found it works OK with Quadlet using a systemd start.  The problem is the application wants to talk to Docker API, but it fails.  The issue is a rather generic error message and he's not sure if it's a real issue or just something a little off.  This is an internal database issue, that will require refactoring.  This is work that is ongoing.  Would be nice to get info from the NextCloud folks.  He believes it's broken, but it is an edge case.  It's currently the last bug keeping NextCloud from working with Quadlet at the moment.

## Topics for Next Meeting

1) None

## Next Meeting: Tuesday, December 5, 2023, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday, October 19, 2023, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 12:08 p.m. Eastern (UTC-4)


## Google Meet Chat copy/paste:
```
Lokesh Mandvekar11:00 AM
not recording yet
Daniel Walsh11:14 AM
papabear.conf
Blaise Pabon11:16 AM
could you press `up arrow` so that we can see that command again?
thx
oooooh,ok
I get it
it's like the modules are plugins
Brent Baude11:17 AM
this is what Valentin meant about it being a root flag i believe
Daniel Walsh11:18 AM
--modules will work with all Podman commands as well including podman build.
Blaise Pabon11:18 AM
thanks (sorry, I was the least clever of my group in college)
Brent Baude11:18 AM
if you run podman --help, you can see alot of them
Martin Jackson11:20 AM
https://github.com/containers/podman/issues/20246
Valentin Rothberg11:21 AM
The modules demo can be found here: https://github.com/vrothberg/tutorials/blob/main/modules/01-containers-conf-modules.sh
Brent Baude11:21 AM
the PR in question is https://github.com/containers/podman/pull/19939
Blaise Pabon11:25 AM
FWIW, I've been having issues with `--rootful` on OS X. I think that it is a known issue
Blaise Pabon11:26 AM
...is that arch ARM because you're on Apple Silicon?
Thx!
Blaise Pabon11:27 AM
I have a lot of spare x86 compute available , if you like
Ed Maste11:29 AM
I'm on the call but don't have a working mic.
Ed Maste11:30 AM
But the Foundation is quite interested in this topic and is willing to dedicate resources to supporting what might be needed from the FreeBSD image / build side, and I am looking at some production uses for FreeBSD containerization in genreal
Christopher Evich11:32 AM
I think this is a really cool idea.  I can imagine it being useful with (as one example) a Windows VM to run windows "containers".
Ed Santiago Munoz11:34 AM
Did audio just go all wonky, with metallic buzz?
David11:34 AM
Not for me...
Lokesh Mandvekar11:34 AM
audio is fine for me too
Ed Santiago Munoz11:34 AM
kthx
Daniel Walsh11:41 AM
time check...
Famous last words.
Ed Maste11:42 AM
Sorry I had to step aside for a moment, if there are any open questions for me from the FreeBSD Foundation perspective happy to have people get in touch emaste@freebsd.org or emaste on GitHub
Brent Baude11:43 AM
@David -> https://github.com/containers/podman/blob/main/pkg/machine/e2e/README.md
Blaise Pabon11:43 AM
Yay! I'm here for the quadlet demo
David11:44 AM
I think Doug wants to get podman machine to support bhyve so it can use run Linux containers on a FreeBSD host.  For testing podman machine with a FreeBSD VM on Mac, we don't need the CI system to provide a FreeBSD host environment.
Ed Maste11:45 AM
Yeah I'd be very excited if podman machine could drive bhyve
Doug Rabson11:46 AM
Its failrly low on my 'want' list but it could be useful
You11:46 AM
Blog Dan is referencing: https://www.redhat.com/sysadmin/quadlet-podman
Blaise Pabon11:46 AM
I've been playing with dagger.io and I wonder if that might help in this scenario (by not requiring a virtual host to run the container) ?
You11:47 AM
Ygal's blog: https://www.redhat.com/sysadmin/multi-container-application-podman-quadlet
Christopher Evich11:48 AM
@Dave/Doug/Ed: We have a bare-metal setup today for running podman-machine tests on a Linux host.  That would be relatively easy to extend for testing other VM types in a matrix.
Blaise Pabon11:48 AM
Is quadlet k8s for humans?
(poor mans k8s)
Wow
Jennings11:50 AM
quadlet, podman-compose, docker-compose, and podman kube play are all ways you can use files to declaratively manage containers
quadlet is biased to prefer systemd syntax, so i guess the question is: is systemd for humans as well?
Blaise Pabon11:51 AM
ROFL, `systemd for humans` would make great click bait
Ed Maste11:51 AM
@Christopher do you have a link handy for more info on that?
Blaise Pabon11:53 AM
@Dan, can we get `buildah systemd-generate` to handle tje boilerpllate?
Blaise Pabon11:56 AM
^ never mind
Christopher Evich11:57 AM
@Ed I wouldn't expect you guys to implement it, but in my mind it could be a matrix on this task: https://github.com/containers/podman/blob/13456be1e72f4a8eb6aaac6dedc95cf4f621de88/.cirrus.yml#L705-L734  
 (Note: That doesn't yet run the "new" podman-machine e2e tests - that's on my list too).
David11:58 AM
@brent: Even before I try the FreeBSD bits, I hit this error from make .install.ginkgo:
go build -o build/ginkgo ./vendor/github.com/onsi/ginkgo/v2/ginkgo
rosetta error: overlapping Mach-O segments:
Blaise Pabon12:00 PM
@Kiran, you may also want to loot into the Wolfi distro-less images from Chainguard.
Ed Maste12:02 PM
@Christopher, thanks -- I'm a fan of Cirrus CI as they're the hosted provider that supports FreeBSD, I will take a look
Jennings12:02 PM
https://github.com/containers/podman/issues/19577
You12:05 PM
@Luap77 == Paul on GitHub fwiw
Gerry Seidman12:09 PM
Thanks all... gotta jump
xrq-uemd-bzy
```

## Raw Google Meet Transcription
```
om Sweeney: Good morning, This is Tuesday, October 3rd, 2023. This is the podman community meeting in this meeting, we generally discuss demos and the upcoming new items that are inside the project that we want to show up. For people want to show off or other projects that are dealing with pub man that want to show off their work as well. So if you have topics love to have them anytime in the future. For today, we're going to be talking about no, that's not that This is a meeting that goes on every First Tuesday of the month. We also have a couple meeting which has been going on on the third Tuesday of the month. It will go on the third Tuesday in this month. But going forward, we're moving that to the third Tuesday. Of the month as well. So on first Tuesday, will be the community meeting. The third Tuesday will be the call meeting. That will be starting for that one. and then topics are driven by car meetings or if you send requests to me,
Tom Sweeney: love to have topics at any point in time and we are willing to accept discussions on man build us copio or any related container projects, if using any of those part of your project, we'd love to have that as well. I have the meeting notes today that I've got a link there, audit and Google chat in a moment here. If you want to go ahead and correct anything I put in or add anything. And the presenters if you have links in particularly like that, love to have those edit there. And then for today's meeting, we are having a demo on modules and an intro from Valentin. And we'll have a discussion about you specifying, Guest, OS and poverty machine in it for Brent, and Daniel will be following up with the quadlet demo. And then for the last 10, 15 minutes, we'll have open topics for anybody. That has a topic that they want to talk about. Before we get too far, we have to have a note from our sponsor. If you haven't seen it yet, I've been in Action book by Daniel, Walsh's, excellent resource and Dennis caring this. But if you have a Red Hat subscription, you can get it for free online.
Tom Sweeney: And with that, I'm going to help over this bidding to Valentin the start of
Valentin Rothberg: All Sorry to click through the sharing before I apologies in advance. I gotta run in our own 20 minutes, so I won't be able to make it throughout the entire call. So thanks Tom for moving me first. So I want to talk about something that we call Containers Khan from modules. This is a feature that made it in the just recently released Portland for seven. and I think it's best explained with a motivating example. Use cases can be quite complex and there are loads of command line options and flex that you may need to use to run your certain workload. In this case here, I have an example where the workload, it's just an exemplary. One needs a lot of capabilities. There certainly more elegant solutions to do that. I'm going to show them in a minute.
Valentin Rothberg: But it boils down to some use cases need a lot of massaging. One motivating example or use case is for instance running or accessing graphics cards inside containers, which is very common in HPC use cases where the user is even need to mount certain launch amount certain and video libraries from the host into their containers because they don't want to ship All these huge libraries to keep the images as small as possible.
Valentin Rothberg: So it boils down to the command line, interface can be very complex. So if you want to run your containers on a number of nodes, either you're going to find a way to inject Generate these commands use config files or users need to be incredibly smart. typing a lot and make sure that there's no typo. So in this case here, we've just a Simple Container Using a Lot of Capabilities. One thing that we have an apartment space is a configuration file, which is called containers column. So if you go into the man pages of containers.com, you see a lot of options that you can find there and most of these options replay, certain command line flex. So in this case,
Valentin Rothberg: I'm using containers Conf to replace all the capabilities that we have before. And here we see one environment variable here, I'm using printf just to print all the environment variables inside the container. You see that it has been injected here from the host. How did I do that? And then it like that. So the environment variable has been injected here via the environment.
Valentin Rothberg: String array and all the capabilities have been injected via the array on top. So this works just fine. So you can use a containerscon file already today to set certain defaults if you want for the workloads that you want. You can do that per user. You can do that system wide. I then use a share if you want to ship it via for instance, rpm package or on Etsy. If your assistant men and want to configure it for you user base, but It's always a default setting. It sets the baseline. There has until 4.7 not been away to opt in certain.
00:05:00
Valentin Rothberg: Configuration files enable them selectively other than specifying them environment variable as I just did on the command line flag. Use cases can be more complex than that. Maybe you need more than one configuration file. Maybe you want to separate them config options. You want to put in security Conf all in video related options. You want to put into Nvidia.com and at some point you may be want to compose them and use them all at once. selectively. So this is the use case that mod Solve. So, instead of specifying these environment or these config files over the environment.
Valentin Rothberg: there is a new root flag important - module where you can specify either an absolute path. If you specify an absolute path, then the file behind this absolute path will be loaded. And if you specify a relative path, then This relative path will be resolved to certain directories On the host. So,
Valentin Rothberg: To elaborate more on that here. If I move from my the module into my home, directory, can do this rootless if I want to in that containers conf dot modules. If I place it there and then use it after, I can totally do that. So, in this case, if I run here, we can see that the module is being resolved. Because first, we don't get an error and second, we get exactly the environment flag that we've seen before. So, I do not have an Nvidia card so I unfortunately cannot show a cool HPC for instance, workload using the new modules flag on national workstation here. But I hope I got the message and the idea across. So it's This new containers kind of modules, allow for enabling certain configurations.
Valentin Rothberg: And I believe it's a huge improvement over in terms of user experience because you do not need to use and recall. All these hundreds or dozens of depending on the command line flags. You can. Ship these containerscon files if you want to for all users. So if for instance, the capabilities con would not be in my home directory. But for instance, use a share or Etsy tain containers Conf modules, then it would be found there as well. So it's a Pretty simple Powerful means to ship. These settings, these defaults for your certain use cases, load them on demand. And I think that's it. So, I'm open to questions.
Tom Sweeney: Restriction. So the naming of the files.
Valentin Rothberg: They need to end With.com. this is pretty much The convention that we had before for containerscon files. One thing I should elaborate on. Probably as well, is that these confiles will be loaded in the specified order. So if you have module three, first one will be loaded, three will be loaded. So one thing that is probably worth mentioning as well, is that? during this loading sequence, if a configuration file, let's say configuration two would set the environment. Array, then previous settings will be overridden. so at the moment we're looking into and we have a proof of concept open at the moment against the containers common
00:10:00
Valentin Rothberg: Get a project upstream where all the code for containers kind of lives. That allows for appending to these things. This is not something that Tamil natively supports, so we use tomal behind, it's a markup language. Behind containers gone. So we're working on improving the usability for these things and I should probably Call out the people who raise their hand.
Tom Sweeney: We'll go to Chris.
Valentin Rothberg: I see Chris
Christopher Evich: Yeah, just quickly. This seems like this could get really complicated quickly with lots of modules and the orders significant and why not. This is a reasonably easy way to see What is loaded from where in the debug output for example,
Valentin Rothberg: yeah, that you will see in the debug output, which CONFIGS are our loaded from where But I agree for people probably shouldn't take this to an extreme and ship. dozens of conflicts with Fubar. but,
Valentin Rothberg: Looking at the state of the art today. If you have these very complex you want to use in videographic cards in your containers, what you got to do is either use and ship huge images and use a lot of command line flex, or normally sized images and still use a lot of command line flex. So in the future, there could be a future where you wouldn't install an RPM package, for instance pot man dash and video module or something like that. And it would just install a container's conf module in user share. And then if, you type Module Nvidia.com and everything's done, you don't have to care. No worry about this anymore or
Valentin Rothberg: if you have some security sensitive systems, you may use very strong defaults, but certain containers may still need to add certain capabilities or play a little bit with SEO Linux then it's probably where I would consider best practice to Ship Containers, Conf module which sets the base minimum of capabilities needed to run a certain works workloads rather than forcing or pushing users into using the privileged flag for instance. Yes, then as Dan says the Papa bear. Can't
Valentin Rothberg: Martin has another question.
Martin Jackson: Yeah, this looks pretty cool. it looks like on current main. The module option is not yet supported in quadlets. do we have to pass that through with hot men arts? I like going forward?
Valentin Rothberg: That's a very good question. Yes, you're right at the moment, quality doesn't support. there's no quadlet native containers confield. So if you want to use it you got to use the department arcs cheat someone but it's actually a great request. Would you what you might opening an issue on Github so we want forget about it.
Martin Jackson: I will happily do that.
Valentin Rothberg: Cheers.
Martin Jackson: Thank you.
Valentin Rothberg: Another question from Eagle.
Ygal Blum: command line that you ran there, the argument was passed before the ran command does it matter where that can like that parameter is, or can it I'm just preparing myself to the club that PR
Valentin Rothberg: He has a quad limit. That's a very, very good question. the module flag needs to be specified before a command. So when you look in the terminal it
Valentin Rothberg: It needs to look like this. and…
Ygal Blum: Yeah, and it can't look the other way around. Yeah.
Valentin Rothberg: not like this. So, I can give it 20 seconds. X or explanation of that.
Valentin Rothberg: To initialize, right?
Brent Baude: And women request, if you could just Protocol your history so they can see the original command. To have your history still.
Valentin Rothberg: No. I run a shell script for the demo.
Brent Baude: Okay.
Valentin Rothberg: But I can quickly jump through it. So what you saw here is the module flag. spec needs to be specified before any apartment command or subcommand. It has a technical reason. Which boils down to how the goal library that we use for CLI parsing works. And the fact that these containers confile are being used to set the defaults for these flags. So, we got a the module flag, very early on initialization of the potman very early on or right after the go run time. Has been initialized. To inject all these values. So,
00:15:00
Valentin Rothberg: yeah, looking forward to see this and in Kuala.
Ygal Blum: Yeah, thanks.
Valentin Rothberg: Yeah, Great comment also, from Dan for those listening in, probably not reading or being able to read the chat, these modules work for any command. So this is not limited to Running containers is just a very compelling example but containers kind of allows for changing all kinds of fields and knobs important. So even when pulling an image, there are flex and fields in containers, confident influence that or when creating that works volumes, all kinds of things.
Tom Sweeney: I'm hearing the questions, slow down here and I know that Valentin's got to Make his way out of here, pretty soon. So, last chance, for the questions?
Valentin Rothberg: Thanks for the great questions and thanks everybody for joining. Back to you, Tom.
Tom Sweeney: Right thanks for coming in today and talking about that. So now next we have brent's up leading a discussion on specifying, a guest OS and podman machine admits
Brent Baude: Why don't We'll start with David's demo, but to Set the stage, Perhaps a little bit. The David I believe You were the author of the PR or you're not Yeah.
David Chisnall: Yeah.
Brent Baude: And David has created a PR that opens up. Padman machine and knit to do.
Brent Baude: Be able to load alternate os's. I think as we've debated this for weeks now. Internally I believe it kind of boils down to two things. One he's opens up the ability to be able to do FreeBSD. As a machine. And the other is that it opens up to be Able to do whatever you want as a machine. So with that, I think it's good that we look at what is PR does and then we can Talk about what? Am I mean?
Brent Baude: We're getting a blank screen.
Tom Sweeney: And no sound from David. Who was on prior, I'm wondering if he's got chewed up by Google meet which sometimes takes people away.
Tom Sweeney: It's back. And David are you back now?
Brent Baude: You're unmute David?
David: Every time I try and share window, the
Daniel Walsh: You're very low volume.
Brent Baude: I provided the PR that we're talking about in the chat. for folks, If anyone wants to familiarize themselves with it, I think. Our team has debated it quite a bit, so we're quite familiar with it.
Tom Sweeney: David's, third time, the child.
Brent Baude: Yes, it looks like it.
00:20:00
Daniel Walsh: David, if you're talking, we can't hear you.
David: Sorry restarting the Web browser remuted me. So can people see a terminal window now?
Daniel Walsh: Yes.
David: So yeah, to Google meet thing kept crashing so I'm not sure. Quite what was said in the intro but my starting point here has been building on top of Doug Rabson's work to get podman working on FreeBSD. Most of what I've done has actually been on the FreeBSD side. I just had some very small patches to pop down to make all of this work. but what you can see, hopefully, here is a terminal on M2 macbook.
David: And the thing that I've added is the ability to specify what the machine OS is, so that you can then key different behaviors of that. And there are a few places where currently Pubman hardcode some assumptions about specific target machines. so if we start this saying here is a FreeBSD disk image Let's boot up. PubMed machine for managing containers. This takes about 20 seconds. Last time, I ran it maybe a bit more with Google meet eating all the CPU.
David: This does more or less. the same things that it does today with the next version, it mounts volumes from the host, provisions, ssh keys. And everything I did specify minus root full, but it doesn't actually propagate that setting and that's on my list of things to investigate. So I need to explicitly say past, this is as the root thing. but now, from the Mac, all the podman remote stuff works. So I can grab a FreeBSD container image. I can. And something in that that tells me what the version is.
David: the kernel version is, BSD 15 current that container is from an older version. And mind mounts from the host of working. So, That's mounting the current directory in slash MNT and that shows the same things we see on the host.
David: And for a little bit of extra fun, the previous image also has the Linux compact layer working. So I can also run the Linux command to look inside a Linux image.
David: And if you run your name, you see that this is not actually a Linux can kernel. It's a FreeBSD kernel pretending to be a Linux kernel. So, this is kind of where I wanted to be able to Build use previously containers on the Mac. And that I can then deploy to servers that are running a freebs DOS on the host. That seemed like it was a hundred percent in scope for what podman machine was supposed to do. it's for supporting running containers of one OS, when the host is something different, that's why I was kind of surprised by how much negativity, there was in the PR but a couple of people suggested discussing it in this forum, so,
David: Yeah. Yes, this is arm because I'm on a apple, silica Mac. Most of this stuff should work on x86, but my x86 Mac is too old for me to be able to build pod, man on it. The go compiler, crashes. So I haven't been able to test it on x86.
Brent Baude: Okay.
Daniel Walsh: So Paul is not here, So Paul is the one that push back the hottest.
Brent Baude: No. I think we can speak for Paul. The team was pretty unified.
00:25:00
Daniel Walsh: Yeah.
Brent Baude: And in their thinking. So I'll try to represent the team the best David. And what I would like to do is just have a friendly conversation and please don't take anything as a negative.
Brent Baude: So you're demo was very nice. it just Established a couple of facts. Podman machine and knit is not an automatic thing with tribute SD yet. Is it?
David: You currently have to provide the image. It doesn't go infected automatically,…
Brent Baude: And is that image been customized?
David: There's some build scripts that make that look as much. what you expect from a Linux guest, as possible. As I said, what I was trying to do with most of this work is minimize the disruption in Odd, Man, it's taking the ignition file. It's extracting the bits from that it needs. It's not adding, anything custom, my goal is to have the FreeBSD release engineering, team able to produce VM images that are the shape of man expects to be able to consume And I think EDM Matt from the previous D Foundation is on the call so he can maybe speak more to that. But the
David: to go for most of this work. And this is why, the Pod man changes are a couple of hundred lines. The FreeBSD changes are significantly larger than that. As always been to make sure that we're not making undue requests from podman, we're not saying, Please change how you do sharing, how you provision? Ssh keys. We're just saying, Please don't make or provide a hook that lets us not use Linux specific mount commands, but export those with the free BSD ones and I think that the total changes I have
David: Are really, about a hundred lines of code. And a big chunk of that is moving stuff from one function to another.
Brent Baude: okay, so when you weren't to clarify, when you were talking about dealing with a free BSD, disk Images, Your intent I have an image that is not configured and would use ignition. Okay. How far away do you think you are from something like that?
David: Yeah.
David: So that's what we have. that image I build with poudreau…
Brent Baude: You do.
David: which is the thing that the previous D project uses for building packages and can build this images. That's preconfigured to look for the ignition. And file in the qmu firmware, config exported space extract, SSH keys from that AD users based on that. It has the 9pfs stuff built in so it can grab the host shares from that. It installs podman from the packages,…
Brent Baude: Okay.
David: it has all the services that's up to run all of those bits.
David: And that's now scripted as a thing that just spits out a disk image that can be consumed by Bob Man. that's not where I want to end up. I'd like that to be something that the FreeBSD Release Engineering team is producing For every security advisory for every Iraq to notice.
David: As they do with other customized disk images, for cloud providers and so on.
Tom Sweeney: Note for David and Brent is, did you see the note from Ed must. I'm hoping, I'm pronouncing his name correctly, It's last name. Anyway, he doesn't have a working. Mechan want to make a note that the foundation is quite interested in this topic and is willing to dedicate resources to support what we needed from the FreeBSD image. I can't speak English today either built side and I'm looking at some perfection uses of FreeBSD containerization in general. Ed works with you David? Is that true or previous?
David: Yeah. So Ed is on the board of the FreeBSD Foundation and manages their technical activities.
00:30:00
Daniel Walsh: yeah, so I think it would be First ad for BSD support, I think the biggest pushback has been or against making prime machine end up being, some way of Downloading, any random, Unix Pat box and running it? and the main problem we have with that, is that we end up being the support people for I pulled down my machine for Ubuntu and it's not working properly and we don't have anything to do that. So if previous people are willing to support this I think it's something that we should definitely consider, again, we can't support it. So we need Doug and we need you David and anybody else from free, PSD to be able to support us. Doug.
Doug Rabson: Hey, I'm absolutely there to support this feature and it's kind of interesting. The word support means different things in different contexts. And when I read the two, the four seven release notes includes a line for, adding support for DASH device on previously that absolutely doesn't mean that I expect Red Hat to support commercial customers using that feature. But it's nice that the Pod Binary supports it so I think we can have a sliding scale sort of context, depends. Support model in this case. David. And I really care about Having pod man work as well as it can on previous D and being able to use that on a Mac. Just opens up people to experiment with it. I have a Mac on my desk at home that I'm working. So, we'll be useful for me, but it doesn't mean that I expect you to,…
Daniel Walsh: I just want to.
Doug Rabson: to feel support calls for that future.
Daniel Walsh: Yeah, I don't want to first of all, Red Hat support and just because a few bunch of us were for redhead Red Hat supports a totally different thing. We're always talking about here is upstream support. And in that case everything you just said actually is true as well. Our fear is that Doug you've been a great partner for us so you're not as category but we get a lot of drive by commits that has my favorite Linux distribution. I need a machine for it. So here's how to do an alpine machine and then that person disappears and all of a sudden we're getting, github issues on it and we're closing it and people like I man sucks it doesn't support Alpine right or, things like that. So that's probably the biggest pushback or,…
Brent Baude: Okay, wait,…
Daniel Walsh: at least my biggest push back.
Brent Baude: we really designed Purposely an appliance such that we could have this conversation of you don't get to just put whatever you want in there and…
Daniel Walsh: 
Brent Baude: have us figure it out. So, that was a defensive maneuver at least, when I wrote the original code. IQ IQ. And I think the team as well with some mattresses. Feels pretty good about the freebies steam machine part. So, the hangup is on the BSD machine, if you I think our wish would be that if you follow the code pass, there's something called a provider. In our code. We'd like to see free. BSD be a provider even though it's using If that's something we can maybe figure out and I need to go back and look at the code to see if that's possible or we just sort of talk it, under there as a OS. everything under square
David: Yeah, so I mean the Current.
Brent Baude: UNIX, or whatever.
David: Delta between Linux and 3bsd in qmu is two things. One of which I'd like to not need for some reason on a arch.
Brent Baude: Okay.
David: 64 FreeBSD is not correctly. Handling, the ACPI Shut down event. There's a bug filed about that ream. Maybe Ed can help. Devote some resources to fixing that, but that means we just ssh in and do a shut down dash p now, as well as sending that event. that's three lines of code on two of those are the open brace and closed brace If it's Free BSD, have this hacky work around
00:35:00
David: the other one is when we mount the host file systems, The FreeBSD, and the Linux Mount commands takes slightly different arguments. I factored that out into a separate function for the Linux and…
Brent Baude: We?
David: the Freebs D1. And everything else is shared across the qme1.
Brent Baude: Perfect.
David: I haven't tried the Apple HP code paths yet. I'm not sure how mature they are if they're in a working state but I'd love to work on that. I know some customers that would be very happy to have. No requirement to run GPL codes to be able to run containers on a Mac. I don't have quite that hang up so I'm happy to work with the qmu version.
Brent Baude: I wrote the Apple HP stuff, so it's perfect obviously. It does work, the biggest hang up with Apple HP. Right now is just simply that we don't have photo or cos image being generated by a fedora correlas. So otherwise it's been pretty bulletproof. It does use vfkit. have you seen that? Okay, and…
David: Yeah. In a past life,…
Brent Baude: it uses GT proxy.
David: I actually wrote the book about the Zen internal, so I have more than a passing familiarity with how hypervisor work.
Brent Baude: so that would be the only You think of a free bsd problem of via Kit? I would imagine that would boot just fine. They're red Hatters so we can get cooperation. There.
Brent Baude: And I think they even let me merge Prs. so, the second small hurdle will have to figure out is somehow one of our biggest efforts right now as a team, As Chris can tell, you is, We're trying to get machines, we have a whole slew of machine tests. Now, And we're trying to get that working in CI. so, the first thing that might be good is to Have you run your current code against the machine tests? There's a readme in there. I think you'll be able to figure it out.
Brent Baude: If not hit me on IRC here wherever else? But we don't really have a freebsdci solution. Is that something you guys have?
David: Yeah I mean Sarah Ci does open source Freebsdci but the bit that we actually need here is Mac CI. And we can provide FreeBSD.
Christopher Evich: He?
David: This images that can integrate with that.
Christopher Evich: I can speak a little bit to that. So, serous, the serious FreeBSD, I believe, that's using their compute services and I'm pretty sure that's going to be running on a VM of some sort. So, that seems like that would cause issues with trying to run nested for and
David: Yeah.
David: I thought she supported nested virtualization, but I've not actually tried it.
Christopher Evich: Sue and So I'm not exactly sure what is behind the serous compute stuff? It's kind of a black box. but you're right there are I think in both GCE and in AWS, I think they've got
Christopher Evich: Images that are available. The ez2 side is a bit more attractive because we could in theory, run bare metal there. It's kind of expensive, but
Christopher Evich: Maybe that's a possibility.
Brent Baude: So let's get it.
David: But yeah.
Brent Baude: Can we get an issue upstream about implementing? this and Chris Knight, This is the last of your
Christopher Evich: yeah, You can stick me on it.
Tom Sweeney: Okay.
Brent Baude: But it would be the last of your platforms to work on it. At least at this…
Christopher Evich: Yeah.
Brent Baude: but David, if we can get a thumbs up, that it passes the tests if you run it, local, That would be,…
David: Yeah.
Brent Baude: that would be very helpful to us. In terms of confidence.
David: Yeah, if you can drop me a link in the chat to the Readme that has the instructions. I can definitely spend some time on it this weekend.
Tom Sweeney: Okay, that's good. I wanted to just touch base with Doug real quick and then we're gonna have to move on if we want to come back to this at the end we can't, did you have something further to talk about here?
Doug Rabson: Yeah. I was just going to note that in a very small way. We have a FreeBSD workload running in the CI does the native through the SD build as opposed to a cross build obviously it's not doing nested virtual anything like complicated Long-term, I kind of want to be able to run system tests, but I think we're quite our way away from that.
00:40:00
Tom Sweeney: I'm just gonna end this conversation right now just because of time rather than of interest.
Brent Baude: Yeah.
Tom Sweeney: And I'm going to ask Dan to step up now and give us a quiet demo and then we can come back to the Select Demo style if we still want to. 10.
Daniel Walsh: Okay, so I was talking in time before it's a quad that's been around for a little while. I'm surprised we haven't done this at community meeting. So let me I'm just going to talk through quickly. What quadlet is and Show you a couple of examples of it. Those who haven't played with it yet.
Daniel Walsh: So, a little history lesson, I wrote a blog on Quad, led Pod that back February of this year. So quadlet was a effort of integration of podman and system D. So for those of you out there that played with partners, always have this command, Baude man system. System degenerate, which would take a running containers on your system or running pods in your system and then would generate a system to unit file. That was sort of the best practices of the time to define how to run this pod man under a system to unifile. And
Daniel Walsh: That a lot of people use that matter fact, that somebody who we've sort of tried to deprecate it and now there's some people pushing back as they use it heavily inside of production. So we're have to look at it. But a engineer from Red Hat, Alex, Larson saw this and actually realize that he understood the system. He had this concept of what's called the generator and what a generated allows you to do is actually sort of do that on the fly, all Actually generate a unit file and then customize the way that the unit file actually looked on a system. So if you played with system D at all, he probably seen a unit file that looks something like this.
Daniel Walsh: And usually a unit file defines the actual application and find some stuff under services. And then usually Elijah to set up relationships between different unifiles. So you can do things like install and say, the services are going to start till after the civil service starts, but there's a special section inside of this. That doesn't exist in most system to Unifiles. And this section can be defined, and then you run a generator to convert this section into something that looks like in a system D could actually support. So what quadlet does is allows us to specify these special sections inside of what looks like a traditional system. The unit file in this case is just a couple of lines What image the container is going to run. And then just the command to execute inside the container.
Daniel Walsh: When you run a system daemon reload that will actually cause system D to run a generator, which is going to run quadlet to translate that thing that looks like a system. To, file, we call them quadlets into a real system to unit file and I think down the bottom here. this is the real system to unifologist generated here and you'll see
Daniel Walsh: Basically, that gent takes generates it into a podman command that will run and your services. But this builds in all the intelligence that we've added to make sure that Pod man runs correctly on the system to unit files. So the original one was just to do, simple, quadlets containers underneath unit files, There's a second blog that was written by Ygal on this call. Also that looks at advanced features of quadlet, so we don't only support container. But we actually support Dot Coop, which allows you to specify Kubernetes, Yaml file to run inside of a quad. that's going to use Pod, man, who play underneath the covers and then there's additional tools Dot network and Dot volume. Let's that allow you to specify, to create a pod man that work or create a Pie Man volume. And then you can into mix all these together and this
Daniel Walsh: The blog Goes heavily into How to set up a real complex, Kubernetes Yml file with its own networking, in its own volumes, but all created, by these multiple different files underneath the Kubernetes Yaml files. So now, I'm gonna go out and show you another example. So, in my home directory, this is big enough. Everybody to see I created a quadlet for running Android. So, this is a
00:45:00
Daniel Walsh: A quick quadlet that someone has Android VM to be able to run inside of a container underneath the pod, man, and this gives you an idea of right up here on doing some leaking the environment variable to tell it which look for Wayland to my desktop. Then I'm adding a couple of it needs KVM and renderer and a few other commands to be able to run container. It's kind of interesting that you can actually do things like Advanced concepts. I think percent takes the current xdg runtime directory and mouse it into the container. So this advanced up but basically this is all this stuff is going to get converted into a real complex pod man. and to run but again it's fairly simple to look at and then I can just do A start.
Daniel Walsh: Android and basically standard system, the commands to actually process a quadlet. And there you have Android running underneath Pod Man, inside of a container on my desktop, it takes a couple of seconds to refresh.
Daniel Walsh: Here it comes.
Daniel Walsh: And say it was giving me this severely real fast, but There are some stuff that we can do to improve the speed of this, but Now, you have an This is Android Auto,…
Tom Sweeney: But yeah.
Daniel Walsh: so a lot of this was done for the Auto SD code. So this eventually shows you, Yes, that running. So now I'm gonna go into quickly through some slides of some of the power that you can do with quadlets because quad lights, allows you to integrate system setting up parts of the system as well as setting up containers. And now you can interact between the two of them. So this is actually part of the ribose effort, red and vehicle operating system and we're looking for
Daniel Walsh: Up a section of the disk to isolate processes inside of this section, from the rest of the system. And so I'm just going to go through one of the things we can do is we can name sort of the C group that we're gonna associate with the entire service. We can actually take through all system D tools that you can use to convey a quadlet. We can actually pin all the processes inside of this broad led to specific CPUs and the system you can actually set up C groups measurements on the group. So you can set up CPU weight. Now you can set this up in five man as well but it's kind of interesting that System has some advanced features that we can take advantage of i08 similar
Daniel Walsh: On and we're gonna go down here. We can actually set things like boom killer. So if I want to make sure that my process gets killed inside of a container, I can set up outside of this service is priority wise. They can do that a couple of those things.
Daniel Walsh: We can actually take set stuff like recent whether or not system should restart the service automatically. And this is interesting too system. D has advanced features for stopping fork bombs. So Taskmax here is actually setting, basically says the service to say that it can never have more than 50% of the maximum amount of kids on the system. And then we're going to jump down.
Daniel Walsh: And now we're in the container section. So these are commands to setting up pod man, but when I set up the pid's limits there, what's interesting? I think I stopped here as I can soon section. These are all flags, you can set But I was trying to get to and I guess my presentation. So right here, Pid's limit If I wanted a container to have more than,
Daniel Walsh: Yeah. The Pid's limit, if I wanted to control his limits from my system point of view, and not from podman's, hide coded to go to 2048 by default that runs containers. But if I wanted to have 50% of all CPUs and I go into my Pod, Man section and tell it to set the limits to minus one. Now, most of these fields inside of the container section, all match up some what to match up to similar Pod, Man. Command line options and there is a Get Out of Jail free card. If we did an implement one. So there is a podman arc so you can actually specify individual pod, Commands bottom line is, you can do really advanced stuff with running podman of the system d. So if you're moving to services running on nodes edge devices, things like that is incredible power on this. So I'm gonna end it.
00:50:00
Daniel Walsh: End at this point and open myself up to questions I guess.
Tom Sweeney: Any questions for dinner. I saw a couple go by, for Blaise in the comments talking about Now, I've lost it.
Tom Sweeney: Always quiet, Kubernetes for humans. In other words, a poor man's Kubernetes
Daniel Walsh: Here. you still have to write the Kubernetes Yaml files. Although Pod, Man has ability to generate Kubernetes Yaml files so you can do podman Coop generate from existing pods of containers and that'll generate a yaml file that you can then use in a pod man and inside of a quadlet and Egal is much more of an expert on this. So I'm sure he's jumping up to answer the question so go, yeah.
Ygal Blum: But I'm I think might I have a problem with my camera, Sorry for that. So the idea is that you can define your application either directly on a containers as a dot container or it is a dot cube and then use it as a kubernetesmo and then point to it with a dot cube file, the ideas that then you can reuse your already existing Kubernetes deployment or even said or whatnot and use it directly and you don't need to maintain two sources of truth.
Ygal Blum: An image pool operation that will be separated from the apartment run. the initial reason I added It was that I needed a weight. I wanted to create a volume based on an image and unlike Podman Run which knows All the Image Podium volume. Create does not do So I needed an automated way to pull the image separately from the creation of the volume. So this allowed me to do that and not sure if Dan mentioned it. So there's an if you can see it in my blog post, Once the Dot volume. And next DOT image file are not only used to define these entities, but they can also be used in the Dot cube or DOT container or next in the DOT volume using DOT image file. So that
Ygal Blum: Quartet will know to create the link between them and also to create a dependency between the service file. So let's say I have a network created by a DOT network file and I point to it from a DOT container file, then while that will know to link to that network and also to create a dependency between the service created for the DOT container file and the one created for the DOT network.
Daniel Walsh: Excellent. They got somebody's pointing out that there's multiple ways of running containers.
Tom Sweeney: Yes.
Daniel Walsh: There's Kubernetes There's Darker compose, there's pod, man system degenerate and now I think quadlet is biased towards system. D, use cases for running containers and we've always had a goal with pod man to make it as integrated with System. B is as humanly possible, the real neat thing is that you can start to run, could you Kubernetes workloads? I mean, define your application in terms of Kubernetes, then we can run at locally under a system, as well as running inside of a Kubernetes cluster. So we can actually run the gamut of those tools. Obviously we continue to support compose and kubernels for running. container as well, but
00:55:00
Daniel Walsh: So that's it. Any other questions I missed anything?
Tom Sweeney: I'm hearing silence and we're getting close to the end of the hour. So I'm gonna think that and you go for talking through this and the questions that we got on it and I will just ask if there are any questions that somebody else had Kiran
Kiran: Hi, Tom. so my question is regarding I deployed my container. but, I was thinking to add authentication for it. If any user is using Portman exec command we can directly get inside the container. So is there a way to add any type of authentication for that?
Daniel Walsh: Do you want to You running a ruler container or focus data.
Kiran: it is a rootless container.
Daniel Walsh: So you're worried about other people logged into that user getting in or is your container listening on the network?
Kiran: I'm worried about the other user, specially the root user. To access my container.
Daniel Walsh: Yeah, so that if you were worried about the root user, the future of that type of worry Pod, man has no way of control and I'm back. No process on a Linux system. Right now has a way of controlling that if you following along with the thing called confidential computing, which is just starting to show up right now and Computing is the way to solve that problem, but it takes specific types of hardware that are not available on laptops or low-end devices yet, but I think over the next six to nine months so this would be So the processes inside of your container as well as all the content would be encrypted in such a way that the root process would not be able to interfere with it. the only you could do is kill it but you wouldn't be able to examine the content or manipulate it so
Kiran: Okay, so I'm mostly concerned about my source code, which is inside using the Portman secret.
Daniel Walsh: yeah.
Kiran: Can I hide all of my source code?
Daniel Walsh: No Secret is only to leak a secret into the containers in a way that it would not be saved. So It's really a secret from the image that could be created. So secret secrets is not what you think it is. Now you could encrypt your container and pass in a secret to decrypt, your content. But that would not make it safe from the reviews around the system.
Kiran: Thank you, Daniel.
Daniel Walsh: Yeah. Yeah.
Tom Sweeney: Thanks.
Daniel Walsh: Jennings is a hand raised. Go Jennings.
Tom Sweeney: hope to do, just
Tom Sweeney: We can go a few more minutes.
Jennings: Okay. Yeah.
Daniel Walsh: If your questions between me and lunch, so yeah. but,
Jennings: So I have a really long question. That's really multiple questions. First, I can share that I've been using Quad lit, just on my personal home server and I've been able to deploy next cloud, using quad lit and so far. It's been running smoothly, but I do have a couple of bugs that I need to work around. One of them has to do with podman network create and When I created the issue on, the podman Github, they close that as won't fix. So I'm just trying to explore other options. I've seen this word pasta appear like on the issue boards but I've never found any documentation for it. Can anyone tell me what pasta is and is it something that I could possibly look into
Daniel Walsh: but,
Brent Baude: Pasta is a replacement for the current slurp. Implementation. It's claim to fame is that it's more performant.
Brent Baude: Maybe you could paste the issue so that we can familiarize ourself with the issue.
Jennings: Yeah. I'm looking for,
Jennings: There we go. So that's the issue with podman that I have. How the On quadlet thing for me works is that this is a special repository called Next Cloud. All-in-one A little context on what Next Cloud is a self-hosted, Google Drive and this next cloud, all in one project works by speaking to the Docker Damon and creating some containers of its own. I found this pretty easy to do with quadlet and also rather elegant to do because as a System D service, the dot container file can actually specify a dependency on the podman socket. And so I'm able to just bring everything up with a system restart or as a system CTL start. But then, we get to this problem where? The application called Nextcloud Aio wants to speak to the Docker.
01:00:00
Jennings: API and podman understands most of the things. But in counters, A Internal error with this specific issue. I wanted to create a workaround in next Cloud Aio, but they just shot down my PR as well.
Christopher Evich: I was exploring that the other day and I saw that there's a little blurb on their website. That basically says that they don't want to support Pod man because of differences with the docker API. They don't enumerate what those differences are which is not helpful.
Brent Baude: What is the difference?
Christopher Evich: We don't know, It just says Next Cloud. Aio does not currently support podman due to differences with the Docker API. it's very generic like that.
Brent Baude: Is that what you're seeing Jennings?
Jennings: The API is the same but the behavior is different. So you can make the proper API call but it's not going to work because of this. Issue with Slurp and I'm not sure if it's truly something like that I can't figure out or whether or not, it's been closed by won't fix erroneously.
Brent Baude: Paul's not here to speak for himself so I'm not going to speculate He's one.
Matt Heon: I can.
Brent Baude: Smart cookie.
Matt Heon: I can say it on the sprint. This is mostly internal database stuff there are,…
Brent Baude: Yep.
Matt Heon: it's an accounting thing, where the sloper knit in this net mode doesn't allow for a list of networks.
Matt Heon: I think it's definitely fixable but this is refactor stuff that will probably go along with the rewrite for pasta. So I don't think it's fixed by pasta, but I do think that we're actively working on this bit of code as part of the posture transition.
Brent Baude: And all is working on that presently. So, we could take a note to follow up with Paul.
Brent Baude: To see if that's something. He can consider. Is that what your sort of suggesting Matt?
Brent Baude: And he's in Germany. So he's on PTO today. There's a holiday.
Christopher Evich: It seems like it would be useful for us to get details from the next Cloud people. What exactly in the API is not matching because there's my understanding as we want to try to have problem and be close.
Christopher Evich: So, if it's
Jennings: To try to save you from that conversation. I'm pretty sure what they just mean. Is they are Skeptical and it's more work for them to maintain something that is somewhat niche in their community right now.
Christopher Evich: Yeah. Yeah.
Jennings: Everyone's happy just running docker, as the root user and they make rootless locker, a special case as well. And then podman is a special case of a special case. And they just don't have the manpower to tease out these tiny little bugs that are different between docker and podman. So this issue that I created on the podman repository it does seem like a difference or broken feature parity to me because it's very easy to reproduce but I can see that this is also just a very rare edge case since trying to join in existing container to a existing network. Isn't something that most people will do very often
Daniel Walsh: Then.
Jennings: if we do have a solution for this bug, down the road, after a pasta rework and then after some more effort on this issue, then, I would say This bug is the last thing that's kind of blocking specifically mixed cloud aio from working with Quad lit in a very elegant way. so, If this issue is at a result, then I would probably be able to contribute to the next Repository just the set of quality files that I used to bring everything up and it'll be a seamless experience for other people to try.
01:05:00
Christopher Evich: Or a blog article would be good.
Jennings: Yeah. the next cloud Aio Maintainer invited me to write a wiki page. I haven't, really once again, things work out of the box. So, long as you work around this one bug by just changing, two lines of source code.
Tom Sweeney: All right, I think I'm going to wrap up here just due to time. Jennings is there anything else that we can do at the moment or for you or help you with this? Or just continue on the bus.
Brent Baude: Let's try to circle back, Jennings. Are you on discord or IRC or something? Where we can circle back to you later in the week?
Jennings: I am on the Matrix channel.
Brent Baude: Okay, great.
Tom Sweeney: As Jennings.
Tom Sweeney: Sounds good. Any other last questions before we wrap up for today?
Tom Sweeney: Okay, I'll just throw up the reminders for upcoming meetings. We are December 5th for the community meeting here. Our next cabal meetings coming up in just a few weeks. That will be on Thursday October 19th. And that too. Is that 11 am? And as a reminder, that will be our last Cavali meeting will be moving those As of November the third Tuesday of the month there, And with that, I am going to thank everybody and our presenters, especially, and the folks that ask questions and we're going to stop recording here. Yes.
Brent Baude: I'm just if I can before you hang her up, could the FreeBSD folks and at least Matt stick around.
Matt Heon: Sure.
Meeting ended after 01:06:41 👋
```
