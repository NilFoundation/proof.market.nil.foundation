/**
 * @file This file contains the hook for the statements list data.
 */

import { useMemo } from 'react';
import { dequal as deepEqual } from 'dequal';
import type { Statement } from '@/models';
import { useAppSelector } from '@/redux';
import type { StatementsListData } from '../models/StatementListData';

/**
 * @param statementsList List of statements.
 * @param filterValue Filter value.
 * @returns Statements list data.
 */
export const useStatementsListData = (statementsList: Statement[], filterValue: string) => {
  const statementsInfo = useAppSelector(s => s.statementsState.statementsInfo, deepEqual);

  const filteredStatementsList = useMemo(() => {
    return statementsList.filter(x => {
      const name = x.name.toLowerCase();
      const filter = filterValue.toLowerCase();

      return name.includes(filter);
    });
  }, [filterValue, statementsList]);

  const listData: StatementsListData[] = useMemo(() => {
    return filteredStatementsList.map(x => {
      const info = statementsInfo && statementsInfo.find(y => y._key === x._key);

      return {
        _key: x._key,
        name: x.name,
        cost: info?.current,
        change: info?.daily_change,
        tag: x.tag,
      };
    });
  }, [filteredStatementsList, statementsInfo]);

  return {
    listData,
  };
};
