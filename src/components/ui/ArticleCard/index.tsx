import React from 'react';

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

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
};

const getInitials = (name?: string) => {
  if (!name) return 'P';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

function ArticleCard(props: ArticleCardProps) {
  // Select fallback image based on index, cycling through available images
  const fallbackImage = FALLBACK_IMAGES[(props.index || 0) % FALLBACK_IMAGES.length];

  // Sanitizes HTML and converts it to plain text
  const sanitizeHtml = (html: string) => {
    if (!html) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const formatTitle = (rawTitle: string) => {
    const text = sanitizeHtml(rawTitle);
    return text
      .replace(/and a long list of bug fixes/gi, 'and Bug Fixes')
      .replace(/a long list of bug fixes/gi, 'Bug Fixes');
  };

  const cleanSubtitle = sanitizeHtml(props.subtitle).trim();
  const formattedDate = formatDate(props.date);

  if (props.altLayout) {
    return (
      <article className="group my-4 overflow-hidden rounded-xl bg-gradient-to-b from-blue-500 to-purple-700 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-blue-700 dark:to-purple-900">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative flex h-48 items-center justify-center p-4">
            <img
              src={props.imgSrc || fallbackImage}
              alt={props.title || 'Article cover image'}
              className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-between p-5">
            <div>
              <div className="mb-2 h-14 sm:h-16">
                <h3 className="!m-0 line-clamp-2 !p-0 text-base font-bold leading-snug tracking-tight sm:line-clamp-3 sm:text-lg">
                  <a
                    href={props.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!text-white !no-underline transition-colors hover:!text-blue-100">
                    {formatTitle(props.title)}
                  </a>
                </h3>
              </div>
              <div className="h-14 overflow-hidden sm:h-16">
                <p className="!m-0 line-clamp-3 !p-0 text-justify text-xs leading-relaxed text-white/90 [text-justify:inter-word] sm:text-sm">
                  {cleanSubtitle}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between pt-1">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white shadow-sm">
                  {getInitials(props.display_name)}
                </div>
                <div className="flex min-w-0 flex-col">
                  <a
                    href={props.author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-xs font-semibold text-white !no-underline transition-colors hover:!text-blue-100">
                    {props.display_name}
                  </a>
                  {formattedDate && <time className="text-[11px] font-medium text-white/80">{formattedDate}</time>}
                </div>
              </div>
              <a
                href={props.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white !no-underline backdrop-blur-sm transition-all duration-200 hover:bg-white hover:!text-purple-900">
                <span>Read</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Normal Layout
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-b from-blue-500 to-purple-700 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-blue-700 dark:to-purple-900">
      {/* Graphic Container */}
      <div className="relative flex h-44 w-full items-center justify-center p-4 sm:h-48">
        <img
          src={props.imgSrc || fallbackImage}
          alt={props.title || 'Article cover image'}
          className="h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 pt-2">
        <div>
          {/* Title Area with fixed height for exact horizontal alignment across cards */}
          <div className="mb-3 h-14 sm:h-16">
            <h3 className="!m-0 line-clamp-2 !p-0 text-base font-bold leading-snug tracking-tight sm:line-clamp-3 sm:text-lg">
              <a
                href={props.path}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white !no-underline transition-colors hover:!text-blue-100">
                {formatTitle(props.title)}
              </a>
            </h3>
          </div>

          {/* Excerpt Body with fixed height and clean line-clamp so text never gets cut off */}
          <div className="h-16 overflow-hidden sm:h-20">
            <p className="!m-0 line-clamp-3 !p-0 text-justify text-xs leading-relaxed text-white/90 [text-justify:inter-word] sm:text-sm">
              {cleanSubtitle}
            </p>
          </div>
        </div>

        {/* Card Footer (Author, Date, and Read button) */}
        <div className="mt-4 flex items-center justify-between pt-1">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white shadow-sm">
              {getInitials(props.display_name)}
            </div>
            <div className="flex min-w-0 flex-col">
              <a
                href={props.author_link}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-xs font-semibold text-white !no-underline transition-colors hover:!text-blue-100">
                {props.display_name}
              </a>
              {formattedDate && <time className="text-[11px] font-medium text-white/80">{formattedDate}</time>}
            </div>
          </div>

          <a
            href={props.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white !no-underline backdrop-blur-sm transition-all duration-200 hover:bg-white hover:!text-purple-900">
            <span>Read</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
