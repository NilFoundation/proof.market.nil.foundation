/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import type { socialLinks as links } from '@/constants';
import styles from './SocialLinks.module.scss';

/**
 * Props.
 */
type SocialLinksProps = {
  className?: string;
  bottomIndent?: boolean;
  socialLinks: typeof links;
};

/**
 * Social links.
 *
 * @param {SocialLinksProps} props Props.
 * @returns React component.
 */
export const SocialLinks = ({
  className,
  bottomIndent,
  socialLinks,
}: SocialLinksProps): ReactElement => (
  <ul
    aria-label="Social media links"
    className={`${styles.socialLinks} ${className ?? ''} ${
      bottomIndent ? styles.bottomIndent : ''
    }`}
  >
    {socialLinks.map(({ icon, url }) => (
      <li key={icon}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            iconName={`fa-brands fa-${icon}`}
            srOnlyText={`${icon} link`}
          />
        </a>
      </li>
    ))}
  </ul>
);
