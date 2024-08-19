# Podman Community Meeting Notes
## Aug 6, 2024 11:00 a.m. Eastern (UTC-4)
### Attendees (20 total)
Anders F Björklund, Ashley Cui, Brent Baude, Ed Santiago Munoz, Gerry Seidman, Jan Rodak, Jhon Honce, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Nicola Sella, Paul Holzinger, Rick Wagner, Tim deBoer, Tom Sweeney

### Topics
1) Podman v5.2 - Matt Heon
2) Podman aardvark DNS TCP - Paul Holzinger
3) Statement about EOL date - Anders Björklund
   * https://github.com/containers/podman/discussions/23352
   * similar to <https://endoflife.date/docker-engine>

## Meeting Start: 11:03 a.m. EDT
### Video [Recording](https://www.youtube.com/watch?v=q_OTd4zyN40)

## Podman v5.2
### Matt Heon
#### (1:30 in the video)

V5.2 came out last week. It was relatively quiet after the v5.1 update. Many RHEL folks were working on CI issues. We had many race conditions in the CI that have been fixed.

The krun support has merged, which is big for the macOS environment.  A few flags were tweaked, and no breaking changes.

Matt expecting an October release for v5.3, and maybe another later this year, or early next.
v5.2.1 out next week, and we will probably also do a v5.2.2, but dates are TBD for both.

Backport of kernel fix noted in chat is moving back to other versions.  Chat in Podman Matrix.  It has been backported into RHEL 8.

## Podman aardvark DNS TCP
### Paul Holzinger
#### (5:25 in the video)

The aardvark-dns is our custom DNS server to solve container names.  DNS generally uses UDP, but it also works on TCP as well.  Prior to v1.12, TCP did not work, and with v1.12.0 and v1.12.1 it does.

##### Demo - (7:00 in the video)
Demo of a created image was now able to see a tcp process with a `ss -tulpn` command.  Prior it wouldn't work.  Now it is.  There are some limited tcp
There was a problem if you had a dns server running, you'd get a address already in use error that was not very enlightening.  NEw error created which gives the user a chance to debug.
Large refactor for this change, so no backport are planned, it will only in Podman v5.2 and above.

## Statement about EOL date
### Anders Björklund
#### (: in the video) - 13

Links of Interest:
   * https://github.com/containers/podman/discussions/23352
   * similar to <https://endoflife.date/docker-engine>
Currently v5.2 is the only one in Supported status.  Recommendations from users that we post what End Of Life (EOL) is for the versions for Podman in the https://podman.io website.

Is the ask to create an EOL statement when a version is released, or to create one at some point in time?  The thought for the moment is the sooner the better, but not necessarily right at the release date.

Users are concerned about how old the software will get. For example, v4.8 went quiet quickly, and then v4.9 had several releases after that.

The RHEL team is obligated to keep Fedora releases alive, and might be able to set EOL dates for that platform, but not for ones that they don’t control.

So we are being asked to create an upstream policy for EOL of Podman releases on Fedora.

Matt wonders if we could say minor (X.Y) releases are supported for a few months.  Once a new Z (X.Y.Z) release comes out, prior `Z` releases for that particular `X.Y` are not supported.

There was also questions over when a Podman version is created, when does the version in `podman machine` get updated.  Given recent changes, that should be happening within a few business days, if not sooner now.

Also needs chasing, changes to Podman Desktop, when does Podman get updated too.

A support contract is missing for the upstream community.  Matt would like to do so, but wants to make sure we make something that we create is valid.

The recommendation is to put the policy on the https://podman.io website rather than GitHub.

## Open Forum/Questions?
#### (23:57 in the video)

None

## Topics for Next Meeting

1) DOSU demonstration - Devin Stein
2) Podman AI Lab Demo with GPU pass through - Sally O'Malley

## Next Meeting: Tuesday, October 1, 2024, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, September 3, 2024, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:28 p.m. Eastern (UTC-4)

## Google Meet Chat copy/paste:
```
You
11:00 AM
HackMD with Agenda: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?both
keep
Pinned
You
11:15 AM
Links of Interest:
   * https://github.com/containers/podman/discussions/23352
   * similar to <https://endoflife.date/docker-engine>
keep
Pinned
Anders F Björklund
11:24 AM
https://endoflife.date/recommendations
You
11:26 AM
Likely losing my network in a moment.
```

