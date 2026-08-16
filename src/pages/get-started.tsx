import React from 'react';
import Layout from '@theme/Layout';
/* COMPONENTS */
import SectionHeader from '@site/src/components/layout/SectionHeader';
import PageHeader from '@site/src/components/layout/PageHeader';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import TerminalCard from '@site/src/components/utilities/TerminalCard';
/* PAGE DATA */
import { header, getHelp } from '@site/static/data/get-started';

/* PAGE COMPONENTS */
const GetHelpSection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-900 to-purple-500/75 dark:from-purple-700 dark:via-purple-900 dark:to-gray-900">
      <SectionHeader title={getHelp.title} textColor="dark:text-blue-500 text-blue-300" />
      <div className="container my-8">
        <header className="text-center lg:mb-8">
          <h3 className="text-white">{getHelp.subtitle}</h3>
        </header>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm lg:p-8">
            <p className="mb-4 text-white">
              To get some help and find out how Podman is working, you can use the help.
            </p>
            <TerminalCard>{`$ podman --help # get a list of all commands
$ podman subcommand --help # get info on a command`}</TerminalCard>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm lg:p-8">
            <p className="mb-4 text-white">
              For more details, you can review the{' '}
              <a href="https://docs.podman.io/en/latest/Commands.html" className="text-blue-300 hover:text-blue-100">
                manpages
              </a>
              :
            </p>
            <TerminalCard>{`$ man podman
$ man podman subcommand`}</TerminalCard>
          </div>
        </div>
      </div>
      <div className="container mb-8 mt-4 text-center lg:mb-20 lg:mt-6">
        <p className="text-white">
          Please also reference the{' '}
          <a
            href="https://github.com/containers/podman/blob/main/troubleshooting.md"
            className="text-blue-300 hover:text-blue-100">
            <strong>Podman Troubleshooting Guide</strong>
          </a>{' '}
          to find known issues and tips on how to solve common configuration mistakes.
        </p>
      </div>
      <WaveBorder />
    </section>
  );
};

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 dark:bg-blue-500/10">
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-500 text-xs font-bold text-white">
      i
    </span>
    <p className="text-sm text-gray-700 dark:text-gray-100">{children}</p>
  </div>
);

const StepCard = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:p-8">
    <h3 className="mb-4 text-purple-700 dark:text-purple-500">
      {number}. {title}
    </h3>
    <div className="flex flex-col gap-6">{children}</div>
  </div>
);

const GetStartedStepsSection = () => {
  return (
    <section className="bg-gray-50 py-16 dark:bg-black">
      <div className="container flex flex-col gap-8">
        <StepCard number={1} title="Installing Podman">
          <p className="text-gray-700 dark:text-gray-100">
            For installing or building Podman, please see the{' '}
            <a href="/docs/installation" className="text-blue-700 dark:text-blue-500">
              installation instructions
            </a>
            .
          </p>
        </StepCard>

        <StepCard number={2} title="Searching, pulling, and listing images">
          <p className="text-gray-700 dark:text-gray-100">
            Podman can search for images on remote registries with some simple keywords.
          </p>
          <TerminalCard>{`$ podman search httpd
INDEX       NAME                                 DESCRIPTION                      STARS  OFFICIAL  AUTOMATED
docker.io   docker.io/library/httpd              The Apache HTTP Server Project    3762             [OK]
docker.io   docker.io/centos/httpd-24-centos7    Platform for running Apache...    40
quay.io     quay.io/centos7/httpd-24-centos-7    Platform for running Apache...    0                [OK]
docker.io   docker.io/centos/httpd                                                 34               [OK]
redhat.com  registry.access.redhat.com/ubi8/httpd                                  0
quay.io     quay.io/redhattraining/httpd-parent                                    0                [OK]

$ podman pull docker.io/library/httpd
Trying to pull docker.io/library/httpd:latest...
Getting image source signatures
Copying blob ab86dc02235d done
Copying blob ba1caf8ba86c done
Copying config d294bb32c2 done
Writing manifest to image destination
Storing signatures
d294bb32c2073ecb5fb27e7802a1e5bec334af69cac361c27e6cb8546fdd14e7`}</TerminalCard>
          <TerminalCard>{`$ podman images
REPOSITORY               TAG      IMAGE ID       CREATED        SIZE
docker.io/library/httpd  latest   d294bb32c207   12 hours ago   148 MB`}</TerminalCard>
          <Note>
            Podman searches in different registries. To make sure you're pulling the correct image, use the full image
            name (<code>docker.io/library/httpd</code> instead of <code>httpd</code>).
          </Note>
        </StepCard>

        <StepCard number={3} title="Running a container and listing running containers">
          <p className="text-gray-700 dark:text-gray-100">
            This sample container will run a very basic httpd server that serves only its index page.
          </p>
          <TerminalCard>{`$ podman run -dt -p 8080:80/tcp docker.io/library/httpd`}</TerminalCard>
          <Note>
            Because the container is being run in detached mode, represented by the <code>-d</code> in the{' '}
            <code>podman run</code> command, Podman will run the container in the background and print the container ID
            after it has executed the command. The <code>-t</code> also adds a pseudo-tty to run arbitrary commands in
            an interactive shell. Also, we use port forwarding to be able to access the HTTP server. For successful
            running at least <strong>slirp4netns</strong> v0.3.0 is needed.
          </Note>
          <p className="text-gray-700 dark:text-gray-100">
            The <code>podman ps</code> command is used to list created and running containers.
          </p>
          <TerminalCard>{`$ podman ps
CONTAINER ID  IMAGE                           COMMAND           CREATED       STATUS       PORTS                  NAMES
01c44968199f  docker.io/library/httpd:latest  httpd-foreground  1 minute ago  Up 1 minute  0.0.0.0:8080->80/tcp  laughing_bob`}</TerminalCard>
          <Note>
            If you add <code>-a</code> to the <code>podman ps</code> command, Podman will show all containers (created,
            exited, running, etc.).
          </Note>
        </StepCard>

        <StepCard number={4} title="Reaching the container">
          <p className="text-gray-700 dark:text-gray-100">
            As you are able to see, the container does not have an IP Address assigned. The container is reachable via
            its published port on your local machine.
          </p>
          <TerminalCard>{`$ curl http://localhost:8080`}</TerminalCard>
          <p className="text-gray-700 dark:text-gray-100">
            From another machine, you need to use the IP Address of the host, running the container.
          </p>
          <TerminalCard>{`$ curl http://<IP_Address>:8080`}</TerminalCard>
          <Note>
            Instead of using <code>curl</code>, you can also point a browser to <code>http://localhost:8080</code>.
          </Note>
        </StepCard>
      </div>
    </section>
  );
};

/* PAGE CONTENT */
function GetStarted() {
  return (
    <Layout title="Get Started" description={header.subtitle}>
      <PageHeader
        title={header.title}
        description={header.subtitle}
        basicResources={true}
        instructions={header.instructions}
      />
      <GetHelpSection />
      <GetStartedStepsSection />
    </Layout>
  );
}

export default GetStarted;
