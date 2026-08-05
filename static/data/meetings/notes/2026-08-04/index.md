# Podman Community Meeting Notes
## Aug 4, 2026 11:00 a.m. Eastern (UTC-4)

### Attendees
Tom Sweeney, Pranav Jogdand, Nalin Dahyabhai, Kartik Yadav, Pratik Patil, Miloslav Trmac, Ashley Cui, Giuseppe Scrivano, Joshua Arrevillaga, Paul Holzinger,Marek Simek, Kevin Clevenger, Jetshree Sharma, Lokesh Mandvekar, Tim Zhou, Brent Baude, Gagan U

### Meeting Notes
Video [Recording](https://youtu.be/W3cWHSrQnEQ)

Meeting start: 11:02 a.m. EDT (UTC-4)

#### Quick Recap
The Podman Community Meeting covered updates and demos related to recent Podman releases and LFX internships. Paul demonstrated improvements in port forwarding for custom networks in Podman 6.1 RC1, showing how source IP addresses are now correctly preserved. The group discussed the upcoming final release of Podman 6.1, noting it mostly included bug fixes and a few new features. Tom and Ashley provided information about the LFX internships, emphasizing that prior contributions were not required for applicants and addressing questions about the application process, design portfolios, and cover letters. Several participants, including Kartik and Pratik, asked for clarification on internship expectations and project proposals. The conversation ended with a reminder for topic submissions for the next meeting and thanks to the presenters and attendees.

#### Next Steps
  * Tom: Review the number of applications received for the LFX internships.
  * Kartik: Check the CNCF/monitoring repo issue for the broken text on the LFX portal and consider creating an issue or PR if not already done.
  * All interested applicants: Apply for the LFX internships before the closing date of August 18th.
  * All interested applicants: Prepare a design portfolio for the website UX project, including descriptions of contributions, and a cover letter outlining relevant experience and project approach.
  * All interested applicants for the automation project: Consider including some code samples or contributions (personal, school, or open-source) in the application, though it is not strictly required.
  * All attendees: Submit topics for the next Podman Community Meeting (October 6, 2026).

### Topics
#### Pasta Forwarding Demo - Paul Holzinger  ([01:29](https://www.youtube.com/watch?v=W3cWHSrQnEQ&t=89s) in the video)

Paul demonstrated new port forwarding functionality in Podman 6 and 6.1 that addresses a long-standing issue with incorrect source IP addresses in custom networks. The demonstration showed how the previous standard poster mode worked with default networks but failed with custom networks, causing remote connections to appear with incorrect IP addresses in web server logs. Paul explained that they added a new port forwarding mode in Podman 6.0 and made further improvements in 6.1, including support for IPv6 connections in dual-stack networks.

Paul demonstrated new features in Podman 6.1 RC1, which was released on Friday. He explained that final releases typically occur in the second week of August, and the next RC is planned for next week unless major issues are reported. Paul noted that this release depends on a recent version of the pasta package and mentioned that there aren't many new features in this release due to the delayed Podman 6.0 release.

#### Podman 6.1 RC1 update - Paul Holzinger, Tom Sweeney - ([08:47](https://www.youtube.com/watch?v=W3cWHSrQnEQ&t=527s) in the video)

Tom and Paul discussed the recent release, which focused mainly on bug fixes and included new features like Podman volume rename and Podman machine restart. It was released on Friday July 29, 2026.  They confirmed plans for the final release next week and the next major release, 6.2, in November. Tom also announced updates to the container tools, including new versions of Buildah (1.45) and Skopeo (1.24),

#### LFX Internships for Podman - Ashley Cui, Paul Holzinger, Tom Sweeney - ([12:39](https://www.youtube.com/watch?v=W3cWHSrQnEQ&t=759s) in the video)

Two interns for September through November of 2026, applications close in a few weeks on August 18.

 * Podman.io https://mentorship.lfx.linuxfoundation.org/project/42be74e1-704b-4b17-8b47-e38f37338414
 * CI FLakes https://mentorship.lfx.linuxfoundation.org/project/050e89d9-aec2-47ad-9113-3ba41a639d55
 
##### Application Deadlines and Requirements:
The team discussed application deadlines, with Kartik confirming the applications close on August 18th. Paul mentioned receiving many applications to review, noting that only one candidate can be selected. Kartik raised questions about the website UX project, including broken text on the LFX portal and requirements for the design portfolio and cover letter. Ashley clarified that the design portfolio should showcase separate work rather than the website itself, and should include descriptions of what was designed and contributed.

##### Project Expectations and Contributions Discussion:
The team discussed expectations for an upcoming project, with Tom suggesting that mentees should provide quick examples of their previous work, including school projects, work-related tasks, and personal projects, highlighting what they specifically contributed. Paul clarified that while pre-contribution to Podman is not required, having some previous contribution, such as open-source work or a GitHub presence, would be beneficial. 

##### Internship Application Discussion:
Kartik asked if he should include his implemented features in his cover letter, such as fixing RSS feeds and auto-detecting OS systems, and Tom advised that anything pertinent to the internship would be appropriate to include. Miloslav added that while they don't want the internship to begin before selecting a candidate, demonstrating competence is welcome. The conversation ended with Tom thanking participants and announcing the next meeting on October 6th.

The next meeting is scheduled for October 6th, with hopes to have more demonstrations ready, particularly given that version 6.1 will be finalized by then.

#### Open discussion
 1. No further topics discussed 

### Next Community Meeting: Tuesday, October 6, 2026, 11:00 a.m. EST (UTC-4)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:26 a.m.

The first 10 minutes and 51 seconds of the meeting's recording were cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

### Raw Meeting Chat:

```
00:07:52	Pranav Jogdand:	Hey sir Pranav here I am an open source contributor and a CS undergraduate and i have been contributing to cncf projects like harbor, volcanoe, TUF, kmesh and also have open issue in podmon io
00:09:36	Tom Sweeney (Red Hat LLC):	Reacted to "Hey sir Pranav here I am an open source contributor and a CS undergraduate and i have been contributing to cncf projects like harbor, volcanoe, TUF, kmesh and also have open issue in podmon io" with 👍
00:22:34	Tom Sweeney (Red Hat LLC):	https://github.com/podman-container-tools/podman/releases
00:22:57	Tom Sweeney (Red Hat LLC):	Release Announcement.^^
00:23:44	Tom Sweeney (Red Hat LLC):	* Podman.io https://mentorship.lfx.linuxfoundation.org/project/42be74e1-704b-4b17-8b47-e38f37338414
 * CI FLakes https://mentorship.lfx.linuxfoundation.org/project/050e89d9-aec2-47ad-9113-3ba41a639d55 
```

### Raw Zoom Meet Transcript

```
10
00:10:52.070 --> 00:10:58.269
Tom Sweeney (Red Hat LLC): Thanks all for… Coming to the Podman Community Meeting, today is August 4th.

11
00:10:58.620 --> 00:11:00.210
Tom Sweeney (Red Hat LLC): 2026 film.

12
00:11:00.400 --> 00:11:12.729
Tom Sweeney (Red Hat LLC): We don't have a ton of topics for today… well, I should go through the welcoming first. So we meet on the first Tuesday of even number of months. Timing might be moved to make it friendlier for folks in Asia Pacific.

13
00:11:12.940 --> 00:11:19.489
Tom Sweeney (Red Hat LLC): Topics are driven from prior meetings, or requests are made. This time, we didn't have a whole lot of topics, so it might be a shortish meeting, we'll see.

14
00:11:20.330 --> 00:11:28.629
Tom Sweeney (Red Hat LLC): Discussions are accepted for Podman, Builder, Skopeo, or any other related container projects, or any of your projects that use any of those containers, tools.

15
00:11:28.840 --> 00:11:41.069
Tom Sweeney (Red Hat LLC): And we have the meeting notes that I'll try to keep up with listed here, and they were in the meeting invite today as well. So if you see me writing down something, or if I ask you to add a link, if you could do so there, that would be great.

16
00:11:41.860 --> 00:11:46.650
Tom Sweeney (Red Hat LLC): And today we have a demo from Paul, and I didn't put that into…

17
00:11:47.010 --> 00:11:51.509
Tom Sweeney (Red Hat LLC): The agenda here very well, and that's going to be a pasta forwarding demo.

18
00:11:51.640 --> 00:11:58.030
Tom Sweeney (Red Hat LLC): And then we'll talk about what's happening with Podman 6.1RC1, And then the LFX internships.

19
00:11:58.700 --> 00:12:09.660
Tom Sweeney (Red Hat LLC): And then, if you have any open questions, we'll have a section time for that as well. And then we… and then, yeah, I'm not speaking well at all today, I'm sorry.

20
00:12:09.920 --> 00:12:17.770
Tom Sweeney (Red Hat LLC): Topics for our next meeting will be gratefully accepted at the end of the meeting, and our next meeting for that is October 6, 2026, and…

21
00:12:18.050 --> 00:12:23.250
Tom Sweeney (Red Hat LLC): Then we'll wrap up, and with that, I'm going to stop sharing and hand it over to Paul.

22
00:12:27.790 --> 00:12:31.399
Paul Holzinger: Okay, let me start sharing my screen.

23
00:12:40.580 --> 00:12:42.470
Paul Holzinger: Okay, you should see something.

24
00:12:43.250 --> 00:12:44.839
Tom Sweeney (Red Hat LLC): Yep, looks good.

25
00:12:45.500 --> 00:12:54.440
Paul Holzinger: Alright, so this was a demo about some work we wanted to do for a long time, but never really got to it around, and…

26
00:12:54.810 --> 00:12:59.400
Paul Holzinger: Now, with port.6, we finally, managed to do that.

27
00:13:00.100 --> 00:13:08.060
Paul Holzinger: And with 4.6.1, we also made some more improvements for that, so I just want to show what this is about. So this is for the…

28
00:13:08.360 --> 00:13:13.270
Paul Holzinger: Pasta forwarding. So, in short, what it actually means for you is…

29
00:13:13.670 --> 00:13:22.900
Paul Holzinger: you can keep the correct source IP, when forwarding on the rootless network. So with a custom network.

30
00:13:23.360 --> 00:13:31.210
Paul Holzinger: There's a long open issue for many years, where basically all the remote connections appear.

31
00:13:31.590 --> 00:13:35.770
Paul Holzinger: with an incorrect IP address, so if you look at web server locks, so…

32
00:13:36.890 --> 00:13:44.430
Paul Holzinger: This, previously worked only with the normal default poster mode, so let me just show you.

33
00:13:44.580 --> 00:13:50.059
Paul Holzinger: So if I start the basic NGINX, container here.

34
00:13:50.630 --> 00:14:01.519
Paul Holzinger: And then, if you connect, so I… since, obviously, if I want to connect from another system, to show you the actual IP address. So the IP address here from that system.

35
00:14:01.760 --> 00:14:11.309
Paul Holzinger: Now you see it, like, in the… 192, 168, 122, 100.

36
00:14:11.920 --> 00:14:18.759
Paul Holzinger: So now if I, make a web request… And then we do…

37
00:14:25.450 --> 00:14:27.119
Paul Holzinger: So, entry. Next.

38
00:14:28.410 --> 00:14:44.439
Paul Holzinger: And you see the correct source IP address. So this is the standard pasta, which has been integrated sometime in port.4 or something, which, worked. But one… but the thing that didn't work was when using a custom network, so let's,

39
00:14:45.820 --> 00:14:49.769
Paul Holzinger: Let's remove the container and basically…

40
00:14:49.880 --> 00:14:56.929
Paul Holzinger: And the custom networks are quite common, because you need those to allow the inter-container communication.

41
00:14:57.380 --> 00:15:00.900
Paul Holzinger: The direct one, so let's just call it Network 1.

42
00:15:01.710 --> 00:15:08.740
Paul Holzinger: And then we use the same command again, and say… And that's fair.

43
00:15:09.270 --> 00:15:17.950
Paul Holzinger: 1… So, now if I do this again… so we still get the website, client-side all fine.

44
00:15:18.870 --> 00:15:21.309
Paul Holzinger: But if you pull the locks out now…

45
00:15:21.660 --> 00:15:27.549
Paul Holzinger: You see a different IP address, which is not correct, and this is basically what the program is all about.

46
00:15:28.050 --> 00:15:32.669
Paul Holzinger: And, yeah, one other thing to show, so if I do…

47
00:15:34.120 --> 00:15:39.680
Paul Holzinger: a local IPv6 connection, so previously, that also works here fine.

48
00:15:40.720 --> 00:15:49.300
Paul Holzinger: And… So now, what we did to fix this is we added a new port forwarding mode.

49
00:15:49.540 --> 00:15:58.769
Paul Holzinger: That is currently opt-in, that is not the default, so there's one containers.conf switch. Rootersport forwarder equals pasta.

50
00:15:59.140 --> 00:16:01.650
Paul Holzinger: So you just checked that in your file.

51
00:16:04.480 --> 00:16:11.020
Paul Holzinger: And… now we do the same again, exact same Podman command, just as one config setting.

52
00:16:12.150 --> 00:16:16.009
Paul Holzinger: And if I did it right, so the client worked.

53
00:16:16.420 --> 00:16:21.320
Paul Holzinger: That's correct, locks off that container, and again, now we get the…

54
00:16:21.440 --> 00:16:24.679
Paul Holzinger: Correct source IP, which is what we want.

55
00:16:25.190 --> 00:16:27.149
Paul Holzinger: And now it's finally working.

56
00:16:27.750 --> 00:16:29.230
Paul Holzinger: And…

57
00:16:29.690 --> 00:16:39.809
Paul Holzinger: So that worked with Podman 6.0, but there were some problems. So, for example, now, there's some changes in behavior between these, port forwarding modes.

58
00:16:40.070 --> 00:16:44.780
Paul Holzinger: So if I do the IPv6 now… That will fail.

59
00:16:45.020 --> 00:16:53.279
Paul Holzinger: And that is, for a very obvious reason, if you've… Because… We inspect the network.

60
00:16:59.800 --> 00:17:03.730
Paul Holzinger: So basically, the subnets…

61
00:17:03.950 --> 00:17:16.060
Paul Holzinger: Well, we don't even have IPv6 on the network, so that shouldn't have worked to begin with, even in the old version, because the old version always truncated the IP information, or, like, basically lost it.

62
00:17:16.260 --> 00:17:22.769
Paul Holzinger: And converted that always to IPv4, that's why it worked previously, but that is not how it's supposed to work.

63
00:17:23.890 --> 00:17:28.480
Paul Holzinger: And so the new version does it right, so what that means is…

64
00:17:28.730 --> 00:17:32.000
Paul Holzinger: Okay, move the container again, we can create…

65
00:17:32.540 --> 00:17:41.309
Paul Holzinger: A network, a dual-stack network… So, IP… we have IPv6.

66
00:17:41.640 --> 00:17:44.709
Paul Holzinger: I, let's just call it, V6.

67
00:17:46.690 --> 00:17:53.099
Paul Holzinger: And then, again, let's start the container with the other network, with the tool stack.

68
00:17:53.460 --> 00:17:58.480
Paul Holzinger: So now, from this VM, I only have IPv4 connection here, but… so this still works.

69
00:17:58.930 --> 00:18:04.770
Paul Holzinger: And now if I use this, it also works, because I enabled IPv6 on the network.

70
00:18:05.670 --> 00:18:12.279
Paul Holzinger: And this specifically here is, new with, podman 6.1.

71
00:18:13.510 --> 00:18:18.699
Paul Holzinger: And let's just check the locks to be sure that we are not doing anything, wrong.

72
00:18:19.840 --> 00:18:24.350
Paul Holzinger: So this, iPv4 remote is there.

73
00:18:24.690 --> 00:18:29.850
Paul Holzinger: And the IPv6 remote address right now is, set to,

74
00:18:30.890 --> 00:18:33.870
Paul Holzinger: Hard-coded one, if you connect from the host, because…

75
00:18:33.980 --> 00:18:42.400
Paul Holzinger: One thing to keep in mind is that local host on the host is different than local host in the machine, so, like, obviously, if you…

76
00:18:42.510 --> 00:18:50.239
Paul Holzinger: connect from the host into the container. It cannot show you that that connection as local host, because localhost and the container are something different.

77
00:18:51.150 --> 00:18:52.470
Paul Holzinger: And…

78
00:18:53.110 --> 00:19:05.049
Paul Holzinger: But if you… I don't have an IPv6 connection here right now to show that if I would use an external, like, public IPv6 connection, it would show the actual right IP address, so that also works.

79
00:19:05.910 --> 00:19:10.130
Paul Holzinger: And this is basically… All of this is about.

80
00:19:10.920 --> 00:19:16.189
Paul Holzinger: Yeah, a bit of an unscripted demo. I think I showed everything I wanted to show.

81
00:19:17.700 --> 00:19:24.799
Tom Sweeney (Red Hat LLC): Considering that I bent around, like, 6 minutes ago, Paul, I think it was a great demo. Thank you for jumping in and hopping in and showing us that.

82
00:19:24.930 --> 00:19:28.040
Tom Sweeney (Red Hat LLC): Does anybody have any questions for Paul about this?

83
00:19:35.590 --> 00:19:37.260
Tom Sweeney (Red Hat LLC): Okay, not hearing a whole bunch.

84
00:19:37.550 --> 00:19:46.880
Tom Sweeney (Red Hat LLC): Paul, I'm gonna put you under the… throw you under the bus a little bit, again, right here. We're talking about, Podman 6.1, we just released RC1.

85
00:19:47.100 --> 00:19:57.469
Tom Sweeney (Red Hat LLC): And normally, Matt would be talking about this, and do you have any more details about when the next RC is coming out, when we're planning to do the final release, and what new goodies might be in there besides this?

86
00:20:00.420 --> 00:20:08.159
Paul Holzinger: Sure. So, we released Podman 6.1 RC1 on Friday, I believe.

87
00:20:08.420 --> 00:20:09.080
Tom Sweeney (Red Hat LLC): Yes.

88
00:20:09.080 --> 00:20:10.270
Paul Holzinger: And…

89
00:20:10.530 --> 00:20:19.559
Paul Holzinger: So the RC ones that we are doing, we are doing them a couple of weeks before our final release date, which is usually second week.

90
00:20:19.900 --> 00:20:22.529
Paul Holzinger: of August, or, like, every 3 months, it's…

91
00:20:23.610 --> 00:20:30.500
Paul Holzinger: And… this time we were a bit slow, because we were rating for the work I was just demoing. That took some…

92
00:20:31.250 --> 00:20:37.299
Paul Holzinger: time to lend, oh, one thing I should note there, this is also dependent on the…

93
00:20:37.500 --> 00:20:41.839
Paul Holzinger: Pasta package, so you need a recent version of that as well, and…

94
00:20:42.060 --> 00:20:44.650
Paul Holzinger: Such we all needed to align that.

95
00:20:45.880 --> 00:20:47.050
Paul Holzinger: You're mister.

96
00:20:47.540 --> 00:20:52.120
Paul Holzinger: we missed one week, or… the RC is one week late, basically, and…

97
00:20:52.490 --> 00:21:00.609
Paul Holzinger: No, we are just aiming for the final next week, unless somebody reports major issues, it's basically the exact same.

98
00:21:01.210 --> 00:21:03.350
Paul Holzinger: content as RC1.

99
00:21:03.920 --> 00:21:08.839
Paul Holzinger: And… Yeah, I guess that should happen sometime,

100
00:21:09.320 --> 00:21:16.059
Paul Holzinger: next week there. As for features, the one I demoed, of course, I think…

101
00:21:16.310 --> 00:21:19.919
Paul Holzinger: Besides the rest, I haven't really looked at closely, it's not…

102
00:21:20.470 --> 00:21:28.719
Paul Holzinger: Not a lot this time around, because the Podman 6.0 release was quite… Quite late.

103
00:21:28.960 --> 00:21:32.869
Paul Holzinger: Compared to the… so we didn't have the full 3 months we usually do.

104
00:21:34.010 --> 00:21:38.649
Tom Sweeney (Red Hat LLC): I think it was mostly bug fixes this time around, and not a big chunk of them at that.

105
00:21:39.810 --> 00:21:51.580
Paul Holzinger: Yeah, there's always… every release comes with a huge set of bug fixes, more or less, or, like, the minor releases anyway. The patch releases are, of course, a lot smaller.

106
00:21:54.120 --> 00:21:58.529
Tom Sweeney (Red Hat LLC): just looking We did, Podman… Podman volume rename.

107
00:21:58.850 --> 00:22:00.940
Tom Sweeney (Red Hat LLC): And Podman machine restart have been added.

108
00:22:01.280 --> 00:22:03.750
Tom Sweeney (Red Hat LLC): Some manifest push work as well.

109
00:22:04.040 --> 00:22:08.069
Tom Sweeney (Red Hat LLC): And some QuadLit, units now supported new key image volumes.

110
00:22:08.910 --> 00:22:14.580
Tom Sweeney (Red Hat LLC): Podman GenerateQ now includes support for generating container health checks.

111
00:22:16.140 --> 00:22:20.079
Tom Sweeney (Red Hat LLC): So a few, few nuggets in there, less than normal bugs. Throw the,

112
00:22:20.310 --> 00:22:23.000
Tom Sweeney (Red Hat LLC): release announcement note, I can find the chat.

113
00:22:25.760 --> 00:22:30.340
Paul Holzinger: Yeah, so, I guess, final release next week.

114
00:22:30.980 --> 00:22:34.340
Paul Holzinger: And then we are working towards,

115
00:22:34.460 --> 00:22:40.900
Paul Holzinger: The normal schedule, hopefully, which means, 6.2 in… Malemba, I believe.

116
00:22:43.280 --> 00:22:46.080
Tom Sweeney (Red Hat LLC): Yeah, that's the plans, as far as I know it, right now.

117
00:22:48.500 --> 00:22:49.870
Tom Sweeney (Red Hat LLC): Okay, thank you.

118
00:22:50.510 --> 00:22:52.269
Tom Sweeney (Red Hat LLC): Any questions on any of this?

119
00:22:57.660 --> 00:23:09.779
Tom Sweeney (Red Hat LLC): And then, also going along with it, we also have, new Buildah and new Skopeo, so Buildah is now at 145, 1.45, and Skopeo's now at 1.24, and there are a lot of changes to the storage image.

120
00:23:09.870 --> 00:23:18.229
Tom Sweeney (Red Hat LLC): and common libraries that all three of those depend upon, Podman Builder and Skopeo, so they all went out in tandem for this August release.

121
00:23:19.280 --> 00:23:22.019
Tom Sweeney (Red Hat LLC): I think that's about it for there. Any other questions?

122
00:23:27.020 --> 00:23:33.939
Tom Sweeney (Red Hat LLC): Great, so the last thing I had on the agenda for today was the LFX internships, which we've gone ahead and posted.

123
00:23:34.260 --> 00:23:36.100
Tom Sweeney (Red Hat LLC): Out on the,

124
00:23:36.920 --> 00:23:41.799
Tom Sweeney (Red Hat LLC): website at LFX. If you're interested in more information, I'll post it in the chat. It's also

125
00:23:42.330 --> 00:23:53.080
Tom Sweeney (Red Hat LLC): a variety of other places as well. I know that we've had a lot of interest and a lot of submissions already, and thanks for those, for both the Podman I.O. and also the CI flakes. I think,

126
00:23:53.290 --> 00:24:11.439
Tom Sweeney (Red Hat LLC): for those who have submitted and not getting a response very quickly, we're hoping that you can give us a little time, because it's been overwhelming, to say the least, for the number of fixed… number of PRs that are coming in, and at least for the Podman.io, which Ashley is leaning on. We generally get a couple of PRs every two months, and

127
00:24:11.440 --> 00:24:17.080
Tom Sweeney (Red Hat LLC): You know, coming in after a weekend and finding 20-something was a little… Intimidating, I would say.

128
00:24:17.960 --> 00:24:21.730
Tom Sweeney (Red Hat LLC): Ashley or Paul or anybody else, do you have any further things to add about that?

129
00:24:25.810 --> 00:24:27.469
Ashley Cui (Red Hat LLC): Yeah,

130
00:24:28.330 --> 00:24:52.470
Ashley Cui (Red Hat LLC): your… I think both the applications are open, please apply on the LFX website. Note that, like, while we do welcome contributions, and we like seeing contributions, it is not a pre-requirement, so if you're panicking about getting something in before applying, you don't need to. We mostly look at your application, and while it's great to contribute,

131
00:24:52.470 --> 00:24:57.469
Ashley Cui (Red Hat LLC): It's not the main focus of, How we select candidates.

132
00:25:02.790 --> 00:25:10.930
Tom Sweeney (Red Hat LLC): Yep, and so as far as I recall, I don't recall the date, actually. Is it August 29th? Or is it a little sooner that the closing for the applications is happening?

133
00:25:10.930 --> 00:25:16.480
Ashley Cui (Red Hat LLC): I don't remember off the top of my head, but I think you have a few weeks.

134
00:25:16.840 --> 00:25:17.620
Paul Holzinger: It's…

135
00:25:17.620 --> 00:25:19.140
Kartik Yadav: It is on 18.

136
00:25:19.740 --> 00:25:21.250
Tom Sweeney (Red Hat LLC): 18th? Okay.

137
00:25:22.110 --> 00:25:23.010
Tom Sweeney (Red Hat LLC): Thank you.

138
00:25:28.220 --> 00:25:31.769
Tom Sweeney (Red Hat LLC): Okay, any questions or comments about that? Oh, go ahead, Paul.

139
00:25:32.120 --> 00:25:36.340
Paul Holzinger: Yeah, have you looked at the application count, Tom, on yours?

140
00:25:38.870 --> 00:25:41.560
Paul Holzinger: We, we got a lot, so we're gonna…

141
00:25:41.830 --> 00:25:43.789
Paul Holzinger: Have a lot to choose from.

142
00:25:43.790 --> 00:25:45.159
Tom Sweeney (Red Hat LLC): Oh, okay.

143
00:25:46.880 --> 00:25:49.140
Tom Sweeney (Red Hat LLC): Now, I will have to go ahead and do that, then.

144
00:25:49.910 --> 00:25:55.909
Paul Holzinger: Yeah, and I mean, sorry in advance, but in the end, it can only be won. Yeah.

145
00:25:56.120 --> 00:26:00.260
Paul Holzinger: I know there will be many good applications,

146
00:26:03.130 --> 00:26:11.620
Tom Sweeney (Red Hat LLC): Yeah, I've honestly been very surprised and very happy to see all the applications that we have gotten so far, and then also the PR submissions as well.

147
00:26:17.670 --> 00:26:19.960
Tom Sweeney (Red Hat LLC): Any other questions or comments on that?

148
00:26:24.460 --> 00:26:28.620
Kartik Yadav: I actually do have some questions, if I'm…

149
00:26:28.910 --> 00:26:29.360
Tom Sweeney (Red Hat LLC): Sure.

150
00:26:29.360 --> 00:26:30.759
Kartik Yadav: I'm allowed to speak.

151
00:26:31.260 --> 00:26:34.960
Kartik Yadav: It is regarding the website UX project.

152
00:26:35.430 --> 00:26:45.150
Kartik Yadav: So, I was recently checking on the LFX portal, and I found that some of the text is broken on the portal.

153
00:26:45.400 --> 00:26:46.800
Kartik Yadav: I mean, for the project.

154
00:26:47.150 --> 00:26:49.009
Kartik Yadav: So maybe you can look into that.

155
00:26:49.930 --> 00:26:52.610
Tom Sweeney (Red Hat LLC): Did you create an issue or a PR?

156
00:26:52.980 --> 00:27:00.629
Kartik Yadav: No, I mean, I fomented it under the NCNCF slash monitoring repo within the issue.

157
00:27:00.930 --> 00:27:04.919
Kartik Yadav: So yeah, you might check, I mean…

158
00:27:06.320 --> 00:27:09.740
Kartik Yadav: Also, I had one more question, like…

159
00:27:09.800 --> 00:27:28.799
Kartik Yadav: in the design portfolio, you… you are asking for means, do I have to paste just these screenshots, or do I also have to explain exactly, like, where I contributed within the design? And also, is it… should it be related to the projects which I have

160
00:27:28.800 --> 00:27:36.409
Kartik Yadav: contributed to some other company on, like, my pet projects. And regarding the cover letter, I wanted to ask that

161
00:27:36.410 --> 00:27:51.229
Kartik Yadav: means it is… is it advisable? Should I… it means add a working plan on how I plan to complete the project? I mean, I hope it doesn't count it… count something as something negative, right? Because

162
00:27:51.260 --> 00:27:53.949
Kartik Yadav: I might add something, and you might…

163
00:27:54.440 --> 00:27:59.809
Kartik Yadav: think that it's too much or something, so I wanted to ask all these questions.

164
00:28:01.650 --> 00:28:04.269
Tom Sweeney (Red Hat LLC): Ashley, have you thought through this yet?

165
00:28:04.940 --> 00:28:29.360
Ashley Cui (Red Hat LLC): I haven't thought much about the cover letter yet, but I know for the design portfolio, it doesn't have to do with any… like, you don't have to talk about, our website at all, like, I actually would prefer it if it's something that you design separate from the website, just, like, if it's just screenshots, great, if you could, describe, what exactly you did, what parts you touched, and, what

166
00:28:29.360 --> 00:28:50.009
Ashley Cui (Red Hat LLC): parts you design, like, just a sentence or two saying, like, I designed this part, that would be great too. It could be, you know, from previous projects, it could be from school, it could be from anything. And, I think the biggest focus is that you've designed it, not just… you don't have to have implemented it. I think our focus here is, seeing, like.

167
00:28:50.270 --> 00:28:52.320
Ashley Cui (Red Hat LLC): How you approach, design.

168
00:28:52.520 --> 00:28:56.150
Ashley Cui (Red Hat LLC): As for a cover letter, I am not…

169
00:28:56.500 --> 00:29:04.040
Ashley Cui (Red Hat LLC): entirely sure what we're looking for. I haven't thought about it yet, but Tom, if you have anything that you want to see out of it…

170
00:29:04.550 --> 00:29:23.339
Tom Sweeney (Red Hat LLC): Yeah, I think a lot of just, you know, real quick bursts of what you've done, where it's been done, you know, and again, doesn't matter if it's school projects, or work-related, or just, you know, fun and games, if you will, and what parts of it you, as Ashley was saying, as well, what parts you specifically added, and what

171
00:29:23.340 --> 00:29:25.740
Tom Sweeney (Red Hat LLC): things you did for it, and I think that'd be great.

172
00:29:29.560 --> 00:29:32.770
Tom Sweeney (Red Hat LLC): I hope we answered your question. It went on for a little bit, if not, you know…

173
00:29:33.080 --> 00:29:33.879
Tom Sweeney (Red Hat LLC): Put us again.

174
00:29:33.880 --> 00:29:36.130
Kartik Yadav: Yeah, thank you.

175
00:29:36.790 --> 00:29:37.330
Tom Sweeney (Red Hat LLC): Okay.

176
00:29:38.140 --> 00:29:40.199
Tom Sweeney (Red Hat LLC): Any other questions, comments on this?

177
00:29:40.400 --> 00:29:41.700
Tom Sweeney (Red Hat LLC): On my internship.

178
00:29:42.710 --> 00:29:45.749
Tom Sweeney (Red Hat LLC): We're excited to have some new folks come in and contribute with us.

179
00:29:49.630 --> 00:30:00.580
Tom Sweeney (Red Hat LLC): All right, given that, I will close that topic out, and we'll move on to the open forum questions, which is comments or questions for anything. Does anybody have any open topics or questions they'd like to ask?

180
00:30:04.610 --> 00:30:07.040
Tom Sweeney (Red Hat LLC): And now we're thinking about that, I'll just…

181
00:30:07.170 --> 00:30:14.279
Tom Sweeney (Red Hat LLC): also put in a plug for topics… Oh, yep, I'm not sure who said something, but go ahead.

182
00:30:14.280 --> 00:30:17.959
Pratik Patil: Oh, yes, I also headed out.

183
00:30:18.570 --> 00:30:19.870
Pratik Patil: Captain Arun?

184
00:30:20.690 --> 00:30:21.520
Tom Sweeney (Red Hat LLC): Sure.

185
00:30:22.090 --> 00:30:25.310
Pratik Patil: It was about the second project.

186
00:30:25.770 --> 00:30:34.090
Pratik Patil: It was about… Making automation regarding Yeah, lots… Family?

187
00:30:34.300 --> 00:30:37.330
Pratik Patil: So, I had this same doubt.

188
00:30:37.800 --> 00:30:42.920
Pratik Patil: Like, do I need to pre-contribute In the report.

189
00:30:43.250 --> 00:30:48.959
Pratik Patil: Or should I just focus on implementation and the proposal part?

190
00:30:51.100 --> 00:30:58.960
Pratik Patil: Like, what are the expectations of you as a mentor? Like, what would you like to see?

191
00:31:00.840 --> 00:31:06.270
Paul Holzinger: You don't need to have a contribution, and Podman. I…

192
00:31:07.050 --> 00:31:15.429
Paul Holzinger: Personally, I think it would be good if you have some contribution to show that can also be a personal project, just some, like, some…

193
00:31:15.820 --> 00:31:22.599
Paul Holzinger: open source repositories, or something, or, like, a school project, or I don't know, some code, I guess.

194
00:31:22.900 --> 00:31:28.409
Paul Holzinger: Can be anything, just something small, it's fine.

195
00:31:28.560 --> 00:31:39.519
Paul Holzinger: If you have contributed some Podman PRs, that's… that's also fine. If you, like, if you have your GitHub name in the… in your resume, then I can… can look at that.

196
00:31:40.100 --> 00:31:53.530
Paul Holzinger: And, yeah, besides, some… Some implementation ideas or, designs for the… For the project,

197
00:31:53.720 --> 00:31:57.270
Paul Holzinger: That… that could help too, but that's… it's not required.

198
00:32:04.690 --> 00:32:05.480
Pratik Patil: Okay.

199
00:32:06.050 --> 00:32:07.580
Pratik Patil: Thank you, thank you both.

200
00:32:08.970 --> 00:32:12.239
Tom Sweeney (Red Hat LLC): And Paul, you're one of the mentees for that section, correct?

201
00:32:14.020 --> 00:32:16.049
Tom Sweeney (Red Hat LLC): Yes. For the mentor, brother.

202
00:32:16.470 --> 00:32:18.669
Tom Sweeney (Red Hat LLC): Help Roll reverse there.

203
00:32:18.810 --> 00:32:29.119
Tom Sweeney (Red Hat LLC): Okay, great. So, just going forward a little bit, if you have topics for the next meeting, let me know at any point in time. If you have something you want to throw out now, great. And if…

204
00:32:29.280 --> 00:32:36.360
Tom Sweeney (Red Hat LLC): Our next meeting, again, will be on October 6th. Hope to have a few more things to demo, especially now that 6-1 will be finalized by then.

205
00:32:36.820 --> 00:32:41.749
Tom Sweeney (Red Hat LLC): And one last call for any questions or comments. Otherwise, I think we will close this up.

206
00:32:43.020 --> 00:32:45.399
Kartik Yadav: Actually, I had one more doubt.

207
00:32:45.470 --> 00:33:03.590
Kartik Yadav: Sure. I hope I'm not consuming your time. So, I wanted to ask that I'm, means I… what I'm doing is I have created a means of feature branch, and whatever I think would be good for the project submission, like, is to effectively demonstrate, like, how

208
00:33:03.650 --> 00:33:17.760
Kartik Yadav: I can… I will implement the project. For example, I have fixed some of the things in that branch, like fixing RSS feeds, and also, like, you mentioned, like, how to auto-detect the OS system so that user can directly download it.

209
00:33:17.760 --> 00:33:25.209
Kartik Yadav: So I have implemented it in my branch, so is it advisable to add that within my cover letter?

210
00:33:25.460 --> 00:33:30.649
Kartik Yadav: I mean, I hope that it wouldn't count as something, like, it would…

211
00:33:30.990 --> 00:33:35.410
Kartik Yadav: effectively downgrade my husband's proposal, I mean, we're saving.

212
00:33:35.770 --> 00:33:43.129
Tom Sweeney (Red Hat LLC): Yeah, I think anything that you feel is pertinent to the internship would be great in your cover letter and or resume.

213
00:33:44.840 --> 00:33:45.270
Kartik Yadav: Thank you.

214
00:33:45.430 --> 00:33:46.669
Tom Sweeney (Red Hat LLC): Something to chew on?

215
00:33:47.180 --> 00:33:48.849
Tom Sweeney (Red Hat LLC): Sounds all very reasonable to me.

216
00:33:50.570 --> 00:33:58.049
Miloslav Trmac (Red Hat LLC): I think maybe one way to think about this is that we don't want the internship to happen before actually selecting a candidate.

217
00:33:58.230 --> 00:34:04.030
Miloslav Trmac (Red Hat LLC): We don't have… want to have 20 submissions instead of an internship.

218
00:34:04.250 --> 00:34:08.139
Miloslav Trmac (Red Hat LLC): But, obviously, anything that shows your competence is always well.

219
00:34:09.600 --> 00:34:11.259
Tom Sweeney (Red Hat LLC): Excellent point, Miloslav.

220
00:34:15.909 --> 00:34:28.580
Tom Sweeney (Red Hat LLC): Right, I'm not hearing a whole lot of other topics or anything, so with that, I'm going to thank Paul once again for letting me twist his arm, and Ashley for putting her on the spot as well during the meeting today, and for everybody who's been here and contributing.

221
00:34:28.699 --> 00:34:34.569
Tom Sweeney (Red Hat LLC): We hope to see many of you here again on October 6th, in just a couple months.

222
00:34:34.750 --> 00:34:36.900
Tom Sweeney (Red Hat LLC): Y'all have a great day now. Thank you.
```
