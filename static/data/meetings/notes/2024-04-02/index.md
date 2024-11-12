# Podman Community Meeting Notes
## April 2, 2024 11:00 a.m. Eastern (UTC-4)

### Attendees
Ashley Cui, Brent Baude, Ed Santiago Munoz, Giuseppe Scrivano, Jake Correnti, Jhon Honce, Kevin Clevenger, Lokesh Mandvekar, Mark Russell, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Paul Holzinger, Rahil Bhimjiani, Steffen Röcker,  Tim deBoer, Tim deBoer's Presentation, Tom Sweeney, Tom Sweeney's Presentation, Urvashi Mohnani

### Topics

1) Deploy LLMs with Podman and K8s - Steffen Röcker
2) podman manifest support for artifacts - Nalin Dahyabhai
3) Podman Desktop update demo - Steve deBoer
4) Podman v5.0 Update - Matt Heon

## Meeting Start: 11:02  a.m. EDT
### Video [Recording](https://www.youtube.com/watch?v=-8l3vGcT3fo)

DEVCONF.US is happening on August 14-16, 2024 in Boston, MA.  Proposals for talks are being accepted: now through April 22, 2024 [HERE](https://pretalx.com/devconf-us-2024/cfp).

## Podman Desktop update demo
### Tim deBoer
#### ([2:50](https://www.youtube.com/watch?v=-8l3vGcT3fo&t=170s) in the video)

Podman Desktop v1.8 release just out.  Includes Podman v4.9.3 and works with Podman v5.0.
It includes Global onboarding.  If you haven't used Podman Desktop before, it will walk you through the setup process, Podman itself, and Docker Compose.

A learning center has been added for things like Spring Boot, Kubernetes, and more, which includes links to documentation for each.

Also, added support for Kubernetes.  He used Kind to apply a YAML to standup resources and worked through a couple of them.  You can edit the YAML directly and then apply it.

Blog post on Podman.io with screenshot. (https://podman-desktop.io/blog)

The Podman Desktop V1.9 release is imminent and will include an offer to install v5.0 if Podman is not installed and an update button to go from v4.9.3 to v5.0.  The upgrade is still experimental and will be ironed out in the next release.

V5.0 is showing better Performance.

## Deploy LLMs with Podman and K8s
### Steffen Röcker
#### ([8:55](https://www.youtube.com/watch?v=-8l3vGcT3fo&t=535s) in the video)

He's refound his love for containers while using [LLM](https://github.com/sroecker/LLM_AppDev-HandsOn/tree/main).

He's using Llama to work with model files.  The models have templates and parameters that are explained within the workshop.

He uses a container base on UBI9 Python 3.11.   One thing he has found a problem is containers are often created by non-software folks and the resulting container can be problematic.  He created his own for the example.  It's not fancy, but he thinks there is a big demand for learning how to build a container.

He built on the Mac, and found you want to create for AMD 64, and specify the network correctly.   He is happy to take PR's to make things better.

One learning is making sure enough memory was specified for the Podman run.

Demo - [15.43](https://www.youtube.com/watch?v=-8l3vGcT3fo&t=941s)

He ran on Fedora.  A lot of tutorials are outdated he found.  Suggests using the `--device. nvidia.com/gpu-all` and to disable security slightly with `--security-opt-label-disable ollama`.  Documented in GitHub.

He's hoping to open up the LLM work for others and to lower the bar for the learning.

There are ready made containers that are useful, and has a number of notes in his cheatsheet page.  Such as fine tunings for axolotl, and he has a `podman_axolotl.sh` file in his repo.  This helped to find tune and made the running of the models faster.

He showed a container from Christian Hines (@tiran), and it's obvious in the Containerfile how quickly it becomes complicated.

Steffen thinks using containers for Machine Learning is ideal.

You can also deploy to Kubernetes, and he has a premade container that you can use.  Both a Containerfile, and also on Quay.io.

He'd love further community support in this area.

## `podman manifest` support for artifacts
### Nalin Dahyabhai
#### ([25:08(https://www.youtube.com/watch?v=-8l3vGcT3fo&t=1508s) in the video)


Podman manifest and oci artifact support.  We wanted to distribut the disk images along with the container images to registries.  That abaility has been added.

Demo - [25:26(https://www.youtube.com/watch?v=-8l3vGcT3fo&t=1526s)

Showed a manifest via Skopeo and explained what was found in it.  He then inspected an OCI image artifact.

He then create a manifest, and showed the help for manifest which includes a number on artifact options now.

He added a manifest, and then pushed it to quay.io.  He used skopeo inspect and showed the manifest, and then ispected the digest to show that it was image.

This in v5.0 and Buildah v1.35.  Nalin would love any and all feedback.

## podman v5.0.1 Update 
### Matt Heon
#### ([33:12](https://www.youtube.com/watch?v=-8l3vGcT3fo&t=1992s) in the video)
V5.0 went out a few weeks ago.  Focusing on stbility issues.  v5.0.1 went out yesterday, mostly with fixes with rootless network, Pasta.

v5.0.2 in a few weeks.

v5.1 probably late May 2024.

## Open Forum/Questions?
####

1) None

## Topics for Next Meeting

1) None


## Next Meeting: Tuesday, June 4, 2024, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Tuesday, April 16, 2024, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:39 a.m. Eastern (UTC-5)

## Google Meet Chat copy/paste:
 ```
Tom Sweeney: Good morning folks. This is April 2nd 2024. This is the podman community meeting. In this meeting, we generally do demos of interests for things related to Paul man, generally, but oftentimes Builders scopio and other container projects as well. So we're always happy to take any kind of discussion topics that you may have for the future. Please let me know you have eating notes inside of a heck MD which you can go ahead and update it more time that you want to go ahead and add a topic although I do appreciate having noticed to me also. And so for today, we have a number of topics. We have deploying llms with podman and kubernetes with Stefan roecker and Stefan my messing up your name.
Tom Sweeney: I misspelling it. At least I see.
Steffen Roecker: That's fine. No.
Tom Sweeney: Okay, and then not only be talking about podman manifest support effects. Then Tim will be talking about doing a quick problem and just top update demo Force Special on the areas that are Jewish. Matt's going to be talking about 501 updates and then we'll have room for any miscellaneous topics that people would like to see and then just as a quick reminder. Our next meeting will be on Tuesday, June 4th. And then a quick note from our sponsor. Urvashi, do you want to talk through this? So do you want me to
boston-video-enclave-3n292: A store. Are you sharing your slides Stone? Because I don't see anything.
Tom Sweeney: dear. That was not very good.
Tom Sweeney: Try that.
boston-video-enclave-3n292: Yeah, perfect. So just a quick announcement that Defcon for us is a free open source conference that red hot sponsors and the Boston area. It happens at Boston University. So we're back in person this year in August. I shoot up with the dates on the slide, but it's August the 16th. If you scan the QR code, it'll take you to our website. The CFB is currently open till April 22nd. So we really encourage, anyone on the open source Community. Please submit talks. We have a lot of interesting tracks and themes for this year. Yep. That's it. Thank you, Tom.
Tom Sweeney: No problem.
boston-video-enclave-3n292: All right.
Tom Sweeney: Already, was that going to turn over to Steffen and talking about llms?
Steffen Roecker: And we can also switch. It's fine for my side.
Tom Sweeney: Oops, I'm sorry. I barely hear you.
Tim deBoer: Yeah, I put a comment in if possible. I'd like to go in the first half hour. But if you want to go first Steffen.
Tom Sweeney: Okay.
Tom Sweeney: Or no Timothy, if you guys don't mind switching we'll just go ahead and switch that up now. And we'll go with him first.
Tim deBoer: Okay, so I don't have any big demo or presentation to show. I just wanted to talk through the podman desktop 1.8 release. So this has been out for a few weeks now. and I'm just going to kind of run through what are the features and changes? The first is by default. It will install podman 493 you'll notice right off that I actually am running padman 5 it does work with podman 5 just fine and I'll talk about that more at the end. And so what have we added this release first is what we call Global onboarding it basically means if you've never used podman desktop before and you started up after the welcome will prompt you to install podman.
Tim deBoer: Help create your first pod man machine will kind of walk you through that process and make sure that There is onboarding for podman itself for Docker compose using podman and over time. We'll probably add more things there if you skip that you can go to settings and do it again later, but we just want to make sure that when people do their first install, they can get a working environment with everything configured right off the bat. The next thing is we've added a Learning Center here. It's basically just a set of cards with common things that people want to set up using a corkus spring Boot and you just click on these it opens up the documentation page for how to get started with those things.
Tim deBoer: We got it a bunch of API improvements for extensions to do new things. I won't get into the detail on that here. There's a bunch of minor things like when you do a build. We'll prompt you for which platforms you want to build for you can select that on the build page? And the other big thing is the support for kubernetes. So I have kind running on podman right now and we have this new section in the left here support for deployments services and ingresses in routes, actually me. Delete that one. So there's a bunch of related things. But the first is that you can apply yaml you can just pick. Yaml, it does the same as Kube cuddle apply.
00:05:00
Tim deBoer: stands up those resources. You can see here that EML had a bunch of deployments and Services. I can now see them within podman desktop. You can go to details for any of these, the normal things that you'd want to do is a kubernetes developer. There's also support for making changes to these I won't apply now, but, you can edit the animal directly and apply it. And delete anything from here.
Tim deBoer: So yeah, I guess first any questions on what I've shown.
Tim deBoer: Yeah, go ahead. I didn't see who's and that was.
Tim deBoer: real or that just a thumbs up.
Tom Sweeney: I heard the peak too, but I don't see anybody with hand up.
Tim deBoer: Yeah, So that's it for the release. There's a blog post on podman desktop.io that goes into a bit more detail and has some screenshots and then I just wanted to talk about podman 5 for a minute. There is a release of podman desktop imminent 1.9 release in the next couple days the big change there will be if you don't have pod man installed in your machine will offer to install podman 5.0 not 4.9.
Tim deBoer: And then there's an experimental option in the settings. If you turn that on we'll add a button to update from 4.9 to 5.0 if you have four to nine on your system, and that'll go through a few things like make sure your machines are stopped helping you with migration, but that's experimental because we're not sure that we've kind of caught everything and we don't want to go through the 49 to 50 migration and, leave people in a bad state. So again, we're doing more testing on that trying to make sure we've got all the educes and we'll do the next release. Will default to 50 and promoting people to migrate from 4.9 to 50?
Tim deBoer: And it will feedback we've been getting solves a lot of problems performance, especially on Mac a huge improvements.
Tim deBoer: And that's all I had. If there's any questions. Speak up otherwise, Yeah, I see a hand.
Tom Sweeney: so clapping Yep.
Tim deBoer: that was a clap. Okay. All right.
Tom Sweeney: Which I concur with before you leave, could you drop a link to the blog post that she mentioned?
Tom Sweeney: And I'll go ahead and include that inside the notes. And thank you unless there's any other questions.
Tim deBoer: Okay. Thanks.
Tom Sweeney: All right. Steffen go ahead and take it away talking about a little lens.
Steffen Roecker: Thank So I'm actually logged in twice with mac and Linux. So, let's see if that works. Yeah, so last year. Yeah, my background is basically I've been doing no machine learning since more than 10 years ago. He looks for 20 years. And as you all know, there's a lot of pass about llms. But as you look deeper at the used software everything it's a pain to set up. usually so I really found my love for containers since it makes a lot of things easier. And since I did it the hard way last year five months ago. I did a workshop at Red Hat developers hands one day.
Steffen Roecker: And the hard way for me was using just using and it's all the examples as you might know. It's a bit tricky to get everything running including GPU support. So on my GitHub you can find the extra Workshop not the content itself. I think I still have to do that. But you can find all the instructions for deploying an llm with Putman. So the tool I used or the software Library I use is called ulama and some of you might know it as there's actual dock of people working on that. So Allama is basically the docker The Columns I've talked of machine learning models and why is that the case if you ever worked with a model, you can download the weight from sites like hugging phase. But same as for programs, you need additional software and settings. I can show you one example.
00:10:00
Steffen Roecker: You can also upload them to their Twitter website. It's basically like Putman or Docker push and then there's a few additional settings like a talker file or container file. You have a model file as you might know these models they have different parameters and mplate. I think this is very important that you get these kind of templates right if your work with this. So in the workshop, I've used it also because out of the box supported talker. But of course all the explanations and is only wrote how you can do that with Docker and the Putman it was a bit different so to show you The end result is basically a chatbot with retrieval augmented generation. I think that many of you might have heard that that's the bus at least a few months ago. So nowadays, it's quite easy to do there's enough software out of there.
Steffen Roecker: But how to do that with Portman I think the most important thing when you start something you need to choose a image you can derive from and one common complaint. I've heard from my customers and people I talk to usually these software is not developed by software Engineers, like people like myself a different background and they just take a large. Container of a popular distribution right and put in everything then you have five or tens of gigabytes of things that the first thing I did. Is to create that container file.
Steffen Roecker: Photographer that's one thing I was very curious as the dog talkifies the docker file and didn't pick up the container file, but it does if you put it in a command line, but It's nothing fancy, You take a universe a bit image for example from ratchet and then everything you do it just install the needed packages. So I'm using streamlined in that case and change the user and expose support. So I did before I did my container especially stationed. So that was the ultimate preparation. I would say as I learned a lot of things how to use and containers. Just creating this example. That's nothing fancy. But I think there's a huge demand of missing how to do that with containers. and what might be interesting for you as well as
Steffen Roecker: Building it, right so I'm working on my Mac. Since that has inbuilt acceleration for these kinds of models. The Apple chip and the M1 chip but if you build on a Mac, I found out that you really also need to tell that you will Deploy on AMD 64 if you want to deploy it on the kubernetes cluster as usually you don't have mixed there. I think this is not needed but this is something that people new to Containers might need to be aware of and then also creating the network that you can talk to different services in Portland. I think you could actually Using something like compose, but I have not done that yet. So if anybody here wants to do that, feel free to open APR and then running it is super straightforward. unless
Steffen Roecker: unless you work with tools or software like pytorch and I think this is a lot of pain for beginners and this is something I wanted to Deploying llms or machine learning models. There's a few things you need to know for example pie torch needs shared memory. And if you're not aware of that you might not be aware of this small line. I can make it larger here. Yeah, you need to set the shared memory size. So if you ever deployed pie torch, we are Putman or on kubernetes. I think this is one of the first things you run into high torch crashes because there's no shared memory. Usually in kubernetes, you mount an empty file with that kind of size to have it as well. So, like I said, I think there's still a few pit balls which are wanted to document for a beginner. As I count myself in there as well.
00:15:00
Steffen Roecker: And the other thing is of course taking this and deploying it to a kubernetes cluster, which I have also created yaml files as well. But then again if you do that and you don't have GPU support, it's going to be slow. So just switch to my different system. I can show you my screen there.
Steffen Roecker: Books sharing you can see my screen, Perfect. Yeah, so on the floor and…
Tom Sweeney: Yes.
Steffen Roecker: I think it is not my Fedora system where actually do have it and media graphic cards. And I think one thing that I want to give back to the community is when I researched how to deploy a llm or any kind of problem software that needs a GPU. This is still a big pain, especially for beginners as you find a lot of how to's in tutorials out there, but most of them outdated. So what I can tell you the easiest thing that you can do is to use the Nvidia CDI
Steffen Roecker: and not doing it with any Hooks and then you can actually trade for what just deploy your container using of course forwarding the port you later on use on your local machine somewhere else and then using device and media.com GPU or on the GPU and one important thing is of course, you need to disable. a bit of security in order to do that So this is not something that you really need to find out and digit deeper to find the security or playable disable that you get the most commonly Frameworks and everything to run using problem.
Steffen Roecker: If I do that I can easily have to plot it on my local machine. So I downloaded Lama container which was built for Docker, but it runs quite well in Portland as well using this command line. And then I can easily query it. So I can pull you needed model if you don't have that. and I can look at my cheat sheet of
Steffen Roecker: So this is also on GitHub where I documented. some of the commands needed creating the network or checking that you have DNS configured and everything in the network. to work with these kind of containers.
Steffen Roecker: So one thing that I hope I can get out of this other presenting here to make it easier for beginners to use such kind of software and as you can see here, this is the streaming API of olama serving a large language model and Answering or completing the text. But yeah for the question, why is the sky blue which is one of the default things? That olama uses for testing.
Steffen Roecker: Pretty nice and pretty fast. Thanks to GPU support and later on if you need. More complicated stuff. I think if you have mastered deploying models for inference, it was soon find out that these are not finished so you will need to find And fine-tuning them is the whole lot of other problems and actually found out using containers makes it much more easy. So going back to my Mac. I can share a few things there if you're interested.
Steffen Roecker: why does it make it easier as you might know? There are packages for arm day for rocam and fedorano that it's very easy to run on a Linux machine. But unfortunately in media the coda libraries has still proprietary. So the most easy thing is use a ready-made container which includes all of it and you will see that most of them they use a certain operating system because it's also built in the way and media business. So we go back to my cheat sheet. Yeah, yeah. I have not prepared any slides or anything after these to educational apologize. But I hope you can learn to learn something from this.
Steffen Roecker: as much cheat I put it On GitHub as well. If you did use fine tuning software, there's something called Oxford Axolotl. That's easy framework to get started. But in order to do that, you also need to know how to use it with pot man again. Using the the right security settings Mount your local directory that you can actually use the configurations Mount a volume for the hacking phase cache where model are downloaded and then use the right container. It usually use some kind of Nvidia supported Ubuntu operating system.
00:20:00
Steffen Roecker: But this is actually the only way I got certain software you need for fine-tuning and running these models faster because setting these up in your local directory without a container is really a big mess. and usually mess up your virtual ends so I can only recommend using containers to do that Unfortunately a few colleagues of mine they have picked it up. But just to show you why this is so complicated. I want to feature a bit of work done by my colleague Christian heims. He has created a container for one of his projects. and you can see he's using Fedora toolbox. That's something I really learned to love as it actually makes it quite easy and if you look at the container for
Steffen Roecker: You can imagine why this is a pain to set up locally because you need so many different tools and then some of this is not packaged. You need to copy some header files. You need to download the right version supported for example for this is for Graphic cards. You need to download The Right versions. For the rebuild and this kind of stuff. I think this really showed me why we have containers and why this is a good choice for using this kind of containers for machine learning.
Steffen Roecker: because I know I have spent a lot of time to make this happening on a local machine without containers but using containers and something like toolbox. Is really a godsend gift in my opinion.
Steffen Roecker: This was basically the chests of it. So if you're interested in deploying it to kubernetes, it's also in my repository. Also how you can do this with GPU support. It's actually not much more complicated. there's a pre-made container image and then you just need to request some CPU memory and for example in Nvidia graphic cards, and my packages are on GitHub and also on cui not anymore apparently.
Steffen Roecker: Yeah.
Tom Sweeney: That's not just look good. I wonder if quite something problems.
Steffen Roecker: It does. Yeah, but there's a container here, but it's quite old. But yeah, I think what I would like the last thing I want to or to give back to the community. I think we need to document this more on document more example how especially beginners can get started. And I hope the amount of time and things I found out we can share with the community as well. So if you have any questions further than that. Please feel free to ask me.
Tom Sweeney: Yeah, I do have a quick question Steffen if you could share the link for your GitHub so I put more on some people can go ahead and dive in once they get that and put it I can keep it on YouTube as well.
Steffen Roecker: Yeah. That's a good Yeah, and one thing which I wanted to add that I think the network thing is not working. I try to test it for our meeting but I couldn't get it to really work with the network. I think that's the last minute change. I edit a few months ago. But yeah in theory it works and on I have to say and kubernetes. It's a special shift. It's much more easier to set these things Even GPU operator than doing these things locally. So yeah, I still think using containers. Is good for this kind of work and people should use it more?
Tom Sweeney: and thank you for the link. I see that there. So does anybody have any questions for stuff on?
Tom Sweeney: Yeah, I am not hearing any. And I will thank Stephan was really nice presentation and Chuck and be interested to see how this grows over time. I'm sure it will. Nalin, we have you up next talking about podman manifest and the support for artifacts.
00:25:00
boston-video-enclave-3n292: Okay, just second while I get my screen Sharon going.
boston-video-enclave-3n292: All right. I'm here to show you.
boston-video-enclave-3n292: Okay, I'm here to discuss popular manifest and ocisful artifact support by way of background. Most of you are probably familiar at this point with using manifest lists the doctor format or they're related oci image index which is more or less the same thing to distribute multiple versions of a container image that have been built for different architectures. One of the things that we wanted to do with podman 50 and Brent could probably speak to this better than I do is distribute the disk images that pot and machine uses in the same place at the very same time as the container images that we're used to generate them and thankfully oci 1.1 as an ocean called artifacts which left us in bed. None can take items that are not containers in image indexes and distribute them through Registries exact same way. So we wanted to one of the things we did for Paul Man 5 and the associated version of Billa is add the ability to do that. So I'm just a quick rundown of the differences between the two first thankfully command like history. Remember some of this stuff for me. We'll look at the cont.
boston-video-enclave-3n292: Image for BusyBox for example and in particular you see that it has a media type which says this is a noci image manifest. It has a config blob which would get the regular config blob. It's 372 bytes of Json. We're not going to look at that and things like environment variables the name of the command to launch by default pretty straightforward stuff. It contains. Well in this case just a one layer but each layer also has its own meaty type that tells you what it is. In this case. This one tells you it's essentially Giuseppe's carball, which is fine. We're not going to look at that one either. Those games also have things like artifacts. Sorry annotations attached to tell your additional information depending on who built it and what other information they wanted to provide in contrast that in artifact manifest looks very similar because I think the intent is to make it fairly easy for Registries that are already out there to add support for our artifacts, which is essentially just relaxing a set of restrictions they place on things that you push them. So let me inspect one that I've already got up there in the cloud, which is
boston-video-enclave-3n292: this one you'll see that frequently you add something like an artifact type field which in addition to saying this is an oci image manifest index tells you what sort of artifact it is and this value here is just the default would be picked up from whereas which is we didn't actually know because nobody told us but we have to put something in here anyway, so that's fine. The config blob is actually just a lot if we actually embed the data for that config blot here. If you I'm day 64 to goodness. This is just a pair of curly braces. It's two bites and here is the interesting thing the layers, quotes are actually the files to be attacked in this case. This is when I generated from the Etsy Services while on my machine, it's 700k. We added in annotation to the layer that says, you might want to name the services instead of that big shot some if you're gonna store it in the file, but other than that, it looks pretty straightforward. You can slot this into an image index the same way that would it container image and then you can push it to a registry. So now I'll demonstrate that.
boston-video-enclave-3n292: Greater manifest and caught in manifest help. We see that now has a number of additional options for artifacts. The main one that you want to use is Dash artifact it'll guess about the rest if you don't So we're gonna skip a bunch of these and I'll see. Yeah. you're sharing windows. Covering directly over the part where I'm typing so I can't actually see them doing it. Look at this.
boston-video-enclave-3n292: But in the Manifest list, sorry image index gratitude and it's done. Let's use the Etsy protocols file.
boston-video-enclave-3n292: Inspect We get a little bit more information than we used to in particular way to keep track of the fact that there's an artifact in here now and that's the file that we're using for it under the cover is probably and actually just kept a similar to this file. So if you change the doctor monitor of things are gonna go wrong it push time because the digest will no longer match. So don't do that. If you add things if you're wearing pod man, or what we actually have to upload a copy of file, so that's okay, but it takes up a little bit more gist space. So in case man the best push
boston-video-enclave-3n292: today's date April 2nd
boston-video-enclave-3n292: And hopefully quit that I was there we go. I'm sorry.
00:30:00
boston-video-enclave-3n292: We can't go ahead and inspect that list and put that to you. We can see that we have a regular image index. We keep track of the artifact type when we add one to an image index now and then we can actually just query clarifies. Not a word. We compare that manifest directly and take a look at what we've got now
boston-video-enclave-3n292: but we just make it more legible. and as again, you can see this is pretty much better plate every single time. But now we've uploaded the contents of our protocols file, which is only 6K. And in a plan and machine image index you're going to Entries for multiple artifacts and you're going to see artifacts for different architectures different hypervisors. And those will also include the container which is that we're used to generate them, which I think is pretty slick. And it makes sure that when you're looking at it in the rest, you're always looking at versions that are synchronized with each other and they can't fall out of sync. That's something really horrible has happened and that's the entirety the demo and hopefully enough of background or that everyone knows what's going on those over here who might be wondering. Hey, can I create an image artifact for something and not put it in an image index that's not there yet. We didn't need it, but it's coming.
boston-video-enclave-3n292: And that's the end of the demo. Have there any questions I'm going to stop sharing so I can see them on my screen. Unless there's something people want to take a look at before I stop doing that.
Tom Sweeney: And not seeing any.
boston-video-enclave-3n292: Yeah.
Tom Sweeney: Go ahead.
boston-video-enclave-3n292: that's me. Going to stop Got it not go ahead and ask the question. However No.
Tom Sweeney: Yeah, but I was hearing an echo. I thought it was somebody else's question in front of me. are there questions for nalin?
boston-video-enclave-3n292: All right.
boston-video-enclave-3n292: I should add that. this is something we actually completed about a month ago, maybe two months. So it's in the current version of podman and It's in the current version of pop in five and build was it one about 33 that work,
boston-video-enclave-3n292: probably 135 that
boston-video-enclave-3n292: so it would love to hear if you're running into problems or places where we can use the command line interface friendlier or more helpful. Right. Now we have a lot of these things filled in by defaults. If there are other things you can do to improve the user experience with us. I would love to get some feedback on that.
Tom Sweeney: All…
boston-video-enclave-3n292: All right.
Tom Sweeney: It's great. And that we have on one update.
boston-video-enclave-3n292: we have
Matt Heon: Okay, this is less of five and one update since we've already shipped it and more just a general release plan for the future. So we shipped 50. I want to say three weeks ago now two or three weeks and now we're starting to focus on stability releases four five. there were a number of problems with rules, which is to be expected. It was a major release and we're trying to get those fixed as we find them 501 was out yesterday that had most of the fixes for big things. We've identified still a few open large issues, but we're trying to get those sword especially once around pasta the new rootless network default.
Matt Heon: let's see. So I'm expecting we will have probably a 502 maybe a 503 so some additional stability patches coming out over the next couple weeks for our next minor release. I would expect a pod man 5-1 sometime in the maytime frame probably the second half of May and that is going to be a much smaller release than 50 obviously don't really have any specific features plan. This is more of a let's get whose outset at some point early summer and then probably a five at some point in the later summertime frame maybe a July all this time frame.
Tom Sweeney: Just trying to catch up notes here. Are there any questions about that or comments?
00:35:00
Tom Sweeney: I'm not hearing anything. thanks for that Matt. And given that we are out of plan topics for today and are there any open questions or topics that somebody else want to bring up?
Tom Sweeney: Take more thinking about that. I'll just remind everybody that the next community meeting will be on Tuesday, June 4th 11. Am again eastern time wutc five. I'm not at the moment and the next ball meeting will be coming up in two weeks from today on the 16th, and I'm always looking for topics for our either or both of those. And again, the cabal meaning is generally more of a design type of meeting things that you'd like to see added in the future. Whereas this community meeting is more of a demo to any questions comments
Tom Sweeney: see something in
Tom Sweeney: the chat
Tom Sweeney: I think rahil was making a note towards Steffen about them adding away to another container from Cube play Maybe add it annotation for that.
Steffen Roecker: If you've read you to open a APR and I was looking at my contributions haven't touched it in a few months. So yeah, I'm happy for any hinder recommendation. And as I said, I was a Putman nuke before that. I still am so
Tom Sweeney: Right anything else for today? one last chance before I turn off the recording
Tom Sweeney: then I will thank the folks who presented today and check it was good talks all around him. Thanks y'all for attending and we'll see you next time.
Meeting ended after 00:37:04 👋



 ```

 ## Raw Google Meet Transcription
 ```
 Tim deBoer
 11:03 AM
 If it's possible, I'd like to present in the first 30min
 Steffen Roecker
 11:03 AM
 Fine from my side
 Tim deBoer
 11:11 AM
 https://podman-desktop.io/blog
 Steffen Roecker
 11:26 AM
 https://github.com/sroecker/LLM_AppDev-HandsOn/tree/main
 Rahil Bhimjiani
 11:38 AM
 AFAIK there is no way to "init" container from kube play yaml. Maybe add annotation for that?
 Rahil Bhimjiani
 11:39 AM
 Thank you all
 ```
