/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useEffect, useRef, forwardRef, useCallback, useState } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import type { Row } from 'react-table';
import { CSSTransition } from 'react-transition-group';
import { TradeOrderType } from '@/models';
import { removeProposal, removeRequest } from '@/api';
import { RemoveUserProposal, RemoveUserRequest } from '@/redux';
import { useOnClickOutside } from '@/hooks';
import type { ManageOrdersData } from '@/models';
import { RemoveOrderConfirmationCard } from './RemoveOrderConfirmationCard';
import { OrdersTableItem } from '../OrdersTableItem';

/**
 * Props.
 */
type ActiveOrdersTableItemProps = {
  data: Row<ManageOrdersData>;
};

/**
 * Active orders table item.
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
    const { type, orderId, ...restData } = values as ManageOrdersData;

    const confirmationCardRef = useRef(null);
    const closeConfirmationCard = useCallback(() => setShowConfirmationCard(false), []);
    useOnClickOutside(confirmationCardRef, closeConfirmationCard);

    const onAcceptRemoveOrder = useCallback(async () => {
      setProcessing(true);
      setError('');

      try {
        const fetcher = type === TradeOrderType.buy ? removeRequest : removeProposal;
        const action = type === TradeOrderType.buy ? RemoveUserRequest : RemoveUserProposal;

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
        <OrdersTableItem
          ref={ref}
          onClickRemoveIcon={() => setShowConfirmationCard(true)}
          type={type}
          {...restData}
        >
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
        </OrdersTableItem>
      </ListGroup.Item>
    );
  },
);
