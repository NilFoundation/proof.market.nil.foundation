/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useCallback } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import {
    selectStatements,
    selectCurrentStatement,
    UpdateSelectedStatementKey,
    useAppSelector,
} from '@/redux';
import { useLocalStorage, useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { StatementsListTable } from './StatementsListTable';
import { DashboardCard } from '../../common';
import { StatementsTags } from './StatementsTags';
import styles from './StatementsList.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const StatementsList = (): ReactElement => {
    const statementsList = useAppSelector(selectStatements, deepEqual);
    const loadingStatements = useAppSelector(s => s.statementsState.isLoading);
    const [tags, setTags] = useLocalStorage<string[]>('statementsTags', []);

    const addStatementsTag = useCallback(
        (tag: string) => {
            setTags([...new Set([...tags, tag])]);
        },
        [setTags, tags],
    );

    const removeStatementsTag = useCallback(
        (tag: string) => {
            setTags(tags.filter(x => x !== tag));
        },
        [setTags, tags],
    );

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
                        <StatementsTags
                            tags={tags}
                            onRemoveTag={removeStatementsTag}
                        />
                        <StatementsListTable
                            addStatmentsTag={addStatementsTag}
                            statementsList={statementsList}
                            removeStatementsTag={removeStatementsTag}
                            selectedTags={tags}
                        />
                    </>
                )}
            </div>
        </DashboardCard>
    );
};
