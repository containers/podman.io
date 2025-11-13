# Podman Community Cabal Meeting Notes
## November 4, 2025 11:00 a.m. Eastern (UTC-5)

### Attendees
Tom Sweeney, Tim Zhou, Mark Russell, Matt Heon, Nalin Dahyabhai, Mario Loriedo, Fatih, Ashley Cui, Paul Holzinger, Kevin Clevenger, Jan Rodak, Dave Darrah, Gerry Seidman.

### Topics

 1. Go formatter, https://github.com/containers/podman/discussions/27291 - Paul
 2. Drop in config file loading behaviors - Paul

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=0x6juTSRvo0)

Meeting start: 11:03 a.m. EDT (UTC-5)

#### Quick Recap
The Podman Community Cabal meeting focused on discussing formatting standards and config file parsing changes for version 6, with Paul presenting proposals on both topics that generated debate among team members. The team discussed the need for more maintainers and contributors, with Matthew encouraging participation and Mohan announcing an upcoming livestreamed talk on Podman. The next community meeting was scheduled for December 2nd, with the next Cabal meeting set for January 6th, 2026.

#### Next Steps
 * Paul: Add a reply to the Go formatter discussion stating voting will close end of day on the 7th, with the decision to be made on Monday
 * Tom: Socialize the Go formatter discussion/vote
 * Paul: Write and upload a design doc as a PR to the design docs directory in the repo regarding config file parsing consolidation for Podman 6
 * Tom: Add the CNCF ambassador Podman talk event to the meeting notes
    * https://www.linkedin.com/events/chatloopbackoff-episode71-podma7386532304296484864/

#### Go formatter  - Paul Holzinger - ([00:34](https://www.youtube.com/watch?v=0x6juTSRvo0&t=34s) in the video)

Go Formatting Standard Debate:The team discussed the Go formatting standard to use in their repositories, with a current majority favoring GoFMT over the stricter GoFundT format. Paul created a voting discussion that will remain open until the end of the day on July 7th, after which Tom will tally the votes on Monday. Nalin highlighted the advantage of the opinionated GoFundT format in clearly marking octal constants, which is particularly useful for file permission handling.

