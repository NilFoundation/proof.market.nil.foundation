/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { dequal as deepEqual } from 'dequal';
import { DashboardCard } from 'src/components/common';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { renderDashOnEmptyValue } from 'src/utils';
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
        s => s.circuitsState.circuitsStats.find(x => x.circuit_id === currentCircuit?.id),
        deepEqual,
    );

    return (
        <DashboardCard className={styles.panel}>
            <div className={styles.container}>
                {currentCircuit && (
                    <div>
                        {`${currentCircuit?.name.toUpperCase()} (${currentCircuit?.info.toUpperCase()})/USD`}
                    </div>
                )}
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
