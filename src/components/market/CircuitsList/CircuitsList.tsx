/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import {
    selectCircuits,
    selectCurrentCircuit,
    UpdateSelectedCircuitKey,
    useAppSelector,
} from '@/redux';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { CircuitsListTable } from './CircuitsListTable';
import { DashboardCard } from '../../common';
import styles from './CircuitsList.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitsList = (): ReactElement => {
    const circuitsList = useAppSelector(selectCircuits, deepEqual);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    useSyncUrlAndSelectedItem({
        urlParamToSync: RouterParam.statementName,
        actionToUpdateSelectedItem: UpdateSelectedCircuitKey,
        itemSelector: selectCurrentCircuit,
        allItemsSelector: selectCircuits,
    });

    return (
        <DashboardCard>
            <h4>Circuit list</h4>
            <div className={styles.container}>
                {loadingCircuits && !circuitsList.length ? (
                    <Spinner grow />
                ) : (
                    <CircuitsListTable circuitsList={circuitsList} />
                )}
            </div>
        </DashboardCard>
    );
};
