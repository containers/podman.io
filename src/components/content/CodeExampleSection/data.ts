const searchExample = `$ podman search httpd{'\n'}`;
// prettier-ignore
const searchExampleOutput = `
  INDEX       NAME                                  DESCRIPTION                    STARS OFFICIAL AUTOMATED{'\n'}
  docker.io   docker.io/library/httpd               The Apache HTTP Server Project  3762    [OK]{'\n'}
  docker.io   docker.io/centos/httpd-24-centos7     Platform for running Apache h... 40{'\n'}
  quay.io     quay.io/centos7/httpd-24-centos-7     Platform for running Apache h... 0               [OK]{'\n'}
  docker.io   docker.io/centos/httpd                                                 34              [OK]{'\n'}
  redhat.com  registry.access.redhat.com/ubi8/httpd                                  0{'\n'}
  quay.io     quay.io/redhattraining/httpd-parent                                    0               [OK]{'\n'}
`
const searchFilterExample = `$podman search httpd --filter=is-official`;
// prettier-ignore
const searchFilterExampleOutput = `
INDEX       NAME                                  DESCRIPTION                    STARS OFFICIAL AUTOMATED{'\n'}
docker.io   docker.io/library/httpd               The Apache HTTP Server Project  3762    [OK]{'\n'}
$ podman pull docker.io/library/httpd{'\n'}
Trying to pull docker.io/library/httpd:latest...{'\n'}
Getting image source signatures{'\n'}
Copying blob ab86dc02235d done  {'\n'}
Copying blob ba1caf8ba86c done  {'\n'}
Copying blob eff15d958d66 done  {'\n'}
Copying blob 635a49ba2501 done  {'\n'}
Copying blob 600feb748d3c done  {'\n'}
Copying config d294bb32c2 done  {'\n'}
Writing manifest to image destination{'\n'}
Storing signatures{'\n'}
d294bb32c2073ecb5fb27e7802a1e5bec334af69cac361c27e6cb8546fdd14e7{'\n'}
`
const imagesExample = `$ podman images{'\n'}`;
// prettier-ignore
const imagesExampleOutput = `
REPOSITORY               TAG         IMAGE ID      CREATED       SIZE{'\n'}
docker.io/library/httpd  latest      d294bb32c207  12 hours ago  148 MB{'\n'}
`

export default {
  searchExample,
  searchExampleOutput,
  searchFilterExample,
  searchFilterExampleOutput,
  imagesExample,
  imagesExampleOutput,
};
