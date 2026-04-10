# Podman Community Meeting Notes
## April 7, 2026 11:00 a.m. Eastern (UTC-4)

### Attendees
Tom Sweeney, Martin Beckett, Kevin Clevenger, Gerald Seidman, Matt Heon, Dave Darrah, Nicola Sella, Suraj, Tim Zhou, Nalin Dahyabhai, Paul Holzinger, Brno, Ashley Cui, Laura Santamander, Giuseppe, Scrivano, Steve Ryan, Tomas, Miloslav, Simone, Jan Rodak, Mark Russell

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=wm8IB0GcAso)

Meeting start: 11:03 a.m. EDT (UTC-5)

#### Quick Recap

The Podman Community meeting on April 7th covered several key updates and discussions. Paul presented upcoming configuration changes in Podman 6, including unification of how different configuration files are parsed, with registry.conf still in development and expected completion in two weeks before RC1 release. Matt and Ashley reported on Podman's attendance at KubeCon two weeks prior, where they delivered two talks and participated in Project Pavilion discussions. Matt announced plans to open up development processes with more frequent, shorter weekly meetings replacing the current bi-monthly format, while maintaining core maintainers meetings as closed sessions. Martin shared updates about Flatcar OS's Podman extension lacking documentation and the recent release of Podlet 8. Steve provided a comprehensive update on the Materia project, highlighting new features including OCI image support, remote components, dynamic timeouts, and improved resource management capabilities, with plans for future rollbacks and expanded remote component systems.

#### Next Steps
    * Paul: Write documentation and a blog post detailing the Podman 6 config file changes, including migration instructions, expected in the next two weeks.
    * Matthew: Add more project meetings (including sprint demos) to the CNCF calendar within the next 2 weeks, with the goal of opening up more meetings to the community and moving to a more frequent, shorter meeting schedule.
    * Steve: Send presentation slides (including email contact) to Tom after the meeting.
    * Martin: Initiate documentation for Podman integration/extension in the Flatcar project on GitHub to help the community better use Podman with Flatcar.

### Topics

#### Podman 6.0 Configuration Notes - Paul Holzinger - ([00:32](https://www.youtube.com/watch?v=wm8IB0GcAso&t=32s) in the video)

Paul discussed the ongoing changes to Podman 6 config files, focusing on unifying the behavior of storage.conf, registry.conf, and containers.conf. He noted that containers.conf and storage.conf have been ported to the new logic, but there are current issues with using the main binary due to conflicts with old config files. Paul mentioned plans to write documentation and a blog post to guide users through the migration process, which should be completed in about two weeks when Podman 6 RC1 is released. Tom asked if there would be automation for these changes, to which Paul responded that a central documentation page would be created, with a separate blog post following later.

#### Kubecon Report - Matt Heon - ([05:48](https://www.youtube.com/watch?v=wm8IB0GcAso&t=348s) in the video)

The team discussed their recent attendance at KubeCon, where they gave two talks including one about Netavark work and another about containerizing AI workloads using Podman.

#### Meeting Cadence - Matt Heon - ([07:42](https://www.youtube.com/watch?v=wm8IB0GcAso&t=462s) in the video)

Matthew announced plans to open up the development process by making meetings more frequent and accessible, including opening sprint demo meetings to the community and transitioning to weekly, shorter, less formal meetings. The team also plans to improve recordings of core maintainers meetings for public access, with these changes expected to be implemented within the next two weeks.

#### Open discussion - ([11:06](https://www.youtube.com/watch?v=wm8IB0GcAso&t=666s) in the video)

Editors note.  No real discussion topics, but Martin Beckett and then Steve Ryan presented updates on their projects.

#### Flatpack and Podlets updates - Martin Beckett - ([11:06](https://www.youtube.com/watch?v=wm8IB0GcAso&t=666s) in the video)

