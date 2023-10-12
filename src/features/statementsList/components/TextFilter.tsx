/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import { Input, SearchIcon } from '@nilfoundation/ui-kit';
import { getTextFilterOverrides } from './overrides';

/**
 * Props.
 */
type TextFilterProps = {
  setFilterValue: (value: string) => void;
};

/**
 * Search statements by text filter component.
 *
 * @param {TextFilterProps} props - Filter props.
 * @returns Search by text filter component.
 */
export const TextFilter = ({ setFilterValue }: TextFilterProps): ReactElement => {
  const [value, setValue] = useState('');
  const debouncedSearch = useRef(
    debounce(value => {
      setFilterValue(value ?? '');
    }, 200),
  ).current;

  return (
    <Input
      overrides={getTextFilterOverrides()}
      placeholder="Search statements"
      value={value}
      onChange={e => {
        setValue(e.target.value);
        debouncedSearch(e.target.value);
      }}
      startEnhancer={<SearchIcon />}
    />
  );
};
