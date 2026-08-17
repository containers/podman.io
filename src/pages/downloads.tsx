import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';

import { downloadOptions, headerData, DownloadOption } from '@site/static/data/downloads';

function DownloadCard({ option, isRecommended }: { option: DownloadOption; isRecommended?: boolean }) {
  return (
    <div className={`flex w-full max-w-sm flex-col rounded-xl p-8 text-center shadow-lg transition-transform hover:-translate-y-1 ${isRecommended ? 'border-2 border-purple-700 bg-purple-50 dark:bg-purple-900/20' : 'bg-white dark:bg-gray-800'}`}>
      {isRecommended && (
        <span className="mb-4 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-300">
          Recommended for your OS
        </span>
      )}
      <Icon icon={option.icon} className="mx-auto mb-4 text-6xl text-gray-700 dark:text-gray-300" />
      <h3 className="mb-2 text-2xl font-bold">{option.title}</h3>
      <p className="mb-6">{option.description}</p>
      
      <div className="mt-auto flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <a
            href={option.desktop.url}
            className="rounded-lg bg-purple-700 px-6 py-3 font-semibold !text-white transition-colors hover:bg-purple-900 hover:no-underline"
          >
            {option.desktop.label}
          </a>
          {option.desktop.instructionsUrl && (
            <a href={option.desktop.instructionsUrl} className="text-sm !text-purple-700 hover:underline dark:!text-purple-300">
              Desktop Install Instructions
            </a>
          )}
        </div>
        
        <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
        
        <div className="flex flex-col gap-2">
          <a
            href={option.cli.url}
            className="rounded-lg border-2 border-purple-700 px-6 py-3 font-semibold !text-purple-700 transition-colors hover:bg-purple-50 hover:no-underline dark:border-purple-300 dark:!text-purple-300 dark:hover:bg-purple-900/30"
          >
            {option.cli.label}
          </a>
          {option.cli.instructionsUrl && (
            <a href={option.cli.instructionsUrl} className="text-sm !text-purple-700 hover:underline dark:!text-purple-300">
              CLI Install Instructions
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** Detects the user's OS using modern APIs with fallbacks */
function detectOS(): 'Windows' | 'macOS' | 'Linux' {
  // Modern API (Chromium 90+)
  const uaData = (navigator as any).userAgentData;
  if (uaData?.platform) {
    const platform = uaData.platform.toLowerCase();
    if (platform.includes('windows') || platform === 'win32') return 'Windows';
    if (platform.includes('macos') || platform === 'macos') return 'macOS';
    return 'Linux';
  }

  // Fallback: navigator.platform (deprecated but widely supported)
  const platform = (navigator.platform || '').toLowerCase();
  if (platform.startsWith('win')) return 'Windows';
  if (platform.startsWith('mac') || platform.startsWith('iphone') || platform.startsWith('ipad')) return 'macOS';
  if (platform.includes('linux') || platform.includes('x11')) return 'Linux';

  // Last resort: user-agent string
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('windows') || ua.includes('win64') || ua.includes('win32')) return 'Windows';
  if (ua.includes('macintosh') || ua.includes('mac os x') || ua.includes('macos')) return 'macOS';
  return 'Linux';
}

function DownloadsContent() {
  const [detectedOS, setDetectedOS] = useState<'Windows' | 'macOS' | 'Linux'>(() => detectOS());

  const recommendedOption = downloadOptions.find((opt) => opt.os === detectedOS);
  const otherOptions = downloadOptions.filter((opt) => opt.os !== detectedOS);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {recommendedOption && (
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Based on your system
          </h2>
          <div className="flex justify-center">
            <DownloadCard option={recommendedOption} isRecommended={true} />
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Downloads for other platforms
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {otherOptions.map((option) => (
            <DownloadCard key={option.os} option={option} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function Downloads() {
  return (
    <Layout title={headerData.title} description={headerData.subtitle}>
      <header className="bg-gradient-to-r from-blue-500 to-purple-700 py-16 dark:from-blue-700 dark:to-purple-900">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">{headerData.title}</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-100">{headerData.subtitle}</p>
        </div>
      </header>

      <BrowserOnly fallback={
        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {downloadOptions.map((option) => (
              <DownloadCard key={option.os} option={option} />
            ))}
          </div>
        </main>
      }>
        {() => <DownloadsContent />}
      </BrowserOnly>
    </Layout>
  );
}

