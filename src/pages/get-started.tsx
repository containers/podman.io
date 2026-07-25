import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
/* COMPONENTS */
import SectionHeader from '@site/src/components/layout/SectionHeader';
import PageHeader from '@site/src/components/layout/PageHeader';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import CodeExampleSection from '@site/src/components/content/CodeExampleSection';
import InfoBanner from '@site/src/components/ui/InfoBanner';
/* PAGE DATA */
import { header, getHelp } from '@site/static/data/get-started';

/* PAGE COMPONENTS */
const GetHelpSection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-900 to-purple-500/75 dark:from-purple-700 dark:via-purple-900 dark:to-gray-900">
      <SectionHeader title={getHelp.title} textColor="dark:text-blue-500 text-blue-300" />
      <div className="container my-8">
        <header className="text-center lg:my-8">
          <h3 className="text-white dark:text-white ">{getHelp.subtitle}</h3>
        </header>
        <div className="mx-auto">
          <div className="container grid  grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
            <p className="max-w-sm text-white dark:text-gray-100">
              For more details, you can review the <a href="https://docs.podman.io/en/latest/Commands.html">manpages</a>
              :
            </p>
            {/* prettier-ignore */}
            <CodeBlock language="bash" showLineNumbers>
                $ man podman {'\n'} 
                $ man podman subcommand
              </CodeBlock>
          </div>
          <div className="container grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
            <p className="max-w-sm text-white">
              To get some help and find out how Podman is working, you can use the help.
            </p>
            {/* prettier-ignore */}
            <CodeBlock language="bash" showLineNumbers>
                $ podman --help # get a list of all commands {'\n'}
                $ podman subcommand --help # get info on a command
              </CodeBlock>
          </div>
        </div>
      </div>
      <div className="container mb-8 mt-4 text-center lg:mb-20 lg:mt-6">
        <p className="text-white">
          Please also reference the{' '}
          <a href="https://github.com/containers/podman/blob/main/troubleshooting.md" className="text-blue-300">
            <strong>Podman Troubleshooting Guide</strong>
          </a>{' '}
          to find known issues and tips on how to solve common configuration mistakes.
        </p>
      </div>
      <WaveBorder />
    </section>
  );
};

const SearchPullListSection = () => {
  return (
    <section>
      <SectionHeader textColor="text-purple-700 dark:text-purple-500" title="Searching, pulling, and listing images" />
      <CodeExampleSection />
    </section>
  );
};

const RunListContainersSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500/75 to-blue-700 dark:bg-blue-900 dark:text-white pt-6 pb-16" >
      <SectionHeader textColor="text-purple-700 dark:text-purple-500" title="Running a container &amp; listing running containers" />
      <div className="text-center flex flex-col mx-4">
        <p className="mb-4">This sample container will run a very basic httpd server that serves only its index page.</p>
        
        <h3 className="text-purple-700 dark:text-purple-300 mb-2 mt-10">Running a container</h3>

        <div className="mx-auto">
          <CodeBlock language="bash" showLineNumbers className="text-left overflow-scroll xl:max-w-6xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl">
            $ podman run -dt -p 8080:80/tcp docker.io/library/httpd {'\n'}
          </CodeBlock>
        </div>

        <div className="mx-auto max-w-lg rounded-md bg-white/50 px-6 py-6 shadow-lg dark:bg-gray-900/50">
          <h5 className="text-gray-700">Note:</h5>
          <p className="text-gray-700 text-left">
            Because the container is being run in detached mode, represented by the -d in the podman run command, 
            Podman will run the container in the background and print the container ID after it has executed the 
            command. The -t also adds a pseudo-tty to run arbitrary commands in an interactive shell.
          </p>
          <p className="text-gray-700 text-left mt-4">
            Also, we use port forwarding to be able to access the HTTP server. For successful running at least <strong>slirp4netns</strong> v0.3.0 is needed.
          </p>
        </div>

        <h3 className="text-purple-700 dark:text-purple-300 mt-16 mb-2">Listing running containers</h3>
      
        <div className="mx-auto">
          <p className="text-gray-700 mb-4">The <code>podman ps</code> command is used to list created and running containers.</p>
          <CodeBlock language="bash" showLineNumbers className="sm:bg-gray-100 text-left mx-4 overflow-scroll xl:max-w-6xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl">
            $ podman ps{'\n'}
            CONTAINER ID  IMAGE                           COMMAND           CREATED       STATUS      PORTS                 NAMES{'\n'}
            01c44968199f  docker.io/library/httpd:latest  httpd-foreground  1 minute ago  Up 1 minute 0.0.0.0:8080->80/tcp  laughing_bob{'\n'}
          </CodeBlock>
          <div className="mx-auto max-w-lg rounded-md bg-white/50 px-6 py-6 shadow-lg dark:bg-gray-900/50">
            <h5 className="text-gray-700">Note:</h5>
            <p className="text-gray-700 text-left">
             If you add <code>-a</code> to the <code>podman ps</code> command, Podman will show all containers (created, exited, running, etc.).
            </p>
          </div>
        </div>
     
      <h3 className="text-purple-700 dark:text-purple-300 mt-16 mb-2">Testing the <code>httpd</code> container</h3>
     
      <div className="mx-auto">
        <p className="text-gray-700 mb-4 text-left max-w-prose">As you are able to see, the container does not have an IP Address assigned. The container is reachable via its published port on your local machine.</p>
        <CodeBlock language="bash" showLineNumbers className="sm:bg-gray-100 text-left mx-auto overflow-scroll xl:max-w-6xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl">
          $ curl http://localhost:8080{'\n'}
        </CodeBlock>

        <p className="text-gray-700 mb-4 max-w-prose text-left">From another machine, you need to use the IP Address of the host, running the container.</p>
        <CodeBlock language="bash" showLineNumbers className="sm:bg-gray-100 text-left mx-auto overflow-scroll xl:max-w-6xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl">
          $ curl http://{'<IP_Address>'}:8080{'\n'}
        </CodeBlock>

        <div className="mx-auto max-w-lg rounded-md bg-white/50 px-6 py-6 shadow-lg dark:bg-gray-900/50">
          <h5 className="text-gray-700">Note:</h5>
          <p className="text-gray-700 text-left">
          Instead of using <code>curl</code>, you can also point a browser to <code>http://localhost:8080</code>.</p>
        </div>
      </div>
    </div>
    </section>
  )
}

const PodmanDesktopSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-950 via-slate-900 to-purple-950 py-16" style={{ backgroundColor: '#0a0a1a' }}>
      {/* Hero Section with Logo */}
      <div className="container text-center mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto mb-8">
          <img 
            src="images/raw/podman-desktop-hero-dark.png" 
            alt="Podman Desktop" 
            className="mx-auto w-full max-w-2xl"
          />
        </div>
        <p className="mb-8 max-w-3xl mx-auto leading-relaxed text-gray-100 text-lg">
          The best free and open source tool for developers to work with containers and Kubernetes. Manage containers, pods, and images visually on Windows, macOS, and Linux.
        </p>

        {/* Platform Icons */}
        <div className="flex justify-center items-center gap-8 mb-12">
          <div className="text-white text-5xl">
            <i className="fa-brands fa-apple"></i>
          </div>
          <div className="text-white text-5xl">
            <i className="fa-brands fa-linux"></i>
          </div>
          <div className="text-white text-5xl">
            <i className="fa-brands fa-windows"></i>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
          <a
            href="https://podman-desktop.io/docs/getting-started/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-transparent hover:bg-purple-600/80 text-white font-bold px-8 py-4 rounded-lg border-2 border-purple-500/50 hover:border-purple-400 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-400/60 transition-all duration-300 no-underline hover:no-underline text-lg">
            <i className="fa-solid fa-download mr-2"></i>
            Get Started with Podman Desktop
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 mb-12">
        <h3 className="text-center text-white text-2xl mb-8">What you can do with Podman Desktop</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-500/20">
            <div className="text-purple-400 text-4xl mb-4">
              <i className="fa-solid fa-desktop"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Visual Management</h4>
            <p className="text-gray-300 text-sm">Manage containers, pods, and images through an intuitive graphical interface</p>
          </div>
          
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-500/20">
            <div className="text-blue-400 text-4xl mb-4">
              <i className="fa-solid fa-dharmachakra"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Kubernetes Support</h4>
            <p className="text-gray-300 text-sm">Native Kubernetes support, spin up local Kind/Minikube clusters with ease</p>
          </div>
          
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-500/20">
            <div className="text-green-400 text-4xl mb-4">
              <i className="fa-solid fa-puzzle-piece"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Extensions Ecosystem</h4>
            <p className="text-gray-300 text-sm">Extend functionality with extensions tailored to your development needs</p>
          </div>
          
          <div className="bg-purple-800/40 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-500/20">
            <div className="text-yellow-400 text-4xl mb-4">
              <i className="fa-solid fa-globe"></i>
            </div>
            <h4 className="text-white font-semibold mb-2">Cross-Platform</h4>
            <p className="text-gray-300 text-sm">Consistent experience across Windows, macOS, and Linux platforms</p>
          </div>
        </div>
      </div>

      {/* Screenshot Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <img 
            src="images/raw/podman-desktop-ui-679w-592h.png" 
            alt="Podman Desktop User Interface Screenshot" 
            className="rounded-lg shadow-2xl mx-auto border border-purple-500/30"
          />
          <p className="text-center text-gray-400 text-sm mt-4 italic">Podman Desktop's intuitive interface for managing containers and Kubernetes</p>
        </div>
      </div>
    </section>
  );
}

/* PAGE CONTENT */
function GetStarted() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} basicResources={true} instructions={header.instructions} />
      <GetHelpSection />
      <SearchPullListSection />
      <RunListContainersSection />
      <PodmanDesktopSection />
    </Layout>
  );
}

export default GetStarted;
