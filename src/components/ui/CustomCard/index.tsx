import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import Button from '@site/src/components/utilities/Button/';
import Markdown from '@site/src/components/utilities/Markdown';
import VideoEmbed from '@site/src/components/ui/VideoEmbed';
import FilmIcon from '../../shapes/FilmIcon';

type SubcardButtonProps = {
  text: string;
  path?: string;
  markDown?: ReactNode;
  embedUrl?: string;
  modalHeaderData?: string;
};

type CardInfoButtonProps = {
  data: SubcardButtonProps[];
  primary: Boolean;
  method: Function;
};

function CardBody({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`overflow-y-auto text-gray-700 dark:text-gray-100 ${className}`}>
      <Markdown text={text} />
    </div>
  );
}

// CardInfoButtons component is the same as CardButtons but this component has both button secondary
// There is a 'CardButtons' mode which can be attained by passing parimary flag as true
function CardInfoButtons(cardInfoButtonProps: CardInfoButtonProps) {
  const {
    data = [{ text: 'button text', markDown: <>No MarkDown to Display!</> }],
    primary = false,
    method = () => {
      console.error('No callback method passed');
    },
  } = cardInfoButtonProps;
  return (
    <div className={`flex flex-row flex-wrap gap-3 ${primary ? 'mt-4 justify-start' : 'mt-3 justify-center'}`}>
      {primary
        ? data.map((button, index) => (
            <div key={index}>
              {index == 0 ? <Button as="link" {...button} /> : <Button as="link" outline={true} {...button} />}
            </div>
          ))
        : data.map((button, index) => (
            <div key={index}>
              {button.path ? (
                <Button as="link" outline={true} {...button} />
              ) : (
                <Button
                  as="button"
                  method={() => {
                    method(button);
                  }}
                  outline={true}
                  {...button}
                />
              )}
            </div>
          ))}
    </div>
  );
}

// Primary cards (the two meeting-type cards) get a colored schedule rail down the side.
function PrimaryCard(props) {
  const { title, subtitle, details, text } = props;
  return (
    <article className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:grid-cols-[12rem_1fr]">
      <div className="flex flex-row items-center gap-4 bg-gradient-to-br from-purple-700 to-purple-900 p-5 text-white dark:from-purple-900 dark:to-black sm:flex-col sm:justify-center sm:gap-3 sm:p-6 sm:text-center">
        <Icon icon="mdi:calendar-month-outline" className="shrink-0 text-3xl text-purple-100" />
        <div>
          {subtitle && <Markdown text={subtitle} styles="text-sm font-semibold leading-snug [&>p]:m-0" />}
          {details && <Markdown text={details} styles="mt-1.5 text-xs text-purple-100 [&>p]:m-0" />}
        </div>
      </div>
      <div className="flex flex-col p-6">
        <h3 className="mb-3 text-blue-700 dark:text-blue-500">{title}</h3>
        <CardBody text={text} className="text-sm leading-relaxed" />
        <CardInfoButtons {...props} />
      </div>
    </article>
  );
}

// Subcards (recent meeting recordings) get the date/day stamped directly on the video thumbnail.
function SubCard(props) {
  const { title, subtitle, embedUrl, embedTitle, icon } = props;
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <div className="relative">
        {embedUrl ? (
          <VideoEmbed url={embedUrl} title={embedTitle || title} />
        ) : icon ? (
          <div className="flex aspect-video w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
            <FilmIcon />
          </div>
        ) : null}
        <div className="pointer-events-none absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Icon icon="mdi:calendar-blank-outline" className="shrink-0 text-purple-300" />
          {title}
          {subtitle && <span className="font-normal text-white/70">&middot; {subtitle}</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center p-4">
        <CardInfoButtons {...props} />
      </div>
    </article>
  );
}

function CustomCard(props) {
  return props.primary ? <PrimaryCard {...props} /> : <SubCard {...props} />;
}

export default CustomCard;
