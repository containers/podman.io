import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import PageHeader from '@site/src/components/layout/PageHeader';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
import ReactMarkdown from 'react-markdown';
import { header, getHelp } from '@site/static/data/get-started';
export default function Community() {
  return (
    <Layout>
      {/* TODO: Add List to the header using ListItem Component */}
      <PageHeader title={header.title} description={header.subtitle} />
      {/* Getting Help */}
      <section className="my-12 bg-gradient-to-b from-purple-300 to-purple-700 dark:from-purple-500 dark:to-purple-900">
        <SectionHeader title={getHelp.title} textColor="text-white" />
        <div className="container">
          <header className="my-4 text-center text-blue-300 dark:text-blue-100 lg:my-8">
            <h3>{getHelp.subtitle}</h3>
          </header>
          <div>
            <div className="flex gap-8">
              <div>
                <p className="text-white dark:text-gray-100">For more details, you can review the manpages:</p>
              </div>
              <div>
                {/* prettier-ignore */}
                <CodeBlock language="bash" showLineNumbers>
                    $ podman --help # get a list of all commands
                </CodeBlock>
                <CodeBlock>$ podman subcommand --help # get info on a command</CodeBlock>
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-white dark:text-gray-100">
                  To get some help and find out how Podman is working, you can use the help.
                </p>
              </div>
              <div>
                {/* prettier-ignore */}
                <CodeBlock language="bash" showLineNumbers>
                  <pre className="bg-transparent">
                    man podman {'/n'}
                    man podman -subcommand
                  </pre>
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-4 text-center">
          <p className="text-white">
            'Please also reference the{' '}
            <a href="#" className="text-blue-300">
              <strong>Podman Troubleshooting Guide</strong>
            </a>{' '}
            to find known issues and tips on how to solve common configuration mistakes.'
          </p>
        </div>
        <WaveBorder />
      </section>
      {/* Searching, Pulling, and listing images */}
      <section>
        <SectionHeader title="Searching, pulling, and listing images" />
        <div className="container mx-auto my-8 lg:my-12">
          <img
            src="images/raw/cli-screens/cli-multi-commands.png"
            alt="example output of searching, pulling, and listing images"
            className="mx-auto rounded-lg"
          />
        </div>
      </section>
      {/* TODO: Add content to data file */}
      {/* TODO: Animate slide in text boxes on side, use shadowing */}
      {/* TODO: See about using the infobox component for this and ones in following section */}
      {/* TODO: also follow up with terminal component */}
      {/* Running a container and listing running containers */}
      {/* TODO: Add content to data file */}
      {/* TODO: See if they want the Want to learn more section on this page too  */}
    </Layout>
  );
}
