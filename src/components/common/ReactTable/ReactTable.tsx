/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect } from 'react';
import {
    ColumnInstance,
    TableInstance,
    TableOptions,
    useFilters,
    useSortBy,
    useTable,
} from 'react-table';
import { notEmpty } from 'src/utils';
import { useDebounce, useInitialTableState } from 'src/hooks';
import { ReactTableHeader } from './ReactTableHeader';
import { Table, TBody, THead, TRow } from '../Table';

/**
 * Props.
 */
type ReactTableProps<T extends Record<string, unknown>> = {
    name: string;
    renderRows: (tableInstance: TableInstance<T>) => ReactNode;
    renderHeaders?: (tableInstance: TableInstance<T>) => ReactNode;
    className?: string;
    footerHeader?: boolean;
    showTableHeader?: boolean;
} & TableOptions<T>;

/**
 * React-table hook list to pass into table instance.
 */
const tableHooks = [useFilters, useSortBy].filter(notEmpty);

/**
 * React table template.
 *
 * @param {ReactTableProps} props Props.
 * @returns React component.
 */
export const ReactTable = <T extends Record<string, unknown>>({
    name,
    renderRows,
    renderHeaders,
    initialState: defaultInitialState,
    className,
    footerHeader,
    showTableHeader = true,
    ...restOptions
}: ReactTableProps<T>): ReactElement => {
    const [initialState, setInitialState] = useInitialTableState(name, defaultInitialState);

    const tableInstance = useTable<T>(
        {
            initialState,
            ...restOptions,
        },
        ...tableHooks,
    );
    const { getTableBodyProps, visibleColumns, state } = tableInstance;

    const debouncedState = useDebounce(state, 500);

    useEffect(() => {
        setInitialState(debouncedState);
    }, [setInitialState, debouncedState]);

    const tableHeadersRenderer = () =>
        renderHeaders ? renderHeaders(tableInstance) : renderTableHeadersFallback(visibleColumns);

    return (
        <Table className={className}>
            {showTableHeader && (
                <THead
                    sticky
                    isFooterHeader={footerHeader}
                >
                    <TRow>{tableHeadersRenderer()}</TRow>
                </THead>
            )}
            <TBody {...getTableBodyProps()}>{renderRows(tableInstance)}</TBody>
        </Table>
    );
};

/**
 * Renders table head.
 *
 * @param columns Table columns.
 * @returns Table head.
 */
const renderTableHeadersFallback = <T extends Record<string, unknown>>(
    columns: ColumnInstance<T>[],
) => (
    <>
        {columns.map(column => (
            <ReactTableHeader
                key={column.id}
                column={column}
            />
        ))}
    </>
);