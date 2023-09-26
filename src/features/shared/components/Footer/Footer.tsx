/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useStyletron } from 'styletron-react';
import { Copyright, SocialLinks } from '@/components';
import { socialLinks } from '@/constants';
import { styles as s } from './styles';

/**
 * Footer.
 *
 * @returns React component.
 */
export const Footer = (): ReactElement => {
    const [css] = useStyletron();

    return (
        <footer className={css(s.footer)}>
            <SocialLinks socialLinks={socialLinks} />
            <Copyright />
        </footer>
    );
};