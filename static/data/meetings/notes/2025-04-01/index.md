# Podman Community Meeting
## April 1, 2025, 11:00 a.m. Eastern (UTC-4)

### Attendees
Alex Guidi, Ashley Cui, Brent Baude, Dan Walsh, Gerry Seidman, Jan Kaluza, Jan Rodak (Honza), Kevin Clevenger, Lokesh Mandvekar, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Navya Sree, Paul Holzinger, Tim deBoer, Tom Sweeney

### Topics
1) Updates to the CNCF Governance - Matt Heon
2) Upcoming Changes to Triage and Upstream Authority - Brent Baude/Matt Heon

## Meeting Start: 11: a.m. EDT
### Video [Recording](https://www.youtube.com/watch?v=Jlt21bIrmZQ)

##  Updates to the CNCF Governance
### Matt Heon
#### (: in the video) - 2

The governance document target merge is later this week, and then we'll be running against it once it merges.  The Pull Request (PR) with the change is: https://github.com/containers/podman/pull/25398

We have three roles in the Governance doc.  Reviewers:  Can review but not merge a PR.  Maintainers: Has merge ability, but only on a particular repository, like Podman.  

Core Maintainers: They have enough experience to make decisions on all projects.  They can review/merge in any project.

The thought is we might need a Triage role.  They would be able to decide whether or not an issue should move forward.  Should this be a separate role outside of the role of a Reviewer?  We have talked about adding a triage label on the repositories, which would be part of this.

Matt would like Reviewers to have the ability to rerun failed tests.  But that might require "Write" access to the repo, which would also allow for merges of PRs.

Tim pointed out that for a draft PR, the desktop repository will allow for a label to be added to allow for further testing.

The issue on the Podman repo is where the CI requires a set of tests to pass before the merge, but a few of them are flakey and, on occasion, need to be rerun.  

Tim suggested a label that might be added that would have the privs to rerun the test.

Paul is concerned that we have two or three test systems, and would one label to handle them all or only a subset.

Ashley was wondering what the rerun does on the shiftbot.  Or perhaps somehow retrigger the test based on a comment.

  
##  Upcoming Changes to Triage and Upstream Authority
### Matt Heon and Brent Baude
#### (: in the video) - 18

What's the criteria for closing a ticket that is not likely to get done?  Brent thinks the criteria for staleness, and other factors.  Would people be OK with closing?

Tim thinks some just won't fit architecturally, and those should just be closed.
For ones that are waiting for a comment can be closed after some time of waiting for a response.  The Podman Desktop uses the stale bot, which closes cards after "X" number of requests for comments without a response.

Brent is worried about the valid bugs that a stale bot might close, even though it's a valid bug, but the Red Hat team doesn't have the people power to close it.  Yet the Red Hat team hopes that the community will swoop in and fix the issue.

Mohan notes there are things that are stale versus things for which we don't have people power to do.  Maybe add a "Help" label that the Red Hat team won't be able to address but would like the issue to be fixed.

Jan thinks we should keep the bugs open, but note we will keep it open for someone else will take it.  Possibly do a label of some sort and close any invalid requests that we would not accept.

One of Brent's pains is incomplete issues that don't have enough information or reproducers that don't work or are impractical to use.  He would like to close those.

Jan thinks it's OK to close these if we allow someone to come in and reopen.

Matt pointed out that we have the problem of adding "me too" messages to closed issues.

Brent doesn't want to close them immediately but wants to give them some time to supply more information.

Ashley thinks adding a label on issues like this and then closing without a response for a few days could be closed.  This should be done via automation.

The thought would be to trial this on Podman and if it works there, expand to other projects such as Buildah, Skopeo, and others.

Think of a 30 to 45 days for the closure period.

The one downside, the person responding won't be able to remove the label.  As part of the automation, we should have that remove the label.

The plan is to go forward on this.  We'll work out the details in the next few weeks.  We will put together a card for the automation to have someone look at that on the Red Hat team.

