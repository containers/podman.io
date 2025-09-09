# Podman Community Cabal Agenda
 ## September 2, 2025 11:00 a.m. Eastern (UTC-4)

### Attendees
Tom Sweeney, Gerald Sidman, Matt Heon, Paul Holzinger, Neil Smith, Jan Kaluza, Mohan Boddu, Brent Baude, Ashley Cui, Alex Guidi, Nalin Dahyabhai, Lokesh Mandvekar, Nicola Sella,  Jan Rodak, Miloslav Trmač

### Topics

 1. CNCF updates - Zoom, channel changes ... - Neil Smith
 2. Mono Repo Update - Jan Kaluza
 3. Podman 6.0 updates - Brent Baude

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=Gzm6Rq7dOw4)

Meeting start: 11:04 a.m. EDT (UTC-4)


#### Quick Recap
The Podman community cabal meeting covered updates on the transition to Zoom meetings, upcoming changes to Podman 6.0, including feature deprecations and removals, and the migration of supporting libraries to a new monorepo location. The team discussed upcoming blog posts and future meetings while addressing technical issues with the recording and concluded with follow-up questions about container storage.

#### CNCF updates - Zoom, channel changes, and more! - Neil Smith - ([2:32](https://www.youtube.com/watch?v=Gzm6Rq7dOw4&t=152s) in the video) -

Podman Community Transition Updates: The Podman Community Cabal meeting began with Tom welcoming attendees and explaining the transition to Zoom as part of their move to CNCF. 
Neil provided updates on the community's shift to using Zoom for all meetings and increasing engagement in matrix and Discord channels. Due to John's absence, the Mono repo update was postponed, and Brent presented an overview of the Podman 6.0 updates, noting that the release is intended for spring next year and aims to align with Fedora 44.


#### Podman 6.0 Update - Brent Baude ([4:07](https://www.youtube.com/watch?v=Gzm6Rq7dOw4&t=247s) in the video)
    
Podman 6 Deprecation Plans: Brent discussed the proposal for major changes in Podman 6, including deprecations and removals of non-default features like APT and CNI plugins. He mentioned plans to remove code and command line options related to deprecated features, as well as eliminate support for Cgroups v1 and Bolt DB. Brent also noted that Windows 10 support will be discontinued under WIP in a month, with no further actions planned, but existing issues are likely to be closed.
Podman Architecture and Provider Updates: Brent discussed upcoming changes to Podman, including the removal of support for Intel-based Macs and the introduction of new configuration file handling. He explained that libkrun will become the default provider for Apple Silicon-based Macs, and a new common will be developed to address functional and architectural issues. Brent also mentioned that changes to the machine section of Podman will reduce the emphasis on providers and allow for name-based commands. The team plans to combine two repositories (netavark and aardvark-dns) into one, while maintaining separate binaries. Brent outlined strategies for updating Podman machines, possibly from Quay.io, noting challenges with WSL compatibility.

#### Mono Repo Update - Jan Kaluza ([19:10](https://www.youtube.com/watch?v=Gzm6Rq7dOw4&t=1150s) in the video)

Libraries Migration to Monorepo:The team discussed the migration of three supporting libraries (containers, storage, and common libraries) to a new monorepo location at https://github.com/containers/container-libs/. 
 go.podman.io/common
 go.podman.io/storage
 go.podman.io/image
Paul explained that the libraries have been moved to new import paths using a custom domain. While this change primarily affects packagers and developers, end users only need to be aware that issue reporting should now be directed to the new repository. Jan mentioned ongoing work to port other packages using the old libraries to the new locations, and Tom confirmed that these changes will first appear in Podman 5.7, Skopeo 1.21, and Build 1.41.
 Jan included a blog post on the changes https://blog.podman.io/2025/08/migration-to-the-container-libs-monorepo-is-complete/

There will be tags in the repository, such as storage/1.5.0, so you can retrieve specific versions.

#### Open discussion - ([25:38](https://www.youtube.com/watch?v=Gzm6Rq7dOw4&t=1538s) in the video)
 
Blog Release and Meeting Updates: The team discussed the upcoming blog post release and confirmed it would be shared soon. They reviewed the next community meeting, scheduled for October 7th, and the next board meeting, set for November 4th, and invited topic submissions. Alex inquired about mono-repo tags, and Jan confirmed they would be released with versioning by the end of the week. The meeting experienced technical difficulties with the recording.

#### Next Steps
Neil to continue facilitating the transition to CNCF channels
Brent to publish the Podman 6.0 design document on GitHub within the next 10 days for broader community review
Jan and team to complete the first release of libraries in the mono repo by the end of the week with appropriate tags
Jan to continue porting other packages used by Podman to the new mono repo structure
Mohan to investigate where Zoom AI meeting notes are stored and inform Tom

