# Podman Community Cabal Meeting Notes

## September 21, 2023 11:00 a.m. Eastern (UTC-5)

## Attendees: 
Aditya Rajan, Anders F Björklund, Ashley Cui, Ed Santiago Munoz, Jake Correnti, Justin Jereza, Lokesh Mandvekar, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Tom Sweeney, Valentin Rothberg

## September 21, 2023 Topics

1. Default settings for Podman 4.7
    * zstd:chunked + gzip by default
    * default_rootless_network_cmd = "pasta" by default
    * Deprecate podman generate systemd
    * Deprecate CNI
    * Others
    

### Meeting Notes
Video [Recording](https://youtu.be/By7wb1tOvLc)

Meeting start 11:02 a.m. Thursday, September 21, 2023

#### Default settings for Podman 4.7

RC1 is out now, possibly RC2 this week, and Podman v4.7 final next week.  
Configuration changes discussion.  SQLite DB is not default but is available.  Matt would like to swap the default DB to SQLite for the v4.7 code.  Not currently in the main branch, but can be done easily.

Tom asked if it could be done for RC2.  Might be too soon to release. Could we do Podman v4.8 in late Fall, then v4.9 in January 2024?

OK for 4.8, maybe to do for late November/Early December and then target RHEL 4.9 for RHEL.

For 4.8 we will do SQLite, and then plan around what else will fit in there.

Valentin brought up that there is work to be done before just flipping it.  He also thinks we should not merge "features" into any RC.  Can be toggled by containers.conf setting.

Podman v4.7 has branched, and changes to main can be done now with SQLite being the default.

zstd:chunked not ready for primetime.  Giuseppe says to push out for now and not deliver.  Hopefully to be completed in the next few weeks.  Maybe in time for RHEL 4.8.  However, Valentin is concerned this might break existing images and it should be pushed to Podman v5.0.  Risk management needs to be completed before we add it in.

zstd:chunked needs a lot of soak before we deliver for RHEL.  It won't be ready by Podman v4.8.  A meeting to be held later to discuss delivery in more detail.

Default network to "pasta".  Paul doesn't think this is stable enough now.  He wants to wait for networking stuff to get working.  Mostly work to do in Podman, a little from the pasta project folks.  We will need to get a prioritized card for pasta development.  

About a week of coding for Paul, then dealing with port forwarding and adjusting from there.  That's harder to estimate the time necessary.  The team needs to prioritize this.  Matt would like to see this in Podman v5.0.  Users are using it now, and are fixing bugs and stabilizing.

Podman v5.0 delivery sometime in early summer is current thinking, but not a commitment.

A lot of the breaking changes anticipated for Podman v5.0 are 'podman machine' related, and less likely to be in the Podman commands.

Podman v5.0 list of features doc to be put together by Matt in the next week or two.

Deprecate podman generate systemd is deprecated, but not dropped.  A warning is issued now, no new features only.  It could be kept as deprecated for Podman v5.0.

Matt talked about dropping CNI in Podman v4.8, Tom questioned if it should be Podman v5.0.  Matt will put a deprecated notice in soon.  Then Brent is fine with dropping on Podman v5.0, Brent to put it together.

Ideally, Brent thinks Podman v5.0 in the early Spring 2024, then v5.1 before Summit in May 2024.   Paul is concerned about showing too many warnings during runtime for CNI but is good with documenting.

Tom to run down the deprecation notice of CNI in RHEL 9.3.

Anything else to be changed in Podman v4.8?  Brent would like a containers.conf version 2.  Brent would like JSON.config to be the same for all providers in podman machine.  Also, a transition from v4 to v5 of podman machine would not be a thing, to be debated.

Brent is looking to not overtax the team on machine migration issues.

Specgen work is also being considered for remote capabilities.  We may also need code refactoring between "local" and "remote" within the code.

A discussion to be put into GitHub after the initial changes are identified by Brent, Mark, and Matt for what changes should be in Podman v5.0.  So the community can add their own thoughts and requests there.

#### Open discussion
1. None
 
### Next Meeting: Thursday, October 19, 2023, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
1. None discussed


### Next Community Meeting: Tuesday, October 4, 2023, 11:00 a.m. EDT (UTC-5)

#### Possible Topics:
1. None discussed

Meeting finished 11:54 a.m.

Raw Meeting Chat:

```
Brent Baude11:04 AM
is it the default in main branch ?
You11:06 AM
Anders, sorry about dropping you the first time, hit the wrong button
Martin Jackson11:08 AM
This was something we talked about previously doing for the 4.7 release
Matt Heon11:09 AM
And then, unfortunately, completely forgot about... Other priorities intervened
Brent Baude11:32 AM
no
Jake Correnti11:42 AM
get rid of migrateVM in machine. already tagged on gh
Brent Baude11:54 AM
i have a question for the team ... but can go last, should be quick

```

### Raw Google Meet Transcript

```
xrq-uemd-bzy (2023-09-21 11:02 GMT-4) - Transcript
Attendees

Anders F Björklund, Ashley Cui, Brent Baude, Chetan Giradkar, Christopher Evich, Ed Santiago Munoz, Giuseppe Scrivano, Jake Correnti, Leon N, Lokesh Mandvekar, Martin Jackson, Matt Heon, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Shion Tanaka (田中 司恩), Tom Sweeney, Tom Sweeney's Presentation, Urvashi Mohnani, Valentin Rothberg
Transcript

This editable transcript was computer generated and might contain errors. People can also change the text after it was created.

Tom Sweeney: Good morning This is Thursday, September 21st, 2023 already just a few days away from fall. This is the Podman Community, Cabal meeting. We have just one discussion point today. So I hope people brought good questions for. So we can fill up some of the time that I'm sure we'll have. And with that said, I'm just going to turn it over to our one topic and Matt had decided to eat that and I'm sure Brent can also jump in. Also And let's talk about default settings for appointment 4.7 which just came up Matt.

Matt Heon: Okay, so we have podman 4.7 rc1 out. Now we're looking for in RC

Matt Heon: We might do an rc2 this week, I'll put it that way. And then we are definitely doing a 47 final next week just to get schedule out the way. And we're at a very late point in this release but it's still not too late for us to discuss certain configuration changes that we'd like to make because we'd like them to soak in Victor or for a while before we put them in Frankly but also because we'd like to get these out as soon as possible. So actually start using them. the more important ones here is switching default database. We had the SQLite driver added in odd, man for six, but we haven't made it default yet. We've been letting it sit and I think at this point, we're pretty happy with how stable it is. We've been running it through I extensively. We haven't had issues. So we would like to swap the default database from both DB to seek light for new installations only in 4.7

Matt Heon: Going to be supporting the BOLD database and if you have a existing volt database you'll keep using it. But SQLite will be the default for new installs and four seven or at least we'd like it to be.

Matt Heon: And I believe there were some other things called out in the default features.

Tom Sweeney: Before we go there, Brent had a question in the chat, Matt.

Matt Heon: Sure, it is not the default in the main branch bread. So we would have to get this developed in over the next week. But at this point, this is an hours worth of code. So this is not a difficult thing to get.

Brent Baude: I'm the only reason I asked is it would seem? I mean I want to make the change to so I'm supportive of whatever decision, the team makes, but it was seen reasonable That. For one development cycle, it would be the default in the main branch.

Brent Baude: while we work on for eight or whatever ends up to be, Just so that. We have a little bit of silk time on our own hands.

Tom Sweeney: No, would it be possible to do that before our C2?

Matt Heon: We were not initially planning on an rc2. If I worked on it this afternoon I think there's a decent chance we could get it all done. But it would be cutting it very close. Paul and Valentin. You and your answer.

Paul Holzinger: And in my opinion doing this no is not in the purpose of doing an rc1 and it's not expectation and we say we are feature of frozen and we decide to change a critical default which the database is critical. So I,

Matt Heon: Honestly, I don't know when this agenda item was added. I feel like it was intended to be discussed a lot sooner. So I think you're right about that. A lot of these are going to end up being 4.8. Regardless, we are too late in the cycles. Do major things. I don't necessarily view the sequel database as a major thing, just because how much we've tested it. But I agree with you that we are very late.

Brent Baude: Can we not just we branched, right? So do the work and…

Matt Heon: Yeah, we're branch. We can easily throw all this stuff in main right now.

Brent Baude: flick it now and make it a 4-8 target. That would mean, I'm kind of agreeing with Paul here in the sense that Maybelline features is sort of naughty on a release candidates. So, what's the downside of waiting other than it doesn't get out there?

Matt Heon: I think that is the big downside. It's first release will be,…

Brent Baude: Okay.

Matt Heon: it'll go out everywhere. Basically it'll go out to send stream rel etc.

Brent Baude: But it would seem reasonable to me that if we want to soak it at the door, we should have soaked it in Maine. At least that's my Justin. I'll check out after that.

Matt Heon: I'm not going to push too hard for making changes this late in the game. I mean, it's small enough that I would say it's doable but that doable and sensible are different things.

00:05:00

Matt Heon: Given that are we? Okay with saying, No big changes for seven? Let's just change this agenda item to say four, eight, because four eight is looking like our next big release.

Tom Sweeney: I have slight concerns of doing that, kind of change for real without it soaking Infidor first. Then we target a 48. Yeah, in between Here in Rome in February.

Matt Heon: Let's see. We're gonna have four eight or four seven out late, September. If we want to do a 4/8 or late November early December, We could do that. It wasn't on the plan, but As long as it's just an upstream release. It doesn't add that much burden. To what we're doing. Does everyone agree with that?

Brent Baude: This is I guess the downside of the forced March schedule. That we've In the past,…

Tom Sweeney: Yeah.

Brent Baude: we've Released when we're ready.

Brent Baude: At this point. I could make a strong argument because Hypervy just missed. For seven. I can make a strong argument that I would want to if I was Making decisions and releases were easy. I'd want to 48 in a month.

Brent Baude: but, that's a quicker cadence than we've done as quick and so we've done in a while, but it makes sense. So, that maybe what we need to do is say, before we will Do sequel light. And we need to go back now and talk about a release schedule for eight.

Matt Heon: Valentin.

Valentin Rothberg: I think we need to start doing notes because we had this conversation multiple times and in this year, What we said for fedora or discussed was to just make it a conf setting and default it there. So we don't necessarily need to do that in the main garage but one thing we didn't test yet is I don't think we tested it. Is. We need to make sure that even more existing deployments even if we default to make sure that the existing policy database continues to be used. This is something that have not been done yet to my knowledge so we are not ready. To just flip it now. There's still some work to be done. on this front. With respect to.

Valentin Rothberg: Merging things into RC and I would block every feature into our RC's. it has a number of times and we came up with the document to never Merge features during RC base, and I think we should continue to stick to it. Otherwise, we just keep on Budding us in the mail. There's a specialty for things that haven't been properly tested or bigger things. They will always introduce regressions. And that is what makes the release process and in the past to make it hard. just a reminder on this front.

Tom Sweeney: So Europe, are you okay with doing the changes in a 4-8 for this going?

Valentin Rothberg: And sure as long as we're ready and as long as upgrade scenarios work. So what needs to work is that unless being specified in containers, where a user explicitly says I want to use SQLite or explicitly things set on the CLI, if the internal default from memory SQLite, there's an existing wall TP database we need to use this multi beat database, otherwise, On update users will not see any of their objects, containers, volumes networks, etc anymore.

Matt Heon: contested, in my view, I

Valentin Rothberg: Our absolutely but it's an item that hasn't been done for many months now and it's something we need to do before, flipping the default and before refreshing it. It'm not saying it's hard, I'm just saying it needs to be done.

00:10:00

Tom Sweeney: Yeah, where does 47 live? It's still up in Maine. Is the branch. Okay.

Matt Heon: That's branched already. We branched before RCS.

Tom Sweeney: So we could make the changes of main at any point in time.

Matt Heon: at this point after thinking about 4/8, the sooner the better otherwise we will forget about

Tom Sweeney: Yeah. That's my thinking as well.

Matt Heon: Are I think we've come to a general decision here? That we're going to do The only question is how we're going to do for it, whether it's going to be in earlier release. We have a guaranteed release coming out in February, are going to do it release for that and have February before nine. So I think we can move on the assumption that the release schedule will be decided. Later is everyone comfortable?

Matt Heon: All right, the next default we wanted to talk about was Z standard chunked. Plus Gzip split compression. We do not have any in the room. Discuss Anyone else here? Sufficiently comfortable with Formatting to talk about this because frankly, I'm not as up to speed on this as I should be.

Tom Sweeney: Giuseppe would be our other person, perhaps.

Valentin Rothberg: Yeah would also point to Giuseppe which Giuseppe you mentioned at least chunked isn't yet? Ready for prime time, right?

Giuseppe Scrivano: Yeah, it's not really. There is still an open issue in continuous image, that needs to be merged. So I think we should postpone it for now.

Paul Holzinger: I think what then was throwing around was always like that. You push this multi manifest thing with Statistity and Jesus. By default, I think that was what then wanted so that, new clients can benefit from the faster. So that's really pulls.

Giuseppe Scrivano: Yeah, but still then first of all the feature it needs to be manually enabled and second it's not ready without The changes that the containers image, it's kind of broken.

Giuseppe Scrivano: So, I mean it's fine for our performance, but Without that changes, it's not really usable, right?

Tom Sweeney: This is something that you think will be ready by a late November or February timeframe Giuseppe or beyond that.

Giuseppe Scrivano: I'm working on that. I mean, I hope this will be done in the next. Few weeks.

Tom Sweeney: Okay.

Valentin Rothberg: I think this is something very critical. because,

Valentin Rothberg: Whatman is being used. So if the goal is to compress images by default with C standards with C standard compression, this can break a lot of deployments.

Valentin Rothberg: So I think in my opinion this is something important. Because imagine…

Tom Sweeney: August.

Valentin Rothberg: if you have a build plan, you use the apartment, let's say department knowledge or you updated or on your server people pipeline, you build the image, you push it. And suddenly Your clients or your deployments outside in a while. Start to break because they do not support these standard yet, maybe all the versions of docker, maybe very, very old versions of Scorpio appointment or build up this. This can break.

Paul Holzinger: but the ideas to push both compression formats now 12 a period where you push set the city in Jesus which of course is Ben Roeth more expensive and time but I think that was what then was always suggesting

Valentin Rothberg: This could in theory break as well, if the deployments expect a single image manifest and not an OCI index on the registry. So, I guess we're pointing at this.

Valentin Rothberg: Before deciding this default. I think we need to do some I don't find a better word. Sorry risk management of which things may put everything on the desk and then look at all potential risks and then check whether you're comfortable doing. But this changes. One, or how images look like in the nature of images? And this is something we're

00:15:00

Valentin Rothberg: feeling uncomfortable.

Tom Sweeney: I think it's valid concerns, but are you comfortable with delivering automaton 5.0? in real next year, just worth waiting, not long for the zsd chunk, and we can push back, if it's not in before then.

Valentin Rothberg: I would even challenge whether it's reasonable for apartment image, push to push a manifest, if there is a portman manifest push. So I think we're at the risk of conflating or breaking things. So, I would even question whether we should do it or not. So, I can't really answer that. That's all.

Tom Sweeney: Okay, that's fair.

Matt Heon: What I am hearing here is that we are extremely uncomfortable with this going into Rel first. So, this absolutely. I mean, even if we do a four, eight four hand, it sounds like it's probably not going to be ready. This does sound like It's a lot of additional testing. So this is if we're doing something between the February release and the next little release that this is potentially good time frame for that sound I mean, assuming that we can make it work.

Valentin Rothberg: I think we should follow up on this soon. So that we make sure that, The thinking continues about the issues or about this particular issues, how do we want it to behave? What are we trying to achieve in? What are we at risk of breaking?

Valentin Rothberg: At the moment it's just me throwing my foot in the door…

Matt Heon: Okay.

Valentin Rothberg: but I would be curious. I don't see. Minnows left in the meeting but nalin has to build specialist. what are you feeling about this?

Nalin Dahyabhai: Again.

Valentin Rothberg: How do you feel about the idea of just pushing these multicompressed image manifests that are a single image on apartment push?

Nalin Dahyabhai: No. I don't think I have any thoughts that haven't already been waste about additional bandwidth and I mean I'm not really worried about compatibility with registries at this point.

Nalin Dahyabhai: the bandwidth is the compute for compression because when you're building a cluster it's Compression actually is one of the more expensive parts.

Christopher Evich: This should work with the new.

Nalin Dahyabhai: but,

Christopher Evich: I mean zooming gets into pod It should work with the new Farm builds, right?

Christopher Evich: Listen Theory.

Nalin Dahyabhai: I thought we did this push time, so we didn't actually modify the images when they were on disc because they're not compressed on disk when you build them.

Valentin Rothberg: Form build is something awful about this Creating Multi-arch Manifest Lists easier. But it doesn't address. The issue of compression, algorithms. US trying to push for C standard as the new standard.

Matt Heon: I definitely. Are we comfortable leaving this here? And doing a follow-up later with more? I think we're really suffering. We're missing. less. Love and Audi, and Dan. Would be okay with having a meeting later. We'll have more people who actually know a lot about this in the

Tom Sweeney: Yeah, I think that's a good idea.

Matt Heon: All right, in that case, I propose that we move on to the next one, which is setting default network command to pasta by default.

Matt Heon: Paul. This one is mostly Feelings on it. Are we stable enough to do this?

Paul Holzinger: No. I mean, it depends. The biggest problem is that the outstanding work that we need to deliver the ruthlessness logic if you use named networks, And that's still hard coded to Slurp. So as long as that isn't the rest that I don't see a pointed defaulting to Pastor for the normal problem. Because then, that means that every distribution. Definitely needs to require both SD product for example. it's

00:20:00

Paul Holzinger: yeah, I don't particularly you see the benefits of switching it before. The networking stuff works really.

Matt Heon: Okay, and this is mostly the pasta. Maintainers not us.

Paul Holzinger: Know that would be me and also a bit on pasta but The thing how it works is that we have these intermediate namespace and inside of namespace, we just use But never work with pitch networking, but to connect this intermediate namespace, with those namespace, you need and the ruthless networking tool. So, I love or pasta and since this was written, two and a half years ago, that it just uses slow. And now I need to convert this code and that's not particularly

Paul Holzinger: evie, I would say that there are Their corner case of everywhere, basically. And then assumptions And, when I touched the code, I try to make it better. So A bit of a longer process. To get this done.

Paul Holzinger: Thought of I always have it in my queue, but it's always something comes on top of it usually. So, I didn't progress in the last week.

Brent Baude: Why are we coughing with my name?

Tom Sweeney: How much time?

Matt Heon: Really, it sounds like this switching to pasta by default is enough work that we're going to need. It's not going to get done unless it's prioritize is what I'm hearing from Paul. Does that sound Acc?

Paul Holzinger: It would make it much faster. If we say that the priority, but,

Brent Baude: But you guys get the prioritize as much as I do.

Tom Sweeney: sometimes you think Paul,…

Matt Heon: All right.

Tom Sweeney: if you were just single way devoted to wrap it up, You talking?

Paul Holzinger: the problem is coding, not like I know what needs to be done and writing a code. That's maybe a week of work. But then making sure that all comes together. and Everything works. one outstanding problem. Why? I haven't devoted more time on it. If port forwarding problem. So right now, what really happens. Is that with forwarding? We use the routers port process. So that's a process that respond to a container.

Paul Holzinger: And the problem is that this process is it's a dumb. Proxy basically and it makes it source IP. So that's the biggest complaint with ruthless networking and the port forwarding, We have My Source IP and in your website a lot. That's Not very good for auditing stuff. but someone's compromised and you don't have to iPS and I don't have a good answer to the port forwarding problem with possibly can do port forwarding. But it's missing the option to do this dynamically. So as we As respawn. we would only have one part of the process in this rootless, networking scenario. and that means we need to Forwarding capabilities

Paul Holzinger: And that's not impossible. I talk to the person maintenance day. we are on an agreement that can be done and They accept pensions, but it's like, somebody needs to prioritize and make the work and So it's kind of stuff.

Matt Heon: Fair enough. Personally, I would love to see this in Fibo, so That gives us a fair bit of time, but it would be very nice to have fivo with the improved networking.

Paul Holzinger: Yeah, definitely. And I mean, Right now, we have a lot of Users trying it out just a regular pasta with Putman, Run Dash network pasta. and there we are able to, Fix the many bugs already. So I think it's getting in it to a point where it's definitely stated enough to say we do this before. So,

00:25:00

Matt Heon: Anything else on this? I think we know what needs to be done. We know it is a lot of work and it's probably going to need to be bubbled up in priorities at some point. But anything else

Tom Sweeney: I don't know. I don't need a hard answer to this, but what are you thinking for? Five, vogue delivery timeframe. Are you thinking next summer?

Matt Heon: Yeah. Sometime early summer issue.

Tom Sweeney: Okay.

Matt Heon: think we were thinking about this was potentially the next release after the February drop. Although we have options here again if we've really feel like we need some soak before five. we can give it less time and have an intermediate.

Valentin Rothberg: I think if we really want to push 50 through and it should be for or before relative Because I guess in 9. I think we can't ship five.

Tom Sweeney: So you're thinking a 501 say early spring and then five one for real 10, possibly.

Valentin Rothberg: I don't know. But it would make what makes sense to have? some sort of time or five hour and fedora before throwing into

Tom Sweeney: Yeah.

Matt Heon: And for reference here, a lot of the breaking changes. We're thinking about in five though, we're going to be machine stuff so not directly relevant to the rail schedule. This is mostly getting podman machine in a more sane position than it is right now.

Valentin Rothberg: A couple of comments in our code and upstream issues that would impact Rel as well.

Matt Heon: Yeah, of course, we have a lot of accumulated, 50.

Paul Holzinger: Yeah, I find that. More useful to make a list of what we want to do for five and maybe we're talking the speaker about containers comfort, for example. and I've find out how to set a deadline without seeing what we want to do first,

Matt Heon: But I'm really hearing is that we probably need a 50 doc at some point like this or next week that we can just start accumulating. What needs to be done and from there, we can figure out exactly what's out and…

Tom Sweeney: Yeah. This next one, but

Matt Heon: what the schedule is.

Matt Heon: I'll take responsibility for making that. I can do it after lunch. anyways, if we are okay with saying that 50 planning can wait, I think we have a couple things that are slam dunks before eight. Those being cni and deprecating on man Generate system D. Of Valentin. Did we already deprecate generate system D or was that just being discussed?

Valentin Rothberg: It is already deprecated, but not dropped. So, deprecation Since there are multiple interpretations of what In this case, we said deprecation to just encourage users. That will be a warning now being emitted and using it pointing users to qualit. known your features will be added only, important bug fixes will be edit, we could consider dropping it entirely with Botman 5 adult, but it's used generate system. D is used in many pipelines.

Valentin Rothberg: And personally, I don't think it hurts to keep it around if we can spare some Edmonds, some very hard time for sure. I would love people to jump on quadland but the duplication will at least or hopefully be sufficiently annoying at some point that people will jump to it and we also didn't, because Internet System has been out for a long long while. So even experienced popmen users,

Matt Heon: So I think that deprecate what you said emitting warnings and putting in the man pages that it's going to be dropped, at some point is sufficient. at this point, the only question is whether we do that to CNI as well and now that we have the plugin system and net of arc, I think the answer is yes.

00:30:00

Tom Sweeney: For 5.0.

Matt Heon: I for eight. Potentially drop an entirely in 50.

Tom Sweeney: Yeah.

Matt Heon: Brent's.

Tom Sweeney: Doesn't mean to Matt.

Brent Baude: No. Both of you to No, I don't think we should drop. Until? The net filter stuff is done. Or was it Nettables or whatever? It is the one that we haven't done needs to be done?

Matt Heon: We are no worse than them in that respect. They do not have.

Brent Baude: At the same matter.

Matt Heon: I'm thinking about this in terms of, Can we get it out before Rel 10?

Brent Baude: All what's the real question?

Paul Holzinger: Yesterday.

Matt Heon: I think.

Brent Baude: What are you really asking to do?

Matt Heon: one prop, C, and put a deprecated notice in Maine right now, do it today,…

Brent Baude: Yes, that's fine.

Matt Heon: Two. Figure out what the first release going into rallies and drop CNI before that, or at least conditional compile. and don't compile it into 10. Because if we put it in 10, we are guarantee. We have to support that for the next 10 years.

Brent Baude: No, there's no doubt about that. So 50 to me would be the drop time. I had to excuse me myself but I was able to hear the conversation. I had an interruption here.

Brent Baude: So that's fine On the podman 5 other thing. I'm gonna start a document here shortly. The problem that I'm having is that we have yet undefined requirements from the desktop team, On what this needs to be done, on And as far as five timing, In the most ideal world. Five, all gone out in early spring.

Brent Baude: Five one will be. Something. That's real or 505. Pending on. How we do coming out the door, but something like the second release. Coming just before. Red Hat Summit. So, If I had mine, most ideal schedule, that would be it. And there should Not spend a lot of time thinking about why I would want it that way. The desktop team is going to do some splashes probably there. and it may very likely require some Change in our behalf to be able to support them to do that.

Brent Baude: But that's all undefined right now, so that makes it a little fuzzy. But we should start final adopt that starts, talking about things. We're going to We already know that that's unrelated to machine. And anything else? Also, talked about containers Comp. Evolution. So there's plenty of things we could, put in there right now and start talking about. It probably warrants. A series of short conversations about things and then we can dont in a document. the folks are okay with that, and I'm happy to leave that effort.

Tom Sweeney: It matters talked about doing similar thing, but sounds like it's a combination.

Brent Baude: Yeah, I heard that I probably should own it since the decisions are probably in the end to Mark and I'm on some of the stuff,…

Tom Sweeney: Yep.

Brent Baude: yeah. That. But otherwise, I think everything else is online. Matt, I mean, we're right on top of it. And at this point, late in the 48 game. Let's get the deprecation notices on things and we'll contemplate the actual drop or compile out. Type approach. For five.

Paul Holzinger: What are you talking about? When you talk about deprecation, notice In the code.

Brent Baude: I think we needed to display some sort of cnis going away.

Paul Holzinger: Yeah, and that's where I'm like. That means a warning on every command, if Everywhere really touches the United.

Brent Baude: we can do a suppress thing too to and we know

Matt Heon: Just network create maybe. I mean.

Brent Baude: Yeah.

Matt Heon: Ultimately I would definitely want to see in the man pages and I want to see it on any Korean that creates a new network that is using the old tech.

00:35:00

Brent Baude: That's fair. And then we can get the usual docs and social.

Brent Baude: Social media stuff out there, getting that idea ever out and I wonder too does RPM even maybe have a deprecation approach? when it gets installed to say, Hey, this is Not a thing. Anyways.

Lokesh Mandvekar: We can admit warnings maybe when something is installed or updated.

Brent Baude: Paul. I don't know exactly what it means, but it's something along those lines. We don't want to spam people which I think is your concern.

Paul Holzinger: Yeah. Yeah, it's just like putting it in dots is totally fine, but it will miss a lot of people just running in some deployment. So That makes.

Brent Baude: Understood.

Paul Holzinger: It's difficult line to navigate too much spam and not reaching the users. So

Brent Baude: Indeed.

Matt Heon: Going to be gone is critical.

Brent Baude: we can also,…

Paul Holzinger: Will be.

Brent Baude: Probably could do,…

Paul Holzinger: We needed.

Brent Baude: we could do the message on everyone and in the message touch a file here to suppress this warning, so give them an out. There's lots of options.

Tom Sweeney: I wonder if.

Paul Holzinger: do we need to change proposal for Fedora or something like that?

Brent Baude: I don't believe so we may need to talk to F cost. But as far as I'm concerned, This doesn't affect them toolbox at me, impact.

Paul Holzinger: No, it doesn't affect two books. They use,…

Brent Baude: Okay.

Paul Holzinger: they use host networking exclusively. So

Brent Baude: Okay, that's even better.

Matt Heon: Realistically speaking, I think that we're going to need a change request for Pod Man, 5, obviously, but I don't think we need to be more specific than that, I I think we can just do one broad. We're upgrading Department 5, It'll have the following changes.

Tom Sweeney: I just wanted to, if we should put in early Deprecation, notice into the eight, nine, nine three, docs before it goes out.

Matt Heon: It's not going to be deprecated in eight. Nine CNI.

Tom Sweeney: Like Christopher Warn.

Matt Heon: CNI is going to be the standard on eight for the lifetime. I wonder if we already did it in nine I almost feel like we were discussing that at some point but

Tom Sweeney: All right, let me run down nine.

Matt Heon: That's another part of why we can actually get away with this. if we're looking at the last major code, drop into related, the next in the very near future. And once that's done, we can actually think about getting rid of a lot of stuff. We were keeping around for eight.

Brent Baude: So, can we Podman into rust. But 50.

Matt Heon: Sure, We're just gonna have to drop machine and compose and I don't know, we'll choose 50% of the code base where we write that that's what you

Brent Baude: Okay, so I guess, I took the ball on the 50 stuff and We'll just do some Meetings to carve out some basic time and some meetings to get Everyone's thoughts for at least written down and then we can begin to evaluate document.

Tom Sweeney: Should we move on to the generate system D?

Matt Heon: Sounds good to.

Tom Sweeney: Or did we kind of discuss that? Yeah. Yeah.

Matt Heon: That's already.

Brent Baude: in terms of deprecating, it

Matt Heon: It's already deprecated. wonderful thing.

Brent Baude: it's been marked.

Tom Sweeney: We just went out of order and I'm just looking at the order here of the agenda. So we're all set there.

Brent Baude: In terms of moving on, I'd be happy to move on to the next thing to talk about.

Matt Heon: The next thing is others, so I guess Does anyone else have anything? They would want deprecated for a potential removal or adjustment in 50. We're not even deprecated. Does anyone have anything they want changed in the future to prepare for?

Brent Baude: I would like a containers comp V2. Do we have that? Written down.

Matt Heon: I don't think it's captured. Yeah.

Brent Baude: Okay.

Brent Baude: I think that there's a submitted one thing for a machine is I'm probably not going to sell this team very hard, but I think that we need to probably make every JSON. Config that keeps track of the machines resources and where everything sits the same across all providers. It is not today.

00:40:00

Matt Heon: I think we really just need to write down major machine refactor and then figure out what stems off of that.

Brent Baude: I think a lot of that will be done in the four versions so specifically, because this may be a breaking change is one of them.

Matt Heon: Yeah yeah we're discussing for eight as well as 50 so I'm like four eight four nine whatever we do before five I think we have to do a lot of refactoring to get ready five.

Brent Baude: Particular one.

Brent Baude: yeah, and I'm also seriously contemplating a proposal that would Make transition from four to five in the machine world. Not a thing. In other words, it's breaking machine release. Over action by users, will have to be taken.

Brent Baude: So that's something that we need to debate the ups and downs of that. But I have good reasons which I know really want to go into right now, but That's a thing. Go ahead Paul.

Paul Holzinger: and just not explicitly related to machine but General, I think we shouldn't Change things just because we've all benefit, We have a chance to break something that's fine, but that doesn't mean we need to break everything, right? So it's

Brent Baude: Correct.

Brent Baude: And I'm probably trying to dig out a little more space than we need. So that we're not pulling ourselves into migration scenarios that may over tax us. For the simple. Recovery of cloud, man, machine remote padman machine, and your backup. And, running, you just don't have your content. So,

Paul Holzinger: Yeah I mean I think that's a fine assumption for a lot of things but it would be good to know document such as solutions. And anyway if there's a lot of you that later and the machine that's just gone, And I think some users might not really understand the concept If you're a butt reports,…

Brent Baude: Yep.

Paul Holzinger: if you ask the judge recreate the machine and oops.

Brent Baude: And the other bit is, we may be able to do some pinky around. Just

Brent Baude: without some ideas on how we can potentially get around us. I think a Matt there was some stuff which I can't remember around Spec Gen. That we also had contemplated that we're breaking, so it needs somebody that crawl through the spectrum and take a look.

Paul Holzinger: So, the important part is to have a way to define defaults on the server side, with that, comes together with containers.com somehow. because we want defaults on the server side,…

Brent Baude: Yes.

Paul Holzinger: for the most part,

Matt Heon: I think the ideal way to do this would be to refactor. the defaults are set in a common way across local and remote the spectrum gets pretty populated in a sensible way and…

Brent Baude: Yep.

Matt Heon: it's those defaults that get displayed via the command line but that's a lot of work.

Brent Baude: I mean That's kind of what we did when we went from whatever prior to specina. I forget what it was called but To Spec Jen. As we did we did some of that rearranging twisting. So it seems like that. We have to do that again. To deal with remote.

Matt Heon: That is not. Echoical.

Paul Holzinger: And what I would really love. Is some research during around, And what's local? In the code, the separation of concern in these packages, It's a mess. and to be honest, there's a pretty big buck in a lot of things that this rootless checks, we have plenty of them on the client where it makes no sense at all.

Brent Baude: Fair enough. Matt, There's one other big one which is system connection.

Matt Heon: Is this?

Brent Baude: Is going to need to be rehammered out because it was not when John designed that. It was designed for remote and local. Basically, Yeah, I want to add a remote connection, I don't want to type it every time. And then we started using that for machine. so now we've got system connection. That is remote in every sense but it also could be different depending on the provider of the vert machine.

00:45:00

Brent Baude: And so the name of the connection is something like Podman Machine. Default when you don't name your VM, And it's theoretically possible to have Padman machine default with multiple providers. And then we get system connection collisions.

Brent Baude: So we'll probably need to build some robustness into system connection, that allows a provider to be specified.

Paul Holzinger: I would label this and containers.com free, right? And we don't want this in containers that All as you talked about, we don't run to write a containers of confile because that rewrites a personal config file of and you lose all comments. And so on what we mentioned,

Brent Baude: Yep. Agreed.

Brent Baude: Yeah, and maybe more of that needs to go into that world, so that's something and that theoretically could be breaking if we can't figure. To me, that's gonna probably be a breaking change, or we're gonna figure out. If machines are breaking changes, then there's no reason to try to compensate for system connections in my opinion. So,

Paul Holzinger: I had a fun one today. Another interesting thing that's in our flagparticle, there's a thing called strength, light and string array. And I bet only a few people know what that means. what the difference is because if your past a gray flex, you have to chance to at the slice, you can call my separate values and there's an array. You just like I mean that's multiple times. And as it turns out, comma separated values are passed the field three and That is not heavy. If you pass in quotes and other stuff here. Yeah, if you have a regular t35, basically there are rules. And just today usually like this, incredible stupid syntax that you need to use.

Paul Holzinger: If you have this dislike things and we have defined everywhere, for options that accept the five path, that means you cannot have a comma on the fire path and stuff like that.

Matt Heon: We really should just have a litter to detect that. There are very few cases where you actually want string SL.

Paul Holzinger: But the problem is ever noted on the issue, we cannot change. That's what operating somebody because the fees if you figure out the piece and text then you escape it with quotes and so on. but then that means the value, as soon as I change it to array, it's no longer the same That you get when you stream flies.

Matt Heon: Five of stuff. we can break the small portion people who actually do these things. If I know this is the kind of thing where I would say I would argue. It's about Not even a breaking change but we can do it in five hours so we can do it anyway.

Paul Holzinger: Yeah. That's…

Tom Sweeney: Yep. Just looking at the clock and…

Paul Holzinger: where I'm getting it.

Tom Sweeney: we're seeming to grind on this just a little bit. do we have anything else? Major that needs to get in Can we create a discussion? Perhaps on the Github site for things you'd like to see in 5.0 or has one been created already?

Matt Heon: I don't think we ever get up discussion. That's a good point. I think that we should probably have our internal discussions first, so we can populate. But once that's done, we can get something up and see what people think.

Matt Heon: Completed also probably should have a blog about this, but yeah.

Tom Sweeney: Even myself have a place where people can just go ahead and put their ideas and go from there.

Paul Holzinger: Yeah. What one thing if you say we have a deadline next summer, Then I think it's important to focus on stuff that require us some dragging changes because if they talk about features, we can add features at any point, if there are true features like a new command or something, that I think it would be important to allocate resources correctly so that we can get stuff that needs to happen forward and that cannot wait for

Paul Holzinger: if I've got one more whatever.

Matt Heon: Fair enough. We really need to get the docs start before we can start clarifying this. But yeah, I will see how soon I can carve us into the schedule because I think this is an important one start talking about,

Tom Sweeney: Like a girl. I think I'm gonna wrap up this particular discussion, Matt, unless you need to talk about anything else and just open up for any questions. Before we wrap up for the day that anybody else said related to this or anything else for that matter.

00:50:00

Tom Sweeney: Very quiet. Last chance. Otherwise, I'll start.

Brent Baude: Whether they come on,…

Brent Baude: you waited this long.

Tom Sweeney: Yeah. I'll just put in.

Tom Sweeney: Just a note for one. Our next meeting Got one coming up pretty quickly for the community meeting that's happening on Tuesday October 4th. I'm not sure that if any topics at this point for that one. So if you'd like to demo something there would love to have people do so. and then, The next cabal meeting will be on Thursday October 19th and both of those meetings will be on at 11 AM Eastern time and both will be daylight savings time. Still, I don't think we flip over until November for Daylight savings time. In this country anyway. And one last chance for questions comments.

Tom Sweeney: but otherwise, I'm gonna turn off the recording and we'll wrap that up.

Tom Sweeney: Right folks.

Tom Sweeney: That is the end of the recording.

Meeting ended after 00:51:17 👋
```