Martin presented two topics: an update on the [Flatcar](https://www.flatcar.org) project, which now includes a Podman extension, and an update on the [Podlet](https://github.com/containers/podlet) project's recent release. 

#### Materia Updates - Steve Ryan - ([13:45](https://www.youtube.com/watch?v=wm8IB0GcAso&t=825s) in the video)

Steve presented ([Slides](./Materia-April2026.pdf)) an update on the [Materia](https://primamateria.systems/) Project, a GitOps tool for installing Podman Quadlets, highlighting new features including support for OCI images, remote components, setup/cleanup scripts, dynamic timeouts, and improved Podman resource management. He discussed upcoming plans to implement rollbacks and expand the remote component system, as well as his work on Athanor, a backup tool using Materia's packages. When asked about handling Docker Compose files, Steve explained that while Compose is outside Materia's direct scope, he has been experimenting with converting Compose files to Quadlet files for use with Materia.

Tom reviewed upcoming meeting dates, including a Podman community meeting on June 2nd and a Cabal meeting on May 5th. 

### Next Cabal Meeting: Tuesday, May 5, 2026, 11:00 a.m. EDT (UTC-5)

#### Possible Topics
 1. None Discussed.

### Next Community Meeting: Tuesday, June 2, 2026, 11:00 a.m. EST (UTC-5)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:31 a.m.

The first 6 minutes and 15 seconds of the meeting's recording were cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

### Raw Meeting Chat:

``` 
00:17:51	Martin Beckert:	https://www.flatcar.org/docs/latest/provisioning/sysext/#flatcar-release-extensions-official
00:18:01	Martin Beckert:	https://github.com/flatcar/Flatcar/issues/1663#issuecomment-4193264690
00:27:45	Tom Sweeney (Red Hat LLC):	June Topic?
00:28:58	Tom Sweeney (Red Hat LLC):	tsweeney@redhat.com for slides please.
00:29:06	Martin Beckert:	https://github.com/mikkovihonen/quadletman
00:31:27	Martin Beckert:	https://github.com/containers/podlet/issues/201
00:32:15	Gerald Seidman (AuriStor Inc.):	I didn't see Steve Ryan's email on the meeting ICS file, 

I may have a question later on.
Steve: Can you share your email so I can follow up directly
00:32:41	Gerald Seidman (AuriStor Inc.):	Thanks
00:33:17	Steve Ryan:	stryan@stryan.net @stryan:saintnet.tech on matrix!   
```

### Raw Zoom Meet Transcript

```
WEBVTT

1
00:01:19.320 --> 00:01:20.370
Tom Sweeney (Red Hat LLC): Little folks.

2
00:02:53.210 --> 00:02:57.419
Tom Sweeney (Red Hat LLC): We'll be starting the meeting in a minute or two here. I'm just waiting for other folks to join on.

3
00:03:01.370 --> 00:03:04.329
Martin Beckert: Yeah, not sure where all the people are today.

4
00:03:05.100 --> 00:03:07.449
Martin Beckert: Only for at the moment? What's going on?

5
00:03:07.910 --> 00:03:08.650
Tom Sweeney (Red Hat LLC): Yeah, we.

6
00:03:08.650 --> 00:03:09.350
Martin Beckert: today?

7
00:03:10.250 --> 00:03:20.949
Tom Sweeney (Red Hat LLC): We had a… well, A, a lot of the folks from Europe had a holiday just before this, and our team just had a group meeting to go through priorities for the next quarter.

8
00:03:20.950 --> 00:03:22.050
Martin Beckert: Yeah, okay.

9
00:03:22.680 --> 00:03:28.280
Tom Sweeney (Red Hat LLC): So we're scrambling to get out of that one and into this one, so… suspecting they'll be coming back up.

10
00:03:42.310 --> 00:03:46.940
Tom Sweeney (Red Hat LLC): And I cannot find… Great thing to share

11
00:04:09.710 --> 00:04:10.740
Tom Sweeney (Red Hat LLC): Here we go.

12
00:04:17.250 --> 00:04:20.970
Tom Sweeney (Red Hat LLC): Books, I'm just gonna give it to, 1102 before we start up.

13
00:05:03.470 --> 00:05:04.210
Kevin Clevenger: Nope.

14
00:05:05.560 --> 00:05:09.340
Tom Sweeney (Red Hat LLC): Welcome, folks, to the bottom media. Just got one more moment here.

15
00:05:10.140 --> 00:05:12.000
Tom Sweeney (Red Hat LLC): I still see people coming in.

16
00:05:41.360 --> 00:05:42.310
Tom Sweeney (Red Hat LLC): We'll see ya.

17
00:05:43.090 --> 00:05:47.459
Tom Sweeney (Red Hat LLC): Matter here, but it's… We're gonna be talking a little bit.

18
00:05:53.980 --> 00:06:15.750
Tom Sweeney (Red Hat LLC): Alrighty. It is 3 past, so I'm going to start up, and it looks like we're starting to slow down as far as the number of people coming in. So, welcome folks to the Padman Community Meeting. Today is April 7th, 2026. We don't have a whole lot on the calendar, or not on the calendar, but on the agenda today, so if you have topics, we'd love to have them, or if you have just some open-ended questions, that'd be great as well.

19
00:06:15.770 --> 00:06:28.260
Tom Sweeney (Red Hat LLC): I will ask that if you are talking at some point during the meeting, that you go ahead and put your video on, if at all possible. If it's not possible to sweat it too much, but if you can just turn it on, it makes it better for the video recording after the fact.

20
00:06:29.410 --> 00:06:31.990
Tom Sweeney (Red Hat LLC): with that, I'm going to,

21
00:06:32.400 --> 00:06:35.930
Tom Sweeney (Red Hat LLC): Ask Paul, could you start out with the configuration changes that are coming up?

22
00:06:39.910 --> 00:06:41.020
Paul Holzinger: Okay.

23
00:06:42.310 --> 00:06:46.940
Paul Holzinger: Yeah, I don't have anything prepared, but we can talk a bit about the…

24
00:06:47.570 --> 00:06:54.269
Paul Holzinger: appointment 6 config file changes that I have been working on over the past, months already.

25
00:06:54.970 --> 00:07:07.640
Paul Holzinger: So we are gonna change in the… Ray, we have… Parse, storage.conf, registry.conf, containers.conf, a registry duty.

26
00:07:07.810 --> 00:07:13.250
Paul Holzinger: policy.json, and the search.d directory.

27
00:07:13.730 --> 00:07:16.949
Paul Holzinger: And the main goal is just unification.

28
00:07:17.430 --> 00:07:24.969
Paul Holzinger: Of these behaviors, if you have used Portman with, And set custom config files.

29
00:07:25.290 --> 00:07:28.949
Paul Holzinger: then you are probably aware that the starch.confident.

30
00:07:29.500 --> 00:07:32.139
Paul Holzinger: Registry.conf and containers.conf all.

31
00:07:32.410 --> 00:07:35.979
Paul Holzinger: Did some things differently, so the good news there is

32
00:07:36.240 --> 00:07:38.840
Paul Holzinger: That will no longer be the case.

33
00:07:39.560 --> 00:07:43.850
Paul Holzinger: And you will have a… hopefully well-defined.

34
00:07:44.630 --> 00:07:47.500
Paul Holzinger: ordering.

35
00:07:47.670 --> 00:07:56.920
Paul Holzinger: how this works, and, like, if you know how storage.con works, you should pretty much be able to understand data files as well, and don't need to second-guess.

36
00:07:58.090 --> 00:07:59.300
Paul Holzinger: everything.

37
00:08:00.030 --> 00:08:08.170
Paul Holzinger: Yeah, so far, containers.conf has been ported to the new logic, storage.conf has been ported.

38
00:08:08.450 --> 00:08:15.479
Paul Holzinger: There's one thing to point out for developers or users compiling Portman from main.

39
00:08:15.860 --> 00:08:20.790
Paul Holzinger: If you use… The current binary, from main.

40
00:08:21.200 --> 00:08:25.469
Paul Holzinger: The… since it uses the new starts.conf logic.

41
00:08:26.000 --> 00:08:45.050
Paul Holzinger: It… there's a conflict with the old, config file that Potman 5.8 is using, so it will fail. The rootless Potman will fail because it reached the graph root and run root values out of the config file, and they are hard-coded to Barnab containers, and…

42
00:08:45.360 --> 00:08:47.970
Paul Holzinger: Run containers, respectively.

43
00:08:48.250 --> 00:08:52.959
Paul Holzinger: So you will get, permission errors, that might look a bit weird.

44
00:08:53.380 --> 00:08:59.659
Paul Holzinger: If you encounter that, but the fix is quite simple. You pretty much need to either delete the…

45
00:09:00.160 --> 00:09:11.890
Paul Holzinger: OHStorage.conf file that is on your system, or you can shadow… overshadow it by creating the ETC container storage.confile with just an empty file, basically.

46
00:09:12.400 --> 00:09:14.379
Paul Holzinger: Or, exactly an empty file.

47
00:09:14.660 --> 00:09:16.689
Paul Holzinger: And then it will work again.

48
00:09:17.410 --> 00:09:24.729
Paul Holzinger: So it's… This is, like, just something to be aware of if you're… Using Portman from Maine.

49
00:09:24.910 --> 00:09:30.470
Paul Holzinger: Once 0.16 is released, all the packaging, with the config files and everything will take care of.

50
00:09:31.320 --> 00:09:32.860
Paul Holzinger: Moving stuff around.

51
00:09:33.320 --> 00:09:35.330
Paul Holzinger: So that will…

52
00:09:36.300 --> 00:09:45.980
Paul Holzinger: Users shouldn't really see that if they use packaged versions. Unless, of course, they have manually edited storage.conf with some of these values, then they might encounter that, but…

53
00:09:46.430 --> 00:09:54.510
Paul Holzinger: I will… We'll write some documentation and some blog posts about these changes in detail, and then…

54
00:09:54.790 --> 00:09:55.979
Paul Holzinger: Should be sung.

55
00:09:57.530 --> 00:10:02.819
Paul Holzinger: Instructions what to do, how to move these things, to the new…

56
00:10:03.450 --> 00:10:08.240
Paul Holzinger: To make it work with the new, with the new logic.

57
00:10:09.240 --> 00:10:10.950
Paul Holzinger: on… yep.

58
00:10:11.290 --> 00:10:16.310
Paul Holzinger: So far, we are still… or I'm still working on registry.conf, but yeah.

59
00:10:17.040 --> 00:10:20.769
Paul Holzinger: Progresses happening there, and should be.

60
00:10:21.570 --> 00:10:26.880
Paul Holzinger: Done, hopefully in two weeks, when we want to start cutting, potmen.

61
00:10:27.150 --> 00:10:28.730
Paul Holzinger: 6RC1.

62
00:10:30.700 --> 00:10:33.320
Paul Holzinger: That's basically about it.

63
00:10:42.440 --> 00:10:43.869
Tom Sweeney (Red Hat LLC): Any questions for Paul?

64
00:10:55.750 --> 00:11:02.909
Tom Sweeney (Red Hat LLC): Alright, Paul, I just had a quick one. Is there gonna be any automation provided for this, for these kind of changes, or is it going to be just guides?

65
00:11:06.040 --> 00:11:12.990
Paul Holzinger: So far, basically, since currently each file sort of did it differently, my…

66
00:11:13.600 --> 00:11:16.850
Paul Holzinger: The current plan is to have a single main page.

67
00:11:17.510 --> 00:11:26.559
Paul Holzinger: that describes the new logic, and that then applies to all the different files. So that should be the central documentation.

68
00:11:27.340 --> 00:11:31.649
Paul Holzinger: As part of, like, migration and stuff, there will also be a blog post,

69
00:11:32.260 --> 00:11:33.770
Paul Holzinger: But that might take a bit.

70
00:11:34.060 --> 00:11:37.390
Paul Holzinger: Longer than the two weeks of development to write.

71
00:11:40.860 --> 00:11:41.670
Tom Sweeney (Red Hat LLC): Good grief.

72
00:11:43.300 --> 00:11:45.339
Tom Sweeney (Red Hat LLC): Last call for questions for Paul on this.

73
00:11:49.140 --> 00:11:55.619
Tom Sweeney (Red Hat LLC): Okay, then, Matt, do you want to hop in with the KubeCon report? And Ashley, too, if you have anything to add, or anybody else who's there?

74
00:11:58.500 --> 00:12:09.639
Matthew Heon (Red Hat LLC): Sure, so… excuse me. This one will hopefully be pretty quick. So, Podman was in attendance at KubeCon two weeks ago?

75
00:12:10.410 --> 00:12:11.739
Matthew Heon (Red Hat LLC): Can you hear me, Tom?

76
00:12:12.300 --> 00:12:14.250
Tom Sweeney (Red Hat LLC): Yep. Okay.

77
00:12:14.250 --> 00:12:14.880
Matthew Heon (Red Hat LLC): Excellent.

78
00:12:15.210 --> 00:12:21.030
Matthew Heon (Red Hat LLC): Alright, so, we were in attendance at KubeCon, we gave two talks,

79
00:12:21.360 --> 00:12:37.720
Matthew Heon (Red Hat LLC): One on some recent work that's been going on in Netavark that an intern had been doing, and one by Ashley about containerizing AI workloads using Podman, Rambalama, and then eventually converted over to Minikube.

80
00:12:37.790 --> 00:12:42.560
Matthew Heon (Red Hat LLC): And we were also in attendance at the, Project Pavilion. So…

81
00:12:42.740 --> 00:12:55.699
Matthew Heon (Red Hat LLC): Those talks should be coming up on YouTube relatively quickly, somewhere within the next week, I think they're gonna publish the things, so people will be able to view them if they weren't at the event.

82
00:12:55.700 --> 00:13:10.449
Matthew Heon (Red Hat LLC): I'll say that it was great seeing everyone who was there, and we got some good pointers on moving forward within the CNCF, so hopefully you'll see us making some strides towards incubating in the CNCF soon.

83
00:13:11.490 --> 00:13:13.980
Matthew Heon (Red Hat LLC): Ashley, anything you wanted to add to that, or…

84
00:13:14.990 --> 00:13:22.660
Ashley Cui: Nothing in particular, but yeah, it was great seeing, like, the community face-to-face, so…

85
00:13:22.800 --> 00:13:24.059
Ashley Cui: It was a good time.

86
00:13:32.100 --> 00:13:34.269
Tom Sweeney (Red Hat LLC): Alright, any questions or anybody else want to add?

87
00:13:41.180 --> 00:13:48.100
Tom Sweeney (Red Hat LLC): Nope. Okay. Matt, we have the third topic for the open meetings. Did you want to discuss that a little bit?

88
00:13:48.330 --> 00:13:50.319
Matthew Heon (Red Hat LLC): Yeah, sure.

89
00:13:50.400 --> 00:14:08.479
Matthew Heon (Red Hat LLC): So, as part of our evolution within the CNCF, we are going to be trying to open up the development process more. We've been running these community meetings and also the community cabal, as you might be familiar with for years at this point, I want to say, probably at least 3-4 years.

90
00:14:08.630 --> 00:14:10.850
Matthew Heon (Red Hat LLC): But we are…

91
00:14:11.080 --> 00:14:26.049
Matthew Heon (Red Hat LLC): we're not really feeling like we're getting as much community involvement and development as we'd really like. So, what I think is definitely gonna happen is, one, we're gonna open up, more of our meetings. Right now, for example, we have…

92
00:14:26.240 --> 00:14:39.420
Matthew Heon (Red Hat LLC): I think once monthly Sprint demo meetings. We're gonna open those up to the whole community, so anyone who wants to can submit demos, and we'll have recordings of those, if you can't make them in person, obviously, but yeah.

93
00:14:39.690 --> 00:14:58.880
Matthew Heon (Red Hat LLC): One, Sprint demos are gonna be happening. Two, we're also going to be trying to move over to more frequent, but shorter meetings. So right now, we have these big community meetings once every two months, taking a full hour, topic submitted in advance, etc, etc.

94
00:14:58.940 --> 00:15:12.530
Matthew Heon (Red Hat LLC): What we're trying to move over to is a model that we've seen other projects have success with, where we have much more frequent weekly meetings, but much shorter, half hour blocked off, but they could end after 15 minutes.

95
00:15:12.530 --> 00:15:24.989
Matthew Heon (Red Hat LLC): And they're going to be much less formal. There'll be an agenda, but a lot of it will be people dropping in if they need help with PRs, could be developers just discussing things, like, design discussions.

96
00:15:25.030 --> 00:15:34.130
Matthew Heon (Red Hat LLC): So, generally speaking, I think we're going to try and move away from these very infrequent formal meetings. We might still have some, but we're gonna…

97
00:15:34.450 --> 00:15:42.329
Matthew Heon (Red Hat LLC): We're gonna have a lot more frequent and a lot more open meetings, and try and do more of our discussion in the open during them.

98
00:15:43.820 --> 00:16:03.289
Matthew Heon (Red Hat LLC): We're also… we have a core maintainers meeting as well, where all of the core pod man and build a Scopio maintainers get together and discuss topics of import for the project. Those are currently not open to the public, and we're not planning on changing that, but we're going to get better about doing recordings about those.

99
00:16:03.290 --> 00:16:06.310
Matthew Heon (Red Hat LLC): Having, the ability to view them after the fact.

100
00:16:13.610 --> 00:16:27.850
Matthew Heon (Red Hat LLC): Alright, that's about it for our current plans. I don't know exactly when this is gonna roll out. I would expect us to start putting a lot more stuff on our CNCF calendar within the next two weeks. I don't know…

101
00:16:27.850 --> 00:16:38.650
Matthew Heon (Red Hat LLC): what exact formula is it going to take? Like, are we going to immediately open the Sprint demos, or is that going to take a couple more weeks? I don't know, but I would expect the more frequent meetings to start appearing relatively quickly.

102
00:16:49.900 --> 00:16:50.780
Tom Sweeney (Red Hat LLC): Sounds great.

103
00:16:50.980 --> 00:16:53.330
Tom Sweeney (Red Hat LLC): Anybody else have any questions or comments?

104
00:17:03.990 --> 00:17:05.510
Tom Sweeney (Red Hat LLC): Quite a bunch today.

105
00:17:07.260 --> 00:17:10.609
Tom Sweeney (Red Hat LLC): Alright, that's all the formal topics that we had today, we didn't have a whole lot.

106
00:17:10.790 --> 00:17:16.899
Tom Sweeney (Red Hat LLC): So I'm gonna go ahead at this point in time, open it up to any questions or comments.

107
00:17:17.240 --> 00:17:19.600
Tom Sweeney (Red Hat LLC): That people have, or would like to make.

108
00:17:21.139 --> 00:17:23.699
Martin Beckert: Yes, I have two small topics for today.

109
00:17:24.349 --> 00:17:24.969
Tom Sweeney (Red Hat LLC): Sure.

110
00:17:25.260 --> 00:17:39.199
Martin Beckert: So the first one is about the FlatCar project. For everyone who doesn't know, FlatCar is backed by the CNCF, and it's an operating system specifically for the usage with containers, and they have some extensions.

111
00:17:39.210 --> 00:17:46.900
Martin Beckert: And these extensions, are, for example, for Container D or Docker, but they also have an extension for Podman.

112
00:17:47.200 --> 00:17:48.380
Martin Beckert: Currently.

113
00:17:48.790 --> 00:18:05.439
Martin Beckert: you can see it over here. They don't have a documentation for the Podman integration, or Podman extension, but there's an open issue on GitHub, and I poked the contributor, and he said he will edit this week.

114
00:18:05.760 --> 00:18:10.569
Martin Beckert: So hopefully the community can better use Podman with the flat car project.

115
00:18:10.750 --> 00:18:15.760
Martin Beckert: So I will keep an eye on that, and will tell you if there's any progress about that.

116
00:18:18.100 --> 00:18:18.550
Tom Sweeney (Red Hat LLC): Awesome.

117
00:18:18.550 --> 00:18:19.330
Martin Beckert: anti…

118
00:18:19.750 --> 00:18:28.000
Martin Beckert: The second topic is about the Podlet project. We are… in the last, release, we had,

119
00:18:28.570 --> 00:18:42.169
Martin Beckert: our podlet was, compatible with Podeman 5.0, 5.3, and, we currently try to establish the next version 5.8.

120
00:18:42.170 --> 00:18:50.570
Martin Beckert: And until the end of April, we want to release another version of Podl, so hopefully everyone can get,

121
00:18:50.570 --> 00:18:59.089
Martin Beckert: Podman 5.8 and also Podlet on the same system, and everything should hopefully work well.

122
00:19:00.380 --> 00:19:01.579
Martin Beckert: Yep, that's it.

123
00:19:03.540 --> 00:19:04.210
Tom Sweeney (Red Hat LLC): Okay.

124
00:19:04.720 --> 00:19:06.550
Tom Sweeney (Red Hat LLC): Any questions for Mark on this?

125
00:19:10.860 --> 00:19:14.869
Tom Sweeney (Red Hat LLC): Okay, and any other questions that folks might have, or comments?

126
00:19:16.080 --> 00:19:32.070
Tom Sweeney (Red Hat LLC): While you're thinking about that, I'll just go over quickly the dates that we have currently, with the revisit that it might change as we go on down, and we'll notify you if it does. But currently, we have a meeting for June 2nd for the Podman Community meeting, 11 o'clock Eastern again, UTC 4.

127
00:19:32.070 --> 00:19:38.710
Tom Sweeney (Red Hat LLC): And then, our next Cabal meeting is scheduled for May 5th, also on a Tuesday, and at the same time.

128
00:19:41.720 --> 00:19:44.529
Tom Sweeney (Red Hat LLC): Last call. For questions, comments?

129
00:19:46.480 --> 00:19:54.219
Steve Ryan: I've got a, I've got an update on the Materia project. I don't know if… got a few, you know, quick two slides for that. I don't know if,

130
00:19:54.760 --> 00:19:57.239
Steve Ryan: Could do that now, or save it for June.

131
00:19:57.560 --> 00:20:02.050
Tom Sweeney (Red Hat LLC): No, this sounds like a good time. If you have the slides and you're ready to go, go for it.

132
00:20:02.050 --> 00:20:06.990
Steve Ryan: Cool! Yeah, let me, quickly change the name to Spring Update.

133
00:20:07.310 --> 00:20:13.849
Steve Ryan: And, alright, let me share my screen.

134
00:20:23.360 --> 00:20:24.110
Steve Ryan: Great.

135
00:20:25.420 --> 00:20:28.200
Steve Ryan: Does everyone see my screen, and also me?

136
00:20:30.270 --> 00:20:31.910
Tom Sweeney (Red Hat LLC): Yes, both are working great. Thank you.

137
00:20:31.910 --> 00:20:32.480
Dave Darrah: Yep.

138
00:20:32.760 --> 00:20:37.860
Steve Ryan: Great, a lot easier than last time I did this. Alright.

139
00:20:40.010 --> 00:20:43.749
Steve Ryan: Where's the bloody… starts… there we go.

140
00:20:44.250 --> 00:21:02.049
Steve Ryan: Yeah, so this is… so, hi, yeah, I'm, Steve Ryan. A few months ago, I presented the Materia Project, which is a, it's a GitOps tool for installing Podman Quadlets. This is just a brief summary for anyone who hasn't heard of it or didn't see it.

141
00:21:03.290 --> 00:21:12.960
Steve Ryan: quick… quick overview, it's… yeah, it's a GitOps continuous deployment tool. It sits on the server, pings a,

142
00:21:13.250 --> 00:21:31.410
Steve Ryan: well, usually a Git repository, but a few other sources for what quadlets and data files are supposed to be assigned to the host, and it installs the quadlets, removes them, updates them, it has a templating language, and it starts up any services required by them, you know.

143
00:21:31.410 --> 00:21:38.229
Steve Ryan: Obviously, the containers themselves, but also any other defined system D targets, timers,

144
00:21:38.910 --> 00:21:46.669
Steve Ryan: Yeah, yeah, any of that. And it, it can also now handle… Cleaning up… Or either,

145
00:21:47.120 --> 00:21:53.410
Steve Ryan: ensuring assisted podlet resources, or pod main resources are on the host, or cleaning them up once they're done.

146
00:21:53.820 --> 00:21:55.790
Steve Ryan: But yeah, so this is…

147
00:21:56.550 --> 00:21:59.020
Steve Ryan: I believe back in December, I,

148
00:21:59.950 --> 00:22:03.099
Steve Ryan: I just kind of demonstrated, version 4.

149
00:22:03.330 --> 00:22:11.169
Steve Ryan: 2, I believe, was what was out. We're now up to 6.3. So, a few, few updates I just wanted to…

150
00:22:11.660 --> 00:22:14.689
Steve Ryan: talk about it a little bit. The biggest one is…

151
00:22:14.820 --> 00:22:28.000
Steve Ryan: Thanks to a community edition, Materia can now use OCI images as its source repository. I guess there's a couple people out there using Nix with this, and are generating their…

152
00:22:28.750 --> 00:22:39.529
Steve Ryan: component repositories as OCI images, and installing them like that, I think that's really cool. Nix, you know, scares me, but it's,

153
00:22:40.100 --> 00:22:53.320
Steve Ryan: I know people are doing cool stuff with it, but but anyway, so you can now, basically describe your entire, like, state of quadlit objects, store in OCI image, and Materia will take it down, or pull it down, and…

154
00:22:53.450 --> 00:23:06.409
Steve Ryan: you know, install it as needed. And, Materia also supports, what's called remote components, so, you know, similar to Ansible roles, puppet modules, you know, any type of…

155
00:23:06.550 --> 00:23:09.099
Steve Ryan: configuration package,

156
00:23:09.190 --> 00:23:27.549
Steve Ryan: And those can… are defined the same way as repositories, so you can now also package a individual service as quadlets in an OCI image. And since Materia also supports build objects, you can also build that object with Materia to be used by Materia.

157
00:23:27.830 --> 00:23:30.819
Steve Ryan: In a really, sort of, arboros loop.

158
00:23:30.970 --> 00:23:35.890
Steve Ryan: I don't think anyone's doing that yet, but I hope someone does. I might, if no one does.

159
00:23:36.240 --> 00:23:37.999
Steve Ryan: Second, it's…

160
00:23:38.860 --> 00:23:48.310
Steve Ryan: Since Materia now uses SystemD one-shot transient units to run what's called setup and cleanup scripts, so occasionally, you know, you're…

161
00:23:48.310 --> 00:23:59.089
Steve Ryan: you, you know, you're installing an application that's defined as quadlets, but you need to do some type of setup or teardown. I always think of the, Gideo or Forjo

162
00:23:59.090 --> 00:24:11.929
Steve Ryan: you know, requires you to set up the git user on the host, regardless if you do it in container or not. Well, Materia supports that with setup and cleanup scripts, and those are now properly contained within SystemDunits, which…

163
00:24:12.180 --> 00:24:14.290
Steve Ryan: I thought was cool.

164
00:24:14.650 --> 00:24:30.119
Steve Ryan: It now also supports dynamic timeouts, so if you have a container that's built off another image or build unit quadlet on the host, Materia will take that into account when waiting for it to start up and adjust the timeouts accordingly. You can…

165
00:24:30.140 --> 00:24:35.850
Steve Ryan: It'll, you know, just give it some extra space… extra time in general, but you can also manually define the timeouts.

166
00:24:36.020 --> 00:24:40.290
Steve Ryan: If for some reason you know an image is going to be huge or something.

167
00:24:40.800 --> 00:24:43.670
Steve Ryan: It now… originally, it's,

168
00:24:44.110 --> 00:24:49.410
Steve Ryan: just handled the actual quality files, now Materia will

169
00:24:50.090 --> 00:25:03.140
Steve Ryan: actually ensure it'll, A, clean up Podman resources if desired once the quadlet is gone, because deleting the quadlet doesn't delete the Podman resource, and it can also, ensure that

170
00:25:03.300 --> 00:25:12.140
Steve Ryan: That was supposed to be on there. It'll actually also ensure that Podman resources are created independent of the system D unit. For example, if you start a…

171
00:25:12.260 --> 00:25:23.580
Steve Ryan: volume quadlet, the System D unit will only ensure that that volume is created, and then it's a one-shot unit, so it'll just exist there as, oh, you have created the volume at some point.

172
00:25:23.730 --> 00:25:36.689
Steve Ryan: Sometimes you might, you know, add and remove volumes at a rapid pace, SystemD might not be up to date, and it will say that, oh yeah, the volume service is run, that volume is created, don't worry about it, and there's no volume.

173
00:25:36.690 --> 00:25:44.350
Steve Ryan: Materia now handles that situation and will make sure that volumes, networks, etc. are actually on the host.

174
00:25:44.440 --> 00:25:52.730
Steve Ryan: no matter what SystemD says. And then finally, just a… more of a fun thing, I've been following the,

175
00:25:53.160 --> 00:26:11.309
Steve Ryan: the quadlet command, and the quadlets file, and stuff like that, and I thought it's neat, and so now Materia can actually also understand, A, understand Quadlets files, and will expand it itself, so you can… This is configurable if you want to just pass it through, but

176
00:26:11.620 --> 00:26:27.450
Steve Ryan: So you can use quadlit files, and it will also generate the podman quadlit command style.app files, in case peop- you know, you want to install it through Materia, but also still list and remove it through the Podman Quadlit command.

177
00:26:27.890 --> 00:26:31.660
Steve Ryan: These are all independent… done independently of the…

178
00:26:31.800 --> 00:26:37.410
Steve Ryan: Podman binding, so for a brief period, Materia supported the Quadlits file before Podman did, which…

179
00:26:37.570 --> 00:26:40.190
Steve Ryan: I was… amused me.

180
00:26:41.180 --> 00:26:54.520
Steve Ryan: And then just, what's, you know, what's coming up? Biggest thing is a few people have talked to me about implementing rollbacks, and, similar to what Podman Auto Update does with the health check, but…

181
00:26:54.630 --> 00:26:58.850
Steve Ryan: since we have… since Materia knows the entire state of it, it can, you know.

182
00:26:59.080 --> 00:27:05.590
Steve Ryan: apply a git rollback or stuff like that, so hopefully Materia could be sort of self-healing there.

183
00:27:05.810 --> 00:27:21.550
Steve Ryan: I want to expand the remote component system. Like I said, some people are using it as… they're generating OCI images of these components, these collection of quadlet files, and I want to, you know, create some type of registry for that.

184
00:27:22.400 --> 00:27:42.099
Steve Ryan: other projects using the materia base, I've actually been working on, something called Athenor, which I decided not to present today, A, and K, it's still a little rough around the edges, and B, it's… most of the fun stuff of that isn't directly Podman-related, but Athenor is a backup tool. It uses the…

185
00:27:42.510 --> 00:27:52.840
Steve Ryan: materias, publicized packages to… Plan out and handle dumping and importing volumes, so it will know to,

186
00:27:53.160 --> 00:28:11.549
Steve Ryan: stop the containers, dump the volume, then restart the stop containers, and whatever else to find. And then finally, I'm looking for, I'm very jealous of the, the Orcus project's, very nice logo, and I want Materia to have a, a nice logo like that, but…

187
00:28:11.590 --> 00:28:15.330
Steve Ryan: There's no artistic bone in my body, so that's a little on the…

188
00:28:16.660 --> 00:28:19.999
Steve Ryan: Lower priority, but… looking for that.

189
00:28:20.500 --> 00:28:24.730
Steve Ryan: And, yeah, that's all I got, just to…

190
00:28:25.140 --> 00:28:29.399
Steve Ryan: Wanted to give a quick update, since some people were interested back in December.

191
00:28:30.060 --> 00:28:31.490
Steve Ryan: Any questions?

192
00:28:33.080 --> 00:28:40.850
Tom Sweeney (Red Hat LLC): Not for me, but thanks for bringing this up and doing the presentation today. If you could send me your slides later.

193
00:28:40.850 --> 00:28:41.430
Steve Ryan: Yeah.

194
00:28:42.200 --> 00:28:45.780
Tom Sweeney (Red Hat LLC): Steve, I'd appreciate it, and opening it up to questions for anybody else.

195
00:28:46.030 --> 00:29:04.870
Martin Beckert: Yes, two questions. The first one, or at least I want to say, thank you for that, because I really want to try that with, flat car in the future. That being said, do you know that there's another project that, tries to achieve the same thing you already… so you're also doing here?

196
00:29:04.910 --> 00:29:19.629
Martin Beckert: Maybe you want to have a talk with that guy, it's the project coordinate man, so, let's see, how… how you also implement the features like he does, and so on, so, nice contribution, at least.

197
00:29:19.820 --> 00:29:22.870
Martin Beckert: Let's see how it's, going on in the future.

198
00:29:22.980 --> 00:29:41.039
Martin Beckert: with both projects. And the second one is, how do you handle, Compose files? So, if someone uses a Compose.yaml file from another project and he wants to integrate that with Spotman, do you have something to convert it, or do you want to convert that in the future to quadlets?

199
00:29:42.930 --> 00:29:55.020
Steve Ryan: Yeah, so, yeah, thanks for the question. It's funny… yeah, I actually… so, Compose files, I think, are out of the direct spec for Materia,

200
00:29:55.290 --> 00:30:05.030
Steve Ryan: I think, you know, Compose is a, it's a good format, and it deserves, you know, its own ecosystem. I actually do personally use…

201
00:30:05.260 --> 00:30:08.659
Steve Ryan: I've been playing around with Podlet to…

202
00:30:08.830 --> 00:30:19.470
Steve Ryan: convert a Compose file into Quadlit files, and then compress them into a single .quadlets file, and then use Materia to install it, like, to kind of…

203
00:30:19.660 --> 00:30:24.050
Steve Ryan: work as a pseudo-quadlit native Compose.

204
00:30:24.410 --> 00:30:30.129
Steve Ryan: I don't really know how useful it is, but that's what, that's what I've been doing.

205
00:30:30.570 --> 00:30:35.880
Steve Ryan: But yeah, I think… I think it is, I prefer to…

206
00:30:36.280 --> 00:30:42.080
Steve Ryan: Personally, I think it can pose as a develop… more development tool, so it's… and Materia is more for the actual…

207
00:30:42.260 --> 00:30:44.809
Steve Ryan: You know, deployment level, so it's,

208
00:30:44.990 --> 00:30:49.970
Steve Ryan: Not as… it's out of scope, I'm… I've got ideas in the future, but nothing…

209
00:30:50.370 --> 00:30:56.309
Steve Ryan: for, separate tools using the materia baseline, similar to that Athenor, the backup tool, but…

210
00:30:56.430 --> 00:31:04.549
Steve Ryan: Nothing concrete. And I did actually… I did see that other project, I am… I am keeping an eye on. There's… there's a lot of projects out there that…

211
00:31:04.880 --> 00:31:10.040
Steve Ryan: We're all trying to solve the quadlet system our own ways, which I think is neat.

212
00:31:10.400 --> 00:31:11.380
Martin Beckert: Yeah, quick.

213
00:31:11.380 --> 00:31:32.139
Martin Beckert: due to the fact that I'm working on the Potlet project, the maintainer and core developer is Paul Nettleton, and he also wants to create a library of the Potlet projects that can be integrated into other projects, so maybe keep an eye on this issue and the other issue of number 20.

214
00:31:32.140 --> 00:31:43.289
Martin Beckert: Because maybe in the near future, we will release a library, and if you want to, you can use that, so you can also create quadlet files out of Compose files.

215
00:31:43.310 --> 00:31:54.290
Martin Beckert: So maybe that's an easy way to get your projects even, on track for other users that want to use Docker Compose files and so on.

216
00:31:55.800 --> 00:31:59.889
Steve Ryan: Yeah, that's… that's great. Yeah, I will definitely take a look at that.

217
00:32:00.900 --> 00:32:01.929
Steve Ryan: Yeah, cool.

218
00:32:02.860 --> 00:32:03.420
Martin Beckert: Group.

219
00:32:07.250 --> 00:32:09.360
Tom Sweeney (Red Hat LLC): Great, any other questions or comments for Steve?

220
00:32:13.090 --> 00:32:18.860
Tom Sweeney (Red Hat LLC): And ready? Then one last call for any questions or comments in the period.

221
00:32:21.630 --> 00:32:27.350
Tom Sweeney (Red Hat LLC): Oh, Steve, you're being asked if you could share your email, or if you want to send it to me, and I can forward it along to Gerald.

222
00:32:28.360 --> 00:32:29.070
Tom Sweeney (Red Hat LLC): If you…

223
00:32:29.070 --> 00:32:31.849
Steve Ryan: Oh, yeah, sure, I'll,

224
00:32:32.570 --> 00:32:38.629
Steve Ryan: Yeah, I'll drop it in the chat, and I'll also send the slides and tag my email onto it when I do so.

225
00:32:38.630 --> 00:32:44.189
Tom Sweeney (Red Hat LLC): ask if you could put your email somewhere on the slide so people can get ahold of you, that'd be awesome.

226
00:32:44.390 --> 00:32:50.519
Martin Beckert: And last question, do you also use Discord, so we can reach out on you over there?

227
00:32:52.340 --> 00:32:58.339
Steve Ryan: Oh, yeah, I'm in, I'm in Discord, I'm in the, I'm also in the Podman, Matrix chat.

228
00:32:58.340 --> 00:33:03.180
Martin Beckert: So, maybe you can say hello again, so we can see your name over there? That would be great.

229
00:33:03.640 --> 00:33:05.010
Steve Ryan: Yep, sounds good.

230
00:33:07.000 --> 00:33:07.650
Tom Sweeney (Red Hat LLC): Ricky.

231
00:33:10.120 --> 00:33:15.709
Tom Sweeney (Red Hat LLC): One last call, otherwise I'm going to say, off to lunch and or dinner, depending on where you're at.

232
00:33:18.670 --> 00:33:21.399
Tom Sweeney (Red Hat LLC): Right, folks, that's it for today. Thanks so much.

```
