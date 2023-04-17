/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { dequal as deepEqual } from 'dequal';
import { DashboardCard } from '@/components/common';
import { selectCurrentStatement, useAppSelector } from '@/redux';
import { renderDashOnEmptyValue } from '@/utils';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { StatementDetailedInfo } from '../StatementDetailedInfo';
import styles from './StatementInfoPanel.module.scss';

/**
 * Panel with statement info.
 *
 * @returns React component.
 */
export const StatementInfoPanel = (): ReactElement => {
    const currentStatement = useAppSelector(selectCurrentStatement);
    const stats = useAppSelector(
        s => s.statementsState.statementsStats.find(x => x._key === currentStatement?._key),
        deepEqual,
    );

    const name = useMemo(() => {
        if (!currentStatement) {
            return '';
        }

        const { name } = currentStatement;
        return `${name.toUpperCase()} / ${siteMoneyTickerAbbreviation}`;
    }, [currentStatement]);

    return (
        <DashboardCard className={styles.panel}>
            <div className={styles.container}>
                {currentStatement && <div className={styles.name}>{name}</div>}
                <div>
                    <div className={`text-muted ${styles.title}`}>Average cost</div>
                    <div>{renderDashOnEmptyValue(stats?.avg_cost)}</div>
                </div>
                <div>
                    <div className={`text-muted ${styles.title}`}>Average generation time</div>
                    <div>{renderDashOnEmptyValue(stats?.avg_eval_time)}</div>
                </div>
                <div>
                    <div className={`text-muted ${styles.title}`}>Completed</div>
                    <div>{renderDashOnEmptyValue(stats?.completed, 0)}</div>
                </div>
            </div>
            <StatementDetailedInfo />
        </DashboardCard>
    );
};
