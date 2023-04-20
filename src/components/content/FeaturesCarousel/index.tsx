import React, { useState } from 'react';

const FindTabContent = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-purple-300 to-purple-900 text-white">
      <h3>Find</h3>
      <p>Placeholder Text</p>
    </div>
  );
};
const RunTabContent = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-purple-300 to-purple-900">
      <h3>Run</h3>
      <p>Placeholder Text</p>
    </div>
  );
};
const BuildTabContent = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-purple-300 to-purple-900">
      <h3>Build</h3>
      <p>Placeholder Text</p>
    </div>
  );
};
const ShareTabContent = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-br from-purple-300 to-purple-900">
      <h3>Share</h3>
      <p>Placeholder Text</p>
    </div>
  );
};

const tabsData = [
  {
    label: 'Find',
    commands: ['podman search', 'podman pull'],
    content: FindTabContent,
  },
  {
    label: 'Run',
    commands: ['podman run'],
    content: RunTabContent,
  },
  {
    label: 'Build',
    commands: ['podman build'],
    content: BuildTabContent,
  },
  {
    label: 'Share',
    commands: ['podman push'],
    content: ShareTabContent,
  },
];

interface TabProps {
  label: string;
}
function Tab(props) {
  const { label, method, isActive } = props;
  return (
    <button
      onClick={method}
      className={`rounded-lg  p-4 shadow-md ${
        isActive ? 'bg-gradient-radial from-purple-500 to-purple-700' : 'bg-white'
      }`}>
      {label}
    </button>
  );
}

function FeaturesCarousel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // render content
  return (
    <section className="mx-auto">
      <div className="container flex justify-center gap-4">
        {/* Loop through Tab data and generate tab buttons for each */}
        {tabsData.map((tab, index) => {
          return (
            <Tab {...tab} method={() => setActiveTabIndex(index)} isActive={activeTabIndex === index} key={index} />
          );
        })}
      </div>
      <div>{tabsData[activeTabIndex].content()}</div>
    </section>
  );
}

export default FeaturesCarousel;
