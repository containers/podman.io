import React, { useState } from 'react';
import tabData from './data';

const Tab = (props): JSX.Element => {
  const { label, commands, method, isActive } = props;
  return (
    <button
      onClick={method}
      className={`rounded-lg  p-4 shadow-md transition duration-150 hover:bg-purple-300 dark:hover:bg-purple-900  ${
        isActive
          ? 'bg-gradient-radial from-purple-500 to-purple-700 text-white dark:from-purple-700 dark:to-purple-900 dark:shadow-purple-900'
          : '0 bg-white dark:bg-gray-900 dark:text-gray-100 dark:shadow-gray-700 '
      }`}>
      <h4 className="text-blue-500 dark:text-blue-500">
        {label}
        <ul>
          {commands.map((command, index) => {
            return (
              <li
                key={index}
                className={`font-mono text-sm  ${isActive ? 'text-white' : 'text-purple-700 dark:text-gray-700'}`}>
                {command}
              </li>
            );
          })}
        </ul>
      </h4>
    </button>
  );
};
const TabContent = (props): JSX.Element => {
  const { title, commands, image, description, index } = props;
  const bgColor = () => {
    const applyColors = (color, secondColor = 'gray') =>
      `bg-gradient-to-br from-${color}-500 to-${color}-700 dark:from-${secondColor}-900 via-${color}-700 to-${color}-900`;
    return index === 0 ? applyColors('purple') : index === 2 ? applyColors('blue') : 'bg-white dar:bg-gray-900';
  };
  return (
    <section className={`${bgColor} my-8 lg:my-16`}>
      <div className="container flex gap-4">
        <div className="max-w-sm">
          <h3 className="text-3xl">{title}</h3>
          <ul className="my-4 lg:my-12">
            {commands.map((command, index) => (
              <li key={index} className="font-mono">
                {command}
              </li>
            ))}
          </ul>
          <p>{description}</p>
        </div>
        <div className={`${index % 2 === 1 && `order-first`}`}>
          <img src={image.path} alt={image.text} />
        </div>
      </div>
    </section>
  );
};
function FeaturesCarousel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // render content
  return (
    <section>
      <div className="container -mb-3 flex justify-center gap-4 md:gap-8">
        {/* Loop through Tab data and generate tab buttons for each */}
        {tabData.map((tab, index) => {
          return (
            <Tab {...tab} method={() => setActiveTabIndex(index)} isActive={activeTabIndex === index} key={index} />
          );
        })}
      </div>
      <div>{TabContent(tabData[activeTabIndex])}</div>
    </section>
  );
}

export default FeaturesCarousel;
