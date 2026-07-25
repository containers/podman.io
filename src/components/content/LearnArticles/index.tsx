import React, { useEffect, useState } from 'react';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import { learnMore } from '@site/static/data/features';

const LearnArticles = () => {
  const [blogData, setBlogData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(
        'https://blog.podman.io/wp-json/wp/v2/posts?per_page=4&_fields=id, author_info, title, wbDate, jetpack_featured_media_url, link, excerpt',
      );
      const jsonData = await rawData.json();
      setBlogData(jsonData);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <section className="my-4 lg:my-0">
      <header className="container mb-4 text-center lg:mb-8 lg:text-start">
        <h3 className="font-medium text-blue-700 dark:text-blue-500">{learnMore.blogPosts.title}</h3>
      </header>
      <div className="flex flex-col gap-4">
        {blogData.map((card, index) => {
          if (index < 2) {
            return (
              <ArticleCard
                title={card.title.rendered}
                author_link={card.author_info.author_link}
                display_name={card.author_info.display_name}
                subtitle={card.excerpt.rendered}
                date={card.wbDate}
                imgSrc={card.jetpack_featured_media_url}
                path={card.link}
                altLayout
                key={card.id}
              />
            );
          }
          return null;
        })}
        <p className="ml-2l text-center 2xl:text-start">
          Check out more posts about Podman{' '}
          <a
            href="https://blog.podman.io"
            target="_blank"
            className="underline-offset-4 transition duration-150 ease-linear hover:text-purple-700 dark:hover:text-purple-500">
            on our Blog!
          </a>
        </p>
      </div>
    </section>
  );
};

export default LearnArticles;
