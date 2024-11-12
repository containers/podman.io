# Podman Community Cabal Meeting Notes 
## November 5, 2024 11:00 a.m. Eastern (UTC-5)

### Attendees
Brent Baude, Daniel Walsh, Gerry Seidman, Giuseppe Scrivano, Jake Correnti, Jan Rodak, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Paul Holzinger, Roy Golan, Tom Sweeney

### November 5, 2024 Topics

1. Improving Ease of Contribution - Matt Heon

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=9oIpmjQy7AM)

Meeting start 11:02 a.m. EDT (UTC-5) Tuesday, November 5, 2024

.

#### Improving Ease of Contribution - Matt Heon - ([0:57](https://www.youtube.com/watch?v=9oIpmjQy7AM&t=57s) in the video)

We are doing a cleanup for Podman documentation, as we have noticed that many have not been touched in 7+ years. We want to make it more welcoming to get more people to contribute. How can we make it more inviting for people to contribute?

Currently, we are working on making first-time users' transition/use of the product especially more welcoming.

Paul thinks one area that needs help is documenting the structure so people interested in code contributions can more easily transition into the contribution side of things.

We should list something like where does libpod live, where tests live, where CI lives, and how to contribute to the project.

Matt wonders if this should be a blog or an md.  Brent thinks a blog would be good, but it should be in the contributing md for long term maintenance/updates.

Brent thinks that contributors that just do a doc change, it's still a big hurdle to determine if the PR will pass.  The DCO and the lint tests are often the tripwires.

We get drive-by PRs, but many are not getting merged. Someone has found and fixed a problem, but they don't have enough impetus to make sure it passes the DCO, lint, and other tests.

The team generally tries to look at all PRs and, even with the failing ones, tries to do at least a minimal diagnosis of the issue and contact the submitter or, if a flake, then rerun the tests.  But most don't dive in deeply, especially for complicated PRs that are failing.

Paul likes to paste the failure as a comment or say what might fix the error if it's readily determinable.

Mario thinks we should put together a stock comment saying "we look at PRs if tests are passing", and then state if you think it's a flake, please let us know.  Paul is concerned that they might not be able to easily determine a flake.

Brent suggested we might add a "Flake" lable to be used.

Brent wonders if anyone has worked on a GitHub repo that lets the user add/remove labels. That can happen, but per Paul, you would need triage permissions.

Brent keeps re-reviewing PRs and would like the ability to have the user add a label. Paul noted that the user can ping a contributor for a review, but it might be hard for them to know who to ping.

#### Quadlet management with github.com/rgolangh/pq  - Roy Golan - ([23:50](https://www.youtube.com/watch?v=9oIpmjQy7AM&t=1430s) in the video)

