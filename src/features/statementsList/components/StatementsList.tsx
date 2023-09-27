/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { SPINNER_SIZE, Spinner } from '@nilfoundation/ui-kit';
import { dequal as deepEqual } from 'dequal';
import {
    selectCurrentStatement,
    UpdateSelectedStatementKey,
    useAppSelector,
    selectStatementsFilteredByTags,
} from '@/redux';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { DashboardCard } from '@/components';
import { StatementsListTable } from './StatementsListTable';
import styles from './StatementsList.module.scss';

/**
 * Statements list.
 *
 * @returns React component.
 */
const StatementsList = (): ReactElement => {
    const statementsList = useAppSelector(selectStatementsFilteredByTags, deepEqual);
    const loadingStatements = useAppSelector(s => s.statementsState.isLoading);

    useSyncUrlAndSelectedItem({
        urlParamToSync: RouterParam.statementName,
        actionToUpdateSelectedItem: UpdateSelectedStatementKey,
        itemSelector: selectCurrentStatement,
        allItemsSelector: selectStatementsFilteredByTags,
    });

    return (
        <DashboardCard className={styles.wrapper}>
            <h4>Statement list</h4>
            <div className={styles.container}>
                {loadingStatements && !statementsList.length ? (
                    <Spinner size={SPINNER_SIZE.large} />
                ) : (
                    <StatementsListTable statementsList={statementsList} />
                )}
            </div>
        </DashboardCard>
    );
};

export default StatementsList;
