# Podman Community Meeting Notes
## December 2, 2025 11:00 a.m. Eastern (UTC-5)

### Attendees
Tom Sweeney, Tim Zhou, Mark Russell, Matt Heon, Nalin Dahyabhai, Mario Loriedo, Fatih, Ashley Cui, Paul Holzinger, Kevin Clevenger, Jan Rodak, Dave Darrah, Gerry Seidman, Lokesh Mandvekar.

### Topics

  1) Podman in 2025 Retrospective - Matt Heon
  2) [Immutable Github releases](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/immutable-releases) - Paul Holzinger
  3) [Materia](https://github.com/stryan/materia) - Steve Ryan
  4) Introducing UML Students - Mohan
  5) CNCF Updates
    1) Incubation application(not submitted yet)https://github.com/containers/podman/issues/25594
    2) Kubecon EU. Booth, Maintainer Summit, Project Kiosk

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=6s)

Meeting start: 11:03 a.m. EDT (UTC-5)

#### Quick Recap
The meeting began with technical difficulties as Steve encountered issues sharing his Google Slides presentation on Zoom, which was eventually resolved by Matt taking over the introduction. The team discussed various topics including Podman's progress in 2025, GitHub's new Immutable Releases feature, and a demonstration of Materia, a GitOps tool for managing container hosts. The conversation ended with updates on CNCF's journey and upcoming events, along with introductions of new UMass Lowell students working on Podman and discussions about maintaining the Podlet repository.

#### Next Steps
 * Steve: Continue working on resolving Zoom screen sharing issue and, if possible, send Tom a link to the presentation for potential workarounds.
 * Brent: Work with Martin offline to arrange for Martin to receive authority/help with the Podlet GitHub repo, including potentially adding him as a maintainer or helper, and copy Paul Holzinger into communications for coordination.
 * Martin: Coordinate with Brent (and optionally Paul Holzinger) on Discord to be added as a maintainer/helper for the Podlet repository and to discuss recruiting additional maintainers.
 * Neil: Review and finalize the CNCF incubation application with community input before submission, including completing outstanding steps such as user verification.
 * All interested: Review the CNCF incubation application (link in agenda) and provide any comments or feedback to Neil before submission.
 * All interested: Volunteer to help at the QCon EU booth or submit talks for KubeCon EU/Maintainer Summit tracks as announced by Neil.

#### Podman in 2025 Retrospective - Matt Heon - ([00:35](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=35s) in the video)

Matthew reported on a successful 2025, highlighting four releases and the migration of Podman, Build, and Scopia to the CNCF sandbox. He mentioned upcoming plans for more conference attendance and the expected release of Podman 6.0 in spring next year. Matthew also informed the group of an upcoming release with bug fixes and feature updates expected next week. Paul discussed GitHub's new feature, Immutable Releases, expressing concerns about the potential risks of unauthorized modifications to release artifacts.

#### [Immutable Github releases](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/immutable-releases) - Paul Holziner - ([03:03](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=183s) in the video)

The team discussed implementing release immutability for Container SC Linux, with Lokesh having already set it up but noting concerns about permission settings. Ashley and Lokesh explored the possibility of incorporating pre-release checks for installer verification, though Ashley noted some limitations with the current GitHub documentation. Steve Ryan then presented Materia, a GitOps tool for orchestrating Quallists, which handles the entire lifecycle of components and includes features like templating, variable interpolation, and service management.

#### [Materia](https://github.com/stryan/materia) - Steve Ryan - ([08:48](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=528s) in the video)

[Slides](./2025_Dec_PCM_Materia_Presentation.pdf)
Steve demonstrated a demo repository for Materia, a tool for managing Podman containers and data files. He explained the structure of the repository, including the materia manifest, components, and templates. Steve also discussed the motivation behind choosing Materia over other similar projects like Orcus and Fetchit, citing its comprehensive approach to managing both quadlets and data files. The demo was briefly interrupted due to technical issues, but Steve assured the audience that it would continue shortly.

Steve demonstrated Materia, a tool for managing container hosts, showcasing its ability to clone repositories, generate installation plans, and update hosts with components. He explained its configuration through environment variables and its support for templates. 

#### Introducing UML Students - Mohan Boddu - ([31:41](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=1901s) in the video)
Jesse and Andrew were introduced as UMass Lowell students working on Podman as part of their capstone project, focusing on RFEs and bug fixes.

#### CNCF Updates - Neil Smith - ([34:56](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=2096s) in the video)
Neil provided updates on the CNCF journey, mentioning the application for incubation and upcoming events like QCon EU. 


#### Open discussion - ([38:00](https://www.youtube.com/watch?v=HP7-5kxZ6QQ&t=2280s) in the video)
1. Podlet project maintainership

Martin raised concerns about the Podlet repository's lack of a maintainer, and Brent discussed potential help and the risks involved in becoming a maintainer. 

### Next Cabal Meeting: Tuesday, January 6, 2026, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1. None Discussed.

### Next Community Meeting: Tuesday,  February 3, 2026, 11:00 a.m. EST (UTC-5)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:46 a.m.

The first 7 minutes and 36 seconds of the meeting's recording were cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

 ### Raw Meeting Chat:

```    
00:02:38	Laura Santamaria (Red Hat; she/her):	Tom, if you're talking, you're muted
00:05:59	Tom Sweeney (Red Hat, Inc.):	Agenda: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
00:07:08	Laura Santamaria (Red Hat; she/her):	It may be that you're signed into your LFX account
00:07:09	Mark Russell (Red Hat, Inc.):	If using full client, try web version (or vice versa)
00:07:24	Laura Santamaria (Red Hat; she/her):	if you're not on an LFX account with access, you might not be able to share screens
00:07:47	Steve Ryan:	Sure I'll share the slides link here
00:08:21	Steve Ryan:	https://docs.google.com/presentation/d/1LR7bY506bBEjuieD3zRrjU4YNww42P-WnQDssCttdAM/edit?usp=sharing
00:10:03	Tom Sweeney (Red Hat, Inc.):	Steve I'm able to get those slides up, I'll share, fingers crossed
00:10:22	Tom Sweeney (Red Hat, Inc.):	I'll include them in the meeting notes too if that's OK with you.
00:10:33	Steve Ryan:	Reacted to "I'll include them ..." with 👍
00:12:30	Steve Ryan:	Going to log out and log back in under X11 since that might be the issue, brb
00:15:01	Tom Sweeney (Red Hat, Inc.):	Had to go for the headphones, my wife is making Christmas cookies and the mixer is very loud.
00:15:45	Laura Santamaria (Red Hat; she/her):	Hey Reinhard, can you mute?
00:15:57	Laura Santamaria (Red Hat; she/her):	Thank you!
00:16:00	Reinhard Tartler:	apologies, I thought I already was
00:16:10	Laura Santamaria (Red Hat; she/her):	no worries :)
00:20:12	Mark Russell (Red Hat, Inc.):	that's a great line, thank you
00:26:27	Tom Sweeney (Red Hat, Inc.):	The notes will have a link to the slides fwiw.  I'll see if I can add them to the YouTube video also.
00:44:45	Tom Sweeney (Red Hat, Inc.):	Amsterdam March 23
00:46:33	Tom Sweeney (Red Hat, Inc.):	https://github.com/containers/podlet 
```

### Raw Zoom Meet Transcript

