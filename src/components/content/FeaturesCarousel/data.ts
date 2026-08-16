const tabData = [
  {
    label: 'Find',
    title: 'Find and pull down containers no matter where they are.',
    commands: ['podman search', 'podman pull'],
    description:
      'Find and pull down containers whether they are on dockerhub.io or quay.io, an internal registry server, or direct from a vendor.',
    terminal: `$ podman search busybox
INDEX       NAME                               DESCRIPTION              STARS  OFFICIAL  AUTOMATED
docker.io   docker.io/library/busybox          Busybox base image.      1882   [OK]
docker.io   docker.io/radial/busyboxplus       Full-chain, Internet...  30               [OK]
docker.io   docker.io/yauritux/busybox-curl    Busybox with CURL        8
...

$ podman pull docker.io/library/busybox
Trying to pull docker.io/library/busybox:latest...
Getting image source signatures
Copying blob 5b8c72934dfc done
Writing manifest to image destination
Storing signatures`,
  },
  {
    label: 'Run',
    title: 'Run pre-built application or distro containers.',
    commands: ['podman run'],
    description:
      'Run containers using images pulled from a registry, or from images you build yourself. Podman lets you run containers as a regular user or as root.',
    terminal: `$ podman run -dt -p 8080:80/tcp docker.io/library/httpd
b2e4a1c9f3d8

$ podman ps
CONTAINER ID  IMAGE                           COMMAND           CREATED         STATUS         PORTS                  NAMES
b2e4a1c9f3d8  docker.io/library/httpd:latest  httpd-foreground  10 seconds ago  Up 10 seconds  0.0.0.0:8080->80/tcp  eager_almeida`,
  },
  {
    label: 'Build',
    title: 'Build container images from a Containerfile.',
    commands: ['podman build'],
    description:
      'Build OCI and Docker-compatible container images using a Containerfile or Dockerfile — no daemon required.',
    terminal: `$ podman build -t myapp .
STEP 1/4: FROM registry.access.redhat.com/ubi9/ubi-minimal
STEP 2/4: COPY . /app
STEP 3/4: WORKDIR /app
STEP 4/4: CMD ["./start.sh"]
COMMIT myapp
Successfully tagged localhost/myapp:latest

$ podman images
REPOSITORY        TAG      IMAGE ID      CREATED        SIZE
localhost/myapp   latest   4f9a2b1c8e3d  5 seconds ago  112 MB`,
  },
  {
    label: 'Share',
    title: "Share the containers you've built.",
    commands: ['podman push'],
    description:
      'Podman lets you push your newly-built containers anywhere you want with a single podman push command.',
    terminal: `$ podman push myapp quay.io/myuser/myapp
Getting image source signatures
Copying blob 8a3f0c9b1e2d done
Copying blob 1c92e4a7b6f0 done
Writing manifest to image destination
Storing signatures

$ podman search quay.io/myuser/myapp
INDEX     NAME                    DESCRIPTION  STARS  OFFICIAL
quay.io   quay.io/myuser/myapp                  0`,
  },
];

export default tabData;
