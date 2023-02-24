/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { Nav } from '@nilfoundation/react-components';
import { DashboardCard, RouterLink } from 'src/components';
import { Path } from 'src/routing';
import styles from './PortfolioNavbar.module.scss';

/**
 * Portfolio navbar component.
 *
 * @returns React component.
 */
export const PortfolioNavbar = () => {
    return (
        <DashboardCard className={styles.container}>
            <Nav>
                {navConfig.map(({ text, link }) => (
                    <RouterLink
                        key={text}
                        title={text}
                        to={link}
                    />
                ))}
            </Nav>
        </DashboardCard>
    );
};

/**
 * Navbar links configuration.
 */
const navConfig = [
    {
        text: 'My proofs',
        link: `${Path.portfolio}/${Path.proof}`,
    },
    {
        text: 'Generated proofs',
        link: `${Path.portfolio}/${Path.generatedProofs}`,
    },
    {
        text: 'My circuits',
        link: `${Path.portfolio}/${Path.statements}`,
    },
];