```
WEBVTT

1
00:01:46.090 --> 00:01:47.479
Paul Holzinger: You're on mute, Tom.

2
00:02:36.660 --> 00:02:38.530
Nalin Dahyabhai (Red Hat): Tom, Zoom is showing you is muted.

3
00:02:39.910 --> 00:02:42.639
Tom Sweeney (Red Hat, Inc.): I'm sorry. Does anybody know Steve Ryan?

4
00:02:45.870 --> 00:02:47.439
Steve Ryan: Hi, I'm here.

5
00:02:47.740 --> 00:02:50.690
Tom Sweeney (Red Hat, Inc.): Oh, okay. Well, sorry, Steve, missed you entirely.

6
00:02:51.050 --> 00:02:54.130
Tom Sweeney (Red Hat, Inc.): No problem. Do you want to try presenting, just to see if it works okay for you?

7
00:02:55.320 --> 00:02:58.390
Steve Ryan: Yeah, let me… Give it a shot.

8
00:02:58.390 --> 00:02:59.539
Tom Sweeney (Red Hat, Inc.): Are you sharing something?

9
00:03:20.350 --> 00:03:21.540
Steve Ryan: Hmm.

10
00:03:26.170 --> 00:03:30.380
Steve Ryan: I mean, I'm clicking the… clicking the share button, it doesn't seem to be doing anything.

11
00:03:34.620 --> 00:03:39.590
Tom Sweeney (Red Hat, Inc.): Relatively new to Zoom. It's not popping up a separate window for you?

12
00:03:41.450 --> 00:03:46.929
Steve Ryan: Yeah, I'm not… yeah, usually I get a whaling window somewhere, asking what I want to share, but…

13
00:03:48.440 --> 00:03:50.620
Tom Sweeney (Red Hat, Inc.): Maybe hop out and hop back in?

14
00:03:52.440 --> 00:03:53.679
Steve Ryan: Sure, let me give that a shot.

15
00:03:59.370 --> 00:04:00.090
Kevin Clevenger: immediately.

16
00:04:36.960 --> 00:04:40.540
Tom Sweeney (Red Hat, Inc.): Ellen, would you mind, pinging Matt and Mohan, please?

17
00:04:41.700 --> 00:04:42.470
Nalin Dahyabhai (Red Hat): True thing.

18
00:04:42.790 --> 00:04:43.410
Tom Sweeney (Red Hat, Inc.): Thank you.

19
00:04:56.750 --> 00:04:59.009
Tom Sweeney (Red Hat, Inc.): Looks like a… whoopsie, there you are.

20
00:04:59.790 --> 00:05:01.090
Tom Sweeney (Red Hat, Inc.): Any better luck now?

21
00:07:27.390 --> 00:07:43.610
Tom Sweeney (Red Hat, Inc.): Yeah, it's okay. Well, we were having fun with Steve, and he hasn't been able to resolve it, so Steve, keep working on that. If you can send me a link, perhaps I can work through your presentation while you're going on, and in the meantime, I'll start the meeting up officially, welcome everybody to the Podman Community meeting today. It's December 2nd.

52
00:07:43.750 --> 00:07:45.240
Tom Sweeney (Red Hat, Inc.): of 2025.

53
00:07:45.430 --> 00:07:51.890
Tom Sweeney (Red Hat, Inc.): And we have a number of topics for today. First one is Podman in 2025, respectively. Matt will be talking about that shortly.

54
00:07:52.200 --> 00:07:55.590
Tom Sweeney (Red Hat, Inc.): And then Paul will be talking about immutable GitHub releases.

55
00:07:55.800 --> 00:08:01.730
Tom Sweeney (Red Hat, Inc.): And then Steve will, with fingers crossed, will be keeping… doing a Materia demo for us.

56
00:08:02.110 --> 00:08:10.910
Tom Sweeney (Red Hat, Inc.): And then Mohan will be introducing some UML students, so I'm looking forward to that. And then I think, Neil, you're throwing in some CNCF updates?

57
00:08:11.310 --> 00:08:14.930
Tom Sweeney (Red Hat, Inc.): talk about that when we get there, and with that, I'm going to hand it over to Matt.

58
00:08:17.050 --> 00:08:38.630
Matthew Heon (Red Hat, Inc.): Sure, so I don't really have any slides or anything here, this will be very impromptu, but I just want to say, I think that we've had a very good 2025. We had 4 releases across 2025. This was the first full year where we followed our release paradigm of one per quarter, once every, second week of, I believe, the second month of the quarter.

59
00:08:38.630 --> 00:09:02.360
Matthew Heon (Red Hat, Inc.): And we managed to hit all of those, so great job there, everyone. On the whole, we've been doing pretty well. Podman, as well as Build and Scopio, migrated into the CNCF sandbox at the beginning of the year, and since then, we've started steadily working towards getting into incubation, so hopefully some news on that soon, maybe even this meeting from Neil.

60
00:09:02.540 --> 00:09:17.990
Matthew Heon (Red Hat, Inc.): And we're also doing a lot more outreach as part of this. You might have found us at KubeCon NA this year. I'm expecting that's going to be a regular thing from here on out, and we're also going to be doing a lot more conferences as well in the future, hopefully.

61
00:09:18.280 --> 00:09:33.549
Matthew Heon (Red Hat, Inc.): So, yeah, on the whole, I think we are having a lot of success over here. We announced Podman 6.0 this year, and we're steadily working towards that. Expected release may remain spring of next year, so look forward to that.

62
00:09:34.200 --> 00:09:39.400
Matthew Heon (Red Hat, Inc.): And, yeah, I think that one was about it for me.

63
00:09:41.440 --> 00:09:44.150
Tom Sweeney (Red Hat, Inc.): Do you want to talk at all about 571 coming up?

64
00:09:44.320 --> 00:10:03.130
Matthew Heon (Red Hat, Inc.): Oh, sure. This is not related to Podman's retrospective, but I can say that we are expecting a fresh release of Podman with a bunch of bug fixes at some point later this month, probably next week, probably. Might make its way into your distro a bit after that, though.

65
00:10:03.150 --> 00:10:21.009
Matthew Heon (Red Hat, Inc.): The main feature of this is going to be a variety of podman machine fixes, as well as a couple of runCCV fixes that don't really affect us, but we're going to vendor the packages in just to make Security Scanner stop yelling at us. Yeah.

66
00:10:21.200 --> 00:10:28.519
Matthew Heon (Red Hat, Inc.): I expect that sometime next week for Upstream, and we'll see where it goes from there.

67
00:10:31.580 --> 00:10:33.949
Tom Sweeney (Red Hat, Inc.): Any questions for Matt?

68
00:10:39.760 --> 00:10:46.159
Tom Sweeney (Red Hat, Inc.): Alrighty, since I'm not hearing anything, I'm going to hand over to Paul to talk about the immutable GitHub releases. Go ahead, Paul.

69
00:10:51.130 --> 00:10:53.860
Paul Holzinger: Okay, can you hear me?

70
00:10:55.300 --> 00:10:56.139
Tom Sweeney (Red Hat, Inc.): Yes, we can.

71
00:10:56.880 --> 00:11:07.369
Paul Holzinger: All right. That's maybe more of a cabal topic normally, but, well, since we didn't have anything on the agenda, I saw it on here.

72
00:11:08.240 --> 00:11:22.740
Paul Holzinger: And recently, GitHub published a new feature called Immutable Releases, which makes it so that if you create a GitHub release and have, like, artifacts and so on attached.

73
00:11:22.980 --> 00:11:26.119
Paul Holzinger: You can no longer modify them.

74
00:11:26.640 --> 00:11:31.209
Paul Holzinger: And, to me, that's… Interesting feature, because…

75
00:11:31.450 --> 00:11:37.149
Paul Holzinger: We have various people with access to the repos, and…

76
00:11:37.450 --> 00:11:43.649
Paul Holzinger: anyone, basically… I'm not quite sure what the permission level is you need to edit a release, but…

77
00:11:44.470 --> 00:11:51.470
Paul Holzinger: If you edit it, you can basically swap out the portmaninstaller.exe, or…

78
00:11:51.610 --> 00:11:56.319
Paul Holzinger: the Meg Installer, or whatever, which is used by a lot of people, and as such.

79
00:11:57.570 --> 00:11:58.970
Paul Holzinger: Sort of a risk.

80
00:12:00.100 --> 00:12:07.190
Paul Holzinger: Therefore, I think it's much better if we have the CI

81
00:12:07.350 --> 00:12:16.700
Paul Holzinger: Create release that we already have, and then have it immutable so nobody can… Do something with it.

82
00:12:16.880 --> 00:12:24.950
Paul Holzinger: With the obvious downside, if the created release is broken, then you cannot change and need to do another one.

83
00:12:27.300 --> 00:12:35.000
Paul Holzinger: So, yeah, basically I just wanted to have the thoughts of everyone, if they liked it, or don't like it, or whatever.

84
00:12:38.660 --> 00:12:56.400
Ashley Cui: I think I'm usually the one who messes with the releases, the most. I think, for the most part, it's a good idea, but, again, as you said, there is the concern, there has… there have been some times where, the… the…

85
00:12:57.000 --> 00:13:06.129
Ashley Cui: Podman is fine, but there's something that's gone wrong in installer, and then, we, like, fixed the installer and just rebuilt it,

86
00:13:06.130 --> 00:13:23.249
Ashley Cui: with the right version inside, we can't… we wouldn't be able to do that anymore, but the way the current CI is set up is that if any of the installers break, the release doesn't go out anyway, so I'm not sure in the current… how we currently do things will affect it too much.

87
00:13:23.250 --> 00:13:26.779
Ashley Cui: But I think it's an interesting thing to explore.

88
00:13:28.500 --> 00:13:31.910
Lokesh Mandvekar: Can we factor in pre-releases?

89
00:13:33.140 --> 00:13:35.420
Lokesh Mandvekar: To… to run installer checks?

90
00:13:38.690 --> 00:13:40.329
Ashley Cui: As in, like, RCs?

91
00:13:42.250 --> 00:13:47.199
Lokesh Mandvekar: rCs, maybe even the main release, is that doable?

92
00:13:48.360 --> 00:13:51.990
Ashley Cui: Like, pre-release would be…

93
00:13:52.920 --> 00:14:05.780
Ashley Cui: I think the GitHub, page says something about, the recommended ways to, first publish it as a draft, and then looking at it, and if it's all okay, doing a full publish.

94
00:14:07.340 --> 00:14:16.869
Ashley Cui: But I'm not sure, like, if you mark something as pre-release, you'd be able to change it into a full release. Like, I didn't go far enough into the docs to know about that.

95
00:14:18.480 --> 00:14:19.630
Lokesh Mandvekar: Okay, yeah.

96
00:14:19.870 --> 00:14:29.009
Lokesh Mandvekar: Just that I have, set up release immutability for Container SC Linux already, but we haven't had a new release. I just did that earlier today.

97
00:14:29.110 --> 00:14:34.990
Lokesh Mandvekar: I guess my only concern would be Would someone be able to…

98
00:14:35.280 --> 00:14:39.130
Lokesh Mandvekar: Uncheck that setting where we enabled release invitability.

99
00:14:39.410 --> 00:14:42.480
Lokesh Mandvekar: So we might need to be careful with that permission there, too.

100
00:14:44.150 --> 00:14:54.140
Paul Holzinger: So the… as far as I understand, if you have it on, and you make a release, it's immutable, even if you undo the setting later.

101
00:14:55.300 --> 00:15:04.729
Paul Holzinger: So you could… somebody could still undo the repo setting, but there are much more interesting repo settings to undo, if you have that kind of access.

102
00:15:05.110 --> 00:15:06.330
Lokesh Mandvekar: Okay, yeah.

103
00:15:06.740 --> 00:15:07.589
Lokesh Mandvekar: Sounds good.

104
00:15:17.230 --> 00:15:19.339
Lokesh Mandvekar: I would plus one, if it matters.

105
00:15:22.970 --> 00:15:35.209
Ashley Cui: Yeah, well, yeah, the only annoying thing is, like, if we have to do a separate release after because one of the installers broke, and it's the same binary, and we have to do all, like, the other processes to get into the other stuff.

106
00:15:35.210 --> 00:15:35.740
Reinhard Tartler: But…

107
00:15:37.090 --> 00:15:38.020
Reinhard Tartler: Yeah.

108
00:15:46.510 --> 00:15:53.829
Matthew Heon (Red Hat, Inc.): I'm generally in favor. It doesn't sound like it's… it sounds like a nice little thing, and I doubt we'll break anything.

109
00:16:04.120 --> 00:16:06.169
Tom Sweeney (Red Hat, Inc.): Any other thoughts or questions?

110
00:16:14.250 --> 00:16:16.910
Tom Sweeney (Red Hat, Inc.): Alrighty, if you have any other thoughts or questions you'd like to…

111
00:16:17.070 --> 00:16:22.959
Tom Sweeney (Red Hat, Inc.): talk to Paul about, go ahead and contact them, and or, get into the GitHub and take a look at

112
00:16:23.250 --> 00:16:24.430
Tom Sweeney (Red Hat, Inc.): The link here.

113
00:16:26.010 --> 00:16:28.380
Tom Sweeney (Red Hat, Inc.): Alright, Steve, are you back?

114
00:16:29.480 --> 00:16:30.650
Steve Ryan: Yeah.

115
00:16:31.430 --> 00:16:33.509
Tom Sweeney (Red Hat, Inc.): Do you want to try sharing one last time?

116
00:16:33.780 --> 00:16:37.579
Steve Ryan: Yeah, I'm on good old X11, so let's see if that works a little better.

117
00:16:38.400 --> 00:16:39.500
Tom Sweeney (Red Hat, Inc.): Fingers crossed.

118
00:16:45.790 --> 00:16:47.369
Tom Sweeney (Red Hat, Inc.): I'm seeing progress.

119
00:16:48.000 --> 00:16:49.809
Tom Sweeney (Red Hat, Inc.): And I see your presentation.

120
00:16:50.160 --> 00:16:51.730
Steve Ryan: Alright!

121
00:16:52.620 --> 00:16:55.820
Miloslav Trmač: Great, alright, that's great news. Here, I can…

122
00:16:56.270 --> 00:16:59.539
Steve Ryan: Turn on my video, too, so everyone else seems to be. So,

123
00:17:00.880 --> 00:17:09.810
Steve Ryan: Yeah, sorry, I'm a little… didn't expect that screen-sharing issue, but I haven't used Zoom in many years, so I guess it's…

124
00:17:10.669 --> 00:17:15.119
Steve Ryan: We're all right there with your learning. Yeah. So thanks, thanks for sticking with it and getting it back up.

125
00:17:15.690 --> 00:17:22.990
Steve Ryan: But, yeah, so, yeah, my name's Steve Ryan, I've been working on… should I fix my lighting before this, but…

126
00:17:23.560 --> 00:17:26.829
Steve Ryan: So this is a little project I've been working on for the past…

127
00:17:27.170 --> 00:17:31.970
Steve Ryan: Probably a little over a year at this point, called Materia.

128
00:17:32.260 --> 00:17:40.270
Steve Ryan: Which is a… is… well, I can go to the next slide. So, it is a GitOps tool for orchestrating, quadlets.

129
00:17:40.810 --> 00:17:47.599
Steve Ryan: Except it, it's, it does a little bit more than just handling the actual quadlit files itself.

130
00:17:47.750 --> 00:18:00.310
Steve Ryan: Because it is designed to handle basically the entire lifecycle, where it breaks things down into components, or it has a repository, which is, you know, normally a Git repository.

131
00:18:00.790 --> 00:18:10.709
Steve Ryan: And that is filled with what's called components, which are kind of very similar to Ansible roles, or puppet modules, or something like that. And each component has…

132
00:18:11.040 --> 00:18:20.229
Steve Ryan: you know, one or more quadlet files, usually, at least a container file, a few volumes, such as that. We'll show an example momentarily.

133
00:18:20.530 --> 00:18:28.210
Steve Ryan: And… The repository also has a manifest describing what components are installed on what host.

134
00:18:29.060 --> 00:18:33.629
Steve Ryan: And Materia basically just pulls this, repository.

135
00:18:33.870 --> 00:18:40.130
Steve Ryan: It determines what components should be installed on the host, and installs and removes components as needed.

136
00:18:40.250 --> 00:18:41.999
Steve Ryan: Which, and so it's,

137
00:18:42.240 --> 00:18:58.690
Steve Ryan: combination of just a… it not only installs QALIS, but also any associated data files. It has a basic templating engine to, you know, install secrets, both, just interpolating variables into, you know, let's say, defining a port in the container file.

138
00:18:58.690 --> 00:19:02.590
Steve Ryan: As well as, it does have a system for installing Podman Secrets.

139
00:19:02.820 --> 00:19:06.490
Steve Ryan: It can take,

140
00:19:06.850 --> 00:19:16.189
Steve Ryan: Couple different backends, but I can get to that momentarily. It also handles, you know, starting, stopping, restarting, reloading services as needed.

141
00:19:16.460 --> 00:19:29.560
Steve Ryan: Yeah, I have a line here, it's like, yeah, this is very heavily inspired. I used to work in a big puppet shop back in the day, which I believe puppets now open Vox. I'm not familiar with that situation, but

142
00:19:30.130 --> 00:19:31.710
Steve Ryan: What you're gonna call it, but…

143
00:19:32.090 --> 00:19:40.249
Steve Ryan: It's very heavily influenced by that, and yeah, a little fun fact is that it comes from the alchemical term prima materia.

144
00:19:40.670 --> 00:19:51.209
Steve Ryan: Which is the, the first material. It's supposed to be the, the building block of the Alchemist's Magnum Opus, and it's cause, well, the alternative for…

145
00:19:51.340 --> 00:20:02.139
Steve Ryan: A lot of, you know, container orchestration seems to be Kubernetes, and Kubernetes is like magic, so quadlets are like alchemy. A little simpler, a little closer to real science.

146
00:20:02.520 --> 00:20:04.210
Steve Ryan: But, so this is a…

147
00:20:04.360 --> 00:20:10.440
Steve Ryan: I just have a little design of what a repository looks like, since this is… the…

148
00:20:10.560 --> 00:20:12.560
Steve Ryan: Yeah, just to show…

149
00:20:12.980 --> 00:20:18.750
Steve Ryan: Yeah, what goes into it? I don't know, I don't think you can see my cursor, which is…

150
00:20:19.210 --> 00:20:21.990
Steve Ryan: I don't see a laser pointer mode or anything, but .

151
00:20:21.990 --> 00:20:25.390
Tom Sweeney (Red Hat, Inc.): I can actually see it. It's a little small, but I can see it a little bit.

152
00:20:25.570 --> 00:20:32.769
Steve Ryan: Oh, perfect. Okay, so I just… so yeah, I have a repo… a diagram of… so this is a material repository, so…

153
00:20:33.730 --> 00:20:46.950
Steve Ryan: Usually, it's, you know, this is a GitOps workflow, so it's usually on a Git server, but technically it does not have to be. Right now, it also supports just, you know, being in a directory on your local host.

154
00:20:47.400 --> 00:20:51.259
Steve Ryan: But yeah, so it has the materia repository, which contains…

155
00:20:51.530 --> 00:20:55.310
Steve Ryan: A manifest that just describes a…

156
00:20:56.080 --> 00:21:00.770
Steve Ryan: You know, any necessary metadata about the repositories, so,

157
00:21:01.180 --> 00:21:09.590
Steve Ryan: what hosts have what components, what roles are defined, you know, extra settings, whatnot. It has a attributes

158
00:21:09.700 --> 00:21:24.860
Steve Ryan: a, attributes folder, which just has a collection of… usually encrypted, but it can just be plain text files. This… I did vault.enk.yaml to represent a SOPS SOPS encrypted YAML file.

159
00:21:25.280 --> 00:21:31.690
Steve Ryan: And then one or more components, and then… which, each component, we'll take a look at this caddy component here.

160
00:21:31.980 --> 00:21:48.910
Steve Ryan: Just contains a, it also contains a manifest file, which describes the metadata about the component, what services it starts, what, if it has… if it uses variable or, attributes at all, what the default values for the attributes are.

161
00:21:49.410 --> 00:21:52.270
Steve Ryan: And then, you know, stuff like that.

162
00:21:52.980 --> 00:22:08.370
Steve Ryan: And then, of course, it has, in the CADI example, it has the CADI container file, which will be installed into the normal QuadLit location, and the CADI file, which represents, you know, any general data file, and that gets installed to a separate location.

163
00:22:08.370 --> 00:22:15.039
Steve Ryan: And can be templated. I install MyCaddy. I have this running on various servers, and it just installs

164
00:22:15.150 --> 00:22:23.379
Steve Ryan: you know, the caddy config as part of the material repository. And we can see we've got a caddy component, we have a… can… can a…

165
00:22:23.730 --> 00:22:28.660
Steve Ryan: Should've picked a service that I know how to pronounce the name of. Oop.

166
00:22:29.670 --> 00:22:49.479
Steve Ryan: But, canid DM component, oh, and yeah, we can see up here the manifest for the repository itself, the materia manifest, just has a basic host mapping, so host foo has the caddy component and the base role, host bar has CAD DM, and then with the…

167
00:22:50.110 --> 00:22:59.710
Steve Ryan: We have the definition of the role base, which just has the pod man exporter component, so any host with the base role will get the podman exporter.

168
00:23:00.400 --> 00:23:02.579
Steve Ryan: Component installed on it.

169
00:23:04.850 --> 00:23:09.039
Steve Ryan: And so what is, you know, the actual workflow of the,

170
00:23:09.720 --> 00:23:16.519
Steve Ryan: of Materia is pretty simple if you're familiar with… if you're already familiar with GitOps, or…

171
00:23:16.910 --> 00:23:35.030
Steve Ryan: puppet, like, agent-based configuration management, but it syncs up with the remote repository. This can be done either… I manually run mine with, system detimers, but it does also have a server mode that just runs and, you know, checks to see if the Git repo's been updated every 2 minutes or so.

172
00:23:35.170 --> 00:23:43.799
Steve Ryan: Determines what components need to be installed, what needs to be removed, and if the components have any updated files, it will update files individually.

173
00:23:44.630 --> 00:23:47.090
Steve Ryan: It generates a plan.

174
00:23:47.630 --> 00:23:52.059
Steve Ryan: Which is, just a… I'll demonstrate in a moment, but

175
00:23:52.330 --> 00:23:59.909
Steve Ryan: Basically, just the full deterministic list of instructions needed to run on the system to get into the desired state.

176
00:24:00.240 --> 00:24:02.830
Steve Ryan: And you can view the plan, you can…

177
00:24:03.240 --> 00:24:10.020
Steve Ryan: You can dump it to a JSON file, you can do whatever with it, but normally you then just execute the plan, which…

178
00:24:10.380 --> 00:24:16.560
Steve Ryan: Actually installs the files, templates things, restarts services, you know, all that good stuff.

179
00:24:17.550 --> 00:24:28.110
Steve Ryan: It can be anywhere from just, you know, copying a file from one place to another to, it does support more complicated operations like, migrating data between volumes.

180
00:24:28.440 --> 00:24:35.869
Steve Ryan: And at the end of it, it double-checks to make sure that any SystemD services that were started or stopped are actually started and stopped.

181
00:24:36.840 --> 00:24:43.780
Steve Ryan: And yeah, so I've prepared a little demo, let me see…

182
00:24:43.950 --> 00:24:47.350
Steve Ryan: How can I… I can just share my screen over to my terminal.

183
00:24:47.350 --> 00:24:49.270
Tom Sweeney (Red Hat, Inc.): Thanks to the demo gods.

184
00:24:49.750 --> 00:24:55.129
Steve Ryan: Yeah, it's… I've practiced this part multiple times, but…

185
00:24:55.400 --> 00:24:58.209
Steve Ryan: We'll see if something new goes wrong.

186
00:24:58.880 --> 00:25:01.510
Tom Sweeney (Red Hat, Inc.): Looks like we're seeing a screen? Yep.

187
00:25:01.510 --> 00:25:03.230
Steve Ryan: Everyone can see my terminal.

188
00:25:03.230 --> 00:25:03.710
Mohan Boddu: Good.

189
00:25:03.710 --> 00:25:06.950
Tom Sweeney (Red Hat, Inc.): Can you bump up the size any, or is it going to mess things up for you?

190
00:25:07.110 --> 00:25:09.539
Steve Ryan: Yeah, how's… is this more readable?

191
00:25:10.250 --> 00:25:11.359
Tom Sweeney (Red Hat, Inc.): It is for me.

192
00:25:12.500 --> 00:25:14.109
Mohan Boddu: A little bit more helps.

193
00:25:14.110 --> 00:25:14.670
Steve Ryan: Yep.

194
00:25:16.660 --> 00:25:17.390
Mohan Boddu: Yep, sounds good.

195
00:25:17.390 --> 00:25:17.849
Steve Ryan: Yeah, that's good.

196
00:25:17.850 --> 00:25:18.490
Mohan Boddu: Steve.

197
00:25:18.770 --> 00:25:19.390
Steve Ryan: Alright.

198
00:25:20.550 --> 00:25:22.700
Steve Ryan: So, yeah, this is a…

199
00:25:23.140 --> 00:25:25.850
Steve Ryan: This is just a little demo I made,

200
00:25:26.080 --> 00:25:37.499
Steve Ryan: I linked the… I don't know if the presentation slides are gonna be part of the recording or notes, but there is a link to this demo repository on… in the slides, it's just on my GitHub.

201
00:25:37.640 --> 00:25:39.130
Steve Ryan: And this is…

202
00:25:41.000 --> 00:25:47.570
Steve Ryan: what do you want to call it? Has a… so this folder is a material repository, we can see…

203
00:25:48.570 --> 00:26:01.419
Steve Ryan: We have a materia manifest right here, where the, the manifest demo host is going to have the caddy component and the base role, just the base role defined as just having the Podman Exporter component.

204
00:26:02.340 --> 00:26:12.560
Steve Ryan: So it's just, very simple TOML files. I went with TOML files to try to keep it close to the SystemD unit file, INI style. We have…

205
00:26:13.090 --> 00:26:20.559
Steve Ryan: the two aforementioned components, Caddy and Podman Exporter, and we can… Take a peek at the…

206
00:26:21.030 --> 00:26:23.789
Steve Ryan: the actual caddy component, so we can see here…

207
00:26:24.260 --> 00:26:28.420
Steve Ryan: We have, volume, we have volume quadlets, we have…

208
00:26:28.610 --> 00:26:31.610
Steve Ryan: Another manifest, there's manifests all the way down.

209
00:26:31.820 --> 00:26:41.849
Steve Ryan: And we do have… The caddy container itself is a template, as designated by that GoTemple,

210
00:26:41.950 --> 00:26:43.010
Steve Ryan: file type.

211
00:26:44.580 --> 00:26:55.119
Steve Ryan: And you can see that it has a… that it is a Go-style template, so you can see the container tag is defined as an attribute, so this can be,

212
00:26:55.980 --> 00:27:08.980
Steve Ryan: So this can be set either as part of the component manifest, or this value can be set either in the component manifest, I'll show that in a moment, or it can be set in the attributes, so in that, like,

213
00:27:09.200 --> 00:27:19.610
Steve Ryan: This example repo uses a encrypted… a SOPS encrypted file, but it also supports, just straight age keys, or age encryption, or,

214
00:27:21.070 --> 00:27:22.750
Steve Ryan: Just putting them the…

215
00:27:23.030 --> 00:27:28.079
Steve Ryan: them in a, a variable file, for lack of a better word. No encryption or anything.

216
00:27:29.580 --> 00:27:30.950
Steve Ryan: We do…

217
00:27:31.310 --> 00:27:37.169
Steve Ryan: have, this mdatadir and snippet are what I've been calling macros, which are just kind of…

218
00:27:37.630 --> 00:27:45.610
Steve Ryan: a little bit of templating shortcuts. This auto-update snippet just installs the… or sets up the…

219
00:27:45.950 --> 00:27:48.129
Steve Ryan: The auto-update line for the quadlet.

220
00:27:48.310 --> 00:27:54.999
Steve Ryan: But… Anyway, the important thing is, yeah, this is a template, it is installed.

221
00:27:56.770 --> 00:28:00.190
Steve Ryan: Is installed and templated as part of the normal

222
00:28:01.380 --> 00:28:11.389
Steve Ryan: materia, workflow, and we can see here, we have the… in the defaults, for the default attributes, we have this container tag is going to be set to latest.

223
00:28:12.840 --> 00:28:20.690
Steve Ryan: And, oh, and we see that, this component has the caddy service and is reloaded by the conf.c slash caddy file.

224
00:28:22.050 --> 00:28:34.769
Steve Ryan: It's… it doesn't have to be in a separate directory, I just like to edit my, caddy files on the host sometimes, and if you do that as a bind mount, it gets weird with how Vim does the file, so…

225
00:28:35.510 --> 00:28:40.389
Steve Ryan: whatchamacallit? And, we'll also just take a peek real fast.

226
00:28:41.820 --> 00:28:49.250
Steve Ryan: the, this secrets folder, we have a vault.yaml file, that is a SOPS encrypted file.

227
00:28:51.080 --> 00:28:56.739
Steve Ryan: Which, you know, bunch of gobbledygook, but… We just look at NSAPs.

228
00:28:57.520 --> 00:28:59.610
Steve Ryan: We can just see that it's a…

229
00:29:00.220 --> 00:29:07.400
Steve Ryan: just has a single value that is the container tag set to 210 Alpine instead of the latest.

230
00:29:08.040 --> 00:29:11.800
Steve Ryan: But, but…

231
00:29:12.080 --> 00:29:20.549
Steve Ryan: Yeah, so unfortunately, I think when I logged out, I had a… a demo VM set up already. Unfortunately, when I logged out, logged back in, that killed it, so…

232
00:29:20.910 --> 00:29:25.080
Steve Ryan: It will take a moment to… Set up a,

233
00:29:26.030 --> 00:29:34.239
Steve Ryan: This is just gonna be a standard, Alma 9 Linux VM. This… with a pod man, and…

234
00:29:34.610 --> 00:29:38.900
Steve Ryan: Stuff like, you know, a few basics installed, but nothing…

235
00:29:39.670 --> 00:29:44.430
Steve Ryan: Nothing complicated. The actual material parts I will show as part of the demo.

236
00:29:46.610 --> 00:29:50.640
Steve Ryan: So, hopefully, doesn't take too long,

237
00:29:53.740 --> 00:29:54.400
Steve Ryan: Trying to think.

238
00:29:54.400 --> 00:29:58.250
Tom Sweeney (Red Hat, Inc.): cranking a little bit, are there any questions we could ask that we have?

239
00:30:05.880 --> 00:30:09.660
Paul Holzinger: One question, we had a demo of…

240
00:30:09.860 --> 00:30:14.550
Paul Holzinger: No, no, I forgot the name. Orches? Orchest?

241
00:30:15.200 --> 00:30:25.609
Paul Holzinger: a while back, have you looked at, alternatives for, like, Quadlit GitOps? Or what motivated you to… to go this route instead of…

242
00:30:27.940 --> 00:30:35.750
Steve Ryan: Yeah, I am actually… I did actually look at, yeah, Orcus? Orchus? I'm… I'm not sure.

243
00:30:36.270 --> 00:30:42.939
Steve Ryan: But yes, I looked at that, and I looked at, I believe there is a project in the containers repo, Fetchit?

244
00:30:43.610 --> 00:30:48.110
Steve Ryan: from some time ago that did a similar thing.

245
00:30:49.030 --> 00:30:58.799
Steve Ryan: Both neat projects, I was very much inspired by Fetchit. I think Orcus came out while I… after I had started working on this,

246
00:31:00.440 --> 00:31:03.710
Steve Ryan: But, yeah, I think the bid… the…

247
00:31:05.510 --> 00:31:22.520
Steve Ryan: I guess I kept going with Materia instead of putting it behind working with one of the other projects, is, Materia handles both… both other projects focus more on, just quadlets themselves, while this Materia handles both the quadlet and the data files, so it's a little more…

248
00:31:23.110 --> 00:31:25.860
Steve Ryan: a little more…

249
00:31:26.260 --> 00:31:33.989
Steve Ryan: I don't want to say flexible, because technically it's less flexible, you have to put your quadlets in these… this component structure, but

250
00:31:35.860 --> 00:31:36.740
Steve Ryan: It's…

251
00:31:38.330 --> 00:31:50.150
Steve Ryan: more comprehensive, I think. It's like, I use this as… I design materials specifically to work for… I run OpenSUS micro OS on my machines, it's an Atomic distro.

252
00:31:50.200 --> 00:32:07.199
Steve Ryan: Basically, so I would have this, various nodes with a very, very set, like, base installation, and I was just running containers on top of them, and I wanted to have just one tool that I could install as part of my base image generation that would handle

253
00:32:08.120 --> 00:32:15.329
Steve Ryan: everything after that, basically, to installing the quadlets, making sure the services are started,

254
00:32:16.120 --> 00:32:20.580
Steve Ryan: Making sure data files are in place, updated, things are restarted as necessary.

255
00:32:20.780 --> 00:32:24.689
Steve Ryan: And… yeah, the whole application lifecycle.

256
00:32:25.060 --> 00:32:38.179
Steve Ryan: And that's kind of what Materia focused on, as opposed to just handling quadlets specifically. But it is, I mean, it works with quadlets. It is specifically designed to only manage quadlets and podban-related,

257
00:32:38.400 --> 00:32:39.710
Steve Ryan: systems.

258
00:32:40.490 --> 00:32:44.380
Steve Ryan: But, yeah, so here… but… so the, the VM's created.

259
00:32:45.110 --> 00:32:52.400
Steve Ryan: So… This is, like I said, this is just a standard Alma 9, distro.

260
00:32:52.770 --> 00:32:58.279
Steve Ryan: This is Ryan through the lovely verter tool, and we just have… Two little shell scripts here.

261
00:32:58.390 --> 00:33:00.850
Steve Ryan: Really, just for convenience, this one…

262
00:33:01.210 --> 00:33:03.580
Steve Ryan: Creates the… we… we need…

263
00:33:04.450 --> 00:33:09.429
Steve Ryan: two directories. Technically, we only need this varlib materia directory, that's the…

264
00:33:09.750 --> 00:33:21.599
Steve Ryan: what I internally call the prefix, but that's where Materia puts, all the data files, stores the copy of the source, like a copy of the, a cache of the source repository.

265
00:33:22.160 --> 00:33:23.880
Steve Ryan: The closest thing…

266
00:33:24.030 --> 00:33:35.930
Steve Ryan: to state, basically. And a little Etsy materia, which, it does support a config file. I'm not going to use one for this demonstration, but that's where you'd put it.

267
00:33:36.340 --> 00:33:43.530
Steve Ryan: Or, you could put it, but mostly, it just downloads the actual binary, so we'll just run that real fast.

268
00:33:44.250 --> 00:33:55.510
Steve Ryan: And then… We do have this environment file, so it's designed to, material is designed to run

269
00:33:55.840 --> 00:34:00.959
Steve Ryan: can be configured basically entirely through environment variables. You can use the normal config file.

270
00:34:01.080 --> 00:34:04.059
Steve Ryan: But, I personally run it as a…

271
00:34:04.160 --> 00:34:09.740
Steve Ryan: a quadlet, so I install all the config for it as environmental variables.

272
00:34:10.040 --> 00:34:14.550
Steve Ryan: And the big one right here is just this, whoop.

273
00:34:15.480 --> 00:34:25.650
Steve Ryan: this source URL, which… is, a little self-explanatory, it's the… the URL that has the…

274
00:34:26.150 --> 00:34:32.239
Steve Ryan: the repository to pull. This is using the little git shortcut one, where it will

275
00:34:32.969 --> 00:34:50.879
Steve Ryan: it will automatically kind of automagically guess that it's a HTTP git repo, and clone it accordingly, but this could also be file, colon, or another source. And then, since we are doing… since the demo has templates, we need to tell it

276
00:34:51.219 --> 00:34:53.749
Steve Ryan: What to use to try to decrypt

277
00:34:53.969 --> 00:35:01.000
Steve Ryan: encrypted attributes file, so that's SOPS, and then this is just a SOP setting, which is… that's just a, an H key.

278
00:35:01.690 --> 00:35:03.750
Steve Ryan: So we're just gonna source that.

279
00:35:07.030 --> 00:35:11.790
Steve Ryan: And, yeah, so we have the material command, we can do… see a few things about it.

280
00:35:12.730 --> 00:35:15.100
Steve Ryan: Sample, if I run Materia Facts.

281
00:35:15.220 --> 00:35:16.940
Steve Ryan: We'll see, you can s-

282
00:35:17.390 --> 00:35:23.260
Steve Ryan: See here, this is where it clones the repository in the background. And you can…

283
00:35:23.840 --> 00:35:29.040
Steve Ryan: It, so this host has the base role assigned to it, and the…

284
00:35:29.250 --> 00:35:38.970
Steve Ryan: well, as part of the… it has the caddy component assigned to it, and then also Podman Exporter from the base. Doesn't have anything installed, and little network information.

285
00:35:39.310 --> 00:35:41.660
Steve Ryan: But, so we'll just… I'm sure.

286
00:35:41.830 --> 00:35:43.999
Steve Ryan: Gone on long enough, so we'll,

287
00:35:45.030 --> 00:35:48.699
Steve Ryan: Just show off, here's a quick plan generation.

288
00:35:49.270 --> 00:35:58.940
Steve Ryan: So you can see this is the exact steps that it's going to take, when we actually update the host, and it's going to be… these steps will be generated in the same way every time.

289
00:35:59.090 --> 00:36:04.249
Steve Ryan: And it's… Yeah, you can see it installs the…

290
00:36:04.770 --> 00:36:11.950
Steve Ryan: It installs the component, which basically just means it creates the directory and varlib materia, installs the…

291
00:36:12.290 --> 00:36:15.790
Steve Ryan: The data file directory, a few quadlets.

292
00:36:16.300 --> 00:36:21.120
Steve Ryan: and installs the… does the same thing for the Podman Exporter component.

293
00:36:21.630 --> 00:36:27.759
Steve Ryan: And finally, reloads the host, so systemctl daemon reload, and starts the required services.

294
00:36:28.850 --> 00:36:38.259
Steve Ryan: And so we can just do that, so that the plan's nice if you ever want, like, know what's going to happen on the next, material run, or just verify that things work.

295
00:36:38.780 --> 00:36:43.049
Steve Ryan: But, so we… we see that, we like that plan, so just materia update.

296
00:36:43.640 --> 00:36:49.500
Steve Ryan: And it outputs the plan again for convenience, but yep.

297
00:36:50.470 --> 00:36:52.420
Steve Ryan: Let's run the plant so we can see…

298
00:36:53.230 --> 00:37:01.270
Steve Ryan: The, yeah, the containers are running. You can see in, varlin materia components.

299
00:37:02.280 --> 00:37:08.550
Steve Ryan: In the caddy component, we have that little, config directory with the… Config file?

300
00:37:10.650 --> 00:37:14.670
Steve Ryan: And I… yeah, I don't actually have anything in the config file,

301
00:37:15.690 --> 00:37:20.710
Steve Ryan: But, we can s- we can… and we can see in… C is System D.

302
00:37:23.300 --> 00:37:27.430
Steve Ryan: sorry, at C, Containers System D.

303
00:37:28.300 --> 00:37:31.650
Steve Ryan: You can see we have two little subdirectories, one for each component.

304
00:37:32.400 --> 00:37:33.970
Steve Ryan: And here we have…

305
00:37:34.100 --> 00:37:40.339
Steve Ryan: all of the quadlet files, and we can see in… for the caddy container, remember that was the templated one.

306
00:37:41.790 --> 00:37:47.080
Steve Ryan: And we can see it did not actually use that template, but normally it does, I swear.

307
00:37:47.250 --> 00:37:51.369
Steve Ryan: We can see… I must have, made a typo somewhere.

308
00:37:51.510 --> 00:37:52.710
Steve Ryan: But,

309
00:37:54.350 --> 00:38:01.859
Steve Ryan: We can see here, this was, if you remember there, this was where the, the snippet was, that was templated in, and this volume mount

310
00:38:02.130 --> 00:38:06.620
Steve Ryan: I have a… there's a macro for accessing the data directory, so it…

311
00:38:07.030 --> 00:38:10.580
Steve Ryan: Eases to… that very value is templated in, too.

312
00:38:11.280 --> 00:38:16.180
Steve Ryan: But yeah, so that's the…

313
00:38:17.150 --> 00:38:27.539
Steve Ryan: Yeah, so that's the demo. I mean, I could show, you know, I could edit the source and remove components and show that it will remove the files and whatnot, but I think I've used up enough time as it is.

314
00:38:27.870 --> 00:38:28.429
Steve Ryan: So.

315
00:38:28.430 --> 00:38:30.229
Tom Sweeney (Red Hat, Inc.): I was just gonna give you a time check.

316
00:38:30.230 --> 00:38:30.990
Steve Ryan: Yeah.

317
00:38:31.640 --> 00:38:34.449
Steve Ryan: Yeah, so I'll just pop back to the demonstration.

318
00:38:34.450 --> 00:38:36.560
Tom Sweeney (Red Hat, Inc.): Back to your slides for the more info.

319
00:38:36.560 --> 00:38:52.229
Steve Ryan: Yep. And yeah, so this is… this is just a few more links. I've got a main website here at primamateria.systems, and then the actual source code repository, a, a little bit more full-featured example repository is here.

320
00:38:52.560 --> 00:38:54.839
Steve Ryan: And, I have a matrix room.

321
00:38:55.060 --> 00:38:56.890
Steve Ryan: But yeah, that's it!

322
00:38:57.050 --> 00:38:58.439
Steve Ryan: Any questions?

323
00:39:04.370 --> 00:39:05.710
Tom Sweeney (Red Hat, Inc.): Not hearing any at the moment.

324
00:39:05.710 --> 00:39:06.480
Steve Ryan: Alright.

325
00:39:07.020 --> 00:39:09.570
Tom Sweeney (Red Hat, Inc.): And thanks very much, Steve, for coming and showing. It looks great.

326
00:39:09.570 --> 00:39:10.540
Steve Ryan: Yeah, thank you for having me.

327
00:39:12.130 --> 00:39:17.190
Tom Sweeney (Red Hat, Inc.): And anytime, if you have any updates or something you want to come show us in the future, feel free, give us a ping.

328
00:39:17.680 --> 00:39:18.320
Steve Ryan: Alright?

329
00:39:18.320 --> 00:39:18.700
Tom Sweeney (Red Hat, Inc.): hurry.

330
00:39:18.700 --> 00:39:19.250
Steve Ryan: Thank you.

331
00:39:20.000 --> 00:39:23.189
Tom Sweeney (Red Hat, Inc.): With that, Mohan, are you on board here?

332
00:39:24.820 --> 00:39:25.700
Mohan Boddu: Yes, sir?

333
00:39:26.360 --> 00:39:27.520
Tom Sweeney (Red Hat, Inc.): Take it away, sir.

334
00:39:28.230 --> 00:39:35.430
Mohan Boddu: So, I just wanted to take some time to introduce a couple of UMass-level students here.

335
00:39:36.480 --> 00:39:41.980
Mohan Boddu: Andrew Sills and Jesse Taub, And do I see…

336
00:39:43.300 --> 00:39:49.499
Mohan Boddu: The others? Probably not. One of them is heading back home, and the other one is sick, so…

337
00:39:49.650 --> 00:39:55.610
Mohan Boddu: Anyway, so, Jesse Thaub and,

338
00:39:56.580 --> 00:40:09.460
Mohan Boddu: Andersils have been working on Podman, and it's a capstone project. They're working through the UMass Lowell, and they're gonna help us with, some, RFE and bug fixes.

339
00:40:10.310 --> 00:40:19.770
Mohan Boddu: They already started contributing a little bit with the documentation and everything, so they're gonna put more focus on, on the,

340
00:40:20.160 --> 00:40:24.060
Mohan Boddu: the RFEs, starting next semester.

341
00:40:25.370 --> 00:40:30.259
Mohan Boddu: And… That's pretty much it.

342
00:40:30.630 --> 00:40:35.500
Mohan Boddu: Jesse or Andrew, do you want to add anything? Or introduce yourselves a bit?

343
00:40:40.940 --> 00:40:48.950
Jesse Taube (Umass Lowell): I, I guess, I've… right now, I've been looking into,

344
00:40:49.820 --> 00:40:56.639
Jesse Taube (Umass Lowell): issue number 62 on container libs, which is about, adding

345
00:40:57.370 --> 00:41:08.659
Jesse Taube (Umass Lowell): like, additional… well, it was originally about updating the defaults to current, Docker rules, so this default SecOps options, but…

346
00:41:09.070 --> 00:41:19.249
Jesse Taube (Umass Lowell): the discussion there led to, just having the ability to add multiple, like, default SecOpp, like, JSONs that,

347
00:41:20.020 --> 00:41:22.280
Jesse Taube (Umass Lowell): distros came.

348
00:41:23.360 --> 00:41:32.550
Jesse Taube (Umass Lowell): in the… config directory. So… That's what I'm… Looking into adding right now.

349
00:41:32.780 --> 00:41:36.890
Jesse Taube (Umass Lowell): I asked on the…

350
00:41:37.460 --> 00:41:42.029
Jesse Taube (Umass Lowell): Element Matrix channel a while ago about what the format should be.

351
00:41:42.350 --> 00:41:44.640
Jesse Taube (Umass Lowell): End.

352
00:41:45.680 --> 00:41:50.480
Jesse Taube (Umass Lowell): Turns out there's, like, an actual map option for, containers.com.

353
00:41:51.200 --> 00:41:53.250
Jesse Taube (Umass Lowell): So… There's that.

354
00:41:53.870 --> 00:41:57.029
Jesse Taube (Umass Lowell): Yeah, I'm not… I'm not really sure.

355
00:41:57.560 --> 00:42:00.830
Jesse Taube (Umass Lowell): what else to say? Yeah.

356
00:42:01.330 --> 00:42:04.109
Tom Sweeney (Red Hat, Inc.): Thank you, Jessie. Yeah, welcome, and thank you.

357
00:42:10.330 --> 00:42:10.910
Mohan Boddu: Okay.

358
00:42:13.230 --> 00:42:25.519
Mohan Boddu: That's pretty much it, and jesse, you were asking some question, probably… I mean, you can ask… given the time, you can ask that question. Oh, Tom, do we have anything…

359
00:42:25.730 --> 00:42:27.070
Mohan Boddu: Elves in the room?

360
00:42:27.070 --> 00:42:31.179
Tom Sweeney (Red Hat, Inc.): one more, topic. Okay. So, why don't we circle back for…

361
00:42:31.180 --> 00:42:31.630
Mohan Boddu: Awesome.

362
00:42:31.630 --> 00:42:35.689
Miloslav Trmač: get the other topic in. And the last topic that we have today,

363
00:42:35.690 --> 00:42:38.779
Tom Sweeney (Red Hat, Inc.): is CNCF updates, and I think, Neil, you were driving that?

364
00:42:39.170 --> 00:42:46.130
Neil Smith: Yeah, just quick. We had a great time a few weeks ago at QCon. We met,

365
00:42:46.560 --> 00:42:55.629
Neil Smith: many people that, use Podman and Builder, etc, and, they,

366
00:42:56.280 --> 00:43:13.989
Neil Smith: really appreciated all the hard work the community does to, put these products together, and just want to thank everybody for your hard work in helping us do that. And, as part of our CNCF journey, I put a link in the agenda

367
00:43:14.090 --> 00:43:18.370
Neil Smith: That, links to our current

368
00:43:18.980 --> 00:43:34.609
Neil Smith: application that has not yet been submitted, for, incubation. So, feel free to look it over if you have any comments, and, help make it good before we submit it, which is not going to happen

369
00:43:34.710 --> 00:43:40.729
Neil Smith: in the next day or two, but, we will be doing it. We still have some work to do, vendor…

370
00:43:41.440 --> 00:43:43.090
Neil Smith: Er…

371
00:43:43.520 --> 00:44:06.039
Neil Smith: Is it, not vendor, user, verification and some other steps that have to happen. And the other thing that I wanted to mention is that there's a few, still open talks. It was great meeting people at Yukon NA. Yukon EU is around the corner. We're planning on having a booth again. If you want to help us on the booth, let us know.

372
00:44:06.460 --> 00:44:15.980
Neil Smith: We also would love to see you when you're there, if you go to the KubeCon EU. We're also going to be going to… some of us will be at the Maintainer.

373
00:44:16.260 --> 00:44:20.969
Neil Smith: Summit in, there as well, and,

374
00:44:21.090 --> 00:44:35.149
Neil Smith: We'd love to see you, and you have an opportunity now to be submitting talks to those tracks. So, do so, and then we'll all catch up. Maybe we'll do a couple of Podman tracks at the Maintainer Summit I saw.

375
00:44:35.320 --> 00:44:37.659
Neil Smith: Several projects doing that last year.

376
00:44:38.220 --> 00:44:41.369
Neil Smith: Okay, and that's it, if anybody has any questions.

377
00:44:43.070 --> 00:44:46.299
Tom Sweeney (Red Hat, Inc.): heard that Amsterdam in the late March is pretty, pretty…

378
00:44:46.300 --> 00:44:54.360
Neil Smith: Yes, yes, and you can always book a hotel, and then figure it out later, and cancel if you can't go.

379
00:44:55.900 --> 00:44:57.620
Neil Smith: Because hotels are probably the…

380
00:44:57.620 --> 00:44:59.590
Miloslav Trmač: most important factor.

381
00:45:01.090 --> 00:45:02.660
Neil Smith: Miloslav, you're gonna go?

382
00:45:06.000 --> 00:45:09.490
Neil Smith: Nice, go on me.

383
00:45:09.490 --> 00:45:10.570
Tom Sweeney (Red Hat, Inc.): You put him on the spot.

384
00:45:10.980 --> 00:45:11.990
Tom Sweeney (Red Hat, Inc.): You run annoyance.

385
00:45:12.340 --> 00:45:19.300
Neil Smith: Yeah, please, meet us there. And always, we love getting more,

386
00:45:19.930 --> 00:45:22.510
Neil Smith: Asks and things from the community, and…

387
00:45:22.750 --> 00:45:24.349
Neil Smith: Looking forward to keeping that up.

388
00:45:27.270 --> 00:45:28.469
Tom Sweeney (Red Hat, Inc.): That was it for me.

389
00:45:29.410 --> 00:45:33.629
Tom Sweeney (Red Hat, Inc.): Any questions about that, or did anybody have other topics they wanted to discuss?

390
00:45:38.600 --> 00:45:43.160
Martin Beckert: Yes, I'm Martin Beckett from Germany, I hope you can hear me, because I have…

391
00:45:43.160 --> 00:45:43.880
Tom Sweeney (Red Hat, Inc.): The camera button.

392
00:45:44.060 --> 00:45:52.930
Martin Beckert: Yeah, that's nice. So, I asked two weeks ago in the Discord channel about the state of the Potlet repository.

393
00:45:53.070 --> 00:45:58.810
Martin Beckert: Because that lays in the containers organization, like Podman also does.

394
00:45:59.250 --> 00:46:13.249
Martin Beckert: And the problem is that Podlet has no maintainer since about a year, because the guy named Paul Nettleton isn't there anymore, and I don't know if that project will go any further within the next months.

395
00:46:13.250 --> 00:46:21.660
Martin Beckert: And, I really need a working partner, because I want to contribute some documentations, and I need it for my projects.

396
00:46:21.680 --> 00:46:23.629
Martin Beckert: And it's failing a lot.

397
00:46:24.260 --> 00:46:26.080
Martin Beckert: Alright, lots of haunt out.

398
00:46:26.450 --> 00:46:46.289
Martin Beckert: That's, yeah, one sentence… Potlet is failing, also because of two other projects that lay in the Paul Nettleton private repositories, and these ones need also to be updated, and so there are three projects not working currently, and therefore Podlet is failing all the time.

399
00:46:47.670 --> 00:46:50.379
Brent Baude: Hi, Martin. I talked to Paul today.

400
00:46:50.810 --> 00:46:52.430
Martin Beckert: Oh, interesting.

401
00:46:52.430 --> 00:46:55.559
Brent Baude: Yes, and he would love help.

402
00:46:56.540 --> 00:47:00.809
Brent Baude: And it's open to us, sort of, helping him get help.

403
00:47:01.870 --> 00:47:07.339
Brent Baude: As owners of the containers org. So… As far as…

404
00:47:07.830 --> 00:47:12.810
Brent Baude: you being able to help, I think that that would be just fine. We can arrange

405
00:47:13.050 --> 00:47:14.989
Brent Baude: This, if you'll…

406
00:47:15.460 --> 00:47:21.480
Brent Baude: work with me offline, I can begin to maybe give you some authority to be able to do

407
00:47:21.810 --> 00:47:28.490
Brent Baude: some things with the GitHub repo, and we'll get you going.

408
00:47:29.460 --> 00:47:45.010
Martin Beckert: Okay, so some words about me. I'm currently not a Rust developer, but I'm interested in doing some easy tasks in Rust, and I would like to contribute as a maintainer, not as the only one maintainer, but I would like to help out

409
00:47:45.150 --> 00:47:48.949
Martin Beckert: On that side, so maybe we get it on a few shoulders.

410
00:47:49.390 --> 00:47:53.179
Brent Baude: Yeah, I think you take the risk of… when you become…

411
00:47:53.370 --> 00:47:55.669
Brent Baude: Help or maintain, or you become…

412
00:47:56.170 --> 00:48:00.369
Brent Baude: The default maintainer, so there is risk that you become the maintainer.

413
00:48:00.370 --> 00:48:00.760
Martin Beckert: Hi, Anna.

414
00:48:00.760 --> 00:48:09.280
Brent Baude: Though you too can help recruit, you know, people, to come in and help as well, once you're part of the project.

415
00:48:09.360 --> 00:48:21.560
Brent Baude: So, I think on Discord, maybe not today, but, maybe tomorrow, you know, or sometime in… probably in the morning, once you're in Germany, my morning, your afternoon.

416
00:48:21.560 --> 00:48:24.810
Martin Beckert: We can work to get you added.

417
00:48:25.300 --> 00:48:28.360
Brent Baude: Or, Paul Holzinger, who's also in…

418
00:48:28.740 --> 00:48:33.500
Brent Baude: Germany could theoretically help you as well. I believe, Paul, you have admin on…

419
00:48:33.640 --> 00:48:35.360
Brent Baude: The Chainer's org, is that true?

420
00:48:36.980 --> 00:48:37.850
Paul Holzinger: Yes.

421
00:48:38.350 --> 00:48:39.780
Brent Baude: Okay, I will…

422
00:48:40.160 --> 00:48:50.519
Brent Baude: Paul, I'll copy you into the… my communication with the other Paul, and, just so you have that, and, you understand where he was coming from.

423
00:48:51.300 --> 00:48:57.580
Martin Beckert: Okay. Yeah. Yep. I will, have a chat in Discord with you tomorrow.

424
00:48:57.760 --> 00:49:07.909
Martin Beckert: With you, Paul, and let's see how we can introduce myself into the project so everyone has an idea who I am, and let's see if it works out.

425
00:49:09.210 --> 00:49:09.750
Brent Baude: Very well.

426
00:49:09.750 --> 00:49:10.550
Martin Beckert: Thanks a lot.

427
00:49:11.010 --> 00:49:12.590
Brent Baude: Thanks for bringing it up.

428
00:49:13.880 --> 00:49:17.900
Tom Sweeney (Red Hat, Inc.): Yeah, that's great. And Martin, let me know if I put in the wrong,

429
00:49:18.010 --> 00:49:22.319
Tom Sweeney (Red Hat, Inc.): project inside the chat there. I think it's public on containers?

430
00:49:22.320 --> 00:49:23.010
Martin Beckert: Perfect, yep.

431
00:49:23.010 --> 00:49:24.299
Tom Sweeney (Red Hat, Inc.): Yep, okay, great.

432
00:49:24.540 --> 00:49:26.890
Tom Sweeney (Red Hat, Inc.): And any other questions?

433
00:49:27.250 --> 00:49:28.240
Tom Sweeney (Red Hat, Inc.): Comments.

434
00:49:31.270 --> 00:49:40.579
Tom Sweeney (Red Hat, Inc.): People are thinking a little bit, I'll just do next meeting reminders. So the next Podman Community Meeting will be on Tuesday, February 3rd, again at 11 a.m.

435
00:49:40.820 --> 00:49:50.620
Tom Sweeney (Red Hat, Inc.): And the next available meeting will be Tuesday, January 6th, so a few days after the holidays, so everybody will be ready to… ready and roaring to go, I'm sure, by then.

436
00:49:50.970 --> 00:49:53.949
Tom Sweeney (Red Hat, Inc.): And one last call for questions, comments?

437
00:49:54.070 --> 00:49:56.250
Tom Sweeney (Red Hat, Inc.): And it's not… Yes, Mona.

438
00:49:56.500 --> 00:50:00.810
Mohan Boddu: Yeah, I'm gonna take the liberty here and, put Jesse on the spot.

439
00:50:00.960 --> 00:50:06.420
Mohan Boddu: Jesse, you were asking some questions, probably this is a great opportunity to ask your question.

440
00:50:07.170 --> 00:50:07.910
Mohan Boddu: I am.

441
00:50:09.120 --> 00:50:14.099
Jesse Taube (Umass Lowell): I don't really think that's an appropriate question for the whole meeting.

442
00:50:15.080 --> 00:50:15.700
Mohan Boddu: Okay.

443
00:50:17.660 --> 00:50:18.830
Tom Sweeney (Red Hat, Inc.): Dragoodle.

444
00:50:20.030 --> 00:50:26.990
Tom Sweeney (Red Hat, Inc.): Last chance. Otherwise, I'm going to say thanks, everybody, for attending, especially the folks who were presenting today, Steve and Matt.

445
00:50:27.720 --> 00:50:29.630
Tom Sweeney (Red Hat, Inc.): Everyone else?

446
00:50:31.350 --> 00:50:35.649
Tom Sweeney (Red Hat, Inc.): For the folks on the East Coast, time for lunch. For the folks over in Europe, enjoy your day.
```
