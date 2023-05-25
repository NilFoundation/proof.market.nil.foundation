/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import {
    selectStatements,
    selectCurrentStatement,
    UpdateSelectedStatementKey,
    useAppSelector,
} from '@/redux';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { StatementsListTable } from './StatementsListTable';
import { DashboardCard } from '../../common';
import styles from './StatementsList.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const StatementsList = (): ReactElement => {
    const statementsList = useAppSelector(selectStatements, deepEqual);
    const loadingStatements = useAppSelector(s => s.statementsState.isLoading);

    useSyncUrlAndSelectedItem({
        urlParamToSync: RouterParam.statementName,
        actionToUpdateSelectedItem: UpdateSelectedStatementKey,
        itemSelector: selectCurrentStatement,
        allItemsSelector: selectStatements,
    });

    return (
        <DashboardCard>
            <h4>Statement list</h4>
            <div className={styles.container}>
                {loadingStatements && !statementsList.length ? (
                    <Spinner grow />
                ) : (
                    <>
                        <StatementsListTable statementsList={statementsList} />
                    </>
                )}
            </div>
        </DashboardCard>
    );
};
