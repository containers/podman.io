import React from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';

type SocialLink = { label: string; path?: string; icon: string };

const socialLinks: SocialLink[] = [
  { label: 'X', path: 'https://twitter.com/Podman_io', icon: 'simple-icons:x' },
  { label: 'Matrix', path: 'https://matrix.to/#/#podman:fedoraproject.org', icon: 'simple-icons:matrix' },
  { label: 'IRC', path: 'https://web.libera.chat/#podman-desktop', icon: 'ph:chat-circle-text-fill' },
  { label: 'YouTube', path: 'https://www.youtube.com/@Podman_io', icon: 'simple-icons:youtube' },
  { label: 'LinkedIn', path: 'https://www.linkedin.com/company/podman', icon: 'simple-icons:linkedin' },
];

function Footer(): JSX.Element {
  const { footer } = useThemeConfig();
  const links = (footer?.links ?? []) as { title: string; items: { label: string; to?: string; href?: string }[] }[];

  return (
    <footer className="footer px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-start gap-x-14 gap-y-8 lg:justify-between">
        <div className="w-full text-left lg:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logos/optimized/podman-3-logo-266w-253h.webp"
              alt="Podman Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl font-bold text-white">podman</span>
          </Link>
          <p className="mt-4 max-w-sm text-white/90">
            Run secure, rootless containers with a lightweight, daemon-free container engine.
          </p>
          <ul className="mt-5 flex items-center justify-start gap-4">
            {socialLinks.map(social => (
              <li key={social.label}>
                <a
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white no-underline grayscale transition duration-150 ease-linear hover:-translate-y-0.5 hover:bg-white/20 hover:no-underline">
                  <Icon icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {links.map(column => (
          <div key={column.title}>
            <div className="mb-4 font-display text-lg font-semibold text-white">{column.title}</div>
            <ul className="flex flex-col gap-2">
              {column.items.map(item => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {footer?.copyright && (
        <div
          className="footer__copyright mx-auto mt-8 max-w-5xl text-center text-gray-300"
          dangerouslySetInnerHTML={{ __html: footer.copyright }}
        />
      )}
    </footer>
  );
}

export default Footer;