### Next Cabal Meeting: Tuesday, November 4, 2025, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1.  None discussed

### Next Community Meeting: Tuesday, October 7, 2025, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:
 1. None discussed.

Meeting finished 11:45 a.m.

### Raw Meeting Chat:

```
 10:56:23 From Tom Sweeney (Red Hat, Inc.) To Everyone:
 	Meeting Agenda and notes: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
     
 11:21:34 From Matthew Heon (Red Hat, Inc.) To Everyone:
 	Not yet but it will be going up on our Github... probably this week?
     
 11:21:53 From Matthew Heon (Red Hat, Inc.) To Everyone:
 	We're going to make a general effort to put all major feature designs up there from here on
     
 11:23:07 From Paul Holzinger To Everyone:
 	https://github.com/containers/container-libs
     
 11:25:03 From Gerald Seidman (AuriStor Inc.) To Everyone:
 	Great!
     
 11:27:30 From Jan Kaluza To Everyone:
 	https://blog.podman.io/2025/08/migration-to-the-container-libs-monorepo-is-complete/
     
 11:28:55 From Gerald Seidman (AuriStor Inc.) To Everyone:
 	Offline to Matt and Neil
     
 11:29:26 From Jan Kaluza To Everyone:
 	storage/v1.5.0
     
```

