# Podman Community Cabal Meeting Notes

### Attendees
Ashley Cui, Brent Baude, Christopher Evich, Daniel Walsh, Douglas Landgraf, Ed Santiago Munoz, F. Poirotte, Gerry Seidman, Giuseppe Scrivano, Jake Correnti, Jhon Honce, Kevin Clevenger, Lokesh Mandvekar, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Neil Smith, Paul Holzinger, Peter Hunt, Povilas K, Tom Sweeney, Urvashi Mohnani, Vikas Goel

### February 20, 2024 Topics

 1. Podman, Kubernetes, and Image/Container Volumes - Matt, Dan
 2. Proposal to maintain podman-compose.  Povilas.
 3. Podman kube to handle vm's too?  - Vivek Goyal

### Meeting Notes
 Video [Recording](https://www.youtube.com/watch?v=1wOoZ5qPeII)

 Meeting start 11:02 a.m. Tuesday, February 20, 2024

#### Podman, Kubernetes, and Image/Container Volumes - Matt, Dan (0:48 in the video) 

 Make an image a container volume.  Discussion put off until Dan or Peter joins the meeting.

#### Proposal to maintain podman-compose.  Povilas. - (3:00 in the video)

 https://github.com/containers/podman-compose/tags

 Thinking about helping with podman compose

 Concerns: The project is dying, and there is no active maintainer.  Do we boot it again, just to have it die again?  Due to maintainers being absent, maintainers are not encouraged to contribute.  Povilas is hopeful that once it is maintained again, it will grow.

Bringing it back might cause further confusion about the current status of the project.  Maintainer absent for seven months.  No response to email or via GitHub.  

 Dan opened an issue to add new maintainers.  He asked if Povilas would be willing to be a maintainer, and Povilas agreed.

 Currently 278 issues, with no release in 10 months.  

 A discussion was undertaken on how to take it over.  FOSS has some guidelines, Brent thinks.

 Brent brought up, that if we do this, we're saying we'll work with Podman Compose going forward rather than just Docker Compose.

 The Red Hat team has been asked for support for it, just because it lives in the Containers org and we don't have much to do with it.

 Brent would like to see a name change to separate ourselves from the current project.  Perhaps a fork?  

 Matt thinks moving to a new name, still under the Containers umbrella.

 Podman team wants to be able to use yaml files compose.  Currently if a bug happens there’s no one to go to.

 Dan will contact Povilas with a name change.  

 Brent suggested a blog, but Povilas suggested to do the administration at least for now, and see if he can get others to help maintain the repository.

 We don't want to remove current maintainer, but want to add Povilas and others.

 Povilas thinks it should be up to the containers org ownership to determine the ownership.

 Given the current status, should Podman Compose be part of Fedora 40?  It is already in Fedora 40, so it will stay there.

 Given name changes in GitHub, would we need to change in Fedora too?  Chris pointed out renameing can be problematic.

 Wait one week, add Povilas as maintainer.  Delaying name change for now.  The thought to evaluate/decide by Fedora 41, or perhasp Fedora 42..

#### Podman, Kubernetes, and Image/Container Volumes - Matt, Dan - (31:57 in the video)

A way to get an image mounted into a container that is existing, both in Podman and also in Kubernetes.

 Take volumes from an image, and not have a container run them, and then mount them into a kubernetes yaml file.  Dan wants to know if there's a standard kubernetes way to do this.  Peter said he believes this exists already.

 Wiring this into Podman might be tricky.  Gerry was active in the storage community, suggests talking to a person at Google who has been working on this.

 It would be like an image path that you'd specify.  There's a CFI driver that could potentially be used, but Peter didn't have a use case, so they didn't explore it much.  

 Dan to talk to Jeremey Eder about this, he thinks it will be something that will be coming along in AI modules.  That's the use case that Dan is hearing about.  People on Peter's team have started to explore some use cases.  Peter will talk to Dan for more info.  

 Dan and Peter think artifacts might be the use case.  Gerry will send Dan email with contact info.

 Dan asked Peter if he had heard of using "volume from", which allows an existing container to use a volume from another container.

 Peter has heard of the concept, but not seen concrete examples.  

 The CSI driver that might be of use: https://github.com/warm-metal/container-image-csi-driver.  But it is using an old version of CRIO

#### Podman kube to handle VMs too? - Dan Walsh (41:22 in the video)
 Currently we have kube virt, and have created crunvm package, a runtime to use qemu from the host and take the image and run it.

 Use case Dan is looking for is basically a quadlet so you can set cgroups and other settings.  Is there a way to use a K8S Yaml file to do something similar?

 Kubevirt has an APi that allows for a VM to be created.  It just reached v1.0, a stable version.  Dan wants to know if the runtime can be specified.  Peter says there is a way to specify it by creating a runtime class. (https://kubernetes.io/docs/concepts/containers/runtime-class/)

 Basically a dumbed down version of kubevirt.  Dan thinks this might work for his use here.

#### Open discussion - (48:20 in the video) - 50
 1. Data production for appliances backup application, topic for next time.  Dan and Gerry talked about quadlet use, init containers and appliances and how it might be used.
  
### Next Cabal Meeting: Tuesday, March 19, 2024, 11:00 a.m. EDT (UTC-5)


#### Possible Topics
 1. N/A


### Next Community Meeting: Tuesday, April 2, 2024, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:
 1. Quay namespace maintenance: Consider dropping/redirecting quay.io/containers
 2. Data production for appliances backup application - Vikas Goel

 Meeting finished 11: a.m.

### Raw Meeting Chat:

 ```
 Jake Correnti
 11:02 AM
 vivek goyal is on PTO
 i think he's on PTO at least
 You
 11:05 AM
 Meeting notes: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
 Brent Baude
 11:14 AM
 relevant links for folks on this topics
 https://github.com/containers/podman-compose/tags
 https://koji.fedoraproject.org/koji/buildinfo?buildID=2403532
 https://github.com/containers/podman-compose/issues  278 issues
 Paul Holzinger
 11:15 AM
 I see some activity 2 weeks ago: https://github.com/containers/podman-compose/commits/devel/
 Lokesh Mandvekar
 11:16 AM
 Fedora has an unresponsive maintainer policy, we can do the same
 You
 11:17 AM
 dwalsh@redhat.com   Github @rhatdan
 Daniel Walsh
 11:20 AM
 podman compose versus podman-compose
 Lokesh Mandvekar
 11:26 AM
 one of the fedora infra people
 You
 11:31 AM
 tsweeney@redhat.com GitHub @tomsweeneyredhat
 Paul Holzinger
 11:34 AM
 Name change or not, I don't think it will solve any of the confusion. If anything another name will add more confusion IMO.
 Lokesh Mandvekar
 11:34 AM
 still a while, i think only after f40 is released
 Mohan Boddu
 11:34 AM
 https://fedorapeople.org/groups/schedule/f-41/f-41-key-tasks.html
 Martin Jackson
 11:34 AM
 https://dl.fedoraproject.org/pub/fedora/linux/development/rawhide/Everything/source/tree/Packages/p/podman-compose-1.0.6-6.fc41.src.rpm <- podman compose is already in F40
 Matt Heon
 11:34 AM
 https://fedorapeople.org/groups/schedule/f-41/f-41-all-tasks.html
 Brent Baude
 11:39 AM
 @mheon, @mohan based on that would be talking about Tue 2024-07-16 ?
 Mohan Boddu
 11:41 AM
 Yes
 Peter Hunt
 11:42 AM
 https://github.com/warm-metal/container-image-csi-driver
 Peter Hunt
 11:47 AM
 https://kubernetes.io/docs/concepts/containers/runtime-class/
 Gerry Seidman
 11:50 AM
 Kubernetes Sig Storage Meeting Notes:
 https://docs.google.com/document/d/1-8KEG8AjAgKznS9NFm3qWqkGyCHmvU6HVl0sk5hwoAE/edit#heading=h.bag869lp4lyz
 You
 11:52 AM
 https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
 xrq-uemd-bzy```

### Raw Google Meet Transcript

 ```
Tom Sweeney: Good morning, Today is Tuesday, February 20th. 2024. This is the padman community cabal meeting. We have a Agenda up in hack empty which I'll put into the meeting notes in a moment here today. We were going to be talking about pubman Cube to handle VMS too. But unfortunately the person who was going to leave that discussion is not here. So I'm gonna post that postpone that until the next time March.
Tom Sweeney: And what publicson welcome povilas and then we are going to talk about public kubernetes an image container volumes with Matt. And then finally we're going to be talking about proposal to maintain podman compose and then any open discussion that we may have after that. So given all that. I'm going to hand it off to you and Dan who's not quite here. You can take it.
Matt Heon: I can at least try to get a started. So the ask here is originally coming from Dan who basically wants a way to get a image into an existing container. what I mean by this is we don't want to start a new container based on the image. We want to make the contents of the image available within an existing container as a volume and podman we can already do this. We have actually two ways of doing this. We have a concept of image volumes and we have a cons They're both called image volumes. It's horribly confusing one of them goes to the podman volume command. One of them doesn't anyways pod man an abundance of ways to get images into containers. And this is very convenient for things like security scanning.
Matt Heon: However, the ask here is for a consistent way to do it that also works on kubernetes. we can basically have kubernet able that works in pod man and works in kubernetes and allows us to Mountain image both and I don't know if there's a good way to do that. It's certainly not any of the existing communities map types. You need to plug in or operator or something to do it.
Matt Heon: I think we were counting on having Peter hunt here. Who is the cryo maintainer and would have a better idea of ways we could actually do this and we don't have Dan and we don't have Peter so we don't have
Tom Sweeney: It's just trying to pull up on select to see if I can ping either one of them, but we postpone it at least till later. And what we go ahead and move on to our next topic then which was a proposal to maintain augment composed in Publius. Am I saying in correctly?
Povilas K: So I was not yes correctly.
Tom Sweeney: Okay, great. Do you want to start up the talk for us?
Povilas K: Yeah, so basically what's the purpose of this so sometime ago I started using Pokemon compose due to some reasons as Port supports. Bodman itself better than let's say Docker compose in my case. I wanted to use gvisor for security purposes. And the undocker doesn't work properly on Boardman it does. and it turns out that Pokemon composes not maintained even though there is a lot of community interest in terms of open PRS and so on. so
Povilas K: basically, I had to possible actions migrate off Pokemon compose and was something else entirely and second one is to actually The project and help and maintaining it so I chose the letter. And this is how the discussion starts? I wrote a bunch of emails and so on. And now I'm here. so I don't know. Doesn't have any questions at this point and I can answer this or can I continue?
Brent Baude: I have questions, but I think I'll hold Till we get a little further.
00:05:00
Povilas K: so basically, we discussed the I think it was.
Povilas K: Tom Sinny about how this could proceed and here is a bunch of concerns about the project itself. It's health. So I guess it makes sense to me to answer these not To town and private emails but so one was
Povilas K: there was a concern that project is basically dying. There's no community and so on and this is by
Povilas K: The focus of the government let's say project was put into Docker compose. And it doesn't make sense to shift the focus back to polmont compose just for it to die again in a year. which I give that concerns which it is reasonable and so on so I think that.
Povilas K: in terms of the health of the project the community interest is much higher than it would seem because during the last half here. On average there was one pull request opened each week.
Povilas K: this is not that by itself, but you need to keep in mind that. in a project there, it's obvious that it's not maintained. The maintenance is absent and doesn't require Polar Express and so on many potential contributors don't a popular requests and don't contribute and we don't see. Full community interest until the project is actually maintained and there's replies to issues and lower class so myself Im but positive in this area that project can live basically by itself. of course we would see but
Povilas K: yeah.
Povilas K: further concern was that again about the focus, basically What happens if the focuses which are switched? polymer composer on the dice so Pokemon project but itself is
Povilas K: it is in worse position this way. and To this concern. I think let's reply would be that.
Povilas K: I think it makes sense not to. Focus anywhere keep it like it is just leave the project love. And let's say not promote that Pokemon composes the accepted way to do compositive. or something like that and if it's not enough a personal liquid degree or not to promote compose as some very great project so that People will not be confused. In case let's say I lose interest in the command center here. So
Povilas K: basically this would reduce the chances for any downsides. That maintaining the project but damage on. same former project anyway
Povilas K: on the other hand, there are benefits that.
Povilas K: It's possible to. Expose podman specifically what month the important console compose much better than the locker compose because of actually we cannot. expose permanent specific functionality there And for example, there could be Specific prefixes and the composer jump file and so on. And for example in my personal case hormone composer divorce Department better because gvisor works and Docker case. It doesn't properly for example, I couldn't start.
00:10:00
Povilas K: Docker compose exactly and the locker container which is using Giuseppe's basically not useful at all.
Povilas K: So yeah, I think that's it. What about what I wanted to say?
Povilas K: maybe about the state of the current status of the project internship So the current maintainer has been absent for I think seven months.
Povilas K: I wrote. A total. not only me but during the discussion with Tom the secede the current maintainer we had on every email. So he got an email was during last two months, but one of Jenner. And I'm not aware of any reply. But we got from him.
Povilas K: and the project itself he has been absent for six months and marriage a couple of bullet pull requests recently about two weeks ago and this broke Altus and thank you and
Povilas K: for our activity for two weeks. So yeah, no indeed finished. So, what do you think?
Daniel Walsh: so I opened up a
Daniel Walsh: issue to basically add other maintainers to I package. But I specifically said that if he didn't show up for another month that we'd be able to do The problem I have is I'm not sure who to add. Do you think you able to do this are
Povilas K: Was this question to me?
Daniel Walsh: did you want to be a maintainer of podman compose?
Povilas K: Me personally and I would take responsibility for making releases and making sure that God qualities good enough.
Daniel Walsh: Yeah. Yeah, the question I have is that a hostile Act?
Daniel Walsh: and showing up but at this point If he's not responding, he's not responding any emails or anything like that, right?
Povilas K: Not that I know.
Tom Sweeney: Yeah, and I sent a note or I don't know if it was a good Pub issue or whatever. Just after povilas and I first talked and there's been zero response to that and it was pretty pointed. are you there kind of thing?
Daniel Walsh: All we gone a full month since I opened up that issue.
Brent Baude: Just a little more data. So there's 278 issues. So that little repo has. Almost as more than half of what we have as a container runtime for unclosed issues.
Daniel Walsh: Yeah.
Brent Baude: It hasn't had a release in 10 months.
Brent Baude: It's unfortunately in ora. But hasn't really iterated on versions of the 10 months.
Daniel Walsh: Okay, I will do it if povilas can you ping me one week from today? Because that'll be a full month since I open that issue at that point. I will add you if he has not It's not commented on that then I'll add you as a maintainer at that point. You can add other maintainers to the project.
Brent Baude: I swear at one time Foss had rules for hostile takeovers. they had a general guidelines.
Daniel Walsh: this is not for boss. So this is for the GitHub. so that
Brent Baude: I meant for this kind of situation is what I meant for projects that. the maintainer has gone in I swear that Foss wants release. these are the steps. We'd like to see people take anyways.
00:15:00
Daniel Walsh: Yeah.
Brent Baude: so if that occurs then
Brent Baude: And we do that. We somewhat pouring salt on our own wound in the sense that The Branding around toddman composed has given us. fits
Daniel Walsh: Yeah.
Brent Baude: So I'm wondering is if we feel that if we're saying. I guess publicly. We think pod man compulsion continue to exist if we do this. Which I've not necessarily opposed to but perhaps one thing we might want to ask is for a rebranding on the name.
Brent Baude: So as part of it. change to some other name
Daniel Walsh: decompose
Brent Baude: I think that could be up to the new maintainer frankly, but I wonder if that is more of in the spirit of an open source.
Brent Baude: Thing and then secondly, it kind of helps both parties. So I'm just explain where Bradley one of when I say that it's like putting salt on wounds What I mean, is that Dan and I and the team are frequently asked about supporting on men composed because or somebody has decided to use it in combination with their Rel subscription. And we really don't have anything to do with the project. Itself other than at one point we gave it a GitHub repo under containers. That's been basically our affiliation with it.
Brent Baude: So I just would like us to consider that I'm not suggesting we have to do that, but that would help both parties. in my mind and would be a cleaner break. So we technically more calling us a fork I think. supposed to take over
Povilas K: I can comment on that from my perspective. So I think that.
Brent Baude: Thank you.
Povilas K: Portman compose just being an under container suppository gives it. Let's say a common economical place where developers who want this kind of functionality can meet.
Povilas K: it helps the project attract contributions. Just by being under container suppository. and now in terms of Itself, I understand this concern. I wonder if it would be possible to explain that. common compose is
Povilas K: composed support for podman But Portman team doesn't maintain it.
Povilas K: the best user can do is to open initial on formal r compository. And wait for answer. Is it possible to consider this or rename would be better from this regard? Because I consider that for then the developers who could contribute to Portland compose would basically
Povilas K: Wouldn't have a clear place together. And wouldn't be incentivized contribute. Let's say if the project is placed outside of containers would help organization,…
Daniel Walsh: We're not suggesting that we move it outside of containers.
Povilas K: then it's just running project. Why?
Brent Baude: Correct. But yeah,…
Povilas K: Okay, okay.
Daniel Walsh: with so the
Brent Baude: we would be happy to continue to have it there. Maybe just looking for a new project name.
Povilas K: Okay.
Brent Baude: Sure, of course. Yep.
Daniel Walsh: Sleep the big confusion comes in is that we have a pod man space composed command now, which will execute either darker compose or pod man compose depending on what you have installed. And people are surprised when it isn't podman Dash compose. And that's where the naming, Just basically…
00:20:00
Povilas K: Right, right.
Daniel Walsh: what we want to support. yeah, I don't think supports the correct term, but we want to allow people to use compose.
Daniel Walsh: Yaml files against podman. That's our main goal. and the easier thing for us to support since we have to support it is
Daniel Walsh: Is Docker composed because that talks to our API server? Whereas if there's a bug in pod man composed None of the people that tain pod man composed. We don't work on that. So that's where the pod man composers talking to the client and Doctor composers talking to the API server.
Povilas K: Okay.
Daniel Walsh: So anyways, let's do that this week and we'll rename the thing to be P compose and If that's okay with you, do you like that name?
Povilas K: I can think about it. but
Daniel Walsh: Yeah, all right.
Povilas K: For now,…
Brent Baude: Why don't you think about it?
Povilas K: it makes sense.
Brent Baude: and Then we can use that same issue. You can put a name in there. before we do the swap. I asked Tom a private question,…
Daniel Walsh: Yep.
Brent Baude: but I'm gonna put them on the spot now.
Brent Baude: This is a little bit also, maybe I shouldn't offer this but we could blog about this change on podmanio what we can provide with an opportunity to blog about this on podmin iO to get the word out that Essentially, this is what's going on. And this is the intent. and that you intend to
Brent Baude: Begin, reviewing and merging and all the normal Upstream activities.
Povilas K: I think that for now it makes sense not to do that. Just silently.
Brent Baude: Okay.
Povilas K: But silently Revival project and that's a because again, what happens if I lose interest in half year. Let's say I'm not
Daniel Walsh: Yeah, that's why I want you to get other maintainers on this so that there's more than So we don't have a single point of failure that we have right now. so…
Povilas K: Yeah.
Daniel Walsh: if you can get a couple other people were actively looking to maintain it and that would be the best possible outcome and I would still allow. A capital's name that current the person. I originally created to continue to work on it as well as a maintainer.
Brent Baude: Yeah, the other bit was I gave a Koji link there. Does anyone know the person that was building it? profodora Gwyn Maybe I'm pronouncing that correctly.
Martin Jackson: It's going sequence.
Lokesh Mandvekar: Yeah.
Martin Jackson: He's one of the main she may change a lot of packages.
Brent Baude: Okay, so this is more like probably something fell out of. Maintaining ship and she ended up with it.
Martin Jackson: Yes. Yes, I remember because I was involved in that threat on the Fedora list.
Brent Baude: Okay.
Tom Sweeney: So going forward again in public. We'll get this phone up and see where it goes and perhaps and…
Daniel Walsh: Yeah.
Tom Sweeney: have some updates at the future ball meetings.
Daniel Walsh: So the 26 is one month after I wrote that email. So I mean that issue.
Tom Sweeney: Sounds good. It's Loveless. Thanks.
Paul Holzinger: it's also also clear that the maintainer head activity on the repo to weeks ago and if he doesn't respond to Depending on guitar or emails, and I don't know, there's much we can do it other than ask him and If that doesn't want them.
Daniel Walsh: I'm not gonna remove him as a maintainer. I'm just gonna add other maintainers. I think that's…
Paul Holzinger: yeah, I think that's yeah.
Daniel Walsh: how we Yeah.
Povilas K: from my point of view If a repositor is under containers organization, then the end owner of repository is containers or organization. And the current maintainer is bound to its rules. And if he doesn't agree then another material can be chosen or red. And then let's say half a year of inactivity I guess is not Good enough level of maintainership.
00:25:00
Povilas K: Containers organization than chosen our maintainer and the current maintainer if he wants to maintain the project the current level of activity he can do it in his own.
Daniel Walsh: Yep.
Povilas K: Fork
Brent Baude: In any action we take would we be keeping the current maintainer on the list of owners? So no permissions would be revoked at this time. very well.
Povilas K: Yeah.
Daniel Walsh: right Until unless he started act hostile to exist and then we might have to take action.
Brent Baude: I frankly don't think you have to wait another week to just add him as a maintainer,…
Daniel Walsh: But yeah.
Brent Baude: but that would be my two cents.
Daniel Walsh: Yeah.
Tom Sweeney: Yeah, I convert that could be done. I also think that we're kind of fuzzy about our roles for a situational like this and there's a takeaway. This might be something we want to add somewhere in the containers or itself what happens when the maintainer disappears?
Daniel Walsh: Yeah.
Tom Sweeney: Yeah. I don't think we have that very well specified. And would be good to list what are the steps that we'll be taking to move them or…
Daniel Walsh: it's The first time it's happened.
Tom Sweeney: not? Yeah.
Daniel Walsh: So I mean probably a lot of dead projects on containers, but this is the more first one where people are very interested in bringing it back to life.
Tom Sweeney: pushing forward
Brent Baude: So that's the question given the Upstream situation here. should
Brent Baude: Department composed not be carried forward to Fedora 40 right now.
Brent Baude: Martin lokesh
Lokesh Mandvekar: I don't think we control
Povilas K: Should not be.
Brent Baude: I'm sorry.
Lokesh Mandvekar: whenever there's
Brent Baude: I didn't hear either.
Lokesh Mandvekar: If you want to go ahead.
Povilas K: I just wanted to double check should not put Pokemon compose in. Fedora Forte or
Brent Baude: I was wondering if it should be not move forward but I think we would have needed to meet a date much earlier. but
Martin Jackson: I think the package might already be in the Fedora 40 composes.
Povilas K: a further question so about this previous discussion about the name and so on so just let's say imagine that the podmon compose takes the best possible path and this properly maintained and rich as part of the docker components on
Povilas K: So question I want to ask. What we still consider the naming issues in that situation. let's say a problem composer was maintenance and good quality All the time. So what we consider when having still
Tom Sweeney: I'm not sure. No.
Daniel Walsh: So I guess the question is the repo important or is the package name inside of Fedora are important.
Daniel Walsh: Yeah.
Brent Baude: my two cents would be that if it was properly maintained we would have no Notification for coming in and no cause to come in and ask for a name change as part of anything, but that would be my sense. I still however wouldn't like it. But I don't think any action I wouldn't be advocating for action. And usually I'm the more aggressive of the bunch.
Martin Jackson: so would
Povilas K: Maybe
Povilas K: Maybe it makes sense.
Martin Jackson: Sorry, go ahead photos.
Povilas K: Maybe make some stupid half a year and see what happens. And if you are not satisfied and then your name project.
Daniel Walsh: Sounds good.
Christopher Evich: Just had quickly.
Brent Baude: Think we can. live with that
Christopher Evich: Renaming stuff can be problematic. Far as the internet goes and links and stuff, especially. the project gets popular and gets blog articles pointing to it and It could cause some issues.
Brent Baude: So is that a vote of doing it now before it gets even more popular?
Christopher Evich: Yeah, I would say to either do it earlier. Don't do it at all and I have no problem. Took up real to say either way.
00:30:00
Martin Jackson: And there are definitely some well understood mechanisms within Fedora to do a package name change like that.
Tom Sweeney: All right. I'm just looking at the clock and looking at the couple other topics that we have so during wrap this up somehow perhaps
Brent Baude: I think we're ready. we decided we wait one week. And then on and then Adam is an owner.
Daniel Walsh: Yep.
Martin Jackson: he
Brent Baude: depending on the original maintainers. actions we have sort of delayed the possibility of a name change.
Daniel Walsh: Sounds good.
Povilas K: So how much time would they have so half a year was suggestion? What would be you'll be comfortable with?
Daniel Walsh: Sure.
Daniel Walsh: Let's see how it goes in six months.
Brent Baude: How about before? So anyone happen to have the Fedora 41 schedule?
Matt Heon: It would be about October call it.
Brent Baude: not why I know that's the release but when's the proposal for name changes have to be in
Martin Jackson: because
Matt Heon: I don't know if they finalize it. I will check but
Brent Baude: okay, so what we can dig that up, but my personal opinion would be decided by then. And if you don't decide then decide by the one in the spring being just as a natural guideline.
Tom Sweeney: Okay.
Tom Sweeney: Anything else on this? I've been trying to move it along trying right gonna look back to the original topic since Peter and Dan are here now. We were talking about odd man kubernetes and image container volumes Matt. You want to kick off where we want?
Matt Heon: Sure, I mean Dan this is really your show but the general ask here is that we want a consistent way of having an image that gets mounted into a container not gets created into a container business mounted into an existing container that works on both podman and on kubernetes. Does that sound accurate Dan?
Daniel Walsh: Yep.
Matt Heon: and I
Brent Baude: Why do I want this?
Daniel Walsh: What people are looking? we have multiple pull requests where our multiple people talking about mechanisms for data around to be used with containers so that the one I'm interested in is the
Daniel Walsh: And AI model, which is usually a massive multi gigabyte size data stream. and people want to run that in both open shift and with podman and in pod man was saying package it into a container image, then you can push to a registry and pull it. And then mounted as an image into a volume. There there's a pull request of right now where someone is doing some very similar where they want to take. Volumes of image and not have a container running but take the volumes from an image and not them into. a kubernetes yaml file and really what I'm looking for is that if Peter or others have ever heard of something like this in standard kubernetes because I don't want to have a pod man only way of doing this with a kubernet channel.
Peter Hunt: There is a project. that did and I'm probably gonna sail to find it on the spot right now.
Peter Hunt: But it's a vault. basically kubernetes is a concept of the volume plugins. So all the clouds can have their wasted inject the volume into container, but someone created a volume plugin for mounting an image into container and I think it actually does use container storage.
Peter Hunt: So that project does exist. CSI driver,…
Gerry Seidman: Okay.
Peter Hunt: that's the phrase so container storage interface driver.
Peter Hunt: but wiring that into pod man would be tricky so you could have the same sort of interface but it wouldn't work exactly the same because there wouldn't be this extra process to actually doing the volume Management on the Note itself.
00:35:00
Daniel Walsh: But is there a way in the kubernetes GMO file to specify you want to use one of those?
Gerry Seidman: Then I used to be very active in these storage Community. I haven't attended in a year. the person who would be a good source to know would be Michelle Howard at Google. Because she's kind of the cat herder and would be wearable the projects in kubernetes storage. I have a contact information.
Daniel Walsh: could you send me the contact information?
Gerry Seidman: actually
Daniel Walsh: I just don't want to have something, possible if there was a way that people tend to do this with kubernetes yaml file then we could Write the similar yaml file for podman and then have podman interpret That mechanism rather than that's correct creating something for the whole cloth.
Peter Hunt: Yeah.
Peter Hunt: But part man currently have support for some CSI drivers like the one that makes sense host path and stuff like that. So would look similar to that support basically,…
Daniel Walsh: right
Peter Hunt: but you would specify different type.
Daniel Walsh: but an image path and then I'd have the name of the image something like that.
Peter Hunt: Something like that. Yeah, and if you wanted to base it off of this existing project which I'm still trying to find then they would have the API that you could emulate already, but It's not built into Cube itself. So it wouldn't immediately translate into Cube you'd have to load the TSI driver first and then Use it so it would be direct sort of. presentation
Daniel Walsh: right
Daniel Walsh: my goal would be that could take that lunch inside of openshift is That likely to happen.
Peter Hunt: Yeah, you'd have to deploy that CSI driver. We had talked about it a while ago, but we didn't really have a concrete use case for it. So we didn't do it. So I think we'd really need a compelling use case to included an open trip by default, but I wouldn't be surprised if they would Operator aside and then it would be easy to deploy on openshift. And then we just have to remember to do that before applying the analog from service but
Daniel Walsh: Right, so I'll talk to. Jeremy Eder about this and see if because I think this is something that's going to be coming in the AI models. That are being generated.
Daniel Walsh: just because you don't really want to have your application and the AI model in the same container image. and So that's the use case. I'm hearing a lot about and as I said this person opened up a pull request for a different use case, but it seems similar that they wanted to be able to ship something as to know CIA image and use it as a volume.
Peter Hunt: Yeah, someone who's been on the cryo team on my team. Sohan has been looking at a similar use case, but also with sea run Walsham, but using oci artifact as sort of a volume that would allow for transporting it. So we're thinking about this a little bit too. Would you include me in that conversation with Jeremy and we can try to find a unified for a path.
Daniel Walsh: Sure.
Daniel Walsh: Yeah, and artifact it, there's one of those things is that affect the right thing. I don't know. It's
Peter Hunt: Tactically it would be I mean probably eventually you'd probably want a defined artifact type for this model. So then the engines could interpret that type and…
Daniel Walsh: yeah.
Peter Hunt: know that it's not actually gonna run anything. It's going to be injected in as the volume or something like that, but that would take negotiation the oci which I don't think it's really been done yet.
Daniel Walsh: right All right, Gerry, so if you can send me an email with the contact information.
Peter Hunt: Thank you.
Daniel Walsh: And then I'll follow up with Peter and…
Gerry Seidman: Yeah, keep looking for them.
Daniel Walsh: Jeremy to talk further.
Gerry Seidman: I'm not finding it right away, but I'll keep looking.
Tom Sweeney: And you have Dan's contact info jury. I put it in the chat if you don't.
Gerry Seidman: Yeah, I do. I have danced nothing. Now I found it.
Daniel Walsh: He has my contact information.
Gerry Seidman: I found it.
Daniel Walsh: And Peter,…
Peter Hunt: just
Daniel Walsh: have you ever heard of anybody using volume from? type construct and
Peter Hunt: look these volume from not what no, let us.
Daniel Walsh: so, not darker invented basically around one container and then you can say run a second container with the volume is from the first container. shade into this container
Peter Hunt: because kubernetes like things about pods all there's the volume which is separate from the container.
00:40:00
Daniel Walsh: right
Peter Hunt: No but you can do it. it's not that you don't put the container idea like the Pod name. You just share the volume among different pods. So
Daniel Walsh: yeah, that would seem to make more sense but I think we had images then we'd be able to satisfy. The person was looking for why I'm a scrum inside of a club. So
Peter Hunt: And I don't know I think I did find the CSI container energy suicide driver. So I posted it in chat. And Ice I don't know if there's where it's gonna live long-term. It looks like they're going through some renaming stuff but maybe an acquisition happens or something like that, but there's I think so when I was like we were looking at a while ago.
Daniel Walsh: Yeah, at least it looks like it's a little bit active so. As the two weeks ago.
Peter Hunt: So they're using quite an old version of cryo. So, who knows? but three minutes
Daniel Walsh: We move on to the next one Tom.
Tom Sweeney: And at the moment, that would be open discussions. didn't have no proposal for that. We had something from Vivek about modern Cube to handle VMS to Dan. I don't know if you want to talk about that now today or wait till he's here. He's on vacation. Thank you forgot about this vacation time.
Daniel Walsh: Yeah.
Daniel Walsh: 
Daniel Walsh: that I think basically the basic idea right now we have Cooper which is basically taking a VM putting it inside of a container image and then all the tooling to run the
Daniel Walsh: Run the Q go to inside of kubert.
Daniel Walsh: We've recently created a package called c-run VM. which is a oci runtime that we'll use the Cuke out qmu from it's defaulted to qmu, but we'll run Q mu from The Host. And take the content of the image and run and basically look for a q cow too inside of the image and run the use case we're looking for is basically like a quadlet where you'd have a machine boot up and you want to have a VM that's managed as a container.
Daniel Walsh: So, inside the quadlight you can set its c groups you can set it's different flags things like that and then have it So we have support for that by specifying the oci runtime inside of the quadlet and What's been asked about Basically, is there a way that we could use? Kubernetes GMO file which I believe has the mechanism to specify an oci runtime inside of the ammo file and do something similar.
Daniel Walsh: And Peter, do you know if I'm talking truth or am I making things up?
Peter Hunt: So yeah, there are. So cubic provides an API for creating VMS and that's seven from the Pod API to look like the cupid API is like it's own. API embed like it's integrated into kubernetes the cubic crd.
Daniel Walsh: right
Peter Hunt: So yeah, there is the cute Brent API which you could sort of emulate that they did just semi recently last couple of months reach one. so at the stable API now which would be a good time to sort of adopt it and…
Daniel Walsh: We're actually.
Peter Hunt: it I would
Daniel Walsh: We're not talking about the coup bird API we're talking. Is there a mechanism right now to specify I want to use Sea run instead of unsafe.
Peter Hunt: yes the Pandora runtime class mechanism. So kubernetes there's an extra sort of type A runtime. Class and you define a runtime class and then it basically just maps to a string name. And then in the CRI implementation the cryo that it would have to be configured to have that main map to something so You could have a runtime class. We created in pod man, and then have that run and then pods would use that runtime class.
Daniel Walsh: So basically the idea this would be a dumb down version of Cooper. and that you could just take A container image and…
Peter Hunt: I see.
00:45:00
Daniel Walsh: use and specify the runtime class of sea run I see run via and that would basically use qmu to launch a launch the cute cow, too that's inside of the image. That's all it would …
Peter Hunt: right
Daniel Walsh: and that you've got to that could be a Windows machine. It could be any type of machine but not taking advantage of any API.
Peter Hunt: Yeah, so yeah the runtime class I posted the Lincoln chat that you would want pod man to learn to have the runtime class as an object.
Daniel Walsh: There what?
Peter Hunt: It understands and then the Pod itself could I guess you wouldn't even necessarily to create the runtime class. You could just have it. there's a pod of runtime class name and you could just have that map to whatever runtime you wanted to use.
Daniel Walsh: Yeah, that's probably exactly what we want. And obviously I don't want to compete against kubert but Cooper won't work currently doesn't run with pod man, because we have to have some API server, which we don't have so This would be a simpler mechanism for just running the amps on any thought man.
Peter Hunt: right
Daniel Walsh: And then theoretically we could pass that on to cryo and have it run, the same workloads.
Daniel Walsh: That's good. I'll bring that back.
Daniel Walsh: as a mechanism
Tom Sweeney: Vivic watches the videos for me, so he'll probably hop on there too. right any question
Daniel Walsh: The sea run VM should be packaged for Fedora very soon. It should be in 40.
Tom Sweeney: Right, we're running up to the end of our hour here and just want to open up for any further discussions or questions that anybody might have.
Gerry Seidman: Then you should have an email Michelle. So I picked information now.
Tom Sweeney: here in the whole
Gerry Seidman: and that It was interested in Sig storage. That's the landing page for that
Gerry Seidman: in chat
Tom Sweeney: And sort of passing that along Jerry. Let's go for open questions. And I'll just put up a reminder that our next ball meeting and it's not February 20th. I don't have the exact date. You'll be the third Tuesday in March. Which looks to be March 19th, I'll change that in the agenda. And then our next community meeting is in April and that's on the first Tuesday of the month on April 2nd. We're looking for topics for both of those. We do have one possible topic for the next time around currently. We have a cui IO namespace for containers podman building and scopio. We're considering dropping that. So if you have any thoughts about that, please send us along to me. And again one last chance for questions.
Tom Sweeney: quite punch
Kevin Clevenger: Vikas, did you want to discuss in a containers?
Vikas Goel: he I'm from…
Gerry Seidman: Okay.
Vikas Goel: where it does. Technologies And the use case here I have is primarily around data protection as a backup appliances. the appliances we are building is based on real a.8 right now and it runs very tasks proprietary in a backup applications. And there are two or three different use cases I have and I don't think in the next 10 minute.
Gerry Seidman: Okay.
Vikas Goel: I'm going to be able to finish that so it can how do I include some topics or send you topics for next meeting?
Tom Sweeney: Yep, I've put my email and in the chat and messages and then you can also just put them directly into the agenda here which I've included in. chat and vikas Tom's when you read…
Vikas Goel: Okay.
Tom Sweeney: how didn't get up if you want to read that way as well.
Vikas Goel: Okay, cool. Thank you so much. I'll add that over there. Yeah.
Tom Sweeney: Okay, Yeah be happy to have more topics always looking for good topics.
Vikas Goel: Yeah.
Gerry Seidman: that actually makes me think of going back to the data in a container image But why do they want to do that? I mean they're taking advantage of the overlay file system. because the reason I thought of that is I just remembered in kubernetes something that people do is they have an init container, but really it's because reminded me they have an innate container that will download from a good repo or a tar file or something expand the content into a shared volume from between the init container and the application container.
00:50:00
Gerry Seidman: So that's how some people are doing. obtaining data you don't get the caching that you would get with it was downloaded as a container but
Vikas Goel: So if I were to explain my use case over here, as I talked about backup application netbackup.
Vikas Goel: And this is Appliance right physical appliance that customer deploys is not connected to Cloud as such…
Gerry Seidman: space problem
Vikas Goel: where you can just go to registry and download it. It runs in a very secured environment and environment where the appliances don't have access to outside world.
Gerry Seidman: I was going the other way. I wasn't saying that this would be a solution for you. I was saying that what you said reminded me of how people were using an incontainers to address the issue the danboro.
Vikas Goel: Okay.
Daniel Walsh: I mean the first of all having a container doesn't add any value there, It's
Gerry Seidman: exactly
Daniel Walsh: yeah, so really what we want is we want to have a relationship between a container and in an image That is both Can live independently. So again using the AI model you have this huge model. Gigabytes in size and that can get updated periodically and that could be used by multiple containers. So you might have four or five six different apps that are all using a model
Daniel Walsh: so the question is how does that AI model get on to my kubernetes cluster or how does it get on to my Edge device. So how do I get updates the managed device and
Gerry Seidman: Yeah.
Daniel Walsh: There's no real container involved in this it's just the data and…
Gerry Seidman: Yeah.
Daniel Walsh: and I'm surprised that this doesn't come up more often and just what they AI. It just screams for us up like this.
Gerry Seidman: yeah, but we have lots of customers doing that but We just have a CSI driver and a distributed file system with good caching.
Daniel Walsh: But obviously you can do this is the file systems,…
Gerry Seidman: Okay,
Daniel Walsh: but that's not Cloud native, Yeah. yeah, I mean a lot of case you probably better off doing it as not moving gigabytes a day or…
Gerry Seidman: .
Daniel Walsh: around and using some kind of shed network storage to do it It just come up.
Gerry Seidman: right
Daniel Walsh: It's like, but if you thought about it as Hey, I have this really cool AI app I want you to try. And we could say hi. Okay, how do I get it? go Download this quadlet and run it on your system and the quad that then would take care of downloading all the yeah.
Gerry Seidman: just yeah.
Daniel Walsh: as we say
Daniel Walsh: Download the quad let's start the quad that and go to lunch because when you get back, it'll be ready to run because it's gonna take an hour and…
Gerry Seidman: Problems. Yeah.
Daniel Walsh: so how do you deal in them in that world, right? Yeah.
Gerry Seidman: Yeah, and that's I think in the kubernetes world the way they deal with that is they put the model and GitHub they and it container. That does that. Good the downloads and chairs.
Daniel Walsh: So the nicotine it goes out and basically either downloads and figures out a way to set up an investment or…
Gerry Seidman: exactly
Daniel Walsh: your case and AFS whatever and gain access to that Provides it as a volume check…
Gerry Seidman: Yeah, right.
Daniel Walsh: what else?
Gerry Seidman: Yeah, and then with the DNA container approach you don't need to see a side driver.
Tom Sweeney: It sounds like it'll be an interesting discussion for next time. Difficult go ahead and stepped out a topic. Feel free to change my wording. you see fit. And with that I'm going to stop recording and fix books for coming here today.
Gerry Seidman: but thanks.
Meeting ended after 00:54:22
```
