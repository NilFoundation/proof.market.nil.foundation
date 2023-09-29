/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Card, SPINNER_SIZE, Spinner } from '@nilfoundation/ui-kit';
import { dequal as deepEqual } from 'dequal';
import {
  selectCurrentStatement,
  UpdateSelectedStatementKey,
  useAppSelector,
  selectStatementsFilteredByTags,
} from '@/redux';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { StatementsListTable } from './StatementsListTable';
import { getStatementsCardOverrides } from './overrides';

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
    <Card
      title="Statements"
      headline
      overrides={getStatementsCardOverrides()}
    >
      {loadingStatements && !statementsList.length ? (
        <Spinner size={SPINNER_SIZE.large} />
      ) : (
        <StatementsListTable statementsList={statementsList} />
      )}
    </Card>
  );
};

export default StatementsList;
