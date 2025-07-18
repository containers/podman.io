# Podman Community Cabal Notes 
## July 1, 2025 11:00 a.m. Eastern (UTC-4)

### Meeting notes from Gemini

### Summary
  * Paul Holzinger, Brent Baude, and Miloslav Trmač discussed enforcing stricter commit message styles, with Paul Holzinger confirming it would be added to the contribution guide. Lokesh Mandvekar updated on post-quantum crypto compliance for tools, and Jan Rodak (Honza) presented an idea to speed up Podman on Mac OS and Windows. Neil Smith, Miloslav Trmač, Laura Santamaria, and Paul Holzinger discussed handling AI-generated code and PRs, emphasizing DCO sign-off and the challenges of distinguishing AI-generated code. Mohan Boddu, Paul Holzinger, and Miloslav Trmač discussed handling problematic contributions, while Laura Santamaria introduced herself as the new Community Architect. Brent Baude, Paul Holzinger, and Neil Smith discussed establishing governance for non-CNCF repositories, and Lokesh Mandvekar, Paul Holzinger, and Brent Baude brought up the need for a security policy review.

### Details
  * Commit Message Style Enforcement Paul Holzinger raised the discussion about enforcing stricter styles for commit messages, specifically suggesting a 72-character limit per line for readability in terminals (00:00:00). Brent Baude expressed support for a proposal to encourage uniformity, noting that it could improve consistency across platforms (00:04:35). Miloslav Trmač mentioned that if a bot enforces the style, it would likely be adopted, though they personally do not see the full value of the restriction (00:07:19).

  * Commit Message Style Implementation Neil Smith inquired if the proposed change would be added to the contribution guide, to which Paul Holzinger confirmed it would. Paul Holzinger also suggested that elements that can be checked should be checked, similar to a DCO check, and emphasized the importance of properly including fix lines with bug links (00:05:59).

  * Post-Quantum Cryptography Update Lokesh Mandvekar provided an update on ensuring post-quantum crypto compliance for tools by adding support for SHA 512 digests and removing the hard dependency on SHA 256. This involves making digest support configurable, including both SHA 256 and SHA 512, with changes currently in personal forks and planned for upstreaming to core libraries, Podman, and Scopia (00:11:55).

  * Podman Performance on Mac OS and Windows Jan Rodak (Honza) presented an idea to speed up Podman on Mac OS and Windows by optimizing data transfer for commands like `podman load` and `podman build` (00:14:44). Their experiments showed significant speed improvements (e.g., `podman load` from 52 to 32 seconds) by utilizing SSH into the Podman machine and directly accessing mounted home directories instead of transferring data over the network (00:18:00).

  * AI-Generated Code and PRs Neil Smith initiated a discussion on handling AI-generated code and pull requests in container tools repositories, noting that the CNCF leaves it up to individual projects to decide how to manage this (00:25:38). Miloslav Trmač and Laura Santamaria emphasized that the Developer Certificate of Origin (DCO) sign-off is crucial, placing responsibility on the contributor for the code they submit, regardless of whether it was human-written or AI-generated (00:27:25) (00:31:57).

  * Disclosure of AI Assistance Paul Holzinger suggested that contributors should disclose if they used AI to help with code submission, primarily for the reviewer's awareness during the review process (00:29:13) (00:34:34). However, Neil Smith and Laura Santamaria acknowledged that it will become increasingly difficult to differentiate AI-generated code from human-written code, suggesting that the DCO should suffice as the primary means of accountability (00:30:48) (00:37:08).

  * Handling Problematic Contributions Mohan Boddu raised a concern about how to handle AI-generated code when the contributor is unresponsive (00:39:27). Paul Holzinger discussed that if a PR is desired, the project can take ownership, but repeated submissions of low-quality PRs pose a greater risk to productivity (00:41:53). Miloslav Trmač added that while teaching new contributors is possible, malicious spamming or bad-faith submissions should be closed to save time (00:43:07).

  * Community Architect Introduction Laura Santamaria introduced themself as a new Community Architect at Red Hat, assigned to all container tools projects, with a focus on upstream community growth and thrive. They offered their expertise in open-source community, governance structures, and CNCF incubation/graduation processes. Brent Baude encouraged them to review the Podman governance document and provide feedback or pull requests to improve it, as it serves as a model for other related projects (00:45:35) (00:47:16).
  * Governance for Non-CNCF Repositories Brent Baude opened a discussion on establishing governance for container tools repositories not yet donated to CNCF (00:48:08). Paul Holzinger noted that the current Podman governance is too complex for minor side projects, suggesting a per-repo decision or more general guidelines. Neil Smith proposed exploring a "one-size-fits-all" approach for smaller repositories, while acknowledging that key maintainers of each repo must agree to any new governance (00:49:18).

  * Security Policy Review Lokesh Mandvekar brought up that the `security.md` file in the Ramalan repository, and many other projects, points to a general security list for reporting vulnerabilities, which may not be appropriate for smaller projects. Paul Holzinger strongly agreed, stating that the container tools team is unqualified to triage security for other projects. Brent Baude acknowledged the issue and added it to the priority list for scheduling work (00:52:54).

