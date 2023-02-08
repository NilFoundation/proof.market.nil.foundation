/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect } from 'react';
import { useRef, forwardRef, useCallback, useState } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import type { Row } from 'react-table';
import { CSSTransition } from 'react-transition-group';
import { TradeOrderType } from 'src/models';
import { removeAsk, removeBid } from 'src/api';
import { RemoveUserAsk, RemoveUserBid } from 'src/redux';
import { useOnClickOutside } from 'src/hooks';
import type { ManageOrdersData } from 'src/models';
import { capitalizeFirstChar, renderDashOnEmptyValue } from 'src/utils';
import { ClicableIcon } from 'src/components/common';
import { RemoveOrderConfirmationCard } from './RemoveOrderConfirmationCard';
import { OrderStatusMarker } from '../OrderStatusMarker';
import styles from './ActiveOrdersTable.module.scss';

/**
 * Props.
 */
type ActiveOrdersTableItemProps = {
    data: Row<ManageOrdersData>;
};

/**
 * Active orders table.
 *
 * @param {ActiveOrdersTableItemProps} props Props.
 * @returns React component.
 */
export const ActiveOrdersTableItem = forwardRef<HTMLDivElement, ActiveOrdersTableItemProps>(
    function ActiveOrdersTableItem({ data }, ref): ReactElement {
        const [showConfirmationCard, setShowConfirmationCard] = useState(false);
        const [error, setError] = useState('');
        const [processing, setProcessing] = useState(false);
        const dispatch = useDispatch();

        const { values } = data;
        const { type, orderId, status, eval_time, cost, init_time } = values as ManageOrdersData;

        const confirmationCardRef = useRef(null);
        const closeConfirmationCard = useCallback(() => setShowConfirmationCard(false), []);
        useOnClickOutside(confirmationCardRef, closeConfirmationCard);

        const onAcceptRemoveOrder = useCallback(async () => {
            setProcessing(true);
            setError('');

            try {
                const fetcher = type === TradeOrderType.buy ? removeBid : removeAsk;
                const action = type === TradeOrderType.buy ? RemoveUserBid : RemoveUserAsk;

                await fetcher(orderId);
                dispatch(action(orderId));
                setError('');
                setShowConfirmationCard(false);
            } catch (e) {
                setError('Encountered error during order removing');
            } finally {
                setProcessing(false);
            }
        }, [setProcessing, setShowConfirmationCard, dispatch, orderId, type]);

        const onDeclineRemoveOrder = useCallback(() => {
            setShowConfirmationCard(false);
        }, [setShowConfirmationCard]);

        useEffect(() => {
            !showConfirmationCard && setError('');
        }, [setError, showConfirmationCard]);

        return (
            <ListGroup.Item>
                <div
                    className={styles.listGroupItem}
                    ref={ref}
                >
                    <OrderStatusMarker
                        status={status}
                        className={styles.status}
                    />
                    <div>
                        <div>{capitalizeFirstChar(status)}</div>
                        <div className={styles.date}>{init_time}</div>
                    </div>
                    <div className={getTypeClassName(type)}>{type}</div>
                    <div>
                        <div>
                            <span className="text-muted">Cost: </span>
                            {cost.toFixed(4)}
                        </div>
                        <div>
                            <span className="text-muted">Generation time: </span>
                            {renderDashOnEmptyValue(eval_time)}
                        </div>
                    </div>
                    <ClicableIcon
                        iconName="fa-solid fa-cancel"
                        title="Cancel order"
                        onClick={() => setShowConfirmationCard(true)}
                        className={styles.removeIcon}
                    />
                    <CSSTransition
                        classNames="slide"
                        timeout={300}
                        in={showConfirmationCard}
                        unmountOnExit
                        nodeRef={confirmationCardRef}
                    >
                        <RemoveOrderConfirmationCard
                            onAccept={onAcceptRemoveOrder}
                            onDecline={onDeclineRemoveOrder}
                            processing={processing}
                            message="Proceed removing? This action could not be undone."
                            error={error}
                            ref={confirmationCardRef}
                        />
                    </CSSTransition>
                </div>
            </ListGroup.Item>
        );
    },
);

/**
 * Generate type className.
 *
 * @param type Type.
 * @returns Class name.
 */
const getTypeClassName = (type: TradeOrderType) => {
    return `${type === TradeOrderType.buy ? 'grow' : 'loss'}TextColor`;
};
