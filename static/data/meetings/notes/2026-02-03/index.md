# Podman Community Meeting Notes
## Februrary 3, 2026 11:00 a.m. Eastern (UTC-5)

### Attendees
Tom Sweeney, Brent Baude, Matt Heon, Dave Darrah, Miloslav Trmac, Gerald Seidman, Suraj G, Mario Loriedo, Tim Zhou, Mark Russell, Kevin Clevenger, Giuseppe Scrivano, Nicolla Sella, Paul Holzinger, Fatih Akca, Neil Smith, Jan Kaluza, Nalin Dahyabhai, Ashley Cui, Mario Loriedo, Chandan Singh, Martin Beckert

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=xeYq4PkkgXI)

Meeting start: 11:02 a.m. EDT (UTC-5)

#### Quick Recap
The Podman Community Meeting focused on several key topics, including the delay of Podman 5.8 release due to the addition of post-quantum cryptography features, led by Matthew. The team discussed the need for better governance processes regarding release delays and the balance between community and vendor-driven changes. Jan and Paul presented an AI policy proposal to address excessive use of AI tools in code generation and comments, emphasizing the need for personal input and minimal changes. Martin shared updates on the pilot project and requested the creation of new channels on the Discord server for better communication. The meeting also covered upcoming changes in Podman 6, including support for SHA-512 image hashes and post-quantum signatures, presented by Miloslav. The next community meeting was scheduled for April 7th at 11am.

#### Next Steps
  * Matt (and Podman maintainers): Cut Podman 5.8 release candidate once post-quantum cryptography features and required validation are complete, then release final 5.8 after brief testing (target: end of February).
  * Matt (and relevant maintainers): Continue work on migration support for legacy Bolt database and new configuration file feature for Podman 6, aiming to merge in next couple of months.
  * David (and team): Update Podman governance documentation to require 100% core maintainer agreement for release delays over a certain period, and clarify process for future delays.
All community members: Review and provide feedback on the proposed AI policy document (link shared by Jan), and add opinions or suggestions in the public document.
  * Martin: Create a new issue specifying the exact names of the new Discord channels requested for the Podman project, for review and setup by Lokesh and Tom.
  * Tom/Lokesh: Review the new issue from Martin and set up the requested Discord channels if there are no objections.
  * All: Add topics for upcoming meetings to the agenda as desired.

### Topics

#### Podman v5.8 & v6.0 Updates - Matt Heon - ([01:12](https://www.youtube.com/watch?v=xeYq4PkkgXI&t=72s) in the video)

The team discussed the delay of Podman 5.8's release, which was initially planned for February but will now likely be released by the end of February due to the inclusion of post-quantum cryptography features required by the U.S. government. Matthew explained that Podman 6 is on track for a May release, with most major features already merged. The team debated whether to include the PQC features in 5.8 or 5.9, with Tom suggesting to release 5.8 without PQC and add it later. Brent raised concerns about the release delay process and governance, suggesting the need for a formal process for delays and clearer communication about vendor-driven changes. The conversation ended with a brief mention of an upcoming AI policy discussion.


#### AI Development Policy - Jan Kaluza & Paul Holzinger - ([12:43](https://www.youtube.com/watch?v=xeYq4PkkgXI&t=763s) in the video)

Jan discussed concerns about excessive use of AI in code contributions, including copy-pasting AI-generated comments and code that changes significantly after review. He proposed a policy to require minimal changes to code and personal commentary to ensure understanding, based on practices from other projects. Paul supported the idea of implementing a policy and suggested that non-compliance could lead to closing PRs.

#### PQC Updates - Matt Heon & Miloslav Trmac - ([18:37](https://www.youtube.com/watch?v=xeYq4PkkgXI&t=1117s) in the video)

Matthew shared updates on post-quantum cryptography, highlighting the integration of SHA-512 image hashes in Podman 5.8 to enhance security against quantum computers, with plans to enable support for SHA-512 image hashes later in the year.

The team discussed post-quantum cryptography support for Sequoia PGP-backed signatures in the GNU PG format, with work being done to implement a post-quantum backend for 6-store signatures. They noted that changes to image IDs will be announced with Podman 6, as the format will be modified to require config digest equality. 

#### Podlet Updates - Martin Beckert - ([24:06](https://www.youtube.com/watch?v=xeYq4PkkgXI&t=1446s) in the video)
Martin mentioned he would handle pilot-related news, and Paul and Martin discussed moving a repository to the containers organization.

The team discussed creating new channels on the Discord server for the Podman project. Martin proposed setting up a Podlet channel and a Podlet dev channel, and Tom suggested Martin create a new issue with the exact channel names for review. 

#### Open discussion - ([30:55](https://www.youtube.com/watch?v=xeYq4PkkgXI&t=1855s) in the video)

Paul mentioned that Podman 6 should support drop-ins of storage.conf and other files, which was discussed briefly by Miloslav and Gerald.

### Next Cabal Meeting: Tuesday, March 3, 2026, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1. None Discussed.

### Next Community Meeting: Tuesday, April 7, 2026, 11:00 a.m. EST (UTC-5)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:36 a.m.

The first 7 minutes and 45 seconds of the meeting's recording were cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

### Raw Meeting Chat:

```    
00:05:46	Martin Beckert (Strukturpiloten OHG):	Hi! 👋
00:11:53	Tom Sweeney (Red Hat LLC):	I'll ask, if possible given network considerations, that speakers turn on their video.
00:20:26	Jan Kaluza:	https://docs.google.com/document/d/1VxYDXT3kIiBAFJHY4fsyFRrddtgIKCrFt_juI7ofsXo/edit?tab=t.0
00:23:49	Suraj G (Bloomberg L.P.):	One in chat is accessible
00:27:19	Martin Beckert (Strukturpiloten OHG):	I would like to bring up Podlet related news and two organizational questions at the end if I'm allowed to ;)
00:27:34	Tom Sweeney (Red Hat LLC):	Martin, absolutely!
00:32:15	Martin Beckert (Strukturpiloten OHG):	https://github.com/k9withabone/compose_spec_rs
00:40:38	Neil Smith:	Thanks everyone
```

### Raw Zoom Meet Transcript

