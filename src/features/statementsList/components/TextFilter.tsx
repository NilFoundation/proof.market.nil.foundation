/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import type { FilterProps } from 'react-table';
import { Input, SearchIcon } from '@nilfoundation/ui-kit';
import type { StatementsListData } from '@/models';
import { getTextFilterOverrides } from './overrides';

/**
 * Search statements by text filter component.
 *
 * @param {FilterProps<StatementsListData>} props - Filter props.
 * @returns Search by text filter component.
 */
export const TextFilter = ({
  column: { setFilter },
}: FilterProps<StatementsListData>): ReactElement => {
  const [filterValue, setFilterValue] = useState(''); // TODO - maybe this is redundant.
  const debouncedSearch = useRef(
    debounce(value => {
      setFilter(value || undefined);
    }, 300),
  ).current;

  return (
    <Input
      overrides={getTextFilterOverrides()}
      placeholder="Search statements"
      value={filterValue}
      onChange={e => {
        setFilterValue(e.target.value);
        debouncedSearch(e.target.value);
      }}
      startEnhancer={<SearchIcon />}
    />
  );
};
