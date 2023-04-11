import React from 'react';
import Link from '@site/src/components/utilities/Link';
type ArticleCard = Card & {
  author: Link;
  date: string;
  image: Image;
};

const PublishDate = ({ date }: { date: string }) => {
  return (
    <div>
      <p>{date}</p>
    </div>
  );
};

export default function ArticleCard(props: ArticleCard) {
  return (
    <article>
      <div>
        <PublishDate date={props.date} />
        <img {...props.image} />
      </div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.subtitle}</p>
        <Link {...props.author} />
      </div>
    </article>
  );
}
