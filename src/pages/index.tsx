import React from 'react';
import Layout from '@theme/Layout';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Link from '../components/Link';

const headerInfo = {
  title: 'The daemonless container manager',
  description:
    'Manage containers, pods, and images with Podman. Podman provides a simple command line interface as well as a socket activated API which is mostly backwards compatible with Docker. ',
};

const testButtons = [{ text: 'hey', variant: 'outline', as: 'a', url: '#' }];

export default function Home(): JSX.Element {
  return (
    <Layout>
      <main>
        <PageHeader title={headerInfo.title} description={headerInfo.description} />
        <div className="my-12 flex justify-center">
          <Card
            title="card one"
            subtitle={
              <>
                <strong>1st Tuesday</strong> every month
              </>
            }
            details="11 AM US ET / 5 PM CET"
            text={
              <>
                This meeting is used to show demos for or to have general discussions about Podman or other related
                container technologies. It is also used to make announcements about Podman and the other projects in the{' '}
                <Link text="Containers Repository" url="https://github.com" /> on GitHub.
              </>
            }
            data={testButtons}
          />
          <Card
            title="card two"
            subtitle={
              <>
                <strong>2nd Wednesday</strong> every month
              </>
            }
            details="11 AM US ET / 5 PM CET"
            data={testButtons}
          />
        </div>
      </main>
    </Layout>
  );
}
