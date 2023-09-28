/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Select } from '@nilfoundation/ui-kit';
import type { Option } from 'baseui/select';
import { useDispatch } from 'react-redux';
import { UpdateSelectedStatementTags, selectAllStatementsTags, useAppSelector } from '@/redux';
import { getSelectOverrides } from './overrides';

/**
 * Statements tags selector.
 *
 * @returns React component.
 */
export const TagsSelector = (): ReactElement => {
  const dispatch = useDispatch();
  const avialiableTags = useAppSelector(selectAllStatementsTags);
  const selectedTags = useAppSelector(s => s.statementsState.selectedStatementTags);

  const selectOptions: Option[] = useMemo(() => {
    return avialiableTags.map(x => ({ label: x, id: x }));
  }, [avialiableTags]);

  const selectValues: Option[] = useMemo(() => {
    return selectedTags.map(x => ({ label: x, id: x }));
  }, [selectedTags]);

  return (
    <Select
      options={selectOptions}
      value={selectValues}
      multi
      onChange={params => {
        dispatch(UpdateSelectedStatementTags(params.value.map(x => x.id as string)));
      }}
      placeholder="Filter"
      overrides={getSelectOverrides()}
    />
  );
};
