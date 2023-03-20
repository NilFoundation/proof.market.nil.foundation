/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { dequal as deepEqual } from 'dequal';
import { DashboardCard } from '@/components/common';
import { selectCurrentCircuit, useAppSelector } from '@/redux';
import { renderDashOnEmptyValue } from '@/utils';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { CircuitDetailedInfo } from '../CircuitDetailedInfo';
import styles from './CircuitInfoPanel.module.scss';

/**
 * Panel with circuit info.
 *
 * @returns React component.
 */
export const CircuitInfoPanel = (): ReactElement => {
    const currentCircuit = useAppSelector(selectCurrentCircuit);
    const stats = useAppSelector(
        s => s.circuitsState.circuitsStats.find(x => x._key === currentCircuit?._key),
        deepEqual,
    );

    const name = useMemo(() => {
        if (!currentCircuit) {
            return '';
        }

        const { name } = currentCircuit;
        return `${name.toUpperCase()} / ${siteMoneyTickerAbbreviation}`;
    }, [currentCircuit]);

    return (
        <DashboardCard className={styles.panel}>
            <div className={styles.container}>
                {currentCircuit && <div className={styles.name}>{name}</div>}
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
            <CircuitDetailedInfo />
        </DashboardCard>
    );
};
