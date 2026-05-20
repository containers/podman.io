# Podman Community Cabal Meeting Notes
## May 5, 2026 11:00 a.m. Eastern (UTC-5)

### Attendees
Tom Sweeney, Simon Brauner, Nicola Sella, Tomas Sedlacek, Ashley Cui, Neil Smith, Miloslav Trmac, Brent Baude, Tim Zhou, Matt Heon, Nalin Dahyabhai, Mario Loriedo, Paul Holzinger, Kevin Clevenger, Jan Rodak, Dave Darrah, Gerry Seidman.

### Topics

 1. Podman 6.0 update - Delayed! - Matt Heon
 2. The last Podman Cabal Meeting! - Tom Sweeney

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=drwPTQj-dy0)

Meeting start: 11:03 a.m. EDT (UTC-5)

#### Quick Recap
The Podman Community Cabal meeting, led by Tom Sweeney, focused on two main topics: the delay of Podman 6.0 release and the future of Cabal meetings. Matt reported that Podman 6.0 has been delayed from its original target of May 2025, with the new preliminary release window set for May 25-29, due to ongoing work on breaking changes and the need for sufficient release candidates. Tom announced that the Cabal meetings would be discontinued after this session, with Podman stand-up meetings being opened to the community on Mondays at 10 a.m. Eastern and Thursdays at 11 a.m. Eastern. The conversation ended with brief discussions about upcoming events, including Red Hat Summit and a Kubernetes Community Day in New York City.

#### Next Steps
  * None Identified 

#### Podman v6.0 Update - Matt Heon - ([00:17](https://www.youtube.com/watch?v=drwPTQj-dy0&t=17s) in the video)

Matt announced that Podman 6 has been delayed from its original target of the second week of May due to incomplete work on breaking change features. The new preliminary release target is May 25-29, though this may be delayed further if release candidate testing takes longer than expected. Matt noted that this will be a significant release with many backend changes affecting advanced users, and preliminary release notes are being prepared.

#### Cabal and Standup Meetings  - Tom Sweeney - ([02:45](https://www.youtube.com/watch?v=drwPTQj-dy0&t=165s) in the video

