import React from 'react';
type ArticleCardProps = {
  title: Link;
  subtitle: string;
  author: Link;
  date: string;
  image: {
    src: string;
    alt: string;
  };
  altLayout?: boolean;
};

const PublishDate = ({ date, styles }: { date: string; styles?: string }) => {
  return (
    <div
      className={`${styles} h-fit max-w-fit rounded-sm bg-gradient-radial from-blue-500 to-blue-700 px-2 text-white shadow-md dark:from-blue-900 dark:to-blue-900`}>
      <p className="font-semibold shadow-sm">{date}</p>
    </div>
  );
};
const TitleLink = (props: Link) => {
  return (
    <h3 className="text-purple-700">
      <a href={props.path}>{props.text}</a>
    </h3>
  );
};
const Author = (props: Link) => {
  return (
    <p className="text-purple-700">
      By: <a href={props.path}>{props.text}</a>
    </p>
  );
};

function ArticleCard(props: ArticleCardProps) {
  if (props.altLayout) {
    return (
      <article className="container my-4 shadow-lg">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="grid items-end xl:basis-5/12">
            <div className="z-10 col-start-1 row-start-1">
              <h3 className="w-10/12 bg-gradient-radial from-purple-700 to-purple-900 px-2 py-1 text-white shadow-sm">
                <a href={props.title.path} className="hover:text-gray-50">
                  {props.title.text}
                </a>
              </h3>
              <PublishDate date={props.date} styles="col-start-1 order-1 row-start-1 z-10" />
            </div>
            <img {...props.image} className=" col-start-1 row-start-1 h-full w-full rounded-sm object-cover lg:w-80" />
          </div>
          <div className="max-w-sm items-center gap-2 self-center">
            <p className="text-gray-700">{props.subtitle}</p>
            <Author {...props.author} />
          </div>
        </div>
      </article>
    );
  }
  // Normal Layout
  else
    return (
      <article className="my-4 w-72 p-4">
        <div className="grid">
          <TitleLink {...props.title} />
          {/* TODO: Set a max length and add ... to end */}
          <p className="my-2">{props.subtitle}</p>
          <PublishDate date={props.date} styles="row-start-1 col-start-1 z-10" />
          <img {...props.image} className="object-fit col-start-1 row-start-1 rounded-sm" />
          <Author {...props.author} />
        </div>
      </article>
    );
}

export default ArticleCard;
