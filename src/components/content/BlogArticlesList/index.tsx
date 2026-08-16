import React from 'react';
import SectionHeader from '@site/src/components/layout/SectionHeader';
import ArticleCard from '@site/src/components/ui/ArticleCard';
import { useBlogPosts } from '@site/src/hooks/useBlogPosts';

interface BlogArticlesListProps {
  limit?: number;
  displayCount?: number;
  altLayout?: boolean;
  title?: string;
  description?: string;
  titleColor?: string;
  showFooter?: boolean;
  footerText?: string;
  containerLayout?: 'vertical' | 'grid';
  sectionClassName?: string;
}

const BlogArticlesList: React.FC<BlogArticlesListProps> = ({
  limit = 4,
  displayCount,
  altLayout = false,
  title = 'Latest Articles',
  description,
  titleColor = 'text-blue-700',
  showFooter = false,
  footerText = '',
  containerLayout = 'grid',
  sectionClassName = '',
}) => {
  const { data, loading } = useBlogPosts(limit);
  const actualDisplayCount = displayCount ?? limit;

  const containerClasses =
    containerLayout === 'vertical' ? 'flex flex-col gap-4' : 'flex flex-wrap justify-center gap-6';

  if (loading) {
    return (
      <section className={sectionClassName}>
        <SectionHeader title={title} description={description} textColor={titleColor} />
        <div className={containerClasses}>
          {Array.from({ length: actualDisplayCount }).map((_, index) => (
            <div
              key={index}
              className={
                altLayout
                  ? 'mx-auto flex w-full max-w-2xl animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900 sm:grid sm:grid-cols-2'
                  : 'mx-auto flex w-full max-w-sm animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-white/10 dark:bg-gray-900'
              }>
              <div className="aspect-[16/10] w-full bg-gray-100 dark:bg-gray-700" />
              <div className="flex flex-1 flex-col justify-center gap-2 p-5">
                <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-700" />
                <div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-700" />
                <div className="h-3 w-1/3 rounded bg-gray-100 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClassName}>
      <SectionHeader title={title} description={description} textColor={titleColor} />
      <div className={containerClasses}>
        {data.slice(0, actualDisplayCount).map((card, index) => (
          <ArticleCard
            key={card.id}
            title={card.title.rendered}
            author_link={card.author_info.author_link}
            display_name={card.author_info.display_name}
            subtitle={card.excerpt.rendered}
            date={card.wbDate}
            imgSrc={card.jetpack_featured_media_url}
            path={card.link}
            altLayout={altLayout}
            index={index}
          />
        ))}
      </div>
      {showFooter && footerText && (
        <p className="mt-6 text-center">
          {footerText}{' '}
          <a
            href="https://blog.podman.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition duration-150 ease-linear hover:text-purple-700 dark:hover:text-purple-500">
            on our Blog!
          </a>
        </p>
      )}
    </section>
  );
};

export default BlogArticlesList;
