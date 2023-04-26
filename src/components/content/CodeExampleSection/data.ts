const searchExample = {
  command: '`$ podman search httpd`',
  // prettier-ignore
  code: ` 
  INDEX       NAME                                  DESCRIPTION                    STARS OFFICIAL AUTOMATED
  docker.io   docker.io/library/httpd               The Apache HTTP Server Project  3762             [OK]
  docker.io   docker.io/centos/httpd-24-centos7     Platform for running Apache h... 40
  quay.io     quay.io/centos7/httpd-24-centos-7     Platform for running Apache h... 0               [OK]
  docker.io   docker.io/centos/httpd                                                 34              [OK]
  redhat.com  registry.access.redhat.com/ubi8/httpd                                  0
  quay.io     quay.io/redhattraining/httpd-parent                                    0               [OK]
`,
  label: `Podman can search for images on remote registries with some simple keywords.`,
};
const searchFilterExample = {
  command: `$podman search httpd --filter=is-official`,
  // prettier-ignore
  code:`
INDEX       NAME                                  DESCRIPTION                    STARS OFFICIAL AUTOMATED
docker.io   docker.io/library/httpd               The Apache HTTP Server Project  3762    [OK]
$ podman pull docker.io/library/httpd
Trying to pull docker.io/library/httpd:latest...
Getting image source signatures
Copying blob ab86dc02235d done  
Copying blob ba1caf8ba86c done  
Copying blob eff15d958d66 done  
Copying blob 635a49ba2501 done  
Copying blob 600feb748d3c done  
Copying config d294bb32c2 done  
Writing manifest to image destination
Storing signatures
d294bb32c2073ecb5fb27e7802a1e5bec334af69cac361c27e6cb8546fdd14e7
`,
  label: `You can also enhance your search with filters.`,
  extra: `Downloading (pulling) an image is easy, too.`,
};
const imagesExample = {
  command: `$ podman images`,
  // prettier-ignore
  code:`
REPOSITORY               TAG         IMAGE ID      CREATED       SIZE
docker.io/library/httpd  latest      d294bb32c207  12 hours ago  148 MB
`,
  label: `Podman can search for images on remote registries with some simple keywords.`,
  extra: `**Note**: Podman searches in different registries. Therefore it is recommend to use the full image name (docker.io/library/httpd instead of httpd) to ensure that you are using the correct image.`,
};

export { searchExample, searchFilterExample, imagesExample };
