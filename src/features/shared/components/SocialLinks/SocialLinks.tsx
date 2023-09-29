/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useStyletron } from 'styletron-react';
import type { socialLinks as links } from '@/constants';
import { styles as s } from './styles';

/**
 * Props.
 */
type SocialLinksProps = {
  bottomIndent?: boolean;
  socialLinks: typeof links;
};

/**
 * Social links.
 *
 * @param {SocialLinksProps} props Props.
 * @returns React component.
 */
export const SocialLinks = ({ bottomIndent, socialLinks }: SocialLinksProps): ReactElement => {
  const [css] = useStyletron();

  return (
    <ul
      aria-label="Social media links"
      className={css(s.container(bottomIndent))}
    >
      {socialLinks.map(({ icon, url, Component }) => (
        <li
          key={icon}
          className={css(s.item)}
        >
          <a
            href={url}
            className={css(s.link)}
            target="_blank"
            rel="noreferrer"
          >
            <Component size={32} />
          </a>
        </li>
      ))}
    </ul>
  );
};
