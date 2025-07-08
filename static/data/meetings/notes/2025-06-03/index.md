# Podman Community Meeting
## June 3, 2025 11:00 a.m. Eastern (UTC-4)

### Attendees
Aditya Rajan, Alex Guidi, Ashley Cui, Brent Baude, Gerry Seidman, Giuseppe Scrivano, Jan Kaluza, Jan Rodak (Honza), Joshua Arrevillaga, Lokesh Mandvekar, Mario Loriedo, Mark Russell, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Nicola Sella, Paul Holzinger, Priyanshu Yadav, Tom Sweeney, Valentin Rothberg

### Topics

1) Container Libraries Monorepo Plans & Demo - Jan Kaluza
2) Image Mode Demo - Valentin Rothberg
3) Podman at Devconf.cz - Neil Smith

## Meeting Start: 11:02 a.m. EDT
### Video [Recording](https://www.youtube.com/watch?v=CbBHL83QPlw)

##  Container Libraries Monorepo Plans & Demo
### Jan Kaluza
#### (1:50 in the video)

Jan presented at the last Cabal meeting, and this is an update.

He started with a Demo.  The new repo will contain the c/storage, c/image, and c/common projects in one.  Working in the [automation-tests](https://github.com/containers/automation-tests) repo.

Preserves the message from the prior repositories.  The vendor directory is now shared by one directory rather than having to do it for each of the three.

The commit message for c/common was shown.  If moved to the mono repo, he showed how the commit would show there.  He was able to keep the values and all the information of the entire PR.

As far as the CI goes, there used to be cirrus.yml for each, and he's been able to merge it into one.  He showed all the CI tests for the mono repo project.

If you make a change in common, it won't test all the projects, just common.

For individual releases of common, image, and storage, will it be everything in the history?  

Paul asked if GitBlame should still work for older commits in the individual project that were done before the repo merge.  Jan will have to investigate, and the hope is to have the blame retained.

A PR that is merged for storage, will drive tests for image and common.  But common will not drive storage or image builds/tests.

When this goes into effect, it will require go.mod changes to the new repo and removal of the old ones.  We will need to figure out how to get a notice out.

We may keep things in sync for the short term, but not the long term.

Paul pointed out that the timing of any CNCF changes would be good if it proves to be feasible.

Jan has a script to regen the repository when we want to go live.

Questions:  How to do backports for older versions, and handle commits in progress when you transfer over.  TBD.

##  Image Mode Demo
### Valentin Rothberg
#### (25:48 in the video)

[Slides](./Getting_Started_with_Image_Mode_for_RHEL.pdf)

Talked about Image Mode, from RHEL summit.  Combines the power of RHEL with the benefits of containers.  Image mode sits between containers and RHEL.  You can run RHEL within a container in it.

Image mode are not meant to run as an application container due to their size.  The pipeline is similar to applictaion containers, it starts with a Containerfile.  You can build it, and then send it to a container registry.  Once built, you can use an ami, disc image, and similar.  There is a bootc image converter (TOM) to update or install the image.

Valentin runs on a Mac, but manages his Fedora systems on GitHub.

This is not replacing Package mode (rpm), but is a new offering and use case.  

Image based updates are immutable by design.  Transactional updates are used to convert the container image into the root filesystem on the host.  You can rool forward or backwards as neded with `bootc rollback`.  Upgrades between minor releases are much easier.  You just need to change your Containerfile, merge it, and off it goes.

This doesn't require system partitions to pull off.

Image mode is writeable at build time, readonly at runtime except from /etc and /var.  We still need to support a sysadmin for updates.  Also, /var needs to be writable for things such a logs.

For instance we don't need to tweak our smarttv's, rather we get a new image when one is available, similar to image mode.

You can combine image mode and quadlets to separate and allow application tems to manage updates, and sysadmins manage the OS.

### Demo - (46:30 in the video)
Showed a quick demo video. 
Ran image, found minor issue, and walked through how to fix it.

More info: 
 *  [Fedora bootc documentation](https://docs.fedoraproject.org/en-US/bootc/)
 *  [Bootc upstream Documentation](https://bootc-dev.github.io/bootc/)
 *  [Red Hat Image Mode Landing Page](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux-10/image-mode)
 *  [Red Hat Image Mode FAQ](https://developers.redhat.com/products/rhel-image-mode/faq)
 *  Bootc is a [CNCF Project](https://www.cncf.io/projects/bootc/)


## 2025-06-03 Podman at Devconf.cz
### Neil Smith
#### (53:21 in the video)

At DevConf.cz June 12 ->14, 2025  with a booth.  Swag to give out.  We're looking forward to seeing a number of people in person.
 
## Open Forum/Questions?

1) None Discussed

## Topics for Next Meeting

1) None Discussed

## Next Meeting: Tuesday, August 5, 2025, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, July 1, 2025, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:57 a.m. Eastern (UTC-4)


## Google Meet Chat copy/paste:
```
You
10:55 AM
Agenda:  https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?both  Please add pertinent links, and make corrections to any bad notes that I add!
 keep
Pinned
Priyanshu Yadav
10:56 AM
hii tom
You
10:56 AM
Howdy Priyanshu!
Gerry Seidman
11:12 AM
Unfortunately I have t to dash to a meeting.   

Interesting stuff, I'll catch it in the recording
You
11:12 AM
+1
Miloslav Trmac
11:13 AM
There’s a specific tag format imposed by Go: https://go.dev/ref/mod#vcs-version
Jan Kaluza
11:20 AM
That's the link to repo btw: https://github.com/containers/automation-tests
You
11:20 AM
@jan Thx!
Neil Smith
11:27 AM
I think we want to get Valentin going
Neil Smith
11:35 AM
Bootc is a CNCF project
Neil Smith
11:48 AM
https://github.com/bootc-dev/bootc
Aditya Rajan
11:55 AM
Great Presentation @valentin !
xrq-uemd-bzy
```

## Raw Google Meet Transcription
```
xrq-uemd-bzy (2025-06-03 11:02 GMT-4) - Transcript
Transcript
Tom Sweeney: Morning folks. This is the Podman community meeting. Today is Tuesday, June 3rd, 2025. So whoops I cannot make the screen image go forward. I'll go here though and just go briefly over what this meeting is all about. We meet on the first Tuesday of even number months. We also have one on odd number months for the call meetings. This meeting is more for demos and discussions along those lines where the call meetings more technically design kind of things that we talk about generally there. Topics for this meeting and the other one are driven by requests to me or to podman.io
Tom Sweeney: itself or with wherever we can get them from, we're always happy to take those. So if you have something you'd like to demo, whether or not it's part of the Pman builder in Scopio or just container related, we're happy to do that. And our meeting notes are in the hack MD, I've put them inside the chat as well for Google. And if you see something that I've put in there that's incorrect, please let me know just change it.  And then if you have any links especially from the presenters that you want to share please add them there and I will include those within the notes that we publish later. And so for today we have a talk from John Yan about container libraries mono repo where it stands and what we're and a quick demo or a demo for that I should say quickly and then Valentin will be here talking to us about image mode demos.
Tom Sweeney: happy to have him back for this meeting. And then Neil will wrap us up as far as discussion topics go for devcon.cz. Then I'll ask you to put on your thinking hats right now and think about things you'd like to talk about in August for the next meeting. And then at the end of that, we'll go ahead and wrap up. So with that, I'm going to stop sharing and I will hand it over to Yan.
Jan Kaluza: Thank you should see my screen and I have short demo about my progress on the monor repo project I'm working on. I presented some document describing what I'm going to do last time on cababa meeting and this is just the continuation of this or followup of that.  So here you can see the automation test repository where I do all those tests and I have here each directory represents one of the repositories I was adding to the monor repo and for this initial proposal or test we decided to do the common repository which is normally in the containers/common github project.
Jan Kaluza: the image repository and storage. So you can see at first view that each repository has its own directory. There is the go.work file and this actually defines what's in the model repo. So you can see those three directories are mentioned here. And the point of this file is simple.  If you start working on some change in the storage directory for example in some go files somewhere here and you will try to run the tests will automatically find out that there is the go.org
Jan Kaluza: fork and it will use those image or common packages without any manual changes needed in the golden mode file which is the benefit definitely. So the go.work  work is a new thing otherwise everything is basically copied to those directories but it's not simple copy because you can also see that the gith is present is preserved so all those commit messages and outsource and everything is preserved and we can search in it using git log or github ui so
Jan Kaluza: That's another change. And the last change in the directory structure is previously there was vendor directory in each of these directories in common image and storage. But now there is a single vendor which is shared between So basically all those three projects are now using single pool of dependencies or how to call it.  So this should in the future make it easier to actually vendor all those three projects while releasing. let me check if I want to talk about something else here. Probably not. So let's jump to the commit messages because that's another nice thing.
00:05:00
Jan Kaluza: So I will switch to this tab and this is the commit from our current containers/common repository and it mentions the bug here like github ticket and you can click on it and move open it but if we just migrate this to the new monor repo we would lost this context because this would no longer point to the right ticket because we  are in the different repository. So I also experimented with this and I will now switch to another tab and this is the same thing from the containers automation tests which is the monor repo and you can see that I basically override this issue number with the right full path to the ticket.
Jan Kaluza: So in case we switch to monor repo we will not lose the commit history but we will also not lose the references to the tickets which is good thing. Of course new tickets will be opened probably here in the issues in the monor repo. So we will still have to mention them as we are used to but the old tickets are still searchable here which is I think nice thing. there's also the let me switch back and now we can talk about the CI part of this. So previously there were serusl in each of these directories. What I've done is merging this into single sus.l and I'm basically executing all those tests here together.
Jan Kaluza: But there is one nice feature I will present in the part here. So I have three test pull requests opened here. let me start with the storage PR. This is basically
Gerry Seidman: Okay. Good.
Jan Kaluza: which changes some make file in this storage directory. So in the storage project because both image and common are using the storage the tests are executed all the tests are executed and you can see here that the are prefixed. There is the common test. Please ignore the failure here. I'm not sure what's going on there. It's just like something in the package. I will have to debug that. Maybe I just choose wrong commit. I'm basing that off. But the test art is executed properly.
Jan Kaluza: so this is for the common test and there is also all the tests for the image module are executed and also for the storage and you can see they are prefixed so it's easy to find out what each test is doing. There is also the vendor test which is global for all of them.  Previously there were three of these tests for each module but because we have single vendor directory the vendoring happens at same time for whole monorito. So there is a single test and the nice thing is that if we now open let me go back to the two.
Jan Kaluza: If we open the common changed for example you will see that the image tests and the storage tests are skipped because the change is done only in the common directory and storage and the image modules they are not using the common module.  So it is not useful to run the image or the storage tests when nothing changed in those directories. At least that's like what I think. So I try to do that in susc and that way we can save some time even if we have everything in monor repo not all the test has to be executed have to be executed we can just choose some tests to execute.
Jan Kaluza: And the last test shows the same feature when everything is basically skipped because the change happens in a g in git ignore which is not used to build anything. So we can also use this coci feature to save some time while running the test and you don't have to run everything. it can be based on the change we are doing.  So that's for the CI part and the last thing I'm going to show you is the releases part because in case of monor repo we have everything in single repository. So also releases will look a little bit different. So my idea was that we could prefix them with prefix the release name with the project name. So we have the storage and the version here.
00:10:00
Jan Kaluza: And if I scroll down there is image release and even further down there is common release and the text if you notice here they are named with the okay it's not visible here but can see here that the tag is named storage slash and the version name which is kind of nice because you can use that naturally in the go domod in the depending projects. In case we would like to pinpoint, the particular release, you can just use storage slash and the version name. And I think that's all I have for now. please tell me if you like it or…
Jan Kaluza: if you don't like it or you can write to me later, on Slack or email. So, thanks. That's all.
Tom Sweeney: Any questions?
Tom Sweeney: Come on.
Mohan Boddu: Yeah. quick question for the individual releases storage image or common does it will have all the other directories as well within the release or…
Mohan Boddu: is it only those particular directories for the release?
Jan Kaluza: it's all the directories like the releases on GitHub they are done using git tag so they will contain everything so I'm not sure…
Mohan Boddu: Okay. Mhm.
Jan Kaluza: how like when building RPMs or using in other projects using it has we shouldn't have any issue with that.
Mohan Boddu: Okay.
Jan Kaluza: But in case someone downloads the tarboard for example generated by GitHub, it will really contain everything and…
Jan Kaluza: you need to know that this tarboard is actually released for the storage. So other repositories might be in some weird shape. Maybe
Mohan Boddu: Okay, thank you.
Paul Holzinger: What happens if I want to get claim with the history because it's merging out of three different repos? Does get blame still work if I have a or…
Jan Kaluza: Yeah. Yeah.
Paul Holzinger: I guess I need to give a bad commit anyway and that will tell where it came from.
Jan Kaluza: Yeah. get blame it should still work.
Paul Holzinger: So, I mean bicep. Yeah, you need to…
Jan Kaluza: Let me think I don't see any reason why it shouldn't work but I haven't tried it myself to be honest. But the comets are matched together. that's good point. I will test it out and will tell
Paul Holzinger: because you need to know the old broken commit where want to say the last good commit usually right you give the good commit as the old one and the bad commit is the new one if you try to find a regression and I guess in that case you would need to know you couldn't say I know storage version 1 something because now it's merged and…
Paul Holzinger: in the merged you don't preserve the old text I presume
Miloslav Trmac: I think it should be easy enough to copy the old text as well or…
Miloslav Trmac: mapping untacked commits. I'm not sure.
Jan Kaluza: Yeah, that's good idea. the text should be copied. they are not right now. I will note it here. But that's good point. if we move, we should also copy the text. I will check if the tool I'm using for the merging of git repositories actually supports that out of the box.  There is good chance it
Tom Sweeney: I have a couple of questions, if anybody else has one yet. so once this is all set up and you put a PR for storage, is it going to build just storage or is it going to build all the way up the stack since there's dependencies on image for storage and then common for storage?
Jan Kaluza: It will build everything.
Tom Sweeney: But not if you do a commit for common. It only builds con or…
Jan Kaluza: Yes, that's Yeah,…
Tom Sweeney: is it gonna Okay.
Jan Kaluza: that's correct.
00:15:00
Tom Sweeney: And then do you see any changes that people who currently depend on C storage C common or whatever having to make in their code people that vendor that
Jan Kaluza: Yeah. Yeah. Yeah. and we have discussed it on Cababa last time I think. So it's recorded also there in the doc. But they would have to change the code. URL basically. and…
Tom Sweeney: Okay.
Jan Kaluza: we also discussed that it might be hard to predict who actually uses our repositories. So in case we are going to switch to monor repo we have to of course switch it in our go but we also have to some somewhere tell people like this old repo it's outdated. We will still keep it there but new releases are happening in monor repo and you should switch. There is something duplicated in the go mode which we can use in those old repositories and it shows the message when people are trying to use that duplicated module.
Jan Kaluza: So we could communicate it that way probably that's one of the option.
Tom Sweeney: Okay. …
Tom Sweeney: do we have plans for announcing this for x amount of time or can we put some plans together so that people are forewarned a month in advance or a couple weeks in advance anyway that this change is coming?
Jan Kaluza: Yeah, I'm not sure if we are that far with the change itself I was presenting this as an option and I actually was expecting some discussion maybe and someone leading the project to really decide this is the way we want to do that but we are not that far that I would really think about announcements and stuff like that but of course it would be the next step definitely if we decide to go this
Miloslav Trmac: I think we kind of have to move at a single instant at least one repo at a time so that PRs only come into one place and so that updates only happen in one place but we could maybe do it immediately after a release or something like that. We can't give a users notice to move to a new repo when the new repo is not actually ready.
Mohan Boddu: Come on.
Jan Kaluza: Yeah, I can also keep that in sync for some time probably like the old repo and new repo if it helps because I have a script which takes those three repositories and it creates that repo from scratch the merged one.
Jan Kaluza: So I mean I can imagine running that somewhere to keep things in sync but long term we shouldn't do that.
Tom Sweeney: No. …
Tom Sweeney: go ahead.
Paul Holzinger: Yeah, I think the question is still if we want to combine this with a potential like GitHub organization move with CNCF and…
Tom Sweeney: Excuse me.
Paul Holzinger: So we only change our module once like the import URL because doing that twice is quite a pain.
Mohan Boddu: Yeah, we'll be discussing all the timelines and stuff later. this is something we are just working on and see how feasible it is whether it's going to save us from some of the pain points we are facing on a daily basis. So those are the things that we are evaluating. But yeah, we'll look at the timeline in the coming days.
Paul Holzinger: I have one more question for you showed how you rewrite the ticket URLs. does it rewrite commit references because the commits are getting rewritten, So all the SHs are changed.  So sometimes I put a fixes commit something or there's in the commit message itself and so that doesn't update the text when it notice there's a commit sharp.
Jan Kaluza: Yeah, it most likely does not do that. And I'm not sure if it can do it easily.
Jan Kaluza: That's I will have to think about that.
Miloslav Trmac: all three ripples at once…
Miloslav Trmac: because we can have cross reple commit references. but usually if you put a commit ID into Google, it finds something. Maybe that's that hopefully good enough.
Paul Holzinger: Yeah, I'm just wondering because from the tool point of view, it should be able to recognize a SH and then it should be like if it has the original history and…
00:20:00
Paul Holzinger: then it should be able to know which commit…
Miloslav Trmac: Yeah, I think…
Miloslav Trmac: if you convert to single repo,…
Paul Holzinger: which ID
Miloslav Trmac: it should work. If you have three and you can have references between them, you would get order independencies. if C storage refers to a C common commit and C common elsewhere refers to a C storage commit, they would have to be migrated in parallel.
Jan Kaluza: like that that will be probably harder to do because from the implementation point of view the tool allows you to run Python code with a commit message as an input and changed commit message as an output but it doesn't have any logic you just have the one commit message as an input and another as an output there's three of commits anywhere so it would have to be  done by ourselves. I don't think the tool supports it by Changing the issue reference was easy because you just see the fixed string and you replace it with the full path, to GitHub issue. you don't need any extra context out of the commit message.
Jan Kaluza: But for changing the commit hashes it would be different. So not sure if it's worth that's my point. And in case we will add another repository there in the future like podman we really cannot change those.
Jan Kaluza: That's actually another thing like can we add another repo there easily?
Tom Sweeney: Yeah. Yeah.
Jan Kaluza: that's another
Tom Sweeney: Yeah. My other question too for you is you've done this move already to automation to the new repo. Are we going to have to redo it in a month or two whenever we say it's going to be live or how are you going to get the difference's the PRs that have gone into common? Are you tracking those somehow? Good.
Jan Kaluza: So as I said I have script which generates that. So I can remove this repository completely run the script and it will take the fresh commits from the common image in storage and generates this repository.  So that's easy but as I said the question is in case we want to extend it and add for example podman there or build there I would have to think how to do that because I'm not sure if that's possible with the current tool I'm using which would be also an issue and I got this idea during this meeting so obviously I don't know the  Serpent.
Tom Sweeney: diaries.
Miloslav Trmac: Just to highlight a technical note for the tech format I think go imposes a specific one so that it can find the modular release inside multiple multimodule repo but I didn't actually try
Jan Kaluza: Yeah, I mean I was testing that and it worked but if there is anything else needed or…
Jan Kaluza: some other format we might change it like that is not an issue.
Tom Sweeney: And we'll also need to think when we do go live,…
Tom Sweeney: how do we freeze the other ones? do we put up a notification on there? How do we lock those down so people don't go ahead and commit to them? And what do we do with commits that are in progress?
Paul Holzinger: And what do you do with backports…
Paul Holzinger: if you need to fix an older version?
Tom Sweeney: Yeah, that's a good point,…
Tom Sweeney: Okay, sounds like we're wrapping up and we're starting to push on the time a little bit.
Tom Sweeney: Are there any other questions for Don about this?
Jan Kaluza: Actually Paul with the back ports you mean those other branches like version 063 right and…
Jan Kaluza: we should also migrate them.
Paul Holzinger: Yeah, I'm not sure…
Jan Kaluza: Okay. Okay that's
Paul Holzinger: if we have to migrate. I'm just saying we need to think about what you want to do there if you want…
Tom Sweeney: Yeah. Yeah.
Paul Holzinger: because this rule let's say a real branch or whatever is pulling from the old location and…
Paul Holzinger: then do you want really to update all the go references there in all the old branches?  probably not.
00:25:00
Jan Kaluza: Yeah, thanks.
Jan Kaluza: I think it makes sense to make another call where we discuss this implementation things because I need more input from people who actually know how the process looks like currently.
Miloslav Trmac: I agree.
Miloslav Trmac: We probably want to copy the branches, but we don't want to change the process for the stable releases. Worst case we can always export a fix as emails and use g apply or something to apply them in the modified path in the other repo. It's little manual work,…
Tom Sweeney: I think we've discovered a number of things we still need to explore here and…
Miloslav Trmac: but it's one time basically.
Tom Sweeney: we'll go ahead and do so. we've run out of time to discuss those right now. So with that, thank you Yan. And we are move on to Valentin who's going to be talking about image mode and giving us a demo there.
Valentin Rothberg: Thanks Very cool discussion. good seeing How's everybody doing? So yeah, glad to be on the meeting here. Has been a long while for me. As you know, I've been working on image mode for quite a while. so I'm going to talk a little bit about image mode in this presentation.  I also recorded a demo I gave at summit. I'm lazy and I like to recycle everything everything I do. So those are the slides pretty much or I copied them together from a number of lightning talks I gave on summit two weeks ago where image mode got.
Valentin Rothberg: So for those who don't know image mode, you're going to learn something. For those who do, you may still learn something. if you have any questions at the moment, just staring at a camera, not very interactive. I like the human experience. So please don't wait for the end. raise your just interrupt me by talking. I will ignore the chat. so we have a real human experience here. and the slides, as you may tell, since they come from Redhead Summit, they're very very focused on real and…
Tom Sweeney: Let's go.
Valentin Rothberg: image mode. And that's a community meeting. So everything I tell also applies to Fedora Bootsy, not on the product level, but on the technological level. Everything I show here, I even use CentOS not a real bootsy image. So everything's open source. We're redhead, right? So I usually pitch image mode as the marriage between good old sysadmin handcrafting work and the more DevOps workflow. Imagine a gray beard and a young modern dynamic DevOps engineer on the Mac had a baby and…
Tom Sweeney: This is awesome.
Valentin Rothberg: this baby would be tasked to make both parents happy.  That means traditional Linux SIS admin handcrafting with DNF and RPM and anible and everything we know and love and the more container native world of DevOps where you have CI/CD pipelines where you use GitOps where you automated everything you can possibly do because of all the benefits and probably maybe because you're like me
Valentin Rothberg: and lazy and this is exactly what So image mode at the very high level is a new now called mode you can see it as a flavor or another variant of rail which is binary identical to what we now call mode. This package mode is you update your systems via DNF. It's a mutable system.  Image mode is immutable. All contents are shipped in the form of a container. So this is what this slide tries to illustrate here. So it's placed right in between the gray beard admin and the young dynamic DevOps engineer or there are also older dynamic DevOps engineers, right? sure pretty there are a couple on the call.
Valentin Rothberg: So this is something to keep in mind. Quite often at least initially when people look into bootable containers and image mode the question pops up it doesn't really make sense if I run them with potman run these images are way big. They're way too big because the entire operating system is part of the image.  the kernel, the bootloader, the drivers, everything you need to, run an operating system, entire machine, but you don't need for an application container where you're mostly interested in only small parts of the user space. So, scratch the idea mentally at least for production use cases to run image mode or bootsy containers with Potman or Docker container cryo. They are not used and meant to be run as application containers.
00:30:00
Valentin Rothberg: So on the next slide I'm going to walk you through the workflow. How does it look like the new world that we can live in to pretty much operate or build and manage and deploy our operating systems similar to application containers. Now actually the pipeline is the same and that's the beauty of that.  Similar to application containers, everything starts with a container file or a docker file. This is really the center of gravity. This is where we define the contents of what we want to run. For application containers, obviously the contents of the container. Think of it as a Fedora base image. You install HTTVD on top and then you run the web server somewhere. You attach it to a database, that's what we've been doing for quite a while. We build it.
Valentin Rothberg: You can build it with any tool and I hope it's Potman and Builder, but for sure everything is standardized. You can build kit, docker, kico, whatever your heart desires or your boss requires. At some point once these images are built, we push it to a container registry. So then we come to a chicken neck problem.  So the contents of the operating system of image mode forell or fedora bootsy senos bootsy and all the derivatives is a container image and we want to boot it. there is ongoing work for Anaconda the installer in the Fedora universe and rail universe to support just pulling a container image and install that. So that will be pretty neat.
Valentin Rothberg: But for disconnected in installations, we still need some disk image could be an Anaconda ISO, could be raw images for Azure, could be AMIs for Amazon, AWS, etc. So there's a tool called Bootsy image builder was which does that exactly for us.  If you, have a disconnected edge envir environment or deployment, you just copy the disk image to your USB stick. You plug it into your server or into your nodes or into your factory pipeline. You update install. So this is how the initial deployment would look like.
Valentin Rothberg: So now for the two operations that means the counterpart to DNF update which would be Bootsie is like the heart and soul of image mode and bootable containers which internally uses Scopio to pull images down. So it stands for bootable container.  So what Bootsy would do is after the SIS admin or the pipeline built the container file push the image to the registry it will just pull the image down from the registry explode the contents on the system and on reboot we will boot into the new state.
Valentin Rothberg: So pretty much when you look at the red arrows that's the dotted one on the bottom it's exactly how we manage application containers already for over a decade and it's the beauty of it. So with image mode we can reuse pretty much all the innovations auto and automation of the past decade and actually now a bit bit more and apply all of that to the operating system.  As I joked before, I'm lazy. And now I'm that lazy that I build my at the moment running on a Mac, but my Fedora systems, I manage them on GitHub updates and if there's a new base image for Fedora Bootsy, renovate bot opens pull request. I still want to at least have the illusion to be in the driver's seat and be in charge.
Valentin Rothberg: So I still want to click on the freaking merge button and after that it will get built and then it can get published and then my nodes will get updated automatically. That's actually exactly the same workflow for Potman O updates. So it's pretty cool stuff. So one thing to say on this slide package mode won't go away.  So neither the Fedora or Sandos community nor Redhead is forcing image mode and bootable container down our throats. This is an additional offering enabling new use cases and if you want to try it out or if you have use cases for it absolutely welcome to try it out but you're not forced to. Same on Fedora package mode won't go away.
00:35:00
Valentin Rothberg: So here you can see a little bit of comparison of the different workflows and tools that we've been using historically with package mode and how the tools and workflows we can use going forward on image mode when it comes to building historically we've been using image builder to do that. if we wanted to customize our disk images some people prefer just to fetch the vanilla golden val image and then use anible on top to do everything.
Valentin Rothberg: for image mode you can use popman builder or whatever you want to want to use updates for package mode DNF with image mode its images and so on and so forth you can go through all the details on the Red Hat FA FAQ. Let's go to something more technical because I think the audience on this call is more technical.  The cool part or what I love about image mode and bootsy or the distribution of bootsy in the form of adorab boots bootsy and so on is that the operating system is immutable.
Valentin Rothberg: So you have transactional updates means if something goes wrong during the update update won't be applied and since we have a seamless AB update model if something goes wrong I can just roll back and not bother anymore and that was something at the beginning of May on my Fedora machine.  I wanted to be cool and use Fedora 42 before it was released and I really had to get some work done, but I did it, while just getting a new coffee. When I came back, rebooted and then for one reason that I didn't care to debug, my wireless cart wasn't detected. So, I couldn't connect to the network anymore. And I felt so stupid. I was like, " Valentine, you stupid guy. What did you do?"
Valentin Rothberg: I felt like crap because I really didn't want to reinstall my system and I really didn't want to debug anything because I had a lot of work in my back to get done and then I felt even more stupid when I realized h I could just run bootsy roll back and not bother and that's exactly what I did.  So, kind of a funny anecdote that even who helped deliver the baby still need to get used to the new workflow because I was used to the old package mode workflow and if it was a kernel issue, I could still go back to another kernel without connecting to the web or bringing my notebook down and attaching to the Ethernet. but I very much enjoy the experience living in this new world.
Valentin Rothberg: For sure, you can also roll forward. And one cool thing about the anecdote on upgrading to Fedora 42 is that upgrades are really simple now because the only thing I had to do was open a pull request or if you're on GitLab, a merge request and change the tech from 41 to 42 and…
Valentin Rothberg: off we go. So upgrading to a new version of Fedora or RE is now super simple. Also testing is much easier because you can just do it directly. I heard some boop mark.
Mark Russell: Yeah, kind of a plant question,…
Mark Russell: but does this require two separate system partitions?
Valentin Rothberg: No, that's a very beautiful thing. Thanks for this question So we Mark and I didn't study that but we worked on this for sure.
Valentin Rothberg: So the cool thing about and this is probably a very nerdy question and so I love it is that no bootsy doesn't require a separate partition. Everything is O3 based. We've been working and implementing and deploying and managing OS3based systems for over a decade. So nothing is really new here. The composition is new and that's what I like.  We just composed a set of technologies in a way that wasn't done before and we made using these technologies so much more simpler than before. So no two partitions such as for instance I think Chrome OS has two partitions.
Valentin Rothberg: So also the concept isn't new just for our desktop systems at least for Linux nerds for most of us it may feel new or alien at the beginning but image based systems have been all around us all the time I never run DNF update on my smart TV image based I never run an update on my iPhone image based and I never had to reboot  my operating or my iPhone if I upgrade or update my Firefox browser. Why? Because it's containerized on top. So, a lot of these things have been around for quite a while. Thanks for the question mark. So, now just got to go back to the other. Yeah, there we go. So, talking about the immutability of image mode.
00:40:00
Valentin Rothberg: So while everything for sure is writable at buildtime because it's a native workflow here just exemplary container file firmware bootsy install your packages you copy your content over you run your config scripts everything for sure is writable within the rules and limitations of a container build environment but at runtime and that makes it mostly immutable everything the entire file system is mounted  only except for Etsy and Var and even if you're root you can't really screw with it which also improves security. Why is Etsy mutable? Because we still want to support the use case that sysman can just apply local changes or configuration changes without having to reboot the system or even build their own image.
Valentin Rothberg: I as a user also want that in the context of Potman for instance I want to change the registries conf because I want to add new mirrors or change the mirrors things like that. So when an update is acquired in case of a conflict bootsy tries to apply a three-way merge if the conflict can't be resolved classic use case then local changes always win. Why is var writable?  because it really We need some path to have mutable and persistent state and data where for instance logs can be written and this really is var. If you get interested by it just flash the QR code and then it will bring you directly to upstream bootsy docs where you can find all the nerdy stuff.
Valentin Rothberg: So, I was pitching before already how I don't have to reboot my iPhone if I update Firefox despite iOS being an immutable system. And that is because those applications are containerized on top. And I'm a big proponent of that. I advertise for it a lot. In fact, I blog about this a lot. Then in many cases, it makes sense to containerize our workloads on top of image mode.  It's pretty much the same what we're doing in open shift because containers run on top of our cost or open shift which is immunable system. Silver blue Chrome OS does the same. Why? Because then our applications and the operating system have an independent life cycle. We have a clear separation of concerns.
Valentin Rothberg: We decouple applications from the host. If we containerize, we also have improved security because we have around each and all the container environments which add a number of additional security layers around the applications and as we all know security is to a high degree about lots of layers. Here the onion grows bigger and we also have improved uptime. Why?  because the life cycles are decoupled if I update my Firefox. I don't have to reboot my entire host because that would be unfortunate cause downtime. And the great thing on top is that we can use the very same pipeline to build our host system and the application system. So that's a pretty cool stuff and distributions like Silverblue use that or make a lot of use of that.
Valentin Rothberg: there's flatp pack among others also for this use case to support that and then there are also our friends over in toolbox where when you run on silver blue or an immutable system that you have somehow the illusion of it being writable but you're actually running inside of a container.  So cool thing if you want to have a more static software appliance kind of containerization of your applications then you can combine image mode and quadlets.
Valentin Rothberg: So here there is a blog on that explaining different it got released I think or published last Thursday but I wrote it back in March just took a long time in the publishing pipeline for it to pop out where I elaborate a little bit on the different ways how we can containerized workloads on bootable containers on top of image mode of Fedora there's also upstream docs to Fedora. So the idea is here that you can embed the quadlets directly in the image. You have a clear separation of concerns and all the benefits we had had before. And what I mostly like about or one things I really love about image mode that I personally perceive it less as a technical change and more as a cultural change.
00:45:00
Valentin Rothberg: Because when we look at the spectrum of different operations and how we manage services, there was a cultural split between SIS admins and other operations on top such as DevOps. And now a SIS admin can shift further to DevOps or DevOps engineer can also shift closer to operations and workloads and work items that historically sizes have been doing.  So there's something I really really like about that I heard. Thanks, Tom. So there shouldn't be too much anymore here. a more or less quick demo. Six minutes. O. So you can see that also upstream on the Fedora getting started guide here. Just running.
Valentin Rothberg: What I'm doing here is I'm running you through the process of pretty much a day two operation. What we have here, it's a CentOS stream 10based system. I copy in a binary which is called Unsurprisingly, it will print something and stand it out. So then I will push it to the registry.  I will deploy it using a tool called Potman Bootsie which just abstracts a couple of the steps needed to run to convert the OCI image PMAN build into a disk image and then boot a virtual machine and injects the SSH key. So it's mostly meant for playing a little bit around maybe doing some smoke tests but do not use that in production. It's not meant for production use cases.
Valentin Rothberg: so I hop a little bit further here. So now we boot it. We're inside the VM. And as you can see here when you run bootsy status is that it will spit out the booted image where you can see the fully qualified image name of the image along with the digest. It's pretty cool. The digests are really nice. using container images or image based systems is really nice also to figure out there's a given CVE in my image which parts of my fleet are impacted I just run bootsy status I compare the digest and then I know it why because the drift is contained initially it was wanted to advertise image mode as zero drift but we were not allowed to for legal reasons because if we want to we can still shoot ourselves in the
Valentin Rothberg: So now image mode is advertised as containing drift because we can't just DNF update. So the nodes will not drift apart or it's very hard to make them drift apart if done and accelerate delivery. Why? Because we can use and reuse all the pipelines we have already for application containers. So here, hello. Oops. Red Summit 2024. Oopsy. Whoopsie.
Valentin Rothberg: got the date wrong. So what I'm doing now is I just rebuilt the image with an updated binary which prints the right image. Here if I run bootsy update check it can see okay there's a new image an update available. If I now run bootsy update and reboot here we can see I'm rebooting and I run it again. Now it says hello Redheads Summit 2025. Bravo.  So this is exactly how the use case looks like. Again here the QR code brings you to if you want to repeat that on your own system the demo here is scripted. So you can just go to some GitHub repo I prepared for demos like that and play with it. last words where to find information. So you can find information for sure on the Fedora bootsy documentation.
Valentin Rothberg: I can probably click on that here. we took a lot of time and effort and maybe even love to write these docs to make sure offering the new technology bootable containers are approachable. So you can go and have a look here. There's getting started guide.  There are slides I recorded last year with a number of more applications and sales pitches and where to find the base images and how to do everything. also you see a couple of references on how to work with it when you're on the Mac using pot mine.
00:50:00
Valentin Rothberg: You may see some similarities to slide three or four before and here also a recorded demo which does essentially the same than we just looked on the slide before how to work with it. You can find best practices for building here limitations of a container built environment things things like that for instance also how to embed containers.  So the content of or the story I was telling before on using quadlets for instance and how to containerize on top. So nothing I said on the slides or on the audio track is new. Everything is public. We're redhead. The docs first go upstream and then they go go downstream.
Valentin Rothberg: There's also couple of interesting new docs on the management story and for instance flight control and how these things fit in how you can do troubleshooting and for sure related projects and how they're being used and it further links to the bootsy upstream docs which are much more nerdy if you want to check them out highly recommend it.  There's also the Redheaded landing page of Bootsie here. If you want to play with it and get your hands dirty, you can click here on exploring the interactive lab. This will bring you to an interactive experience where you can toy with image mode and boots just in your browser. You don't have to install anything. If you're on Windows, or just want to see how this stuff Highly recommend Easy to get a developer subscription.
Valentin Rothberg: Also, there's a new FAQ which you can go through of the frequently asked questions at least for this is obviously we are on redhead.com so this is tied to rail and…
Valentin Rothberg: as I think Neil also pointed out yes bootsy is a CNCF project so everything happens in the open pretty happy about that if you have any questions now is the Thanks for your patience,…
Tom Sweeney: Yep. Any quick questions for Don?
Tom Sweeney: Because we're pushing the clock at this point. We still have one more quick topic to go through.
Valentin Rothberg: Tom. Thank you very much.
Tom Sweeney: No problem. Valentin if you can send me your slides if I can go ahead and publish those elsewhere and then I will get links into the notes and stuff for people. Appreciate it. It was a great talk. So what?
Valentin Rothberg: I'll send them via email, Tom.
Neil Smith: Yeah, thanks a lot.
Tom Sweeney: Yep. Let's go.
Neil Smith: Sure.
Tom Sweeney: All right. Neil, did you want to go over Podman at Defcon for a
Neil Smith: Just to let everybody know here and hopefully when people watch the video, we are at DevCom with a booth next week DevCom CZ on June 12th to 14th.
Neil Smith: We would love to have you come by and talk with us. we have some swag to give out if people contribute some PRs and etc.  So, come and, we're very interested in meeting our friends from the community. So, that's it.
Tom Sweeney: All right.
Tom Sweeney: Any other questions, comments before we wrap up here? And while you're thinking about that, I will just say that our next meeting is Tuesday, August 5th at 11:00 a.m. And for the automatic community meeting, our next call meeting will be on July 1st, 20 also at 11 a.m. If I said 11 p.m. for the other one, it's 11:00 a.m. for that as well. And any questions, comments before we wrap up? Right.
Tom Sweeney: I am going to thank our presenters today. Thank everybody for attending and we will wrap this one up. So I can find this up recording button button.
Meeting ended after 00:54:54 👋
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.

```
