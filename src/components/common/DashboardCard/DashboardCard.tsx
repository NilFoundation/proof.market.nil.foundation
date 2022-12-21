/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Jumbotron } from '@nilfoundation/react-components';
import styles from './DashboardCard.module.scss';

/**
 * Props.
 */
type DashboardCardProps = {
    children: ReactNode;
    className?: string;
};

/**
 * Dashboard card.
 *
 * @param {DashboardCardProps} props - Props.
 * @returns React component.
 */
export const DashboardCard = ({ children, className }: DashboardCardProps): ReactElement => {
    return (
        <Jumbotron className={`${styles.dashboardCard} ${className ?? ''}`}>{children}</Jumbotron>
    );
};