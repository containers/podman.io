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
                  $ podman subcommand --help # get info on a command
                </CodeBlock>
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
                  man podman 
                  man podman-subcommand
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
        <div>
          {/* prettier-ignore */}
          <CodeBlock language="bash" showLineNumbers>
            $ podman search httpd
            INDEX       NAME                                  DESCRIPTION                    STARS OFFICIAL AUTOMATED
            docker.io   docker.io/library/httpd               The Apache HTTP Server Project  3762    [OK]
            docker.io   docker.io/centos/httpd-24-centos7     Platform for running Apache h... 40              
            docker.io   docker.io/centos/httpd                                                 34              [OK]
            quay.io     quay.io/centos7/httpd-24-centos-7     Platform for running Apache h... 0               [OK]
            quay.io     quay.io/redhattraining/httpd-parent                                    0               [OK]
            redhat.com  registry.access.redhat.com/ubi8/httpd                                  0          

            $ podman search httpd --filter=is-official
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

            $ podman images
            REPOSITORY               TAG         IMAGE ID      CREATED       SIZE
            docker.io/library/httpd  latest      d294bb32c207  12 hours ago  148 MB
            $
          </CodeBlock>
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
