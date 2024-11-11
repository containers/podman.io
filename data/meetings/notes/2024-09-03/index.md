# Podman Community Cabal Agenda
## Sep 3, 2024 11:00 a.m. Eastern (UTC-4)

### Attendees
Anders, Daniel Walsh, Ed Santiago Munoz, Gerry Seidman, Giuseppe Scrivano, Jan Rodak, Jhon Honce, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Rick Wagner, Tom Sweeney

### September 3, 2024 Topics

 1. Close old issues after "X" amount of time on GitHub - Matt Heon [jira 1722](https://issues.redhat.com/projects/RUN/issues/RUN-1722?filter=allopenissues)
 2.  Allow using a `ssh:` host directly, without having to create a system connection or setting up a unix domain socket tunnel - Anders Björklund (podman #23831, #21113, #17452)


### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=v_QR2hbXHH4)

Meeting start 11:03 a.m. EDT (UTC-4) Tuesday, September 3, 2024


#### Close old issues after "X" amount of time on GitHub - Matt Heon - (0:32 in the video)

The number of issues in GitHub on the Podman repository is growing —currently over 600. Several years ago, we said we would work on keeping it under 200, but that's not viable.


Options to address the problem:
 1)  Close all, and let others open them if still pertinent.
 2)  Close issues after some period of time without any updates to the issue.

Rick asked if we could add more engineers.  Matt doesn't think that's viable at least from Red Hat.   

Paul is not fond of auto-closing in general.	He thinks it's a bad look to autoclose issues, especially ones that have not been triaged.  He doesn't think closing them makes the issue go, just gets us to a number.

Miloslav asked if we can keep up with the incoming issues with the resources that we have now?  Probably not now with current Red Hat staffing unless we get more folks or more community involvement.

Giuseppe stated that just closing them to hit a number doesn't feel good.  Suggests a label like "auto-close" or perhaps "triaged".

Matt's fine with autoclosing an issue where a maintainer asked for information, but none had been provided.

Mohan, prefers something like Matt's suggestion.  Perhaps a bot could be written to ping a reporter after "X" time and then if no response for some other period of time, then close.  Mohan thinks something like this is doable with GitHub actions.

Ed thinks we might be able to piggyback this on top of the stalebot.  However, Paul doesn't think stalebot is reliable.

Tom asked if stalebot triggered, rather than autoclosing, would it be better if a maintainer reviewed it before closing it.  Paul pointed out that Dan used to do this for the stalebot notifications.

Matt thinks we ought to investigate what's possible with GitHub actions.  Possibly just a report, rather than an email.  Then we could pick off a half dozen at a time.  Matt suggests moving forward with the investigation.

#### Allow using a `ssh:` host directly, without having to create a system connection or setting up a unix domain socket tunnel - Anders Björklund
  - (14:08 in the video)
  
Podman ssh issues: https://github.com/containers/podman/issues/23831, https://github.com/containers/podman/issues/21113 and, https://github.com/containers/podman/issues/17452

Podman machine automatically sets up the ssh connection.  Which caused issues in different places based on the sockets used, and the configuration files used.
  
Username, port number, contained in .sshconfig file, which could possibly be used so as to not have to remember.  So instead of 4 params, you would only have to remember one.
  
Users are using a separate file that has to be symlinked, generaly using the "-f" option to point to the .sshconfig file.  Only username, hostname, port and identity are the params parsed, anything else would have to be added to containers.conf

Podman currently uses Golang's ssh, we didn't use the local .sshconfig due to our VarLink for the RestAPI that was used prior to Podman v4.0.  That's how we ended up with both Golang and standard ssh.

Podman machine calls to the binary directly, but other commands do not.

Anders thinks the use of .sshconfig is a rather new thought, and is becoming more common lately.  

Matt is open to a change to use .sshconfig, he's a bit concerned about removing what we have at the moment but thinks a .sshconfig makes sense.

Podman Desktop and others use the socket connection code, so changes must be carefully considered.

