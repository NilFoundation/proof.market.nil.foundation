/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { createRef, useMemo, memo } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Details } from '@/components';
import { groupManageOrdersDataByDate } from '@/utils';
import type { ManageOrdersData } from '@/models';
import { OrdersTableItem } from '../OrdersTableItem';
import styles from './HistoryOrdersTable.module.scss';

/**
 * Props.
 */
type HistoryOrdersTableProps = {
    data: ManageOrdersData[];
};

/**
 * History orders table.
 *
 * @param {HistoryOrdersTableProps} props Props.
 * @returns React component.
 */
export const HistoryOrdersTable = memo(function ActiveOrdersTable({
    data,
}: HistoryOrdersTableProps): ReactElement {
    const dataGrouppedByDates = useMemo(() => {
        return groupManageOrdersDataByDate(data);
    }, [data]);

    const dateKeys = Object.keys(dataGrouppedByDates);

    return (
        <div className={styles.container}>
            {dateKeys.length === 0 ? (
                <span className="text-muted">Empty history</span>
            ) : (
                <>
                    {dateKeys.map(key => (
                        <Details
                            title={key}
                            key={key}
                        >
                            <ListGroup className={styles.listGroup}>
                                <TransitionGroup component={null}>
                                    {dataGrouppedByDates[key].map((data, index) => {
                                        const nodeRef = createRef<HTMLDivElement>();

                                        return (
                                            <CSSTransition
                                                key={`${data.init_time}-${index}`}
                                                nodeRef={nodeRef}
                                                timeout={300}
                                                classNames="fade"
                                            >
                                                <ListGroup.Item>
                                                    <OrdersTableItem
                                                        {...data}
                                                        showRemoveIcon={false}
                                                        ref={nodeRef}
                                                    />
                                                </ListGroup.Item>
                                            </CSSTransition>
                                        );
                                    })}
                                </TransitionGroup>
                            </ListGroup>
                        </Details>
                    ))}
                </>
            )}
        </div>
    );
});