Roy has a CLI for maintaining quadlets.  Roy has the noted [repository](https://github.com/rgolangh/pq) and wondered if it would be suitable for Podman or Quadlet.  Brent wants to bubble it up and talk about whether it's useful.

Matt thinks it's a win and thinks we should do it now.

Dan thinks it's an interesting idea. He noted that podlet generates a quadlet from a container. There may be some overlap, but he thinks it's a good addition in general.

Brent would like to bounce the thought off Ben Breard and others.

Paul is concerned that people don't understand the podman remote and podman local concepts.  Adding more quadlet functionality into Podman may be confusing.

Matt would like to do a trial implementation with Podman local and then evaluate.

We like the idea but don't know how it will be implemented. A design document will be required before acceptance into the containers organization on GitHub.

#### Open discussion - ([34:30](https://www.youtube.com/watch?v=9oIpmjQy7AM&t=2070s) in the video)
1. None Specified

### Next Cabal Meeting: Tuesday, January 7, 2025, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
1. None Specified

### Next Community Meeting: Tuesday, December 3, 2024, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:
1. None Specified

Meeting finished 11:38 a.m.

### Raw Meeting Chat:

```
Brent Baude
11:00 AM
Giuseppe, family first.  I think we can accomdate?
Miloslav Trmac
11:07 AM
Make sure to mention {pkg/domain/infra/{abi,tunnel}}, those packages are not an immediately obvious locatino to me.
Matt Heon
11:07 AM
I think that's a core reason we need the doc... A lot of our code is in nonobvious locations in pkg/
Neil Smith
11:10 AM
Like a tips for a successful contribution doc
You
11:11 AM
Red Hat folks:  Our follow on meeting is being pushed to 12:00 eastern.  One hour after the start of this one.
keep
Pinned
Lokesh Mandvekar
11:12 AM
gotta bounce. later all
Neil Smith
11:12 AM
bbiab
Brent Baude
11:18 AM
"Flake" label ?
Paul Holzinger
11:26 AM
https://github.com/rgolangh/pq
Neil Smith
11:36 AM
patrick roy
```

### Raw Google Meet Transcript

```

xrq-uemd-bzy (2024-11-05 11:02 GMT-5) – Transcript
Attendees

Brent Baude, Daniel Walsh, Gerry Seidman, Giuseppe Scrivano, Jake Correnti, Jan Rodak, Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Paul Holzinger, Roy Golan, Tom Sweeney
Transcript

Tom Sweeney: Good morning Today is Tuesday, November 5th, 2024. We are at the Podman Community Cabal meeting.

Tom Sweeney: as of now. Happy to take some more if folks want to. And the first one up we will be talking about improving the ease of contribution from Matten. And then Ray Roy Golan who I'm not sure is Feast here added a wallet management topic which I don't know a whole lot about. I just discovered a little while ago. So I'll see if Roy comes in or…

Brent Baude: 

Tom Sweeney: So Matt you do discuss it anyway.

Brent Baude: I do.

Brent Baude: I know enough to hopefully they're here.

Tom Sweeney: Okay, great.

Matt Heon: 

Matt Heon: I think he might be coming to the other cabal the win next week. okay sure.

Tom Sweeney: All maybe we can talk about it a little bit and move on and see where it goes. So, Matt, I will hand it to you.

Matt Heon: So as some people may have noticed we have been doing a big cleanup to a lot of our userfacing documentation around contributing to the project especially podband but really all containers repos and this is just us noticing that some of these had docs hadn't been changed in seven years really and it's probably a good idea to get things up to date and make it an inviting environment for new people to contribute to the project because I know in the past it has been difficult to get PRs into Podman and we'd really like to change that.

Matt Heon: So this is basically an open discussion of how do we make it more inviting for people to contribute especially to Potman but also to our other repos. And I think that what right now we're focusing on making the documentation easier for people to first timers can get PRs in easier. But a lot of the people working on this have been Podman maintainers for a very long time. So our visibility into what the New Year user experience is isn't exactly the

Paul Holzinger: 

Paul Holzinger: I think one thing that is missing in portman is sort of a architecture overview end code structure if you look at the repo where do you start looking if you have a bug right so it's just some basic docs we have cmdotman is the CLI infrastructure and then you flip out with the integrated parts of running the containers and…

Neil Smith: 

Paul Holzinger: and so I think that this is probably pretty difficult to figure out as a beginner.

Neil Smith: What do you want to do with this information,…

Neil Smith: Matt? Do you want to put it in? Okay.

Matt Heon: Tom I believe is taking notes. So we will have a record at the end of anything that we've decided on. I think we have an architecture diagram for all our projects identified as a priority like but that's not exactly what Paul's saying.

Brent Baude: Perfect. I would agree.

Matt Heon: Paul wants some internal code documentation. we can say this is where the podman core container management lives and this is where the API lives. I think that's different and I don't think that is something I would really like to do. I don't think it would take particularly long just to do this is the introduction to the podman repo. important stuff lives. This is where the tests live. This is how you should add a new feature if you want to. I think that's a very reasonable thing.

Matt Heon: My question would be…

Brent Baude: I'd be happy to take a card on that as long as it doesn't need to be done in the next two weeks. Yeah.

Matt Heon: where Okay, that could be arranged. I wonder…

Brent Baude: 

Matt Heon: where this should live. I mean, it could be a MD, but this could just as easily be a blog we put out that's like this is the intro to how to contribute to Podman. This is the things you should do. This is where all the code lives. So, I feel like a blog would be useful here, although we could link it from other

Brent Baude: My personal feeling would be some form of a extension of the contributing dock that's already in the repo.

Brent Baude: That's the permanent home. But I also think a blog that kind of summarizes that content would be something that we could get out there and wouldn't have to be all the nitty-gritty detail. Absolutely. Unbolt.
00:05:00

Paul Holzinger: Yeah, I think it needs to live in the repo because you need to update it with the ethical code changes. A block might be nice advertising, but we have a lot of old blocks out there which people site to and we say, that's just no longer how you do it.

Mohan Boddu: Just want to say something. not to put you a friend of the line as you recently started contributing maybe you have some ideas of where we are missing some things and things like that. So if you would like to share that that would be useful as well.

Jan Rodak: The architecture overview I agree with that and also that missing documentation is started creating. So, I think it's on the good way. And right now, I haven't got anything else.

Brent Baude: 

Brent Baude: I have an old acorn I can bring up which I still think that for a contributor who even does just a dock chain validating or getting a sense that your PR might actually pass all our hoops locally before you push it is still a big hurdle that's been kind of a since we got CI that was more difficult than make validate or something, and we get contributors that are on Windows and…

Tom Sweeney: No.

Brent Baude: Mac. I think to me that's still an issue.

Paul Holzinger: I would question if they care though, if they would actually spend the time running this that sometimes I have the feeling that most contributors are not really

Neil Smith: Yeah, especially for little things, right?

Brent Baude: I think on the limping and some of the DCO checks and things like that, that to me is 3/4 of what we end up having to go back to people on. So, if a contributing doc said, "If you want to contribute, here's the process." And by the way before you push it run a make validate because it checks for the ticky marks you need. it is bothersome to me that we can't always run our integration suite locally it has to be run in a very specific environment for it to pass. That's bothersome to me.

Brent Baude: 

Brent Baude: But I think the bigger part is…

Brent Baude: if we can wipe out I'll say the paperwork portion of a submission that I agree probably doesn't make a difference in the long run.

Paul Holzinger: Yeah, but I mean I agree with the DCO thing,…

Paul Holzinger: but that's in the doc. So everybody that hasn't edited hasn't read the doc, So that's what I'm trying to get at. I agree as simple make validate. I'm not sure what the problem with the current Mac validator is. I guess you mentioned Mac and Windows. I guess that's fair. yeah, I don't know how to solve that really. It's

Brent Baude: 

Brent Baude: We're still going to have that, but it's a lot easier to go see the contributing doc than to walk them through all the things that they need to do if we actually have a command that works just even go in there and say run make validate. building on top of that is the second one.

Tom Sweeney: Okay.

Brent Baude: I think it's half contributors, particularly new ones we're seeing now is we're getting drive by PRs, which is good. But what we're not getting is those merged and there is more delay in reviewing than I think we would be happy with these days.

Brent Baude: 

Brent Baude: But I think the other piece is're not getting the reason I use driveby is because we're not getting a second return after they submit and we review. They're not going and…

Brent Baude: doing it. we may need to nudge them a fair amount. I don't know if there's something we can do there, but I would say that that is a problem worth looking at.
00:10:00

Tom Sweeney: And that's often time issues that they've run into and…

Tom Sweeney: they never come back to tweak it's a simple thing. You guys take care of it. Bye. See you.

Paul Holzinger: I mean I think you can categorize a contributor in two parts. somebody who identified a problem and decided to here's a fix but I don't actually have the motivation to become a contributor to the project permanent or whatever and somebody who would like to contribute more often or understand the whole flow and so on it we don't know what the person wants right if they sort of give you this one fix you take it and I would be happy to just finish it but I don't know what the motivation of the contributor was so

Brent Baude: 

Brent Baude: And then I guess one thing that I've been questioning about with the new PRs coming in from the review side, which maybe suggests we have a problem, is I don't typically review stuff that doesn't pass tests or…

Tom Sweeney: Oops.

Brent Baude: isn't very close to passing tests. If I see a DCO or something like that, I just stop. Is what's the rest of the team doing? because that might be handy to mention in the contributing like we don't really go and review stuff till it's

Matt Heon: 

Matt Heon: That's especially problematic Greg because some of these are waiting on a reviewer to look at it and add the bloat approved label or add what do you call it one of our other no test needed labels. So CI being read is not a guarantee that it's not good for review.

Brent Baude: 

Matt Heon: I do go in and I try and look at all PRs to the extent that I can understand at least why CI is failing.

Brent Baude: I do too.

Brent Baude: I'm not saying that I don't see the little green dot and move on. I'm saying I don't review if I'm actually the one that's been putting a lot of the no new tests on their approval. So, I do look at those, but if it's actually failing tests, then I don't typically go much further…

Brent Baude: because I don't know if it's valuable. I would lean towards whatever the team thinks we should be doing as long as the team's consistent.

Miloslav Trmac: It's a hard tradeoff.

Miloslav Trmac: Sometimes you want to look at it and say, " this approach is completely wrong. Rewrite it before starting to fix tests." And sometimes just the tests are enough to show that there is more work to be done.

Paul Holzinger: 

Paul Holzinger: I think the difficult problem for contributors is figuring out how to navigate the test lock how to even figure out that they have a failure that is waiting on them right because if you check marks will be read for flakes right and if the contributor is looking into a flake what did I broke and start debugging things that's totally wasteful of time when I go there and yeah that's this flake I restarted So, I try to look at all the PRs regardless…

Brent Baude: 

Paul Holzinger: if they pass tests or not and then usually I just copy and paste the failure into PR comment for them so they see what's going on and see how they respond.

Brent Baude: I mean,…

Brent Baude: I think it's a good template if we all do it. I will always look at why it failed as well. If it's a flake,…

Tom Sweeney: Come on. Yeah.

Brent Baude: I'll rerun it. And I think we need more maintainers going through that pipeline throughout the day. because as you well know that flakes can occur at any given time whatever.

Brent Baude: So, if, Paul and I are the only ones pushing buttons, let's just say, it's going to be largely done in the US morning and then not get attention thereafter cuz that's usually when I go through PRs. Paul, I like the idea of pasting the failure if we're doing a review to help out or explicitly saying this is not a flake. You have a test failure. If that's something we can put in practice, I think that immediately helps contributors.
00:15:00

Mario Loriedo: maybe what we can do is that we can responsilize so making the contributor more responsible and saying having an default messages that say we're not going to look at your PR until the tests are green if you think that there is a flag because flag can happen just and we can provide the command that will kind

Tom Sweeney: Perfect.

Mario Loriedo: of being because the contributor may think that there is a flake and he cannot do anything and today I think a contributor is expecting us to look for flakes but if we tell him hey we may not have the time to look at all the flakes so if you think it's a flake please tell us so that we are aware about it and we are going to look at it but usually we look at PRs if All the tests are passing.

Paul Holzinger: Yeah, but even that is difficult in a sense how would they know if it's a flag or not then for me it takes me 5 seconds to decide if a test is a flag or not at most if I on the GitHub message I see the test name I thought before that it was a flag I press rerun right but expecting that from somebody else is that doesn't

Paul Holzinger: 

Paul Holzinger: And generally for integration at system test, it's pretty easy to say if it's only one that's red, it's probably a flake. And if you have a bunch of threats, that's not a flake. But even that doesn't need to be true. And it's not true for I don't know machine tests where we only have one in hyper rerun, Either you have a real hyperb failure or you have a flag in hyper. So you kind of generalize these kinds of scenarios. I don't know.

Mario Loriedo: 

Mario Loriedo: Yeah, the thing is that…

Paul Holzinger: And I don't

Mario Loriedo: if we are the only one looking so I if the contributor feels like you should not look at the test because anyway we are the one looking at the test logs so we'll need to work to look at all the results of the test. I think that we should tell them hey please go ahead and look yourself you may not understand everything so there are a lot of things that are understandable especially there is a linting problem and it's helpful that the contributor start looking and learning how to look at the logs of the CI test the

Mario Loriedo: test because that's the path to becoming a contributor anyway. He needs to understand how the CI works. But I think that today we do not guide him at all. We do not say hey for example something that I figure out after a few weeks and I didn't know the HTML file that helped you a lot figuring out so what's going on in the test. So this is something that is completely hidden. we do not disclose that in our documentation or contributing guides.

Brent Baude: 

Tom Sweeney: Oops. Right.

Brent Baude: One other thing that's been weighing my mind and…

Brent Baude: I'll just ask the whole group. has anyone work we have this changes requested thing in GitHub as well. Has anyone worked with a repository or project where if a maintainer puts a label or a label exists on a PR that users remove labels or is that project project by project?

Mario Loriedo: No, they cannot. They

Brent Baude: 

Paul Holzinger: You need to give them permissions to triage.

Paul Holzinger: Permissions are needed, I believe, or maybe more.

Brent Baude: …

Brent Baude: So, what I'm getting at is I think for me when I look at we have a lot of PRs now and if it were to pick up this would be even worse. But, I keep going back to the same PR and it hasn't moved. So, it would be nice to know when it has moved as a maintainer on the maintainer side, but I'm guessing that the contributors have very little opportunity to, like I said, remove a label or do something that would bump
00:20:00

Brent Baude: 

Brent Baude: Yes. Yeah.

Paul Holzinger: So they can request a video from a user. I believe that possible. but then they would know what to request from. Technically the open shift bot is randomly listing one of the owners right when they say hey assign that person. I don't think anybody pays attention to that.

Brent Baude: Because I mean there is a lot of time loss in going through the same set of PRs that you've been going through hoping or waiting for that to do something.

Paul Holzinger: 

Paul Holzinger: So generally if I added a comment or then I get the notifications, So I generally don't check again or you don't even have to add a comment. You could sub subscribe…

Tom Sweeney: Any other thoughts or…

Paul Holzinger: but if you subscribe you get all the force push comments while they fix stuff. So that's not really what you're looking for either, While they still iterating on their

Brent Baude: 

Brent Baude: Yeah, I'm trying to help the user by having less noise on us. I think you did it.

Tom Sweeney: comments on this topic before we move on? Just checking here to see if Roy has come aboard. I do not see Roy. I thought I saw him ping through, but I'm not seeing him.

Brent Baude: Yeah. It might be worth time seeing…

Tom Sweeney: No. You said he's a Red Hat person,…

Matt Heon: It looks like it dropped.

Brent Baude: if you can ping them and we could just wait a minute.

Tom Sweeney: Okay.

Paul Holzinger: Yeah, I mean fundamentally to me the problem with reviewing is this what I mentioned that there are the two types of persons.

Brent Baude: 

Paul Holzinger: I don't know if it's worth spending a bunch of time explaining, how to do that stuff and then they never come back because they don't have to. It's It's totally fine. But, Yeah.

Brent Baude: Yeah. I think you have to take away the I didn't know…

Brent Baude: what to do portion though when you run a big project and you're going to have drivebys.

Brent Baude: All Tom, while you're doing that, I can maybe talk about what the other topic was because I did come to me first. Okay.

Tom Sweeney: Yeah, I did ping him,…

Tom Sweeney: but he's turned his notifications off. I don't know where he lives.

Brent Baude: So we won't get terribly far, but I'll float the generalized idea of this was that he had essentially a CLI for maintaining quadlets. this really sort of simplifying some of the what do you have, how etc. So I guess it kind of equates to a lot of the podman commands that we have where we have an image store and we like to be able to list them and do all the v inspection and all the other kinds of things and he's got it in a separate repo and he asked me whether I thought this kind of function would be attractive to either podman or to some sort of quadlet itself but

Brent Baude: essentially. Is that him? No. he was basically asking whether or not this topic or this kind of thing would be appropriate for Podman or Quadlet itself. And then my response was I think it's a great cabal topic. so that's how we kind of got here. So we can generally debate, although I would feel more comfortable if there were more Quadlet folks.

Daniel Walsh: 

Brent Baude: We can generally debate whether this would be something useful or not. And I can meanwhile try to go find the repository while you guys It looks like Dan's going to talk. So I'll go look for it.

Daniel Walsh: This different.

Daniel Walsh: This is different than podlet or

Brent Baude: Paul's got it here. Let me just look to see if That's it, pal. Thank you. So, if you go look there, you get kind of an idea. And again, I was not respon anything. I thought about it was not a response of that exact thing is a great idea. I was sort of trying to bubble it up to do we think this is appropriate for what we know about Quadlet and what we offer to folks and would it be a good thing?
00:25:00

Matt Heon: 

Brent Baude: So it's not exactly is that what we want. is this topic something valuable and should we talk about it?

Matt Heon: I think the user experience here is an unambiguous win over Quadlets right now.

Paul Holzinger: So yeah,…

Matt Heon: So honestly my position is why aren't we doing this

Paul Holzinger: I'm trying to make sense of what exactly it's doing. But yeah, I mean listing your files or adding a new file and is sort of just batching a bunch of commands, right? Move the file in this directory, reload system CDL and start it and stuff like that. certainly useful for users, I guess. I don't know what else it's doing. Yeah. Or what

Brent Baude: 

Daniel Walsh: 

Brent Baude: Dan, you're a big Quadlet supporter.

Brent Baude: On that early

Daniel Walsh: Yes, I think it's an interesting idea.

Daniel Walsh: People hear the word quadlet and it's difficult to find the word quadlet inside of podman. so this would bring it more to the forefront. there is a tool called podlet which also does something similar in that it generates a quadlet from a container. so having a podman quadlet list and looking at the quadlets that are installed on the system u and…

Brent Baude: it opens up more long-term like you said to you could clearly see podman quadlet generate from a running container as an example.

Daniel Walsh: making it easier for users to install them and manage them. if we want to make it more of a first class citizen I think you'd be useful.

Brent Baude: There are a couple other people, obviously the Quadlet folks, but there are a couple other people I'd actually like to bounce this off. Ben Briard is a huge Quadlet fan.

Daniel Walsh: All right.

Brent Baude: And a container guy, so I think it would be good to bounce off him. I'll take that one.

Paul Holzinger: So one thing I would don't know I wouldn't like this as part of a portman command…

Paul Holzinger: because quadlet itself is sort of systemd Linux only right and then if everything you add to portman pretty much nowadays is remote client or should work via remote client rather right So even if you say it's only working local, some document out there says Potman something and somebody's going to type it on Windows, Mac OS, whatever, right? so I think having these things separate to I think it's a very bad thing that people don't understand that there is Potman remote and…

Brent Baude: 

Brent Baude: Is that a bad thing? Is it No,…

Paul Holzinger: Potman local. I think.

Brent Baude: I get that. But, is it a bad thing? I mean, I would think Mac users would want to be able to run a Quadlet.

Daniel Walsh: 

Paul Holzinger: It's system D.

Brent Baude: I know,…

Matt Heon: Run it out the VM.

Brent Baude: but run on the VM or whatever the remote connection is.

Paul Holzinger: Yeah. I don't know.

Brent Baude: And we could also make it only on Linux.

Daniel Walsh: You're going to have an issue.

Daniel Walsh: There are going to be issues with that. If you want to allow pod man quadlet install now all sudden we can do it. It's all can be done. one. Yeah,…

Brent Baude: We could go out the door that way and just see whether it takes off or not. Okay,…

Daniel Walsh: it might be helpful to have an error message when someone types Pman Quadlet on a Mac to say this is a Linux only feature.

Matt Heon: 

Brent Baude: Or we could also do…

Matt Heon: Yeah, we can definitely provide that.

Daniel Walsh: 

Matt Heon: I would love to do a trial implementation in Podman local and then if we get success with that we can easily spin it or do extra work to get it
00:30:00

Daniel Walsh: What's that?

Brent Baude: what we did with compose which is if a pintary is there then we honor it and if not we don't. Lots of ways around that. again I think we focus on whether we think this is a solid idea. It sounds like we wouldn't have to do all the lifting here.

Daniel Walsh: Just think about ourselves right now. Do you know if you have Quadlets installed in your machine?

Brent Baude: Do I?

Daniel Walsh: If you played with Quadlets in the past, you have to go look at a weird directory to figure out if they're installed. Yeah.

Brent Baude: That's what I mean. but also on the flip side, the fact that it is somewhat standardized to the weird directory allows us to write wrappers to it.

Daniel Walsh: 

Daniel Walsh: I'm just saying it'd be nice to be able to get that information through this command.

Brent Baude: Yeah, absolutely.

Daniel Walsh: Show me what I have installed. Yeah.

Brent Baude: I could also theoretically see stock piece, sort of a quadlet over a URL. So, someone could have it sitting in a GitHub repository and snort it right in.

Daniel Walsh: 

Paul Holzinger: Yeah, I personally don't like to absorb everything into main portman and…

Daniel Walsh: There are other comm I look at…

Paul Holzinger: stuff like that because I mean functionality wise I have no objections or that something like that is useful but every line that is added to Portman puts burden onto us and I don't know it's I think bug reports for things nobody pay attention to and…

Daniel Walsh: but I look at Yeah.

Paul Holzinger: and I don't want even more things. Nobody has one person.

Daniel Walsh: I just think Quadlet's kind of a special case. I was just in a discussion on Finch as a competitor to,…

Brent Baude: 

Daniel Walsh: I think Brent was involved in a little bit. And Quadlet is a feature of Podman that is pretty popular and very different than everybody else in the market right now.

Brent Baude: unique. Yeah.

Daniel Walsh: And so you ra ra ra rather than hiding that we should probably embrace it as opposed to you all the rest of the time we're playing catchup. we got to compose support

Brent Baude: So Tom, if I was to summarize, I'd say we like the idea. We don't know anything about the implementation and design dock required. Does anyone want to disagree with we don't like the idea? We like the idea rather.

Daniel Walsh: 

Brent Baude: If that gentleman comes to the other cabal or whatever, I told him he could come to a team meeting too. It doesn't matter.

Daniel Walsh: Yeah. there's another one dry run…

Daniel Walsh: which is built into quad lit which sort of proofreads a quadlet which we don't have now. That'd be kind of nice to be able to debug your quad lit before you push it into production. What kind of service is this quad going to generate? I've even been help testing

Daniel Walsh: He's in Israel.

Tom Sweeney: Testing, muting. I think we're at the end of the discussion. Does anybody have anything further to say or add to it?

Matt Heon: I like the idea. I'm forgetting the name of the guy who created this tool, but I would really like to talk to him and if we can get him in another coal, that would be great.

Tom Sweeney: Yeah, Roy Goolan. He's apparently in Europe somewhere.

Brent Baude: 

Tom Sweeney: Not sure exactly.

Brent Baude: Yeah, I was hesitant to say Roy…

Brent Baude: because it could be Wah, but yeah, likewise.

Tom Sweeney: Yep. My apologies…

Tom Sweeney: if I've misspoken, So, all that good talk on that. So, let's see if there are any open discussions. Anybody has any topics they'd like to add before we head out. Okay, while we're still thinking about that,…

Daniel Walsh: 

Brent Baude: We got our monthly Dan. Good to see you.

Daniel Walsh: I'm actually actually working on a pull request for Podman right now.

Daniel Walsh: So, I'm trying to figure out why my coupl is not working. Anyways,
00:35:00

Tom Sweeney: I will point out that our next meeting for the call is on January 7th, 2025. All right, year's coming to a close and our next community meeting is on December 3rd, 2024. Same time, 11 o'clock both times and on Tuesdays. So, one last call for any other topics. Otherwise, I will close this one out. All right, folks. Thanks for coming today and we'll shut down the recording.
Meeting ended after 00:35:37 👋

This editable transcript was computer generated and might contain errors. People can also change the text after it was created.


```



