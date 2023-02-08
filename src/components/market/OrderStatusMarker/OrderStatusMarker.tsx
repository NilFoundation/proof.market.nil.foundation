/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import type { TradeOrderStatus } from 'src/models';
import colors from 'src/styles/export.module.scss';
import styles from './OrderStatusMarker.module.scss';

/**
 * Props.
 */
type OrderStatusMarkerProps = {
    status: TradeOrderStatus;
    className?: string;
};

/**
 * Color by order status.
 */
const OrderStatusColorRepresentation = {
    created: colors.successColor,
    completed: colors.primaryColor,
    processing: colors.infoColor,
    withdrawn: colors.dangerColor,
} satisfies Record<TradeOrderStatus, string>;

/**
 * Order status icon.
 *
 * @param {OrderStatusMarkerProps} props Props.
 * @returns {ReactElement} - Component.
 */
export const OrderStatusMarker = ({ status, className }: OrderStatusMarkerProps): ReactElement => {
    return (
        <div
            className={`${className ?? ''} ${styles.status}`}
            style={{ backgroundColor: OrderStatusColorRepresentation[status] }}
            title={status}
        />
    );
};