### Raw Zoom Meet Transcript
```
Skip to Main Content
 Accessibility Overview
 Zoom Logo
 Podman Community Cabal- Shared screen with speaker view
 Sep 2, 2025 02:52 PM
 Download (5 files)

 00:07:08/00:42:41

 Speed


 Audio Transcript
 Chat Messages
 Search transcript
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)

 (Pre-meeting Chat Removed)

 Tom Sweeney (Red Hat, Inc.)
 11:17
 Okay, so I'm gonna take more notes than I normally would have when we were over on Google, just to be sure, and then we'll see what comes out of it today. It'd be a good experiment.
 Right, given that, I've got 11.04, we're a little bit later than usual, and I don't see many more people hopping in, so we're going to start up the
 Cabal meeting here, and we have three things today that we're going to be discussing. The first one is going to be CNCF updates, one of which is Zoom right here, as you see.
 And other channel changes that we have, Neil will be talking about that. And then Jan will be… is Jan here?
 Oh, I don't see him.
 We'll be handling an update for Monorepo.
 And then, finally, Brent and or Matt will be talking about Podman 6.0 updates.
 So with that, why don't we hand it over to Neil, let him take away with the CNCF updates, and I'll see if I can go chase down Jan.
 Go ahead, Neil.
 Neil Smith
 Neil Smith
 12:25
 Figuring out the buttons. I'm, yeah, just to update.
 We're moving all our meetings to Zoom, that's self-evident right now. And then we're also making a…
 Try to, more participation in our Matrix and Discord channels, and you'll be seeing that happening over time.
 give us any suggestions you want, or anything different you need, but we're just trying to be more inclusive with the community and move away as we are moving the project to CNCF, or it's already there. We want to use the CNCF channels that we're supposed to be using.
 So, main changes are the Zoom meetings, and then
 we will be pushing more for our Discord and Matrix channels.
 And that's Quick Update.
 Any questions?
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 13:32
 buttons, buttons just started popping up all over on me when I was trying to just take a note here.
 I don't have any questions. Last chance for questions on this?
 Jan is not here, and I've pinged him, but he appears to be offline at the moment, so I'm not sure if he's going to make it for the monorepo update, so why don't we give him a few more minutes, and Brent, or Matt, can you hop in for the Pomeran 6.0 updates at this time?
 Brent Baude
 Brent Baude
 14:02
 Sure.
 You hear me okay?
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 14:05
 Yep.
 Brent Baude
 Brent Baude
 14:09
 Let me make a share here.
 Okay.
 was… Did that come across okay?
 Mohan Boddu
 Mohan Boddu
 14:28
 Can you zoom in a bit?
 Brent Baude
 Brent Baude
 14:33
 Can you speak up? Can you speak up, Mohan?
 Mohan Boddu
 Mohan Boddu
 14:36
 Can you zoom in?
 Brent Baude
 Brent Baude
 14:37
 Sure.
 Same one.
 Mohan Boddu
 Mohan Boddu
 14:42
 One more? Yep, that's good for me.
 Brent Baude
 Brent Baude
 14:47
 I think most of, as I look at the attendees, most are aware of this document and read it.
 But I'll go through it, in the hopes that, some of the new people here have something to say, or the recording generates some comments.
 I've, begun by writing a high-level design document.
 As we look forward to Podman 6, which we intend to deliver in spring of next year.
 The intent would be to deliver in time for Fedora 44.
 And thus far, this document has only been reviewed
 Within the team, and I expect, this week to broaden that review
 For a brief period of time, and then I will put it out as a, something on our… on our GitHub site so that it can be…
 Completely, transparently reviewed, and also have a historical
 Reference, to look back on.
 Really, all this document does is tries to get its arms around some of the major changes that we've been talking about with Podman 6.
 As well as to try to cite
 Big changes, braking changes, new functionality.
 Basically, non-trivial work.
 It's a proposal in nature, and if reviews
 Suggest we need to alter the content, then that's what we'll consider.
 For deprecations, we're largely looking at a handful of them. Slip for NNETNS will be removed.
 It's long since been…
 the default and, replaced with pasta. We will now just go through and take out
 Any code related to it are command line options.
 CNI plugins really falls into the same…
 Into the same bucket of things that have been replaced, and now, are no longer the default, and it's time to…
 call back these things. Cgroups V1,
 We intend to eliminate support for that. In this case, relevant code will be removed.
 As will be any of the regression or system tests.
 BoltDB, which, which was,
 The default since 4.8 is now gonna be fully deprecated. We've begun adding deprecation notices in Podeman 5 series.
 To sort of get the word out on that.
 There'll also be some work around Common and cleanup around test suites.
 And then, two additional, bigger ones was, Windows 10,
 Which will be a love life.
 In a month?
 We will not support.
 We're not gonna do anything,
 At this time, we don't have plans to do anything to go in and make it not work.
 For those that still wish to run that.
 But we would likely close any new issues, close old issues related to Windows 10 only.
 Theoretically, and, really just sort of point back to the fact that we're not supporting it.
 And then, also Intel Base Max.
 I have a description a little lower, but we'll… No longer support those, and…
 Code and etc. will be removed.
 We're talking about that anyways.
 We have a big to-do on configuration files, really straightening out how they're read, driving some normalization and consistency.
 Amongst how they're processed.
 And frankly, looking overall at the…
 I'll say the client server, or the… local, remote, configuration of…
 how Podman would behave and where things should be, as opposed to being in a singular,
 Configuration file with the same name.
 So there'll be quite a bit there. Again, this will get posted out on GitHub, probably within the next 10 days or so.
 We do believe there may be some impacts to Podman Pi-related configuration. We need to…
 Verify that, and… and talk about…
 Whether or not those should even be there.
 One big change in the default will be, libK run.
 Will now become the… default provider for Macs, and again, this would be,
 This would be, Apple Silicon-based Macs only.
 But given… That they're the only supported ones, then it sort of, by de facto, becomes the… The fault.
 Podman Desktop has already done that.
 And… Luke Cabron is their default provider, when you…
 when you use it. So it does make sense that we follow along. Having split
 The, default providers between the two products, is probably not…
 something we want to continue to do, but we decided we only do these changes on major Podman versions.
 To allow for folks to be able to…
 For all folks get the notifications and the applications that they deserve.
 There'll be a new Kanban that we're working on. Our hope is to make it the default, with the ability to use the old one in Podman 6. It'll…
 likely, Oman will still have its same name.
 It will just be a different code base that addresses some, functional issues that… and architectural issues that we've been wanting to solve.
 Okay, there will be changes to PASTA as well to help accommodate some specific network issues as well.
 The machine section of Podman will get, get some changes. I assume most of these will be welcomed by folks. We're going to no longer,
 Really press the importance of the provider.
 As we do today,
 really where that's the biggest problem is on Apple, so it makes sense to use Apple here as an example.
 There are two providers on Apple, LibKron and Apple HV.
 And… in the new…
 in the new look at the way a machine would work, we would still have a default provider, as I mentioned before, it would be WebKrun, then.
 But you would be able to just refer to machines without
 Having to identify the provider in which to look.
 So everything will just be name-based, and that will leak itself into how the commands
 Most of the commands that use names would work.
 List would change ever so slightly, as well as a couple others, and then we would…
 And we would likely do something like dash dash provider with the init, machine init command to allow us
 To make a machine that's in a different provider, as opposed to the default one.
 One little circumstance to that is we do note that in the case of
 Macs, where they actually share a similar disk image.
 We will… we will still pull one for each, provider cache.
 And that's just a safety protection that someday, perhaps… Those images become different.
 And in which case, they will still need to have their own machine image cache.
 As far as the Intel support goes, the information that we have, really suggests that there's a pretty big
 drop-off of Intel Mac users.
 Using the Podman desktop telemetry, we're able to see it drop pretty steadily this year, which… which already was quite small.
 And while that's not exactly Podman users, at least, that focus on this team, I think it would largely mirror
 What we would see as well.
 So, we also have some really practical problems, like we can't test it in CI, we can't,
 We can't do GPUs, we don't have machines that we can debug with.
 really leaves us with very little options, in order to have a good, supportable product. So, all this together, I feel fairly justified in saying that we'll drop, Intel
 Mac support in Podman 6.
 We've got…
 a series or a slew of things we're gonna do in Nedavark, some of which are architectural in nature and require changes to Podman and NetAvark.
 Where we're gonna sort of… shift the creation of networks from Podman to NetAvark, Sort of single sourcing that…
 that function, if you will, IP cable support would be removed.
 And we will also, more than likely combine the two
 repositories into one. At this time, the plan would be to still have two binaries.
 But that is also up for debate. It's probably not terribly meaningful other than to…
 Our distribution friends that… Have to figure out how to package these things, and…
 Should we make any big changes there, we'll be sure to get the word out.
 And then also, an area in which we desperately need to…
 Deliver some function for users is…
 how… is really talking about how to update Podman machines.
 With all the providers, except WSL, the path for this seems fairly clear to me.
 We're gonna build on Pond Man Machine OS Supply.
 But make it a little bit more user-friendly, and a little bit more self-notifying, where…
 We can use OCI images off of Quay in this case.
 To be pulled down and,
 Made as the new bootable instance.
 This should be pretty straightforward. It's essentially the same exact…
 Mechanism we use today, except we'll build some commands around this to make it more usable for users.
 WSL is really the problem one here, because, more or less.
 Incompatible with…
 OST-based distributions, in the sense that it doesn't boot, and that's really a pivotal point about, Fedora Core S.
 So… we today have a, a derived fedora
 custom OS that we run in there.
 But with DNF as a whole, we do not have a good update strategy other than run DNF update.
 And that makes many of us nervous, because…
 It's… it can be unpredictable in the sense of what versions of what you get pulled down from mirrors.
 That are available at that particular time, and, whether or not those combinations have really been tested is not all that likely.
 So I just sort of… a couple more things about machine updates and how… how we want them to interact.
 of… Pretty straightforward stuff, and then we do have, several issues.
 in our repository that we've flagged as needing to get done for 6.0, or at least needing to reconsider them, we certainly will do that. And then, as Lewis's comment points out there, we have similar inside of our own codebase where, to-dos were put in.
 to make small changes for Podbrand 6, whether it be a slight CLI change, or…
 Or things along those lines. We'll need to clean those up as well. This is our opportunity to do so.
 I believe that pretty much… Covers…
 Podman6, I'd be happy to answer any questions the best I can, at least at, this point.
 Okay, Tom, I think that's back to you, sir.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 28:45
 Well, good timing spectrum just happened to me, and I just lost everything for the past minute and a half, so…
 Any questions, comments?
 Brent Baude
 Brent Baude
 28:53
 We did not have any.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 28:55
 Okay.
 And I do not see Jan Kaluza here, either, who's going to talk to us about the monorepo. Is anybody here willing to…
 Do a 30-second update.
 Paul Holzinger
 Paul Holzinger
 29:11
 I, I can give a short update.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 29:15
 Thanks, Paul. Go for it.
 Paul Holzinger
 Paul Holzinger
 29:17
 So, for those who don't know yet, we have 3 supporting libraries for a while that we use in our tools builder apartment, and…
 Scopio, and those were the containers storage library, the containers image library, and Containers Common Library that,
 traditional Go modules.
 Yeah, can be imported as GoModules via the GitHub location there.
 And we decided to move these repositories to a new location, since they are very interdependent.
 And we wanted to have them in a single Git repository, so they now live at
 the container slash containerminoslips repository. I can share a link.
 And we also changed the import paths.
 For them to use, a custom domain, and no longer the GitHub.
 URL?
 And as such, we now have,
 Or you… if you use these libraries, you need to migrate to the new locations.
 And the new locations are… go.potman.io slash common, go.potman.io slash image, go.potman.io slash storage, basically, and…
 The switch should be fairly straightforward.
 We migrated.
 To our repositories.
 This week, and last week.
 We didn't run into anything yet, and we plan on cutting.
 We don't have any text yet on the new repo we plan on.
 Cutting a tick.
 Tomorrow.
 And then you can import the normal text, and we will continue them as
 different modules, basically. They just live in the same repository, and…
 The version number should be, like.
 N plus 1 from the old location, basically. There aren't any code changes, like, any special code changes whatsoever.
 Of course, really.
 We keep developing new stuff there.
 Yeah, that's, that's about it, I guess, if anyone has questions.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 31:50
 Not a question so much, but clarification. This is not going to be part of Podman 5.6, it's going to be Podman 5.7 and above, correct?
 Paul Holzinger
 Paul Holzinger
 31:59
 Yes, so this will naturally get into the next version, so… which is 0.57, and I'm not sure on the Builder and Scorpio version numbers, but yeah.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 32:16
 Yeah, that should be, oops.
 For Scopio, that should be 1.21, and then for Builder, it should be 1.42 will be the versions that it will first show up in.
 Paul Holzinger
 Paul Holzinger
 32:28
 Yeah, and to be clear, it's… unless you're a developer, or maybe a packager, this change doesn't mean anything to you, really, so…
 If you're an end user, you don't.
 need to care.
 About that.
 And maybe the only thing that changed, if you're filing issues. So, it's now on the new repository.
 So that, that would be something that…
 impacts a user, of course, but…
 traditionally use those file days just on Portman, build on Scorpio, which is fine, and remove them if needed.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 33:11
 I think Jan has just joined us.
 Or tried to join. Yeah.
 Jan Kaluza
 Jan Kaluza
 33:17
 here.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 33:19
 Okay.
 Do you want to add any… I don't know how much you heard of Paul's, but did you have anything to add?
 Jan Kaluza
 Jan Kaluza
 33:26
 I've just joined, so.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 33:28
 Okay, so it talked about the three libraries all coming in together as one, gave out the new locations.
 For the vending part of it, and then we talked about the versions that it'll show up in first, Podman57, Scopia 121, and Builder 141. And that's probably not going to mean much to most people who are just running the software. It mostly affects packagers and developers, and then filing issues. Anything else?
 Jan Kaluza
 Jan Kaluza
 33:53
 No, I don't think so. Like, I still continue porting other libraries, other packages which are used by Podman, and are using the libraries from the old directory, from the old repositories to the new ones, that's mainly the CRC,
 project, like github.com slash crc, dash org.
 there are some projects which we use, and they are still using the old libraries, but other than that, Paul and others were fixing the CI jobs in the monorepo, and it's getting into the right
 Direction, or, like, things are working there.
 There's also the blog post, which contains more information, so I can share it here, so people can see it.
 Indeed, in the…
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 34:39
 Did that go out already, Jan?
 a post?
 Jan Kaluza
 Jan Kaluza
 34:44
 I will share it. It's written, I will just share it here.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 35:02
 Just do the notes. Yeah, it doesn't go ahead and do that.
 Great.
 Any further questions or comments here?
 Not hearing anything. So, Paul, thank you very much for popping in there and for wrapping up on that. And I will open it up for further discussion or topics or questions that anybody has.
 And while you're thinking about that, I'll just go through the next meeting reminders.
 Our next community meeting will be on Tuesday, October 7th. We have lots of room there still for any topics, so please go ahead and add some to the agendas.
 and or contact me about those. And then our next cabal meeting will be on Tuesday, November 4th.
 Hard to believe we're saying… talking about November already, and it's not too, too far away.
 And again, any topics for that would be gratefully accepted.
 So… Any further discussion? Comments?
 If not, I will stop the recording. Oh, go ahead.
 Alex Guidi
 Alex Guidi
 36:19
 I have one question about the monorepo.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 36:23
 Sure.
 Alex Guidi
 Alex Guidi
 36:24
 Are we… are we going to release some kind of tags?
 are only the ones that are related to the commitsas.
 Jan Kaluza
 Jan Kaluza
 36:34
 There will be tags, definitely, and they will have that,
 form, or the structure, like, storage-v150, for example, like that.
 We are just, going to do the first release this week of all those, projects, so, like, stay tuned for that. It should happen by the end of the week, and there should be some tax, right?
 Alex Guidi
 Alex Guidi
 37:03
 Okay, fine, thank you.
 Tom Sweeney (Red Hat, Inc.)
 Tom Sweeney (Red Hat, Inc.)
 37:14
 Any other questions or comments?
 I guess I'll hang up on the recording here.
 Alright, I'm gonna stop the recording.
 Or at least attempt to.
 Well, I'm apparently a Zoom failure, I cannot stop the recording.
 So, with that, I think, unless there are any other comments or questions, we'll wrap up the meeting and thank everybody for coming today, especially the folks who are presenting, and thanks all.
 Gerald Seidman (AuriStor Inc.)
 Gerald Seidman (AuriStor Inc.)

 (Post Meeting Chat removed)
```
