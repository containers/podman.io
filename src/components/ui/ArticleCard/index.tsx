import React from 'react';
import parse from 'html-react-parser';
type ArticleCardProps = {
  title: string;
  subtitle: string;
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
const Title = (title: string) => {
  return <h3 className="text-purple-700">{title}</h3>;
};

function ArticleCard(props: ArticleCardProps) {
  // Select fallback image based on index, cycling through available images
  const fallbackImage = FALLBACK_IMAGES[(props.index || 0) % FALLBACK_IMAGES.length];
  
  // Sanitizes HTML and converts it to plain text
  const sanitizeHtml = (html: string) => {
    if (!html) return html;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const abbrSubtitle = sanitizeHtml(props.subtitle).trim().split(' ').slice(0, 32).join(' ').concat('...');
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
            <img
              src={props.imgSrc || fallbackImage}
              className=" col-start-1 row-start-1 h-full w-full rounded-sm object-cover lg:w-80"
            />
          </div>
          <div className="max-w-sm items-center gap-2 self-center p-2 pr-4">
            {parse(abbrSubtitle)}
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
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-purple-500/40 dark:hover:shadow-purple-500/10">
        <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-950/40">
          <img src={props.imgSrc || fallbackImage} alt={sanitizeHtml(props.title)} className="h-full w-full object-contain p-2" />
          <div className="absolute bottom-0 left-0 z-10 w-10/12">
            <h3 className="rounded-sm bg-gradient-radial from-purple-700 to-purple-900 px-2 py-1 text-white shadow-sm">
              <a
                href={props.path}
                target="_blank"
                className="text-white no-underline hover:text-blue-100 hover:no-underline dark:text-white dark:hover:text-blue-50">
                {sanitizeHtml(props.title)}
              </a>
            </h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          {parse(abbrSubtitle)}
          <p className="mt-auto text-purple-700">
            By: <a href={props.author_link}>{props.display_name}</a>
          </p>
        </div>
      </article>
    );
}

export default ArticleCard;
