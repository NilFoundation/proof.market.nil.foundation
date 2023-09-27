/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { Icon, Input, InputGroup } from '@nilfoundation/react-components';
import debounce from 'lodash/debounce';
import type { FilterProps } from 'react-table';
import type { StatementsListData } from '@/models';
import styles from './StatementsList.module.scss';

/**
 * Search statements by text filter component.
 *
 * @param {FilterProps<StatementsListData>} props - Filter props.
 * @returns Search by text filter component.
 */
export const StatementsListTextFilter = ({
  column: { setFilter },
}: FilterProps<StatementsListData>): ReactElement => {
  const [filterValue, setFilterValue] = useState('');
  const debouncedSearch = useRef(
    debounce(value => {
      setFilter(value || undefined);
    }, 300),
  ).current;

  return (
    <InputGroup className={styles.inputGroup}>
      <InputGroup.Addon>
        <Icon iconName="fa-solid fa-search" />
      </InputGroup.Addon>
      <Input
        placeholder="Search statements"
        type="text"
        value={filterValue}
        onChange={e => {
          setFilterValue(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />
    </InputGroup>
  );
};
