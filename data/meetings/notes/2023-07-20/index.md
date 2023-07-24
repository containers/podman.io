# Podman Community Cabal Meeting Notes

## July 20, 2023 11:00 a.m. Eastern (UTC-5)

## Attendees: 
Aditya Rajan, Anders F Björklund, Ashley Cui, Ed Santiago Munoz, Jake Correnti, Justin Jereza, Lokesh Mandvekar, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Tom Sweeney, Valentin Rothberg

## July 20, 2023 Topics

1. passwd and group entry handling with `--user`, etc. [issue](https://github.com/containers/podman/issues/18903) - Justin Jereza
2. ipfs integration into Podman - Anders Björklund to kick off
	- See <https://github.com/containerd/nerdctl/blob/main/docs/ipfs.md>
  	it is about peer-to-peer image distribution, using OCI [estargz](https://github.com/containerd/stargz-snapshotter/blob/main/docs/INSTALL.md#install-stargz-store-for-cri-opodman-with-systemd) format
	- Question for containers/image, fallback is `localhost:5050/ipfs/<CID>`
  	(proxy server from IPFS, started with `nerdctl ipfs registry serve`)

### Meeting Notes
Video [Recording](https://youtu.be/O-6RWIcIvqk)

Meeting start 11:05 a.m. Thursday, July 20, 2023

### Passwd and group entry handling with `--user`, etc. [issue](https://github.com/containers/podman/issues/18903) (0:354 in the video) - Justin Jereza

Docker wasn't able to create the uid/gid correctly, but Podman was.  Justin showed a script that showed the steps used to test Docker and Podman to show the issue.  Docker doesn't create the entries in user/passwd files, while Podman does.

He ran through a number of man pages for Podman, showing where this was going on.

Just is suggesting adding/modifying these options:
# Do these options continue to add a passwd/group entry or is it a bug because it doesn't follow the Docker behavior exactly?
# Docker behavior doesn't add passwd/group entry
--user
--group

# Retain these and add passwd/group entry to the container from the host
--userhost
--usergroup

# These continue to function as they currently do.
--passwd-entry $(getent passwd $UID)
--group-entry $(getent group $GID)

Using these options he's proposing adding to the pertinent files on the host for each of these options.

The discussion started in the issue noted in the title.  Please review and add comments there.

Matt in concerned that there may be resistance about moving some of this functionality away from the system.

Split the problem into to fixes.  Make --user/--group work as Docker does.

Paul asked if the difference in user/group between Docker/Podman is a problem?  Justin doesn't see a bad effect to that.  He's OK with it as is.  Paul's worried that changing that now for user/group might cause a change in behavior that others would not be happy with.  Justin is brining this difference up only due to it being different, not necessarily that it's wrong.  

Matt believes the current functionality was added as a convenience sometime in the past.  He also think we could firm up the documentation here as to the whys of the behavior.

Justin is OK with retaining the current user/group behavior.

Just says we're using a groupID in a groupName field, and Miloslav said that's a bug if that's happening.  We should be creating a name if one is not getting there.

This is a food for thought, and he'd like people to consider it going forward.

Issue of note:  https://github.com/containers/podman/issues/18903#issuecomment-1595048047

Matt is going to tag Dan Walsh on the GitHub issue to see if he can comment on this.

Jason is Teminus in Matrix/IRC.


### ipfs integration into Podman - Anders Bjorklund

Postponed

### Podman Release (32:33 in the video) - Matt Heon

Podman v4.6 RC2 now, final today.  Podman v4.6.0 today.  Planning to do Podman v4.7 in early fall.  Then a Podman v4.8 in a February 2024 time frame.

Podman v4.6 is a relatively large release.  A number of podman machine fixes/stabilizations.  Podman v4.6.1 should be out in a couple of weeks, in early/mid-August.  V4.7 should have some Hyper-V improvements for the podman machine.  Also, podman compose improvements.

Usually, a 4 to 6-week process to get into CoreOS via the stabilization soak process for any Podman release.

#### Open discussion (: in the video)
1.  None
 
### Next Meeting: Thursday, August 16, 2023, 11:00 a.m. EDT (UTC-5)

## Possible Topics
1. None Discussed

### Next Community Meeting: Tuesday, August 1, 2023, 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. None Discussed

Meeting finished 11:43 a.m.

### Raw Meeting Chat:

```
Justin Jereza10:56 AM
can you here me ok?
You10:56 AM
I can not hear you at all
Justin Jereza10:56 AM
gonna see if i can fix it.
You10:56 AM
I can see you just fine.
Justin Jereza10:58 AM
i'll just use a phone for audio. mic doesn't seem to be working well on fedora.
oh wait, that only works in the US. heh
Justin Jereza10:59 AM
i'll reconnect and see if it works.
Justin Jereza11:01 AM
is my audio working now?
Ed Santiago Munoz11:01 AM
@Justin I see your lips moving, and you're unmuted, but do not hear you.
Ed Santiago Munoz11:06 AM
Audio is very very bad
You11:16 AM
https://github.com/containers/podman/issues/18903
Valentin Rothberg11:28 AM
time check
Paul Holzinger11:28 AM
I have to drop
You11:31 AM
I'm going to go to 40 past the hour on this, then on to Matt, we have no other topics.
Justin Jereza11:34 AM
https://github.com/containers/podman/issues/18903#issuecomment-1595048047
Justin Jereza11:35 AM
Terminus in #podman IRC/matrix channel.
You11:43 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Aditya Rajan11:44 AM
thanks justin !
Mohan Boddu11:44 AM
Thanks Justin
xrq-uemd-bzy
```

### Raw Google Meet Transcript

```
Transcript
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
Tom Sweeney: Okay, everybody. Welcome to the Batman Community. Cabal meeting today is Thursday. July 20th, 2023. We have two topics for today. The first one is about password and group country handling with desktop user and etc. That on Justin's gonna be leaving us on. We also had a discussion about Ipfs integration department lined up over, Dan and Brent are both not here and Anders, who would kind of kicking that off for us, was kind of saying that. Maybe we ought to wait off for that. Once I think we're not going to discuss that much. We have Somebody with strong opinions to do so today. And then Matt you wanted to talk a little bit about pot Versions coming out to
Matt Heon: Sure I can give us another video that's
Tom Sweeney: Okay, go and talk about that after Justin finishes. So with all that, just welcome to the meetings. Nice to have you here. And please leave it off.
Justin Jereza: just, Going forward.
Justin Jereza: Okay, so I said, put my plug in the issue that she could make up to the hospital and said. It's scary. And
Valentin Rothberg: No.
Tom Sweeney: Yes, it looks good.
Justin Jereza: Happens. Is that
Justin Jereza: but,
Justin Jereza: Okay, so what happens?
Justin Jereza: create password and the bottoman base. So that's
Justin Jereza: so he followed by the office, why
Justin Jereza: The problems. Where he?
Justin Jereza: So, you can see here.
Justin Jereza: That's the problem. so,
Justin Jereza: so this thing that we'll find it. And it's a series of Department of events that you.
Justin Jereza: That's the senior, and File. And finally,
Justin Jereza: So that's even presentation. There. Yes.
Justin Jereza: And I think Chris also got the supposed and that this Are almost.
Justin Jereza: presentation. and finally,
00:05:00
Justin Jereza: that's US Open. before, like, He?
Justin Jereza: post and with just
Justin Jereza: And that's what he
Justin Jereza: so we know for acceptable commandments.
Justin Jereza: In this case, 25 with the possibility of adding something either. Which were I don't do the same thing. This user host was just take the bathroom people that are so moving experiment. I think we can actually useful person in certainly. And just did and just innovation somewhere that you can do the classroom and password you.
Justin Jereza: And that would eliminate those three. And so far, I hope the industry much
Justin Jereza: So that's the community. What? It boils down to we have These six options and how do we move forward from there? And the presentation give him what's mentioned in the issue and what
Justin Jereza: the status.
Justin Jereza: So I don't I think that's it. You guys have any comments on this?
Tom Sweeney: I have a hard time following a little bit as well just know, because the audio was kind of Creaky or monthly I guess. I don't know. Any Valentin or Matt. Do you have any thoughts based on this or the discussion that's been going on? And issues.
Valentin Rothberg: no, I did not follow the issue, so I guess it will be hard To, I guess find consensus now in the meeting. on how to move forward, but thanks a lot for the problem. how would you prefer to move forward? Justin?
Tom Sweeney: Ation.
Justin Jereza: He mentioned in.
Tom Sweeney: Ation.
Tom Sweeney: Ation.
Justin Jereza: Okay.
00:10:00
Justin Jereza: There are.
Justin Jereza: Of what he? About where as the corresponding. Password entries into the container energy that Doctor doesn't have.
Justin Jereza: The second part.
Justin Jereza: You Want to show you often a different example.
Justin Jereza: What he
Justin Jereza: and create a course on YouTube option, that would be the same for groups. Even. We place the objects or remove the entirely and need able to presentation. that you
Justin Jereza: I said,
Justin Jereza: The time.
Matt Heon: Comments after everything.
Justin Jereza: sorry, I
Tom Sweeney: I've just added it.
Justin Jereza: saw the Side. And
Tom Sweeney: It's in the.
Tom Sweeney: Yeah, it is in the agenda, not just added it into the Google meet chat as well…
Justin Jereza: yeah.
Tom Sweeney: if that's easier.
Matt Heon: I will say that there's going to be resistance to the idea of moving any functionality away from existing, I can use this. That is The reason we added a lot of this was for convenience and we recognize that it's not necessarily completely compatible Maybe it's not been cases The ability to just do and use your smile user and gets a fairly musical session is important. So I think that we don't necessarily want to take
Justin Jereza: so, I'm thinking basically how about just organizations down here. So,
Justin Jereza: okay, reduce to lose you.
Justin Jereza: and Then for user Presentation says, but he
Justin Jereza: And that's
Justin Jereza: then finally, He?
Matt Heon: I don't know if we want to stream sleep system behavior. You can definitely additional offense that are going to guarantee creation of guarantee modification. The password, I'm not at all close to that, thought it always that. If we were to modify the behavior of existing usually group options, we are going to break people. It is hardly
00:15:00
Justin Jereza: The user options. Anything like you just and us and that's what.
Justin Jereza: lead to, I just
Justin Jereza: Completely others are how? And yeah.
Justin Jereza: You thought so then?
Paul Holzinger: So, maybe the question is What does the problem with? Adding the Entry, it is then actual problem, like something preventing you from getting us to work. Or it's just a different in, if you look at the fire because I don't, See. Why your container image would care that much,
Justin Jereza: yes, I don't think. That he needs it from how God, it deserves as an impact. Okay. Yes if
Justin Jereza: I don't really see any. So, If you guys inside that, Hector, and it's okay. But I think that, okay.
Paul Holzinger: Yeah, because if we would remove adding the entry, then stuff could change behavior, right? If you ask what's your username in the container? If there's no entry Then You cannot know. So, for Portman uses that, it's a potential recreation and we try to avoid making this change. And if there's no reason for this change, just other than toca compat, but there is no one who breaks. I don't see why Be sure to change it at all,
Justin Jereza: It's yes, a difference in behavior, not that I really believe that. it's 25 anything wrong with And differently. The problem that's handled.
Matt Heon: If I remember correctly, this was originally added as convenience functionality, or ruthless pot man. I don't remember the exact context of that that there is a reason why we put it in the first place. if I had an opinion here would be that it's That it's not consistent because I'm 90 I don't have the code in front of me, but I kind of remember what it looks like. And I'm pretty sure the 90% of circumstances were not going to change password and group, but in the 10% circumstances that we do, it could be confusing. So we definitely have a documentation problem It's not going to be clear to users. Why these changes? Have. But what do you call it? I don't necessarily know.
00:20:00
Paul Holzinger: Seen the big use case, I think is the user anders keep which sets your user ID and then in the container you want, the classic Toolbox use case basically so, You want your user copied in and…
Justin Jereza: He?
Paul Holzinger: and behave it, The same. I think it was probably edit because of something like that.
Justin Jereza: I think that basically just thoughts, and in the editor that I can see, And I think that's the three box situation where you would want it. That's inviting so, I did where it's a reason. Why this in You should increase. so,
Justin Jereza: I think that's a good.
Justin Jereza: Within the big nation. Yeah.
Justin Jereza: The next thing happened. we're getting the functionality of the group. the other thing is,
Justin Jereza: I like this. Okay.
Justin Jereza: The name of the user. And so it's the line that shows you. And in this case instead of coffee, which I believe in this case, yes, that's the name of the house. He?
Justin Jereza: Said.
Justin Jereza: I did, he just
Justin Jereza: I mean problems and
Justin Jereza: Keep. I just
Miloslav Trmac: Okay, I think using group ID in the Group Name. Field is just not going to work. So if we are doing that, I don't know whether it's about that we can always fix. I'm not familiar with the code but there's definitely something
Justin Jereza: So let's
00:25:00
Justin Jereza: Know.
Miloslav Trmac: Bottle bubbly. I mean we kind of invent an entirely new random name. Just the principle of the thing is that there has to be a name India.
Miloslav Trmac: Or. Maybe actually not. I'm sorry…
Justin Jereza: So I guess one way to think about this,…
Miloslav Trmac: if you are Edina and entry.
Justin Jereza: this will you mind space on whether they're actually?
Justin Jereza: So in the case of, I think that options they should follow you in this case, The. Saves me. But he accepts and happening on both. when it comes into the containment and not presentation,
Justin Jereza: and then,
Justin Jereza: that's,
Justin Jereza: But if we did have that, then both of these will also look at the host.
Justin Jereza: Coffee here. It's probably really the last two. Which should allow me to. I
Justin Jereza: And so password, and something that has books
Justin Jereza: You and the same, it's good for you to hold and Just talking.
Justin Jereza: the wheels are the people who really
Justin Jereza: Wow, happy and the post.
Justin Jereza: Silently as well.
Justin Jereza: But I think if
Justin Jereza: and the issue I
Justin Jereza: Specifically. And whether they should be probably from the host or not,
Justin Jereza: It's here.
Tom Sweeney: So I'm hearing a bit of silence here and I think people need some time to digest and take a look at the issue on Github and we probably ought to wrap this up in a few more minutes just in. Is there anything else you'd like to ask her say
00:30:00
Justin Jereza: It just something that has to solved immediately, it's just
Justin Jereza: it's right education.
Justin Jereza: and there are matrix. so,
Matt Heon: I'm going to tag Dan Walsh on this issue. That is like, he's not in the meeting right now, but I think it was the original instigator behind Ad.
Justin Jereza: Yeah. So if you have any more and protectively, we're done.
Justin Jereza: if you guys think I've been right, yeah.
Justin Jereza: that's,
Tom Sweeney: Sorry, I'm talking away on mute which isn't very helpful at all. Justin, thank you so much for coming today and getting this discussion going and I'm sure it will continue on inside Github and I RC and Matrix going forward. Matt's, you have plot, Coming up pretty soon. You want talked about that a little bit.
Matt Heon: Let's see. So we are getting ready for for six. We are in Rc2 right now and Ashley correct me if I'm wrong but I expect a final release and…
Justin Jereza: E.
Matt Heon: sometime early next week. Is that what we were planning or am I wrong?
Ashley Cui: I thought we were putting the release today.
Matt Heon: Okay, that's early that I was expecting but that gives everyone something to look forward to after this so pod, 4 6, final probably. Today, we are still expecting to do a four seven. We were expected to do with this summer, but honestly, at this point, it's probably gonna slip into September, but I would expect a four seven in early fall, I would call it and then a four eight somewhere in the February ish timeframe. four six it's a moderately large release, it's a fairly substantial feature release. It's been a while since I looked at the, What do you call the voice notes? But it's gonna have some interesting things. I think this is not
Matt Heon: Is this one of the bigger releases for what? I call it Admin Machine? I'm thinking we added something big there at the point is slipping my mind.
Ashley Cui: Not a big feature, but a big fix. I think for stabilization.
Matt Heon: That's worse. Yeah, we have a lot of bug fixes in system service. We have a spattering of each releases everywhere and generally speaking, I am expecting a 461 and a week or so that'll have a bunch of public fixes it based on any issues, the release happens. And then of course seven maybe six weeks thereafter and four seven is going to include a couple other interesting features. I'm hopeful that we can get some additional windows support in the pot and machine, especially man on hyper-b. We're putting a lot of work in there and I don't want to speak for Brett because he's not here. Maybe we will also have some things. osx native virtualization. let's see. and that's probably the odd, man, composed work that Valentin has been working on the other that just landed. So, feel free to look at that comments.
00:35:00
Matt Heon: Yeah, that's about it Wise any questions?
Tom Sweeney: I'm hearing silence.
Anders F Björklund: When would this come to the apartment machine or core OS?
Matt Heon: Usually, we expect that poor to six week. Basically, we have to get into fedora. Then we have to work our way through the fedora core os, unstable, streams until it's in stable. So, we usually expect to lag by about a month six weeks. It could easily be faster on that, but it usually takes this year or a couple weeks beyond that, so you get at Paul's compose. Exactly. So there is a substantial time.
Tom Sweeney: Must not this particular Pac-Man release but any partner released in general, right?
Matt Heon: Yeah. If it is a particularly important noise, if we had some absolutely critical bug fixed in, there are ways we can expedite, but we prefer not to do that because it puts more workload on us, it with your work, run the F cost team. And generally speaking, no one likes doing this. So, if we do not have something extremely urgent, we're going to go through the soap process which
Tom Sweeney: It sounds good. Right, I'm not sure if I mentioned this after I started the recording but we're going to pass on the ipfs integration into Pod man topic that we had on the agenda today we're going to push that out later or perhaps even postpone it further discussions to go offline on that and then given that I am going to open up to any topics or questions at this point in the open discussion session. If I have anything they want to talk about or ask questions about
Tom Sweeney: It's two centigrate equipment. you're considering I'll just note when our next For the Cabal again will be Thursday. August 16th 2023 at 11am in our community meeting is coming up very soon. It's actually just a little under two weeks now, I guess. And that's going to be on Tuesday, August 1st. Also at 11:00 am. I would love to have topics for other? I have one topic for the community meeting at what it is right now but I don't have any flickable at this point. So if you have suggestions for topics that you'd like to see or presentation better yet present on Friday, those meetings, I'd love to hear one last call. Any further questions, comments. Why is I'll stop the recording?
Justin Jereza: And sorry guys. I
Meeting ended after 00:38:36 👋
```
