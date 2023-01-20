/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Jumbotron } from '@nilfoundation/react-components';
import styles from './AuthCard.module.scss';

/**
 * Props.
 */
type AuthCardProps = {
    children: ReactNode;
};

/**
 * Auth card template.
 *
 * @param {AuthCardProps} props - Props.
 * @returns React component.
 */
export const AuthCard = ({ children }: AuthCardProps): ReactElement => {
    return <Jumbotron className={styles.authCard}>{children}</Jumbotron>;
};