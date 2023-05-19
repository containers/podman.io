import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
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
          <div className="container grid max-w-6xl grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
            <p className="max-w-sm text-white dark:text-gray-100">
              For more details, you can review the <a href="https://docs.podman.io/en/latest/Commands.html">manpages</a>
              :
            </p>
            {/* prettier-ignore */}
            <CodeBlock language="bash" showLineNumbers>
                $ podman --help # get a list of all commands {'\n'}
                $ podman subcommand --help # get info on a command{' '}
                {'\n'}
              </CodeBlock>
          </div>
          <div className="container grid max-w-6xl grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
            <p className="max-w-sm text-white">
              To get some help and find out how Podman is working, you can use the help.
            </p>
            {/* prettier-ignore */}
            <CodeBlock language="bash" showLineNumbers>
                $ man podman {'\n'} 
                $ man podman subcommand {'\n'}
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

/* PAGE CONTENT */
function GetStarted() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} basicResources={true} instructions={header.instructions} />
      <GetHelpSection />
      <SearchPullListSection />
    </Layout>
  );
}

export default GetStarted;
