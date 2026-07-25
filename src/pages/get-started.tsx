import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import { Icon } from '@iconify/react';
/* COMPONENTS */
import SectionHeader from '@site/src/components/layout/SectionHeader';
import PageHeader from '@site/src/components/layout/PageHeader';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import CodeExampleSection from '@site/src/components/content/CodeExampleSection';
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
    <section className="relative bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 py-16 border-t border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Subtle ambient background glow (only visible in dark mode for aesthetic) */}
      <div className="absolute top-0 left-0 w-full h-full dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none hidden dark:block"></div>

      <SectionHeader 
        textColor="text-purple-700 dark:text-purple-300" 
        title="Running a container & listing running containers" 
      />
      
      <div className="relative z-10 flex flex-col items-center px-4 max-w-5xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 text-center text-lg max-w-2xl mb-10 leading-relaxed">
          This sample container will run a very basic <code className="bg-purple-50 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-md border border-purple-100 dark:border-purple-700/50 font-mono text-sm">httpd</code> server that serves only its index page.
        </p>
        
        {/* Subsection 1 */}
        <div className="w-full my-6 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-3 mb-6">
            <Icon icon="fa-solid:play-circle" className="text-purple-500 text-lg" />
            Running a container
          </h3>

          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 my-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-300 font-mono">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] inline-block"></span>
              <span className="ml-2">bash</span>
            </div>
            <CodeBlock language="bash" showLineNumbers className="text-left m-0 border-none">
              $ podman run -dt -p 8080:80/tcp docker.io/library/httpd {'\n'}
            </CodeBlock>
          </div>

          <div className="mt-6 max-w-4xl mx-auto rounded-xl border-l-4 border-l-purple-500 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-5 shadow-sm dark:shadow-md text-left">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fa-solid:info-circle" className="text-purple-700 dark:text-purple-300 text-sm" />
              <span className="text-xs font-bold tracking-wider uppercase text-purple-700 dark:text-purple-300">Note</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base m-0">
              Because the container is being run in detached mode, represented by the <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">-d</code> in the <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">podman run</code> command, 
              Podman will run the container in the background and print the container ID after it has executed the 
              command. The <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">-t</code> also adds a pseudo-tty to run arbitrary commands in an interactive shell.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base mt-3 m-0">
              Also, we use port forwarding to be able to access the HTTP server. For successful running at least <strong className="text-purple-700 dark:text-purple-300 font-semibold">slirp4netns</strong> v0.3.0 is needed.
            </p>
          </div>
        </div>

        {/* Subsection 2 */}
        <div className="w-full my-6 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-3 mb-2">
            <Icon icon="fa-solid:list" className="text-purple-500 text-lg" />
            Listing running containers
          </h3>
        
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            The <code className="bg-purple-50 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-md border border-purple-100 dark:border-purple-700/50 font-mono text-sm">podman ps</code> command is used to list created and running containers.
          </p>

          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 my-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-300 font-mono">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] inline-block"></span>
              <span className="ml-2">bash</span>
            </div>
            <CodeBlock language="bash" showLineNumbers className="text-left m-0 border-none">
              $ podman ps{'\n'}
              CONTAINER ID  IMAGE                           COMMAND           CREATED       STATUS      PORTS                 NAMES{'\n'}
              01c44968199f  docker.io/library/httpd:latest  httpd-foreground  1 minute ago  Up 1 minute 0.0.0.0:8080-{'>'}80/tcp  laughing_bob{'\n'}
            </CodeBlock>
          </div>

          <div className="mt-6 max-w-4xl mx-auto rounded-xl border-l-4 border-l-purple-500 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-5 shadow-sm dark:shadow-md text-left">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fa-solid:info-circle" className="text-purple-700 dark:text-purple-300 text-sm" />
              <span className="text-xs font-bold tracking-wider uppercase text-purple-700 dark:text-purple-300">Note</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base m-0">
              If you add <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">-a</code> to the <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">podman ps</code> command, Podman will show all containers (created, exited, running, etc.).
            </p>
          </div>
        </div>
       
        {/* Subsection 3 */}
        <div className="w-full my-6 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300 flex items-center gap-3 mb-4">
            <Icon icon="fa-solid:vial" className="text-purple-500 text-lg" />
            Testing the <code className="bg-purple-50 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-md border border-purple-100 dark:border-purple-700/50 font-mono text-sm">httpd</code> container
          </h3>
       
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center mb-4 leading-relaxed">
            As you are able to see, the container does not have an IP Address assigned. The container is reachable via its published port on your local machine.
          </p>

          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 my-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-300 font-mono">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] inline-block"></span>
              <span className="ml-2">bash</span>
            </div>
            <CodeBlock language="bash" showLineNumbers className="text-left m-0 border-none">
              $ curl http://localhost:8080{'\n'}
            </CodeBlock>
          </div>

          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center my-4 leading-relaxed">
            From another machine, you need to use the IP Address of the host, running the container.
          </p>

          <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 my-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-300 font-mono">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] inline-block"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] inline-block"></span>
              <span className="ml-2">bash</span>
            </div>
            <CodeBlock language="bash" showLineNumbers className="text-left m-0 border-none">
              $ curl http://{'<IP_Address>'}:8080{'\n'}
            </CodeBlock>
          </div>

          <div className="mt-6 max-w-4xl mx-auto rounded-xl border-l-4 border-l-purple-500 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-5 shadow-sm dark:shadow-md text-left">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="fa-solid:info-circle" className="text-purple-700 dark:text-purple-300 text-sm" />
              <span className="text-xs font-bold tracking-wider uppercase text-purple-700 dark:text-purple-300">Note</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base m-0">
              Instead of using <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">curl</code>, you can also point a browser to <code className="bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs">http://localhost:8080</code>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* PAGE CONTENT */
function GetStarted() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} basicResources={true} instructions={header.instructions} />
      <GetHelpSection />
      <SearchPullListSection />
      <RunListContainersSection />
    </Layout>
  );
}

export default GetStarted;
