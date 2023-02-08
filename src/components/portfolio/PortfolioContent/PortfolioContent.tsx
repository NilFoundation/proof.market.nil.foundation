/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { Col, Row } from '@nilfoundation/react-components';
import { DashboardCard } from 'src/components';
import styles from './PortfolioContent.module.scss';

/**
 * Props.
 */
type PortfolioContentProps = {
    list: ReactNode;
    content: ReactNode;
};

/**
 * Portfolio content markup.
 *
 * @param {PortfolioContentProps} props Props.
 * @returns React component.
 */
export const PortfolioContent = ({ list, content }: PortfolioContentProps): ReactElement => {
    return (
        <Row>
            <Col
                xs={12}
                md={3}
            >
                {list}
            </Col>
            <Col
                xs={12}
                md={9}
            >
                <DashboardCard>
                    <div className={styles.container}>{content}</div>
                </DashboardCard>
            </Col>
        </Row>
    );
};
