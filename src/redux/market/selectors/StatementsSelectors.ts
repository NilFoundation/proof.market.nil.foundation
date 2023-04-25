/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from '../../RootStateType';

const selectStatementsList = (s: RootStateType) => s.statementsState.statements;

/**
 * Selects current statement id.
 *
 * @param s State.
 * @returns Current selected statement id.
 */
export const selectCurrentStatementKey = (s: RootStateType): string | undefined =>
    s.statementsState.selectedKey;

/**
 * Sorted and filtered statements selector.
 */
export const selectStatements = createSelector(selectStatementsList, statements => statements);

/**
 * Selected statement selector.
 */
export const selectCurrentStatement = createSelector(
    selectStatements,
    selectCurrentStatementKey,
    (statements, selectedid) => statements.find(x => x._key === selectedid),
);

/**
 * Selected statement name selector.
 */
export const selectCurrentStatementName = createSelector(
    selectCurrentStatement,
    selectedStatement => selectedStatement?.name,
);