Tom announced that Podman stand-up meetings will be held on Mondays and Thursdays and will be opened to the entire community. These meetings will take place at 10 a.m. Eastern on Mondays and 11 a.m. Eastern on Thursdays via Zoom. Tom also mentioned that the current Cabal meeting will be the last one, as the discussions will now be covered in the regular stand-up meetings at a more frequent cadence.

    * Details: [here](https://blog.podman.io/2026/05/podman-standups/)
        * Monday at 10:00 a.m. Eastern
        * Thursday at 11:00 a.m. Eastern
        * Open to anyone, via Zoom at CNCF/Linux Foundation

#### Open discussion - ([04:58](https://www.youtube.com/watch?v=drwPTQj-dy0&t=298s) in the video)

1. Gerry talked about Summit in Atlanta in a few weeks, and NYC Kubernetes Day [kcd](https://kcdnewyork.com/) in NYC later this summer and hopes to run into folks from the meeting there. 

#### Possible Topics
 1. None Discussed.

### Next Community Meeting: Tuesday, June 2, 2026, 11:00 a.m. EST (UTC-4)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:09 a.m.

The first 10 minutes and 20 seconds of the meeting's recording was cut from the start, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

### Raw Meeting Chat:

```
 Tom Sweeney (Red Hat LLC)
12:35

Podman 6.0 Delay Blog: https://blog.podman.io/2026/05/podman-6-release-delayed/

Podman Standup Meetings Post: https://blog.podman.io/2026/05/podman-standups/
Neil Smith
13:50

@Tom Sweeney (Red Hat LLC) your camera is off I guess
Matthew Heon (Red Hat LLC)
17:07

https://kcdnewyork.com/    
```

### Raw Zoom Meet Transcript

```
00:10:15.440 --> 00:10:27.390
Tom Sweeney (Red Hat LLC): Alright, so with that, I'm gonna start this meeting today. I'm gonna welcome everybody to the Paul Mana Community Cabal meeting. Today is Tuesday, May 5th. Happy Cinco de Mayo to everybody.

22
00:10:27.890 --> 00:10:37.219
Tom Sweeney (Red Hat LLC): We only have a couple of topics for this… for today. One's about Podman 6.0 update, and the second is about the Cabal meetings and what we're going to be doing with them going forward.

23
00:10:37.350 --> 00:10:40.540
Tom Sweeney (Red Hat LLC): So, with that, I'm going to ask Matt to start us up.

24
00:10:42.300 --> 00:10:45.249
Matthew Heon (Red Hat LLC): Alright, sure. Can everyone hear me okay?

25
00:10:46.150 --> 00:10:46.990
Miloslav Trmač: Yeah? Yes.

26
00:10:47.720 --> 00:10:59.679
Matthew Heon (Red Hat LLC): Okay, so… this one will be relatively brief. So, we put out a blog post, I believe, on Monday, saying that Podman 6 has been delayed, so…

27
00:10:59.870 --> 00:11:09.119
Matthew Heon (Red Hat LLC): Our original targets and our general goal with the releases is the second week of May, February.

28
00:11:09.360 --> 00:11:18.670
Matthew Heon (Red Hat LLC): August and November. And we are not gonna make that for 6. We have not even managed to get a release candidate out successfully at this point.

29
00:11:20.020 --> 00:11:30.149
Matthew Heon (Red Hat LLC): So, there are a couple reasons for this, but basically it just boils down to we committed to a lot of work, including some big breaking change features, and we need to get those…

30
00:11:30.660 --> 00:11:41.650
Matthew Heon (Red Hat LLC): Basically, our options with the braking change at this point are we either delay 6 to let them land, or we wait until Podman 7, which is probably gonna be 2028.

31
00:11:41.900 --> 00:11:50.200
Matthew Heon (Red Hat LLC): So, given that, we have chosen to delay the release and take the time to get everything done and really ready.

32
00:11:51.760 --> 00:11:59.099
Matthew Heon (Red Hat LLC): current preliminary target, I would say, is the 25th to the 29th of May, but…

33
00:11:59.100 --> 00:12:12.990
Matthew Heon (Red Hat LLC): That is going to depend on how long it takes for us to get a release candidate out. So, if it takes longer to get RC1 out, then next week we might have to delay further, because we want to allow

34
00:12:13.160 --> 00:12:21.670
Matthew Heon (Red Hat LLC): Sufficient release candidates so people can actually test this, given the scope of some of the changes we're doing, especially the configuration files.

35
00:12:23.000 --> 00:12:30.349
Matthew Heon (Red Hat LLC): Yeah. Other than that, though, 6 is… aside from being delayed, I think it's gonna turn out great.

36
00:12:30.890 --> 00:12:38.349
Matthew Heon (Red Hat LLC): We're starting to pull together the preliminary release notes, so this is gonna be a fairly sizable one. A lot of…

37
00:12:38.840 --> 00:12:48.749
Matthew Heon (Red Hat LLC): A lot of back-end changes that I think are going to be relatively noticeable for people who are doing advanced usage, but probably not going to affect that many people.

38
00:12:50.380 --> 00:12:53.829
Matthew Heon (Red Hat LLC): Yeah. Any questions, comments, concerns about this?

39
00:13:03.380 --> 00:13:05.779
Matthew Heon (Red Hat LLC): Okay, Tom, I'll turn it back over to you.

40
00:13:06.260 --> 00:13:14.809
Tom Sweeney (Red Hat LLC): Okay, yep, so the second topic that we have today is about this meeting, the Cabal meeting. We've, decided, as some of you may have seen in a blog post that I put out.

41
00:13:21.410 --> 00:13:23.159
Matthew Heon (Red Hat LLC): Tom, you just muted yourself.

42
00:13:24.590 --> 00:13:41.000
Tom Sweeney (Red Hat LLC): Zoom hates me today. I just love Zoom today. I'll say that 3 times just to make sure it sticks. So, Podman stand-up meetings, we're going to be doing those on Mondays and Thursdays. There was a blog post that I just posted recently about that, that I've included in the chat.

43
00:13:41.060 --> 00:13:49.530
Tom Sweeney (Red Hat LLC): while I did that, I don't know if you heard me prior, I also put Matt's blog post out there, a link to that, for the 6.0 delay.

44
00:13:49.750 --> 00:13:57.010
Tom Sweeney (Red Hat LLC): So anyway, the Pop Man Standups, the team at Red Hat has had a weekly meeting on every Monday and every Thursday for many years now.

45
00:13:57.250 --> 00:14:15.619
Tom Sweeney (Red Hat LLC): And we have decided that since we're now part of CNCF, we're going to open those up to the entire community, and those happen on Mondays at 10 a.m. Eastern, and then Thursday at 11 a.m. Eastern. They're open to anybody. They'll be within Zoom meetings, like this one here. I'm hoping I can get through my Zoom issues before we get there. And then,

46
00:14:15.890 --> 00:14:19.339
Tom Sweeney (Red Hat LLC): you'll be able to look at them at any point in time that you want to in the CNCF.

47
00:14:19.860 --> 00:14:20.560
Tom Sweeney (Red Hat LLC): Boom.

48
00:14:20.700 --> 00:14:27.700
Tom Sweeney (Red Hat LLC): website itself, so if you miss one, you can go ahead and go grab one. And we've discussed as a team that

49
00:14:27.740 --> 00:14:44.060
Tom Sweeney (Red Hat LLC): Given that most of what we discuss in this particular meeting, this Cabal meeting, is pretty much what we're going to be discussing in those stand-ups, and we're going to be doing those at a much more regular cadence, that we're going to stop this meeting after today. So this will be the last Podman Cabal meeting, and we'd like to thank everybody who's attended in the past, and hope we see you

50
00:14:44.320 --> 00:14:48.460
Tom Sweeney (Red Hat LLC): In the future. And, yeah, my camera says it's on, but it's…

51
00:14:49.350 --> 00:14:51.060
Tom Sweeney (Red Hat LLC): I think it's all part of the fun.

52
00:14:52.700 --> 00:14:56.009
Tom Sweeney (Red Hat LLC): button of, Zoom today for me, I don't know what is going on with it.

53
00:14:56.230 --> 00:15:01.080
Tom Sweeney (Red Hat LLC): So, apologies for my technical issues, and is there any questions or comments about that?

54
00:15:15.390 --> 00:15:16.210
Tom Sweeney (Red Hat LLC): All right.

55
00:15:16.580 --> 00:15:17.930
Tom Sweeney (Red Hat LLC): I'd hear a whole lot.

56
00:15:18.260 --> 00:15:24.609
Tom Sweeney (Red Hat LLC): Does anybody have anything that they would like to talk about that they would, like to wrap up with one last discussion topic for our meetings?

57
00:15:33.280 --> 00:15:36.210
Gerry Seidman: If anyone's going to Riverhead Summit,

58
00:15:37.200 --> 00:15:46.479
Gerry Seidman: It'd be great to meet you in person. I'll be doing a lot of group duty at the Oris review, so maybe I'll meet some of you guys in person at Red Ahead Summit in Atlanta next week.

59
00:15:48.280 --> 00:15:50.480
Tom Sweeney (Red Hat LLC): Yeah, that's in Atlanta in just a few weeks, isn't it?

60
00:15:52.990 --> 00:15:53.609
Gerry Seidman: Next week.

61
00:15:53.610 --> 00:15:54.750
Tom Sweeney (Red Hat LLC): Is it…

62
00:15:54.750 --> 00:15:55.859
Gerry Seidman: Jordan, is there anybody else?

63
00:15:58.170 --> 00:16:00.060
Tom Sweeney (Red Hat LLC): Is anybody else here going to be there?

64
00:16:11.700 --> 00:16:13.140
Tom Sweeney (Red Hat LLC): Oh, my son.

65
00:16:13.140 --> 00:16:16.339
Neil Smith: Unfortunately, I don't think anybody from our team is going to.

66
00:16:16.630 --> 00:16:17.619
Tom Sweeney (Red Hat LLC): Just not at this time.

67
00:16:19.540 --> 00:16:21.030
Neil Smith: Mark will be there, I think.

68
00:16:21.670 --> 00:16:22.310
Tom Sweeney (Red Hat LLC): Yep.

69
00:16:25.220 --> 00:16:29.370
Gerry Seidman: And then, if you're in the New York area, there's the New York…

70
00:16:29.640 --> 00:16:35.829
Gerry Seidman: Kubernetes Developer Day, Community Day, on June 10th in New York City.

71
00:16:37.100 --> 00:16:39.939
Gerry Seidman: So, if you're in New York, again, come by.

72
00:16:41.260 --> 00:16:43.409
Gerry Seidman: I just know that I'm monitoring a panel.

73
00:16:46.250 --> 00:16:47.960
Tom Sweeney (Red Hat LLC): Nice, do you have a link for that, Jerry?

74
00:16:49.150 --> 00:16:52.240
Ashley Cui: Yeah, if you have a link, I can take a look and maybe swing by.

75
00:16:54.260 --> 00:17:02.990
Gerry Seidman: I'm actually on my phone, not at a computer, so I can't pull it up, but, to search.

76
00:17:03.220 --> 00:17:11.649
Gerry Seidman: Kubernetes, Community Day, New York City, and you should be able to find it. And if not, just email me, jerry at IAMX.com, and I'll send you the link.

77
00:17:11.900 --> 00:17:12.929
Tom Sweeney (Red Hat LLC): Sure, I think…

78
00:17:13.130 --> 00:17:14.179
Ashley Cui: Got it, yep.

79
00:17:20.109 --> 00:17:23.769
Tom Sweeney (Red Hat LLC): Great. Last calls for discussion topics, otherwise we'll wrap this up and…

80
00:17:24.419 --> 00:17:27.739
Tom Sweeney (Red Hat LLC): Make this our last meeting, and also one of our shorter ones.

81
00:17:32.530 --> 00:17:33.690
Miloslav Trmač: Thank you, Tom.

82
00:17:33.780 --> 00:17:34.850
Tom Sweeney (Red Hat LLC): Alright, folks.

83
00:17:35.300 --> 00:17:36.289
Tom Sweeney (Red Hat LLC): Thanks a bunch!

84
00:17:37.010 --> 00:17:38.809
Tom Sweeney (Red Hat LLC): See you on Mondays and Thursdays.

85
00:17:41.410 --> 00:17:42.940
Miloslav Trmač: Bye-bye.

86
00:17:43.230 --> 00:17:44.030
Matthew Heon (Red Hat LLC): Bye, folks!
```
