/**
 * @file Navbar config.
 */

import type { NavigationBarProps } from '@nilfoundation/ui-kit';

export const navbarConfig: NavigationBarProps['items'] = [
    {
        id: '1',
        label: 'Market',
        isSelected: true,
    },
    {
        id: '2',
        label: 'Portfolio',
    },
];
