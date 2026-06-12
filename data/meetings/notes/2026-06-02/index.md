# Podman Community Meeting Notes
## June 2, 2026 11:00 a.m. Eastern (UTC-4)

### Attendees
TomSweeney, Kevin Clevenger, Nalin Dahyabhai, Miloslav Trmac, Matt Heon, Martin Beckert, Neils Smith, Lokesh Madvekhar, Nicola Sella, Ashley Cui, Paul Holzinger, Simon Brauner, Marek Simek, Jan Roday 

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=d0XEeePqzag)

Meeting start: 11:03 a.m. EDT (UTC-5)

#### Quick Recap
The Podman Community Meeting focused on the migration of GitHub repositories to CNCF ownership and the transition to GitHub Actions for CI. Matthew explained that Podman, Buildah, and Skopeo have been moved to the new "podman-container-tool" organization under CNCF, along with core container libraries and other related projects. The team discussed how GitHub automatically redirects users to the new repository locations, though it's recommended to update to the new URLs. Paul then demonstrated the new GitHub Actions-based CI system, showing how tests run in VMs with a similar testing matrix to the previous CirrusCI setup, including API tests, bindings, Docker, unit, system, and integration tests across different Linux distributions. The conversation ended with Paul noting that GitHub team permissions were recreated after the repository move, and users need to accept new invites to regain access.

#### Next Steps

All maintainers and reviewers: Accept GitHub organization invitations for the new CNCF-owned org (podman-container-tool) to regain repository access and permissions.
Anyone experiencing missing permissions or access issues: Contact Paul or reach out on the Podman F channel to resolve access problems.
Paul: Continue addressing and tracking follow-up work for the new CI, including issues created for further improvements.
Team: Update usage of new repository locations and import paths as appropriate, especially when working with Podman 6 and related projects.

### Topics
#### Podman and Friends moving to CNCF status - Matt Heon ([01:10](https://www.youtube.com/watch?v=d0XEeePqzag&t=70s) in the video)

Matt explained the migration from CirrusCI to GitHub Actions due to CirrusCI's shutdown, and the relocation of the Podman project to a new CNCF-owned organization called "Podman-container-tool." He detailed that core technology repositories, including container libs and Podman Machine OS, have been moved to CNCF, with additional projects like websites and automation images in progress. Matthew confirmed that end users will not need to take any action as GitHub provides automatic redirects to the new locations, and Podman 6 RC1 release is pending CI stabilization.

#### CNCF CI changes for Podman - Paul Holzinger - ([07:30](https://www.youtube.com/watch?v=d0XEeePqzag&t=450s) in the video)

Paul demonstrated the new GitHub Actions-based CI system, explaining how it works with a YAML file defining all tasks and runs on VMs for various tests including API, unit, system, and integration tests across different distributions. He showed how to view test logs, debug failures, and rerun specific jobs rather than all jobs, with the system set to wait for total success before allowing merge. Paul noted to be careful when rerunning tests to NOT rerun ALL by default, but to use the pull-down to get to "Rerun Failing Tests".  Paul mentioned some follow-up work was tracked in issues for those interested in helping out, and noted that similar CI systems are used on Buildah, Skopeo, and Container Libs.

