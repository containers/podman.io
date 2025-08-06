# Podman Community Meeting Notes
## August 5, 2025 11:00 a.m. Eastern (UTC-4)

### Attendees
Ashley Cui, Brent Baude, Gerry Seidman, Giuseppe Scrivano, Jake Correnti, Jan Kaluza, Jan Rodak (Honza), Lokesh Mandvekar, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Neil Smith, Nicola Sella, Paul Holzinger, Tom Sweeney

### August 5,  2025 Topics

 1. [Orches](https://github.com/orches-team/orches) - Ondrej Budai
 2. Podman MCP Uses - Brian Smith
 3. Reproducible Container Builds - Nalin Dahyabhai

### Meeting Notes provided by Gemini
### Meeting start: 11:02 a.m. EDT (UTC-4) Tuesday, August 5, 2025
### Video [Recording](https://www.youtube.com/watch?v=v8HyyGA679c)


## Summary
Tom Sweeney opened the Pondman Community Meeting, where Ondřej Budai presented Orches for GitOps with Podman, a personal project for managing Podman containers and system units, and discussed future enhancements like systemd timer support. Brian Smith showcased their experimentation with the Model Context Protocol (MCP) using Podman containers, demonstrating how an LLM can interact with external tools, and Aditya Rajan inquired about Podman supporting multiple MCP servers. Nalin Dahyabhai detailed efforts to achieve reproducible container image builds, highlighting solutions in Buildah 1.41.0 and Podman 5.6 using the reproduciblebuild.org source state epoch specification, and demonstrated how to achieve reproducible builds using `SOURCE_DATE_EPOCH` and the `--rm-timestamps` flag.

## Podman Community Meeting Introduction
### Tom Sweeney
### ([00:00](https://www.youtube.com/watch?v=v8HyyGA679c) in the video)
Tom Sweeney opened the Podman Community Meeting on Tuesday, August 5th, 2025, noting that meetings typically occur on the first Tuesday of even-numbered months. They mentioned that future meetings might adjust to be more accommodating for attendees in Asia and Australia, with topics driven by prior meetings or requests, and indicated that notes would be taken via Gemini.

## [Orches](https://github.com/orches-team/orches)
### Ondrej Budai
#### ( [1:35](https://www.youtube.com/watch?v=v8HyyGA679c&t=95s) in the video)
##### Orches for GitOps with Podman 
Ondřej Budai presented Orches([slides](./orches-pcm.pdf)), a personal project for managing Podman containers and system units on a single node through GitOps. They explained that Orches periodically checks a Git repository for updates and applies configurations, similar to Kubernetes' Argo CD, but designed for single-node deployments to avoid Kubernetes' overhead for smaller setups. Budai [demonstrated](https://www.youtube.com/watch?v=v8HyyGA679c&t=492s) Orches managing container deployments, updating them via Git commits, and highlighted its ability to manage itself and prune all deployed containers.

##### Orches Future Enhancements 
Ondřej Budai shared future plans for Orches, including implementing support for systemd timers to enable automated backups of volumes. Mohan Boddu inquired about running a subset of containers from a repository, to which Budai responded that this feature is not yet implemented but is a highly requested item, with discussions ongoing about supporting multiple servers from a single repository.

## Podman MCP Uses 
### Brian Smith
#### ([18:13](https://www.youtube.com/watch?v=v8HyyGA679c&t=1093s) in the video)
#### Podman MCP Uses 
Brian Smith presented on their experimentation with the Model Context Protocol (MCP) using Podman containers using this [Containerfile](https://github.com/ai-local/mcp-cli-container/), explaining that MCP is an open standard introduced by Anthropic that allows large language models (LLMs) to interact with external tools and data sources. They [demonstrated](https://www.youtube.com/watch?v=v8HyyGA679c&t=1358s) how an LLM running in a container could use an MCP server to execute commands on the system, such as checking memory usage or listing running processes, to answer questions. Smith also shared resources for MCP servers and clients, noting the wide range of existing MCP servers.

#### Future of MCP and Podman Integration 
Aditya Rajan inquired about Podman supporting multiple MCP servers and providing a unified endpoint for easier management. Brian Smith agreed that a unified API endpoint could be beneficial and suggested the future possibility of an MCP server specifically designed for managing Podman containers (e.g., starting, stopping).

## Improvements to Build Reproducibility
### Nalin Dahyabhai
#### ( [29:04](https://www.youtube.com/watch?v=v8HyyGA679c&t=1744s) in the video)
#### Demonstration of Reproducible Builds 
Nalin Dahyabhai [presented](./Improvements-in-Build-Reproducibility.pdf) and then  [demonstrated](https://www.youtube.com/watch?v=v8HyyGA679c&t=1946s) how to achieve reproducible builds by defining the `SOURCE_DATE_EPOCH` as a build argument and using the `--rm-timestamps` flag, which ensures consistent timestamps in the layers and RPM database. They showed that building an image twice with these settings resulted in identical manifests, leading to bandwidth savings by not pushing updated content to registries if only the tag changes.
     
#### Open discussion - (50:55 in the video) -
 1. None

### Next Cabal Meeting: Tuesday, September 2, 2025, 11:00 a.m. EDT (UTC-4)

#### Possible Topics
 1. None

### Next Community Meeting: Tuesday, October 7, 2025, 11:00 a.m. EDT (UTC-4)

#### Possible Topics:
 1. None

Meeting finished at 11:40 a.m.

### Raw Meeting Chat:

```
Nalin Dahyabhai
11:00 AM
agenda and notes: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
keep
Pinned
You
11:22 AM
@ondrej could you send me a pdf of your slides please and I'll include them with meeting notes that I post.
Brian Smith
11:32 AM
Here is the github link for the Containerfile:  https://github.com/ai-local/mcp-cli-container/
I need to drop for another meeting.  Thanks everyone, and have a great day! ```

### Raw Google Meet Transcript

```
Tom Sweeney: I cannot find Oh, here we go. Recording. Move that around too. And good morning folks. Welcome to the Pond Man community meeting. Today is Tuesday, August 5th, 2025. And I'm not sure where in the heck this is coming from. Um so generally on this meeting, we um meet on the first Tuesday of even numbered months. We may make the meeting a little friendlier for our Asian folks in India, China, Australia at some point in time. Um we'll keep you posted on that. topics are driven from prior meetings or requests sent to me or added to the agenda which we have up on the Google chat if you want to see that. Um today we're going to be taking notes via Gemini and then um if you have any questions or if you have links or anything that want to be added to those please go ahead and put those within the hackmd agenda and so we're always happy to do discussions particularly for pop and build a scopio but any other related container projects and there's the meeting notes there and so today we have three talks we're going to have a talk about from Andre Budya And hopefully I didn't pronounce that too too badly.
 
 
00:01:35
 
Tom Sweeney: And then Podman MCP uses with Brian Smith. And then Nelan Dyave will be talking about reproducible container builds. And then um at the end we'll ask for any topics or any questions that you may have. So with all that I'm going to stop sharing and I will go ahead and turn it over to Andre.
Ondřej Budai: All right, let me share my screen. All right, I think it worked. So, uh, by the way, no one told me how much time do I have. I have a content for about 12 minutes. I hope it's fine.
Tom Sweeney: Yeah, we have generally do about 15 minutes.
Ondřej Budai: So, okay.
Tom Sweeney: So it sounds right on
Ondřej Budai: Awesome. So, uh, yeah, I'm here to talk about Orcus. Uh, and I don't know how to pronounce it. I don't know why I name a project in such a way that I come I don't know how to pronounce it. So I call it orchest I don't know like the word or orchestration and yeah I want I work for redhead.
 
 
00:02:36
 
Ondřej Budai: Uh but this is my pet project does doesn't actually have anything to do with my with my day job. Uh well kind of I don't know I work on operating systems. So okay um it's a simple githops tool for permanent cmd and uh the structure of this of this demo will be that firstly I will talk about the story why I made it because I think it's it's pretty important to understand what problem I'm trying to solve and then I will have a live demo that will hopefully go all right. Uh so let's jump right into it. Uh so I you know at one point I got a server and I wanted to host uh applications on it and that was my goal. I I wanted to post stuff like jellyfin sink forjo the usual stuff that you host on your own infra uh if you want to you know uh if you don't want to rely on cloud providers or you know third party services and of course I wanted to use containers because what else would you use nowadays uh but um I had one thing that I really wanted to uh to use in this new deployment and that was githops uh So in the case you don't know githops uh githops is uh is a way of managing your servers where you have just a repository of some declarative files and whatever you want to change in your deployment
 
 
00:04:00
 
Ondřej Budai: you just send a change or push a change to your repository and then the server will just automatically apply the configuration in that uh in that uh repository and you reconcile or basically update itself. Uh so in this case, this is kind of Kubernetes like syntax for containers. It's a bit simplified so it fits on the screen. Uh but yeah, this change is basically about updating Syncf. Syncf is is just an application for syncing files between between computers and in this change uh I am actually changing updating sync thing from 129 to 1.30 and uh in in a githops workflow I just need to commit this change push it somewhere and then the server will just update the same thing container so it will stop the old one bring up new one and everything works. Uh so this is what I really wanted because uh we use so in my in my day job we use terraform we actually use kubernetes I will talk about it a bit on next slide and it's just magic I don't like ssh sshing somewhere and running or running bash commands or you know encible I would just like to work with a with a repository if possible so uh I went the natural way and I deployed kubernetes because u yeah kubernetes has basically two projects with uh that are doing githops.
 
 
00:05:31
 
Ondřej Budai: It has arg and flux. Uh I chose argo cd because it has a nice UI so I can actually visually see everything and argod it's basically an operator running on kubernetes which does exactly what I described. So you point it at a at a g repository and Argo CD periodically checks for updates in that repository and applies the resources uh applies the all the Kubernetes files in the repository to your cluster and it just makes it up to date with with the remote uh repository. This is amazing. It it works. But uh the issue is that now I have Kubernetes running at home and uh I mean Kubernetes don't get me wrong it's it's a great tool but it's great for production grade applications art scale but if I want to just run you know one server some containers I don't know maybe 20 10 of them like not too much uh not too many uh it's just an overkill and like you need to make decisions regarding your deployments it it's just it's just art. Uh, and at one point I just realized I miss Podman.
 
 
00:06:42
 
Ondřej Budai: I just like running containers using Podman. It's so simple. Just do Pman startment run and you have a container. What what else I need? I don't need a whole Kubernetes thing to run 10 containers. So I looked over the internet. I found some projects that are trying to solve this issue. Uh, but uh like they were not very well documented. they were not very well maintained. So I did what uh we all do. I started my own and um yeah I made Orcas which is um a tool for managing podman containers and system units uh on a single node. So it's not multiode like kubernetes everything runs on a single node and it does exactly what what I described earlier. So you point it at a git repository and it just periodically fetch fetches uh you know or searches for any updates there and applies them to your system and the core of it are of course the super amazing podman system units also called quartlets. I think that the name is still alive.
 
 
00:07:50
 
Ondřej Budai: Uh so that's it. Uh so I can actually show you uh how the exact same thing that I described here works with with with with uh cordlets like this is actually a screenshot of a comet from my real Orcus uh repository. Uh so the same thing so I'm updating sync thing actually it's not even created by me. I am running a b you know renovate to update all of my containers and uh so or when it runs on your node uh it just scans this repository periodically and it just uh applies the the the new codelet uh when it finds a new one in the repository. So I think it will be better explained in a demo. So let's have some fun and let's let's show you how it works. Uh yeah. So uh let me start. So or it's just a small go repository. It doesn't have too many lines of code. And uh for this I will start with the rootless template because Orcus can support both rootful and rootless containers.
 
 
00:09:02
 
Ondřej Budai: I try to run everything rootless. Uh so let's start with this one. uh so or or config ruthless and here are the steps needed uh to uh you know start with orchest lingering uh because if you don't enable lingering then all your resources will be killed after you lock off your server. Uh so we need to enable this. Oh and by the way I forgot to mention what are we using? We are using I hope it's big enough. I can maybe make it even slightly bigger. Yeah. Uh so uh Orcus is quite distribution independent. It basically needs two things. It needs systemd which is everywhere and podman. Uh so uh I tried Debbian work wonderfully, Fedora and CentOS of course works wonderfully and this one uh I'm actually on most of my deployments I run uh some kind of a bootsy thing. So this thing is actually the stock federa booty image because uh it has appointment and and systemd uh so let me copy these commands.
 
 
00:10:15
 
Ondřej Budai: So enable lingering uh we need some directories that orchestral use and then I need to run this big ugly command. Uh so let me very quickly explain what it does. Uh so you know it's just run with some extra privileges because I will need to control systemd on the host from a container. So I will need to mount some systemd stuff into into the container and then some volume some configuration nothing interesting. Uh this is the orchest upstream container that is maintained in this repository. Uh and I'm calling the init uh operation on this repository itself. So this is actually this repository and if I take a look here it has you know read me renovate file nothing interesting and then two files the orchest container itself which is basically the same thing as here just defined in the quadlet so or is actually self-managing itself so you can update or with by just updating uh its container file and the other thing that we have here is just a simple web server so k um published on on a port we will see it later.
 
 
00:11:27
 
Ondřej Budai: So what this will do it will it will initialize or run it as a container and one payload container will be there with just a container. So let's just run it and see if it works for the reference because pulling containers take a while. I pre-cached all the containers or pre-pulled all the containers on this node. So we don't have to wait and uh you can see that uh it was initialized the orchest uh deployment and we now have two containers running and I can actually indeed see that there are two containers running. So there's orchest container there is k container and let me just very quickly verify that it runs. So this is the IP address I'm pretty sure uh 243 yes port 8080 and yes uh or worked and now we have uh we have uh uh running um or uh deployment and I can actually run podman xxx system the orchest which is the name of the orchest container and I can ask it hey what's the status and the status is this is the remote and uh we are pointing at this reference which I can double check.
 
 
00:12:41
 
Ondřej Budai: Yeah, this is the latest commit 2086 206. Uh great. Now what else I can do? I can actually use this template. So let me very quickly create a new repository. Call it demo. Uh choose the owner. That's me. Let's very quickly create it. And it should be done very quickly. And I can actually say hey Orcus now let's point to my repository. And now Orcas it's pointing at my repository. The deployment should be still running. Yes, it's still running. So now Orcas will every two minutes uh it will pull from this repository and see if there are any changes. So let's make a change. Let's go to the uh K uh K container file and let's just very quickly I don't know change a port. Uh and now Orcus will reync after like two minutes or something. We can actually make it a bit bigger, a bit faster. So I can just call or sync uh and will uh sync the deployment.
 
 
00:13:48
 
Ondřej Budai: Let's refresh. And yeah, I'm unable to connect, but I can fix it by uh using a different port. So you can see Orcas uh successfully synced my deployment was defined in my repository. The last thing that I want to show you is that I uh I created a big repository with a bunch of examples. So I can just switch to it. Uh let's just switch to this one. Uh it will be done in a minute. Yes, it's done. And this is why I needed to prefetch the containers because there are like eight of them running and it takes a while to pull them. Uh and yeah this this repository it contains like eight services ready to go. Uh so for example on the port 8080 this repository that we are now following it has the forjo uh git forge and yeah this is the forjo installation page. Uh I can for example show you the jellyfin well installation page. Everything needs to be installed because this is a brand new deployment.
 
 
00:14:54
 
Ondřej Budai: Uh but yeah everything seems to be running. So now we are following this example repository. And the last thing that we can do by the way I can show you that uh yeah we have a bunch of containers running on our machine right now. And the last thing or can do it can do prune which means that it will just remove everything. This takes a while because we need to stop all the containers. Uh so give it a second and yeah nothing is running. So everything is cleaned up. All the container units are gone. Uh you know I cannot access anything and yeah this is it. This is how you use or in like 5 minutes. Uh so yeah uh Orcus it's available on GitHub. Um I am using it uh in on like two, three, four, I don't know how many deployments currently I have. Uh and it works quite wonderfully and together with renovated allows me to pin the container versions and then uh update them uh using pull request.
 
 
00:15:59
 
Ondřej Budai: I just need to merge. It works very wonderfully. Uh the next thing that I want to work on when when time allows is that I would like to implement support for systemd timers because I think that using systemd timers for backups would be amazing. So you know every night just make a copy of all the volumes and arsing them somewhere or something like that. I would be fairly nice workflow and yeah github.comteam/orgus. Just go there check it out play with it. I think it's pretty awesome. That's it. Thank you.
Tom Sweeney: All right. Thanks, Hre. That was great. Any questions, comments?
Mohan Boddu: Uh first of all Andre thank you for coming in uh and uh showing us the demo. Um quick question. So if I point it to a repo and uh is there any way that I can say like okay I want to use like these ABC containers even though if it has like 10 different containers like yeah but
Ondřej Budai: Uh sorry.
 
 
00:17:07
 
Ondřej Budai: Um you have a repository with 10 containers.
Mohan Boddu: I want to only uh to run like three containers out of back.
Ondřej Budai: Oh, I see. Uh so currently there is no way to do it but there were some discussions in the upstream issues about this because you are not the only one who wants that and uh currently there are two proposed solutions. So we would like to merge uh to to to have this feature together with support for multiple servers being driven from one repository because I think it makes sense. So you can point multiple servers at one repository and then have defined which uh containers are run on which machines.
Mohan Boddu: Yeah.
Ondřej Budai: So this is something that that that is documented there and people would love that. So it's not currently implemented but there is a high demand for it and I can absolutely see why this would be very useful.
Mohan Boddu: Okay, thank you, Andre.
Tom Sweeney: Sorry about that. Had somebody come to my door. Always perfect timing. Um, okay.
 
 
00:18:23
 
Tom Sweeney: Any further questions for Andre? Otherwise, we'll move on to Brian. Great. Andre, thank you so much. It's really very interesting.
Ondřej Budai: Thank you.
Tom Sweeney: Brian, Brian Smith, MC, you're gonna be talking about Podman MCP uses. Take it away.
Brian Smith: Yeah. Yeah. Hello everyone. Yeah. My name is Brian Smith. Um uh Neil had just asked me to come on and present about some of the experimentation I've been doing um testing the model context protocol using containers and and using Podman. Um, if you're not familiar with um, the model context protocol or MCP, I'll I'll just cover kind of a brief overview. Um, basically this is a an open standard that was uh, introduced at the end of 2024 by Anthropic. And what it allows um large language model systems to do is um basically interact with outside tools and data sources which really greatly expands the potential use cases for um you know these AI large language model systems. Um so if you think of a you know if you think of a use case if you asked one of these large language models you know before this kind of technology was available if you asked you know what's what's the weather going to be in my location tomorrow um the large language model you know didn't have that in its training data so it didn't really have the ability to answer that kind of question right but if
 
 
00:19:46
 
Brian Smith: you are in this kind of MCP world you could get a MCP server that is able to to go out and and get the weather forecast for you and and provide that information back to the large English model. So those are the kind of use cases um you know where it basically enables a large English model to retrieve data and go out and make changes um as well. So if you want more information on on you know kind of how this works and um what the standard defines and everything there's the model context protocol.io website that has a lot more information. Um I also wanted to show I found um this list on GitHub. This is a list of um oh this is the wrong the this one here the list of MCP servers um so this is just kind of a list somebody put together um but it kind of shows that you know kind of the different areas that they're already MCP servers for and they cover pretty much everything you can think of. So these are the different categories and if you go look through this there's there's literally hundreds of MCP servers out there.
 
 
00:20:48
 
Brian Smith: Um like I said for pretty much any use case you can think of and so um I wanted a way to kind of experiment with this and I wanted to use a container to do it. And so um I I found a um an MCP client that is a command line client. So this um MCP CLI um this basically allows you to interact with um you know MCP servers uh from the from the command line. Um there are a lot of other MCP clients. This is another list of different clients that support MCP. So there's a lot of different options out there. Um I just happen to find this MCP CLI that seem to work well in a container. And so that's what I've been kind of experimenting with. Um all right. So, I put together a uh a git repo that has a container file and just some instructions on on how I set this up. The container file is really pretty simple. It's built off cent stream 9 install some packages, installs that mcpi um client that I was talking about before.
 
 
00:21:54
 
Brian Smith: And then I'm using OAMA um which is a open source inference tool to actually run the large image model within the container as well. Um and then once you've once you've built the container you basically just start up within the container you pull down whatever model you'd like to use. In this example I'm just using the Quinn 3 um four billion parameter model but you can use you know any model of your choosing there. And then you basically just configure whatever MCP servers you'd like to experiment with. So uh most of the MP MCP servers you'll find will have this um JSON syntax um where you just basically copy and paste this into the um server config.json file. And then you're you know after after you've done that you can go ahead and run the MCP CLI chat within within this container environment and you know start experimenting with these these MCP servers. So let me show just a quick demo of of what this you know kind of looks like and you know just one one uh example MCP server.
 
 
00:23:01
 
Brian Smith: So I'm here on a uh a Fedora system. I built that container you know based on that container file that I referred to and I've just started a shell in it. Um, so what you need to do is run uh OAMA serve to start OAMA. And then I've already pulled down um that Quinn model that I that I talked about. Again, you can use any model of your of your choosing. I just found that this this this Quinn model, this four billion parameter is a very small model and um runs very quickly. And so that's why I'm just experimenting with that. Once you've done that, like I said, you also want to define that server config um with the list of MCP servers you'd like to experiment with. So, in this example, I'm going to be showing this CLI MCP server. And what this does is allow the um large model to actually run commands in in the in the environment. You can go through and configure this MCP server to, you know, restrict what commands it's allowed to run, what directories it's allowed to interact with.
 
 
00:24:04
 
Brian Smith: Um, just since I'm experimenting here, I have this opened up. So, it's allowed to run any command, um, you know, any command flag, etc. All right. So, once you've done that, um, you basically just start the MCP CLI client. So, let me go ahead and run that. So, I'm going to specify I'd like to use this, um, CLI MCP server. That's what this is right here. And then I'm going to use uh O Lama which uh is going to provide the LM inference. It's running locally as well. Okay. So once I'm in here, I can um you know interact with this and ask questions and it's going to be able to use that MCP server to run commands on the system. So, for example, I could ask a question such as how much memory does this system have? And using that MCP server, it's going to be able to run a command to go out and retrieve this information. Um, this Quinn model, it it's a thinking model. So, you'll see it'll have the first part up here is it kind of thinking through what it needs to do.
 
 
00:25:12
 
Brian Smith: Um, and then here you can see it actually runs the free command to go out and and get that memory information for me. Um, and then let me scroll down here and okay, here down at the bottom, um, you know, based on what it's been able to find using that free command, it comes back and is able to correctly answer that the system has 64 gigs of memory. So just trying to show here that it was able to use that MCP server to run a command to get the information to come back to me with with the answer. Um just another example I can ask the I can ask what are the processes running on this system what are the processes running on this system and again it's going to think through what it needs to do um run a command and then come back and and and tell me what processes it it can see on the system. So um I'll also ask like what is the uptime of this system and again it'll kind of think through use the MCB server run a command and then and then answer the question.
 
 
00:26:29
 
Brian Smith: So so anyways that's just what I wanted to show. I you know basically I just wanted to have a way to set up a quick environment to experiment with these different MCP servers within a container. So, if any any questions I can help out with on
Gerry Seidman: Could you post some of the URLs uh onto the um onto Todd's document?
Brian Smith: Yeah. Yeah. Yeah. I'll post a link to the um to the repository where I have the container file and and where you can learn more information on this.
Tom Sweeney: Yeah, that'd be great.
Gerry Seidman: Thank you.
Tom Sweeney: Thank you,
Aditya Rajan: Uh uh hi Bran. Do you think like uh if Podman can support running multiple MCP servers and giving a unified endpoint would it be uh more helpful for management? Like if AI host can just connect to a unified API endpoint, a unified MCP endpoint which exposes all the tools and uh resources for different MCP servers. So as a user you don't have to manage multiple MCP servers with different endpoints.
 
 
00:27:43
 
Brian Smith: Yeah. And there. And there's a there's a number of different tools out there. Let me let me go back over to this. Um, so this this is a a list of MCP clients that I found. So there there's a lot of different options out here um for for work, you know, interacting with with MCP clients. And a lot of these are a lot more advanced than that um MCP command line interface that I was showing. So, if you if you have more advanced use cases, there's there's a lot of different tools out there that, you know, can can make some of this easier to to work with.
Aditya Rajan: Yeah, we uh so yeah we are trying to look into this like some of the features which we can add into podman so it can make mcp orchestration easier but
Brian Smith: Right. Right. Right. Yeah. Yeah, that makes sense. And there might be an opportunity too in the future to have like a MCP server that's focused on managing podman containers.
 
 
00:28:38
 
Brian Smith: Um where you know the purpose of the MC MCP server is to be able to you know work with pod container start stop you know pod containers that kind of stuff that that might be a potential MCP server that might be useful in the future.
Aditya Rajan: Thanks.
Tom Sweeney: Any further questions for Ryan? Not hearing anything. Ryan, thanks so much. It was very interesting.
Brian Smith: Yeah, thanks everyone.
Tom Sweeney: And again, if you could uh shoot me a link to that GitHub project, I'll go ahead and include it in the notes. You can either do it in G or Yep.
Brian Smith: Yep, we'll do.
Tom Sweeney: All right. That we are going on to Nolan talking about reproducible container builds.
Nalin Dahyabhai: Yep. Okay. Let me just start sharing my screen. Okay, that should be it. Right, there we go. All right. Um so for reproducibles the general idea is that we are attempting to make sure that the image we output is bit forbit the exact same uh if we give it the exact same inputs even across multiple builds done at different times hopefully even across different machines although I haven't tested that one myself um and the big spoiler in this talk is actually given on the slide which hopefully everyone can see I can't see you so if
 
 
00:30:18
 
Nalin Dahyabhai: you can't give a holler um so a lot of things getting code into an image build time. We create a history that includes the current date time stamp. Uh anything that's randomly generated during the build. Uh anything that's created will have the current date stamp on uh as its mod time. The if you're installing RPMs, RPM will store the install times in its database in multiple locations. DNF will do the same thing. It's it's a lot of things to keep track of. And the uh what we ended up doing was just committing the image to a local directory, running the build twice, and then actually diffing everything in the image, including the config blob, the manifest, the individual layers themselves, the files in the layers, until we pin down every single thing that was changing in the test inputs we had. Uh this is not an exhaustive list you're seeing in front of you. There's actually more stuff in the demo that I'm going to show. Uh but uh I found all of them yesterday afternoon, so we're going to be okay there.
 
 
00:31:10
 
Nalin Dahyabhai: We've actually tried this before with the timestamp flag and it is not what we needed. Basically, the big thing that shot it in the foot was that things that you ran during the build had no idea that this was going on and uh they got in the way or rather they didn't know it would cooperate and it didn't turn out the way we wanted. So coming in build a 1.41 actually. 41 came out already, but there's a at least a couple of things that I want to fix before the next dot release and it'll be rolled into podman 56 is we essentially piggyback on top of functionality that already exists which is the reproducible build.org source state epic uh spec in particular rpm already knows about this. So it it dnf will do a lot of the heavy lifting for us during a package build. We also uh replace a lot of things that we would randomly generate because why would we have a fixed value for them? Uh turns out in this case we do need to have a fixed value for them and we went through this.
 
 
00:32:01
 
Nalin Dahyabhai: It's an iterative process but we got most of that stuff figured out in time for 1.41. Um in docker build they also support source state epic but you need to supply a particular flag to tell to change the timestamps of things in the layers that you're creating. So we had to punt that one and make it a separate command line flag which you can use with in combination with source state epic or not. I recommend you do because most of the time it's what you want, but this is just a concession to compatibility with other uh workflows. The source state epic is uh let me back up just a second. The notion of it is a time stamp wherein theoretically it's the latest it's the time stamp of the latest bit of input that was changed from the last time you did the build. So, uh in the demonstration I'm about to show and we might as well just jump straight to that. It's actually going to be the build date of the sorry the most recent build date of all of the RPM packages we're going to install.
 
 
00:32:57
 
Nalin Dahyabhai: And as my demonstration, I'm going to actually use the builder image that we use and distribute on qu.io. And as you can see in Git. And thanks to git diff colororizing the output, there's been some changes from the upstream one that we currently have to the version that I'm going to build. In particular, the first thing we do is we define source 8 epic as a build arg. This has the side effect of exposing it as an environment variable to commands that we run during the build because args are copied over into the environment in particular so the DNF and RPM know that that's what's going on here. We also need to install school 3 because we do still have to muck with the transaction database at the very end of the transaction to make sure that uh to update some things that DNF doesn't do for us here. And then I just added a couple of sanity checks in here in the middle so that everything looks the way we expect it to be. and that the source state epic which I have to pass from outside of the build matches what the inside of the build thinks it should have been.
 
 
00:33:52
 
Nalin Dahyabhai: Um, computing the source state epic is well deciding what value to pass in is actually the most complicated thing once this feature lands and I don't have a good plan for how to do this in production because if this test fails then the whole build fails and you have to start over with the value that it printed out which is not very easy to script. We'll we'll figure that out. Um so for a demonstration um we'll just start with as a point of reference. This is a copy of the image in a directory that I built earlier today. Uh timestamps are yeah about an hour and a half ago and I will build the exact same image now. Um, you can see that this is just a copy of builder that I have my home directory. Multiple layers telling it to skip the cache because we don't well we don't want to be depending on build cache for this one because we actually want to build it fresh. We'll pass the source date epic. Oh yeah, and that date is when the most recent package that's going to be pulled in for this was built, which is 4 days ago.
 
 
00:34:58
 
Nalin Dahyabhai: Um, so let's see. We also pass source to app again. We use ratrack time stamp and I'm going to commit it to a new directory that didn't just exist. And we're at the mercy of the speed of my network connection here. At this point, while it's going, I could entertain questions if anybody has one. I've been going kind of a little fast. I'm sorry about that. Did I accidentally mute my speaker?
Tom Sweeney: Nope. I heard request for questions, so you're good.
Nalin Dahyabhai: Okay. Uh what we're seeing here is DNF is just installing a bunch of packages. In particular, it's passing it's going to take notice of the AR of the source date epic flag and RPM is going to do us a favor and make sure that none of the time stamps of things it's creating um are later than that. It's also going to record the date that we the source epic value as the install date in this RPM database. So the RPM database will not be different.
 
 
00:35:56
 
Nalin Dahyabhai: We did have to mess with this transaction database because the transaction dates aren't um changed for us, but the PNF maintainers were very kind in suggesting the command line that we would have to use to do it. So um so I've just built this directory and if everything worked correctly, this manifest will be exactly the same as the one that I built earlier. Hey, they are the same. So if I push this even with a new tag, there will be no content actually updated to the new registry. Someone who pulls from an updated tag will also not have to download a new version of an image or anything. Uh bandwidth is saved. Children laughing and singing. Um any questions? Okay, I'm going to take that as a no. And I'm going to remind that uh most of this is landed in build at 1.41.0 and will be in pan 56. Sure.
Tom Sweeney: Great, great demo in all. I think uh once people start using this, they're going to be very happy with it.
 
 
00:37:00
 
Nalin Dahyabhai: Oh, I hope so.
Tom Sweeney: Yeah, even the children clapping like so. We'll see. Um last chance. Any questions for Nolan? Right, that is the last demo that we had scheduled today. So, I'll also open it up for any questions at all. And while you're considering that, I'll just run over when our next meetings are coming up. Our next um community meeting will be on October 7th. So, it's about as far apart as they can get. And that will be at 11:00 a.m. Eastern time. And our next cabal meeting, which is usually talk talking rather than demos, talking about design kind of things or issues with bodman or the other container tools, is on September 2nd, which is the Tuesday after Labor Day this year, which is also very early. And that's coming up right around the corner next month. So last last call for questions, comments or topics for the next meeting that people would like to see. Right. With that, I'll stop the recording and stop the transcript.
```