## Raw Google Meet Transcription
```
Tom Sweeney: Welcome folks. This is the podman community meeting. Today is Tuesday, August 6. And this meeting happens on the first Tuesday of even number of months. We will try to make the timing every now and then friendlier for India, Australia. topics are driven from meeting requests or Emails to me so however works best for you. I've put the agenda up in the Google Chat for the room. So if you want to get in there go ahead and take a look there for what we're going to have for products today. And generally we have discussions for Paw man build a Scorpio and related container projects. So if you have anything related to those Technologies, we have to have it. Are meeting notes or noted here as well? and then for today
Tom Sweeney: we have topics of pop in 5 too from Matt hand and then Paul's going to give us a quick little demo for probably an artic artwork DNS TCP update and then eel data discussions from Anders. I did have a couple other things lined up today, but had to have the folks who are going to present unfortunately had it back out, but they will be here for months. and for the October meeting And I think that's got all I have I will be taking notes on the hack MD if I mistype anything or special if you have any links or additions to that. I appreciate you go ahead and add them to the fact MD as well. And with all that I'm going to stop sharing and I will hand it over to Matt.
Matt Heon: Okay, so I'm gonna do a brief discussion of odd Man 5 2 which just came out last week five two is been a relatively quiet release another one after five one. So we had a very big breaking change release with five other. We're starting to be a little calmer after that be a little more measured but also we have a lot of people inside the podman team working on CI refactory and general fixes to our development processes, which is traditionally amount of time. We're spending working on directly at least until that's done. What one of the things that did spawn was a lot of flake fixes? We have a lot of race conditions inside podman that got resolved in this last release and a lot of just other bugs got fixed as well. But feature wise we had lip K Roots support merged. This is a pretty big one for podman on Mac because it lets you create VMS with gpus mounted into them.
Matt Heon: And we also fixes Fair upper partitions to Quality so quad that's really getting good at this point. It feels like effort at least we get closer to support the entire apartment. Following that I decent number of non-breaking changes couple Flags had their meet exact meetings tweets things of that nature. So on the whole relatively common release and I am expecting at least one more release this year probably in the octoberish time frame and potentially another one after that. We'll see.
Matt Heon: And that's about all I have.
Tom Sweeney: Yes, I'm for the five two. We're expecting a z or two release of the next few weeks months.
Matt Heon: I am hoping that we're going to get a five to one out next week with a variety of bug fixes that have been accumulating that didn't quite make it in time. five to two little far on the horizon to predict what I do think we will have one just don't really know when
Tom Sweeney: But they're great.
Tom Sweeney: Thank you. Any questions on any of that for Matt?
Tom Sweeney: Okay.
Anders F Björklund: Namaste there was a question in the shaft about the new car another Mount feature requirements. asking for clarification if it was back for the red or something. not
Matt Heon: I do know it should be in all rails for delivering. We haven't had any problems like weighing it.
Anders F Björklund: I think it really they were just requesting that to be mentioned next to the kernel version number or something.
Tom Sweeney: What's happened?
Tom Sweeney: Okay.
Tom Sweeney: I didn't know if it was a discussion and GitHub. That I've missed.
Paul Holzinger: I answered that but it was backpointed into relate so should be working I guess but we are no longer shipping Department updates as well like Portland five updates, so We don't test it.
00:05:00
Tom Sweeney: So at this point, I think I'll hand it over to Paul since he's got the screen already talked about artwork DNS and gcp.
Paul Holzinger: So in case you don't know, what DNS is and how about DNS is our custom DNS server that is there to resolve container names between containers on the same network. So if you have to contain one of the name container one and container to then you can Do a DNS look up on the name and get the IP of the other container in order to? communicate between them so far this was only done so DNS is mainly UDP protocol. But it also works via TCP, which is near the different phase of larger DNS messages you need to send because you're the packages size Unlimited.
Paul Holzinger: The protocol only lost for so much information. So in this case all modern clients will transparently fall back to switch over to TCP. And you said And anarak DNS so far couldn't handle that that is now fixed in. What's the version 1.12? Arabic DNS 1.12 and that about 1.12. So if you have this versions We can now first create a network. And where we have DNS enabled by default. So just call it in one.
Paul Holzinger: just Through interactively and there are greater the Fedora base image with a dick installed already, which is just our image, but I have dig so we can just do a public. and look up and if you look in ATC results.com So this is the network Gateway IP. Where are DNS if running on the host, so
Paul Holzinger: show
Paul Holzinger: Sorry, we now see automatic DNS process running. And it's running to networks because I also had another container already running from testing. I guess left it running. And so yeah, you see it's binding unipe. It's binding the TCP socket and if you know nothing again, you see at the bottom. It's using UDP by default because it's a small request but if you try to request something larger like some domains if a lot of Txt records that will create a bigger response. The related.com domain as an example. see at the bottom. It's automatically using TCP and see it's like a larger payload the message size here.
Paul Holzinger: And previously this wouldn't work. so, if you had Crazy large records. Yeah, you're usually don't see this with and what a records because Yeah, some limited IP only but it's like txt records or I don't know some SRE or whatever records you might request day that you might see that.
Paul Holzinger: And yeah, I think I can show one other thing
Paul Holzinger: just
Paul Holzinger: so one other thing I fixed so there was a problem previous and previous versions if you if you're already having DNS on part 53 running, right?
Paul Holzinger: on all addresses then you would. That's why I think if it's still on it, so No problem. Of course, if you don't test properly that that's what happens. Yeah. so just as an example, so I have to put already Bond and now it should. Get a new era. Which tells us that anarchiness is not running and previously it was just ignored. which was very confusing and led to some Upstream issues where users were wondering why they are DNS isn't working and it was because it was already some other dinosaur listening on the port.
00:10:00
Paul Holzinger: and yeah, I think it's pretty much everything you can say about that.
Paul Holzinger: any questions
Paul Holzinger: Yes, they were independently like you can update only the American dollar back if you like to but yeah. it's
Tom Sweeney: Yeah, and plans for further back. So it'll be five two and above.
Paul Holzinger: yeah, it was a large refactor. So there's no way we are going to beg for this. realistically, so
Tom Sweeney: Great. Yeah.
Paul Holzinger: 112 and off
Tom Sweeney: Any other questions for Paul?
Tom Sweeney: Right. Thanks Paul. I will now turn it over to Anders for the young discussion on statements about you all e o l l to and I cannot get that out under so I hope you do a better job with it and I did.
Anders F Björklund: Yeah. Yeah We can go with end of life instead. It's for you.
Tom Sweeney: Okay, it's easier.
Anders F Björklund: Yeah, there is a website called end of life. Which has taken upon itself together and of life date so various products and it also includes some of the open source project. So there was a page for doctor and in that is the mobish server.
Anders F Björklund: And then there was a request to do a similar page for the podman engine. I mean for the Linux based server software, so I did such a page by your Gathering and release dates and then there was a question about which release Cycles are end of life which are still supported. so we have some discussion on that so I think we landed upon that Upstream. The latest release is supported So currently five two. And the others are not supported Upstream, but they are supported in Fedora but those have individual product pages on this website. So they are not listed under the apartment.
Anders F Björklund: Then there was some. recommendations from Upstream that you should State this on the website somewhere What users can expect? if you are following semantic versioning and how long I release is supported for if there are now LDS releases.
Anders F Björklund: and then again that I posted a link to the preview of the prmade which is basically a demo file with dates. And then also a small graphic visualization of the same place.
Matt Heon: So I'm still a little unclear is the ask that we set an EOL date when we create the release or that we keep a consistent list of EOL dates when the release actually eols.
Anders F Björklund: so currently it's just UL colon but they were saying it was more of interest for the end users if they would know just how out of date there are three four deployments. I'm not sure if that relevant actually but It was just a website presentation thing. So now it's just a green or red color. There are no dates on when it stopped being updated because you couldn't really automate this from the git tag. So the GitHub releases. Because 4.8 grows silent fairly quickly, but for about nine continues to get releases after 5.0 series out. So there is a small overlap when the major version is out. So that's
00:15:00
Matt Heon: We've never formalized a policy on that, but it would not be a bad idea on our part to do so,…
Anders F Björklund: no.
Matt Heon: especially considering. It usually for us is going to go around Fedora releases. Honestly, like we will we are obligated to keep the previous minor release around…
Anders F Björklund: Yeah.
Matt Heon: until the Fedora released associated with it dies so we can actually Paul I think we could set eols based on that with your
Matt Heon: I wonder if we could say that we guarantee at least two months of support for every minor release. So five two is guaranteed to be supported August and September and then we could extend that support necessary if we're going to do say in October five three, but I don't think we've ever done minor releases on a short Cadence then two months.
Tom Sweeney: And when you're thinking minor release you're thinking and XY release.
Matt Heon: Yeah, X y z support is we supported until the next xyc comes out and you're expected to immediately update XYZ or purebug fixed releases. If you're not keeping up stay on the bug fix releases, I can't do much for you.
Anders F Björklund: Yeah, I think they call them that's releases in the December lingo. the digit I mean But it's really up to the project to Define these things.
Matt Heon: Yeah, sorry.
Anders F Björklund: This website will have to gather information and link to it. I used the git tags, but then I noticed it's actually using the GitHub releases to some of the dates were off by one but it's more or less the thing.
Anders F Björklund: especially with the earlier releases that could be a couple of days before the GitHub release was in order after it was tagged because the CIA was not super but nowadays it's more or less the same day usually Then there was another discussion on when the server is available. when it's your Portman machine version updated, but I don't think we will go on this website, but that's a source of confusion for some music.
Matt Heon: That is mostly salt at this point. Now that we've moved over to oci artifact-based distribution. We're building those same day. We make sure we have the resources on the team available to get the appropriate images out same day. And we're also moving toward a process…
Anders F Björklund: Yeah.
Matt Heon: where it'll be completely automated right now. It's manual intervention to get the images built.
Anders F Björklund: and of course, the user was asking about the windows WSL image, which the only one that does not follow because it's using fedora.
Matt Heon: that is also we're looking into whether we can fix that.
Anders F Björklund: biological close enough
Matt Heon: Yeah, yeah,
Anders F Björklund: and then in podman desktop, it will show you the client version. even And then you think you're updated and you're wondering why the bugs won't fix them. So there's some. minor things that's to
Anders F Björklund: that was basically just wanted to share this image. Hopefully it will be much drain when will be available on the normal site and then there is a Automation in place. So whenever you make a new GitHub release, it will update them the patch versions and when the five three is out then someone has to make a PR to add the new release. I can to the web page.
00:20:00
Anders F Björklund: Same goes if you want to add them a text for certain releases are supported for longer in a certain distribution stuff like that. Right now it just says that the Upstream product is supported by the containers community and there is no support contracts from this community.
Matt Heon: This is something I would like to get more clarity into our readme. I don't know what kind of a formal policy we can evolve here. But I feel like it would be nice to have more clarity for the community as to how long they can expect through eases to live.
Anders F Björklund: yeah, and
Matt Heon: I know Paul is immediately going to say we don't plan that far in advance, but I think we can make certain guarantees really make a
Anders F Björklund: Recommendation from the Upstream is that you put the information on the website because if you put it in a repository, then you might upload it end up with the situation where you have different policies for different branches. So, the current documentation when you make a fixed a monster and then someone is wondering why it doesn't apply to the release and so on so it's probably better to do these things on podman.io and then you can update them. whenever
Matt Heon: They understood.
Tom Sweeney: Trying to take notes and talk at the same time just work. so it's there any further action that we should do for this for now.
Anders F Björklund: I don't. Know also for Paul I changed the title from Portman and into pod man on popular requests. I don't know. And then the same day someone was posting the immediate release of podman 1.12 and I was like, yeah now it's starting but it's partman desktop. Yeah.
Anders F Björklund: and that's all I had so he can open it up for other discussions.
Tom Sweeney: but you said
Matt Heon: Tom you're break
Jhon Honce: Tom's Video is stopped moving for me.
Matt Heon: Yeah, I think Tom may have dropped. Tom can you hear us?
Tom Sweeney: But are getting through.
Matt Heon: Okay, we can hear you. Tom your network is
Tom Sweeney: Yes, I love my ISP at times. That was not one of those times. I didn't quite hear what Anders said at the end there. I don't know if we have any further discussion if we should move on at this point.
Matt Heon: I think we're going to move on.
Anders F Björklund: And yeah,…
Matt Heon: Sorry, man.
Anders F Björklund: that's what I said move on.
Tom Sweeney: Okay, we'll move on which leads us only with any open Forum or Anybody have any questions or comments or ask that they want to do here now?
Tom Sweeney: very quiet I'll let you all think real quick about that and I'll just go over what's coming up next. So our next community meeting is on October 1st, 2024. We're doing again the community meetings on even numbered months on the first Tuesday of the month our next cabal meeting. It's not July 2nd as I have it in the notes that must be September.
Tom Sweeney: September 1st Right after Labor Day for a bunch of us here in the US. So that'll be our next cabal meeting. I'll fix that up in the notes. Again. That one is on odd number months that we were doing that in the first Tuesday of the month for the next community meeting. We're going to have those who demonstration Brent or Matt. Let me know if I'm just announcing that from Devon Stein and then Okay,…
Brent Baude: Yeah, I don't know how it's pronounced.
00:25:00
Tom Sweeney: u looks interesting. So they'll be a good little topic for us and then cellular who is here last time with us and had hoped to be here today but called away because she's getting ready for Deaf coffee us. If you're not hooked up with that give that a look up The Confident us happening in Boston on August 15th. I think just right around the corner. Anyway, she's going to be doing an AI lab demo with GPU pass through.
Tom Sweeney: On the next community meeting. So with all that I'm going to give questions one last topics I'm not hearing anything. Given that I will thank the presenters and we'll just stop the recording them. So, thanks all.
Meeting ended after 00:25:56
```
