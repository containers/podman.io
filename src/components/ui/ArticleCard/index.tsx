import React from 'react';
import parse from 'html-react-parser';

type ArticleCardProps = {
  title: string;
  subtitle?: string;
  display_name: string;
  author_link: string;
  date: string;
  imgSrc?: string;
  altLayout?: boolean;
  path: string;
  index?: number;
};

const FALLBACK_IMAGES = [
  'images/raw/characters/seal-diving.png',
  'images/raw/characters/seals-swimming.png',
  'images/raw/characters/confused-seal.png',
  'images/raw/podman-selkie-385w-358h.png',
];

const PublishDate = ({ date, styles }: { date: string; styles?: string }) => {
  return (
    <div
      className={`${styles} h-fit max-w-fit rounded-sm bg-gradient-radial from-blue-500 to-blue-700 px-2 text-white shadow-md dark:from-blue-900 dark:to-blue-900`}>
      <p className="font-semibold shadow-sm">{date}</p>
    </div>
  );
};

function ArticleCard(props: ArticleCardProps) {
  // Select fallback image based on index, cycling through available images
  const fallbackImage = FALLBACK_IMAGES[(props.index || 0) % FALLBACK_IMAGES.length];
  
  // Sanitizes HTML and converts it to plain text safely
  const sanitizeHtml = (html: string | undefined) => {
    if (!html) return '';
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const cleanSubtitle = sanitizeHtml(props.subtitle);
  const abbrSubtitle = cleanSubtitle ? cleanSubtitle.trim().split(' ').slice(0, 32).join(' ').concat('...') : '';

  if (props.altLayout) {
    return (
      <article className="my-4 max-w-2xl shadow-lg">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid items-end xl:basis-5/12">
            <div className="z-10 col-start-1 row-start-1">
              <h3 className="w-9/12 bg-gradient-radial from-purple-700 to-purple-900 p-2 text-white shadow-sm">
                <a
                  href={props.path}
                  target="_blank"
                  className="text-white no-underline hover:text-blue-100 hover:no-underline dark:text-white dark:hover:text-blue-50">
                  {sanitizeHtml(props.title)}
                </a>
              </h3>
              <PublishDate date={props.date} styles="col-start-1 order-1 row-start-1 z-10" />
            </div>
            <div className="col-start-1 row-start-1 h-48 w-full overflow-hidden rounded-sm lg:w-80 flex items-center justify-center p-2">
              <img
                src={props.imgSrc || fallbackImage}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="max-w-sm items-center gap-2 self-center p-2 pr-4">
            {abbrSubtitle ? parse(abbrSubtitle) : null}
            <p className="mt-2 text-purple-700">
              By: <a href={props.author_link}>{props.display_name}</a>
            </p>
          </div>
        </div>
      </article>
    );
  }
  // Normal Layout
  else
    return (
      <article className="my-4 max-w-sm p-4 flex flex-col h-full">
        {/* Image Container with fixed height and uniform object-contain */}
        <div className="relative h-48 w-full overflow-hidden rounded-sm flex items-center justify-center p-2">
          <PublishDate date={props.date} styles="absolute top-2 left-2 z-10" />
          <img src={props.imgSrc || fallbackImage} className="h-full w-full object-contain" />
        </div>

        {/* Title Container with fixed height (h-28) to prevent multi-line overlap */}
        <div className="mt-3 h-28 flex items-start">
          <h3 className="w-10/12 rounded-sm bg-gradient-radial from-purple-700 to-purple-900 px-2 py-1 text-white shadow-sm z-20">
            <a
              href={props.path}
              target="_blank"
              className="text-white no-underline hover:text-blue-100 hover:no-underline dark:text-white dark:hover:text-blue-50">
              {sanitizeHtml(props.title)}
            </a>
          </h3>
        </div>

        {/* Subtitle text with clean spacing */}
        <div className="mt-3 text-gray-700 dark:text-gray-300">
          {abbrSubtitle ? parse(abbrSubtitle) : null}
        </div>

        {/* Author Footer locked to the bottom via mt-auto */}
        <p className="mt-auto pt-4 text-purple-700 font-medium">
          By: <a href={props.author_link} className="hover:underline">{props.display_name}</a>
        </p>
      </article>
    );
}

export default ArticleCard;