```
WEBVTT

1
00:05:17.340 --> 00:05:19.060
Tom Sweeney (Red Hat LLC): Hey Matt, can you hear me okay?

2
00:05:20.360 --> 00:05:21.339
Matthew Heon (Red Hat LLC): Yeah, I can hear you.

3
00:05:21.540 --> 00:05:22.539
Tom Sweeney (Red Hat LLC): Okay, great, thanks.

4
00:05:23.310 --> 00:05:25.269
Tom Sweeney (Red Hat LLC): First time in Zoom listening machine.

5
00:05:30.990 --> 00:05:32.559
Tom Sweeney (Red Hat LLC): Hey, Mark. Welcome.

6
00:05:39.630 --> 00:05:42.540
Tom Sweeney (Red Hat LLC): Usual, I'm gonna give it another minute or two before we start up.

7
00:05:42.780 --> 00:05:46.189
Tom Sweeney (Red Hat LLC): Wait for folks to come on in. This is the Padman community meeting.

8
00:05:46.580 --> 00:05:49.169
Tom Sweeney (Red Hat LLC): We start a minute and a half of this.

9
00:06:09.980 --> 00:06:12.359
Tom Sweeney (Red Hat LLC): Come everybody to the Pardon community meeting.

10
00:06:13.570 --> 00:06:19.499
Tom Sweeney (Red Hat LLC): Gonna be starting up at 11.02, which is just one minute from now. Waiting for a few more folks to show up.

11
00:06:33.700 --> 00:06:37.819
Tom Sweeney (Red Hat LLC): Today would be a great day to add a topic, if you have one that you'd like to discuss.

12
00:06:48.510 --> 00:06:49.400
Tom Sweeney (Red Hat LLC): Hey, Jan.

13
00:07:01.720 --> 00:07:06.349
Tom Sweeney (Red Hat LLC): Okay, the recording's going on already, but I'm gonna kick it off in about 10 more seconds.

14
00:07:07.160 --> 00:07:11.679
Tom Sweeney (Red Hat LLC): you know, parse off the first little bit of this when I jump it out to YouTube.

15
00:07:14.590 --> 00:07:21.899
Tom Sweeney (Red Hat LLC): And now, since we're 2 minutes after the hour, I'll go ahead and officially kick this off. Welcome to the Podman Community meeting. Today is Tuesday, February 3rd.

16
00:07:22.020 --> 00:07:23.790
Tom Sweeney (Red Hat LLC): 2026?

17
00:07:24.620 --> 00:07:29.129
Tom Sweeney (Red Hat LLC): We generally meet on the first Tuesday of every even number of months here.

18
00:07:29.270 --> 00:07:45.289
Tom Sweeney (Red Hat LLC): sometimes we'll move the timing to be a little friendlier for India, China, Australia, etc. Topics driven from this meeting, for the next meetings, or from stuff that we get from the web, or coming in from any of the social medias, or anytime. So if you have a topic you'd like to discuss here, we'd love to hear from you.

19
00:07:45.710 --> 00:07:54.539
Tom Sweeney (Red Hat LLC): Discussions don't have to be about Podman, especially. We're happy to take them for Build a Scopia, or really anything that's related to containers, or makes use of our tools.

20
00:07:55.590 --> 00:08:03.669
Tom Sweeney (Red Hat LLC): And we've got meeting notes in the HackMD, which will be taken care of during the day today, so yell at me if I type in anything there that's not good.

21
00:08:04.190 --> 00:08:10.480
Tom Sweeney (Red Hat LLC): And for our topics today, we're going to be talking about Podman 5.8 and 6.0, and Matt will be leading that one for us.

22
00:08:10.610 --> 00:08:23.869
Tom Sweeney (Red Hat LLC): Then we'll have a discussion on AI policy. Paul and Jan will be talking about that. Then we'll be talking about PQC for Matt Milislav, and then if you have any other things that you'd like to talk about, we can talk about those at the end, after those discussions.

23
00:08:24.160 --> 00:08:27.839
Tom Sweeney (Red Hat LLC): So, with all that said, welcome everybody, and Matt, would you lead us off?

24
00:08:29.090 --> 00:08:38.080
Matthew Heon (Red Hat LLC): Sure, so I'll start off with the bad news, that being Podman 5.8. So our official upstream policy is that we release Podman

25
00:08:38.080 --> 00:08:51.199
Matthew Heon (Red Hat LLC): once a quarter, on the second week of the second month. So, our expected release was second week of February, somewhere in the vicinity of the 10th to the 12th was our original target.

26
00:08:51.340 --> 00:09:04.459
Matthew Heon (Red Hat LLC): So, we are probably not going to make this release as a result of some late-breaking features, which we're actually going to discuss a little later in the post-quantum section.

27
00:09:04.690 --> 00:09:17.819
Matthew Heon (Red Hat LLC): We are basically going to be focusing on getting these features in, and once we are confident that everything is good, we will cut a release candidate based on that.

28
00:09:17.820 --> 00:09:35.230
Matthew Heon (Red Hat LLC): And once we have the release candidate, we're probably going to cut a final in short order, just with some quick testing to make sure everything seems fine. So, I would still expect Podman 5.8 by end of February, but, we are not going to make the original next week, target.

29
00:09:36.220 --> 00:09:47.980
Matthew Heon (Red Hat LLC): On the more positive front, Podman 6, which we're expecting second week of May, is starting to really shape up. We have almost all major features merged already.

30
00:09:47.980 --> 00:09:57.520
Matthew Heon (Red Hat LLC): We're working on a few remaining things, such as how we're going to handle migrations from Podman 5 installations that are still using the legacy Bolt database, and

31
00:09:57.520 --> 00:10:12.839
Matthew Heon (Red Hat LLC): the, new configuration file feature that we have a design doc upstream about, actually. So, both of those are going to be, merging hopefully in the next couple months, and I think that we are very much on track for our next major.

32
00:10:13.360 --> 00:10:15.450
Matthew Heon (Red Hat LLC): Any questions about this?

33
00:10:22.600 --> 00:10:29.190
Tom Sweeney (Red Hat LLC): I just had a clarification question. We've got a rail release coming up, are we planning 5-8 for that still, or are we going to 5.7?

34
00:10:29.390 --> 00:10:41.040
Matthew Heon (Red Hat LLC): That is still gonna be 5.8. We are… we are delaying, for some new features that are required by the U.S. government on the post-quantum crypto land.

35
00:10:45.730 --> 00:10:52.829
Brent Baude: I have a more process-oriented… Question for the team, which is, twofold.

36
00:10:53.960 --> 00:11:01.960
Brent Baude: One is… why… We're delaying the release.

37
00:11:02.230 --> 00:11:05.820
Brent Baude: And the second is, if we delay releases.

38
00:11:06.330 --> 00:11:10.839
Brent Baude: Should this not have come to all court maintainers' attention?

39
00:11:12.430 --> 00:11:13.569
Brent Baude: For approval.

40
00:11:15.670 --> 00:11:29.089
Matthew Heon (Red Hat LLC): I think the second was definitely a valid point. We put this one in front of most of the Podman maintainers, but not all. We probably should have gotten 100% approval to do a true delay.

41
00:11:29.090 --> 00:11:39.430
Matthew Heon (Red Hat LLC): Reason for the delay, as I said, is to land post-quantum photography-related features. So we are trying to work to get

42
00:11:39.430 --> 00:11:54.120
Matthew Heon (Red Hat LLC): what is it, MLKEM and TLS 1.3 support? This is in the Go standard library, but we're… it's not enabled by default. We're going to be patching it through so it's actually in configuration files that folks can toggle this on.

43
00:11:54.120 --> 00:12:03.999
Matthew Heon (Red Hat LLC): I'll steal the bit from the PQC section and just say that this is a major upcoming requirement for U.S. governments and related governments who are

44
00:12:04.130 --> 00:12:10.570
Matthew Heon (Red Hat LLC): Trying to secure their traffic against interception and then future decryption by quantum computer.

45
00:12:12.500 --> 00:12:15.240
Brent Baude: So, it's fair to say that

46
00:12:15.490 --> 00:12:24.940
Brent Baude: I think the… along the lines of my first question, which, by the way, your response is fine, I just… I think we need to document

47
00:12:25.860 --> 00:12:28.740
Brent Baude: These kinds of things in our governance, Matt.

48
00:12:30.490 --> 00:12:32.250
Brent Baude: Whatever we think.

49
00:12:33.270 --> 00:12:36.749
Brent Baude: The right thing to do here is, but then follow that.

50
00:12:37.000 --> 00:12:41.730
Brent Baude: So, perhaps 100% core maintainer agreement that a delay

51
00:12:42.220 --> 00:12:46.010
Brent Baude: You know, a delay over a certain period of time would be appropriate.

52
00:12:47.160 --> 00:12:49.370
Brent Baude: To just kind of capture that.

53
00:12:49.790 --> 00:12:53.320
Brent Baude: Along the same lines, though, I'm kind of curious…

54
00:12:53.840 --> 00:12:58.800
Brent Baude: Given that we're a CNCF, project.

55
00:13:00.890 --> 00:13:04.720
Brent Baude: And that this was delayed, and really in the interests of Red Hat.

56
00:13:07.500 --> 00:13:10.409
Brent Baude: What are we gonna do in the future for that kind of thing?

57
00:13:14.630 --> 00:13:16.600
Matthew Heon (Red Hat LLC): I mean, that's a very…

58
00:13:16.600 --> 00:13:17.770
Brent Baude: It's a team-wide question.

59
00:13:17.770 --> 00:13:22.380
Matthew Heon (Red Hat LLC): Yeah, yeah, I mean, that's… we have to figure this out, because,

60
00:13:22.670 --> 00:13:27.930
Matthew Heon (Red Hat LLC): This is not just a Red Hat project now, and we are trying to act like it, so…

61
00:13:28.270 --> 00:13:30.570
Matthew Heon (Red Hat LLC): I think that,

62
00:13:31.510 --> 00:13:36.359
Matthew Heon (Red Hat LLC): This is definitely… we need to have a process, and we need to follow the process.

63
00:13:36.670 --> 00:13:51.660
Matthew Heon (Red Hat LLC): This is a pretty big feature, and it does have users, but yeah. This is… delaying releases is something we want to avoid. We went something like 2 years following our schedule, and I would have really liked it if we could have continued.

64
00:13:54.210 --> 00:13:57.319
Brent Baude: Right, I think trivial slips are…

65
00:13:58.600 --> 00:14:01.670
Brent Baude: Are one thing, and we can define whatever that is.

66
00:14:03.240 --> 00:14:08.719
Brent Baude: but I think… There's a point where we say, at least in this particular incident.

67
00:14:09.960 --> 00:14:12.079
Brent Baude: It's not a trivial slip.

68
00:14:12.670 --> 00:14:19.029
Brent Baude: There's some process we need to follow there, and then why it slipped is concerning.

69
00:14:20.170 --> 00:14:21.859
Brent Baude: Given our current state.

70
00:14:27.160 --> 00:14:34.440
Paul Holzinger: I think… Practically speaking, like, this… we have an upstream schedule, and…

71
00:14:34.600 --> 00:14:37.789
Paul Holzinger: The easy choice is to follow that schedule.

72
00:14:38.070 --> 00:14:40.950
Paul Holzinger: And not make exceptions for whoever it is.

73
00:14:41.680 --> 00:14:46.470
Paul Holzinger: And… I think… That would be…

74
00:14:46.800 --> 00:14:49.829
Paul Holzinger: More important, like, if certain vendors

75
00:14:50.190 --> 00:14:57.280
Paul Holzinger: need certain things, then they have to patch them downstream, or upstream them in time, you know? Like, we cannot…

76
00:14:59.270 --> 00:15:06.550
Paul Holzinger: I don't know, I mean, without leaking things, but, like, There are… Certain things take time, and…

77
00:15:08.190 --> 00:15:14.540
Paul Holzinger: That needs to be… at rest on that scale, and not on… we can.

78
00:15:15.880 --> 00:15:20.290
Paul Holzinger: A piece upstream by… forcing them to do X.

79
00:15:36.890 --> 00:15:39.009
Tom Sweeney (Red Hat LLC): Any further comments or questions?

80
00:15:44.780 --> 00:15:49.960
Brent Baude: Is there anyone else on the team that has anything to offer in this situation, or…

81
00:15:50.790 --> 00:15:58.690
Brent Baude: Wants to say about the… How the… the governance should, perhaps.

82
00:16:00.370 --> 00:16:05.610
Brent Baude: also reflects something. We don't probably want to dive deep into this, but…

83
00:16:10.100 --> 00:16:10.780
Brent Baude: Right.

84
00:16:10.960 --> 00:16:14.190
David Darrah: Yeah, Brent, I mean, I acknowledge that that is…

85
00:16:14.410 --> 00:16:17.780
David Darrah: Everything you've said is true, and we'll just… we're gonna have to…

86
00:16:19.860 --> 00:16:23.380
David Darrah: We're gonna have to work on a…

87
00:16:24.640 --> 00:16:37.290
David Darrah: Yeah, we're gonna have to work on making sure that's reflected in the governance, and I… to be honest with you, this is the first time I've actually, I think in a long time even been invited to this meeting as the product owner, I wasn't overset on my part.

88
00:16:37.330 --> 00:16:51.439
David Darrah: But, yeah, you're absolutely right that this is… this is business-driven… it was a business-driven decision, not a community one, although PQC, I think, is looming large over everybody using any technology at this point.

89
00:16:52.520 --> 00:16:54.060
David Darrah: At least in the US.

90
00:16:54.240 --> 00:16:57.579
David Darrah: So… Yeah, we're gonna have to do better.

91
00:16:59.350 --> 00:17:05.940
Giuseppe Scrivano: Yeah, my only question is, like, how bad is to postpone the feature for… Like, 3 months.

92
00:17:07.079 --> 00:17:08.119
Giuseppe Scrivano: That's true.

93
00:17:08.310 --> 00:17:09.710
Giuseppe Scrivano: To wait, both.

94
00:17:13.119 --> 00:17:15.269
Matthew Heon (Red Hat LLC): Well,

95
00:17:15.819 --> 00:17:23.209
Matthew Heon (Red Hat LLC): From a Red Hat perspective, extremely bad. From an upstream perspective, we could probably live with it, but it would…

96
00:17:23.259 --> 00:17:38.399
Matthew Heon (Red Hat LLC): It… I would like to have a lot of this stuff enabled prior to Podman 6.1 in the summer, because that is going to be our big PQC release. That's going to have all the fancy new SHA-512 stuff.

97
00:17:42.200 --> 00:17:50.670
Tom Sweeney (Red Hat LLC): Me, personally, you know, my own opinion is we don't wait for the PQC, we release 5-8, and then we get the PQC in either at 5.81 or 5.9.

98
00:17:50.950 --> 00:17:53.369
Tom Sweeney (Red Hat LLC): Whenever that is, that fits into the REL product.

99
00:17:53.600 --> 00:17:56.180
Tom Sweeney (Red Hat LLC): That's the way I think it should go, but that's…

100
00:17:56.180 --> 00:18:05.669
Matthew Heon (Red Hat LLC): We can certainly do that, but then we start maintaining… we wouldn't be able to get into JobStream, basically. We do not do feature backboards, and this is definitely a feature.

101
00:18:06.970 --> 00:18:08.289
Tom Sweeney (Red Hat LLC): Then it becomes quite known.

102
00:18:10.530 --> 00:18:17.530
Brent Baude: Is… is there any opportunity for this to slip further, Matt? Are we dependent on anyone else?

103
00:18:17.710 --> 00:18:21.370
Brent Baude: Or do you see any possibility that this could.

104
00:18:21.370 --> 00:18:40.349
Matthew Heon (Red Hat LLC): No, this is… all that's remaining is on our end. We are… the work itself is relatively simple, although it's not trivial, and there's a fair bit of it. The actual coding work is we are going to enable TLS13 options, so it's just plumbing through to containers conf.

105
00:18:40.350 --> 00:18:58.979
Matthew Heon (Red Hat LLC): But there is a fairly significant amount of verification and validation work to ensure that we are always using these settings. So, anytime we initiate a HTTP connection, it needs to be using the single good set of TLS options that we provided, if that makes sense.

106
00:19:00.880 --> 00:19:02.029
Brent Baude: And does,

107
00:19:03.900 --> 00:19:11.140
Brent Baude: Is it going into 6-0, you know, in the main, and then… and then being back-ported or cherry-picked from there?

108
00:19:11.950 --> 00:19:20.080
Matthew Heon (Red Hat LLC): Yeah, that would be my expectation. Miloslav is right now focused on getting it into C image main, so it's definitely going to be ready for 6.

109
00:19:21.840 --> 00:19:22.440
Brent Baude: Cool.

110
00:19:35.030 --> 00:19:36.530
Tom Sweeney (Red Hat LLC): Hey, anything else here?

111
00:19:40.850 --> 00:19:54.809
Tom Sweeney (Red Hat LLC): I am going to ask that folks, if you're going to be speaking, unless you've got some network issues at your location, to please put your video on while you're speaking, and you can turn it off if you're not speaking, if you'd like. It just makes the replays work a whole lot better.

112
00:19:55.010 --> 00:20:03.999
Tom Sweeney (Red Hat LLC): So, given that, we are going to move on to our second topic for today, and that is an AI policy, and that is Jan and Paul, I believe.

113
00:20:04.190 --> 00:20:06.309
Tom Sweeney (Red Hat LLC): Not sure who's taking that. Go ahead, Jets.

114
00:20:10.460 --> 00:20:11.620
Jan Kaluza: Hey, do you hear me?

115
00:20:13.530 --> 00:20:25.220
Jan Kaluza: Okay, so… basically, I've started doing PR reviews recently, more often, in recent weeks, and there were some things I noticed, and

116
00:20:25.640 --> 00:20:43.909
Jan Kaluza: that's resulted in the policy I would like to propose, maybe together with Paul. I shared the Google Doc in the chat, and the goal of this is basically ask… to ask people here to read the policy and comment it, so we can actually see

117
00:20:44.040 --> 00:20:46.320
Jan Kaluza: What people, think about it.

118
00:20:46.440 --> 00:20:51.440
Jan Kaluza: The policy tries to, address a few things.

119
00:20:51.820 --> 00:20:57.670
Jan Kaluza: I just noticed that, some contributors use the AI in a way that,

120
00:20:57.980 --> 00:21:12.470
Jan Kaluza: is, too extensive, maybe, you know? Like, copy-pasting the, output of the ChatGPT or other AI model to, comments instead of writing the comments themselves, which is kind of…

121
00:21:12.630 --> 00:21:18.740
Jan Kaluza: Impersonal, and another issue with that is that it's… it produces long comments.

122
00:21:18.790 --> 00:21:33.970
Jan Kaluza: And the comment is produced in few seconds, but the maintainers have to read it all, which is time-consuming, and the same thing could be said in few sentences, but because of the AI, it's kind of long, really long, and unedited.

123
00:21:34.110 --> 00:21:39.710
Jan Kaluza: So, another, another issue which I'm trying to address there is the,

124
00:21:40.140 --> 00:21:45.190
Jan Kaluza: use of AI to generate code without actually knowing what the code does.

125
00:21:45.760 --> 00:21:52.890
Jan Kaluza: And to give you one example, recently I found a PR… I was reviewing PR where the,

126
00:21:53.310 --> 00:22:01.020
Jan Kaluza: Where the, outdoor, like, did a code, I asked for some changes in the code.

127
00:22:01.210 --> 00:22:20.259
Jan Kaluza: And as a result, next day, I found out the completely different code in the PR, which was addressing my issues, but it was clearly, like, regenerated from the scratch, and I had to read the code again, you know, from the scratch, because there was no same thing as before.

128
00:22:20.530 --> 00:22:22.170
Jan Kaluza: And,

129
00:22:22.840 --> 00:22:33.480
Jan Kaluza: I think we should have some way, some policy where we can, like, maybe defend ourselves more, or, like, say, this is not acceptable.

130
00:22:33.660 --> 00:22:36.899
Jan Kaluza: And you should basically, like,

131
00:22:37.370 --> 00:22:51.580
Jan Kaluza: change the code according to the review in a minimal way, or you should just write the, commit message yourself in your… in your voice, basically, so it's clear that you understand what the code is about. And,

132
00:22:51.760 --> 00:23:02.590
Jan Kaluza: Other projects, they have, similar policies. The mine… the policy I've wrote here is actually based on a policy of other projects, which Paul found.

133
00:23:02.870 --> 00:23:08.250
Jan Kaluza: So, I think that's for the introduction. What I'm really looking for is

134
00:23:09.330 --> 00:23:16.279
Jan Kaluza: for more people to read it, think about it, and add your opinions in the document. I do not think we…

135
00:23:16.750 --> 00:23:27.390
Jan Kaluza: have another thing to do right now, so that's all. And if Paul wants to add something on top of what I said, feel free, Paul.

136
00:23:31.150 --> 00:23:36.989
Paul Holzinger: I think your document is private, if you want to discuss that in the open, you should probably.

137
00:23:37.310 --> 00:23:43.029
Jan Kaluza: I think… I think that one is not private, the one I sent in the chat.

138
00:23:46.340 --> 00:23:50.349
Jan Kaluza: I see people there. It's a different one than we used…

139
00:23:50.350 --> 00:23:52.129
Paul Holzinger: Okay, it's not the… okay.

140
00:23:52.130 --> 00:23:52.600
Jan Kaluza: Yeah.

141
00:23:52.600 --> 00:23:53.339
Paul Holzinger: Yeah, okay.

142
00:23:53.630 --> 00:24:06.510
Jan Kaluza: Yeah, the issue is that the internal one, I couldn't found out a way how to make it public for everyone, so I just copied it, and we will continue here in this public document where it should be from the beginning, so…

143
00:24:06.970 --> 00:24:08.140
Jan Kaluza: That's just it.

144
00:24:08.970 --> 00:24:12.129
Paul Holzinger: Yeah, you cannot make it public in front.

145
00:24:13.100 --> 00:24:14.310
Paul Holzinger: thing, yeah.

146
00:24:14.510 --> 00:24:18.590
Paul Holzinger: Okay, thanks. I just didn't solve it.

147
00:24:19.040 --> 00:24:30.519
Paul Holzinger: Yeah, I think, I mean, if anybody wants to speak up here and say how they feel as a maintainer, or maybe as a contributor even, on how things are being used, then…

148
00:24:31.700 --> 00:24:35.360
Paul Holzinger: what they like to see, rather.

149
00:24:35.570 --> 00:24:37.049
Paul Holzinger: I mean, we cannot…

150
00:24:38.680 --> 00:24:44.060
Paul Holzinger: just writing something down will not make this go away, but I think having a policy is a…

151
00:24:44.780 --> 00:24:51.830
Paul Holzinger: good step to post that somewhere, and if people don't follow that, we close the PRs, and…

152
00:24:52.110 --> 00:24:54.839
Paul Holzinger: Don't engage further with them, basically.

153
00:25:03.720 --> 00:25:05.050
Tom Sweeney (Red Hat LLC): Sounds good.

154
00:25:05.250 --> 00:25:13.989
Tom Sweeney (Red Hat LLC): Jan, unless you have, problems with this, I think I'll go ahead and throw this out on social media for people to take a look at as well, just to try and get it out. Have you sent it to email or anything?

155
00:25:14.550 --> 00:25:21.749
Jan Kaluza: No, I didn't send an email. You can, you can… yeah, feel… or feel free to actually share it.

156
00:25:22.260 --> 00:25:23.660
Jan Kaluza: Wherever you like.

157
00:25:24.350 --> 00:25:28.160
Tom Sweeney (Red Hat LLC): Okay, I'll go ahead and do that, and okay if I tag your email in there?

158
00:25:28.520 --> 00:25:29.339
Tom Sweeney (Red Hat LLC): If people…

159
00:25:29.340 --> 00:25:30.050
Jan Kaluza: Bye.

160
00:25:30.190 --> 00:25:30.790
Jan Kaluza: That's fine.

161
00:25:31.520 --> 00:25:32.200
Tom Sweeney (Red Hat LLC): Yep.

162
00:25:41.690 --> 00:25:44.010
Tom Sweeney (Red Hat LLC): Alrighty, any other questions or comments?

163
00:25:49.780 --> 00:25:57.010
Tom Sweeney (Red Hat LLC): Okay, I'm not hearing any, so given that, we'll move on to the next topic, which is PQC from Matt and Milislav, and I think this is the…

164
00:25:57.250 --> 00:26:04.040
Tom Sweeney (Red Hat LLC): Problem with 5.8 at the moment, anyway, at least part of it. At least part of it, if I could speak English today. Go ahead, Matt, or Milislav.

165
00:26:04.710 --> 00:26:13.899
Matthew Heon (Red Hat LLC): I guess I'll start, and Millislav can fill in the blanks. So this one is something that people probably will not notice.

166
00:26:14.180 --> 00:26:20.129
Matthew Heon (Red Hat LLC): If we do our jobs right for a while, but when it does happen, it's probably going to be rather noticeable.

167
00:26:21.710 --> 00:26:28.840
Matthew Heon (Red Hat LLC): How to begin this? So, governments, unlike a lot of people, parts of governments at least, think in a long term.

168
00:26:28.850 --> 00:26:46.679
Matthew Heon (Red Hat LLC): Where data that we're sending now may need to remain classified, secret, whatever, for the next 50 to 100 years. It would be very bad if we've sent data using cryptography that gets broken in 50 years, and people find out about things they're not supposed to find out about.

169
00:26:46.710 --> 00:26:59.279
Matthew Heon (Red Hat LLC): So part of this is why the U.S. is presently leading a big push for post-quantum cryptography, basically cryptographic primitives that are safe against quantum computers.

170
00:26:59.370 --> 00:27:21.829
Matthew Heon (Red Hat LLC): Part of this is signatures, container signatures. As of Podman 5.8, I believe, we have full support for post-quantum signatures, so we can both create and pull and verify images that have these new types of signatures that have absolutely giant public keys, but are secure against quantum computers, so that's pretty neat.

171
00:27:21.890 --> 00:27:41.239
Matthew Heon (Red Hat LLC): Stage 2 is Podman 5.8, which is going to drag in TLS13. Now we're encrypting all your traffic over the wire with it, so you can verify container images are appropriately safe against someone with a quantum computer. You can verify your traffic isn't being harvested and decrypted later. That's pretty neat.

172
00:27:41.320 --> 00:28:00.579
Matthew Heon (Red Hat LLC): But the big change, the one that people on this call are probably going to care about, is that at some point in the middle of this year, we're going to start enabling support for SHA-512 image hashes. So, it has been decided that SHA-256 is no longer safe against potential quantum computers.

173
00:28:00.580 --> 00:28:09.919
Matthew Heon (Red Hat LLC): And as such, we are going to have the ability to optionally generate images using SHA 512 digests for basically everything you had SHA-256 before.

174
00:28:10.470 --> 00:28:27.760
Matthew Heon (Red Hat LLC): The most immediate thing you're going to see from that is that in your display output, all of your image IDs are suddenly going to be a lot larger than they used to be. So our expectation is that this should be sufficiently natively integrated into the ecosystem that

175
00:28:27.850 --> 00:28:50.109
Matthew Heon (Red Hat LLC): Supporting registries will be able to use these images, probably not all registries initially, but supporting registries. And we should be able to mix 512 and 256 images in local storage without much of an issue. So, you will be able to continue using your existing ones. We have no plans to deprecate 256, but for those who really care about it, they will be able to force 512 only.

176
00:28:50.130 --> 00:29:01.209
Matthew Heon (Red Hat LLC): And for those who don't care at all, you may start seeing images pop up in your image store that you had no idea why, but they suddenly have very long image IDs.

177
00:29:03.530 --> 00:29:06.190
Matthew Heon (Red Hat LLC): Milslav, anything you want to add to that, or…

178
00:29:08.060 --> 00:29:22.060
Miloslav Trmač: I think one small correction, the post-quantum TLS is available by default when you compile with a recent enough-go version, so all users are going to get that protection.

179
00:29:22.240 --> 00:29:26.650
Miloslav Trmač: The thing that we are adding is the ability to,

180
00:29:26.960 --> 00:29:33.490
Miloslav Trmač: further constrain it so that you say, I only want ELS 1.3 and no downgrades.

181
00:29:34.190 --> 00:29:38.850
Miloslav Trmač: And for signatures, there are…

182
00:29:39.110 --> 00:29:47.479
Miloslav Trmač: to formatted signatures, the old-style atomic, simple signing, GPG-based signatures, and sign-store signatures is by cosign.

183
00:29:48.050 --> 00:29:51.629
Miloslav Trmač: We have support for a post-quantum signature

184
00:29:52.090 --> 00:29:57.630
Miloslav Trmač: for Sequoia PGP-backed signatures in the GNUPG format.

185
00:29:58.170 --> 00:30:02.970
Miloslav Trmač: And that either has or will soon have post-quantum backend.

186
00:30:03.640 --> 00:30:09.280
Miloslav Trmač: For, the 6-store signatures, which are more modern and more convenient.

187
00:30:10.180 --> 00:30:15.359
Miloslav Trmač: there is more work to be done, we first need to catch up with cosign version 3.

188
00:30:15.740 --> 00:30:22.379
Miloslav Trmač: And there is a separate team at Red Hat working to add Post Quantum to that, but that will land sometime in the future.

189
00:30:25.320 --> 00:30:37.450
Miloslav Trmač: Yeah, and as Matt said, something will happen to image IDs, and we are going to announce with Podman 6 that they are not going to be current needs to be called to Config Digest in the future.

190
00:30:38.510 --> 00:30:42.860
Miloslav Trmač: Because we are changing the format some way, we don't know exactly what way.

191
00:30:42.970 --> 00:30:46.150
Miloslav Trmač: But… If you have any code that…

192
00:30:46.670 --> 00:30:52.389
Miloslav Trmač: prepend shot 256 to an image ID that is certainly going to break one way or another.

193
00:30:55.030 --> 00:30:55.860
Miloslav Trmač: That's it, I guess.

194
00:31:07.430 --> 00:31:08.080
Tom Sweeney (Red Hat LLC): Excuse me.

195
00:31:08.450 --> 00:31:10.520
Tom Sweeney (Red Hat LLC): Okay, any further questions, comments?

196
00:31:17.480 --> 00:31:19.159
Tom Sweeney (Red Hat LLC): Well, thank you, Matt and Muslov.

197
00:31:19.370 --> 00:31:26.509
Tom Sweeney (Red Hat LLC): On the chat, I was contacted by Martin, who wanted to talk about public-related news, and Martin, I'm going to send it over to you.

198
00:31:28.750 --> 00:31:29.900
Martin Beckert (Strukturpiloten OHG): Okay…

199
00:31:30.340 --> 00:31:47.510
Martin Beckert (Strukturpiloten OHG): Hello, everyone. Yeah, I'm the new maintainer of the Podlet project. I'm the second one, to be exactly. And the first one is Paul Nettleton. He's back on track now, and together we released, after 2 years, the first Podlet release.

200
00:31:47.560 --> 00:31:51.539
Martin Beckert (Strukturpiloten OHG): That was yesterday, so that's really a huge…

201
00:31:51.660 --> 00:32:00.249
Martin Beckert (Strukturpiloten OHG): News for us all, so thank you for letting me, take part in the Potlet project.

202
00:32:00.580 --> 00:32:14.439
Martin Beckert (Strukturpiloten OHG): And, I have two questions about the organization, the organizational part for the Podler project, because there's another repository named ComposeSpec for Rust.

203
00:32:14.580 --> 00:32:28.329
Martin Beckert (Strukturpiloten OHG): It's this link here. Paul Nettleton wrote, or is still contributing to that library as it's needed for the Rust project in Potlet, and we wanted to ask if we can, change your ownership

204
00:32:28.330 --> 00:32:37.389
Martin Beckert (Strukturpiloten OHG): from Paul Nettleton to the containers project, so Paul and I can take care of that ComposeSpecIS repository.

205
00:32:37.390 --> 00:32:52.339
Martin Beckert (Strukturpiloten OHG): And it's only used for the Podlet project. So, without that repository, Podlet can't be developed. So that's why we thought it's a good idea to also move that one to the containers organization.

206
00:32:54.250 --> 00:32:55.080
Brent Baude: Hi, Martin.

207
00:32:55.240 --> 00:32:56.520
Brent Baude: Congratulations.

208
00:32:57.510 --> 00:33:01.479
Brent Baude: We were actually just talking about this in a maintainer's meeting.

209
00:33:02.330 --> 00:33:04.329
Brent Baude: Within the last 10 days or so.

210
00:33:05.180 --> 00:33:14.169
Brent Baude: And so let's… if you're willing, let's… and there are no objections already here today, which I'll open the floor back up to.

211
00:33:14.400 --> 00:33:19.730
Brent Baude: We would like for you to file an issue, on the Podman.

212
00:33:19.910 --> 00:33:21.230
Martin Beckert (Strukturpiloten OHG): Repo?

213
00:33:21.510 --> 00:33:26.630
Brent Baude: With your request to have… This so-and-so project moved.

214
00:33:27.320 --> 00:33:33.220
Brent Baude: To the container's repo, and that way it can be openly and publicly seen.

215
00:33:33.500 --> 00:33:37.169
Brent Baude: And, we can work… sign it and work through it.

216
00:33:37.310 --> 00:33:39.600
Brent Baude: But I'll open the floor up to others.

217
00:33:40.960 --> 00:33:42.429
Martin Beckert (Strukturpiloten OHG): Yeah, great, I will do that.

218
00:33:45.620 --> 00:33:51.050
Martin Beckert (Strukturpiloten OHG): If everyone is fine with that, I would like to ask the second question.

219
00:33:52.080 --> 00:34:05.750
Martin Beckert (Strukturpiloten OHG): It's about our organizational part in the potluck project, because we also want to, discuss our ongoing development process, or also questions from the community in the Discord server.

220
00:34:06.220 --> 00:34:17.009
Martin Beckert (Strukturpiloten OHG): But we don't want to split the community and create another Discord server for the Portlet project, but we wanted to ask if we can get some channels on the Portman Discord server.

221
00:34:17.170 --> 00:34:23.489
Martin Beckert (Strukturpiloten OHG): So, we would like to get a Podlet channel and a Podlet dev channel, so we can discuss,

222
00:34:23.679 --> 00:34:25.840
Martin Beckert (Strukturpiloten OHG): Openly what's going on with the project.

223
00:34:26.469 --> 00:34:36.949
Martin Beckert (Strukturpiloten OHG): That being said, Paul Holzinger already wrote me something about that, because there's a bridge for Discord to, what was the other one? Matrix.

224
00:34:36.949 --> 00:34:51.699
Martin Beckert (Strukturpiloten OHG): to the Matrix server. For my side, I don't need the Matrix bridge for both channels, so I wanted to ask the community if it's fine if we can get two channels, or what do you think was best for the project?

225
00:34:57.870 --> 00:35:02.709
Paul Holzinger: So, in… in my opinion, I… I don't think…

226
00:35:03.110 --> 00:35:08.480
Paul Holzinger: Anybody from, like, the core Portman team is hanging out much on this court?

227
00:35:08.640 --> 00:35:14.570
Paul Holzinger: So… That's why I suggested Maybe moving elsewhere is better for you?

228
00:35:15.440 --> 00:35:21.199
Paul Holzinger: Because we don't… Moderate that actively on that end.

229
00:35:22.270 --> 00:35:30.969
Paul Holzinger: The… I think the Portman desktop team is also in that server, right? I think they might be more active.

230
00:35:31.810 --> 00:35:36.399
Paul Holzinger: I'm not sure what their status is, so maybe we should…

231
00:35:36.930 --> 00:35:43.540
Paul Holzinger: talk to them as well. I mean, I don't really… Care too much about channels.

232
00:35:43.850 --> 00:35:48.690
Paul Holzinger: Like, having extra channels or something, but, I mean, somebody needs to…

233
00:35:49.530 --> 00:35:52.759
Paul Holzinger: At least look at them and moderate them if needed.

234
00:35:52.990 --> 00:35:54.319
Martin Beckert (Strukturpiloten OHG): That's correct.

235
00:35:55.550 --> 00:36:08.360
Martin Beckert (Strukturpiloten OHG): My problem with opening another server is also that, I have seen that some users are asking Podlet-related questions on the Podman channel, because they are trying to figure out how to get Podman,

236
00:36:08.400 --> 00:36:23.560
Martin Beckert (Strukturpiloten OHG): to get composed YAML files into SystemD quadlet files, and therefore I also have to check what's going on the podman channel, and so maybe it's best to have another podlet channel near to the podman channel, so the users can see what's going on.

237
00:36:24.680 --> 00:36:26.570
Martin Beckert (Strukturpiloten OHG): That's my intention on my slide.

238
00:36:28.740 --> 00:36:37.280
Martin Beckert (Strukturpiloten OHG): But, if it's okay, I can also create another issue in the Portman channel, if that would help discussing the whole situation.

239
00:36:42.290 --> 00:36:49.179
Neil Smith: Yeah, Martin, I think it sounds like, we would like to… I think we would like to support you here. If you can just…

240
00:36:50.780 --> 00:36:51.740
Neil Smith: Send…

241
00:36:52.120 --> 00:36:59.040
Neil Smith: through a request of what channels you want, but I think we might want to have the automatic matrix sync.

242
00:36:59.920 --> 00:37:03.069
Neil Smith: Lokesh is probably not on, because he's… it's late.

243
00:37:03.070 --> 00:37:03.840
Tom Sweeney (Red Hat LLC): softening.

244
00:37:04.120 --> 00:37:08.970
Neil Smith: But, we probably can link this stuff up for you, too, so…

245
00:37:09.220 --> 00:37:13.909
Neil Smith: If you wanted to send through a request, and we can try to figure it out, help you out.

246
00:37:14.260 --> 00:37:15.240
Tom Sweeney (Red Hat LLC): Okay, but it might…

247
00:37:15.240 --> 00:37:18.909
Neil Smith: I understand not wanting to run your own Discord server and things like that, for sure.

248
00:37:19.790 --> 00:37:31.669
Tom Sweeney (Red Hat LLC): Yeah, I think, if you wouldn't mind, I think probably the easiest thing to do would be for you to create a new issue with the exact names of the channels that you want, just to make sure that we don't mess up, you know, knife for a knee kind of switch kind of thing.

249
00:37:31.950 --> 00:37:42.399
Tom Sweeney (Red Hat LLC): You know, if you could put those out on an issue, then I'll have Lokesh take a look, and I can possibly take a look, as long as there's no objections, I don't see a reason that we couldn't get the channels set up for you there.

250
00:37:42.950 --> 00:37:43.620
Martin Beckert (Strukturpiloten OHG): Okay.

251
00:37:44.590 --> 00:37:45.590
Martin Beckert (Strukturpiloten OHG): Thanks a lot.

252
00:37:45.760 --> 00:37:46.330
Tom Sweeney (Red Hat LLC): Yep.

253
00:37:47.850 --> 00:37:49.430
Martin Beckert (Strukturpiloten OHG): No further questions for my slider.

254
00:37:49.750 --> 00:37:54.159
Tom Sweeney (Red Hat LLC): Okay, well, I'm gonna see if anybody has any for you. Anybody have questions for Martin about that?

255
00:37:54.160 --> 00:37:54.710
Martin Beckert (Strukturpiloten OHG): Pardon?

256
00:37:56.600 --> 00:38:00.120
Martin Beckert (Strukturpiloten OHG): But they can also reach out on the Podman Discord channel if they want to.

257
00:38:00.640 --> 00:38:02.470
Tom Sweeney (Red Hat LLC): Yes, there you go.

258
00:38:04.020 --> 00:38:13.970
Tom Sweeney (Red Hat LLC): All right, with that, I'm gonna… thank you, Martin, and thanks for the update, and congratulations again. I'm gonna open up for any other questions that people have.

259
00:38:23.940 --> 00:38:27.739
Tom Sweeney (Red Hat LLC): And while people are thinking about that, we'll say that we are

260
00:38:27.960 --> 00:38:42.319
Tom Sweeney (Red Hat LLC): having our next Podman Community meeting on Tuesday, April 7th at 11 a.m, and our next cabal meeting is coming up on the 3rd, again, but on March, and that's, just 4 weeks away from today. So, I am…

261
00:38:42.540 --> 00:38:50.310
Tom Sweeney (Red Hat LLC): And always looking for topics for either one of those meetings, so please let me know if you have some, or add them to the agendas as we go along during the month.

262
00:38:50.840 --> 00:38:55.229
Tom Sweeney (Red Hat LLC): And any other… one last call, then, for questions, topics?

263
00:38:55.720 --> 00:38:56.620
Tom Sweeney (Red Hat LLC): Pots.

264
00:39:00.520 --> 00:39:11.680
Gerald Seidman (AuriStor Inc.): Well, very minor note is, there's been conversation in OpenShift about there being a machine config for adding additional layer stores.

265
00:39:12.090 --> 00:39:21.510
Gerald Seidman (AuriStor Inc.): which is great, and they… they allude to… in Podman 6, there being drop-ins for, storage.conf.

266
00:39:22.120 --> 00:39:25.690
Gerald Seidman (AuriStor Inc.): Is that… Match people's understanding?

267
00:39:28.290 --> 00:39:37.129
Paul Holzinger: Portman6 should support Robins of storage.conf, definitely, and, like, all the other files as well, like…

268
00:39:37.400 --> 00:39:38.269
Paul Holzinger: Most of them do.

269
00:39:38.270 --> 00:39:38.970
Gerald Seidman (AuriStor Inc.): Awesome.

270
00:39:39.400 --> 00:39:40.090
Paul Holzinger: Yeah.

271
00:39:41.060 --> 00:39:41.960
Gerald Seidman (AuriStor Inc.): Thank you.

272
00:39:42.400 --> 00:39:47.810
Gerald Seidman (AuriStor Inc.): I just had… I have to report that… answer that question to a customer, so thanks you so much.

273
00:39:48.940 --> 00:39:49.960
Tom Sweeney (Red Hat LLC): No problems, thanks for bringing it up.

274
00:39:50.070 --> 00:39:53.950
Miloslav Trmač: Paul, are you sure about the drop-ins in sea storage?

275
00:39:56.260 --> 00:39:59.769
Miloslav Trmač: It's entirely up to you, just… I think we…

276
00:40:01.100 --> 00:40:04.689
Miloslav Trmač: That would mean using the attributed string throughout the API.

277
00:40:07.000 --> 00:40:11.440
Paul Holzinger: I mean, the design doc specifies using this…

278
00:40:11.610 --> 00:40:15.230
Paul Holzinger: syntax of drop-ins, so that is supposed to be there.

279
00:40:15.550 --> 00:40:18.980
Paul Holzinger: How we get there, we can certainly discuss.

280
00:40:25.220 --> 00:40:25.890
Tom Sweeney (Red Hat LLC): Great.

281
00:40:26.160 --> 00:40:30.460
Tom Sweeney (Red Hat LLC): Well, last call before I head us off to lunch, dinner, or other things.

282
00:40:34.830 --> 00:40:41.610
Tom Sweeney (Red Hat LLC): Right, folks, I think… I think that's a wrap. Thanks so much for coming. Thanks, folks, who were presenting for us today, and we'll see you next month.
```