Some of the interesting parts will be handling remote vs local sockets.  This is mostly a concern for Podman DeskTop.

It's also a bit messy to have to know the remote use of the VM that's being used.

The `connection add` code was supposed to be the helper in Podman.  From the command line, what ever you give it, the code just slams it in and tries to make it work.  It sometimes does, and sometimes does not, and messily does not at times.  Error messages are not especially enlightening.

Matt will make Jira cards to look further into ssh implementations within Red Hat.  

Anders thinks having the Golang ssh connection as a fallback, in case there's some kind of bad openssh setup or issue.  With Podman Desktop, we might have to have a third connection, and with podman-py connection, possibly four.

#### Open discussion - (31:41 in the video) -
 1.  No Topics

### Next Cabal Meeting: Tuesday, November 5, 2024, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1.

### Next Community Meeting: Tuesday, October 1, 2024, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:


Meeting finished 11:36 a.m.

### Raw Meeting Chat:

```
 Nalin Dahyabhai
 11:01 AM
 are we recording?
 Ed Santiago Munoz
 11:10 AM
 In case it helps: there are 300+ issues open >120 days. That's more than even a team of humans can deal with reasonably. https://issues.redhat.com/browse/RUN-1722?focusedId=25448844&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-25448844
 Miloslav Trmac
 11:11 AM
 I think needinfo is an obvious win and entirely legitimate to close. Does doing _only_ that achieve the objective?
```

