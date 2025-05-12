# Podman Community Cabal Notes
## May 6, 2025 11:00 a.m. Eastern (UTC-4)


### Attendees
Alex Guidi, Ashley Cui, Brent Baude, Dan Walsh, Gerry Seidman, Giuseppe Scrivano, Jake Correnti, Jan Kaluza, Jan Rodak (Honza), Kevin Clevenger, Lokesh Mandvekar, Mario Loriedo, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Nicola Sella, Paul Holzinger, Tom Sweeney

### May 6, 2025 Topics

 1. Monorepo - Jan Kaluza [Slides](./Containers_Monorepo_Slides.pdf)

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=PbafpszDDsc)

Meeting start: 11:02 a.m. EDT (UTC-4) Tuesday, May 6, 2025



#### Monorepo - Jan Kaluza - (1:06 in the video)

[Slides](./Containers_Monorepo_Slides.pdf)

Multiple repositories currently exist under the Podman umbrella, including container/storage, container/image, and containers/common. One idea is to combine one or more of these into a "monorepo."

He's been investigating the merging of common, storage, and image together and showed a sample of what the layouts within the monorepo might look like once they are all merged together.

-  Is monorepo better?
 	- No simple answer
 	- Topics to cover
     	- Migration
         	- Existing tools and processes to migrate from many repos to one.  It's easier than expected, even Git History would transfer.
         	- No real blockers seen.
         	- Projects depending on the tools would also have to change their vendoring to the new monorepo.
        	 
-  Importing Go modules
         	- Imported the same way as singular repos.
         	- Would require a change of all imports to the new monorepo URL.
         	- No real blockers, but details still need to be discovered/uncovered.
        	 
- Contributions
         	- Easy to discover the right repo to edit.
             	- Might be able to include Podman in the future
         	- Single, atomic, PR for any change
             	- Easier to keep/get an overall view.
             	- Less likely to break a dependent project.  i.e., c/storage issue introduced into Podman
         	- No need to constantly check and update modules
         	- All the modules use the same dependencies and are tested together.    
             	- Make the vendor for releases easier.
         	- Harder to list PRs for a single module
             	- Needs CODEOWNERS and/or labelers to assign PRs based on the paths changed.
             	- History in the module's directory for "merged".
         	- No real blockers anticipated, but details need to be worked through and verified.
        	 
- Releases
         	- A module can still be released individually.  I.e, release image, and not storage.
         	- Or release can be atomic, releasing all the modules together.
         	- Much easier to vendor
         	- Releasing each module in a monorepo separately needs per-project tags.  i.e. v5.35.0 to storage-v5.35.0
         	- With PR touching multiple modules, foward/backward compatible changes are less intuitive than with a polyrepo.
            - We will have to change the release process, but hopefully that will make it simpler. 
        	 
- Builds and CI
         	- With the right tooling, all modules can be tested together, preventing incompatible changes.
         	- We need smart builds and a CI system; otherwise, we build and test modules unrelated to the PR. This "could" increase the test run-time dramatically without benefit.
         	- May need to create a tailored set of pipelines for Podman
         	- Fedora does not include and popular build system which would support monorepos
             	- We could use plain "go build" locally and something else for PRs, but should we?
        	 
- Code Ownership
     	- No benefit to the monorepo?
     	- GitHub permissions are built around polyrepos
     	- We can switch to per-directory CODEOWNER if we need acks from different team members per module
    	 
- Issue Tracking
     	- All Issues into one, easier to track.
     	- Bad, all issues are in one tracker.
         	- Need to note the module somehow in an issue in a monorepo.  Probably could be done by tags or labels.
         	- Easier for people to report problems to.
        	 
- Summary
     	- Migration, Importing Go modules, Contributions, Release, and Code Ownership would benefit
     	- Needs more investigation, Builds and CI, especially build time.  Also, Issue tracking/labeling within a monorepo
    	 
