import React, { useState } from 'react';
import { library } from 'webpack';

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

const TabContent = props => {
  const { title, commands, image, description, index = 0 } = props;
  const bgColor = () => {
    const applyColors = (color, secondColor = 'gray') =>
      `bg-gradient-to-br from-${color}-500 to-${color}-700 dark:from-${secondColor}-900 via-${color}-700 to-${color}-900`;
    return index === 0 ? applyColors('purple') : index === 2 ? applyColors('blue') : 'bg-white dar:bg-gray-900';
  };
  return (
    <section className={` ${bgColor}`}>
      <div className="flex gap-4">
        <div>
          <h3>{title}</h3>
          <ul>
            {commands.map((command, index) => (
              <li key={index}>{command}</li>
            ))}
          </ul>
          <p>{description}</p>
        </div>
        <div className={`${index % 2 === 1 && `order-first`}`}>
          {/* TODO: use codeblock if component isn't annoying */}
          <img src={image.path} alt={image.text} />
        </div>
      </div>
    </section>
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

function Tab(props) {
  const { label, method, isActive } = props;
  return (
    <button
      onClick={method}
      className={`rounded-lg  p-4 shadow-md ${
        isActive ? 'bg-gradient-radial from-purple-500 to-purple-700 text-white' : 'bg-white'
      }`}>
      {label}
    </button>
  );
}

function FeaturesCarousel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // render content
  return (
    <section>
      <div>
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
