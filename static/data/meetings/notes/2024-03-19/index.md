# Podman Community Cabal Meeting Notes 

### Attendees

Ashley Cui, Brent Baude, Ed Santiago Munoz, Gerry, Giuseppe Scrivano, Jake Correnti, Kevin Clevenger, Lokesh Mandvekar, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Paul Holzinger, Tom Sweeney

### March 19, 2024 Topics

1. Podman reverse-dependency testing in Containers/Common - Matt Heon, Paul Holzinger

### Meeting Notes
 Video [Recording](https://youtu.be/XW43y97V6kU)

Meeting start 11:02 a.m. Tuesday, March 19, 2024

#### Podman reverse-dependency testing in Containers/Common - Matt Heon, Paul Holzinger - (0:51 in the video)

We have a couple repositories such as c/common, c/storage, c/image, and then c/buildah.  The thought was to add a test in c/common to test Podman before the change was pushed up.

Lokesh Mandvekar is working on testing this out.  The biggest issue is the dependency issues.  He is planning to add Podman, and Bulidah build tests too.  Look for updates in the future.


#### Podman rootless containers do not populate the IP  - Paul Holzinger for Deepesh Verma - (4:22 in the video) 

The default rootless container is in a separate namespace and can't be reached. Paul believes adding this would be more confusing. We do support `--network-bridge,` which can help in many use cases in this space.

#### v5.0 update - Matt Heon - (6:12 in the video)

Release PRs have been made and we suspect a v5.0 tag will be ready mid-afternoon East Coast.

#### Open discussion
 1. None

### Next Cabal Meeting: Tuesday, April 16, 2024, 11:00 a.m. EDT (UTC-4)

#### Possible Topics
 1. Data production for appliances backup application - Vikas Goel
 2. Quay namespace maintenance: Consider dropping/redirecting quay.io/containers - Tom Sweeney
 3. Podman rootless containers do not populate the IP - Deepesh Verma ?

### Next Community Meeting: Tuesday, April 2, 2024, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:
 1. LLM

Meeting finished 11:09 a.m.

### Raw Meeting Chat:

 ```
 None
 ```

### Raw Google Meet Transcript

 ```
Tom Sweeney: Good morning, It's Tuesday, March 19th. 2024. This is the Pod man Community cabal eating today. We have three topics. However, a couple of our folks aren't here yet. So may have to delay on some of these the first one up for today was Data production for appliance backup application pick a school Goyle and seeing vicas. Did anybody hear from him?
Kevin Clevenger: I have not.
Tom Sweeney: And then the next was podman rootless containers do not populate the IP by Depeche Verma, and I did not hear about this one. So just about five minutes ago. Has anybody talked with the pastor and recommended that he joined for this or she I should say?
Tom Sweeney: Okay, and then the only other topic we had we're discussing just before we came on that. We had talked within our internal cabal and that's about Paul man reverse dependency testing and containers common.
Tom Sweeney: Matt always thinking that there was a whole lot more to discuss about that. Did you have anything you wanted to mention or at least give a quick overview and what the decisions were made?
Matt Heon: So basically the problem here that we are trying to solve is this we have a couple different repositories that code that eventually lands in pod man lives in we have obviously the base libraries contain storage containers image. Then we have a containers common Library which has a bunch of shared code between our projects and then we have Builder and then we have pot man. So there is a rather substantial chain of code that eventually lands in pot man has dependencies. The desire here was to add some sort of reverse testing within at least some of these repository starting with containers common to basically ensure that changing the tears common is guaranteed to not break pot man because we were having some problems with that during the Pod man five cycle. We commit a change from cares common. It wouldn't be adequately tested land in pod man. Then we
Matt Heon: to go back and tears common and fix things before we actually got the change into podman. So we have decided that we are going to start doing this lokesh is investig doing it using the door of Test forest framework. And once we have at least basic testing implemented, we think this is going to be a big benefit to our overall development workflow in dependency library of admin basically ensuring we don't have any question as to whether Are going to work when we go and put them into podman. yeah, I think that's about it. I summarize Paul lakash or anything I missed.
Paul Holzinger: Yeah, I think we discussed it last week at the internal combo, but you weren't there. I think.
Matt Heon: Okay.
Paul Holzinger: so What I remember maybe lokesh can at that. We agreed on having his test PR for now.
Paul Holzinger: testing just about because testing all appointments this probably too much to
Lokesh Mandvekar: Yeah, that's about right I'll be adding for now. My plan is to add apartment and build a build tests. as part of the STI. So basically gets vendored Fund in Builder and partner and I said and if they build okay. That's something.
Matt Heon: Okay, I think that is our answer there. We're going to do it and yeah. Tom that's about it other stuff I
Tom Sweeney: Okay, the other two topics I believe looking at the folks. We don't have Here who's going to talk about on data production for appliances? And then we were going to have to push here Content realistic time. It's not populating the IP. Is there anybody here knows about those that would like to discuss this or get it discussion started. Or should we put these off to the next couple meeting next month?
Paul Holzinger: I mean I can answer why there's the basically the default routers container like slope for naliness or pasta are in a separate namespace and you cannot reach this So even if you would put IP in there You would have no way to run there. So the IP doesn't Give you anything. It would add more confusion in my opinion if I cannot be reached from externally.
00:05:00
Paul Holzinger: We do support. destination network bridge as ruthless and that gives you shows your IP now, but it's also not routable from the host Network namespace. But this IP would be routable between the containers. So that makes sense.
Tom Sweeney: then that might be an extremely quick meeting. Just anybody have anything else that they would like to talk about today have any topics? Almost I can possibly matter. I don't know if you want to talk about 5.0. And where it's at.
Matt Heon: This will be a very brief update the release R has been made. We're holding off until after lunch Us East Coast time. Once that happens. We will have everyone ready to do the final release tasks and Given that I expect about three hours from now, we will have a 50 tagged and ready for testing.
Tom Sweeney: was great.
Tom Sweeney: right still not seeing any of these folks that were supposed to be here for this. I'm gonna give it one last call for any other topics or questions.
Tom Sweeney: If not, I know there are a bunch of us that have a bunch of work to get going to so I think of me practice meeting up extremely early.
Tom Sweeney: of hearing anything going once going twice
Tom Sweeney: Right, it's gone. I mean you start stop the recording here and we'll wrap up meeting. Thanks for coming folks and sorry so quick.
```