- What to do next?
     	- Consider the Hybrid model
         	- Use just for storage, image, and common as a POC.
     	- Merge them into a newly created production-ready-monorepo POC
         	- use go.work as described in the [“Investigate monorepo"](./Investigate_monorepo.pdf) document.
         	- Setup CODEOWNERS and labeler if needed.
         	- This task should be doable in a few days.
     	- Implement the GitHub CI workflow in a native way where all the tests are executed for any change to see the real impact of contributors.
         	- Hard to predict the issues here.
         	- The GitHub workflow is not hard
     	- Explore how the "Release process" would change
     	- Evaluate
    	 
**Discussion:**

Miloslav would like us to have to move only once.  He would like to see two prototypes.  One to see if the API changes would work.  Secondly, what happens to Podman when an update gets made to just one module, say storage, in the monorepo.
     
Paul thinks it's important to release in one commit and then tag it.
     
Alex sent a message in chat, where they went with a monorepo.  It worked fine for them for the most part.  They have had some issues when they tried to bump just one module, but not change the others.  I.e., bump storage but not bump image and common has been fun.  Jan thinks we'll need to keep it one version for the monorepo, and that should help that.
     
Alex thinks they may have a different use case.
     
Paul is concerned if we do just the storage, image, common in one repo, it won't help as much without Buildah and Podman also involved, as far as catching issues in changes that cause problems in Buildah or Podman.
     
Brent is concerned about doing this now.  He's not sure it's the right time now, given the ongoing CNCF move.  Also, he's not sure the benefit will outweigh the pain cured.
    
Paul is not sure this makes things less complicated.  Especially considering when an image needs to be updated.  CI wise, he thinks it will be beneficial.  The complexity added may be too much.
     
This will be handy when changes need to be made in Storage and Image at the same time.  It would be handy for vendoring into Podman, less special vendoring.
     
Matt is very in favor of this.  He thinks one win is getting more eyes on repositories that don't get as much attention.  
     
Gerry, having a monorepo would be beneficial.  He would probably learn more about the Storage, Image, and Common repos.
     
Giuseppe also thinks it would be beneficial.  He wouldn't have to do WIP test PRs for image and common if he changed storage.
     
Tom would like it to, and would like to see a POC sooner.
     
     
#### Open discussion - (50:55 in the video) -
1. None

### Next Cabal Meeting: Tuesday, July 1, 2025, 11:00 a.m. EDT (UTC-4)

#### Possible Topics
1. None

### Next Community Meeting: Tuesday, June 3, 2025, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:
1. None

Meeting finished at 11:54 a.m.

### Raw Meeting Chat:

```
You
11:00 AM
HackMD for notes: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
keep
Pinned
You
11:15 AM
Any issues for projects that currently vendor in say c/image?
Miloslav Trmac
11:19 AM
I’m not sure a smart build system can make a difference - if a c/storage PR touches store.go or drivers/overlay, it is _technically correct_ to test ~the whole stack on top
Alex Guidi
11:25 AM
In oc-mirror we were using go workspaces (monorepo) in order to keep the two oc-mirror versions working (v1 and v2), as you said all the modules will use the same dependencies, this is great when modules are going to evolve together, but when you want to bump one dependency in only one module, things could get trick because maybe it would require major changes in another module. Only sharing my oc-mirror experience here, sometimes our oc-mirror v1 was holding the improvements of oc-mirror v2 bec
 because of the dependencies being shared between them.
Dan Walsh
11:51 AM
Is this just storage, image, and common merged together? Or Buildah and Podman as well?
Matt Heon
11:52 AM
Initially, storage/image/common, see what breaks and how it works, then if it is going well, expand
Mohan Boddu
11:53 AM
Thank you Jan
```

### Raw Google Meet Transcript

```
Tom Sweeney: Good morning folks. Today is Tuesday, May 6, 2025. This is the Podman community cabal meeting with an A in there that's missing in the spelling. this is a meeting that we generally talk about upcoming technical issues or designs and those kind of things. Whereas the podman community meeting which happens on even numbered months on the first Tuesday is about doing demos and such for podman builder or any of the other component tools or related technologies.  So, thank you for being here today. I've added a link within the chat for the meeting itself. I'll go ahead and pin that where I'm going to be taking notes during the day. If I make anything out of whack there or if you have stuff that you want to add as far as links or anything like that, please go ahead and do so. And today we only have one topic, but it may take us a little while because it's a pretty interesting topic.
Tom Sweeney: Yan will be talking to us today about creating a monor repo which is a consolidation of some of our containers projects under the GitHub. And with that I am going to stop sharing and I'll hand it over to Yan.
Jan Kaluza: Yeah, thank you. let me share my screen. It should be this one. You should see the presentation, right? Okay.
Tom Sweeney: Looks good for me.
Jan Kaluza: So, let's start. So, my name is Anarja and I had a task to actually investigate the monor repo in context of the podman. So, let's start with motivation at first. By the way, in the agenda you can find the link to the slides. So you can open it and check it yourself after or even during the talk. So as I said, let's start with motivation. Basically, we want to improve the release process and reduce the vendoring issues we have while releasing the podman and also improve the development workflow.
Jan Kaluza: And the idea is that we have multiple repositories we have to maintain and those are so-called poly repos. I will get to these terms in the next slide. And we want to convert them into single monor repo. I was mainly focused on the three repositories I have here. the image repository and the storage repository.  And the goal was to check how these repos could be merged into the monor repo and what this would mean for the podman and the workflows and everything. So let's go to the next slide. here I'm trying to explain what the monor repo is for anyone on the call who have no clue. so on the left side you can see those three poly repos and those are basically single code repositories with just a single project or just a single go module.
Jan Kaluza: So we have common g repository, image git repository and the storage g repository and they have separate github projects separate issues and I mean issue trackers and everything like that and we would like to create monor repo from that or actually that was the goal of this project and investigate what it would take. So the monor repo is on the right side and the difference is obvious.  It's a single repository but it contains multiple go modules. this is just an example how this could look like. Of course, the directory structure can be different. It depends on how we actually decide to implement this. But in this example, we have the image directory and there is a go mode for the image module. We have the storage directory and go mode for the storage module. And there is also go.work
Jan Kaluza: work file which uses go.org module to actually tie everything together. So if you start go build or go test it actually counts with those local image and storage modules and uses them instead of getting them from some remote kit repository. So you can work locally and test and implement some features.  By the way, if you have any questions, feel free to raise a hand or even if you have some idea about those slides. I have another screen here. So, I see everything. So, you can stop me that way. is monoro better? That's the question. And there is no simple answer.
Jan Kaluza: But let's imagine we decide to switch to monor repo and we have follow linking topics which are important which are actually changed by this decision and I will in the rest of the slides get through all of these topics and discuss what the impact of choosing monor repo would be. So let's start with migration and by that I mean migration of poly repos into the monor repo. So this one is quite easy  I was surprised. I was thinking that it might be harder but there are already some projects like g filter repo and also some documentation about how to convert polo into single monor repo and the important thing is that it also preserves the g history. So when I was showing here we have image directory and storage directory all those files here would preserve the history from these repos on left.
00:05:00
Jan Kaluza: So lock git blame would work and everything. So this is not real blocker and it's actually a easier than one would think. So creating that monor repo is not a hard task. Of course there are make readme files we would have to merge them manually. that's needed definitely but it's not broker definitely.  The next part is about importing go modules. here it starts a little bit to be a little bit more interesting because if we switch to monor repo also the urls to the modules would be different.
Jan Kaluza: So we have to basically go through all of those other projects using the image storage module and command module and change the URLs to the new URL pointing to the monor repo.  Again, it's a not real blocker, but depending on how much those original repos are used in public, we might have some time where things basically stop working for someone or they would use outdated code just to announce it and get some time to people and also to our team to change those URLs.
Jan Kaluza: and adjust everything. So they are using the right monor repo URL but again it's doable and probably not hard to do. It's Now about the contributions and if we have just single repository instead of three repositories it's obviously easier for people to discover these repositories.  there's just one repo containing all those three things and ideally we could also in the future include podman in that repository. So everything would be in single monor repo and therefore new contributors it should be easier for them to find out where to open dpr where the code lives and so on.
Jan Kaluza: also things like grab in the code, when you have the appointment cloned locally, it would be easier to work with the repository. Related to that, we could have single atomic PRs for every change.  I think this is the most important part of the contribution section because right now if you want to change something in common which also has to be changed or it has some follow-up change in the storage repository or image repository you have to do multiple PRs which are linked together and it's probably hard to maintain those PRs and also to review them because you don't see the big picture
Jan Kaluza: from single PR you have to open multiple PRs check how they work together and so on and this leads to another point to the next point to actually check that those PRs work together you have to change the reference versions to other modules at least I think so because otherwise you cannot really check that your change in the common module works correctly with the
Jan Kaluza: with the storage module or image module or even with the podman itself. And if we have all of those modules in single repository, it's much easier to check that things work together. Also, vendoring is easier because you have just single repository where the vendoring happens instead of three repositories. So those are all advantages of this monor repo approach for contributions.  Now for the disadvantages, it's harder to list PRs for a single module because everything is mixed together in the GitHub interface. So if you open pull requests, you would see all those PRs basically feature not per project which is different from what we have right now.
00:10:00
Jan Kaluza: And we can group those PRs using the code owners. So for example, GitHub has a feature that if you specify code owners, it will find out that this PR is touching some directory for example storage. So it can assign the PR to the storage team or to people who are familiar with this code. So there are some ways how to make it easier.  You can also use labeler to assign PRs but it's not ideal. It's kind of like extra work we have to get through and extra filtering you have to do on pull requests if you want to check just pull request for the storage. similar if you have merged pull requests you can use the history section of the modules directory.
Jan Kaluza: So in the GitHub you can open the directory you can click on the history and check what happened for that directory and that way you can see what happened to the storage module what happened to the image module and so on. But it's not that nice user interface as poly repos with real request separated by project.  So this contributions it provides some benefits but it also have some disadvantages but I think the benefits here out outweighs the disadvantages. Another part is releases.
Jan Kaluza: there's important point that although we have all the modules in single repository it doesn't mean that we have to release them all at once but we can still treat each module as a separate unit and release them independently. So we can for example create the storage release without releasing the image module.  But it's again a little bit complicated on the git side because right now for example we have the version text in the storage there's for example version 5.350 and this obviously doesn't make any sense if you have monor repo you will have to prefix that with the storage prefix for example so the release process would have to probably change but the benefit would be that vendoring as I
Jan Kaluza: that would be easier. Of course, we can decide that we will release everything all together. That way, it would be easier. But we will lose that ability to release single project. So that's probably like question we can discuss later if we get back to the slides. another disadvantage I have listed here is that if you have that atomic PR touching or I see Tom has some question.
Tom Sweeney: Yeah, just saying for projects outside of our scope, somebody that's vendoring in our stuff such as Cryo for instance, are there going to be problems for them or what changes are they going to have to worry about if this is implemented?
Tom Sweeney: And if you want to answer that later, that's fine, too.
Jan Kaluza: So yeah,…
Jan Kaluza: I mean yeah those projects they would have to change the link to our container image repository. But other than that I believe it should work as it is. But we would have to somehow notify them that ito the old one is no longer up to date basically and we are moving here to the monor repo or maybe there is some golden magic which I haven't discovered yet which can somehow forward those things but
Tom Sweeney: translation of sorts. Yeah, I don't know. I think there is,…
Tom Sweeney: but I don't know that there is.
Jan Kaluza: Yeah. …
Jan Kaluza: let's continue. I ended up here. I wanted to say that with single atomic TRS, it's also harder to find out what's forward and backward compatible. I mean when you change something in three modules and then you want to release just one you have to know that those others too does not depend on your change.
Jan Kaluza: If you have single P storage repository and you are doing one change by another, it's easier to track what you have done and you actually can be sure that you are releasing the storage module which does not depend on something new in the unreleased common module. But if everything is mixed up together, it's not that intuitive and there might be some issues like that. So that's for the releases. Now here comes the first kind of a blocker about builds and CI. in theory, if you have monor repo and you have right to link, all modules can be tested together and the CI tests are run in a way that it prevents the incompatible changes to land onto the repository.
00:15:00
Jan Kaluza: The problem is that it needs some smart build system and smart CI system otherwise we would be building everything all the modules even if the PR is touching just like one of them and I mean building is not the most expensive part maybe but the testing probably is.  So we would need some way how to basically do not run tests which are not influenced by the PR. So if you change something in the image module, you probably don't want to run the test suit for the common module because that would be waste of resources and time.
Jan Kaluza: there are some build systems which are smart and can do dependencies between modules and evaluate them and actually cach things and run only tests which are influenced which are impacted by the change like basil and others. The issue which is marked as a blocker here is that Federra doesn't include them.  So we probably cannot use them and we might decide to just go build maybe locally for Fedora or our current way and do something smarter for PRs but it's questionable we will be testing something we are not using for developing and I personally don't like that but it's also a way or another option if you don't want to use those smart things is
Jan Kaluza: is to run some custom pipeline basically change our make files and make them a little bit smarter so we detect that the change is in the image and therefore we don't have to run the common code and I see there is discussion ongoing so I think Miloslav wrote on the chat first so I will read what's there and Milos if you want to speak
Miloslav Trmac: Yeah, I think if we change the lower levels of the stack, I don't think any automation is going to figure out that it shouldn't test all the rest unless we specifically decide to exclude that.  If we change the C common layer, we would probably want to exclude C image and C storage tests. But that's also not too difficult to set up.
Jan Kaluza: Yeah, that's right. however, I think the basil it should have the ability to define dependency between modules and don't run the tests which are not needed. That's one of the core features of Basil.  But as I said right now we probably doesn't want to use it because Fedora does not include it and I don't see a way we shouldn't be the one importing it to the Fedora. So yeah Paul
Paul Holzinger: So we do that already on portman in CCI. So in the CS there's a condition where you can check what source file has been changed and you can use that to conditionally enable or disable a specific CI task. that's done for machine for example. if package machine is not changed then it wouldn't run machine test since these are slow expensive tests.
Paul Holzinger: you can expand it however way you want. It gets a bit ugly. because every path condition inside the YAML file and then duplicated across I don't know 40 tasks. it's not very nice from a reusability standpoint, but it works. at least for the testing you need to manually define what you want to test. there's no logic to automatically figure this out of course.
00:20:00
Jan Kaluza: Yeah, thanks Paul. So it seems we are already doing something like that. It's just like we have to probably be careful here to not reinvent too much of the build systems because we should be working on podman and not build systems. but I mean if we go to the monor repo we will have to address this issue somehow probably it depends how far we go with the monor repo idea. as the last slide I also have some plan how to move forward and what to do. So we will probably get to that. So I will go to the next slide and that's about code ownership.
Jan Kaluza: again something to think about GitHub permission model works on a repo level mostly. So we can specify different permissions for different people for each project we have. So different people can have maintainer rights for the image or the storage and so on.  But if we merge everything into a single monor repo, we lose this ability. That's not a real blocker. If we are fine with that, all the people in the team have the same permissions for all those three repos. We can also play with code owners a little bit to request or to require some x from different people per each module.
Jan Kaluza: So again that's just a note for everyone here to keep in mind in case about something which would be broken by this assumption issue issue tracking that's interesting problem because in case we would use monor repo we should probably also move the issues to that single repository because
Jan Kaluza: Having project just for issues is not very practical and therefore all those issues should be mixed together and we need a way how to distinguish between the issues for particular go modules or projects in the monor repo and usually it's solved by the labels which are added there by whoever triages the issues or
Jan Kaluza: even some automation which detects what the issue is talking about and proposes a label which belongs to the issue and this is extra work which has to be done by someone I'm not sure who is actually triaging the issues in the portman because I'm here for just a month here just a month now but I mean if someone is doing that it might not be that hard to actually  add another step there to just add the label that this issue belongs to storage belongs to image and so The benefit is that it's easier for people to report problems because there is just single tracker instead of three trackers. So they report it to a single place and we don't have to move it around. We just change the label which is probably easier. Don't know.
Jan Kaluza: So that's about issues and here's the summary of all those previous slides. I try to capture that the migration is not big deal. Importing go modules is also fine. Contributions is also Releases  Of course everything requires some work but there are too many open questions but the builds and CI that's where the fun begins and what probably we'll have to discuss in case we will go to the monor repo and what we will have to do some technical preview for or P and also the issue tracking I don't have clear opinion on that because I'm not sure how the triaging happens in the
Jan Kaluza: podman So it also needs some answers here to find out how the model repo would actually change the workflow to real people doing the work. And this is the last slide it's about what to do next. I mean so in case will people want to explore the monor repo approach more we should definitely consider hybrid module and this is actually what we are doing so far we are not trying to propose monor repo for everything in containers namespace but just for the storage image and common and I think that's a good way because adding podman there for example
00:25:00
Jan Kaluza: example, this would add much more issues. really like the GitHub issues and much more PRs there and it's much more like heavy traffic repository.
Jan Kaluza: So maybe just like using monor repo for some of the repos might be good and using por repos for others at least for now or maybe forever is also an option. Tom I see you raised your hand.
Tom Sweeney: Yeah. And just you keep saying,…
Tom Sweeney: …
Tom Sweeney: storage image comment and then podman. You can't forget builda in between those two because that's going to be a big chunk as well.
Jan Kaluza: Yeah. Yeah.
Jan Kaluza: Sorry for that. I completely forgot about that one.
Jan Kaluza: I was mainly focus on those three. I'm using Portman as an example of something else, but it's not. Yeah. Yeah. But you are right.
Tom Sweeney: Right.
Tom Sweeney: But I do agree with this approach for the hybrid model to start out with and…
Jan Kaluza: Definitely. Yep.
Tom Sweeney: where the problems lie.
Jan Kaluza: And then we can or Milaf. Yeah.
Miloslav Trmac: Go on.
Jan Kaluza: So I will finish this slide and then we will open border discussion. So after that I can actually merge those three repositories into some production ready monor repo just for testing. we would not use it in production but it should show how the workflow would look like in the monor repo world.  I would use the go.work as described in my document where I describe this implementation into more details and play with beone owners and other tasks.  So other tools.
Jan Kaluza: So we have some working example of monor repo which I can further present and I would also like to implement the githubci workflow in some nu way and by that I that basically all the tests are executed for now and at least we find out some data from that how much time it needs to run the test suit how much time it needs to build everything and
Jan Kaluza: maybe we will find out that it's actually fine and we don't have to do any extra optimizations there or maybe we will find out that we need to do some optimizations and do something like what Paul suggested earlier earlier. I think merging everything together. This is one week of work. I'm trying to be a little bit pessimistic on those estimations.  for the GitHub CI. I think the workflows are simple, but I'm not sure how si works right now, from the administration perspective, what are the permissions needed, where to get them and so on. So, it's hard for me to predict that part. But once we are done with these we can basically have another call where we evaluate this. I can do another presentation, show the monor repo and how it works in practice and show some data.
Jan Kaluza: So these could be the next steps in case all those pros and cons I mentioned before are okay to you and we decide that we want to check this further and spend some more time on that and that's all thanks for your attention and now it's time for discussion and questions.
Miloslav Trmac: All right. I would like to advocate for the external C image polars. if we are moving I mean I guess that's fine but we should only move once.  So if we are planning a report changes or project changes for the CNCF handoff, we should figure out the final C image location so that callers don't have to move twice or maybe figure out some I don't know automation code generation something to make this completely transparent to users. and then there are two prototypes that I would probably want to see. Maybe you've already done that.
00:30:00
Miloslav Trmac: One is a PR that changes several repos with an API incompatible change to see that this I think the go.work documentation suggests that it should, but it would be nice to see.  And the other I would be interested in seeing what we do for a potman release when we take all of the ripples at once with a new version. Whether we can do that in a single PR that passes tests or whether we would still need to do one PR per project internally.  So that we take C storage and then we update the in C images version reference to C storage. and then we like C common and the like.
Jan Kaluza: Yeah, thanks girls I noted those two for the release. I actually haven't done anything for test for that first use case. I've done some tests on my local repo. It was without the CI, but I'm sure this one will work.
Miloslav Trmac: Yes.
Jan Kaluza: Go
Paul Holzinger: Yeah, for the second case if you release I think it's the important part is to release in one PR or one commit where you would update all the module versions and then if you tag it you have one tag I think having these individual modules as a migration strategy might make sense but I don't  long term it I don't see the value in having that if we want to make sure this is the one commit where she pass if we still do one PR per thing we haven't improved the release process in the end so
Miloslav Trmac: I mean, this is up to Tom, but I think if that were the only cost, we might be fine with paying it. I guess what it would happen is that we can manually create a mod updates for everything at once, but we wouldn't know how to go some check sums in there.  That's where I think this
Jan Kaluza: Hey,
Alex Guidi: Hello. I would like only to share the experience experience that we had here in Osimir. I already send a message in the chat but I'm going to talk also. So basically we had this monor repo in osimur as well using the go workspaces because we needed to have the two versions running parallel and one calling the other with the same binary. So we did It worked fine.  The only challenge that we faced was that sometimes the V1 version was using dependencies that were old and V2 wanted to use a new version of the dependency and we are stuck in the middle because sometimes to bump the dependency in V2 we had to change a lot of code in 1 major change.
Alex Guidi: So this is only experience that I would like to share because if the models are going to evolve together it's fine it's good but if you want to evolve only one alone then it's a little tricky because maybe you need to change the others and maybe the chains are majors in order to be able to update all the dependencies together.  So only to keep this in mind
Jan Kaluza: Yeah, but I think in our use case, in the end we have to choose one version when releasing, And anyone correct me because I'm not sure if that's how it works with releases So we have to have single version of the dependency in the end. So we have to actually develop everything with that single version. And I think the vendoring issue is actually about the way that we bump something in one module and we do not do that in another. And then things start breaking when we put them together.
Jan Kaluza: That's how I understand it.
Miloslav Trmac: Yeah, we don't have frozen stable versions to maintain,…
Miloslav Trmac: but we do run into dependency updates from time to time like the recent Docker change where they deprecated or removed a lot of public API. In that case, we ended up with C image moving pretty fast, but there was a lot of work that needed to happen in Potman.
00:35:00
Miloslav Trmac: So for a time the two were Arguably blocking that update and doing everything in a single step would be much much cleaner.
Alex Guidi: So it seems is a completely different use case that we have here. So fine. Great.
Miloslav Trmac: It does mean that we move at the pace of the slowest project.  This
Paul Holzinger: Yeah, I think that's the benefit for us at least when we only talk about the repos we have full control of personally at least or the example right now is common image and storage I don't think I mean we will get some benefit out of that by merging that at least in terms of rendering between storage and images quite common or when we  doing the release you take three repos one at a time which takes time which is slow but I think for daytoday testing wise you need to have portman and builder there or even scopio because these binaries run the final end to end tests and these are the tests that catch the most bugs.
Paul Holzinger: so I mean it's definitely a good place to start on but I don't think that that helps the testing situation to make sure that the tests aren't breaking.
Jan Kaluza: Okay, so I will ask one more question. It seems that nobody is really against the idea of monor repo after the presentation.
Jan Kaluza: world is Yep.
Brent Baude: I am not for this.
Brent Baude: I'm not for this at this time or the very near future. I think Milisoft is pulling on really good threads that there will be inflection points in our projects like moving to CNCF where if we decide at that time it would be valuable.  I would be more supportive, but I think things like that for sure this is going to help and what Paul points out to, I would not be in favor of doing it now. but that's one vote.
Jan Kaluza: I was asking mainly because of what to do next slide should I continue exploring this and prepare that production ready preview of those three merged projects into single mono and present that or is it kind of waste of time and I should focus on something else that's mainly mine.  where I'm leading with that question. I'm not proposing to do it right now, but I would like to know if someone feels that this is completely wrong way how we would like to proceed, how we would like to structure the repository and so on and we should not do it at all basically.
Miloslav Trmac: I would kind of like to hear from people focused on infrastructure. for me personally, I'm neutral at the past. I mean it's extra churn for all users. It's extra ch for us. the thing that I would want to see out of this is some improvement in something CI testing times testing infrastructure in general. There is obviously the benefit of landing API changes at once.
Miloslav Trmac: that's valid, but it could easily be swamped by making CI unmanageable or moving to a state where nobody can deal with the complexity or where just making all of these changes as a single project and then having nobody to maintain all that might also be a risk I'm worried about.  I think we have people dedicated to this, but I would like to hear what they think or
00:40:00
Jan Kaluza: Yeah, I think B was
Tom Sweeney: Yep.
Paul Holzinger: I mean for CI I'm not necessarily convinced that it makes things more complicated if you consider the fact that I mean I sort of handled the image updates and so on for the past I don't know half a year going into every repo and making sure whatever you change an automation image is going to work is
Paul Holzinger: a pay like doing I'm like if I update an image I have 15 PRs like this is I mean I mean we have the I don't know six big repos the other ones we don't want to merge probably anyway but it's nice this is the PR with a new image it will work and if there are major serious  changes or automation changes.
Paul Holzinger: Another example was the GitHub action broke where I had to update how the secrets are defined and then again I did AP and in all these projects it's just slower at run CI anyway on all these projects and…
Miloslav Trmac: Yeah, that's a great
Paul Holzinger: I need reviews now on all these projects with the same change so more people and CIS I think  having one point might be beneficial.  The complexity comes in what was discussed in trying to make things more efficient in figuring out how to optimize what is being tested when we change what that's the complexity but I think the other ones will be simpler.
Miloslav Trmac: So maybe we start with keeping the test scope exactly as it is just migrating the mechanisms
Brent Baude: I was going to try to ask Paul to I guess expound on his comment earlier.  I think in general I'm understanding where he's going, but Paul, you did say I think two things. and I just want you to give me more. you said there would be some advantage to putting the three repros together that I'm sort of proposing we dip our toes in the water with. you also made the point that until Build and Pod Man are in the mix, you don't get the big payoff.
Brent Baude: what were sort of the upside things that you initially came to you for the three
Paul Holzinger: So the main upside for me is that if I don't know did this standard chunk work I seeing is needs changes on storage and image and in together sort of thing. If you have that in one repo, I see that as beneficial being tested as one part and with common as well if we do a vendor release and update the vendoring I think it's much more easy for portman to update one reference and making sure that reference is going to work…
Brent Baude: Yep.
Paul Holzinger: because everything in that reference already work together. Sometimes I update C common and I also want to update C image and now it breaks.
Paul Holzinger: A classic example where this is currently breaking which is kind of a pain in the ass how does semantic versioning and releasing of main is every time you do a minor release on a branch go thinks that minor release is newer than what we vendor on main and now renderate all this to go tooling make vendor will downgrade which  is not what we want.
Paul Holzinger: So now what we have been doing for the past months is we have to merge the tech back into main to make the go tooling a way like aware that actually the latest main commit is after the tech and…
Brent Baude: Right. Anything else?
Paul Holzinger: that works but it still requires an update on the main commit and with one repo you have this problem you don't have this problem anymore from the libraries point of view for the three libraries I don't think
00:45:00
Tom Sweeney: I'm just going to pull the time card a little bit because we're starting to run out. I'd like to wrap this up in about five minutes and we have a couple folks waiting. So, Matt, go ahead.
Matt Heon: So, I'm the very in favor of this for context, but I think one of the big wins that we're ignoring here is just getting more eyes on the same repository. we have a lot of different repositories. A lot of them are getting much less traffic than the others and it's a lot of effort to keep up with issue triage, pull request triage, etc. on all of them.  One of the things I think we get out of this is we get the same number of eyes but on one single repository and yes there's no expectation that the builder or containers image etc maintainers are going to suddenly gain magical experience in podman but a lot of trivial issues are coming in on all projects. I think having more eyes in general to find those and get them moved through quickly will be a net benefit for everyone.
Gerry Seidman: Matt, I'm glad I went after Matt because I'm the category of person that Matt's talking about in that I'm not an active developer, but because of the nature of the stuff we're doing with additional layer storage and stuff, I'm often looking at the code and it certainly makes it harder for me and it's kind of a attention dissonance issue that I'm bouncing between multiple repositories.  So for me having it as a monor repo as someone who's just trying to understand the code and how it appi applies to my other work a monor repo would be beneficial.
Mohan Boddu: You're on mute, Tom. And I'm guessing you're calling for Jap.
Tom Sweeney: Yeah, just thank you.
Giuseppe Scrivano: No. Yeah.  I just want to add what Matt said because yeah I pulled my before I want to say that one advantage I is that we can get more people looking at what happens in the other libraries because now it's just few of us that monitor storage so another thing that I think for users
Giuseppe Scrivano: It's difficult to report and just to confirm this point because it happens very often that issues must be moved around and sometimes multiple times because while you triage the issue you realize that happens at different spots and yeah so at least for the three libraries I think that the split there it's kind of artificial and having a monor repo it's a  will consolidate a lot of the stuff we do daily. yeah.
Giuseppe Scrivano: Usually a change in C storage to have a change in storage means keeping three work in progress pull request at different repos and keeping them updated in sync on each change because you want to validate that it doesn't break the other components. So yeah, I think this will simplify a lot the daily work.
Giuseppe Scrivano: Yeah, that's
Tom Sweeney: Yeah, I'll just vote in as the person…
Tom Sweeney: who oftentimes does the vendor dance each time. That would be a big benefit just for me personally just to have to do that one step across. And I personally would like to see in the shorter term, not necessarily next week, but for us to at least give the monor repo a try for the three storage and common. Dan, eventually the thought is to do build and pman as well, but I think what we're kind of gleaning at the moment is see how it works out for us for storage image comments to start and then bring in the others.
Jan Kaluza: Was it a question for me or for Dana? I see.
00:50:00
Tom Sweeney: Yeah, I was just answering Dan's question,…
Tom Sweeney: but yes, Jen, go ahead. Go expound, especially if I miss
Jan Kaluza: No, no, it's fine. I'm happy with the outcome. it seems that most of the people thinks that it's probably worth exploring this more. So, I will discuss also with you later. But it seems that we should give it some more time and I should try playing with that more and present it further.
Mohan Boddu: Yeah. Yeah. let's discuss it again and also we have other spike as well to look at other options.
Mohan Boddu: But yeah, we can talk about this.
Tom Sweeney: Yeah. And with that,…
Tom Sweeney: I think I'm going to wrap up this conversation and thank Yan for the presentation and leading the discussions today. I think it was a great topic. And are there any other comments or questions that people want to ask before we tie up this meeting? While people are thinking, I will just give quick reminders that our next cabal meeting will be on Tuesday, July 1st, 11:00 am again, Eastern Daylight Time. And then the next community meeting will be on June 3rd, also on daylight time as I make the change in the agenda. we don't have topics for either meeting.
Tom Sweeney: So if you have things that you want to discuss about, if you want to demo have other technical discussions like this one, please add not to the variety but into the agendas for the respective meetings. And once again, any other questions or discussions that we want to get into. I am not hearing anything or seeing anything. So with that, I think we will come to a close for this meeting and thank you all for being here today.
Mohan Boddu: Thank you all.
```
