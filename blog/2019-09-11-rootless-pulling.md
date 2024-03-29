---
title: Why can’t rootless Podman pull my image?
layout: default
author: mheon
categories: [blogs]
tags: [containers, images, docker, buildah, podman, oci]
---

![podman logo](../static/vectors/raw/podman.svg)

# Why can’t rootless Podman pull my image?

## By Matthew Heon [GitHub](https://github.com/mheon)

Matthew Heon has a blog post on the [Red Hat Enable Sysadmin](https://www.redhat.com/sysadmin/) site about [Why can’t rootless Podman pull my image?](https://www.redhat.com/sysadmin/rootless-podman). In the blog Matt discusses why restrictions on rootless containers can be inconvenient, but why they're necessary. In the blog Matt covers the use of user namespace and the allocations of uid and gid's that are required to make rootless containers work securely in your environment.
