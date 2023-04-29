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
};

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
  if (props.altLayout) {
    return (
      <article className="container my-4 shadow-lg">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="grid items-end xl:basis-5/12">
            <div className="z-10 col-start-1 row-start-1">
              <h3 className="w-10/12 bg-gradient-radial from-purple-700 to-purple-900 px-2 py-1 text-white shadow-sm">
                <a href={props.path} target="_blank">
                  {props.title}
                </a>
              </h3>
              <PublishDate date={props.date} styles="col-start-1 order-1 row-start-1 z-10" />
            </div>
            <img
              src={props.imgSrc}
              className=" col-start-1 row-start-1 h-full w-full rounded-sm object-cover lg:w-80"
            />
          </div>
          <div className="max-w-sm items-center gap-2 self-center">
            {/* <Markdown text={props.subtitle} /> */}
            {parse(props.subtitle)}
            <p className="text-purple-700">
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
      <article className="my-4 w-72 p-4">
        <div className="grid">
          <h3 className="w-10/12 bg-gradient-radial from-purple-700 to-purple-900 px-2 py-1 text-white shadow-sm">
            <a href={props.path} target="_blank">
              {props.title}
            </a>
          </h3>
          {/* TODO: Set a max length and add ... to end */}
          {/* <Markdown text={props.subtitle} /> */}
          {parse(props.subtitle)}
          <PublishDate date={props.date} styles="row-start-1 col-start-1 z-10" />
          <img src={props.imgSrc} className="object-fit col-start-1 row-start-1 rounded-sm" />
          <p className="text-purple-700">
            By: <a href={props.author_link}>{props.display_name}</a>
          </p>
        </div>
      </article>
    );
}

export default ArticleCard;