### Raw Google Meet Transcript
```
xrq-uemd-bzy (2024-09-03 11:02 GMT-4) – Transcript
Attendees
Anders, Daniel Walsh, Ed Santiago Munoz, Gerry Seidman, Giuseppe Scrivano, Jan Rodak, Jhon Honce, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Rick Wagner, Tom Sweeney, Tom Sweeney's Presentation
Transcript
Tom Sweeney: Good morning, This is Tuesday, September 3rd, 2024, this is the Podman Community Cabal meeting. We have just a couple topics on the agenda today. First one is whether or not we should close all the shoes, after some amount of time on GitHub and then wonders and not really leading that one. And Anders will be talking about using a SSH host directly without having to create a system connection or setting up a UNIX domain socket tunnel. And all with all that I am going to hand it over to Matt, take it away, Matt.
Matt Heon: So I was not the one who was supposed to be heading handling, This is on PTO, but I will do my best to drive it through. So, basic intent of this discussion. We are, actually got a real number for this.
Matt Heon: So we have last eight text a lot of issues open on odd, man, and it's an ever-increasing number. The number is presently over 600. Several years ago, we said that we were going to make serious efforts to keep the number under 200 and that proved to be very not viable. And the number has been steadily increasing ever since So, we have a request to try and take that 600 number down, at least somewhat and they have two potential proposals. And how to do this. One is declare issue, bankruptcy, we close everything and then we let people reopen, what they feel is still relevant.
Matt Heon: Two, we influence some sort of timed closure policy on existing issues such that if a bug, has no activity from any party for let's say 90 days, we automatically close it and that keeps the numbers tidy. again, this is just a numbers thing, it doesn't actually fix the bugs. It just makes circuit help look tired here. And I know that we have people in this call with strong opinions about that. Including Ed who I believe created a document on how we were supposed to handle these issues ago. So Ed, any thoughts on this?
Matt Heon: I would love to do that, but At the moment, I have had two people leave the team and they're going to be replaced, but down on horsepower as opposed up on horsepower. And I don't see that changing for at least next three months. So I would be looking for regardless of that. Also, there are bugs that just end up being opened and then left and nobody really ends up closing them, because the book just sort of Peters out people stop responding and it just kind of sits there. So I can see value to an auto close functionality.
Paul Holzinger: so I'm not really fond of all the closing and general because right now we are not keeping up at all on upstream and if a bug hasn't been trashed and classed that I don't know how to say, That's just disrespectful to the reporter. Nobody looks at the box says, there hasn't been any activity, I closed it I understand. that there are a bunch of issues and in there that are longer care. but I would say, that's probably still a minority. the other set of issues are either valid feature requests that are nice but we don't prioritize or
Paul Holzinger: On normal bucks. We also don't prioritize so doesn't make them go away. And if to go anders to have a shiny number then I don't think having a shiny number is the fire. But
00:05:00
Mohan Boddu: I would like to go last,…
Matt Heon: Mohan. Okay.
Mohan Boddu: let those speak and see and let's capture other input here.
Matt Heon: Miloslav. You need a meal.
Mohan Boddu: Emitter.
Miloslav Trmac: the first question I think is, Can we keep up with Issues as they come if we can't. Then what we are doing. We Are not going to be in exactly the same conversations three months from now. And it's like Paul said, it's a matter of expectations if we can't handle the load, I think the report of these are to know, I don't know what that would look like. Maybe be close to issues and let only be us in, I don't know, but something needs to happen to stand the tide. If the incoming flow is manageable and we just have a backlog. I'm tempted to say that features are different from bugs and maybe shouldn't be closed, so aggressively. But ultimately a bankruptcy with all the issues is possible to me.
Matt Heon: All right.
Matt Heon: So it sounds like what we really want, is something akin to Bugzilla need info and then we'd auto close things that were Need info on reporter for say 90 days because ultimately, I think there's a Class A bug here where we have gets recorded and the Maintainer asks for more information and 90 days later, the information hasn't been provided. I'm fine with Auto closing that, I think that Paul is probably right that we don't want to auto close things that event ads any interaction at all for 90 days. But if it's 90 days of waiting on recorder, I would be fine with closing that I think the problem is that, I don't think it has the capability to do that sort of thing.
Mohan Boddu: Okay, I prefer that what you're saying, Matt and that's what I wanted to say. if we can do something like that, Bugzilla wise, And if you cannot do that, if there is no possibility of doing that in Github, the other option is Instead of auto closing them. we can write a bot, Or if you haven't heard anything From someone in the last 90 days. Ping them and ask them if it's still relevant or not. And maybe after 30 days or something like that, if they don't respond on the ticket, maybe close them. After that, initial thing.
Matt Heon: If this is automatable, I am all in favor of it. I'm fearful if it's not Integrated with github and fully automated. It will be very difficult to manage.
Mohan Boddu: I think you can do this with Github actions. I'm not sure if there is a need info way of doing this, but at least the second one is to Google. as far as
Matt Heon: If we could do a github action, that would apply a label. And then when there's a comment from the specific person who the label is for it, removes that label, that would be great. I think that would solve a lot of our problems.
Matt Heon: I'll fly with that.
Paul Holzinger: but, The stable board itself is a bit problematic because it hasn't the knowledge of which person is asking a question. So's just certainly there's action is also meaning nobody has looked at it, right, your comments but also Go into that and the sailboat. I think it's much more problematic, it's just fun here. So, There are issues for a year with all the comment that women captured by the stable. Don't ask me why I don't care. So it's not a reliable thing at all. So
00:10:00
Mohan Boddu: I guess then we have to reframe the question maybe the board will ask there is no activity and ask whether the reporter still wants this bug or feature added. Then if that is reported response. Then. We don't close it. It doesn't matter who is responding at that point of time. The board doesn't know but at least it is a response on the ticket. It's just how we frame the question at that point of time.
Tom Sweeney: Yeah, I was just kind of thinking a little bit in the middle of Came back on it with some or they're not rather than using steel bought or some bot to auto close. The things that they sent a mail to maintainers or wherever and say This thing's old take a look at it and then have somebody actually physically review it before, closing it. I don't know if that'd be more palatable or not. Again, more overhead administration for a person.
Paul Holzinger: So that's what we used to do, or what, then was pretty good at it. So, If the stable commented, he looked at it and usually closed out if it was what's open questions and stuff. But yeah, he is no longer on our team isn't that active anymore at least on the issue flight. So I think that's probably a large part or one of the reasons why the issue count goes up data part, it's just more issues than we got before.
Matt Heon: Yeah. I would say that the fact that we're getting worse just indicative, we're use, which is good thing, but also a bad thing for us is maintainers
Matt Heon: All right, so it sounds like we have a bunch of ideas, but most of these ideas are going to require scripting work. So this almost sounds like, you should put someone on it and see What is possible within the github actions API. Can we make close? This issues that are waiting for responders in the same way? Can we make something that identifies issues that are really old and if that no activity and pops us to, maybe it doesn't even send an email, maybe it just spits out a report and tells us. These are the issues that require attention oldest first and then we can go through five of those a week. It wouldn't solve things perfectly but it sounds cool.
Matt Heon: Anyways, I think what I'm saying is, we probably should have time devoted for one person on the team to look at this at some point, the next couple weeks or a couple months. How does that sound? Okay.
Matt Heon: I think that's a good action of Tom. I think we're going to move.
Anders: So there was a user this weekend. I think that created a vagrant machine and then was connecting Portment to it and wondered why it was much more difficulty to do it. Using the portman kind compared to the doctor line. So it's something that we discussed whether we had Portman version 2 or something, but then we had Putman machine and Putman machine automatically sets up the stage connection. So then some of the problems were hidden in the connection and then other systems like here Lima or apartment desktop sets up SH tunnel for you. So the user only connects the unique socket and again the problem is not seen
00:15:00
Anders: but it was a reminder that we had some open issues from 2023 or even before that. And there is a lot of parameters that are mandatory in the SSH URL, that should not be. so,
Anders: What I did was to just have some old code.
Anders: So that you can read the Configuration also for the goal line, implementation of FSH which normally does not look at SSH, config I think that we have a half implemented native.
Anders: Setting in Pod Man so that some commands will call out the Ssh binary. And some will use Golang. But the end result is that it doesn't work with the Config so what these systems like vague and Lima do is that they add ssh, config, which contains The username and the port number and the host name. And also the identity key. And then, you can access this alias. Instead of having to remember all these, it's especially annoying when you restart the VM and get the Newport airport, In Portland machine, there is functionality the update this connection automatically but it doesn't work for external systems. And I saw so that's what upcoming with some old apartment 4 codes. So that you can now
Anders: Only do ssh to an alias and it Fill in your username. It will feel important, 22, That was fixed before and it will fill in the doctor. Sorry the podman socket path from the house by logging into the house and running port money. Info to see whether Unix rocket leaves on the remote side. So instead of remembering four different parameters, you only have to remember a short name which you keep in your SSH configure. I think I posted the number in the document here.
Anders: Yes, Yeah, this is by the way, only if you don't provide this information, if you're the username,…
Matt Heon: Question are Liam and…
Anders: it's blank or the path is blank. If you have everything provided in the URL,…
Matt Heon: the others editing the actual dot. Config file on the user's SSH,…
Anders: then there's no code.
Matt Heon: builders there are way that they're making a separate file. That has the identity.
Anders: It is a separate file. So the user will have to either simulink this into the directory or cut it into the config file. If they wanted a part of it, Normally use the minus capital F even to use this specific as this age config but this is not covered by this. Code or anything. So the user is supposed to add the SSH,…
Matt Heon: Okay.
Anders: config snippet for that host name into the normal parts either by SIM linking or…
Matt Heon: That's a lot less concerning than the actual sh. That makes me a little easier.
Anders: by cutting
Matt Heon: so, Would your ex sorry. Go ahead.
Anders: Yeah, so it only costs that it only parses those four parameters. Hostname Port and Identity Key. So anything else would need to be supported by containers common and normal, native ssh fork. So if you have anything else, like you keep Alive and Max socket or what have you on your stage connection proxy, Young was also discussed, all of that is handled by the binary through containers, common because you have SSH mode, it's called if you want to use a go implementation or the Ssh. Exec.
Anders: So you would need to use that external sh. For those open,…
Matt Heon: I'm trying to. Does anyone on the call?
Anders: SSH features that are not included in the Golang implementation of SSH.
00:20:00
Matt Heon: Remember why we ended up using the Golang Ssh, Brent isn't here, and Ashley also list here and they would be the two. I would ask mostly
Anders: I,
Paul Holzinger: Yeah, so I think the native mode is probably just buggy in a sense that it doesn't work, really because it was implemented by Charlie. But then I think Charlie left before it was probably finished because I looked at the code, there are no tests so I wouldn't if they are not just,…
Anders: I,
Paul Holzinger: I would not expect it to work in general that From working at this project.
Anders: I think it's used by some commands but not by others, so for instance, Portman Fcp probably works fine, but podman run do not so it's
Paul Holzinger: Yeah, So SAP has extra code bodman machine.
Anders: Yeah.
Paul Holzinger: SSH, also calls directly the binary all the time. so yeah,…
Anders: Yeah.
Paul Holzinger: it's a bit of a mess and I think the native mode can probably easily be Fixed if somebody is interested in spending the time on that. but yeah, the Golden one, as you mentioned Figuring out the defaults is probably also just an edwin not having to provide the voice of the path and use other and so on.
Anders: And there was a nice goal library, for parsing, the SSH, config files, all of that was already taken care of, which made the implementation much easier.
Jhon Honce: I don't think we knew that existed or it didn't exist when we wrote the initial Library implementation because that was one of the things we looked for and couldn't find And We just didn't take it on.
Anders: I think the use of SSH config files is somewhat new. Because when we did this in 2020 or 2022, everyone was passing around URLs or other than using config files. But now in 2024,…
Jhon Honce: The.
Anders: it seems like it's a h, config file. So getting more common, for instance, Lima is moving to use them and deprecating that show SSH commander, as it was called, vagrant is deprecated in itself to not being open source anymore. So, Who cares, right?
Anders: And yeah, but anyway, those four parameters seems to be working fine and I have some code that I tested on Ford of Nine of Odd, But I think it could be based without any major issues, that it hasn't been that many changes to the bindings.
Matt Heon: I wouldn't mind to change like that honestly, more concerning to me is that we should get our internals in order and switch to one, SSH implementation or not have to, but switching over to just use SSA Fix, makes sense to me, especially considering what we've done with system. Connections moving out of containers comp into a separate file.
Anders: .
Matt Heon: There's precedent for them, not to be in the same place already.
Anders: Yeah, unfortunately it's not just too implementations because you have your back clients, you have your JavaScript clients like Podman Desktop. So yeah, you have a lot of implementations of the circuit connection code. So, one thing that can be improved on the podman desktop site of things is to move the current temporary socket hacks from the podman Extension Department, In that way, it will also work with Doctor and Other extensions and so on. But it's quite new in the 112. So it's the going through some early phases at the moment. One issue we had with Lima was that it was hard to tell a local socket from a remote socket.
00:25:00
Anders: Log into the host or remote in some data center somewhere, that could be an Information for the use. But if we are just funneling Unix sockets and it's hard to tell from the Local thing. If it's a tunnel ssh or…
Paul Holzinger: I mean, we don't care on the Portman ends so that's…
Anders: if it's actually a remote associate.
Paul Holzinger: what the client who has. Yeah. Yeah.
Anders: It's a,…
Anders: it's quadman desktop that cares.
Paul Holzinger: Right. Right.
Paul Holzinger: Magic the client wants that,…
Anders: It wants to show different icons for different things.
Paul Holzinger: but yeah.
Anders: I think it will just be a Boolean on the connection connection is the class. That's wraps the circuit connection. So then each extension case, the fill this Boolean in our however it wants I think the current implementation is string starts with SSH colon or something like that. It's not so once But that's why it failed with the current limit sockets and that's why I looked at if we could feed the ssh connection from the limit as it config into Portman and then I really rediscovered. All these old issues with Adding the SSH.
Anders: And also it's a bit messy to have to know the remote user ID of the VM or the cluster VM that you're using. Maybe you do know your current user, or you can use the environment variable for the runtime directory. But if it's remote VM, they have to get the remote user ID. so in that sense it's nicer if it figures it out, and I think that it does this today, if you do connection App, But it doesn't do it if you just provide. host or…
Matt Heon: Yeah, that sounds accurate.
Anders: environment, variable URL or something.
Matt Heon: Those were always meant to be power user features and I don't think we build any assistance into them.
Jhon Honce: But the connection ad did. So Anders is right there connection ad goes through, that was supposed to be the helper and go through a lot to try to figure out stuff.
Anders: Yeah.
Anders: Yeah, and that means that the original was never fixed because …
Jhon Honce: And…
Anders: as long as you're using connection,…
Jhon Honce: yes, the command line options,…
Anders: you don't see the problem.
Jhon Honce: if you went, that route were whatever you gave it. It slammed in and tried to make it work.
Anders: Yeah, I mean it would log in with user,…
Jhon Honce: Yes, Ugly things.
Anders: empty string and stuff like that and It totally It also has some really interesting error code if you pause in an invalid UNIX socket, like empty string for the unique circuit. Because it will succeed to connect to the external site, so you don't get the nice. Post not found message or whatever, you did with a missing alias, but you will still get a weird error for not being able to connect to the circuit. Because it thinks it's talking to HTTP Server.
Anders: And then it gets very surprised when it does not respond and it tries to check the URL and URL is fine but the path is all one piece out. Yeah it doesn't help the original problem you get whether and we had a errors From the backend.
Anders: Yeah, ssh3. That connect failed. That's nice.
Anders: But that's too old bugs getting a PR or maybe two PRS, maybe one.
Matt Heon: I don't think I can promise it'll be worked on but I will definitely get a car together on our end to work on unifying our SSH implementations because having two just bothers me support perspective.
Anders: Yeah.
Anders: But it's sort of nice to have a built-in and golang fallback if open ssh becomes unavailable for some reason be it licensing or weird operating system or…
00:30:00
Jhon Honce: Yeah, I think.
Anders: whatever but yeah. Weeks.
Jhon Honce: We can talk about that Matt, but I think you're stuck with two.
Matt Heon: That is tragic. If true but your door familiar with me.
Anders: And if you count put them on desktop you are probably going to be stuck with three. Unless, whatever you are, suggesting has a typescript implementation.
Jhon Honce: Yeah, no. And then, with podman pie. Now we have four
Anders: But I do have some good news. And that is that windows now, support UNIX circuits, that's at least one less configuration. I guess that's only the recent windows.
Jhon Honce: that's nice.
Anders: If you want to support older windows. You still have two. You have name pipes and unique circuits on Windows. Yeah, probably just makes it worse.
Paul Holzinger: yeah, we can switch to that in 20 years once the clients They got that one out.
Anders: Yeah.
Anders: Yeah, exactly.
Anders: I didn't have anything further, Tom.
Tom Sweeney: Anders are starting to catch up with the notes there for a moment. Think I've caught up any other questions, comments, any further ideas that we need to explore on this matter, others?
Matt Heon: no, I think the capture what these to
Tom Sweeney: Okay, great with that. That's all we had for topics today. Are there any topics from the folks here that wanted to be Any questions or comments? In general.
Tom Sweeney: You thinking not real football, reminder, for Our next community meeting is on October 1st, don't pay attention to the agenda. That's on a Tuesday. Even number months, starting now community, meetings, odd number months, or cabal meetings. And so given that, our next cabal meeting will be on November 5th at 11:00 a.m. again and both meetings actually be at 11am, although we will have a time switch just before the November one.
Tom Sweeney: That I will see any further one last call for topics or questions.
Tom Sweeney: Going once I think I will stop the recording.
Tom Sweeney: And thank everybody for coming today.
Meeting ended after 00:32:56 👋
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
```
