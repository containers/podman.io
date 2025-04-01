# Podman Community Cabal Meeting Notes
## March 4, 2025 11:00 a.m. Eastern (UTC-5)

### Attendees
Ashley Cui, Brent Baude, Gerry Seidman, Giuseppe Scrivano, James Cassell, Jan Rodak, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Mark Russell, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Nicola Sella, Paul Holzinger, Tom Sweeney, Zack Zlotnik

### March 4, 2025 Topics

1. CNCF Governance - Matt Heon
2. Better ways to build images - Zack Zlotnik
3. CNCF Update - Neil Smith
4. Backlog Management - Neil Smith

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=WfDmgNFaX2I)

Meeting start 11:02 a.m. EDT (UTC-5) Tuesday, March 4, 2025


#### CNCF Governance - Matt Heon - (0:42 in the video)

Governance PR: https://github.com/containers/podman/pull/25398.  This covers how we add code and how one can become a maintainer.  It is up for a PR review now.  Hoping to have a draft version by early next week.  We hope to get it out of draft status by the end of March and will start enforcing it then.

Break down:

A Reviewer just reviews codes, and once approved, you can mark the request as mergeable, but unable to merge.

Maintainers are Reviewers for some time and, after voting, can then merge into a particular project.

Core Maintainers are maintainers who are maintainers across several projects.
They can merge into multiple projects.  They, too, are voted on.

Based on the CNCF contributor letter.


#### Better ways to build images - Zack Zlotnik- (5:25 in the video)

Looking into templatizing a container file.  Is there a better way to think of this?

His idea is that Buildah has a lot of APIs that can be used, even though there are a lot of dials and knobs due to the complexity in the arena.  He's wondering if we can make it a bit more straightforward.

Maybe have better building blocks that we could put together.

There have been some thoughts of chunking layers together as a possible way to make this happen.  

He doesn't want to replace Containerfiles but thinks something could be built outside of Buildah or Podman.  It could create a series of building blocks to put ontop of the Buildah API.

He's hoping to get more control over the build process.  Paused to see if we could tie in Jonathan Lebon.

#### CNCF Update - Neil Smith - (: in the video) - 15

We were accepted into a sandbox in January, moving to on boarding officially.  It's an issue in Podman's Issues, CNCF Onboarding Tracking.
https://github.com/containers/podman/issues/25329.  The Governanace was the first step.  Moving art, and then communications to CNCF's Slack Workspace.  We'll be adding the initial list of maintainers, contributors, owners.

Then we'll start the work for moving the project locations.


#### Backlog Management  - Neil Smith - (16:55 in the video)

We have looked at the open prs and issues in the projects that we care about.  In particular, Podman, Buildah, common, conmon, container-selinux, Skopeo, storage, image, and more.

We have some issues that are old.  Average is 24 days in Skopeo.  Showed a graph of open issues over time.  Since 2022, there has been a huge growth of open issues.  Open PRs are growing, up to about 190 right now.

Is there anything we should be doing with these?  Should we be closing, or should we be keeping them open?

Brent noted that the Red Hat team has wanted to keep them open, in case we can fix them.  However, it might not be realistic, given there are 700 issues on Podman.  Would doing a mass purge help us manage our backlog?

Paul doesn't like the term of backlog, and is concerned that others might still be a problem, even though we have not found the time to work on them to date.

Neil is concerned that we keep looking at issues over and over again.  Neil thinks that after some point in time, we should just say we won't get to it.

Miloslav looks at the old ones during the Red Hat bug weeks.  For closing feature requests, he'd be strongly opposed.

Matt thinks the question is will a user be more upset to have a bug closed without a solution, or to keep it open for 3 years without progress.

Giuseppe thinks closing the issue by the age doesn't like the approach.

Tom thought about add some label warning that the issue would be closed in 60 days if no response and the label removed.

Paul notes that the stale bot creates angst in some users.

We'll keep considering.  James noted he'd prefer to keep open.  Maybe adding a "triaged" lable so we won't have to keep looking.


#### Open discussion - (33:10 in the video)
1. No Topics

### Next Cabal Meeting: Tuesday, May 6, 2025, 11:00 a.m. EDT (UTC-4)

#### Possible Topics
1. None suggested.

### Next Community Meeting: Tuesday, April 1, 2025, 11:00 a.m. EST (UTC-4)

#### Possible Topics:
1. None suggested

Meeting finished 11:38 a.m.

