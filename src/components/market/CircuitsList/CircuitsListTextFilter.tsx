/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { Icon, Input, InputGroup } from '@nilfoundation/react-components';
import debounce from 'lodash/debounce';
import type { FilterProps } from 'react-table';
import type { CircuitsListData } from '@/models';
import styles from './CircuitsList.module.scss';

/**
 * Search circuits by text filter component.
 *
 * @param {FilterProps<CircuitsListData>} props - Filter props.
 * @returns Search by text filter component.
 */
export const CircuitsListTextFilter = ({
    column: { setFilter },
}: FilterProps<CircuitsListData>): ReactElement => {
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
                placeholder="Search circuits"
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
