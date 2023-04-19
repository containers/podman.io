import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
/* COMPONENTS */
import SectionHeader from '@site/src/components/layout/SectionHeader';
import PageHeader from '@site/src/components/layout/PageHeader';
import WaveBorder from '@site/src/components/shapes/WaveBorder';
/* PAGE DATA */
import { header, getHelp } from '@site/static/data/get-started';
export default function Community() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      {/* Getting Help */}
      <section className="my-12 bg-gradient-to-b from-purple-300 to-purple-700 dark:from-purple-500 dark:to-purple-900">
        <SectionHeader title={getHelp.title} textColor="text-blue-700 dark:text-gray-900" />
        <div className="container">
          <header className="my-4 text-center text-blue-300 dark:text-blue-100">
            <h3>{getHelp.subtitle}</h3>
          </header>
          <div className="mx-auto">
            <div className="container grid max-w-7xl grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
              <div>
                <p className="text-white dark:text-gray-100">For more details, you can review the manpages:</p>
              </div>
              <div className="">
                {/* prettier-ignore */}
                <CodeBlock language="bash" showLineNumbers>
                    $ podman --help # get a list of all commands
                </CodeBlock>
                <CodeBlock language="bash" showLineNumbers>
                  $ podman subcommand --help # get info on a command
                </CodeBlock>
              </div>
            </div>
            <div className="container grid max-w-7xl grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
              <div>
                <p className="text-white dark:text-gray-100">
                  To get some help and find out how Podman is working, you can use the help.
                </p>
              </div>
              <div>
                {/* prettier-ignore */}
                <CodeBlock language="bash" showLineNumbers>
                    man podman
                </CodeBlock>
                <CodeBlock language="bash" showLineNumbers>
                  man podman -subcommand
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
    </Layout>
  );
}