gofmt request for [vote](https://github.com/containers/podman/discussions/27291).
Please add your vote by Friday, November 7, 2025.

#### Drop in config file loading behaviors  - Paul Holzinger - ([07:42](https://www.youtube.com/watch?v=0x6juTSRvo0&t=462s) in the video)

We have config *.conf files in a number of places.  As an example: /usr/share/containers.conf, usr/.../containers.conf.d/1-dropin.conf, /etch/containers/containers.conf, /etc/../containers.conf.d/1-dropin.conf  See [slides](./2025_Nov_Cabal_Paul_Slide.pdf)

Podman Config Changes Discussion:The team discussed changes to Podman's config file parsing in version 6, with Paul presenting a proposal to consolidate parsing logic across different config files. Kevin expressed support for maintaining the current Podman approach due to backward compatibility concerns with embedded partners. Paul clarified that the proposed changes would still allow for drop-in files and per-installation modifications. Paul leans towards the UAPI method.

Paul will be putting together a design doc.

#### Looking for more people - Matt Heon - ([24:27](https://www.youtube.com/watch?v=0x6juTSRvo0&t=1467s) in the video)

We're looking for reviewers, maintainers, and contributors.  Just hop on and start reviewing, or reach out to us on the matrix channel.

#### Open discussion - ([25:33](https://www.youtube.com/watch?v=0x6juTSRvo0&t=1533s) in the video)
1. Mohan announced an upcoming livestream talk on Podman by a CNCF ambassador on Podman on Thursday, November 6, 2025, at noon eastern (UTC-5).  https://www.linkedin.com/events/chatloopbackoff-episode71-podma7386532304296484864/

### Next Cabal Meeting: Tuesday, January 6, 2026, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1. None Discussed.

### Next Community Meeting: Tuesday, December 2, 2025, 11:00 a.m. EST (UTC-5)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:31 a.m.

The first 11 or so minutes of the meeting were cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

 ### Raw Meeting Chat:

 ```    
00:12:42	Paul Holzinger:	https://github.com/containers/podman/discussions/27291
00:28:29	Gerald Seidman (AuriStor Inc.):	I am in a loud location, so I'll ask my question here ....
Is analogously something similar to be done to storage.conf?
In particular on OpenShift, there isn't a way to add/override fields in storage.conf
00:29:20	Tom Sweeney (Red Hat, Inc.):	Gerry, I'll ask in a moment.
00:29:35	Gerald Seidman (AuriStor Inc.):	Reacted to "Gerry, I'll ask in a..." with 👍
00:34:54	Mohan Boddu:	ps: https://www.linkedin.com/events/chatloopbackoff-episode71-podma7386532304296484864/
 ```

### Raw Zoom Meet Transcript

```
22
00:10:58.950 --> 00:11:14.239
Tom Sweeney (Red Hat, Inc.): Got 11.03, so I'm going to start the meeting officially and welcome everybody here today for the Podman Community Meeting… Community Cabal Meeting, rather. Today is Tuesday, November 4th, 2025. We have two topics, as of now, that we're going to be discussing, both from Paul Halsinger.

23
00:11:14.270 --> 00:11:23.309
Tom Sweeney (Red Hat, Inc.): The first one's about the Go formatter, and the second is the drop-in config file loading behaviors, and Matt, I think you had a little, talk that you wanted to do as well after that.

24
00:11:23.740 --> 00:11:24.460
Tom Sweeney (Red Hat, Inc.): And…

25
00:11:24.760 --> 00:11:32.280
Tom Sweeney (Red Hat, Inc.): Beyond that, we have plenty of time for questions, I'm going to guess, later in this meeting, and I am going to hand it over to Paul. It's all yours.

26
00:11:36.370 --> 00:11:37.570
Paul Holzinger: Alright.

27
00:11:38.410 --> 00:11:41.340
Paul Holzinger: So the first topic,

28
00:11:41.600 --> 00:11:45.020
Paul Holzinger: We discussed it in the team previously.

29
00:11:45.900 --> 00:11:50.930
Paul Holzinger: is what Go format that we would want to use in our repos.

30
00:11:51.040 --> 00:11:58.539
Paul Holzinger: Currently, we have a mix between the official GoFMT formatter, That is perfect.

31
00:11:58.730 --> 00:12:02.719
Paul Holzinger: Like, by the standard Go tool chain, basically.

32
00:12:02.960 --> 00:12:11.590
Paul Holzinger: And then there's another format, go… Fumd, or, like, F-U-M-P-T.

33
00:12:12.370 --> 00:12:22.130
Paul Holzinger: Which has a stricter… I guess this is a superset of rules, so it… It…

34
00:12:22.360 --> 00:12:24.029
Paul Holzinger: Formats more code.

35
00:12:24.660 --> 00:12:30.330
Paul Holzinger: But if you format with that, the standard format will also be happy.

36
00:12:31.100 --> 00:12:41.420
Paul Holzinger: And so, to get some more feedback, I created a discussion… Where people can vote.

37
00:12:41.890 --> 00:12:43.559
Paul Holzinger: Should be she.

38
00:12:44.550 --> 00:12:53.620
Paul Holzinger: what everybody wants, and it's, pretty equal, with one vote more on GoFMT at the moment, if anybody here has.

39
00:12:54.160 --> 00:12:59.520
Paul Holzinger: Opinion in either direction, then, please, vote.

40
00:13:01.190 --> 00:13:04.419
Paul Holzinger: Yeah, otherwise, I guess there isn't.

41
00:13:06.960 --> 00:13:15.870
Paul Holzinger: much… As to say about… Like, right now, the majority would be on GoFMT, so…

42
00:13:16.050 --> 00:13:18.399
Paul Holzinger: My recommendation would be that we…

43
00:13:19.420 --> 00:13:22.280
Paul Holzinger: Use that consistently in our repos.

44
00:13:23.750 --> 00:13:26.520
Paul Holzinger: But I can also wait a bit longer.

45
00:13:27.120 --> 00:13:29.380
Paul Holzinger: If other people want to vote.

46
00:13:32.960 --> 00:13:34.730
Tom Sweeney (Red Hat, Inc.): When would you like the voting invite, Paul?

47
00:13:37.770 --> 00:13:46.020
Paul Holzinger: I… I don't really know, we can.

48
00:13:46.200 --> 00:13:48.500
Paul Holzinger: It can leave it open for…

49
00:13:48.850 --> 00:13:51.489
Paul Holzinger: For another week or so, I don't know.

50
00:13:51.950 --> 00:13:55.569
Paul Holzinger: It's open for 3 weeks now, but, yeah.

51
00:14:04.220 --> 00:14:09.339
Paul Holzinger: I mean, if somebody has arguments in either direction, they can also bring them forward.

52
00:14:09.800 --> 00:14:15.609
Tom Sweeney (Red Hat, Inc.): Yeah, personally, I'd, say… suggest keeping it open until… through this week, and then closed off Friday night.

53
00:14:19.590 --> 00:14:29.909
Nalin Dahyabhai (Red Hat, Inc.): Okay, I'll jump in. One of the things I appreciate about the more opinionated one is that it makes sure that octal constants are flagged as… well, are marked, clearly, as octal constants.

54
00:14:30.050 --> 00:14:35.749
Nalin Dahyabhai (Red Hat, Inc.): Which, given that we have to deal with file permissions, is very helpful when looking at source code, at least for me.

55
00:14:41.530 --> 00:14:42.140
Nalin Dahyabhai (Red Hat, Inc.): I don't even know.

56
00:14:42.140 --> 00:14:47.060
Paul Holzinger: Yeah, the… the Octal format is definitely,

57
00:14:47.920 --> 00:14:51.330
Paul Holzinger: Easier to… to read when scrolling through the file.

58
00:14:51.600 --> 00:14:55.470
Paul Holzinger: Compared to… To distinguish between the integer, so…

59
00:14:55.730 --> 00:15:00.310
Paul Holzinger: I agree, that's certainly useful. I could look if…

60
00:15:00.940 --> 00:15:09.970
Paul Holzinger: Like, there are so many lid doubles, I could see if there is a way to have that without requiring GoFund as well.

61
00:15:11.780 --> 00:15:14.439
Nalin Dahyabhai (Red Hat, Inc.): I would also add that early on, we had

62
00:15:14.760 --> 00:15:20.090
Nalin Dahyabhai (Red Hat, Inc.): difficulty getting people to run the standard formatter, it is a thing I think people got over and got used to.

63
00:15:29.920 --> 00:15:47.550
Paul Holzinger: Yeah, right now, the problem I see… like, I mean, the problem is in both directions, right? You have the crowd of people who are in the standard formatter, and if you require the opinionated, then that leads to more CI failures and repushes, and you need to install that other one, and so on.

64
00:15:47.950 --> 00:15:55.069
Paul Holzinger: The other way around, how we originally, I guess, the discussion originally started is.

65
00:15:55.570 --> 00:16:00.869
Paul Holzinger: some people run the opinionated form meter, and then you get a PRI which has, like.

66
00:16:00.980 --> 00:16:05.200
Paul Holzinger: A hundred lines changed in a file where they only touched, like, a single thing.

67
00:16:05.520 --> 00:16:06.300
Paul Holzinger: Man.

68
00:16:06.790 --> 00:16:09.190
Paul Holzinger: That's also quite bad for reviewing, and…

69
00:16:09.920 --> 00:16:13.639
Paul Holzinger: a point where I reject the PR and ask them to not do that.

70
00:16:13.880 --> 00:16:18.129
Paul Holzinger: But that's, especially the bigger the kiosk goes, the…

71
00:16:18.250 --> 00:16:21.289
Paul Holzinger: Harder that is to, like, peg out and so on.

72
00:16:21.990 --> 00:16:23.010
Paul Holzinger: It's a bit.

73
00:16:24.520 --> 00:16:25.510
Paul Holzinger: Tricky.

74
00:16:38.100 --> 00:16:43.430
Tom Sweeney (Red Hat, Inc.): And so, you know, I don't know if you have, but I'm happy to go ahead and socialize this a little bit on…

75
00:16:43.990 --> 00:16:49.509
Tom Sweeney (Red Hat, Inc.): Twitter and such, and get some stuff out to the email list, and, you know, if you are happy with

76
00:16:50.010 --> 00:16:53.659
Tom Sweeney (Red Hat, Inc.): concluding it this Friday or some other day, I can add that into it.

77
00:16:57.150 --> 00:17:00.480
Paul Holzinger: I mean, sure, I mean, the question is sort of…

78
00:17:01.680 --> 00:17:06.419
Paul Holzinger: Like, ideally, maintainers and contributors answer this question.

79
00:17:06.420 --> 00:17:06.770
Tom Sweeney (Red Hat, Inc.): You don't.

80
00:17:06.770 --> 00:17:09.590
Paul Holzinger: contribute, you don't, really.

81
00:17:10.319 --> 00:17:16.209
Tom Sweeney (Red Hat, Inc.): I don't want just somebody, a random X guy, helping and blasting the survey.

82
00:17:18.130 --> 00:17:23.870
Paul Holzinger: Yeah, I mean… I doubt that happens, but, you know, it's like…

83
00:17:35.860 --> 00:17:50.009
Tom Sweeney (Red Hat, Inc.): In that case, you've set it up in discussions, right, so people should have seen it if they're interested, and that would be where the maintainers are at. So, do you want to just add a… perhaps another reply to that discussion, saying, hey, we're going to close this as of such and such state there, and then we'll go with it from there?

84
00:17:54.720 --> 00:17:57.980
Paul Holzinger: Sure. So, endofrectin, or…

85
00:17:57.980 --> 00:18:02.459
Tom Sweeney (Red Hat, Inc.): Yeah, that's what I'd suggest. So, that would be 4th, 5th, 6th, 7th, 8th.

86
00:18:03.330 --> 00:18:05.069
Tom Sweeney (Red Hat, Inc.): I'm doing date math right.

87
00:18:06.440 --> 00:18:07.700
Paul Holzinger: I mean, we can…

88
00:18:07.910 --> 00:18:13.570
Paul Holzinger: We can do it Monday, like, if we do end of week, we won't act on it anyway over the weekend, so…

89
00:18:13.570 --> 00:18:14.770
Tom Sweeney (Red Hat, Inc.): Right. Yep.

90
00:18:15.130 --> 00:18:19.820
Tom Sweeney (Red Hat, Inc.): Yeah, told people to get it done by the end of the day on the 7th, and then we'll tally it up on Monday.

91
00:18:22.430 --> 00:18:23.540
Paul Holzinger: Sounds good.

92
00:18:40.020 --> 00:18:43.359
Paul Holzinger: Okay, I guess then I just jump into the next topic.

93
00:18:43.810 --> 00:18:44.670
Tom Sweeney (Red Hat, Inc.): Yes, please.

94
00:18:46.500 --> 00:18:49.719
Paul Holzinger: Okay, let me share the screen for that.

95
00:18:50.320 --> 00:18:54.940
Paul Holzinger: So basically, to start with some context.

96
00:18:55.330 --> 00:18:59.390
Paul Holzinger: as part of Portman 6, we want to rework

97
00:18:59.630 --> 00:19:02.870
Paul Holzinger: How we do config file parsing.

98
00:19:03.140 --> 00:19:11.140
Paul Holzinger: Where the main goal is to… Consolidate the parsing logic.

99
00:19:11.530 --> 00:19:17.190
Paul Holzinger: In order to have our various config files behave.

100
00:19:17.570 --> 00:19:18.730
Paul Holzinger: It's a shame.

101
00:19:20.380 --> 00:19:33.870
Paul Holzinger: So, the… Like, storage.conf, registries.conf… and… Like, containers.cont.

102
00:19:35.130 --> 00:19:39.260
Paul Holzinger: Currently, they all are different, which is not good.

103
00:19:40.110 --> 00:19:46.159
Paul Holzinger: And I'm still… I haven't, like, I'm working on a design doc for that, and then I make that public again.

104
00:19:46.330 --> 00:19:48.309
Paul Holzinger: Feedback can be provided there.

105
00:19:48.410 --> 00:19:55.140
Paul Holzinger: But as part of investigating a bit of that, I found the…

106
00:19:55.610 --> 00:20:02.560
Paul Holzinger: a difference in behavior between how Portman currently handles drop-in files, Or, like, override?

107
00:20:02.920 --> 00:20:09.530
Paul Holzinger: And how other… software does that, for example, SystemD.

108
00:20:10.000 --> 00:20:17.430
Paul Holzinger: And they have specif- like, published a specification for that, even, and the URP crew.

109
00:20:18.460 --> 00:20:21.669
Paul Holzinger: And so, you'll see my screen now, right?

110
00:20:22.150 --> 00:20:23.690
Tom Sweeney (Red Hat, Inc.): Yep, looks good.

111
00:20:23.690 --> 00:20:28.850
Paul Holzinger: Okay. Okay, so for that, basically, I made an example here.

112
00:20:29.570 --> 00:20:32.419
Paul Holzinger: With 4 config files.

113
00:20:33.270 --> 00:20:34.679
Paul Holzinger: So we have,

114
00:20:34.970 --> 00:20:43.490
Paul Holzinger: Like, the user share containers, containers.conf, that's generally the config file intended for the vendor, or, like, the package to ship.

115
00:20:43.870 --> 00:20:49.919
Paul Holzinger: So the RPM or Debian package, they should ship to that location.

116
00:20:50.430 --> 00:20:58.360
Paul Holzinger: Then we have the ETC location that is where administrators should put it to override stuff.

117
00:20:59.060 --> 00:21:03.729
Paul Holzinger: And then there's even a home location that I'm not using here, like a per user.

118
00:21:03.960 --> 00:21:05.759
Paul Holzinger: In the home gear.

119
00:21:06.960 --> 00:21:17.659
Paul Holzinger: And so if you… like, the Potman way is currently… it reach every single file in the right order, so from user to ETC to home.

120
00:21:18.110 --> 00:21:24.860
Paul Holzinger: And then it just… Reachs it and overwrites the individual files that it passed.

121
00:21:25.480 --> 00:21:35.550
Paul Holzinger: So now, the current Portman way, so in these four files that we have here, we have the maincontainers.confident user, and then we even have a drop-in.

122
00:21:36.210 --> 00:21:46.820
Paul Holzinger: Here and then the ETC one, and then the… Yeah.

123
00:21:48.550 --> 00:21:53.100
Paul Holzinger: And I even did it wrong. That happens if you just… Got shit.

124
00:21:53.750 --> 00:22:10.799
Paul Holzinger: So basically, what happens is, in the point where it reads, like, the user share one, or actually, currently, that's a bit of a lie, currently, user… the user location doesn't even read the drop-in files, but that's, an easy fix, that I'm gonna add anyway.

125
00:22:11.600 --> 00:22:18.139
Paul Holzinger: And it doesn't take away from this example, because you could still have this example of the home deal.

126
00:22:19.780 --> 00:22:22.640
Paul Holzinger: And so… the…

127
00:22:24.550 --> 00:22:32.159
Paul Holzinger: The reason I bring it up, as you can see in the result, that the config files are passed.

128
00:22:32.760 --> 00:22:37.219
Paul Holzinger: And it results in, Vastly different config.

129
00:22:38.190 --> 00:22:40.799
Paul Holzinger: Between… two approaches.

130
00:22:41.260 --> 00:22:50.130
Paul Holzinger: And it's sort of… Difficult… For me to see what… ish.

131
00:22:50.280 --> 00:22:52.180
Paul Holzinger: The better approach?

132
00:22:52.560 --> 00:22:56.299
Paul Holzinger: So, with the… with the way Portman does it, passing everything.

133
00:22:56.730 --> 00:23:01.689
Paul Holzinger: And then just adding, basically, each setting we pass, so it starts with the

134
00:23:01.840 --> 00:23:08.189
Paul Holzinger: you know, search field A, B here from the top level, and then… It checks those here.

135
00:23:08.820 --> 00:23:14.479
Paul Holzinger: And then attach these ones, and then it reached the empty file where it doesn't set anything.

136
00:23:15.240 --> 00:23:20.389
Paul Holzinger: While with the… with the URP specification.

137
00:23:21.440 --> 00:23:29.710
Paul Holzinger: It basically checks the file names, and it doesn't pass the sec file name twice.

138
00:23:30.150 --> 00:23:39.110
Paul Holzinger: So it would recognize we have a containers.conf here, an ETC, so we ignore the user location completely.

139
00:23:39.880 --> 00:23:42.599
Paul Holzinger: So it would only read this file.

140
00:23:43.250 --> 00:23:53.469
Paul Holzinger: And then, for the drop-ins, the same way, because the drop-in is named the same, so it would, like, the base name, like, it would…

141
00:23:54.300 --> 00:23:56.819
Paul Holzinger: It would look up, these names.

142
00:23:57.030 --> 00:24:06.379
Paul Holzinger: If you provide a different name, it would pass that again, regardless of user ETC, that's fine. But if they are the same name, it only passes the one with the…

143
00:24:06.600 --> 00:24:08.480
Paul Holzinger: Highest priority, basically.

144
00:24:09.520 --> 00:24:12.430
Paul Holzinger: And that comes with an advantage.

145
00:24:12.860 --> 00:24:15.770
Paul Holzinger: That you can unshed.

146
00:24:16.060 --> 00:24:17.380
Paul Holzinger: config files.

147
00:24:17.880 --> 00:24:21.300
Paul Holzinger: So, because we've provided an empty file here.

148
00:24:21.820 --> 00:24:26.429
Paul Holzinger: We effectively nullify this file here.

149
00:24:26.970 --> 00:24:28.140
Paul Holzinger: And…

150
00:24:28.630 --> 00:24:37.660
Paul Holzinger: with the Portman approach, you would need to know what the original defaults for fields C and D are, and have to set them again.

151
00:24:39.020 --> 00:24:47.510
Paul Holzinger: And that's basically the main difference, that this URP approach allows you to… easily, like.

152
00:24:48.260 --> 00:24:51.419
Paul Holzinger: Unselect or, like, ignore a certain.

153
00:24:52.080 --> 00:24:54.529
Paul Holzinger: provide a config. So if you want to have a

154
00:24:55.390 --> 00:24:58.629
Paul Holzinger: You know, like, if your RPM provides,

155
00:24:58.830 --> 00:25:07.950
Paul Holzinger: a user share location, like containers.com, for certain defaults you don't like. You want the actual Portman defaults that are compiled in the binary.

156
00:25:08.250 --> 00:25:14.540
Paul Holzinger: And you could just put an empty file here, for example, in this location, and that would work.

157
00:25:14.790 --> 00:25:16.780
Paul Holzinger: With the current way, you would…

158
00:25:17.900 --> 00:25:23.470
Paul Holzinger: Basically, either you delete the user shared location, which you don't want to do if it comes with a

159
00:25:23.950 --> 00:25:30.610
Paul Holzinger: RPM, right? It's gonna get replaced again, or maybe you cannot even do that, because that's,

160
00:25:31.250 --> 00:25:35.560
Paul Holzinger: OS tree-based system with a read-only user, right? Like, it's…

161
00:25:36.130 --> 00:25:44.009
Paul Holzinger: So the current Portman Ray, I think, has more disadvantages in that respect. So I…

162
00:25:45.220 --> 00:25:51.479
Paul Holzinger: I tend to see the… advantage of this,

163
00:25:51.820 --> 00:25:55.029
Paul Holzinger: your RPay to do this, or the system delay.

164
00:25:55.570 --> 00:26:00.180
Paul Holzinger: And… That's basically where I am right now, and just…

165
00:26:00.730 --> 00:26:05.090
Paul Holzinger: Looking for feedback from others if they have opinions.

166
00:26:08.580 --> 00:26:14.260
Kevin Clevenger: Tom, is there a raise hand here, somewhere? I'm not seeing it in Zoom.

167
00:26:14.610 --> 00:26:16.779
Kevin Clevenger: So I'm just gonna…

168
00:26:16.780 --> 00:26:21.669
Tom Sweeney (Red Hat, Inc.): It's in the React, actually. There's a… or should be, a React button embedded in there.

169
00:26:21.670 --> 00:26:22.600
Kevin Clevenger: Yeah, okay.

170
00:26:24.330 --> 00:26:34.550
Kevin Clevenger: All right, I'm just gonna jump in. I vote for the plus one for the current Podman Wave for a couple reasons.

171
00:26:34.650 --> 00:26:41.090
Kevin Clevenger: I deal with embedded partners, and changing that now would be really bad.

172
00:26:41.240 --> 00:26:50.680
Kevin Clevenger: One question is, in the current Podman way, if you set field underscore B equals… null.

173
00:26:51.170 --> 00:26:57.220
Kevin Clevenger: Will that… Will Podman actually go with that and remove that value?

174
00:27:01.860 --> 00:27:05.059
Paul Holzinger: Sorry, you mean, like, something like this?

175
00:27:05.510 --> 00:27:07.979
Kevin Clevenger: Or, or just empty, empty string.

176
00:27:08.370 --> 00:27:12.719
Paul Holzinger: Yeah, that will not work, no. Like, it will shed.

177
00:27:12.830 --> 00:27:20.109
Paul Holzinger: to the… Yeah, no, that cannot work, basically, yeah.

178
00:27:20.110 --> 00:27:24.160
Kevin Clevenger: If you just do quote, quote, or single quote, single quote.

179
00:27:24.520 --> 00:27:25.640
Kevin Clevenger: No.

180
00:27:25.640 --> 00:27:38.580
Paul Holzinger: Yeah, that would result in an empty string as the config value, then. It… like, the way the parser works, like, code-wise, it would be pretty much impossible to implement this in a reasonable way.

181
00:27:41.420 --> 00:27:52.519
Kevin Clevenger: Okay. Just curious, really. But the… the way we currently do it with drop-ins and only overriding specific things.

182
00:27:52.830 --> 00:27:57.360
Kevin Clevenger: I think it's the best way. I understand your point, but…

183
00:27:57.500 --> 00:28:03.199
Kevin Clevenger: You know, we already have many people in the field.

184
00:28:04.550 --> 00:28:10.359
Kevin Clevenger: you know, doing it a certain way, and I think it would be really disruptive to change that at this point.

185
00:28:10.930 --> 00:28:12.890
Kevin Clevenger: That's my, my two cents.

186
00:28:14.690 --> 00:28:17.990
Paul Holzinger: Yeah, like, the… That's a fair point.

187
00:28:18.680 --> 00:28:23.230
Paul Holzinger: the… The reason I bring that up, because…

188
00:28:23.380 --> 00:28:33.149
Paul Holzinger: As I mentioned earlier, one of the points is to consolidate the passing logic between our different files, such as storage.confregistry.conf.

189
00:28:33.760 --> 00:28:38.170
Paul Holzinger: And they, today, behave

190
00:28:38.480 --> 00:28:51.110
Paul Holzinger: in a way that they… like, they don't behave like the URP recommends, but they behave more similar to that, that if you have the ETC location, they would… like, they only read one file, basically.

191
00:28:51.500 --> 00:28:59.069
Paul Holzinger: So they would only read the ETC location and ignore the user share. So, for those Things, it would…

192
00:28:59.400 --> 00:29:08.329
Paul Holzinger: it gravitates more towards these, but for containers.conf, this is certainly the current partner I wrote down, so I understand your point, keeping

193
00:29:09.030 --> 00:29:16.920
Paul Holzinger: The backwards compatibility is definitely a huge… Argument, for that.

194
00:29:16.920 --> 00:29:17.550
Kevin Clevenger: Hmm.

195
00:29:21.680 --> 00:29:31.129
Kevin Clevenger: Okay, and just, you know, I deal a lot with embedded and, you know, just off the top of my head, you know, setting

196
00:29:31.250 --> 00:29:47.449
Kevin Clevenger: 12 or 15 values in Etsy Containers Containers Conf, and then on a per-installation basis, being able to drop something into Containers ConfD for, you know, two values.

197
00:29:48.580 --> 00:29:50.710
Kevin Clevenger: is… is big.

198
00:29:51.500 --> 00:29:58.520
Kevin Clevenger: Because then you're not having to put everything together and drop in a complete new file in Containers Config D.

199
00:30:01.470 --> 00:30:17.969
Paul Holzinger: No, no, no, okay, maybe I wasn't clear on the URP then, or what my example is, but, like, this will still work. So the… if they are throw-ins, those will still be added on top of these… so basically…

200
00:30:19.080 --> 00:30:21.839
Kevin Clevenger: Okay, single values, single values.

201
00:30:21.840 --> 00:30:24.260
Paul Holzinger: Yeah, yeah, yeah, yeah, like the, the fight…

202
00:30:24.260 --> 00:30:24.820
Kevin Clevenger: Okay.

203
00:30:24.820 --> 00:30:33.150
Paul Holzinger: Based on the file names, basically, let's say it that way. So, since we have twice the containers.conf, it would only consider the latest here.

204
00:30:33.690 --> 00:30:36.829
Paul Holzinger: But the drop-in is… is the second one.

205
00:30:36.990 --> 00:30:39.310
Paul Holzinger: A second name, so it would actually…

206
00:30:39.960 --> 00:30:47.280
Paul Holzinger: read that, and then add these values. Like, like, if I ignore it, like, right, if we delete this one here, the ETC one.

207
00:30:47.860 --> 00:30:52.340
Paul Holzinger: I would add these, these fields, here to the result.

208
00:30:53.010 --> 00:30:57.869
Paul Holzinger: So the… it would become, like, C7 and the D8.

209
00:30:58.650 --> 00:30:59.560
Kevin Clevenger: Okay.

210
00:30:59.560 --> 00:31:02.710
Paul Holzinger: remove that. So that definitely still works.

211
00:31:04.600 --> 00:31:05.380
Kevin Clevenger: Okay.

212
00:31:05.560 --> 00:31:07.980
Kevin Clevenger: So, it's only the empty file that will…

213
00:31:08.630 --> 00:31:22.279
Paul Holzinger: Yeah, it's… right, like, the logic is based on the… on the similar file names that… that don't get passed twice, like, on the same thing. So, if you rename that here to 2,

214
00:31:22.450 --> 00:31:25.080
Paul Holzinger: It will also behave.

215
00:31:25.080 --> 00:31:29.960
Kevin Clevenger: So, at that point, it would be… it would be additive, not…

216
00:31:29.960 --> 00:31:30.610
Paul Holzinger: Yeah.

217
00:31:30.610 --> 00:31:30.960
Kevin Clevenger: Okay.

218
00:31:30.960 --> 00:31:35.689
Paul Holzinger: Multiple drop-ins are always additive, like, with different names.

219
00:31:36.730 --> 00:31:37.850
Kevin Clevenger: Okay.

220
00:31:37.950 --> 00:31:42.360
Kevin Clevenger: Well… hmm… 6 of 1, then.

221
00:31:49.350 --> 00:31:50.650
Kevin Clevenger: Okay, thanks.

222
00:31:54.760 --> 00:32:09.720
Tom Sweeney (Red Hat, Inc.): We also have a question in the chat. Jerry's in a loud spot, he can't ask it himself. So, he was asking, is analogously, and I'm going to mess that word up terribly because I can't pronounce it, is this something similar to being done to storage.com?

223
00:32:09.990 --> 00:32:14.760
Tom Sweeney (Red Hat, Inc.): In particular, on OpenShift, there isn't a way to add override fields in storage.com.

224
00:32:16.980 --> 00:32:20.289
Paul Holzinger: Correct. So this is what we are trying to fix.

225
00:32:20.880 --> 00:32:33.300
Paul Holzinger: What… whatever I end up proposing should apply the rules for… the same way for storage.conf, for registry.conf, containers.conf.

226
00:32:33.540 --> 00:32:37.130
Paul Holzinger: So… and maybe some other config files, I'm forgetting.

227
00:32:37.770 --> 00:32:44.260
Paul Holzinger: So… with Portman 6, we will have to… like…

228
00:32:44.900 --> 00:32:56.719
Paul Holzinger: Yeah, I think, like, the drop-in behavior is pretty much, I think everybody can agree with that drop-ins are useful, so I'm pretty sure that will end up being there for storage.conf.

229
00:33:03.350 --> 00:33:03.969
Tom Sweeney (Red Hat, Inc.): Thank you.

230
00:33:11.290 --> 00:33:13.079
Tom Sweeney (Red Hat, Inc.): Right, and any other questions?

231
00:33:13.300 --> 00:33:22.130
Mohan Boddu: Yeah, quick question. Today morning, in the Podman Dev Channels, someone asked about a…

232
00:33:23.400 --> 00:33:27.529
Mohan Boddu: SECOM profile changes in the containers.com.

233
00:33:28.480 --> 00:33:31.190
Mohan Boddu: Is this related?

234
00:33:31.660 --> 00:33:36.640
Mohan Boddu: To that, or can we add that one, or is it possible to add it?

235
00:33:38.950 --> 00:33:43.240
Paul Holzinger: That's not related, really, like, like…

236
00:33:43.590 --> 00:33:46.410
Paul Holzinger: Right now, I'm just defining the…

237
00:33:47.630 --> 00:33:50.809
Paul Holzinger: Order of parsing these files and reading these files.

238
00:33:51.220 --> 00:33:57.429
Paul Holzinger: And adding these values in these files is still up to the individual.

239
00:33:57.660 --> 00:34:07.859
Paul Holzinger: fields, like, if it's a string, if it's an integer, if it's an array of strings, or whatever, like that. That's still up to the… to the format.

240
00:34:09.110 --> 00:34:15.230
Paul Holzinger: And these files are all, toggle format right now, so it follows.

241
00:34:15.810 --> 00:34:16.170
Mohan Boddu: Okay.

242
00:34:16.179 --> 00:34:20.799
Paul Holzinger: basically the TOML specification for setting individual fields.

243
00:34:22.080 --> 00:34:23.189
Mohan Boddu: Okay. Sounds good.

244
00:34:31.530 --> 00:34:33.140
Tom Sweeney (Red Hat, Inc.): Hey, any further questions?

245
00:34:41.679 --> 00:34:44.039
Tom Sweeney (Red Hat, Inc.): Paul, where can folks look for an update for this?

246
00:34:45.929 --> 00:34:49.699
Tom Sweeney (Red Hat, Inc.): Are you gonna be putting up PRs, or issues, or something to that effect?

247
00:34:50.989 --> 00:34:57.049
Paul Holzinger: I'm writing a design doc, and then I will upload this as a PR.

248
00:34:57.219 --> 00:35:00.839
Paul Holzinger: To the design docs directory we have in the repo.

249
00:35:01.249 --> 00:35:02.479
Tom Sweeney (Red Hat, Inc.): Okay. And then…

250
00:35:02.479 --> 00:35:05.019
Paul Holzinger: we can discuss, on the PR.

251
00:35:14.790 --> 00:35:16.439
Tom Sweeney (Red Hat, Inc.): It's less cold for Paul.

252
00:35:21.370 --> 00:35:24.180
Tom Sweeney (Red Hat, Inc.): Matt, did you have something you want to talk about here?

253
00:35:25.980 --> 00:35:32.650
Matthew Heon (Red Hat, Inc.): Sure, so this is just real brief. This will be our usual solicitation

254
00:35:32.650 --> 00:35:53.860
Matthew Heon (Red Hat, Inc.): for more maintainers and more contributors. We are definitely looking to expand as a project, and part of this expansion is just, getting more people to help out with the project. We would be… we're obviously glad to see PRs, but at this point, I would also love to see people stepping up to help with code review.

255
00:35:53.860 --> 00:35:58.969
Matthew Heon (Red Hat, Inc.): We're definitely looking for maintainers, in addition to the ones we have right now.

256
00:35:58.970 --> 00:36:08.330
Matthew Heon (Red Hat, Inc.): Just trying to increase the number of people doing reviews, increase the number of upstream contributions. So yeah, if anyone here has any interest in that.

257
00:36:08.330 --> 00:36:19.140
Matthew Heon (Red Hat, Inc.): please, you don't even need to reach out to us. If you want to, feel free to do it on the Matrix channel, but if you want to just start doing code reviews, start dropping PRs, that is perfectly welcome, and we would love to have you.

258
00:36:32.150 --> 00:36:37.770
Tom Sweeney (Red Hat, Inc.): I think that is all the topics that we had for today. Does anybody have anything they want to discuss themselves?

259
00:36:38.030 --> 00:36:46.999
Mohan Boddu: Yeah, just a small update, as you all know, we are part of CNCF, and a CNCF ambassador is giving a…

260
00:36:47.760 --> 00:36:57.309
Mohan Boddu: talk on Podman. It's a livestreamed event on YouTube, which is happening on, Thursday at noon Eastern time.

261
00:36:57.710 --> 00:36:59.270
Mohan Boddu: I have linked…

262
00:36:59.700 --> 00:37:06.370
Mohan Boddu: In the chat to the event details, please take a look, and if you have time, please do so attend.

263
00:37:08.330 --> 00:37:09.350
Tom Sweeney (Red Hat, Inc.): Great, thank you.

264
00:37:12.880 --> 00:37:14.859
Tom Sweeney (Red Hat, Inc.): I'll add that to the meeting notes, too.

265
00:37:24.910 --> 00:37:26.820
Tom Sweeney (Red Hat, Inc.): Any other topics or discussions?

266
00:37:27.220 --> 00:37:35.030
Tom Sweeney (Red Hat, Inc.): we want to go over. While we're thinking about that. I will go through the next community meetings and, cabal meetings. Our next cabal meeting is

267
00:37:35.160 --> 00:37:38.810
Tom Sweeney (Red Hat, Inc.): January 6, 2026, which seems hard to believe already.

268
00:37:39.190 --> 00:37:42.889
Tom Sweeney (Red Hat, Inc.): And our next community meeting will be on December 2nd.

269
00:37:43.060 --> 00:37:46.340
Tom Sweeney (Red Hat, Inc.): You know, the notes, the agenda says, otherwise all changed, so…

270
00:37:47.980 --> 00:37:55.889
Tom Sweeney (Red Hat, Inc.): Both of those will be at 11 a.m. Eastern Time, and not daylight time anymore, but standard time, as we've moved over.

271
00:37:57.850 --> 00:38:07.280
Tom Sweeney (Red Hat, Inc.): And last call. Otherwise, I will thank everybody for coming, and thank Paul, and Matt, and Moan, and others who've chatted today for their help and participation.

272
00:38:11.080 --> 00:38:13.470
Tom Sweeney (Red Hat, Inc.): I think that's it, folks. Thanks so much for coming.

273
00:38:13.470 --> 00:38:14.430
Mohan Boddu: Thank you, Al.

274
00:38:17.830 --> 00:38:22.889
Gerald Seidman (AuriStor Inc.): Thanks, bye-bye.

```
