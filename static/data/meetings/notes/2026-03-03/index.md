# Podman Community Cabal Meeting Notes
## Mar 3, 2026 11:00 a.m. Eastern (UTC-5)

### Attendees
Tom Sweeney, Mark Russell, Simon Brauner, Tomas Sedlacek, Ashley Cui, Neil Smith, Mohan Boddu, Miloslav Trmac, Brent Baude, Tim Zhou, Matt Heon, Nalin Dahyabhai, Mario Loriedo, Ashley Cui, Paul Holzinger, Kevin Clevenger, Jan Rodak, Dave Darrah, Gerry Seidman.

### Topics

 1. Podman v5.8.1 Announcements - Matt Heon
 2. Podman AI Policy Status - Matt Heon
 3. Upcoming Conferences - All

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=_AY54vbStgY)

Meeting start: 11:05 a.m. EDT (UTC-5)

#### Quick Recap
The Podman Community Cabal meeting focused on two main topics: the release of Podman 5.8.1 and a new AI contribution policy. Matt Heon explained that 5.8.1 was released approximately one week later than planned, but it was still on schedule and would serve as a long-term support release for RHEL. The team is now working on Podman 6, targeting a release in early May, while planning a 5.8.1 bug fix release before the end of March. The meeting also discussed a new AI contribution policy, which was recently merged into the Podman repository. This policy aims to address the increasing volume of AI-generated contributions, particularly security issues, by requiring real human review and meaningful engagement from contributors. The conversation ended with brief mentions of upcoming community events, including Community Day in New York City and DevConf in both Brno and Boston.

#### Next Steps
  * Matt (and team): Prepare and release Podman 5.8.1 bug fix release before end of March.
  * Mark: Consider resubmitting a talk or session for Community Day in New York City before the CFP closes on March 17th.
  * Matt: Consider submitting a talk or session for DevConf (Bruno or Boston) as appropriate.

#### Podman v5.8.1 - ([00:26](https://www.youtube.com/watch?v=_AY54vbStgY&t=26s) in the video)

Matt reported that the 5.8 release branch was currently closing in on v5.8.1, which was slightly delayed but still on schedule, and described it as a long-term support release for RHEL and other platforms. He confirmed that development is now focused on Podman 6, which is still targeted for release in the second week of May. Matt also mentioned that the 5.8.1 bug fix release is being planned for before the end of March, which will be the last release before Podman 6. He noted that development pace is expected to increase upstream after the release of Podman 6, with more people working on big features and smaller bugs. 

The team discussed the compatibility issues between Podman 6 and RHEL 9 and 10, with Matt explaining that RHEL 10 has several deprecations that would be removed in Podman 6, making 5.8 the last release for RHEL 9. Kevin inquired about the transition to RHEL 9 and 10, and Matt clarified that only RHEL 10 would be compatible with Podman 6. The conversation ended with Matt requesting to discuss the AI policy, and no further comments or questions were raised.

#### Podman AI Policy Status  - Matt Heon - ([04:02]i(https://www.youtube.com/watch?v=_AY54vbStgY&t=242s) in the video