The final solutions will documented in the [ISSUE.md](https://github.com/containers/podman/blob/main/ISSUE.md) file on the Podman GitHub site.


## Open Forum/Questions?
#### (: in the video) - 40.

1) Navya using rootless and rootful containers.  They are having issues using a AWS service.  Is Podman inside a container there OK?  Matt doesn't think you can run a container in a container on AWS.  Dan said you need capset UID/GID admin to do that, and AWS geernally doesn't do that.  It depends on how to do that admin setting.  Look for a blog on running [Podman under Kubernetes](https://www.redhat.com/en/blog/podman-inside-kubernetes).

2) Navya asked a question about creating a user within a Dockerfile.  Dan asked Navya to open a discussion in Podman's GitHub repo.

## Topics for Next Meeting

1) None

## Next Meeting: Tuesday, June 3, 2025, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, May 6, 2025, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:46 p.m. Eastern (UTC-4)


## Google Meet Chat copy/paste:
```
 Paul Holzinger
 11:36 AM
 https://github.com/containers/podman/blob/main/ISSUE.md#why-was-my-issue-report-closed
 You
 11:44 AM
 Navya: Podman under Kubernetes: https://www.redhat.com/en/blog/podman-inside-kubernetes
```

## Raw Google Meet Transcription
```
Transcript
Tom Sweeney: Welcome everybody to the broad man community meeting. Today is April 1st, 2025. Just have a quick overview of what's going on today. So we meet on the first Tuesday of even numbered months. Timing might be moved from time to time for making things easier for India, China, Australia and other folks.  topics are driven from prior meetings or requests to me andor the agenda that we have is up and available online at any time that you want to go ahead and add a topic to it. Discussions are accepted for podman, builder, scopio or any related container projects or even container topics that you'd find interesting. Our meeting notes are listed here on this slide. I will put them in the Google chat in a moment here. And then for today, we just have oops can't change there. Just a couple of topics.
Tom Sweeney: So plenty of opportunity to ask your own questions. So we don't have a podman 54 update unless Matt has something he wants to talk about quickly. That was a cut and paste there. We do plan to talk about the updates to the CNCF governance document that Matt has been working on recently and we'll be going online soon. We're also going to be talking a little bit about upcoming changes to the triage and upstream authority part of which is driven by our move to CNCF.  And then just a quick reminder that our next meeting for the community meeting anyway is June 3rd, 2025. And with all that, I'm going to wrap up and hand it off to Matt.
Matt Heon: Hi folks. let me drop a link in the chat of the governance model. So the governance model is a pull request against the podman repository right now. We've been working on it for I want to say a month now and I think we're getting very close to where we want to be. there are still some points that we are debating and I think we'll have a public debate on one of those points a bit later.  But I just want to say that I am trying to get this merged by end of this week. And with that, we'll be adopting the governance model as soon as it merges and basically starting to run things according to it. Honestly, we're trying to run as close to We're trying to run things as close we can to it even as of now. But, once it merges, we'll be officially following it. And now I believe we can actually go back to a debate we were having a couple minutes ago off this call.
Matt Heon: Brent, do we want to talk about whether we should have a role dedicated to triage and…
Matt Heon: specifically to assist us with triaging issues upstream?
Brent Baude: Yeah, I think…
Brent Baude: if you just walk the roles real quick for everyone and then that probably would help seed that conversation and maybe somewhat explain the mismatch in roles and what we have to do.  Yep.
Matt Heon: Give me a moment to get the text size big enough that people can actually see what I'm talking about. And Let me share my screen. Can everyone see this? And is text size okay?
Tom Sweeney: Yes.
Matt Heon: So basically as the governance model is written right now we have three roles for contributors of authority. the first one of those is Reviewers are intended to be code reviewers who do not have merge authority. They are primarily going to be looking at pull requests identifying things that can be basically doing pull request review.  They are also involved in issue triage and they have the authority to review pull requests but not to merge them. Then we go up to Maintainers are people with merge authority but only on a single repository. the podman project as you may know was donated in three separate pieces. Podman, build and scopio. And because of that we don't have a role that has right authority on all three of them initially.
Matt Heon: We have the maintainer role where you have right authority but only on a single repo. Basically, you're familiar enough with one of the projects to be a maintainer, but you are not someone who's familiar with everything. And then finally, we step up to Core maintainers are people who have enough experience with the project to make decisions for the whole project. So, you get right authority on all repositories. You get a vote at meetings where we decide the fate of the whole project. things of that nature. And what we don't have is something underneath reviewer. So we have a role that is eligible to review pull requests,…
Brent Baude: Can you scroll down so we can see the reviewer privileges?
Matt Heon: but we don't have a role that has more limited privileges. I can just go ahead and look at issues and decide this issue needs more information. I'm going to apply labels it to that effect. This issue has been triaged.
00:05:00
Matt Heon: I'm going to apply labels saying that it's high priority things to that effect. So these are the responsibilities, requirements and privileges of reviewers. reviewers have very limited privileges in the sense that they have the ability to approve poll requests and…
Matt Heon: they have the approve ability to recommend other reviewers. But that is it.
Brent Baude: At first blush,…
Brent Baude: this seems to be pretty good in terms of at least what I had for the idea of a triager. do folks see any issues with any conflict between reviewer and triager? can they be the same thing?
Matt Heon: I think it's already written into the responsibilities that they will assist in issue triage. So if we want to have them be the same thing, that is perfectly acceptable. I can just add to the privileges that they have right authority but only on labels. I think GitHub calls it triage authority.  That will allow them to go in and basically mark issues up the way that we need to work on
Brent Baude: Yeah, I mean that seems reasonable. So the one thing we talked about was this does not include rerun ability because that requires write authority on the repo. Correct.
Matt Heon: I would hope that we could get reviewers the ability to rerun tests because while they won't have merge authority, they should have enough to approve poll requests.
Brent Baude: Paul, is that even I mean we rerunning the test keys off right authority? No.
Matt Heon: I'm hoping that'll be enough. If it's not, then that would be tragic because it's very hard to review pull requests without the ability to rerun the tests.
Paul Holzinger: That's my understanding. But I also think if you log in the sirus web UI with your account, you should be able to rerun your own tests even if you don't have right on the repo.
Brent Baude: It's okay.
Paul Holzinger: But I'm not sure since my account obviously has all the rights. So not quite sure how this interface looks if you don't have any permissions whatsoever in zeros at least on GitHub. I know it will not present you with the option to rerun if you don't have right access. in general if the concern is rerunning tests and I mean the pain isn't just a viewer a new person the pain is for every maintainer all the time clicking rerun.
Paul Holzinger: if we want to have a better automated way to do that then that's something that can be worked on. that if you have some higher privilege spot kicking off the rerunning the tasks for you that could work for anybody I guess.
Brent Baude: others. Tim, you're from the Podman desktop folks. do you have any thoughts to contribute?
Tim deBoer: You're catching me out. I was starting to look at something else.
Brent Baude: Matt, I mean, I guess the question is what I think this whole thing just revolves around right authority and what that really means. Agree.
Matt Heon: I don't think the reviewer role should have right authority as written. It's not someone who should be merging things. So, I'm okay with it as written. I'll just expand it to say that they will have triage privileges in GitHub so they can modify labels. But I would really like it…
Brent Baude: Right.
Matt Heon: if we could get the ability to rerun tests in here. And I know that that's what I'm saying. We've just decided is impossible. But it really sucks that it is
Tim deBoer: Sorry, I don't know if this helps, but I know we have a case where when we have something in draft state on GitHub, it only runs a subset of the tests, but if you add a label, it'll run more tests. so that might be a way of giving somebody…
00:10:00
Tim deBoer: who has reviewer who can't commit to the repo, but hey, they can add a label and that'll change which tests run.
Brent Baude: Yeah, the specific problem we're trying to solve or…
Brent Baude: understand or talk about here, Tom, Tim, is that we have tests that will periodically fail or flake, but our merge bot will not allow a merge to occur if tests fail. So you have to have the ability to go in and click rerun, to get it to rerun and pass. And that requires GitHub right authority as far as we know today. So we have a mismatch in…
Brent Baude: in terms of what we'd like for privileges versus responsibilities.
Tim deBoer: Yeah, that's an odd unfortunate one on GitHub.
Brent Baude: What Paul is saying I think it perhaps is more related to how the Cirrus plugin to GitHub works or something. So, we've got some exploration to do.
Tim deBoer: Yeah, but again, maybe there's a label where you can have a bot that looks at a label and when it's added or removed or something, it has the authority to go rerun the test. I don't know. There's more work.
Brent Baude: Not a terrible idea.
Paul Holzinger: I mean the basic issue is sort of we have different CI systems which makes this really difficult. We have mainly zeros which offers you to rerun either via GitHub UI where there's a rerun button for each failed test or you go into the seros web UI if you actually go into the details and then you have another rerun button there. I'm not sure if both of them need the same privileges or not. that needs to be tested. But the real problem is if you go further than zeros, there is packet which has some packet specific commands to rerun. I have no idea what permissions those need. And GitHub actions is used as well. Not really much on Potman, but they are uses and…
Brent Baude: Yeah.
Paul Holzinger: those will only ever be rerun via GitHub obviously.
Paul Holzinger: So that's sort of the issue and I guess in the day-to-day work only we care about the zeros but the other stuff must be considered too.
Matt Heon: Ashley.
Ashley Cui: I know our open shiftbot has a slash rerun command. Does that do anything or…
Ashley Cui: or will that trigger any of our tests or do we currently have it to ignore things? Okay. Okay,…
Brent Baude: My understanding is the rerun command will rerun tests that you have written in open shift…
Brent Baude: which we don't use open shift as a test platform. We just use the bot as a merge protection.
Ashley Cui: because I think I might be wrong, but packet has a slashpacket retest function. So I was wondering if we had a command that we could configure users to be able to retest things. But if that's not how it works, then we can look into other options.
Paul Holzinger: Yeah, the open shift commands are all set up with their own open shift vi sort of thing.
Ashley Cui: Okay.
Paul Holzinger: That's another issue with us using part of open shift bots.  It's very confusing what's implemented and what's not. in open shift the way it works you have the okay to test and then people can run retest as far as the packet one as I said that that exists and works. I'm not sure if it works for everybody or only checks the permissions of the user who wrote the command. that I'm not sure.  Yeah.
Ashley Cui: I guess the other thing is maybe we can look into if there's a way to retrigger off tests based on comments. so that we could set custom permissions.  But that's probably a whole other can of worms,
Paul Holzinger: But I mean the problem is always you need to consider abuse and people can trigger I don't know thousands of jobs if things go wrong. it's also not that great. I mean right now they can create as many PRs as they want or force push as often as they want.  I guess that's already a possibility for them to go rogue, I guess.
00:15:00
Brent Baude: Matt, maybe there's a card here to at least educate oursel on what permissions are required to do what and…
Matt Heon: Yeah, I think that's reasonable.
Brent Baude: spike that out and then we have information to actually operate from. yeah.
Matt Heon: All right, sounds good. All right, Tom is apparently having to drop because his laptop is having issues. So, I will ask, is there anything more we should do on this because I know there was another topic you had, Brent? I think that's reasonable.
Brent Baude: I was just going to say so just if let's transition to the other part.  Yeah, there's nothing specific here, but I do think we as a team have never sat down and sort of come up with a final or a collective decision on when dealing with issues and PRs that either languish
Brent Baude: or are inaccurate won't do those kinds of things. And as we're trying to have an effort, if the team doesn't the outsiders haven't recognized, we're trying to kind of build up a little bit more of a process so that we do what we say we're supposed to be doing and that's about it kind of an approach.  So, I think there's a couple of topics in there, Matt. Maybe you can kind of help us guide through some of it, but one is, what are the requirements for issues? I think we're generally in agreement that we don't want to go through and just start closing all out issues cuz they're old because we do see some value in that.
Brent Baude: And it's been pointed out if somebody did want to come and fix something and contribute it, we don't really want to hide that stuff either. Generally, is that the case how the team feels?
Paul Holzinger: That's how I feel. Let's check.
Brent Baude: Yeah. Others Yeah.
Matt Heon: I'm okay with it. I'm not completely satisfied with the answer, but yeah, I don't have a better solution.
Brent Baude: I think if we kind of generally agree that we can find something that works for those that get stressed out by the sheer number. but yet we don't close the door on things that may be valid or somebody wants to contribute to.  I guess one of the things I've been kind of kicking around is what is the criteria for actually closing an issue that's not going to get done?  And one of the ideas I was kicking around actually with Lewis the other day is I'm kind of thinking there's the certainly staleness is a factor but it can't be the single reason why you would close off an issue.
Brent Baude: But I'm thinking that it's a combination of stale not enough information they didn't provide the minimum information and no reproducer and pro possibly something else. does that put a level of comfortability for folks though if we were to come up with criteria like that that was sort of multi-headed beast that we would begin to close some things
Tim deBoer: And my feedback I think there's some things that are just clearly bad ideas architecturally wrong whatever. and I think you respond to those and say no it's not going to get done. but the things where you say, "Hey, I need more info." And then you don't get a response or, "Yeah, it's not a bad idea, but we're working on other things and, it never seems to get done." it's just easier if you use a stale bot. basically the one that we use in Potman Desktop, it puts a comment in, you decide how many, days. If there's no activity, it puts a comment in, says, "Hey, if you care, put a comment.
00:20:00
Tim deBoer: if you don't it's going to disappear in another 30 days and again you configure it and then it just closes it out and I think that nonhuman it's not somebody saying no we'll never do this it's just a bot is a little bit friendlier for whatever reason and…
Tim deBoer: you don't have to worry about those two cents
Brent Baude: comments from folks.
Brent Baude: I have one but to hear from others. I think we have a stalebot, but that's the part we're just not quite comfortable with.  It may very well be valid, but just because it could be a valid bug, but not high enough priority or not something we're able to nail down because we don't have the hardware or the environment. And maybe somebody comes by and does and is willing to fix it. that's our hesitation on having a stalebot be the sole deciding factor.
Tim deBoer: Yeah, but I mean people have that period where all they need to do is drop a comment I still care about this and it stays open or you just live with the fact that if it was important somebody else is going to open another one or…
Tim deBoer: somebody will reopen it two months from now.
Brent Baude: A lot of me talking and…
Brent Baude: that means that I'm going to get my way if you all don't speak up.
Paul Holzinger: I think there are two things.  So first of all we are pretty much already closing everything that's like we don't want to do this or it's invalid or not possible or whatever I think we are trying to move towards more of this gray area right towards and some things we know we won't work on but we didn't close them because technically they are a bug or an issue
Paul Holzinger: but they aren't important or it's I don't know whatever distribution you never heard of something or where you cannot confidently tell it's not a Portman thing but your gut tells you it's not a Portman thing or something like that and this is sort of the issue since it's
Paul Holzinger: it's a very personal decision to if you think it's actually not something we do or not because as individual it's difficult to make the decision we will never do that maybe the colleague thinks it's a great idea and stuff like that I don't know or it's a real issue this is sort of in my eyes what the policy needs to address in  Some sense where we have some line of definitions. What counts as we keep and what counts as we close.
Mohan Boddu: I totally understand the difference between stale and the things that we cannot do right and Brent was we can close them if they are stale but Brent was talking about they are valid but it's not part of the priorities or it's not in the direction that we want.  Maybe how about adding a label to them help and if someone from the community wants to pick it up, they can easily go and look at these are the tickets that the podband maintainers need help from and they can go and do the help and stalebot will still continue and if they don't respond it get closed.
Mohan Boddu: But if do they respond the help label thing will keep it open you as maintainers don't have to take care of it but someone from the community can take a look at them.
00:25:00
Jan Kaluza: Yeah, if I can I agree with what Moan said and what Paul said. I think it the tailbox there are two parts of the one is that it's some sign for us that we will not be working on that maybe because we don't have it in priority list and so on but we have to also clearly communicate it to the users that this is not something we count with right now if nothing changes so I wouldn't close those bugs  I would keep them open but also keep the communication clear and honest that right now if nothing changes we don't treat it as a priority and we will keep this open for someone else to take it or if something changes in our resources or priorities we might get back to it.
Jan Kaluza: I'm not sure if the issue is that we have too many issues open and is hard for us to orient in that case I would just label them and relate those which we do not care about let's filter them out but still leave them open because they are still valid of course if the issue is not valid at all and we would never accept the PR no matter what on this subject I will just close it with explanation  So I mean that's also what I did in my previous projects I was working on.
Brent Baude: One thing I'm wondering is I'm maybe trying to take too big of a bite here and we look at this mass and that's what's giving us hesitation is this is just too big of a thing what? I'm wondering if going after this more tactically in the sense that we go after specific ones and agree upon those it cuts down x% of what we got.
Brent Baude: So an example would be I think for me one of the more frustrating aspects of the issue reporting that is an incomplete issue meaning they didn't give us enough information to understand what's going on. There's no reproducer or the reproducer is really crazy and not something you can really expect to do. anything that's just missing to me, I'd like to see those get handled out of this entire conversation.
Brent Baude: Those would be the ones I would like to get off and closed because I'm not sure an issue that's incomplete is of any help to anyone long term.
Jan Kaluza: Yeah, I think I was first. So I will start. So I think if you close the issue then if someone else hits the same issue and finds it using Google half year from now it can be opened right so I mean if it makes it easier for us to maintain the backlog if we close such issues with some explanation to the user that they are free to open it once the information is provided I think that's good way to go.
Matt Heon: We close and lock legacy issues basically we have an epidemic of people commenting on really old issues and saying I have this too even though it's been fixed.  So we really want people to file a new bug in that case and give us proper information.
Brent Baude: Yeah. or…
Brent Baude: it's an extremely generic error message and it can be 15 different things that falls under it that's not productive either. I guess I'm going to cue Ashley here, but the one thing I would say is this would not be out of the gate. What I'm proposing would not be I reported an issue and I'm shutting you down. You didn't give me everything you want. It would have to be in combination with a lack of response.  I think we all agree we give them plenty of opportunity to fill in the blanks. Ashley
00:30:00
Ashley Cui: I agree with that. I think this is the use case of putting a label on saying needs more info and then if after x amount of days there's no new comments or no updates of the issue updates of information. this is where I would want things to be automatically closed. I don't agree with closing stale issues that have been along around for too long, but issues that are missing information and the reporter hasn't responded, that's where I would be 100% okay with closing it after a few days. so something like putting a label on it saying needs more info.
Ashley Cui: and then if a comment appears we can automatically remove the label and if no comment appears or there's no updates after that time we could automatically close any issues with the label of needs more information after x amount of days.
Brent Baude: Do we have across the board? And please object if you don't like this idea. Is that something we can agree on?
Tom Sweeney: Yeah. Although I would think we should bump it out more than a few days just to couple weeks.
Brent Baude: Yes, of course. So I let's circle back to what that should be. But if someone doesn't like this idea at all, then it's moot to argue about.
Tom Sweeney: I like saying few days.  base and that part.
Brent Baude: So in general other than dictating what the time is, I just sort of say is that a good compromise for how we would manage our issues?
Paul Holzinger: I think that's…
Paul Holzinger: how it's already done, just not automated. And that's where I think it's the good thing to have it more automated. Uh-huh. That's
Brent Baude: I have two motivations for talking about this,…
Brent Baude: Paul. one is I think you and I are kind of more prone to doing that. So, I would like it to be applied across the board by everyone. And the second piece is if someone is unhappy with what we did, I would like to be able to point to where we documented this is how we're going to do it.
Brent Baude: So that's the other piece here why I'm trying to get everyone on agree agreeing on this. I think that Podman's a good testing ground…
Tom Sweeney: Yeah. Are you talking about doing this just for Podman or…
Tom Sweeney: rolling it in Podman and expanding later or going all at once? Podman build the scope deal.
Brent Baude: because we get a lot of everything and if it doesn't work then it's not going to work in other places probably would be my guess.
Brent Baude: So, I would say trial document and trial it in Podman. If we agree and if there aren't, complaints, then it seems like something that we could just pass in real quickly to others.
Paul Holzinger: Isn't the documentation already in what's like issue MD or how did they call this?
Brent Baude: It doesn't precisely call this out it says we may have closed your thing for this that or that but it doesn't say this is how we're doing it explicitly. So I would like to tighten that up. I was thinking either 30 or 45 days on the time.
Tom Sweeney: I think 30 is sufficient to give somebody time to get back in and say yes this is important or what have you.
Brent Baude: The real downside to this I'll just sort of say I'll spill the beans here. The one downside to this approach with a label needs more info is it I mean I think the upside is clear.
Brent Baude: The downside is users can't take labels off. So if a user fills in what we needed, they can't remove the label. somebody is going to have to do that from the team. we're going to have to assume that if someone comments that was enough to remove the label and have it automatically done. But that's the one thing I see that's kind of problematic here.
Paul Holzinger: Yeah, that's what I think with automation. you need to remove the label as soon as there's a comment from the user and…
Paul Holzinger: then if it's not enough, you need to apply it again because I mean if they comment, you technically need to read it again no matter what. you didn't know what the reply was. You need to open it. if we do it manually and forgot to remove the label which will absolutely happen then we have the problem of the bot closing things it shouldn't close.
00:35:00
Brent Baude: Yeah. I'm not hearing enough to say that we shouldn't make a PR that's got the rule and…
Brent Baude: start trying to do this and see how it goes. Folks agree.
Tom Sweeney: No, I think everybody's pretty much in agreement.
Tom Sweeney: And are we going to document this in issue MD on the Podman site?
Brent Baude: Yeah. Yeah. Yeah. I think there's two pieces of work. there's the policy and then there's the sort of the automation and the message we're going to use. So, I have some ideas. I'll talk to Ashley to see if it's any even possible.
Mohan Boddu: Just wanted to say for currently we have set the sale date as period as 30 days as per the document.
Brent Baude: It's good place to start.
Paul Holzinger: 30 days is good as a number, but the issue with the stale body is it just doesn't work correctly. There are hundreds of issues…
Paul Holzinger: where it will not put ST on even if they are stale. So relying on that could be a problem. Yeah, absolutely.
Brent Baude: I think there are lots of different stalebots,…
Brent Baude: Paul. Maybe part of the answer is we need a different one.
Paul Holzinger: Just mentioning that if there's automation then it must be consistent.
Brent Baude: Okay, Matt, I would say we've made good progress on at least one.  And maybe that's how we need to do this because just trying to wrap our arms around the whole thing is probably a little daunting. So in the future we just talk about specific cases that we're trying to deal with.
Matt Heon: I think that's reasonable. I'm hearing we might want a card for the automation around getting information from people. it sounds like that is something that's important to us.  Okay.
Brent Baude: why don't you hang tight though? I think I kind of have a way I'd like to see this work and I want to talk to somebody like Paul or Ashley to see if I'm way out in left field.
Matt Heon: Okay, reasonable enough. I conversation seems to be tapering off.  Tom, do you have anything else?
Tom Sweeney: I do not other than open form and…
Tom Sweeney: questions if anybody has anything there topics for the next meeting or meetings. And while you're thinking about that, I'll just go through quickly that our next meeting for the PMAN community meeting, which is more of a demo meeting, although this one wasn't so much, is on June 3rd, 2025. And I will ask Nabia, and I apologize if I messed up your name badly, go ahead.
Navya Sree: So I'm Nabia. I mean I just joined this meeting because I am doing some work on usage using the podman in my project. and I heard that the podman is a demonless and it can run with rootful and rootless access but I am trying to use podman on target service regarding some work in my project.  So will that be possible? Can I use a podman inside the Fargate service since the far is serverless? I don't know how I can use that podman inside that service. I have read all the documentation available in internet regarding the pod man but I'm failing to do that. So it would be so helpful. Can you give some guidance or do I have any documentation for that?
Matt Heon: I don't really know. So, my understanding is that the AWS seroist stuff is containers itself. because of that podman in a container is possible but it usually requires elevated privileges from the outer container I mean.
00:40:00
Matt Heon: So it would have to be a privilege container usually.  Am I right about that?
Navya Sree: Okay.
Navya Sree: Then it means yeah I mean since AWS is serverless, it is managed completely by AWS. I do not have the privileged access for the underlying host. So it means that I cannot access pod manu inside the target service container image script.
Matt Heon: Yeah, I sorry.
Dan Walsh: Yeah. Yeah.
Dan Walsh: In order to run a container on a rubless container, at least you need capset UID and capset G ID within the username space that they assign you. if you're running inside of a container, often they're going to give you just one UID or a group of UIDs. but they probably will not give you, so depends on how they set up the container. I'm not familiar with how they do it.  If you look for a blog called running Podman and Kubernetes, you'll see some of this discussion there. And that should help you figure out if it's even possible because usually it's going to be a permissions.
Dan Walsh: You're going to get permission errors.
Navya Sree: Got it. and I sorry I have a small question. I mean I have created a user inside my Docker file by giving the UIDs and subids based upon the documentation. whenever I give the permissions to the user still the container is not running it is saying that it is exiting the container by saying that host keys is not found I mean do I need to create any SSH keys for the user because I'm not finding any related documentation is it…
Tom Sweeney: Okay.
Navya Sree: what I'm seeing
Dan Walsh: Yeah, I think it'd be best…
Navya Sree: Okay.
Dan Walsh: if you just open up an issue on GitHub or a discussion on GitHub and then people in this meeting can correspond with you because we'd have to really see what you're doing inside of it and might be able to help you out or at least ask you appropriate questions for to look at the environment that you're running in.  So I think we should move this to open up a discussion on the GitHub page. Okay.
Navya Sree: Okay, sounds good.
Navya Sree: Thank you so much. Yeah, that's all I have. I had these couple of questions.
Tom Sweeney: Navia, I've added a link to the blog post that Dan was talking about in the Google chat here for you and…
Tom Sweeney: I'll put it in the meeting notes as All right.  And then going back to the meeting schedules that we've got coming up, we've got one coming up on May 6, the Cabal meeting, which is more of a general discussion of things that should be happening within the project rather than demos. And that is it for upcoming meetings. So one last call. Any further questions or comments or topics of next time?  It's on. I'll wrap up and thank everybody for coming today and I'll stop the recording. Thanks Any unrecorded questions you want to make? Not hearing any.
Tom Sweeney: So given that I'm going to say thanks once again folks, special Dan and Brett and Matt for leading the discussions today and we'll see you next time.
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.

```
