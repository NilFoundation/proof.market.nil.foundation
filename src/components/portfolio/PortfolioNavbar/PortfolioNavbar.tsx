/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { Nav } from '@nilfoundation/react-components';
import { DashboardCard, RouterLink } from '@/components';
import { Path } from '@/features/routing';
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
    text: 'Requests',
    link: `${Path.portfolio}/${Path.requests}`,
  },
  {
    text: 'Proposals',
    link: `${Path.portfolio}/${Path.proposals}`,
  },
  {
    text: 'Statements',
    link: `${Path.portfolio}/${Path.statements}`,
  },
];
