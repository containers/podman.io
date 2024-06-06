# Podman Community Meeting Notes
## June 4, 2024 11:00 a.m. Eastern (UTC-5)

### Attendees (18 total)

Ashley Cui, Brent Baude, Cedric Clyburn, Daniel Walsh, Gerry Seidman, Jan Rodak, Jhon Honce, Kevin Clevenger, Lokesh Mandvekar, Mark Russell, Matt Heon, Miloslav Trmac, Nalin Dahyabhai, Nicola Sella, Paul Holzinger, Rick Wagner, Sally O'Malley, Tom Sweeney

### Topics

 1) Podman AI Lab Demo - Sally O'Malley
 2) Rosetta in Podman v5.1 - Sheon Tanaka
 3) Podman v5.1.1 Features - Matt Heon

## Meeting Start: 11:02 a.m. EDT
### Video [Recording](https://youtu.be/YTLIrvmI1t4)

## Podman AI Lab
### Sally O'Malley
#### (1:23 in the video)

Sally is talking about the Podman Desktop AI Lab application.  Sally is an App Developer in emerging tech.  She works on the next shiny thing and has had a focus on containers since she joined Red Hat.  Has worked on Sigstore for verifying/signing container images, trusted artifact signer, basically a downstream sigstore, and open telemetry in a stand-alone cluster in RHEL 9.5.  She also has recently been working on bootc over the past few months and also the AI Lab extension.

