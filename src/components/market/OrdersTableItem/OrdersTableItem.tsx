/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { forwardRef } from 'react';
import { TradeOrderType } from '@/models';
import type { ManageOrdersData } from '@/models';
import { capitalizeFirstChar, formatDate, renderDashOnEmptyValue } from '@/utils';
import { ClickableIcon } from '@/components';
import { OrderStatusMarker } from '../OrderStatusMarker';
import styles from './OrdersTableItem.module.scss';

/**f
 * Props.
 */
type OrdersTableItemProps = {
  children?: ReactNode;
  onClickRemoveIcon?: () => void;
  showRemoveIcon?: boolean;
} & Pick<ManageOrdersData, 'cost' | 'status' | 'type' | 'eval_time' | 'init_time'>;

/**
 * Orders table items.
 *
 * @param {OrdersTableItemProps} props Props.
 * @returns React component.
 */
export const OrdersTableItem = forwardRef<HTMLDivElement, OrdersTableItemProps>(
  function ActiveOrdersTableItem(
    {
      children,
      onClickRemoveIcon,
      status,
      init_time,
      type,
      cost,
      eval_time,
      showRemoveIcon = true,
    },
    ref,
  ): ReactElement {
    return (
      <div
        className={styles.item}
        ref={ref}
      >
        <OrderStatusMarker
          status={status}
          className={styles.status}
        />
        <div>
          <div>{capitalizeFirstChar(status)}</div>
          <div className={styles.date}>{formatDate(init_time, 'DD.MM HH:mm')}</div>
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
        {showRemoveIcon && (
          <ClickableIcon
            iconName="fa-solid fa-cancel"
            title="Cancel order"
            onClick={onClickRemoveIcon}
            className={styles.removeIcon}
          />
        )}
        {children}
      </div>
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