(Note: Known issues with the move to CNCF are being tracked in Podman's Issues at [#28824](https://github.com/podman-container-tools/podman/issues/28824))

#### Open discussion - ([17:30](https://www.youtube.com/watch?v=d0XEeePqzag&t=450s) in the video)
##### Possible CNCF Repository Permission issues

The team discussed the recent repository move to GitHub, with Paul explaining that some maintainers and reviewers temporarily lost access due to the migration. Paul recreated the Teams based on the maintainers.md file and sent new invitations, which team members need to accept to regain their permissions.

### Next Community Meeting: Tuesday, August 4, 2026, 11:00 a.m. EST (UTC-4)

#### Possible Topics:
 1. None Discussed


Meeting finished 11:22 a.m.

The first 4  minutes and 16 seconds of the meeting's recording were cut, so the timestamps in the next two sections are off by that amount compared to the YouTube video.

### Raw Meeting Chat:

``` 
Martin Beckert: There's a new Podlet release v0.3.2
```

### Raw Zoom Meet Transcript

```
12
00:04:17.490 --> 00:04:24.130
Tom Sweeney (Red Hat LLC): Welcome to the Palm Bend Community Meeting, folks. We'll be starting in just… well, actually, I think I'll start now, since we're too past the hour.

13
00:04:24.540 --> 00:04:30.260
Tom Sweeney (Red Hat LLC): So, officially, welcome to the Podman Community Meeting. Today is June 2nd, 2026.

14
00:04:30.940 --> 00:04:36.439
Tom Sweeney (Red Hat LLC): This meeting is being held on the even-numbered months, on the first Tuesday of those months.

15
00:04:36.470 --> 00:04:53.829
Tom Sweeney (Red Hat LLC): We're driven for topics based on what folks give us in the agenda, or meeting requests to myself. Please send any… several and many at any time that you want. Discussions will be accepted not only for Podman, but for Builder, Scopio, and any other related container projects. And we love seeing any kind of demos that you might have.

16
00:04:54.020 --> 00:05:00.240
Tom Sweeney (Red Hat LLC): Our meeting notes, if you want them, are right there, which includes our HAC agenda, or the HackMD, which includes our agenda.

17
00:05:00.570 --> 00:05:19.529
Tom Sweeney (Red Hat LLC): So for today, we have a couple of topics, most notably the CNCF move for the GitHub repos that we're currently undertaking, and mostly finished, I think, at this point, as far as the move goes. And then the CNCF.CI demo from Paul. He'll be talking about how the changes… how the CI has changed from where it used to be on GitHub.

18
00:05:19.550 --> 00:05:26.230
Tom Sweeney (Red Hat LLC): And then, looking for any next topics or any open forum questions. So, with all that, I am going to hand it over to Matt.

19
00:05:29.350 --> 00:05:31.330
Matthew Heon (Red Hat LLC): Sure.

20
00:05:31.900 --> 00:05:38.269
Matthew Heon (Red Hat LLC): Thought this one was gonna be Paul, sorry, I didn't prepare. So, we have…

21
00:05:39.010 --> 00:05:53.339
Matthew Heon (Red Hat LLC): Alright, I'll start off by, with the easy bit. So, our CI… previous CI provider, Cira CI, announced about a month and a half ago that they were going to shut down as they had been acquired by OpenAI.

22
00:05:53.420 --> 00:06:10.379
Matthew Heon (Red Hat LLC): This has caused a bit of a scramble for us as we try and migrate over to alternative CI providers, in this case GitHub Actions, before the shutdown date, while simultaneously trying to get the Podman 6.0 release ready.

23
00:06:10.380 --> 00:06:20.389
Matthew Heon (Red Hat LLC): We didn't quite get 6.0 ready before, but we do still have mostly functional CI even after the shutdown, and the mostly functional bit should be fully functional.

24
00:06:20.390 --> 00:06:23.279
Matthew Heon (Red Hat LLC): Hopefully pretty soon, so all good news there.

25
00:06:23.560 --> 00:06:39.829
Matthew Heon (Red Hat LLC): But as part of this, we finally took the opportunity to move Podman from where it formerly lived, in the containers org, over to a new CNCF-owned organization, podman-container-tools.

26
00:06:39.870 --> 00:06:48.850
Matthew Heon (Red Hat LLC): This is the official name of our CNCF project, and all the things that are presently owned by the CNCF are going to be going in there.

27
00:06:49.100 --> 00:07:08.900
Matthew Heon (Red Hat LLC): So, it's gonna… right now, it has Podman, Builda, and Scopio, but also, we are starting to move some additional projects into the CNCF-owned organization as part of this. These are things we'd always meant to add on at some point in the future, once we'd gotten the hang of how the,

28
00:07:08.900 --> 00:07:18.559
Matthew Heon (Red Hat LLC): how things were going to go in CNCF, and now seemed like a good time, especially since their CI needed to be migrated as well. So…

29
00:07:18.780 --> 00:07:25.720
Matthew Heon (Red Hat LLC): We are… we have already moved over, the container libs repository, so…

30
00:07:25.720 --> 00:07:44.530
Matthew Heon (Red Hat LLC): This is Containers Image, Containers Storage, Containers Common, the core libraries that all of our, basically Podman Build-In Scopia all depend on, as well as Cryo and a few other things. So, all the core technology has now been moved out into CNCF as of that.

31
00:07:44.530 --> 00:07:47.539
Matthew Heon (Red Hat LLC): Other things we're going to be moving in…

32
00:07:47.540 --> 00:08:05.649
Matthew Heon (Red Hat LLC): include Podman Machine OS. This is where we build the images that Podman Machine uses, so all of the scripts and logic that are used to build out those images are going to be owned by CNCF. It's not done yet, but the voting is ongoing, so hopefully soon.

33
00:08:05.750 --> 00:08:16.910
Matthew Heon (Red Hat LLC): Other things, we're probably gonna be moving in the websites. This hasn't been done yet, but the Podman.io, Build.io pages are both going to be moved into this new organization.

34
00:08:16.910 --> 00:08:29.100
Matthew Heon (Red Hat LLC): And automation images is actually being done now. This is one nobody really cares about except us, but it contains all of the stuff that our CI needs to run, so we're going to be putting that in CNCF as well.

35
00:08:29.100 --> 00:08:37.460
Matthew Heon (Red Hat LLC): So, end result of this, a lot more code is going to be in public ownership, through CNCF at the end of this.

36
00:08:37.460 --> 00:08:51.429
Matthew Heon (Red Hat LLC): Basically, everything you need to build Podman and run Podman is go… except for an OCI runtime, I believe. Everything except that is going to be under the CNCF in the Podman Tools org.

37
00:08:51.470 --> 00:08:53.089
Matthew Heon (Red Hat LLC): And… yeah.

38
00:08:53.690 --> 00:08:58.670
Matthew Heon (Red Hat LLC): I think that's about it. Any questions? Did I miss anything?

39
00:09:08.410 --> 00:09:09.380
Matthew Heon (Red Hat LLC): Okay.

40
00:09:09.380 --> 00:09:14.420
Tom Sweeney (Red Hat LLC): Just real quick, are end users gonna need to do anything to still access our repos?

41
00:09:14.800 --> 00:09:23.919
Matthew Heon (Red Hat LLC): No, so we… everything is moved. However, GitHub has applied automatic redirects, as it always does when you move things.

42
00:09:23.920 --> 00:09:38.840
Matthew Heon (Red Hat LLC): So, while Podman has changed from github.com slash container slash podman to github.com slash podman container tools slash podman, there is a redirect at the old location, and you can still access Podman via the redirect.

43
00:09:38.840 --> 00:09:56.390
Matthew Heon (Red Hat LLC): We are also… we've moved all our import names over to go.podman.io as part of this process, but that is not mandatory. You don't have to use the fancy new imports. We just moved because now it's completely independent of hosting location. We can move these whenever we want to.

44
00:09:57.340 --> 00:10:02.600
Matthew Heon (Red Hat LLC): Not that we're intending to do other moves, this has been a quite trying experience.

45
00:10:03.870 --> 00:10:07.980
Miloslav Trmac (Red Hat LLC): I think Go forces you to update the module name.

46
00:10:08.520 --> 00:10:13.059
Miloslav Trmac (Red Hat LLC): But we did that a few months ago, so now it should be transparent.

47
00:10:19.060 --> 00:10:20.310
Paul Holzinger: Yeah.

48
00:10:21.160 --> 00:10:30.709
Paul Holzinger: Because we have the vanity imports, all the imports stay the same. But the Portman V6 import changed, for those who haven't updated them yet.

49
00:10:31.110 --> 00:10:36.930
Paul Holzinger: Or probably have not updated that yet, because we haven't released Portman 6 yet, so that makes sense, but…

50
00:10:38.660 --> 00:10:54.669
Matthew Heon (Red Hat LLC): Speaking of, Podman's R6RC1 is coming out whenever we finally get the CI. The last little bits of lingering problems with the CI are being fixed. Once they are fixed, we're ready to do an RC1, we just need CI to stabilize.

51
00:11:00.050 --> 00:11:07.930
Tom Sweeney (Red Hat LLC): Great, thanks, Matt. And for the redirects, there's no time frame to… that those will go away, but it's suggested that people go over and use the new ones.

52
00:11:08.100 --> 00:11:09.130
Tom Sweeney (Red Hat LLC): Is that correct?

53
00:11:13.630 --> 00:11:25.799
Paul Holzinger: As far as I'm aware, GitHub doesn't remove the redirect, on the time, so I think they stay forever, but yeah, eventually people should just use the new location.

54
00:11:25.800 --> 00:11:26.450
Tom Sweeney (Red Hat LLC): Yeah.

55
00:11:27.220 --> 00:11:35.710
Paul Holzinger: I think, on a Git push or something, I think I saw a reminder, on the CLI tool.

56
00:11:35.890 --> 00:11:39.359
Paul Holzinger: from GitHub, that the location changed, but…

57
00:11:40.660 --> 00:11:43.079
Paul Holzinger: Yeah, on the website, you,

58
00:11:44.190 --> 00:11:48.789
Paul Holzinger: get redirected automatically, so you'll see the new URL as well.

59
00:11:49.260 --> 00:11:50.470
Tom Sweeney (Red Hat LLC): Great, thanks.

60
00:11:51.980 --> 00:11:53.910
Tom Sweeney (Red Hat LLC): Great, any other questions or comments?

61
00:11:57.400 --> 00:11:58.160
Tom Sweeney (Red Hat LLC): Right?

62
00:11:58.290 --> 00:12:07.079
Tom Sweeney (Red Hat LLC): Not hearing any. So, since we've talked a little bit about the CNCF CI changes, Paul's agreed to give us a little demo and a little talk. So, Paul, why don't you take it away?

63
00:12:11.110 --> 00:12:16.729
Paul Holzinger: Okay, so this is… Basically, what I showed off yesterday,

64
00:12:17.200 --> 00:12:20.050
Paul Holzinger: Just to make people aware how to use.

65
00:12:20.390 --> 00:12:24.160
Paul Holzinger: the new CI, so let me get the screen sharing going.

66
00:12:28.780 --> 00:12:40.129
Paul Holzinger: Alright, so let's start with the PR, basically, to merge the new CI. Like, it's now GitHub Action-based.

67
00:12:40.590 --> 00:12:47.420
Paul Holzinger: basically everything in a big YAML file, which defines all the tasks.

68
00:12:48.350 --> 00:12:58.469
Paul Holzinger: And… That basically results in… the runs on the CI here, the trigger.

69
00:12:59.250 --> 00:13:01.409
Paul Holzinger: All the tasks we are gonna run.

70
00:13:01.920 --> 00:13:06.679
Paul Holzinger: And if you want to see the logs, you basically click on it.

71
00:13:06.910 --> 00:13:14.620
Paul Holzinger: On the task, and then you have the looks of a task, so let's… Something with some readable looks.

72
00:13:15.070 --> 00:13:20.640
Paul Holzinger: sh… Sus… sys test should test something here, so…

73
00:13:21.490 --> 00:13:27.399
Paul Holzinger: Yeah, so the tests are run inside a VM, actually.

74
00:13:27.870 --> 00:13:34.009
Paul Holzinger: So yeah, this is the normal, test output from, the BETS framework.

75
00:13:35.160 --> 00:13:36.460
Paul Holzinger: And…

76
00:13:36.740 --> 00:13:52.470
Paul Holzinger: Yeah, so we have similar testing matrix as CMOS, basically. We have API tests running, bindings, composed, DockerPy, the unit test, upgrade test, system test, and integration tests.

77
00:13:53.080 --> 00:13:57.630
Paul Holzinger: The bug tests, even, and the machine tests again.

78
00:13:58.050 --> 00:14:06.580
Paul Holzinger: And so the main tests here, the Linux-based ones, integration system tests, and so on, they are run on VM.

79
00:14:06.860 --> 00:14:15.939
Paul Holzinger: that we built in another repo, in the automation repo. It's creating Q-code disk images, and then…

80
00:14:16.210 --> 00:14:18.979
Paul Holzinger: We have, basically the…

81
00:14:19.160 --> 00:14:28.670
Paul Holzinger: Fedora Stable, which is, like, the current Fedora. We have a Fedora Pryor, which is, like, the N-1 thing, so, like, Fedora 43.

82
00:14:29.020 --> 00:14:30.119
Paul Holzinger: Right now.

83
00:14:30.640 --> 00:14:38.590
Paul Holzinger: Fado Aurora to test the latest things, and we have Debian Sit as well to test the latest Debian.

84
00:14:38.690 --> 00:14:44.179
Paul Holzinger: And that's basically the same distro, matrix, and anything we had in cirrus.

85
00:14:44.290 --> 00:14:45.369
Paul Holzinger: So, da-da.

86
00:14:45.620 --> 00:14:49.049
Paul Holzinger: In that sense, it should be quite similar, just,

87
00:14:49.580 --> 00:14:51.539
Paul Holzinger: Triggered in a different way now.

88
00:14:53.140 --> 00:15:04.890
Paul Holzinger: And, yeah, there are, at the end of a task, if somebody actually needs to debug something, there should be a… the journal of the VM uploaded.

89
00:15:05.900 --> 00:15:10.130
Paul Holzinger: So you see it here as a… download link.

90
00:15:10.420 --> 00:15:13.960
Paul Holzinger: Or, if you go click on Summary, you see all tasks.

91
00:15:15.470 --> 00:15:19.079
Paul Holzinger: And you see, if I scroll down…

92
00:15:19.260 --> 00:15:25.690
Paul Holzinger: Yeah, okay, you only see one right now because of the crux of the rerunning.

93
00:15:26.250 --> 00:15:30.760
Paul Holzinger: which I'm gonna show in a second. So if I'm going to attempt one, it should have all the other.

94
00:15:32.700 --> 00:15:36.340
Paul Holzinger: Yeah, all the other journals for the other tasks, basically.

95
00:15:37.530 --> 00:15:41.549
Paul Holzinger: And… yeah, so… let's take,

96
00:15:44.220 --> 00:15:52.010
Paul Holzinger: something that's running. So, for example, this is interesting to show. This is a simple docs PR.

97
00:15:52.650 --> 00:15:55.820
Paul Holzinger: And if everything should be right…

98
00:15:56.920 --> 00:16:11.100
Paul Holzinger: We should not… yeah. So, since this is a docs PR, we skip most of the tests, we only do the basic, like, the validators important, and yeah, we always build, just to be sure, I guess.

99
00:16:12.360 --> 00:16:19.760
Paul Holzinger: Yeah, the building also validates, like, the main pages, because that needs to build Portman to compare the Portman head.

100
00:16:19.870 --> 00:16:21.739
Paul Holzinger: That's just, output.

101
00:16:22.660 --> 00:16:32.309
Paul Holzinger: Yeah, so there is some optimized logic similar to… to see which

102
00:16:32.420 --> 00:16:36.739
Paul Holzinger: And… yeah, one thing to shout out,

103
00:16:36.860 --> 00:16:46.999
Paul Holzinger: I don't know if you should call this a bug, but get up actions things. If you skip a task, you don't expand the matrix value into the real value, so you get this variable, yeah?

104
00:16:47.330 --> 00:16:50.380
Paul Holzinger: Yeah, that's,

105
00:16:50.550 --> 00:16:56.340
Paul Holzinger: Not a problem with our YAML file, that's just how GitHub thinks it should be, I guess.

106
00:16:58.120 --> 00:17:04.660
Paul Holzinger: So don't worry about if you see these, yep. So…

107
00:17:05.240 --> 00:17:09.069
Paul Holzinger: how to rerun something? Do we have a failed PI here right now?

108
00:17:10.960 --> 00:17:14.619
Paul Holzinger: Nikola… This is red, let's have a look.

109
00:17:15.270 --> 00:17:20.210
Paul Holzinger: So, yeah, usually if you scroll down, yeah, so we have, something failed here.

110
00:17:20.700 --> 00:17:23.960
Paul Holzinger: So, just click on it to see the logs.

111
00:17:27.579 --> 00:17:32.630
Paul Holzinger: And so the system test logs, they are generally readable.

112
00:17:33.030 --> 00:17:49.020
Paul Holzinger: If you go quickly to integration, they will be too long to see anything, because right now, I haven't enabled our old log format, and that needs some work how to integrate this with GitHub Actions, but this is…

113
00:17:50.680 --> 00:17:55.080
Paul Holzinger: It's basically not readable. At some point, GitHub cuts it off.

114
00:17:55.320 --> 00:18:02.589
Paul Holzinger: Let's see. Yeah, so… It says it has been truncated, and you need, basically, in the right corner.

115
00:18:03.090 --> 00:18:04.920
Paul Holzinger: Few Rolex.

116
00:18:05.690 --> 00:18:07.530
Paul Holzinger: Top right corner.

117
00:18:08.020 --> 00:18:17.249
Paul Holzinger: And… that gives you, yeah, basically text file, and then you can just CTRL-F,

118
00:18:17.980 --> 00:18:21.340
Paul Holzinger: To the error, if there's one.

119
00:18:21.930 --> 00:18:25.020
Paul Holzinger: And… It's just gonna load a bit.

120
00:18:25.550 --> 00:18:36.849
Paul Holzinger: Yeah, like, with integration tests, like, if there's a failure, it's basically the test name is printed here, and then you just copy CTRL-F, and then you get to the middle somewhere. I think that should be…

121
00:18:38.480 --> 00:18:43.320
Paul Holzinger: Should be easy to figure out for you, how to read this.

122
00:18:44.280 --> 00:18:50.119
Paul Holzinger: Yeah, so now that we have a failure, or a machine failure as well, so what do you want to do?

123
00:18:51.540 --> 00:18:53.370
Paul Holzinger: Let's see, back to the top.

124
00:18:53.490 --> 00:19:05.509
Paul Holzinger: Rerun jobs, just click on it, and then it pops up. Do not click rerun all jobs, always use rerun fair jobs. Rerun all jobs, as it says, reruns everything again, and then you likely have

125
00:19:06.010 --> 00:19:07.410
Paul Holzinger: Again, some flicks.

126
00:19:07.790 --> 00:19:09.439
Paul Holzinger: So let's just rerun.

127
00:19:09.770 --> 00:19:18.010
Paul Holzinger: It says what it reruns even, so… need to confirm again, and… It triggers, A new run.

128
00:19:20.110 --> 00:19:26.519
Paul Holzinger: And it copies the status over from the previous run. It's gonna take a moment.

129
00:19:28.550 --> 00:19:35.589
Paul Holzinger: Yeah, so it's marking all the already successful tasks completed, and only runs the one that failed again.

130
00:19:35.980 --> 00:19:37.069
Paul Holzinger: And, yeah.

131
00:19:37.550 --> 00:19:44.199
Paul Holzinger: As you can see, we have a lot of tests, so this interface is not designed for a lot of tests.

132
00:19:45.340 --> 00:19:46.750
Paul Holzinger: Yeah.

133
00:19:49.190 --> 00:19:53.080
Paul Holzinger: And yeah, if you want to see prior failures, I don't know if you…

134
00:19:53.670 --> 00:20:00.080
Paul Holzinger: need to see the logs again. You can, at the top here, switch between the attempts, basically, for, like,

135
00:20:00.930 --> 00:20:03.749
Paul Holzinger: To get older looks again, if you need them.

136
00:20:05.390 --> 00:20:10.200
Paul Holzinger: And then back to the PR, top left, you get back to the PR.

137
00:20:12.410 --> 00:20:13.620
Paul Holzinger: And, yeah.

138
00:20:13.820 --> 00:20:16.680
Paul Holzinger: Can review it, like… You would normally.

139
00:20:17.530 --> 00:20:21.949
Paul Holzinger: And now it shows you the tasks, running again.

140
00:20:23.690 --> 00:20:28.800
Paul Holzinger: And, yeah, the merch protection is set to wait on total success, which…

141
00:20:28.900 --> 00:20:33.680
Paul Holzinger: like we had in CRS is basically the status aggregator task at the end.

142
00:20:33.980 --> 00:20:36.000
Paul Holzinger: That's gonna fail it.

143
00:20:36.140 --> 00:20:37.779
Paul Holzinger: Any tile, like, any…

144
00:20:38.290 --> 00:20:47.570
Paul Holzinger: any of the individual tasks fail. So we don't have to actually put everything of these names into merge protection settings, which is quite helpful.

145
00:20:49.160 --> 00:20:56.960
Paul Holzinger: And… I think that's… pretty much about it, CI-wise. There's some follow-up work…

146
00:20:58.510 --> 00:21:03.130
Paul Holzinger: I created some issues for those who want to… Help out.

147
00:21:04.880 --> 00:21:10.799
Paul Holzinger: This is what I tracked so far. Yeah, feel free to have a look later, and…

148
00:21:12.660 --> 00:21:17.530
Paul Holzinger: That's… I think, about it. Yeah, similar CI systems are used on…

149
00:21:17.650 --> 00:21:20.359
Paul Holzinger: build a scope your container lips.

150
00:21:20.980 --> 00:21:23.709
Paul Holzinger: Very similar, basically, from the setup.

151
00:21:24.810 --> 00:21:27.480
Paul Holzinger: And… Yep.

152
00:21:29.020 --> 00:21:32.499
Paul Holzinger: That's, it for now. Any questions?

153
00:21:39.970 --> 00:21:40.800
Tom Sweeney (Red Hat LLC): Looks good.

154
00:21:43.470 --> 00:21:48.690
Tom Sweeney (Red Hat LLC): Okay, the last call. Any further questions or comments for Paul or for the CI test?

155
00:21:53.230 --> 00:21:55.129
Tom Sweeney (Red Hat LLC): Okay. Well, thanks, Paul.

156
00:21:55.460 --> 00:22:02.980
Tom Sweeney (Red Hat LLC): Alright, that's all that we had on the agenda for today. Does anybody have anything that they would like to discuss or ask before we wrap up here?

157
00:22:06.480 --> 00:22:20.719
Tom Sweeney (Red Hat LLC): And or any topics for the next meeting. Speaking of which, that is going to happen on Tuesday, August 4th. It will be at 11 a.m. Eastern Time. Maybe at DC minus 4 still at that point in time. Still in daylight savings time.

158
00:22:26.020 --> 00:22:32.529
Paul Holzinger: I have one more thing, so… Sure. I updated, with the repo move, one thing.

159
00:22:32.640 --> 00:22:36.580
Paul Holzinger: didn't really plan for what couldn't really fix, I guess.

160
00:22:37.310 --> 00:22:50.209
Paul Holzinger: we had, basically, GitHub teams, and those teams were, like, for the maintainers and reviewers on each report, and the teams were tied to the GitHub org containers.

161
00:22:50.500 --> 00:22:55.080
Paul Holzinger: And they were not moved over. So, some of the…

162
00:22:55.210 --> 00:23:03.309
Paul Holzinger: maintainers and reviewers temporarily lost access to the repos. I recreated the teams now with the…

163
00:23:03.500 --> 00:23:08.310
Paul Holzinger: actual current set, based on the maintainers.md file in the repo.

164
00:23:08.990 --> 00:23:13.989
Paul Holzinger: And… Most people should be in by now, but

165
00:23:14.330 --> 00:23:24.760
Paul Holzinger: For the people that were not part of the new org, like, membership-wise, it basically created a new invite, so they have to explicitly accept it.

166
00:23:24.930 --> 00:23:28.530
Paul Holzinger: So, anybody who has got invites earlier.

167
00:23:28.670 --> 00:23:36.170
Paul Holzinger: Then please accept them to get your permissions back, otherwise you won't have the permissions you should have.

168
00:23:38.600 --> 00:23:45.400
Paul Holzinger: And if anybody is missing any permissions or anything, just ping on the Portman Dev channel, and we figure it out.

169
00:23:48.840 --> 00:23:50.790
Tom Sweeney (Red Hat LLC): That's gonna be my next question. Thanks, Paul.

170
00:24:00.100 --> 00:24:03.710
Tom Sweeney (Red Hat LLC): Alrighty. Any other questions, comments before we wrap up today?

171
00:24:08.840 --> 00:24:10.570
Tom Sweeney (Red Hat LLC): Hearing a whole lot of silence.

172
00:24:13.470 --> 00:24:20.050
Tom Sweeney (Red Hat LLC): All right, with that, well then, I will thank you all, especially Matt and Paul, for presenting today, and we look forward to seeing you in a couple months.

173
00:24:21.310 --> 00:24:22.249
Tom Sweeney (Red Hat LLC): Thanks a lot.
```
