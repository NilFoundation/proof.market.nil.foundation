/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement, useLayoutEffect, useMemo } from 'react';
import { Icon } from '@nilfoundation/react-components';
import { ColumnInstance } from 'react-table';
import { THeader } from '../Table';
import styles from './ReactTable.module.scss';

/**
 * Props.
 */
type ReactTableHeaderProps<T extends Record<string, unknown>> = {
    column: ColumnInstance<T>;
    // TODO - refactor after upgrading to react-table@v8
    onlySortBy?: 'asc' | 'desc';
};

/**
 * React table header.
 *
 * @param {ReactTableHeaderProps} props Props.
 * @returns React component.
 */
export const ReactTableHeader = <T extends Record<string, unknown>>({
    column,
    onlySortBy,
}: ReactTableHeaderProps<T>): ReactElement => {
    const { canSort, isSorted, isSortedDesc, toggleSortBy } = column;

    const onKeyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        toggleSortBy();
    };

    // TODO - refactor after upgrading to react-table@v8
    const shouldToggleSort = useMemo(() => {
        if (onlySortBy === undefined) {
            return false;
        }

        const toggleSortCondition = onlySortBy === 'asc' ? isSortedDesc : !isSortedDesc;
        return isSorted && !!toggleSortCondition;
    }, [onlySortBy, isSortedDesc, isSorted]);

    useLayoutEffect(() => {
        shouldToggleSort && toggleSortBy();
    }, [shouldToggleSort, toggleSortBy]);

    return (
        <THeader
            {...column.getHeaderProps(column.getSortByToggleProps())}
            className={canSort ? styles.sortableColumnHeader : ''}
            tabIndex={canSort ? 0 : undefined}
            onKeyDown={onKeyDownHandler}
        >
            {column.render('Header')}
            {isSorted && <Icon iconName={`fa-solid fa-angle-${isSortedDesc ? 'down' : 'up'}`} />}
        </THeader>
    );
};