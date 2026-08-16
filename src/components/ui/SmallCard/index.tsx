import React from 'react';
import Button from '@site/src/components/utilities/Button';
import Markdown from '@site/src/components/utilities/Markdown';
import { Icon } from '@iconify/react';

type SmallCardProps = Card & {
  button: Button;
  icon?: string;
};

function SmallCard(props: SmallCardProps) {
  const { title, subtitle, button, icon } = props;

  return (
    <article className="group flex flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 transition duration-150 ease-linear hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          {icon && <Icon icon={icon} className="text-lg text-purple-700 dark:text-purple-500" />}
          <h4 className="text-gray-900 dark:text-gray-50">{title}</h4>
        </div>
        <Markdown text={subtitle} styles="text-sm text-gray-700 dark:text-gray-300" />
      </div>
      <Button outline={true} as="link" colors="w-full justify-center" {...button} />
    </article>
  );
}

export default SmallCard;