### Suggested next steps
  * Lokesh Mandvekar will upstream the changes for SHA 512 digest support in core libraries, Podman, and Skopeo this quarter.
  * Laura Santamaria will review the Podman governance document and create issues or pull requests for potential improvements.
  * Brent Baude will prioritize revisiting and scheduling work on the security policy for individual projects.
  * Paul Holzinger will create a proposal for limiting commit message line length, potentially to 72 characters, and adding it to the contribution guide.
  * Brent Baude will talk to MattLaura Santamaria will review the Podman governance document and create issues or pull requests for potential improvements.
  * Brent Baude will prioritize revisiting and scheduling work on the security policy for individual projects.
  * Paul Holzinger will create a proposal for limiting commit message line length, potentially to 72 characters, and adding it to the contribution guide.
  * Brent Baude will talk to Matt about enforcing DCO checks via GitHub settings.

## Raw Google Meet Transcription
```
Neil Smith: Okay, I'll put the agenda up. Okay. And thanks for everybody joining today from uh the community as well as maintainers that are here. Paul, do you want to maybe we start with you?
Paul Holzinger: Sure.
Neil Smith: Okay. So, uh, we have a few things on the agenda today, but, um, let's start with, uh, Paul, uh, commit message style.
Paul Holzinger: Yeah. So I just wanted to bring this up as a sort of discussion if we want to enforce some stricter styles for commit messages. So right now we have uh we have not a lot restrictions like you need to have the DCO in there and you need to have like the title. I think there's some limit limit there but other than that you can pretty much do whatever you want and we don't really care that much as long as the content is reasonable. So I was mainly wondering one thing. Uh the first thing is generally commit messages are 72 the characters per line or should be so they are somewhat reasonable to read in the terminal and that's some people do that or many people do that kind of thing.
 
 
00:02:56
 
Paul Holzinger: Uh some don't. So it's uh if you scroll or I tend to scroll through the git locks quite extensively. So I notice sometimes if some lines go until wherever. Uh so I'm just wondering if other people care about these kinds of things or not.
Brent Baude: So, what are you what are you fishing for, Paul, in terms of a change? Are you are you looking for enforcement of a certain style or that uh reviewers be more enforcing?
Paul Holzinger: Uh well how I don't care but let's let's start with a proposal of limiting like to to 72 chars maybe or I mean that's really the problem. Uh I mean there are good reasons not to follow it like if you paste a long link or you paste some error output or some terminal stuff. uh you know but like text wise I think that's the most readable most consistent stuff but anyway like it's like it's like a personal thing I mostly care if if want to know if other people care and then we can sort of maybe agree on a common style or not if it's important to us but if nobody else cares then I'm fine not caring either
 
 
00:04:35
 
Brent Baude: We have sort of a small group here today, but uh I would say it's worth trying to come up with something that is a good proposal and um seeing if we can get it to stick. If we can get even the primary maintainers to follow the rules then or follow the preference then it should clean that up any which ways. Yeah.
Paul Holzinger: Uh yeah, that's for sure. We can start there and then think about enforcing it for more people or not. Yeah.
Brent Baude: I see problems with this when I use get on other platforms like Windows and Mac. It gets kind of goofy.
Neil Smith: like it puts too much sprint.
Brent Baude: Well, I've seen stuff where it doesn't wrap
Neil Smith: Oh, okay.
Brent Baude: and just does it on one or one massive line or the other way around. Uh, like Paul says though, if you put a if you put a link in there that's long that you you kind of get into problems as well.
Neil Smith: All right. So would this be a change to the in the um contribution guide?
 
 
00:05:59
 
Paul Holzinger: Yes.
Neil Smith: Okay.
Paul Holzinger: I
Brent Baude: It
Paul Holzinger: mean
Brent Baude: probably go
Paul Holzinger: if
Brent Baude: ahead.
Paul Holzinger: we agree on a style like I mean I'm just wondering if people have preferences or not regarding that then we can
Brent Baude: Would
Paul Holzinger: wonder what what we would like on don't like
Brent Baude: you also then propose that it be checked sort of like a DCO check?
Paul Holzinger: uh I mean things that can be checked should be checked I guess. uh there might be needs for exceptions and the like but
Brent Baude: Sure.
Paul Holzinger: uh I mean the the biggest other biggest thing we try to enforce this right now sort of as well like is the like properly including like the fixes lines with the buck links and so on that that's I mean that's the most important part to me I I already enforce it if I review stuff
Brent Baude: responsible.
Paul Holzinger: but it's um you know I I wouldn't see how you check for stuff like that. For example,
Miloslav Trmač: For me, I tend to review a lot of detail, but commit messages are something where I might check them in 30% of the cases just because it's an extra step that is easy to forget.
 
 
00:07:19
 
Miloslav Trmač: So, I don't know how much I care. If a bot enforces it, sure it will get done as far whether it should be done. I mean if you ask me this should be HTML anyway but we are not getting there. So I don't really have an opinion. I think restricting us to the width of a punch card really is not longer term the right direction but also we are not moving in any direction so I don't really
Paul Holzinger: I I mean the the
Miloslav Trmač: I
Paul Holzinger: it's
Miloslav Trmač: think
Paul Holzinger: always
Miloslav Trmač: I guess
Paul Holzinger: I
Miloslav Trmač: so.
Paul Holzinger: start caring if you know if you do like get play more whatever and then you need to figure out what's going on and that's I think that's the point where you really care what's in the commit message but that's mostly about the content and not the style then uh so Yeah.
Miloslav Trmač: Yeah. Is it that we have some tooling that doesn't do wpping and hides the messages or are people uh inserting 200 column SSI charts in there that are broken?
 
 
00:08:39
 
Paul Holzinger: Well, some people write their commit messages in a in a text editor that doesn't rep at all and then you have like one paragraph on one terminal line which um is not as readable as if you stick to some child limit.
Brent Baude: I I would say a proposal is still worth the the time, Paul. Like kind of what you had in mind.
Paul Holzinger: Yeah, I mean right now only the the the child limit I guess. Uh but yeah.
Miloslav Trmač: I guess where I am is that I don't see the value, but if you want to automate it, I'm fine with
Brent Baude: Okay, cash.
Lokesh Mandvekar: Yeah. Uh I think the the Linux kernel they enforce a tro limit in their commit messages. So maybe you could just check how they do it, but they also don't do it on GitHub. So there's that.
Brent Baude: Right. Okay. Any anyone else? Okay.
Paul Holzinger: I mean, as I said, like if nobody really cares, I I'm fine not caring, too. So, that's a valid solution for me as well.
 
 
00:10:19
 
Paul Holzinger: like
Miloslav Trmač: Maybe one thing to consider is that if people uh add new lines at paragraphs, everyone can set their own window to whatever they like. If uh there is a hard rep at 7 to2 lines, it matches a specific window size. But really as I said if we follow that thought further we end up with HTML and we don't want Anyway, bike I'm bike sharing.
Brent Baude: Okay, let's move on. Paul, I would say go. Let's let's try let's see what it does because I think it anything that kind of gives us a little bit more uniformity will be good uh particularly on how and where things are going. Okay. Uh is I think I did hear from Lesh. Would you like to review anything around the quantum crypto update?
Lokesh Mandvekar: Um, sure. Unless you want to go first. Either way.
Brent Baude: Pardon me.
Lokesh Mandvekar: Uh, unless you want to go first since your topic is first.
Brent Baude: No, no. I I think mine is probably of the least importance of the of this bunch.
 
 
00:11:55
 
Brent Baude: So, let's let's get through
Lokesh Mandvekar: Okay.
Brent Baude: the good stuff and maybe provide a slightly wider aperture for folks in terms of describing what's going on here. I I think the core team gets it, but for the recording
Lokesh Mandvekar: Yeah.
Brent Baude: and otherwise
Lokesh Mandvekar: Yeah.
Neil Smith: Lesh,
Lokesh Mandvekar: Yeah.
Neil Smith: are
Lokesh Mandvekar: Um,
Neil Smith: you are you sharing anything? Do you want me to stop sharing?
Lokesh Mandvekar: no, I don't have any slides. Um, yeah, I just added the links in the hack and itself so people could just visit those links. I guess the hack will be shared. All right. Anyway, um, uh, yeah. So one of the things we need to do to ensure postquantum crypto compliance for our tools is to add support for SHA 512 digest. Now currently we have a hard dependency on SHA 256. So we also need to ensure we don't break existing users. Now with that in mind, I recently worked on investigation and proof of concept uh on checking if podman build and scopio could function with switching to shi12 image digest and also on removing the hard dependency on shot to 56 and adding support for configurable digest mainly the existing shot to 56 as well as shot 512. Now this is in the form of a same default in storage.com that the user can override via CLI.
 
 
00:13:24
 
Lokesh Mandvekar: Uh as of now these changes are currently only on
Brent Baude: Thank you.
Lokesh Mandvekar: my personal forks. Nothing has been upstreamed yet. So for this quarter I'll be working on on upstreaming all these changes to our our core libraries as well as PubMo and Scopia. Now, for testing purposes, I've been using a local deployment of Brandon Mitchell's personal registry implementation that's been updated to support Shop 512 digest. Um, link to the registry GitHub is in hacken D. And last time I checked, there was no support for SHA 512 digest on Qui and if I remember correctly on Docker library as well. So a local deployment of the earlier mentioned registry was my best option. And uh that's the update from my side for digest. U Melissa do you want to share anything?
Miloslav Trmač: No, I think that's I haven't done anything on digest at all. I'm looking at the at the asymmetric crypto part and yeah, that will take a week or so to to finish, I
Brent Baude: Okay. Any questions from the group, follow-ups, questions?
 
 
00:14:44
 
Brent Baude: That's groupwide. Anyone here? Okay. Thank you. Lesh Panza, you're up next.
Jan Rodak (Honza): Yeah, sure. I have prepared presentation. So, I will try. Yeah, I will need to start it. You probably present now. Is it working? Can you see see the slides?
Brent Baude: Yep.
Neil Smith: Yes.
Jan Rodak (Honza): Great. So I prepared presentation about idea how to speed up podman on Mac OS and Windows. Yeah. So for a little bit background podman um to run containers on Mac OS on Windows we use podman machine which is virtual machine that manage all where all containers lives. Yeah. And to interact with it we use Pman uh remote which communicate with uh machine and so on. And for some of commands we need to transfer information to that machine to perform build or load. And also in future we will probably need to transfer artifacts to that machine to add them to artifact and also to retrieve data from uh for example image in tar uh in tarable soman save.
 
 
00:16:20
 
Jan Rodak (Honza): So for these commands um we what we doing we are transferring data through the network and I try try to use a little bit of cheating for machine your home directory is already mounted in a machine. So you can uh sh that machine and run commands from there with correct paths which will use your uh home directory. So for I will present only pman load which will demonstrate the idea and then pman build but pman build have a little bit some catches because which I will explain later. So forman load uh it I try to load a tar file with um tensorflow image which is about 7 GB and on well on graph with green line it is uh networking it is network traffic and you can see there there's a huge spike when we are copying uh data over the network to that machine same same is visible for CPU graph which is red line there is pretty huge usage about 50% more 60 and then there is big drop when uh the untaring uh that uh file and loading it as image into the store.
 
 
00:18:00
 
Jan Rodak (Honza): Yeah, for green and blue lines graph uh it is uh disk io load and you can see there big blue spike when already the image was that tar file was uh copied into image and you start and started to loading that uh tar file as image. Yeah. And this can be easily speed up when we skip that part when we are transferring data to uh polment machine. And I did u machine ssh and same same command with uh just only with full path to that file. And we can see here a significant improvement. It is 32 seconds. Before it was 52. And yeah here here are graphs and I think some of them uh for example for uh networking I think it is just background noise from my machine and because we already skip all that uh traffic and here I don't know if it's readable enough but here is under the 0 megabytes per second uh and before it was about 170 mgabytes per second which is much different uh different much different speed.
 
 
00:19:31
 
Jan Rodak (Honza): Yeah. And this is for uh permanent low load. I have a little bit suspicion here because I run it multiple times before with uh just uh load without sshing there and times was much higher. It was about 1 minute 30 seconds but probably Mac OS did some adjustment and move that file into faster memory. Yeah. So we will see something similar for build. Yeah. So for build I did just simple application application and put there some be background uh or big context. I used the tar file for it. Uh so for building application uh in to image uh it depends my uh biggest part of it it's depend on the build context it depends how the context is big for for this example to show it what where we where time is taken most uh I use pretty big file I didn't find find any other project which would build image and has big context. If it's I think about 40 megabytes, it is transfer on this machine will be pretty pretty fast because we picked about 170 megabytes per second.
 
 
00:21:00
 
Jan Rodak (Honza): So copying this uh context will be well user didn't notice it about 1 second I would say and but to show show the show that it could happen you can have some application with big context and you can uh make it smaller with container ignore files so you can put there that your huge files which you don't use for building uh in that image and make it faster. So I again run Pman build and we can all again see that uh CPU is and network is pretty in sync that are used in beginning and it it is used most and then after copying of all context is done it it just do one big spike which is uh I think finishing build of uh binary uh and well and here is the something which I suspect Mac OS did some adjustment here in graph for disk io here is here isn't any reading noticed because I think it did it was moved into random access memory and it was copied from there so there is no IO for reading that huge star file yeah and for build for pman build It takes 34 sec seconds to build it because most of the time was copying that huge file which which wasn't used.
 
 
00:22:43
 
Jan Rodak (Honza): Yeah. But it is uh very important to say if you have small build context it you that time will be much shorter. And again we can see here that it is about in peak it is about 20 megabytes per second in network in internal network on my system. So yeah it is not that it is pretty fast. Yeah. And when I use it with again with permanent machine SSH uh it just shortened to six seconds. Yeah. And we can see here that uh there is just probably probably it is some background noise or just a spike when uh that SSH was happening. Yeah. And that that's probably it. Just one thing in the end pro I would like to improve this stuff in in podman at this for loading saving loading and saving images and when we start developing uh podman artifacts at to to make in mind that this will be pretty important and we have here that simplifi stuff to simplify it and I'm not sure if it makes sense for bel I'm some somewhere between so I'm not I'm not sure but it it will there will be not there will be definitely some benefit for it so that's it from me any questions
 
 
00:24:23
 
Paul Holzinger: Yeah, I I think build is probably the command that benefits the most because the the client doesn't know what files are going to be accessed and we copy everything and if you build on on Linux it just you know build accesses the files you know as they are named in the container file like on copy
Jan Rodak (Honza): Yeah.
Paul Holzinger: or so like by not copying everything you you solve the problem of you have this gigantic um context directory. Uh
Jan Rodak (Honza): Yeah.
Paul Holzinger: that's that's why it's for build probably the like I mean you can make up an example with like gigantic files especially if you do like many small files and stuff that are all t up extracted nm and so on you will definitely see
Jan Rodak (Honza): Yeah.
Paul Holzinger: the gains for artifacts I don't think it will matter that much uh because artifacts we don't copy we stream directly uh I'm not sure if there will be a huge IO French. Um,
Jan Rodak (Honza): Yeah, artifacts isn't already implemented. So, yeah, I just want to know this.
 
 
00:25:38
 
Jan Rodak (Honza): and for builds. Yeah, you yeah, you are right, I think. But uh the container ignores file could help with this. But I don't know if it's used that much or it is just uh uh don't use uh don't use uh readme files or something like that when you use copy. Yeah. But yeah. Okay. Anyone else? So if there is any questions so probably next one can
Neil Smith: Okay, the next one was me. Um and it's an open topic to talk about handling uh PRs and other work coming into the uh container tools repositories that are either helped with AI or produced through AI and an open conversation about what people think we should be doing to handle this. It's in it's going to more and more is going to happen. I did talk to the CNCF. It's up to us how to handle it. I do think it's a it can't be pushed down on the maintainers because um to to know whether those things are an issue or not and uh and to be like worried about license and stuff like that.
 
 
00:27:25
 
Neil Smith: But let's have a discussion about it. Loesh.
Lokesh Mandvekar: Yeah, my first concern is uh do we have any reliable tool to detect if it's AI code? Because if some human submits a patch, whether it was humanly written or generated by AI, uh as long as we have their sign off,
Neil Smith: Yeah, we have
Lokesh Mandvekar: I
Neil Smith: their
Lokesh Mandvekar: would
Neil Smith: sign
Lokesh Mandvekar: consider
Neil Smith: off,
Lokesh Mandvekar: it
Neil Smith: right?
Lokesh Mandvekar: I would consider it human code.
Neil Smith: That's I think it's I think the sign off is the most important thing. But that's melov.
Miloslav Trmač: Yeah. Do we have any specific legal restrictions or guidelines guidelines in there? Just sign up. Uh beyond that, I mean, if we can't tell, it doesn't matter. But as a reviewer, I would say that uh if I ask a question and it turns out that the submitter doesn't understand the code, that's pretty much a showstopper.
Paul Holzinger: So I I linked the from the Linux Foundation some like guideline or guidance rather uh I find uh point two quite interesting there uh because to me that's like a impossible condition uh where it says that you know the the contributor should confirm they have permissions from third party owners uh if such AI tool output would you know output some copyrighted material where like and it's up to the contributor to check that like it
 
 
00:29:13
 
Paul Holzinger: how how are you going to check that right like it's not possible and even more so for the reviewer so I find that uh really difficult to judge uh I one thing I would like to see is that at least uh people submit eding code with AI help should disclose that right away. Uh because as Melv mentioned uh it can be depending on what the change is like it's I always have to assume the person who wrote the code knows what they did and if they don't that's a problem.
Miloslav Trmač: Um, I mean that happens for humans as well. I think somebody finds an answer on Stack Overflow and copies it. A, they might not understand what the code does and not be able to have a discussion during a PR review. B, it might originally be copyrighted from whenever. And I think the old Unix lawsuit was about 100 lines of maloc or something.
Neil Smith: Yeah, I I was just going to say, Paul, I think it's it'd be nice if people said that they used it, but soon I I think everybody is going to be using it slightly.
 
 
00:30:48
 
Neil Smith: So then what do you say, you know?
Brent Baude: If you want my if you want my two cents. Um, I think the DCO pointing at the DCO is the key. The DCO is the spirit of the DCO is this is my code I'm giving to this project under their terms or the terms that it points to. And if they it would be no different, as Mulesoft said, uh, if they copied it off the web or if they went into their own product, took out code and gave it to us and they weren't supposed to. They're the ones that said they did it. My understanding is in these cases, if the project is notified that look, you have some stuff in there that was copied out of here or I think it was, then the the project must respond and either remove revert the commit or alter it. That's my understanding of this flow. I saw some people shaking heads. Is that others? Laura, you were one of them.
Laura Santamaria: Sorry, I was shaking my head at something else.
 
 
00:31:57
 
Laura Santamaria: Um, but
Brent Baude: Oh.
Laura Santamaria: no, I I agree with you. This is actually an active discussion in a lot of different projects right now. Um, and that copyp pasta situation of, hey, I copied this from Stack Overflow and I did this or even just drive by contributions that are like, I'm going to auto pepate a whole bunch of Python code. Usually, they're frowned on in most communities anyway. So, one way or the other, you have to understand how your code works. So that's where most communities seem to be landing because most people don't have the time to go and use all these tools that the Linux Foundation is suggesting. It's very difficult to get all of those set up and running when you're a tiny community. So usually it's the hey follow the developer uh covenant that you agreed to and don't submit something that you can't defend in a pull request review. So usually that's what most people are saying.
Brent Baude: Now, one thing, Neil, one takeaway may be to just double, triple, quadruple check every repo we deal with has DCO sign off.
 
 
00:33:02
 
Brent Baude: Um, that might be worth our time to just go through them because it's easy to forget little ones. And let's make sure that's on there.
Paul Holzinger: it's it's uh enabled on the entire GitHub organization. So anything on on containers should have the have that check. Whether that check is actually enforced via merge protection is a different story.
Lokesh Mandvekar: And if it's not enforced, I think we could enforce it via the GitHub settings, uh, branch protection.
Brent Baude: Okay. I mean, those are good things we should check. I'll talk to Matt about it.
Miloslav Trmač: Uh Bren just to highlight something I think you hit on a point where if we are not sure we should not be doing the analysis like if if we say it must not be you must disclose that this is AI generated and then we'll make a judgment call it's on on us to make a copyright judgment call. If we say you must sign the DCO and be responsible for your code, we can say not our decision, not our responsibility.
 
 
00:34:34
 
Brent Baude: Yeah. Anyone else have un unresolved feelings about this topic that we should talk about
Paul Holzinger: No,
Brent Baude: because
Paul Holzinger: I I just want to say that when I say that a person should mention that, I don't mean that in the context of the DCO or copyright. I mean that in the context of I know what I'm going to talk to on that person. So, it's more of a heads up than uh for me at least. Well, yeah, as you're right, like there there's no requirement that the person knows whatever they submitted and we already have people submitting stuff they they don't know. So,
Miloslav Trmač: Yeah, I think this might change. Either AI will be suddenly become good enough that this is not a a non-issue or we might get a flood of badly motivated PRs and we will need to work on them out. I'm not worried so far, but this m might change very quickly.
Aditya Rajan: one thing like which how Neil mentioned that sooner or later everybody is going to be using some part of uh generated code.
 
 
00:35:57
 
Aditya Rajan: So I I think like it is different in the segment that for example if somebody's writing a code and he he or she uses autocomp completion feature which just autocompletes a line or something like that that can be different from generating like entire blocks of code or like even the entire feature. I don't know how these two categories can be differentiated because autocomp completion and completing lines of code was happening before the AI as well and uh after I think it's going to be becoming more and more common thing. So I don't know if that should be a disclosure agreement in the PR that my code is like AI generated or is it manually written. I think the line is going to become more and more blurry on that segment that what part is AI generated, what part is human written. So maybe that part I don't know if that makes sense to ask a contributor if your code is AI generated or manually written. It's just that if DCO is signed off, they are the responsible authors of the code.
 
 
00:37:08
 
Aditya Rajan: Doesn't matter if it's
Neil Smith: That's
Aditya Rajan: coming
Neil Smith: where I think the best line is at the um it's just if you contribute and you sign it, you're assuming responsibility that it's It's donated according to the right licenses. Laura, your hand was up.
Laura Santamaria: I was just going to say that we don't really have any guidance just yet from the OSPO on this one just so that folks know. Um but in general I'd just say again don't worry about the disclosing it. You are probably going to start getting a flood of this as the projects get more popular. Right now the Kubernetes project is getting the bulk of this right now I think from the CNCF world. Um but I'm noticing it starting to pop up in other various spots. So, um, be ready for it. But again, yes, there's there's not really a ton of difference between it autocompletes or it starts to fill in the whole thing for you. But again, if somebody's going through a pull request review and you're asking questions about the code and they can't answer it, that to me is the bigger problem because they're not able to understand what their code does and why it's important that it was done the way it was done.
 
 
00:38:21
 
Laura Santamaria: Um, does it follow style guide? Does it follow all of those other things? Those are all the things that I look for if I'm looking at different pieces of code anyway. So, it just means that there might need to be a bit more careful look at poll request reviews when thinking about as AI more AI generated code comes in and as you start to get a lot of these floods of contributions, you're looking for the junk contributions. And right now, we don't have the tools built just yet to help uh stem that tide, but there's a lot of groups working on that just so that folks know.
Mohan Boddu: Yep. Uh I kind of agree with what uh you guys are saying like Adi mentioned a great point like the line is going to be become blurriier and blurriier uh and we cannot stop these contributions. Um but my question comes into the picture like if it is a generated and the uh contributor is not responding what we what should we do with it? Should we take over the control and uh get it over the line or should we just reject it?
 
 
00:39:27
 
Mohan Boddu: That's where my concern lies with this uh air generator code.
Lokesh Mandvekar: I mean, if we want some feature in and we're assuming to take over responsibility of that PR, we're essentially owning that.
Brent Baude: So Moan, you're talking about somebody submits a PR and then it's a driveby and
Mohan Boddu: Yeah.
Brent Baude: they're gone.
Mohan Boddu: Yeah.
Brent Baude: Uh we've we've actually talked about this topic numerous times and really never come to a how we're going to do that because if that sucker is signed off now you have the same problem. You can't just take you just take it necessarily um and say okay I'm going to submit it for them. you you sort of now inherit that DCO or I think Paul in some cases we've we've put their sign off there and then we put our sign off over the top of it, right?
Paul Holzinger: Yeah, I
Miloslav Trmač: Yeah,
Paul Holzinger: mean
Miloslav Trmač: that's how it's supposed to
Paul Holzinger: long
Miloslav Trmač: be
Paul Holzinger: as the signoff is there, you can use it. But if the signoff isn't there, then you shouldn't use it.
 
 
00:40:47
 
Brent Baude: Yeah. And that activity at Devcon left us a ton of drive by shouldn't say a ton. it left us drivebys, uh, including some from well-known people. Um, so, you know, we have that same decision. We've pinged them in there. Can you please come back? You know, can you can you just sign it off? It's good to go. That kind of stuff. But, um, I don't think we have a solid answer because each one of them is going to be kind of different.
Mohan Boddu: But the thing is uh until now or before AI it's the core could be bad and we you we review it and ask for the I mean give some suggestions and review it. But with AI the as the code is becoming much more efficient what should we do with them just
Neil Smith: Why?
Mohan Boddu: merge.
Neil Smith: I think you can't worry about it. Like you got to make it you review it like normal and if and you can't you won't be able to know.
 
 
00:41:53
 
Mohan Boddu: Clear
Brent Baude: Yep. I'm going to give this
Paul Holzinger: Yeah.
Brent Baude: two more minutes because we got another speaker and we can come back to it if we have extra time.
Paul Holzinger: Yeah. Uh I think that like the take over part. Yeah, that that's fair. Like take it over if we want it, otherwise close it out or whatever. Uh I'm more interested in the in the opposite. If somebody keeps sending like not good PRs, what you going to do about that? Like, you know,
Brent Baude: Sorry.
Paul Holzinger: if somebody like No, I mean like you know if if if you realize halfway through your review you wasted 20 minutes of your time or 50 minutes of your time that this is garbage then uh and this is like a repeated pattern then I think that's a much bigger risk to to my productivity and like the project's productivity than you know people submitting useful
Neil Smith: I think that can happen now too though, right?
Paul Holzinger: Right. I just exactly like the question is what what do you as a project what would we want to do you know like what option do we even have like
 
 
00:43:07
 
Neil Smith: I think you would
Paul Holzinger: finding a person I don't know
Neil Smith: I think we have let's check our governance but I think that we can do stuff if people are becoming a nuisance, right? So, and that would just be the same case. Somebody just flooded us with 500 PRs and they're all over the place. We would just we would just have to say stop it and and close them all and and whatever, right? Like we can't process that.
Miloslav Trmač: If it is a person who doesn't know how to write software, that's a bet. Do we teach them or do we let them learn somewhere else? If it is a person who is not seriously in good faith and just wants to I don't know get credit. Don't waste my time time close it. uh if it is unclear, we all have enough work to do. It can just go to the end of the line. And if somebody wants to actively maliciously spam out with spam us with a dozen of individuals with accounts, I don't think that has ever happened to us before.
 
 
00:44:35
 
Brent Baude: Okay, I'm going to cut it there unless anyone has any something they want to get in or we can continue to talk about this uh in an upcoming cabal or at the end here, but uh doesn't sound like it. So,
Neil Smith: Well, let I'll just write in that our current uh decision is to basically go along with Linux Foundation stuff and say it's all up to the contributor understanding what it's their donate. It's their contribution, right? And they have to be honest about it or not. But
Brent Baude: We
Neil Smith: I
Brent Baude: ought
Neil Smith: think
Brent Baude: to
Neil Smith: Yep.
Brent Baude: I think the one takeaway is we ought to get somebody to write a
Neil Smith: Oh,
Brent Baude: couple
Neil Smith: yeah. I wrote down other stuff, too. Yeah.
Brent Baude: in the contributing guide though that should be explicitly called out because bit of a CYA but yeah when you make a contribution these are what you this is the intent. Okay, Lori, you have the floor and you'll likely need to introduce yourself.
 
 
00:45:35
 
Laura Santamaria: Yeah. No, that that's basically what this is. Uh, I just want to briefly introduce myself. My name is Laura Santa Maria. I am a new community architect here at Red Hat, but that means that I'm assigned to all of the container tools projects. So, if you need anything from an open source perspective, community perspective, I've been in the CNCF world for many years and I've been all over the place at large companies, small companies. I know a lot of people. Um, so I'm just kind of here if you have questions, if you need help, I will be trying to show up to all of the community meetings for various projects in the container tools community. Um, while I work at Red Hat, my focus is upstream. So I am here more for the community in general. So if you have any questions, feel free to reach out to me. But that's really I just wanted to make sure you all knew I was here. Say hi so that you knew who I was.
 
 
00:46:22
 
Laura Santamaria: That's it.
Brent Baude: Okay. Uh
Laura Santamaria: Pleasure,
Brent Baude: it's
Laura Santamaria: Mitchell.
Brent Baude: probably worth likewise it's probably worth knowing that uh when you say that you work upstream mostly but still work for Red Hat that applies to probably n10 of this people here.
Laura Santamaria: Yeah, I
Brent Baude: Podman's
Laura Santamaria: know.
Brent Baude: Podman's a bit of an unusual project and that very few of us work
Neil Smith: That's
Brent Baude: in the rail area like
Laura Santamaria: Yeah,
Brent Baude: as a as a job. So
Laura Santamaria: makes sense. I just want to let anybody know that if you want to talk about just specifically upstream, especially if you're not at Red Hat, feel free to come talk to me as well
Brent Baude: absolutely
Laura Santamaria: because my focus is how do I help this community grow and thrive. So
Neil Smith: Great because
Laura Santamaria: that's
Neil Smith: that
Laura Santamaria: me.
Neil Smith: we've been we are trying to work on that to be
Laura Santamaria: Yep.
Neil Smith: a very welcoming community and encourage new developers and
 
 
00:47:16
 
Laura Santamaria: Yeah.
Neil Smith: all that sort of stuff. So,
Laura Santamaria: So, I'm here to talk about governance and tell you how other projects do it and help you out with some of that. If you need me to help out kind of getting that governance structure together in the document, I can help there. When you're ready to get to incubating and graduation on the CNCF, I've done that, too. So,
Neil Smith: Great.
Laura Santamaria: yeah, I'm here.
Brent Baude: I think the one thing that could be helpful is for you to if you wanted to read our governance
Laura Santamaria: Sure.
Brent Baude: the the podman governance leads the way for the rest of the projects that we mostly have our arms around. So if if you read that one and wrote issues about things in there that you find
Laura Santamaria: I'll
Brent Baude: maybe
Laura Santamaria: I'll
Brent Baude: needs improvement, then I think we would be happy to accept those and review those or even if you wanted to do a pull request against them
Laura Santamaria: Sure. I can
 
 
00:48:08
 
Brent Baude: with
Laura Santamaria: do that.
Brent Baude: PCO sign off.
Laura Santamaria: Of course. Yeah. No, I've I've been a dev for a while, so I know what I'm doing, but I
Brent Baude: Uh,
Laura Santamaria: certainly can. I will go double check through and and look through and see if there's anywhere
Brent Baude: so
Laura Santamaria: I can help you all with that.
Brent Baude: awesome because I think, you know, like I said, everyone kind of reuses that one. So if it's if you see some things in there, they could use some tightening up. We've always been doing we've been slowly doing that as well. It's been working though. I would say
Laura Santamaria: Yeah.
Brent Baude: overall the team would agree that the governance has been working. Um, cool. Okay.
Neil Smith: What?
Brent Baude: Uh I I guess there is one more topic on the docket here, but I'm not really loving the fact that we're not all here to talk about it. Um, so this came up um Neil when you were asking some questions about a repos that were not donated yet and whether or not we needed how we needed to treat those and that was something I wanted the team to just you know kick back and forth.
 
 
00:49:18
 
Brent Baude: I think we've very much gotten used to the idea of a governance document, but you can have a governance document outside the scope of CNCF. So, um I'm not sure there's any subtleties in there that we care about, but I wanted to open the topic.
Paul Holzinger: I mean the obvious answer is the Potman governance is way too complex for most minor site projects that are on containers. So I would probably need to be like a per repo decision or something like that. Uh, and yeah, I mean, in general, I agree some more guidelines on what each repro does or at least who's responsible and stuff would help the GitHub arc.
Neil Smith: Uh yeah, I think that we probably like we have I think 15 or something, right? So for the smaller ones, we probably could find a one sizefits all for them, though. So I think let's explore one or two small ones and then we can figure out how to handle it because you definitely don't want two required LTMs probably and things like that
Brent Baude: Yeah,
Neil Smith: but there's you know they'll all be unique that you know only one or two people know anything about
 
 
00:50:59
 
Brent Baude: that's right. Um, we're always open to evaluating Laura. So always we have we yeah I think lib HV is always a good example. There's it's it's a it's a minor part of man machine uh depending on how you look at it and it's um it's largely done and won't be improved unless we find bugs. So, it's an interesting one of how much you want to put on that. And uh yeah, we would struggle to get two LG cams on that for sure. So,
Paul Holzinger: I I think what one point is like I just look up there are like 123 repositories and like three repositories right now our like builder Scopio Portman RCNCF right everything else isn't and the majority of these repos aren't even maintained by people in this call like so I am not comfortable making any kind of decision without individual repository maintainers and that that alike. So
Neil Smith: That makes sense that every obviously the key maintainers of each repo have to say that it's okay. We would be pring the governance anyways, right?
 
 
00:52:54
 
Neil Smith: Okay, I think Loesh had one more idea of talking about something.
Lokesh Mandvekar: So yeah, I
Brent Baude: Yeah.
Lokesh Mandvekar: just a link to the security.md in the Ramlan repo and that points to the security and disclosure policy in containers common and that says if you have if you want to report a vulnerability report it to security list.podman.io Ohio which I don't think is a
Brent Baude: Thanks.
Lokesh Mandvekar: good idea for a project like Ramalan. Uh and I think many other projects also point to the same document. So do we need to revisit the security policy per project?
Brent Baude: probably.
Lokesh Mandvekar: Okay.
Brent Baude: Um, let me let me add that to the priority thing and we can get that get that work scheduled.
Mohan Boddu: But it's not going to stop others from using whatever the new governance or uh the security right.
Lokesh Mandvekar: No. Uh I mean in that case we would need a separate policy for Rama Lama or separate email address or something and likewise for other projects.
Paul Holzinger: Yeah, I I tend to strongly agree with Locash because frankly it's uh not a good thing that we need to handle another project security triaging uh because we are simply unqualified to do that.
 
 
00:54:49
 
Brent Baude: Okay. Um, are there other topics that folks want to cover in the last four minutes? I see a new face, Alex. Welcome.
Alex Guidi: Thank you.
Brent Baude: Did you have any questions that you would like to ask the team or anything?
Alex Guidi: No, I'm here because I start to follow the community. I I raised one PR to fix one one bug and also from Red Hat, but uh like I'm trying to find more time to contribute to Podman so far. So for now, I'm only following and trying to get this PR merged.
Brent Baude: Okay,
Alex Guidi: Thank you very much.
Brent Baude: thank you for being here. And uh people that have been here a fair amount, Jerry and Martin, welcome. There's
Gerry Seidman: Hey y'all.
Martin Jackson: Thank
Brent Baude: anything that
Martin Jackson: Thank you.
Brent Baude: anything you folks want to bring up before we close given that we actually have a couple of minutes at the end.
Lokesh Mandvekar: and and Kevin, too.
Brent Baude: Okay. Uh let's see. Whoever started the recording, can you stop and we'll do as Tom did. Um give everyone opportunity to ask questions off the record here.
Mohan Boddu: Yep, I will do that.
 
 
Transcription ended after 00:56:20
```
