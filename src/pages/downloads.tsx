import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
/* COMPONENTS */
import PageHeader from '@site/src/components/layout/PageHeader';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import Button from '@site/src/components/utilities/Button';
/* PAGE DATA */
import { header, platformTitles, otherOptions } from '@site/static/data/downloads';
import operatingSystemData, { detectOperatingSystem } from '@site/src/components/layout/HeroHeader/installOptions';

/* PAGE COMPONENTS */
const DownloadLink = ({ title, subtitle, icon, path }) => (
  <a
    href={path}
    className="flex items-center gap-4 rounded-md bg-gray-50 px-4 py-3 text-purple-900 no-underline transition duration-150 ease-linear hover:bg-purple-700 hover:text-white hover:no-underline dark:bg-gray-700 dark:text-white dark:hover:bg-purple-900">
    <Icon icon={icon} className="text-3xl" />
    <div>
      <h4 className="m-0">{title}</h4>
      <p className="m-0 text-sm">{subtitle}</p>
    </div>
  </a>
);

const PlatformCard = ({ os, detected }) => (
  <div
    className={`flex flex-col gap-3 rounded-md bg-white p-6 shadow-md dark:bg-gray-800 ${
      detected ? 'outline outline-2 outline-purple-700 dark:outline-purple-500' : ''
    }`}>
    <div className="flex items-center justify-between">
      <h3 className="m-0 text-purple-700 dark:text-purple-500">{platformTitles[os.id]}</h3>
      {detected && (
        <span className="rounded-full bg-purple-700 px-3 py-1 text-xs font-semibold text-white dark:bg-purple-500">
          Detected
        </span>
      )}
    </div>
    <DownloadLink {...os.preferred} />
    <DownloadLink {...os.alt} />
    {os.third && <DownloadLink {...os.third} />}
  </div>
);

const PlatformsSection = () => (
  <section>
    <SectionHeader title="Choose your platform" />
    <div className="container my-8 grid gap-6 md:grid-cols-3">
      <BrowserOnly
        fallback={
          <>
            {operatingSystemData.map(os => (
              <PlatformCard key={os.id} os={os} detected={false} />
            ))}
          </>
        }>
        {() => {
          const detected = detectOperatingSystem();
          return (
            <>
              {operatingSystemData.map(os => (
                <PlatformCard key={os.id} os={os} detected={os.id === detected} />
              ))}
            </>
          );
        }}
      </BrowserOnly>
    </div>
  </section>
);

const OtherOptionsSection = () => (
  <section>
    <SectionHeader title={otherOptions.title} description={otherOptions.subtitle} />
    <div className="container mb-12 flex justify-center">
      <Button as="link" text={otherOptions.button.text} path={otherOptions.button.path} icon={otherOptions.button.icon} />
    </div>
  </section>
);

/* PAGE CONTENT */
function Downloads() {
  return (
    <Layout>
      <PageHeader title={header.title} description={header.subtitle} />
      <PlatformsSection />
      <OtherOptionsSection />
    </Layout>
  );
}

export default Downloads;