AI is now for application development.  She has been working with data developers as an app developer to bring the two together.  Cedric Clybrun has a great talk that Sally likes on [YouTube](https://drive.google.com/file/d/1jqcekftwGhkE97S1dIG71kyLXjzbJwI_/view).

Generative AI such as GitHub Copilot, LLaMA by Meta, chatGPT, etc.   

Generative AI uses a lot of cloud storage and CPU.

Podman AI Lab on [GitHub](https://github.com/container/podman-desktop-extension-ai-lab).  The AI Lab has recipes and models in it.

### Demo - 9:38 in the video

She's installed it and clicked on the bottom icon of the Podman astronaut seal. That brought up a Recipe Catalog.  It's all open source.  You can import your own model.  

She then pulled up a new playground and chose a model. She created a Test model, which spun up a pod with the model. Things didn't work well. She checked that pods were running, and they were not. She moved on to the Ragman chatbot.

She created Code Generation but ran into problems, likely because she needed to clean out her local system. The model pulled in about 5Gb of data and then spun up a model container.	After about a minute of status updates, she checked the pods. Sally then went to the logs and showed the kube.yaml that was created automatically.

Sally then showed the Rag Demo, which can be used on top of a model that can be queried. The `make quadlet` command created a number of YAML files and went through that. A model server and a front end are the process. A lot of the automation is done for you, so it's super easy to start up the Ragman chatbot.

`podman kube play rag.yaml` started up the Ragman chatbot app.  She asked about the "Nashoba Grizzlies" but didn't come back with her son's hockey team.  She added a file to the data model, and then reasked.  This time it responded with "based on the content provided"  and showed the info correctly.

Sally pulled up the Podman desktop again and went into the AI lab. She had to restart the pods as they had been stopped. There were issues with the pod. Finally, she got it going, but the demo gods bit her badly. It is usually not this problematic.

We wrapped up with code generation, which ran well. Sally asked how to create a file server in Go, and it showed a piece of code generation and explained the code.

Sally then ran through the various pieces in Podman Desktop and showed how to create an AI App.

Links to blogs and links to other AI Resources:
  * Podman AI Lab on [GitHub](https://github.com/container/podman-desktop-extension-ai-lab). 
  * [AI Lab Recipes Slides](./ai-lab-recipes-podman-community.pdf).


## Rosetta in Podman v5.1
### Shion Tanaka
#### (34:30 in the video)

Solution architect at Red Hat.  Started @podmanio_jp in X.
[Slides](./Rosetta_Support_Podman_Community_Meeting.pdf)

Rosetta introduced in Podman v5.1.	Rosetta is Apple binary translation tech that provides compatibility between different processor architectures.

Rosetta 2 is the version in use.  For Podman v5.0 used emulation on qemu.  Now in v5.1 of Podman, you can use Rosetta transparently instead.

To use, rebuild the Podman machine.

Delete machine ` podman machine rm -f`

Create machine `podman machine init --now`

Use `podman machine inspect  --format {{.Rosetta}}` to verify the machine is using Rosetta

You can now build containers with Rosetta which provides better bandwidth than qemu.

You can disable Rosetta in the containers.conf

### Demo - (40:50 in the video)

Shion removed the machine, and verified the version of Podman, and then initialized the Podman machine.  About 900 Mb of data will be downloaded.

He was working on a Mac with arm64 architecture.  Showed how to check the container and start the process.
In the container he built an image, and he then showed how to remove rosetta from the machine

 Issues:
 	* No way to upgrade a v5.0 to v5.1 machine as of now.  Need to remove and create.
 	* Rosetta can't be used with
      * Kernel extensions
      * VM applications that virtualize x86_64 platforms
      * AVX, AVX2, AVX512 vector instructions
    * Images that can’t be used
      * quay.io/fedoraci/fedora.eln
      * centos_streamIO-development
      * quay.io/podman/stable
        * Cannot pull or build inside a container
    	 
 Dan would like to know how well the DNF update works. If it works well, it's a big buy.

## Podman v5.1.1 Update
### Matt Heon
#### (47:48 in the video)

Released Podman v5.1 last week.  Doing a couple of Z streams over the summer.  Rosetta was added, update changed to match up with Docker better, log changes, and a variety of bug fixes.

v5.1.1 out today with bug fixes, and probably another 5.1.2 later.  V5.2.0 will be in late July per plan.

## Open Forum/Questions?
#### (49:50 in the video)

  * Devconf.cz is next week, Devconf.us come up in mid-August.  Also in Boston just before Devconf.us, a containerization guild meetup.  
  * Cedric and Dan talking about a number of topics with channels, new videos of 5 to 10 minutes in [RHEL Development](https://www.youtube.com/playlist?list=PLdYKU4HjyLFQz_o5uA_m665jRka0yslWp).  Pre-recorded first ones dropping tomorrow, then on Wednesdays after that.
  * The Podman Cabal meetings will now be held on the first Tuesday of odd-numbered months, starting with July 2, 2024.  So going forward, on the first Tuesday of the month there will either be a Community or a Cabal meeting, given we have enough topics to hold it.

## Topics for Next Meeting

1) None added


## Next Meeting: Tuesday, August 6, 2024, 11:00 a.m. Eastern (UTC-5)
## Next Cabal Meeting: Tuesday, July 2, 2024, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:56 p.m. Eastern (UTC-5)


## Google Meet Chat copy/paste:
```
Not captured.
```

## Raw Google Meet Transcription
```
Tom Sweeney: morning, folks good morning recording kicked in this is employment community meeting. Today is Tuesday June 4 2024 We have demos coming up today from I should go through the quick Spiel first. We meet on the first Tuesday of even numbered months here. next up we might move the timing to be friendly for folks over in Asia Pacific topics driven from meetings or requests Please send a topic request at any point time and we're happy to do stuff for Paul man build a Scorpio or even related container projects. We do have meeting notes Here noted in the heck MD and the invitation if you see me write something isn't correct, or if you want to add some more to what I've written, please go ahead and do so. For today, we have parmanai ai lab from Sally O'Malley's and then I have a video from Sean tanakov.
Tom Sweeney: On Rosetta and Paul man, five one. He showed it's about three o'clock in the morning. So I'm hoping that we'll be able to run it and get it to actually work and be able to hear everything. We'll have some comment v511 updates and possibly two updates from Matt's wrap up and then we can discuss about topics for next things.
Sally O'Malley: I know most of the people on this call, but I'm sure this meeting will be shared out, Yeah, because most people on this call will know what I am going to talk about, but that's okay. So let me share my screen. I am going to talk today. I'm gonna give you an overview of the comment desktop AI lab extension. As well as the thing that backs it which is the AI lab recipes that repo where all of the sample application slip. so let me present my
Sally O'Malley: Yeah. Yeah, I got Okay, so I'm going to move into here actually wait
Sally O'Malley: and then now you see the slides, right?
Sally O'Malley: so here we go. again, and
Sally O'Malley: I have so who am I lly? I'm an app developer. Not a data scientist. I work in emerging Tech and so that is good for me if it's my Mo because what I get super excited about new tech I find really great people within Red Hat to share my excitement with and work on it. And then I usually find the next shiny thing the constant throughout my red hat life has been containers when I first started red hat. I was working with the Upstream docker.
Sally O'Malley: Codebase and that was pre-pod man build a scopio and it's just always been there. It's kind of how I like to fill in all the nooks and crannies of my day containerizing things some recent things that I have worked on with in red hat that I've become super excited about and I like to think spread throughout the company and kind of inspired new products and tools is Sig store.
Sally O'Malley: So I'm a SRE for the public good instance of Sig store for signing verifying can take container images and that's one thing over the last year we've read hat has a new product called trusted artifact signer, which is basically downstreaming Sig store and allowing people to spin up their own Stacks, which is very big stack of software. If you're using keyless signing another thing is open Telemetry. It will be in real nine five the Standalone collector and it's sort of sprinkled throughout Red Hat tools. It's a great tool for collecting data. and then the other thing is boot C. I love container.
00:05:00
Sally O'Malley: Based operating system. I think that's what you call it image mode operating system. And so I've been working a lot with that over the past six months too. And then this AI lab recipes Tom and desktop. Yeah, I love extension. So. Yeah for years. We've had a great data science team org and within red hat and I'll get to that in a second and I never really knew what they did because it was AI, I don't know we'll get to it in a few years and I know I'm very good friends with some of the data scientists at conshoh Andrea, Michael Clifford and they work with Jupiter notebooks and Python and other stuff but about seven months ago it became apparent that
Sally O'Malley: AI is not just for data scientists anymore. It is definitely for application development and that is front and center in every conference every meeting every customer call. it's all about AI so we were kind of pushed together. The They know all the data science stuff. We application developers know how to deploy stuff and create containers. And so that is where AI lab comes in it kind of brings those two worlds together. And yeah, I'm gonna show it to you.
Sally O'Malley: So if you want, I don't know where this talk is gonna go. I'm gonna try to speed it up a little bit here. But if you want a more Scene great overview of generative AI development from local the production Cedric Clyburn is an amazing presenter and he just gave this I'm linking it in the slides which I will share as soon as this talk is over and I still a bunch of his thoughts. So there's that this one. So when we talk about AI we're talking about generative AI nowadays, which is with a natural language processing large language models. It's a subset that is where you get all of these things like text generation and code generation and image generation. So that's all called generative AI.
Sally O'Malley: so things like the GitHub pilot all of these every company, is spinning out there their ideas around generative AI but basically it's all the things that were going to be developing and making money with and all these specialized AI tools. Yeah, all the fun things like Chachi BT. whatever so
Sally O'Malley: where does this mean basically how do we get started AI development is really expensive. There's cloud cloud builds storage requirements.
Sally O'Malley: It requires the sun to run one of these huge large language models. so what we decided at Red Hat is a lot of this experimentation can be done locally and that is where podman AI lab comes in. So How do you get started?
Sally O'Malley: if you haven't seen it here is padman AI lab. And hold on. I want to make sure I'm not forgetting to say anything. I want to say.
Sally O'Malley: So yeah, it enables experimenting locally we all have pretty capable laptops these days, especially if you have a Macbook M2 or any laptop is capable of running powered applications locally. And I would probably lab. We just can show you how to do it without knowing a whole lot about Data science, sorry so there are recipes. I'm going to show you these in action but recipes. There are AI lab provides kind of vetted open source models with I should say open source licensed models.
00:10:00
Sally O'Malley: And you can spin up a super cool just environment playground to try out different models and different parameters and let's check it out.
Sally O'Malley: So here I have my palm and desktop. if I go back to the slides here down at the end. Yes, the last slide will give you information about how to get started. If you don't know everyone on this call does but
Sally O'Malley: We go back up.
Sally O'Malley: So this is what it looks like. And I currently have pieman running. I think there's a later version. Matt will tell us in a little bit. And if I go down to the settings here, that's one way to find the extensions. That's how I usually do it. go to settings and I get a link to the extensions. And with the extensions there's a catalog. So podman AI lab is now featured in this catalog. I have already installed it if I haven't already installed it I would just kind of click here. I don't have many cubes install. I have a lot of these other ones installed. So I installed it great. Let's check it out. Here is the robotic seal down here that will bring you to AI lab.
Sally O'Malley: And like I said, there are recipes. So after I show you this I'm going to head over to the GitHub repo that backs these recipes to show you. if you're not a big fan of gooey's I can show you from the command line how to spin these up just as easy. So these are all natural Chatbot text summarizer code generation they work pretty well. And then there are a few others here and more will be added. Hopefully maybe someone on this call. We'll add a sample recipe to AI lab recipes that will find its way here.
Sally O'Malley: But these are all containerized they all run as a pot. So I will spend one up in a second, but I want to give you a little bit more of a tour. So here is very cool list of models that AI lab has gathered for you. So these all have open source licenses. You can also import your own model. So a big thing with AI development now is training kind smaller models to do specific things and I kind of think that's the way that the money making side of AI is going to go where we've got all these, specific models for different tools. And so you can train them and create them and import them here and
Sally O'Malley: With these models you can then the model isn't useful on its own you need to be able to serve it. And once you serve a model it's kind of like a file server you get an endpoint that you can then set up an inference. With so you can ask it questions and make it do what you wanted to do. So that would be there are two ways to kind of serve a model here with AI lab one is a Bare Bones just you spin up a thing called a model server. I can show you what's in it from the GitHub repo. But yeah. I'm not going to create it here now because I'd rather show you the playground. And is this already running? I hope so. Let's see. I'll start a new one. So I'm gonna hit new playground here and you can see I can choose any model.
Sally O'Malley: I believe. This one is already downloaded. somebody use this one and I'm gonna say
Sally O'Malley: I'm just called test create the playground. So what's happening is? A part of spinning up in the background with that model. Which is a Big Blob of data is probably like five gig four gig and a model server. And so you can do things like Define a system prompt.
Sally O'Malley: I don't know.
Sally O'Malley: Answer nicely. I don't know what to say. I didn't plan this. Good and then you can then?
00:15:00
Sally O'Malley: Okay, whatever.
Sally O'Malley: I don't know what's going on. But let's go back to the other one.
Sally O'Malley: So last night I was playing around with it. And I said you are helpful assistant who always makes a joke with your responses I thought it would give me a joke. It didn't so let's just try it again.
Sally O'Malley: Can you tell me what podman is?
Sally O'Malley: What the heck? Sorry, of course, this is doing this. We'll try again.
Sally O'Malley: I'll check the pods in a second.
Sally O'Malley: spinning no model service is running great. Excellent. Let's look at the pods.
Sally O'Malley: There is no pad running. That is a problem. So let's try.
Sally O'Malley: I'm not gonna play with this too much longer. I think what I'll do is go on and then I'll come back to this maybe after at the end of the call figure out what was going on locally here and show it to you after but let's spin up a chatbot. That's a code generation.
Sally O'Malley: Great great first before I do that, I'm gonna stop any pods that I have running.
Sally O'Malley: No, I'm not because I'm gonna show you that.
Sally O'Malley: I don't know why he's telling me update this.
Sally O'Malley: Okay. Try again.
Sally O'Malley: 
Sally O'Malley: I think what's happening is I have an old I need to clean out my local system. but hopefully it will push through and it is
Sally O'Malley: so what's happening here on the side is it is checking out the repository that I'm about to show you. and then it is downloading the model which is about four or five gig so you can see I thought it was gonna pull the same one that I already have downloaded. But whatever. It's almost done. And then it's going to spin up a model server container and a inference container which is the front end. So all of these natural language processing applications, they default to the Llama CPP. model server and the front end for all of our sample applications is streamlet. These are well known.
Sally O'Malley: well-known tools that everyone in that's currently playing around with AI is using
Sally O'Malley: Okay, It says it's running. So let me check the pods first just to make sure. So I see I want to show you this rag app that I have running locally from the CLI not from pond man. So that's why I didn't want to stop it. So it looks like you can go to the logs. you can see that the model is being served. Everything looks quite healthy. So that's good. And the cool thing is it gives you a cube yaml because that's how these sample applications are spun up. There's a model server container a mounted file. That is the model and the front end. So yeah, the apartment AI lab uses a local host path volume for the model.
Sally O'Malley: And on my local system, I can show you where it is when we get out of time and desktop so great. It looks like it's running so I can go over here. and open the app
Sally O'Malley: hopefully and what's happening here is that it's just not ready. This isn't an error. It's just gonna take a while. So what I'm going to do is show you the local application that is actually running. if I go over to AI lab recipes, which is here
00:20:00
Sally O'Malley: This is the GitHub repository where all of the sample code lives. So if you had it's under containers and the recipes go to the recipes. We're using natural language processing today and I spun up this rag app, but there's a Code generation a chatbot a text summarizer. so I want to show the rag because it's kind of cool It gives you the option to drop in a file that has specific information that it will use on top of the model to answer your questions. So you can see that this is where companies are going to be using rag to and inject their domain specific information and create these chat Bots. They're gonna help their customers, whatever.
Sally O'Malley: So in order to play around with this from the command line, you can go to this repository and just run. There's some really convenient make commands. I don't have time to show them all here. But the one that you use if you just want to spin up something quickly locally would make quadlet. it does create the files necessary to spin up a systemd service. However, you can take just the yaml from the quadlet you can take the generator yaml file and just run it with padman Cube play. So let me I'm first going to show you what running and then I'll show it to you because it's already running so over Here I have.
Sally O'Malley: I did make quadlet and when I ran make quadlet.
Sally O'Malley: You can see I have the quadlight cube file which looks like this if you haven't seen it.
Sally O'Malley: Here is the cube spot the image file. So if you are running this as a system we service it would make sure that these three images exist before it starts failing. So There's the model containerized model image, which is basically a scratch image that just has the model file in it. There's a little bit more to it than that. And if I have time, I'll tell you about that and then there is this model server. So those are the three pieces of any AI app going today at least from comment AI lab and the AI lab recipes. It's A model server and a front end. There's also sometimes the vector database which kind of should be here. Maybe that's but we'll forgive it out later. So here's the unit file if you can interrupt me I can't see you so if anyone
Sally O'Malley: A question or want to interrupt me. Go ahead.
Sally O'Malley: Okay, and so here this quadlet file or the wrap around the systemd service. It's just going to run. I'm in Cube play this file. So now let's look at that file. And here it is it is and you did notice the automation around make quadlet. It just does it for you? So a lot of things in both Padma AI lab and AI lab recipes just makes it super easy for you to get started. Even if you have no idea what you're doing the data science I have a chatbot running. That's awesome. So here this is the annoying thing about. And I think padman has a plan for this but upstream and kubernetes. It's going to require a long. Kubernetes enhancement proposal which I opened a few weeks ago to make it so that you can volume out and image.
Sally O'Malley: Directly this and it container is necessary you needed I can't just have a scratch model image. I have to have a shell in there. Otherwise because I have to copy this file around which is wrong bad. But it's the only thing possible today. I think pieman is fixing it before Upstream cube is but anyways, that's where that and it container is and then here's the model server container the vector database which goes along with the rag app, which is retrieval augmented. Generation, which means you give it some info on top of what is the model so that it has some additional info and the front end. So that's all This is the pot. And what I did was podman Cube play.
00:25:00
Sally O'Malley: The ragamo I didn't have to use the image of system D. It's just that and it's running. So that's what I want to show you and then we'll see if everything else is working. Here is my rag app. It's localhost:8501.
Sally O'Malley: And I started out by asking it. What is an ashoba Grizzly. My son plays youth hockey on the Nashoba Grizzly. So I was just curious to see what I said. It has knows nothing about hockey or nothing about the actual in the show, but Grizzlies as you can see, so I have a file here that is just an overview of the Nashoba youth hockey program. That's all it is. And I'm gonna add that to my rag application and now I'm going to ask again.
Sally O'Malley: and hopefully it will give me a better answer it did earlier it worked. If it doesn't it's your fault. No, it's because of maybe some bandwidth is being taken up by. Google meet I don't know.
Sally O'Malley: There we go. it says based on the context provided. And I could ask all sorts of questions about it.
Sally O'Malley: So you get the idea, it's fun. I'm doing this all locally.
Sally O'Malley: It's unfortunate that my AI lab is not working quite right and I am going to be very bummed if I get back and it's still not working, but I'm gonna have to show it again next month. That's all.
Sally O'Malley: So you can see very cool. All of the sample applications look like this is the streamlit UI they all look like this. There's the rag the chat the code Jan. So in fact, let's spin up another one. I'm going to stop this one now, and I'm going to go back to podman AI lab. So to stop it you would do parman pod stop. I'm just gonna stop them all.
Sally O'Malley: And go back to palmand desktop.
Tom Sweeney: one last go for
Sally O'Malley: Let's see if we have better luck.
Sally O'Malley: Okie doke I'm going to try a playground again. Maybe it just took time.
Sally O'Malley: Maybe not. Okay thinking kind of
Sally O'Malley: that's silly because I just stopped all of the Pod. So of course that's not going to work. I'm just gonna remove them.
Sally O'Malley: and I will
Sally O'Malley: start from scratch.
Sally O'Malley: model Services starting
Sally O'Malley: I think that it just doesn't like me today. And I don't want to take up the whole meeting. So I'm gonna go back to the slides.
Sally O'Malley: make sure I finished the
Sally O'Malley: what I wanted to show. I might as well try it. Never mind.
00:30:00
Sally O'Malley: Yeah.
Sally O'Malley: So yeah, it's working and honestly there isn't usually not a problem. I'm not quite sure what was going on other than the demo gods. Have struck again. But here's the playground. All I did was You can choose different models. So if you're a developer and you're not quite sure which model you want to use you can go to the catalog here and choose one you can.
Sally O'Malley: I believe you can. Get more information about it. Yeah.
Sally O'Malley: we might as well try to code generation.
Sally O'Malley: Let me see if it's running now.
Sally O'Malley: All That looks good. That's the one I started before and I think it was just taking a little time. So, let's see if it's up and running. if I go over to
Sally O'Malley: Over here I should be able to see the front end.
Sally O'Malley: yay, things are working better so I can say How do I create a file server?
Sally O'Malley: and go it will give me the answer.
Sally O'Malley: It's so cool. you can run this locally. Just exactly…
Tom Sweeney: Yeah.
Sally O'Malley: how I did it or make cubelet podman Cube play and you have your own personal little code Genesis and that is pretty damn good. It really is I use it all the time.
Sally O'Malley: So it's neat And then I'm going to go back to the slides now though because I know I'm taking up too much time.
Sally O'Malley: I will give you one more view of probably my desktop the
Sally O'Malley: the AI lab Overview recipe catalog I'll show you what's running. And you can just spin up a Bare Bones. Model server which spins up automatically with the playground. So that's why I have two running. This is just the information about the model server and look at this.
Daniel Walsh: It's one of them.
Tom Sweeney: Ready? Thanks,…
Sally O'Malley: I'm glad I didn't forget to show you this. You can it gives you.
Tom Sweeney: Are there any questions for Sally before we move on?
Sally O'Malley: code to kind of Embed this into a go application.
Tom Sweeney: holy miracle
Sally O'Malley: So yeah, it kind of tells you how to create your own AI app with whatever language you want. there now
Sally O'Malley: I told you about AI lab recipes. did I show you the code? I did.
Tom Sweeney: Looked up your back at some time in one of following meetings and…
Sally O'Malley: these two blogs are Great about each thing alab extension and…
Tom Sweeney: just to reiterated a little bit. There's a lot of red hat folks that are contributing here, but this isn't necessarily a red hat project.
Sally O'Malley: recipes and then check out these other resources…
Tom Sweeney: It's an open source project.
Sally O'Malley: because there's ohlama and local AI to other projects that allow local AI development open source, and then I found this interview from Andre carpathy. I am I supposed to name wrong, but he was an open Ai and…
Tom Sweeney: Hey any questions before we move on?
Sally O'Malley: Tesla gives a really great overview of where the industry is with regard to infrastructure and…
Rick Wagner: Sally's slides somewhere so we can refer to them later.
Sally O'Malley: what types of applications are we developing and where are we going with AI so I want to make sure I include that and Yeah, I'll share them wherever Tom I'll put them in the dock, right?
Tom Sweeney: Yeah, if you can itself right into the heck MD links there with URLs or…
Sally O'Malley: again, thank you to Cedric for Helping Okay.
Tom Sweeney: whatever or if you want to send me an email.
Sally O'Malley: With these slides helping me basically The public right?
Daniel Walsh: Make sure the public.
Sally O'Malley: basically sharing them with me so that's all I have to switch them to public.
Tom Sweeney: Yes. Yeah,…
Sally O'Malley: I can steal. I am going to come back to you all.
Tom Sweeney: make sure yeah, very good point make sure they're not red hat specific.
Sally O'Malley: 
Tom Sweeney: Ready, so I'm gonna try flying on the edge a little bit.
Sally O'Malley: No.
Tom Sweeney: Sean Tanaka had given us a nice little demo for Rosetta and…
Sally O'Malley: Hello. Yeah.
Tom Sweeney: pot man and hate it. And so I'm hoping that I can play it and…
Sally O'Malley: stop presentation No,…
Tom Sweeney: also share it with the video and…
Sally O'Malley: I need to tell you that there are so many more things in AI lab recipes rather than these sample applications,…
Tom Sweeney: everything. So we will try that and if you're not hearing the sound on this let me know.
Sally O'Malley: there's training and instruct lab embedding boot C images.
Tom Sweeney: Here we go.
Tom Sweeney's Presentation: Hello, everyone.
Sally O'Malley: So taking the systemd services and…
Tom Sweeney's Presentation: in this video I will introduce Rosetta support in Pokemon.
00:35:00
Sally O'Malley: embed them in an operating system image.
Daniel Walsh: success
Tom Sweeney's Presentation: Past let me introduce myself.
Sally O'Malley: I don't have time to show any of that…
Sally O'Malley: but next month, maybe we can show that.
Tom Sweeney's Presentation: My name is xion tanka,…
Tom Sweeney's Presentation: and I am a solution architect at Red Hat in Japan.
Tom Sweeney's Presentation: It's in container technology. And I share information about Pokemon and openshift in Japanese. I am also the also of many blog posts and…
Sally O'Malley: Yeah, please if you have any ideas or want to help maintain the AI lab recipes get repo it would be very much appreciated.
Tom Sweeney's Presentation: books. Additionally I conduct Pokemon handsome workshops webinars and community events in Japan. Do you know about Portman JP?
Daniel Walsh: that was take
Tom Sweeney's Presentation: It's a social media account. I started to broadcast information about Pokemon in Japanese. Last year, I gave a presentation at the red hot event in this outfit. Pretty good, right? let's move on to the main topic. In Pokemon version 5.1. Rosetta support was introduced. These are all high performance x86 emulation on appreciating Max. Rosetta is enabled by default and can be disabled via the continent calf.
Tom Sweeney's Presentation: Hours and familiar with Rosetta. Let me give a brief introduction. Rosetta is Apples binary translation technology that provides compatibility between different processor architectures. There have been two versions of Rosetta released so far. The first version came out in 2006 and rotate to what released in 2020. Rose it to recently add support for the bachelorisation framework enabling the use of Rosetta on average VMS. We are targeting Rosetta 2 which we simply refer to as until Portman version 5.0 user mode animation using user static was available.
Tom Sweeney's Presentation: X86 64 emulation was also performed using this method. Pokemon machine comes with cable uses a dick installed by default put my version 5.1 and the radar you can use Rosetta for x86 emulation. Three important machine Rosetta can be used transparently a rowing users to easy achieve high performance emulation. The next topic is how to Rosetta require Gas podma machine version 5.1 orator So you will need to rebuild your Pokemon machine. I will explain the issue related to upgrading from version 5.0 machine rater.
Tom Sweeney's Presentation: First delete your existing polymer Then create and start a Portman machine using the portma version 5.1 CRI. If Rosetta is not installed on your Mac at this point. I'll pop up window will prompt you to install it. Please proceed with the installation. Alternatively, you can install Rosetta via the share ride beforehand.
Daniel Walsh: Plus
Tom Sweeney's Presentation: Next once your pot my machine is running you can check the status of Rosetta. Use the Portman machine inspect command to check the flags.
Daniel Walsh: That's something.
Daniel Walsh: basically presentation
Tom Sweeney's Presentation: If you want to know more details, you can verify the Rosetta Mount inside the Potomac machine.
Tom Sweeney's Presentation: If you see Rosetta mounted at such Mount and registered in being fmt misc. Everything is set up correctly. In this case kimux8664 will not be present. let's look at how to run a container With the Pokemon run command, simply add the edge option to execute it. This method is same as emulation using user static.
Daniel Walsh: might
Daniel Walsh: It's not.
Tom Sweeney's Presentation: Additionally if you start the container with the touch option. You can check the processes with Pokemon top command. You can see that Rosetta is being used here. Next is building continent images. Long Pokémon build command with the platform option.
Tom Sweeney's Presentation: this method is the same as using user stick for emulation. And AMD 64 image will be created. Here is how to disable rosetta in case you prefer using First disable rosetta in the contest corn file by a dink Rosetta fors to 10 restart the Pokemon machine to disable Rosetta that rosette amount will be gone and qx8664 will be registered instead. When you run the Portman top command you will see Kimo x8664 in the process list. Now I will show you a demo.
00:40:00
Tom Sweeney's Presentation: First let's review the Pokemon machine. This environment is for demo purposes. So I will delete it quickly. but if you want to keep your debt Please backup your images and volumes check the share a version. I have version 5.1.0 Create a Pokemon machine using the podma machine init command and start it with now option in this environment. The version 5.1 machine OS image is already downloaded. So it will be built from the cache. Normally about 900 megabytes of binaries will be downloaded from the internet. You can verify that Rosetta is enabled by learning podma machine expect command.
Tom Sweeney's Presentation: SSH into the polymer machine to check the rosette amount. It is correctly registered.
Tom Sweeney's Presentation: As expected qx86604 is not present.
Tom Sweeney's Presentation: exist the Portman machine
Tom Sweeney's Presentation: The first architecture is Now a container with the edge option.
Tom Sweeney's Presentation: The animation is working properly. Run another container and check the process status.
Tom Sweeney's Presentation: The bottom on top command shows that Rosetta is being used. Stop the container.
Tom Sweeney's Presentation: Next let's build an image. Using this container filed with the platform option.
Tom Sweeney's Presentation: When you check with Pokemon inspect command. You can see that and AMD 64 image has been created.
Tom Sweeney's Presentation: to describe Add Rosetta equal first to the content confile. Here I will uncomment the right to set the configuration. Restart the bottom machine.
Tom Sweeney's Presentation: When you run Pokemon machine inspect command, Rosetta is set to false.
Tom Sweeney's Presentation: Inside the Pokemon machine that rosette amount is gone.
Tom Sweeney's Presentation: And Cameo x8664 it registered instead. Finally, let's talk about now issues. How can users upgrade from Pokemon machine version 5.0 to version 5.1? The answer is there is no offshore procedure. An issue related to this has been opened. I commented on this explaining that the program is due to the missing difference. You are there. As a walk around. You can directly reference the volume 5.1 image using the Pokemon machine OSI command. This will Arrow the upgrade. However, this issue will require with each machine OS update. So we need to consider a fundamental solution.
00:45:00
Tom Sweeney's Presentation: Another issue is that some container images cannot start using Rosetta? Certain features are not supported by Rosetta. as detailed in Apple's documentation Also, there are content images that cannot start with Rosetta. I will provide it samples of reported issues. it might be useful to correct reports on GitHub discussions or other platforms. This concludes my presentation. Thank you very much.
Tom Sweeney: All right, stop this showing.
Tom Sweeney: So look pretty good. I cannot answer any questions. However, I'm sure Sean would be more than happy to answer if you have some form and he was looking for any feedback that you might have. Good better indifference. So if you want to note it in the Notes or let me know real quick or contact him that all works.
Tom Sweeney: And give them that I am going to hand it over for our last day again.
Daniel Walsh: yeah, one of the things I would like to see is how well a dnf update Works inside of one of those servers it's pretty bad in you use the static. so
Daniel Walsh: basically downloading the processing of the huge XML file inside of RPM. Dnf, it's very difficult. If that works, that's a huge Improvement.
Tom Sweeney: Any I'll pass that along and see what he says. Yeah, unfortunately, it's like three o'clock in the morning his time in Japan right now. So not very good conducive to being here and talking with us. He wanted to just stay awake and I understand completely. Right Matt. We had one last topic for Bob man. I'm not sure if it was five o or five one one updates.
Matt Heon: It'll be five one and five two. All…
Tom Sweeney: go for
Matt Heon: So we just released pod man. 5-1 last week. This is on the smaller side for our laces, but we're trying to a bit more quickly now, especially after the absolutely gigantic 50 rewrites. So we're going to do a couple of smaller leases this summer. I'm expecting five to will be out sometime in Late July for context. And what we put out in five one is a couple new features Rosetta as we just had a presentation on we made some Department update to improve its Docker compatibility. Otherwise just a varying assortment of small things adjustments to how we log health checks to reduce log spam on some systems. For example And a bunch of bug fixes the usual Betty there. I think it was about 20.
Matt Heon: We're expecting a podman 511 this afternoon with some critical bug fixes for podman machine particularly on Windows Mac. And I'm expecting probably a couple more bug fixes in the five one series, maybe a five one two and two or three weeks after that and then we will move on to five two and hopefully a five three early fall though. We aren't quite planning that floor out right now. So yeah, that's about all I had on the future release schedule.
Tom Sweeney: Okay, anybody have any questions for Matt on?
Tom Sweeney: hurry But hearing that and given that we'll go into the open form part of the meeting if anybody has any questions on anything that they'd like to ask to anybody right now.
Tom Sweeney: or if you have any topics for future meeting much to see Sally
Sally O'Malley: Hi, I want to point out that we're gearing up for us Devcon CZ is next week. So maybe some people are going but deaf confuses at Boston University. Lots of great pod man talks. There's also an person containerization Guild on Wednesday August. I think that would be the between the 14th and 16th of August the Wednesday night at 5:30. There's an in-person containerization Guild you can sign up for I don't have the info for that with me. But anyways, if you are around Boston or feel like visiting Boston, it's a free conference. Check it out. I put a link in the slides that I shared with Tom.
00:50:00
Tom Sweeney: Okay, do you recall the dates or…
Sally O'Malley: It's in the sides.
Tom Sweeney: so dim the slides?
Sally O'Malley: It's August 14th to 16th. Boston University
Tom Sweeney: Really nice venue Boston years generally not too bad to take time.
Tom Sweeney: Right any other questions comments talks?
Tom Sweeney: I'll just share one last thing we've decided department cabal meetings have been lightly attended as of late and we have been doing them now in Kings of every month on the third Thursday of the month. So what we've decided to do instead is to move them to the first Tuesday of the month of odd number months. So we'll be doing the community meetings which were more demo based like this one today on even number months. And then on the odd number months, we'll be doing the ball meetings, which is more of a technical discussions over things that could or should change within Paul man or design things.
Cedric Clyburn: Hey, yeah,…
Tom Sweeney: So the next one for that will be on July 2nd coming up in three or…
Cedric Clyburn: I just wanted to say I'm helping Dan with a cool new show that I just want to give a quick shout out for…
Tom Sweeney: four weeks. Although giving that's right before the holiday. There's a chance that I might cancel that one as I personally can't be there in somebody else will have to run it and…
Cedric Clyburn: where he's gonna be talking about a lot of cool topics with pod man containers.
Tom Sweeney: then our next community meeting will be on August 6.
Cedric Clyburn: There's some episodes we're gonna be dropping tomorrow on the red hat developer YouTube channel and…
Tom Sweeney: And with all that and Sally just back their mind August 6…
Cedric Clyburn: we'll make announcement on the Pod Man YouTube channel,…
Tom Sweeney: if that's looks like a good time frame for…
Cedric Clyburn: but it's a cool Vlog video series super short five to ten minutes and…
Tom Sweeney: That would love to have you back for that and Cedric you have your hand up.
Cedric Clyburn: I'm super excited to be a part of it. We kind of talked about this doing Summit and I'm glad it's already coming to be like a real project that we're about to lunch. So, stay tuned for that. It's gonna be really technical deep Dives with some guests and very excited for it. So that's my little update.
Cedric Clyburn: tomorrow morning 9 am ET
Cedric Clyburn: Yes, will do.
Sally O'Malley: Is it a live stream or is it a recorded cool
Daniel Walsh: recorded
Tom Sweeney: When the first one is dropping officially. or
Tom Sweeney: Okay, could you get me a link for that, add it to the notes. Right. Thank you smart.
Tom Sweeney: That sounds great. Looking forward to it.
Tom Sweeney: So let's call for close up here. You Bill said anything. Right that I will stop the recording and thank you all for coming today.
```