### Raw Meeting Chat:

 ```
 Matt Heon
 11:04 AM
 Governance PR: https://github.com/containers/podman/pull/25398
 Zack Zlotnik
 11:13 AM
 https://docs.google.com/presentation/d/14OipbgtGRtiZF30d9cs_ESLSkT--NnYXr6yWH8Sy714/edit#slide=id.g339e7cfe87a_36_162
 Matt Heon
 11:30 AM
 have to run for a minute
 Miloslav Trmac
 11:34 AM
 https://www.edsantiago.com/github-issues.html
 James Cassell
 11:34 AM
 I prefer to have them open forever
 James Cassell
 11:38 AM
 recordings are usually easy to find on YouTube
 ```

 ### Raw Google Meet Transcript

 ```
Tom Sweeney: Good morning folks. Welcome to the pond man community cabal meeting. Today is Tuesday, March 4th, 2025. Today we have four topics to talk about. a lot of them are to deal with the new upcoming CNCF change that we're having with our projects. First one off the bat there will be Matt Han talking about CNCF governance. Then we'll have Zach and Zach I'm going to butcher your name I'm sure is Lotnik. Am I close?
Zack Zlotnik: That's it. Yeah.
Tom Sweeney: He'll be talking about better ways to build images and then Neil Smith will have a general CNCF update where we're going and then Neil will also follow that up with a backlog management. So with that all said I'm going to hand it over to Matt
Matt Heon: Okay, so this one should be relatively quick. I will start off by assuming Google meet lets me meet, linking the pull request and sharing so we are now working on our governance model for CNCF. This basically is going to decide how the project is going to function from here on out.  Now that we are in the CNCF, this designates things such as what the roles of our maintainers are, how things work within the project, how we add code, etc., etc. And generally speaking, if anyone wants to become involved with the project, this designates how they're going to be able to do that. How you can get promoted to a code reviewer and then a maintainer and then a more senior core maintainer who has voting rights on project related decisions.
Matt Heon: Anyways, this is all up on GitHub. I have linked the PR. It's still preliminary, not merged, etc. suggest we are taking suggestions from anyone who has them. My goal would be to get a draft version of this merged into the repository either late this week or early next week.  and then we'll continue accepting comments and pull requests against it for a period of several more weeks before we call it not draft anymore and start enforcing the actual rules. So I would say by late March we would be having this in force. yeah, there's a lot in here. It's something like 250 lines I believe. So I won't go over every part of it.
Matt Heon: just wanted to link it and let people review it If you don't care how the product project is run and especially if you don't feel you're like you want to become a maintainer, you'd have no obligation to review this. But if you do want to become a maintainer in the future, this will be very useful for you.  All right, I think that's about it for
Tom Sweeney: Any questions for Matt?
Brent Baude: Matt, people do listen to these recordings, do you want to highlight how you have sort of specked out the notion of core maintainers, reviewers, and maybe just some of the privileges?
Brent Baude: I know they can go read that, but maybe you can break it down quickly.
Matt Heon: Fair enough.
Matt Heon: So we start off with what we call A reviewer is basically just assisting in code review. you can become a reviewer by co reviewing code for a while and eventually the project maintainers will nominate you to be a reviewer or even ask to be nominated and then once you have been nominated and accepted you gain the ability to approve pull requests as in mark them as being reviewed but not to merge pull requests. Next step up is a Maintainers have the ability to actually merge pull requests on a single repository. All maintainers will be drawn from reviewers.
Matt Heon: So if you've been a reviewer for a period of time and you're doing good work, you can ask to be nominated as a maintainer and once you become a maintainer, you gain the ability to merge code on that repo and also to attend maintainer meetings, although you do not have a vote on project governance at that point. Next step up from that is core maintainer. So we have a bunch of repos in the  Podman, Builder and Scopio have all been donated and in recognition of the fact that they have very different requirements, very different roles. we have a core maintainer function which is basically people who have the knowledge and experience to govern the whole project i.e. they know how all of our projects work together and things of that Core maintainers are drawn from maintainers. After a period of experience as a maintainer and doing a good job there, you can become a core maintainer.
Matt Heon: or maintainers get actual votes on how the project runs going forward. And then on top of that, we have a community manager role which is sort of ancillary. That's going to be people…
Matt Heon: who help us maintain the community, run meetings like this, etc. And I think that's about everything.
Tom Sweeney: Can I ask the origin?
Tom Sweeney: Did you base this off a CNCF template of sorts and…
00:05:00
Tom Sweeney: take it from there?
Matt Heon: Yes, this is a heavily modified version of…
Matt Heon: what CNCF calls the contributor ladder. we added a few rolls they don't have and remove some that they have that we don't
Tom Sweeney: Any other questions for Hearing none, I'm going to say thank you, Matt.
Tom Sweeney: And we will ask Zach to go ahead and talk to us about better ways to build images.
Zack Zlotnik: Hey folks. without going into it too much I like so I'm part of the machine config operator MCO team that works on that open shift component.  And so one of the things that we do is we do OS configuration and with image mode we've been kind of looking at we're now tasked with building an OS image and there's some conditionals that we had to think about if do this thing or do this other thing and really the only solution that we were able to come up with that worked was templatizing a container file
Zack Zlotnik: And this whole process got me thinking of, is there a better way to do this? is there kind of a better way to kind of think about this?  And I believe me when I say that I read so much code in the build and podman repos and everything in containers just to try to get some inspiration for kind of a better way to do things. And last week I did a presentation at the containerization guild gathering basically called building containers programmatically.
Zack Zlotnik: I'm not going to go into it too much just because I don't want to waste everyone's time, but the general gist of my idea that was that Builda itself has quite a number of APIs that you can use even if there's a lot of knobs and dials there and that's just  a consequence of how complex this stuff really is. And it made me think that, maybe we could build some higher level abstractions on top of it. I don't know what it could look like. I did kind of a code sketch if you will. I can share it if you like.
Zack Zlotnik: It was I'll just share the samples that I did for the wait what is hang on oops won't let me share says I don't have permission but that's okay the idea that I had was just having some better building blocks that we could put together and in speaking
Zack Zlotnik: about this with Jonathan Leon. I'm not sure if he's here or not. I know that they have some particular use cases around chunking image layers and chunking things into there. I don't want to misspeak and kind of misdefine that particular problem. but just in general I just kind of wanted to get an idea I just wanted to get an idea over whether this is something that we should maybe explore a little bit just kind of experiment with. just to be clear I'm not looking to replace container files.
Zack Zlotnik: I don't think that somebody should have to write a program in order to build a container image and I don't see something like this being built into either Podman or Builda, but those tools could be used as kind of a foundation for something else. So I will leave it at that for right now. I would share my screen, but it said something about permissions, so that's okay.
Brent Baude: Tom, are you aware of why he can't share his screen?
Tom Sweeney: No, I'm not. Unless it's a Google Docs,…
Tom Sweeney: some kind of perm.
Zack Zlotnik: Yeah. I don't know what's going on with that.
00:10:00
Zack Zlotnik: It worked before.
Tom Sweeney: Before we started the recording, we did a test.
Zack Zlotnik: Yeah. Yeah, it Could be my computer because could just be having a bad day.
Neil Smith: Do you want to send Tom a link and…
Neil Smith: he can share?
Zack Zlotnik: Yeah, Yeah, let me see if I can just link to just this slide here. I don't want to There it is. I'll just drop it here for now. I don't know if that slide's going to come up. This is the one thing that I just want to point out with this is that this is just me just writing proof of concept code. And really all it does is it just spits out a container file that has steps in it. You can compose them any way you want. I'm not saying that that's the approach that one should take.
Zack Zlotnik: instead it's just kind of an idea that okay, we can create building blocks on top on top of things or on top of this that can do that that would know for example, one of the ideas I had was this idea of just kind of a generic package installer that takes a list of package names, and a final image tag and knows what to do with it. it would know if the base image uses RPMOS tree or uses DNF. It would know how to resolve package names. it would know how to do a bunch of different things along those lines. And that's just one example of kind of the building block. I can see some other examples as well.
Zack Zlotnik: I kind of wish I would have shown that in this presentation, but I was in a bit of a time crunch to get everything put together for it.
Neil Smith: Are you asking if you can put something in front of the build to produce a batch of container images?
Zack Zlotnik: Not necessarily that because I've read the API docs. I know that it has quite a rich API that one could use to do that. In fact, I've kind of done it following the example that was there.
Zack Zlotnik: more what about more what I'm thinking about is this idea of having building blocks for container images that doesn't necessarily require one to write a container file.  I mean, they can if they want, but I see it is as more of a way to have more control over the build process.
Zack Zlotnik: Let me see if Jonathan can join because he Jonathan certainly had some ideas around chunking and things like that that I want to make sure that yeah,…
Tom Sweeney: Do you want to pause this talk for the moment and we'll go on to the next one?
Zack Zlotnik: go ahead. we can pause it.
Tom Sweeney: See what we can get Jonathan so next up that we had CNF update Neil.
Neil Smith: Okay, just share my screen.
Tom Sweeney: Oops. I'll stop Yes.
Neil Smith: So this is the CNCF update part first. Okay. as part of we got accepted to Sandbox in January and the next thing we're working on is onboarding ourselves into the CNCF. So here's the official one and we have created a copy so that we can edit it so now you can see what we're at.
Neil Smith: So this inside of Podman has an issue called CNCF onboard tracking. We are underway. the big thing that we're waiting for is CNC have to change some of their agreements in the contribution agreement. So Red Hat Legal is looking over that to make sure that they're still okay with it.  But as everybody knows that takes a little bit of time. and then we are going through and marking these things as done. The big one that Matt already talked about is the governance.
00:15:00
Neil Smith: And then one of the main other things that we are waiting for the legal agreement says is then we will send over all of our images and artwork to the CNCF. we will be moving some of our communication platforms over to a Slack workspace.  That's where CNCF does their communications. we will be transferring our website domain over to the CNCF for ownership and Matt was also talking about this and that was some of the issues.
Neil Smith: we will be putting together our maintainer list and adding it to the aggregated maintainer list and that's pretty much almost all of it. So, basically waiting on legal and then we'll have a big push through for some of these things to happen in terms of, sending over artwork and…
Tom Sweeney: Sure.
Neil Smith: and the other, ownership pieces that Red Hat still has. And then we will start the work on moving into Any questions?  Great. I'll just move on to the next thing.  What I wanted to talk about with the community is we were doing some analysis on the amount of open PRs and open issues and their growth in the repositories we sort of care about.
Neil Smith: So These are looking at the following itories. Artvark builda common conmon conman rs container se Linux crun image and podman pi scobio and storage. we did some analysis and one of the things that we saw was and this is on how long things are open is that for some old issues we have some old issues. So 50% of our issues are not that old.
Neil Smith: Okay, 24 days is the oldest one in the 50 percentile in Scopio. But as we get into 75 percentile and max, we have quite a few very old items that have been just sitting around forever. If we look at this graph, this is our growth in open issues as time goes by.  So, in 2022, we had about, 450 items open, right?
Neil Smith: ice issues and we've had a huge growth in items that are staying open until right now that whenever I took this data we have around 1100 or 1150 open issues PRs aren't quite as bad but we have about 190 open PRs what I  was wanting to discuss is what do people think about this? Do we think we need to start looking at things that have been around for a long time and marking them as closed won't fix because of date?
Neil Smith: or what should we do with these ancient items and trying to get our backlog back in control in a way which without leaving these things open forever or does the community want us to leave those things open forever? That's what I was going to ask  Any opinions, right?
00:20:00
Brent Baude: All right, I'll bite. I think I've said this before, but maybe it gets conversation going. What I have heard is that our team have been the ones that want to keep them open because there's been a belief that at some point we're take care of them. I think the reality has set in with 700 issues at least on one of those repos that's probably not working and…
Neil Smith: Yeah.
Brent Baude: is contributing a lot of noise to the ability to be able to manage a backlog. So that's kind of for me one of the questions that I would ask the team to contemplate and others which would doing a mass purge based on something help us manage our backlog.
Brent Baude: Not because we reduced it because then we have less to look around for.
Neil Smith: The one thing that's my opinion is…
Neil Smith: if we're really not going to be doing something with an issue, if we keep it open, you end up looking at it repeatedly and spending time on something that is basically waste of time. So, that's what I'm hoping. we all have limited time. So, if we do make a decision, we should also have a policy of let's just get this out of the way so we don't have to see it again. All your hands up
Paul Holzinger: So I find the term backlog maybe not very fitting to upstream issues. it's not a backlog. It's a list of whatever users reported and…
Neil Smith: Right. Right.
Paul Holzinger: to the largest extents these are bugs that actually exist. If they weren't existing and we would have closed many. Of course, that includes a bunch of limbo state stuff where we have no idea is this some random environment failure or is there actually something in the program code, right? these are the hard things whether you want to close them or not.
Paul Holzinger: But I believe a vast majority of things will stay open because they are valid bugs. And just randomly closing them in hopes they are not reported again is kind of pointless and it won't reduce work because they will be reported again and then somebody else reads the same bug report again which doesn't really help that much in my opinion.
Paul Holzinger: So I'm thinking if the goal is to lower the number, that's for me not what I worry about. what's the number? I don't
Neil Smith: I guess my goal is not to just lower the number.
Neil Smith: It's more about one thing is the people are the community the users are saying hey I found something and then we're keeping it open forever even though we looked at it and at some point in time know that we're not going to do anything with it.
Neil Smith: I think if I was a user, I'd rather you just told me you're not going to do anything with it.
Paul Holzinger: To be know that at this point it's difficult.
Paul Holzinger: Yeah. let's go to stuff.
Neil Smith: I mean I can understand if we looked at it and it's like this is probably an issue we should look into and we let it sit around but obviously wasn't urgent enough. So it sat there for 3 years at some point in time. Should you not say we're never going to look at this? Right. I don't know.  Melisoft.
Miloslav Trmac: Yeah, I passed to the expected benefit. if I basically look at the old ones during the buck weeks, which means once a quarter and it's just skimming the titles which I try to keep updated.  So that runs to zero cost and there would be no efficiency benefit from closing them. otherwise if we talk about bugs I'm ambivalent there is still the fact that some user took the time to write that down and it might be valuable in itself and closing it is just throwing that away.
00:25:00
Miloslav Trmac: on the other hand setting expectations we are sorry we can't get to it maybe you can help there might be some value for it for closing feature requests I would be fairly strongly opposed because they frequently contain some clarification discussion context and I mean what's the benefit of closing that if we have a canonical place for this is this idea that might get done someday we've been thinking  about that for five years. It's not likely to get done, but still it's a good pointer to that idea. And if we close feature requests and instead start maintaining a text file road map, that's not better.
Matt Heon: It sounds like the ultimate question here really is it more frustrating for a user to find a bug that is closed without a solution or that has remained open for the last 3 years without a solution. I have always been on the leave it open side of things. saying that the bug is still a bug, but we don't have the ability to work on it and fix it has always been my preference. I agree with Mil Slop on RFS though. should leave F open generally speaking unless it is something that we decide is just not suitable for the project and…
Neil Smith: Just second.
Matt Heon: should be entirely removed.
Miloslav Trmac: Yes, our priorities and ideas of the project can change over
Giuseppe Scrivano: Yeah, I mean sometimes it happens that I Google for some errors and from libraries or other open source projects and they end up on a GitHub issue. If I see it open, I find it's useful to know that no one looked at it and the first impression. Then if you find it closed, it's either people don't care or they fixed closing issues just by their range. I don't see the advantage not for the users I mean when we are forced to the bug week we go back to this old issue and see if something changed what we know now but otherwise I just look at what's coming new we have enough stuff new coming to see if to reage it and understand if it's to fix now or…
Neil Smith: Okay.
Giuseppe Scrivano: just
Giuseppe Scrivano: document that it exist. yeah.
Tom Sweeney: I don't know if this would work or not, but if we went into one of our projects and then put on a whole bunch of tags on older issues with closing, considering closing some label along those lines. If we don't get a response after 60 days that this is important to me, then go ahead and closing it. kind of give them a shot over the bow that we're going to think about closing this one.
Tom Sweeney: If it's important to remove this label or make a comment here. What
Giuseppe Scrivano: Yeah, I mean that's like I need for info on back there is something like that classifying such issues that we are blocked…
Giuseppe Scrivano: because we don't know and then the user disappears then that makes sense to close and to give some time to it put a label and…
Giuseppe Scrivano: nothing happens. Let's close it in 30 days or something.
Neil Smith: I like please look at the graph.
Neil Smith: The slope is basically we're adding 500 open bugs per year right now on top of everything.  So, at some point in time, and this might get even bigger as we go along, if we're never doing anything about them, this will be a ginormous number. and I don't do this. you guys are doing this. So, you have to think of how you want to manage this. so,
Paul Holzinger: Speaking from experience, there is quite a lot of hate against the stalebot from users because most projects are using the stalebot to close issues and you have a lot of comments if the stalebot kicks in. Please don't close this issue because it just creates this negative attitude cuz I think you just don't want things to be closed at least not when there are bug reports and nobody has looked at things especially then it's just not fair to the user. and I don't know if things keep growing…
00:30:00
Neil Smith: Yep.
Paul Holzinger: then we need to spend more time on issues and less working on features if that's the thing right and that goes pretty much the same for every bug source that is
Miloslav Trmac: This is the community cabal. It would be nice to have from hear from somebody not from historically we've had looked at this and we've had crafts of whe whether the part that is growing is features or bugs and that differs quite a lot between the projects.
Miloslav Trmac: Although a lot of it is also that it frequently isn't charged enough to even be categorized.
Tom Sweeney: any other thoughts, comments, questions Yeah.
Neil Smith: Yeah, I was really hoping to get a community member's opinion.
Neil Smith: But we will keep thinking about this.
Tom Sweeney: James is adding that he would prefer to keep them open. Zack.
Neil Smith: Maybe we somehow mark the ones we've opened that we've looked at them with a triage flag or…
Tom Sweeney: Good. Yeah.
Neil Smith: something so that you never have to go back there and then just back with people's to-do lists of looking at things. Okay, Zach, you ready?
Zack Zlotnik: Yeah, I'm ready but it looks like Jonathan's busy just because I don't want to misattribute some of his thoughts because after this him and I have had some discussions about that. if it would be more helpful, I can certainly come up with a more cohesive way to describe my idea and…
Zack Zlotnik: and present it again in the future if that might be more helpful. Okay, I can do that. Thanks.
Tom Sweeney: Love to have you anytime for that or…
Tom Sweeney: anything else. Yeah. just as for informational we have this a meeting every first Tuesday of the month. one month, this one is more of a design kind of meeting and the the even number of months are for more doing demos and such showing things that are going. So whichever you think we best all right given that and…
Zack Zlotnik: Good to know. Thank you.
Tom Sweeney: we've gone through our topics for the day. So are there any questions or open discussions that people want to have?
Tom Sweeney: While folks are thinking about that, our next cabal meeting is Tuesday, May 6th. And our next cabal meeting, oops, am I getting the dates wrong here? March. No, that's the Cabal meeting is on May 6. And then we have a community meeting and it's wrong in the agenda. I'll have to change that. Will be on April Fool's Day. No fooling. Yes, we ought to do a theme of some sort.
Neil Smith: It'll be a fun meeting.
Tom Sweeney: I can't imagine what kind of theme you could do though. Any other questions, comments, discussions? If not, we'll stop the recording and thank everybody for coming and for doing the presentations today.
Zack Zlotnik: Thanks folks.
Tom Sweeney: Okay, recording's off. Last chance to say things without being recorded. Otherwise, I'm going to suggest you go to lunch, dinner, or what have you.
Gerry Seidman: One side note, Tom, is and I think somebody commented about it is the links to the recording are kind of circular links because I actually wanted to look at something that was said in last week's last the February 4th meeting of the community and…
Gerry Seidman: it just went in circles.
Tom Sweeney: Really? Yeah.
Gerry Seidman: So, you might want to check those. Yeah. Yeah.
Tom Sweeney: For the February 4th meeting. I will check that and I will get back with you, Jerry, if I'm finding problems with them or can't find problems.
00:35:00
Gerry Seidman: I don't need to now. I mean, I ended up just doing the research without looking at I just wanted to I was trying to remember something that Dan said and…
Tom Sweeney: Okay.
Gerry Seidman: I couldn't cool. You got it.
Tom Sweeney: Yeah. Thank you for the heads up. I appreciate that.
Tom Sweeney: Right folks, I think that's it.
Tom Sweeney: I'm going to capture some
Brent Baude: Jerry, can you stick behind?
Gerry Seidman: I'm sorry.
Brent Baude: Could you stay behind?
Gerry Seidman: Did I stay behind? Am I here? In other words,…
Brent Baude: After everyone leaves, could you stay?
Gerry Seidman: Could I stay? Yes, I can. Yes, I can.
Brent Baude: Yeah. I was just going to follow up on your email, so I thought…
Gerry Seidman: Right.
Brent Baude: why not? Okay.
Gerry Seidman: Yeah, Absolutely. I didn't even see that you gave a reply.
Brent Baude: All did you get a chance to read my reply?
Gerry Seidman: So, the answer is no.
Brent Baude: …
Gerry Seidman: I take a quick look at it if you'd like.
Brent Baude: it's just take a quick look. and I can follow up with it at all. it just gives us a chance to talk about it. Unless you have somewhere to be.
Gerry Seidman: I not have time now. You want to talk now? let me just give it a quick look. You
Gerry Seidman: Okay.
Gerry Seidman: That's more like the use case that I was thinking of. but when Dan was there he talked about two cow images single files.
Brent Baude: So that Yeah.
Brent Baude: Let me tell you about that. There's really kind of like two when Dan talks about that. I think there's two scenarios. One is already something that happens in Podman that most people don't know about which is when you use Pod. Are you familiar with Podman machine?
Gerry Seidman: No, not really.
Brent Baude: So if you're on a Mac and you want to run Podman, you basically have to carve out a VM and have Podman run inside of that. We can do that.
Brent Baude: We can do that sort of all automatically with podman machine which is a verb in podman that allows you to on Windows, Mac and Linux. It carves out a VM and lets you do it that way. Then kind of does a remote connection with SSH between the VM and the host machine. And that is a custom OS and we pull our QCows or…
Gerry Seidman: Okay.
Brent Baude: our HDXs from an OCI registry as OCI artifacts.
Brent Baude: fairly kind of custom approach, but it's a good example of how artifacts can be used and distributed. that's one area that he talks about that and how it gets used.  The other there has been a pretty big push from people that they are basically looking for new distribution methods for binary blobs in OCI registry seems they think it's a good way to do it.
Gerry Seidman: Fire. Okay.
Brent Baude: I think that's out for debate, but one thing is that there are some advantages. So there are people putting actually u cows out there as OCI artifacts and then using things like Orus to pull it down.
Brent Baude: Theoretically you could do that now with Podman. You would pull it down and then go from there. I think one of the big debates on these artifacts are the format. So whether or not it's a binary blob that's been shoved in an OCI image. And there's sort of two camps on that at this point. Yep.
Gerry Seidman: Mhm.
Gerry Seidman: But whenever I talk with the orus people, they're talking about a compressed directory of files.
Gerry Seidman: That's really the use case that I'm coming in from. correct.
Brent Baude: Yeah. a tarball of a directory that's…
00:40:00
Brent Baude: then been compressed?
Gerry Seidman: 
Gerry Seidman: Yeah. because they…
Brent Baude: And what we're Yeah.
Gerry Seidman: if they want to load store a model in an OCI registry the model isn't a single file it's a tree of
Brent Baude: And what we're saying is I guess that the approach we're taking is that we would prefer the way Podman's thinking about it is we don't really have an opinion on format but we do have some opinion that artifacts are binary blobs that are affiliated with the manifest and that's as a layer and that's about it.
Gerry Seidman: Yeah. Yeah.
Brent Baude: And there probably is from…
Gerry Seidman: I'm just letting you know there's a disconnect then because that's not the use case. When I was at CubeCon,…
Brent Baude: where you sit.
Gerry Seidman: nobody talked about that.
Brent Baude: Yeah From where I sit there is no disconnect but because I don't really think that orus is following an OCI standard which we're more or less required to do. I mean, they're not breaking any rules, but per se, but …
Brent Baude: they're adding function on top of it. That is to say, I could do what Orus does with Podman and a bash script in a container image, if that makes sense, and a volume. you can just pardon. Yeah.
Gerry Seidman: and just expand it local.
Gerry Seidman: Expand it locally and then just expand it locally and then mount the local file.
Brent Baude: I mean that's the point of the PR that I pointed to you is when you pull an artifact it comes down as a blob now in podman in a managed directory and…
Gerry Seidman: Mhm.
Brent Baude: then you say hey and it has a name associated with it and you say hey I want to mount that into container you're going to be able to do -v followed by the artifact name and then where you want it mounted and…
Gerry Seidman: Mhm. Yeah.
Brent Baude: then when you run the container that you have to know what's in that in order to deal with it because
Gerry Seidman: Of course, that's going to always be the case with artifact. But are you saying that there's one directory for all of them? because the image name, the Or image path is that when you're mounting something, you're mounting a directory. You're not mounting a file. So, how do you reconcile the file name with…
Brent Baude: Because the annotation has to have a title. Yep.
Gerry Seidman: what you're doing? Okay. I totally hear you and again I have a bias of course but coming from CubeCon where everything was about AI and models and training sets that the conversation around this was a desire to store them
Gerry Seidman: and container registries along with provenence and along with annotations for things like provenence and…
Gerry Seidman: things like that the things you want for AI so they see that's their motivation for why it should be in a containeration got it so there already had been something called model side cars or…
Brent Baude: Yeah. Yes.
Gerry Seidman: something like that which emulated what you're talking about with the bash. and…
Brent Baude: Yeah. Yep.
Gerry Seidman: then that led to image volume. so I'm just giving you the context from the conversations I had.
Brent Baude: It's a wild west.
Gerry Seidman: So you have two different people viewing. Go ahead. Sorry. Mhm.
Brent Baude: I should say whenever my management comes and what's up with these artifacts, I just tell them it's a wild west s*** show.
Brent Baude: I literally say that because artifacts are meant to be loosely bound and non-specific and now we're trying to make it specific ound. So you can't really have both. if we really wanted to do this right and we ever thought that the OCI folks would ever actually write a standard we'd do that and…
Gerry Seidman: Mhm. Yeah.
Brent Baude: write us a definitive way to do all this but part of what makes artifacts powerful is there are no rules Yep.
Gerry Seidman: I mean I'll tell you in some sense one of the nice things about artifacts is they can have annotations like anything on the container registry can have annotations so you could do semantic stuff…
00:45:00
Gerry Seidman: but by the same argument take a file name is a file name if it happens to have a tar file format and I send it to tar thing good things happen and if it happens to be a text file and I send it to tar bad things happen so People do things in context.
Brent Baude: Yep. Yeah.
Gerry Seidman: And the nice thing about annotations is annotations in some sorts are analogous to file attributes.
Brent Baude: So, one thing we are contemplating you what you see in that PRJ it's our first just putting our toe in the water about how we think this is going to be used or…
Brent Baude: how it would be useful.
Brent Baude: we know for a fact it is the next step however is we essentially plan to expose making an artifact directly into a volume and said volume could have a driver that knows how to deal with that file. and then we would allow that, basically a custom volume plug-in driver to do whatever needs to be done with the artifact for container storage.
Gerry Seidman: …
Gerry Seidman: my bias is that underneath that is the same storage library that you use for container layers. And if you Yep.
Gerry Seidman: Yep. Because way this thing that I care about…
Brent Baude: Yeah, that is the case.
Gerry Seidman: which is additional layer storage will work for free.
Brent Baude: Yeah, I mean we're not there yet because we sort of couldn't convince the container storage folks that artifact should be part of its domain. So we do…
Gerry Seidman: Okay.
Brent Baude: what we actually did with volume drivers and that we follow the basic principles. It's in the same directory. It's just not part of the same library. So, there aren't locks for it that, we would like to see, but we are headed that way. That is a goal of mine.
Gerry Seidman: Just so I'm not trying to give you grief. I'm just trying to share conversations that I've had.
Brent Baude: No.
Brent Baude: If I didn't want to know things, then I wouldn't have bothered. I just left it with the email. but really
Gerry Seidman: Yeah, I can't tell you…
Gerry Seidman: how many times I have clients that say, "We want it." And they gave me no requirements and restrictions of what they want. Mhm. Right.
Gerry Seidman: 
Brent Baude: Yep. Yeah.
Brent Baude: And there is no emerging standard. This has been the problem with it. There's just no emerging standard way to I mean we got to write it programmatically. So there has to be some rules and we just haven't really nailed down other than some basic OCI standards we got to follow with. But how it's going to be used and how it should be implemented is, we're just not dead And AI comes up as the predominant use case right now,…
Gerry Seidman: Mhm. Yeah.
Brent Baude: but their solution seems to be ignore what everyone else does and for every model go write a special whatever for it. And I can't stop that.
Gerry Seidman: And I hear I mean there's so many groups in the AI space in Kubernetes and…
Gerry Seidman: the AI space that are developing s** the inference engines folk and the K server folks and the whatever …
Brent Baude: There must be a dozen and…
Brent Baude: a half projects in Red Hat essentially doing what's already been done for months by us, but now we're going to write it in Python and now we're going to write it in Rust. So, it's just one of these or no, we want to be able to process the file, outbound, do something with it. And, yeah, it's the which beast do you satisfy? I don't know.
Gerry Seidman: so let me give you share some explicit client stuff, being that, we're under NDA with Red Hat and you're Red Hat. not that I'm saying anything Goldman is the customer that's driving a lot of the stuff we're doing in containers and…
Brent Baude: Mhm.
Gerry Seidman: 
Gerry Seidman: open shift. and this whole, container accelerator thing I did came from requirements from Golden because they thought distributing container images was very inefficient and they have whole systems that actually use technology to deploy software. every application in Goldman is deployed using our software. Forget about containers.  And they get a lot of benefit from that because if you're distributing to 200,000 machines, you don't really want to send the full application every time to every node if it's not going to use it. So that's historically what they built around our technology. And they then came to us and said, "Look, we don't like the container how containers work. Can you do the same thing in containers?"
00:50:00
Gerry Seidman: And that's where the ALS stuff led to the thing that we wrote. Full stop.
Brent Baude: Mhm.
Gerry Seidman: Their initial group is using They're not open shift for the ALS stuff. still haven't deployed, but they're getting close. they kick the tires harder each time I give them a version. and the open shift folks are now ramped it up as well.
Gerry Seidman: So now there's that now when I had my last meeting with the open shift team they brought up AI modeling and for open shift you have the image volume and they were very interested for that purpose …
Gerry Seidman: because the image volumes can leverage ALS I haven't heard yet from the podman team but I have a funny feeling that if that it may come from that may bubble Okay.
Brent Baude: What exactly?
Brent Baude: Cuz you are talking to the P team.
Gerry Seidman: So no, no, I'm just telling you. absolutely. No. basically in open shift they're going to want to le they have the idea that they will leverage additional layer storage for loading things like models…
Brent Baude: Okay. Yeah.
Gerry Seidman: which they haven't yet thought about that in the team that's using straight pod but I have a funny feeling that that's not far. I may be totally wrong because I don't know what they're doing and they haven't actually deployed anything yet,…
Gerry Seidman: but they're thinking about how to, because they're at a scale that nobody runs at, they're running 200,000 machines,…
Brent Baude: or what as far as podman's concerned are they wanting to do additional I mean you're basically talking about artifacts in additional storage right?
Gerry Seidman: Yeah. right now nobody has asked about it with five men yet.
Brent Baude: Yeah. But what do you think they're…
Gerry Seidman: Full stop.
Brent Baude: where do you think Are they headed to wanting a single store for an entire system of root unprivileged users sharing the same models…
Gerry Seidman: They would be unprivileged. in terms of why do you bring up unprivileged users? the answer is yes.
Brent Baude: because we get
Gerry Seidman: They run everything in root list but the container registry the content has someles as well.
Brent Baude: Yeah, I mean the reason I bring it up is because additional stores of late has been a feature that's been asked about and wanted more function from across the board. we're just seeing a lot more of it and…
Gerry Seidman: Great.
Brent Baude: the use cases have sort of expanded beyond what we had contemplated when implementing that. So the one that seems to be emerging is just that there's a server or system out there and they want it's actually because they think it's more secure.
Brent Baude: They want to have a store where you can only run images from that is generally the way they're headed.
Gerry Seidman: Right. Yeah. Yeah. you need with the FS Verity stuff.
Brent Baude: I think no what they're wanting us they're wanting Podman to get involved in enforcement of their corporate policies especially in the financial services sector. So they want us to be able to implement ways to restrict users from running whatever they want.
Gerry Seidman: Yeah, the interesting thing is in podman I could actually do that with ALS on a subcontainer layer because it's sitting on top of our distributed file. because when they run a container they're running as two users. They're running as the Linux user and…
00:55:00
Gerry Seidman: they're running as the forest store user. and ALS gives,…
Brent Baude: Mhm. You have a problem.
Gerry Seidman: excuse me.
Brent Baude: Yeah. Yeah.
Gerry Seidman: Yeah, we have a very very robust security policy. People like our security policy. One of the nice things about our security policy we put to the DoD actually was we have a concept of combined identity that I'm just shar.
Gerry Seidman: The machine is keyed as well. So, …
Brent Baude: We are highly resistant.
Brent Baude: We are highly resistant going anywhere near enforcement of policy.
Gerry Seidman: I'm just sharing that I agree.
Brent Baude: Yeah. Yeah.
Brent Baude: No, no. I'm just saying that I think it's important for you to know because if you're talking to these folks, I mean, you can and you talk to the architects of Podman and he's not going to write you a cuz I'm telling you,…
Brent Baude: you name the financial services company, they've come and asked for it.
Gerry Seidman: Absolutely.
Gerry Seidman: I'm not asking for anything. I'm just sharing.
Brent Baude: No,…
Gerry Seidman: And the motivation for that combined identity it was a precursor for them to start doing first mode into the cloud…
Brent Baude: I know you are.
Gerry Seidman: because they wanted to make sure that only certain machines in the cloud without having to set up VPNs and all that. I've shared information. s nothing's happened today. I just didn't want there to be a collision course.
Gerry Seidman: I wanted you to be aware of that there may be a collision course. I have skin in the game, but I they haven't even deployed our standard ALS use case yet. So, who knows if and when they'll do the image volume stuff.
Brent Baude: Okay.
Brent Baude: Okay.
Brent Baude: Back to the point of your email. Was there enough clarification in there? Do you know what we were talking about now?
Gerry Seidman: Yeah.
Gerry Seidman: Yeah. the and…
Brent Baude: Good. Yeah.
Gerry Seidman: so if I have just as I read it so yes podman-v so what happens you did you do podman-v and something like docker colon blah blah blah blah blah Yeah.
Brent Baude: You're going to name the artifact in question and then you're going to give it a destination in the container to mount.
Brent Baude: So to follow the same host h posts inside like you say colon approach that we have today.
Gerry Seidman: Yeah. I mean there's two colon so you have a Yeah.
Brent Baude: It'll always be read only.
Gerry Seidman: 
Gerry Seidman: Yeah. Of course it has to be. and I assume so you in the -v you give a directory and the annotation you give a file name
Brent Baude: No. the way that PR works is there's a couple pieces of intelligence going on here I guess you call it.
Brent Baude: One is if it's a s single object artifact, we will then you give it the name of the artifact in the volume mount and the directory in which you want it mounted and…
Brent Baude: we'll put the one file in there based on the name that it has if there is no annotation we we name it with the hash that it's known by.
Gerry Seidman: Mhm. Okay.
Brent Baude: If there are multiple objects we have a couple of different approaches there but basically the same result which is this stuff ends up in a directory. But the reality is that's what the nuance is.
Gerry Seidman: Yeah. Yep.
Brent Baude: been talking about it so long I forgotten half of it. these are basically file mounts into the container. So if it's just a straight file mount.
Brent Baude: If it's into the directory provided if it is multiples then you get multiple file mounts into the same directory. Yep. Yep.
Gerry Seidman: Yeah. Yeah.
Gerry Seidman: Makes sense. it's the reality between you and me is we don't want people storing their stuff in the container registry because if they store in our distributed file system, they get exactly the same benefit and our security model and they could attributes in our volume to do the Providence stuff. But of course, that's a vendor solution. So, it's a hard stuff.
01:00:00
Brent Baude: Right. Right.
Gerry Seidman: Of course, if Redhead buys or store, then we can take everything else first. Never mind.
Brent Baude: I don't know anything about that.
Gerry Seidman: I'm joking.
Brent Baude: Sounds good.
Gerry Seidman: All right, Thank you so much for the clarity. Hopefully my survey was useful. and I'll just watch from a distance. if I if I do get a specific use case that Golden says we want to do this, I'll share that.
Brent Baude: Yeah, that stuff is helpful.
Gerry Seidman: It's vague,…
Brent Baude: Yeah, that stuff is helpful.
Gerry Seidman: Yeah. Because they don't know what they want to do. I mean, they still haven't figured out containers really either in general, …
Brent Baude: That's true. Yep.
Gerry Seidman: just like all the major corporations. Yeah. Yeah. For all the trade press,…
Gerry Seidman: unless you're a startup, if you're established enterprise, you're still like I don't know. All right, Thank you so much for the time.
Brent Baude: My pleasure.
Brent Baude: Take care.
Gerry Seidman: All right. sorry. I had my screen on. you had a face and I didn't have a face. So all right,…
Brent Baude: No worries.
Gerry Seidman: You have a great day.
Brent Baude: All right. Bye-bye.
Gerry Seidman: Hey, byebye.
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
```