The meeting focused on addressing the increasing volume of AI-generated contributions to the Podman repository, particularly security issues, which are straining limited resources. Matt explained that a new [policy](https://github.com/containers/podman/blob/main/LLM_POLICY.md) has been merged to handle AI-generated contributions, emphasizing the need for real humans to review code and engage in meaningful conversations. The policy is currently applicable to Podman and Skopeo, with potential expansion to other projects. Tom mentioned the policy's availability on the main [GitHub](https://github.com/containers/podman/blob/main/LLM_POLICY.md) page and noted that it is subject to future updates as AI technology evolves. 

#### Upcoming Conferences - All - ([08:25](https://www.youtube.com/watch?v=_AY54vbStgY&t=505s) in the video)

The group discussed Community Day in New York City, with Mark indicating he would be willing to resubmit a proposal if desired. Tom noted the event is scheduled for June 10th, with the CFP closing on March 17th, giving them two weeks to prepare.

Tom and Matt discussed upcoming DevConf [CZ](https://www.devconf.info/cz/) and [US](https://www.devconf.info/us/) events, highlighting challenges with attendance for DevConf CZ due to a major sporting event and limited hotel availability in Brno. They announced plans for DevConf CZ in Brno on June 18-19 and DevConf US in Boston on September 24-25, encouraging submissions for talks for both still. Paul noted the high costs in Brno during this time, advising attendees to check their travel budgets.

#### Open discussion - None
1. No questions.

### Next Cabal Meeting: Tuesday, May 5, 2026, 11:00 a.m. EDT (UTC-4)

#### Possible Topics
 1. None Discussed.

### Next Community Meeting: Tuesday, April 7, 2026, 11:00 a.m. EST (UTC-4)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:07 a.m.

The first 7 minutes and 15 seconds of the meeting's recording was cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

### Raw Meeting Chat:

```    
00:10:13	Tom Sweeney (Red Hat LLC):	Folks, please turn on your video if possible, if you are talking.
00:12:21	Tom Sweeney (Red Hat LLC):	https://github.com/containers/podman/blob/main/LLM_POLICY.md
00:14:12	Matthew Heon (Red Hat LLC):	https://github.com/containers/podman/blob/main/LLM_POLICY.md
00:15:32	Gerald Seidman (AuriStor Inc.):	There will be a Community  day inNYC
00:15:44	Gerald Seidman (AuriStor Inc.):	Will Matt/Mark be there as in last year
00:15:49	Gerald Seidman (AuriStor Inc.):	I am in a very loud place.
00:16:03	Gerald Seidman (AuriStor Inc.):	In theory I am not working this week :)
00:16:26	Tom Sweeney (Red Hat LLC):	:^)
00:16:34	Gerald Seidman (AuriStor Inc.):	Let me know if/how I can help
00:16:52	Gerald Seidman (AuriStor Inc.):	I have been in communication with Scott Ridley one of the organizers
00:17:07	Gerald Seidman (AuriStor Inc.):	Yes, it was announced only recently.. they have been late .. 
```

### Raw Zoom Meet Transcript

```
00:07:15.200 --> 00:07:20.800
Tom Sweeney (Red Hat LLC): Right, folks, welcome to the Podman Community Cabal meeting. Today is Tuesday, March 3rd, 2026.

20
00:07:20.900 --> 00:07:37.119
Tom Sweeney (Red Hat LLC): We don't have a whole lot of topics on the agenda currently, so if you have a bunch of questions, that'd be great, or we can wrap it up quick and easily. And with that, the one topic that we have is Podman 5.8.1, and Matt Hinn will be talking about that. So Matt, go ahead and take it away.

21
00:07:38.880 --> 00:07:58.549
Matthew Heon (Red Hat LLC): Sure. So, right now, we are… we got, 581 out, I believe, a week later than our original plan was, but it was still, broadly speaking, on time, and this is a relatively small release for us, in that it is…

22
00:07:58.550 --> 00:08:18.860
Matthew Heon (Red Hat LLC): Usually, when we do at a release, we will cut main and grab all the features, all the bug fixes, etc, etc. In this case, 5.8 is a derivative of 5.7, in the sense that we backported a lot of features and bugs, but it is still not main. Main has been switched over to Podman 6 development for a while.

23
00:08:18.860 --> 00:08:33.720
Matthew Heon (Red Hat LLC): What I'm basically saying here is that we have a lot of confidence in 5.8, and it's probably going to stick around for a very long time, in that it's a long-term support release in REL and a bunch of other places.

24
00:08:33.720 --> 00:08:40.970
Matthew Heon (Red Hat LLC): Meanwhile, we are full steam ahead on Podman 6, still targeting second week of May for that, and everything coming together there.

25
00:08:40.970 --> 00:08:57.439
Matthew Heon (Red Hat LLC): That said, we are starting to plan for a 5.81, which will include further bug fixes. This is probably going to be the last release that we put out before Podman 6, so this will be the last thing between

26
00:08:57.440 --> 00:08:58.820
Matthew Heon (Red Hat LLC): now in May

27
00:08:58.820 --> 00:09:15.430
Matthew Heon (Red Hat LLC): I don't really have a specific time frame on 581, other than to say before end of March. So, sometime before end of March, you can expect a bug fix release, and we're gonna try and get as much as we can in there to tide folks over until the next big release.

28
00:09:15.600 --> 00:09:32.390
Matthew Heon (Red Hat LLC): Once 6 comes out, I would expect, pace of development to pick up a bit upstream as well. We have a lot of people working on big features right now that are… once they're complete, hopefully we can get, get some folks working on smaller bugs and get some of those fixed as well.

29
00:09:33.170 --> 00:09:38.700
Matthew Heon (Red Hat LLC): Yeah, I think that's about it. Any questions on this, or…

30
00:09:42.620 --> 00:09:46.830
Kevin Clevenger: Yeah, is 6 going into REL 9 and or 10?

31
00:09:47.330 --> 00:10:07.030
Matthew Heon (Red Hat LLC): Just 10. So, there is a bunch of deprecations that we made in RHEL 10. Like, I believe we deprecated… what was it, cgroupsv1, we deprecated CNI, a bunch of stuff in 10 that is already deprecated is going to be removed with Podman 6.

32
00:10:07.030 --> 00:10:13.299
Matthew Heon (Red Hat LLC): We can't really put 6 into 9 because of that. There's a bunch of things that we would break compatibility on.

33
00:10:13.300 --> 00:10:29.240
Matthew Heon (Red Hat LLC): So 5.8 is going to be the… presumably the last release that we will see on RHEL9. We might do a 5.9 with some small feature backboards and further bug fixes for 9.9 in RHEL, but I would not…

34
00:10:29.700 --> 00:10:36.079
Matthew Heon (Red Hat LLC): I would not count on that. 5-8 being in the last thing that Rome 9 sees is currently the plan.

35
00:10:37.800 --> 00:10:38.890
Kevin Clevenger: Okay, thanks.

36
00:10:55.230 --> 00:10:57.650
Tom Sweeney (Red Hat LLC): Great, any other comments or questions from that one?

37
00:11:06.290 --> 00:11:12.089
Tom Sweeney (Red Hat LLC): Unless, how about just other comments or questions in general? Does anybody have anything?

38
00:11:12.410 --> 00:11:15.050
Tom Sweeney (Red Hat LLC): If not, we'll have one of the shortest meetings in history.

39
00:11:15.520 --> 00:11:17.410
Matthew Heon (Red Hat LLC): Did we discuss the AI policy?

40
00:11:18.450 --> 00:11:20.099
Tom Sweeney (Red Hat LLC): Sure, that'd be a good topic.

41
00:11:20.710 --> 00:11:23.900
Tom Sweeney (Red Hat LLC): Matt, could I ask you to turn your video on when you're talking, please?

42
00:11:24.080 --> 00:11:25.230
Matthew Heon (Red Hat LLC): Sure, sorry.

43
00:11:36.860 --> 00:11:52.939
Matthew Heon (Red Hat LLC): Well, I guess I'll start off. So, we, recently merged… we've been, dealing with an increased volume of AI-generated contributions to the Podman repository. In particular, AI,

44
00:11:53.290 --> 00:12:03.969
Matthew Heon (Red Hat LLC): both pull requests and, I would say, security issues. Now, the security issues is of concern to us because we're getting a greatly increased volume

45
00:12:03.970 --> 00:12:18.209
Matthew Heon (Red Hat LLC): Versus what we normally would, and as these are potential security problems, they deserve full investigation and basically a greatly increased amount of our attention versus just plain pull requests.

46
00:12:18.210 --> 00:12:34.319
Matthew Heon (Red Hat LLC): And a lot of what we're getting in right now is, as I think a lot of people in the open source community are feeling, things that are low-effort, AI-generated drive-bys, effectively. And these are…

47
00:12:34.620 --> 00:12:51.729
Matthew Heon (Red Hat LLC): These are a strain on our limited resources, so we have been encouraged by this to write a policy on how AI-generated contributions will be handled in Podman, and this merged as of yesterday, I want to say?

48
00:12:51.730 --> 00:13:05.950
Matthew Heon (Red Hat LLC): Right now, it is only Podman and Scopio. Other projects are welcome to adopt it, or within our space, I would say, are welcome to adopt it, so we might see this expand to things like building a container's common as well.

49
00:13:06.060 --> 00:13:07.720
Matthew Heon (Red Hat LLC): But yeah.

50
00:13:07.720 --> 00:13:29.230
Matthew Heon (Red Hat LLC): Generally speaking, I would say our expectation is that we have real humans spending time reviewing your code, and we would like that there were real humans on the other end who understand what's being submitted and are able to meaningfully answer questions and have conversations about what's going on.

51
00:13:29.230 --> 00:13:34.750
Matthew Heon (Red Hat LLC): If not, we may have to start closing pull requests that are

52
00:13:34.790 --> 00:13:37.919
Matthew Heon (Red Hat LLC): very difficult to interact with, I'll say.

53
00:13:38.820 --> 00:13:42.030
Matthew Heon (Red Hat LLC): Anyone want to add to that, or…

54
00:13:45.130 --> 00:13:51.900
Tom Sweeney (Red Hat LLC): not add so much, but I did add a link in the chat to the page where it's at, and it's on the main page of Podman in GitHub.

55
00:13:55.410 --> 00:14:00.270
Matthew Heon (Red Hat LLC): Yeah, let me grab a link to it, but we just put it at the top level at GitHub.

56
00:14:02.990 --> 00:14:07.619
Matthew Heon (Red Hat LLC): Here we go, all in policy.

57
00:14:08.460 --> 00:14:31.039
Matthew Heon (Red Hat LLC): And I will also say that this is not, meant to be set in stone right now, so this is an evolving policy. If we encounter other things that we need, we may end up editing this. Basically, as AI evolves, we reserve the right to evolve this as well with it.

58
00:14:45.330 --> 00:14:51.400
Tom Sweeney (Red Hat LLC): Thanks, Matt. Any further comments on that, or any other questions or comments in general?

59
00:14:56.860 --> 00:14:58.649
Tom Sweeney (Red Hat LLC): Hearing a lot of silence today.

60
00:14:58.970 --> 00:15:01.280
Tom Sweeney (Red Hat LLC): So, I'll just quickly…

61
00:15:01.600 --> 00:15:07.119
Tom Sweeney (Red Hat LLC): Note when our next meetings are. Our next cabal meeting will be on Tuesday, May 5th, 2026.

62
00:15:07.250 --> 00:15:13.889
Tom Sweeney (Red Hat LLC): Our next community meeting is coming up on April 7th, 2026, that's also a Tuesday, and both of those are at 11am.

63
00:15:14.220 --> 00:15:19.149
Tom Sweeney (Red Hat LLC): For the… and both will be in… Daylight savings time.

64
00:15:19.490 --> 00:15:24.389
Tom Sweeney (Red Hat LLC): As we're moving up to that this weekend in the US, and then Europe following shortly thereafter.

65
00:15:26.570 --> 00:15:30.650
Tom Sweeney (Red Hat LLC): With that, one last chance for questions, comments, otherwise I'm going to wrap this up.

66
00:15:36.810 --> 00:15:39.419
Tom Sweeney (Red Hat LLC): Oh, Jerry, can you talk about the Community Day?

67
00:15:40.700 --> 00:15:41.939
Tom Sweeney (Red Hat LLC): In New York City?

68
00:15:48.650 --> 00:15:52.590
Matthew Heon (Red Hat LLC): KCD New York, I think? Let me…

69
00:15:53.460 --> 00:16:03.790
Matthew Heon (Red Hat LLC): I have been thinking about submitting any… something, but I haven't gone ahead and done it yet. Mark, are we planning to put anything in on your side, or…

70
00:16:04.310 --> 00:16:14.119
Tom Sweeney (Red Hat LLC): I'm not sure if it came over on the video for folks, but Jerry was asking about Community Day in New York City, and whether or not any of us were going to be going to that.

71
00:16:14.490 --> 00:16:23.950
Mark Russell (Red Hat LLC): Yeah, I don't know. I was kind of focused on, you know, the upcoming QCon and other things going on, but I'd be happy to try to submit something if…

72
00:16:24.340 --> 00:16:25.560
Mark Russell (Red Hat LLC): We want to do that.

73
00:16:26.710 --> 00:16:28.190
Mark Russell (Red Hat LLC): We should show up anyway.

74
00:16:30.860 --> 00:16:34.370
Tom Sweeney (Red Hat LLC): Does anybody have the dates for that offhand, just for the recording?

75
00:16:42.790 --> 00:16:48.790
Mark Russell (Red Hat LLC): The next one… I don't know, I'm getting… June 10th.

76
00:16:49.180 --> 00:16:50.140
Tom Sweeney (Red Hat LLC): June 10th.

77
00:16:50.520 --> 00:16:52.800
Mark Russell (Red Hat LLC): Same place as last time.

78
00:16:54.720 --> 00:16:58.660
Mark Russell (Red Hat LLC): And the CFP closes March 17th, so we got 2 weeks.

79
00:16:59.500 --> 00:17:04.480
Tom Sweeney (Red Hat LLC): And Matt, did you want to give an early plug for DevConf? I know that's coming up, is that September?

80
00:17:05.540 --> 00:17:18.760
Matthew Heon (Red Hat LLC): So we've got two DEF COPs coming in, although it's hard to… it is hard to get into CZ at this point, because it is unfortunately scheduled at the same time as a major sporting event, and a lot of the hotels are already booked.

81
00:17:18.760 --> 00:17:34.440
Matthew Heon (Red Hat LLC): But for those interested, we should have some talks at DevConf CSE, June 18th and 19th in Bruno. And then we are definitely going to have a bunch of people at DevConf US in Boston on September 24th to the 25th.

82
00:17:37.240 --> 00:17:38.300
Tom Sweeney (Red Hat LLC): Be here before we know it

83
00:17:40.480 --> 00:17:48.749
Tom Sweeney (Red Hat LLC): And I know they just… Jess just opened up, talks, input right now, so if you have a talk you'd like to submit, I'm sure they'd love to get ahold of it.

84
00:17:49.760 --> 00:17:52.460
Tom Sweeney (Red Hat LLC): For the one in Boston in September, anyway.

85
00:17:53.150 --> 00:17:56.660
Tom Sweeney (Red Hat LLC): I'm sure that Bruno's probably closed by now for talks, right, Matt?

86
00:17:58.700 --> 00:18:02.570
Matthew Heon (Red Hat LLC): Actually, no, I think it's end of this week. They extended it.

87
00:18:02.990 --> 00:18:03.610
Tom Sweeney (Red Hat LLC): Okay.

88
00:18:04.540 --> 00:18:06.329
Tom Sweeney (Red Hat LLC): So I have an opportunity there, too.

89
00:18:07.580 --> 00:18:11.679
Paul Holzinger: Yeah, but look at the prices for Berneau, like…

90
00:18:12.580 --> 00:18:15.500
Paul Holzinger: It's quite expensive, if you even find a room.

91
00:18:16.360 --> 00:18:16.950
Tom Sweeney (Red Hat LLC): No.

92
00:18:18.040 --> 00:18:21.550
Tom Sweeney (Red Hat LLC): The old supply and demand policies going into effect thereafter.

93
00:18:22.290 --> 00:18:26.130
Paul Holzinger: Yeah, so… Check your travel budget, I guess.

94
00:18:34.920 --> 00:18:35.700
Tom Sweeney (Red Hat LLC): Right?

95
00:18:37.770 --> 00:18:46.169
Tom Sweeney (Red Hat LLC): I'm not seeing anything else coming through on chat, nor anybody else coming up, so I'm going to say thanks for attending, folks, and we will see you next time.

96
00:18:48.590 --> 00:18:49.410
Kevin Clevenger: Thanks, Tom.

97
00:18:50.130 --> 00:18:50.810
Tom Sweeney (Red Hat LLC): Bye-bye.

98
00:18:51.640 --> 00:18:53.249
Matthew Heon (Red Hat LLC): Nice talk to everyone. Bye.
```
