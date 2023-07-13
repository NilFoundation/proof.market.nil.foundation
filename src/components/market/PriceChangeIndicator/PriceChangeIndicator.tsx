/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import clsx from 'clsx';
import styles from './PriceChangeIndicator.module.scss';

/**
 * Props.
 */
type PriceChangeIndicatorProps = {
    change: number;
    className?: string;
    toFixed?: number;
    plainColor?: boolean;
};

/**
 * Trade history component.
 *
 * @param {PriceChangeIndicatorProps} props Props.
 * @returns React component.
 */
export const PriceChangeIndicator = ({
    change,
    className,
    toFixed = 4,
    plainColor,
}: PriceChangeIndicatorProps): ReactElement => {
    const isGrow = !!change && change > 0;
    const iconName = `fa-solid fa-arrow-${isGrow ? 'up' : 'down'}`;
    const computedClassName = clsx(
        styles.priceChangeIndicator,
        plainColor ? '' : isGrow ? 'growTextColor' : 'lossTextColor',
        className,
    );

    return (
        <div className={computedClassName}>
            <Icon iconName={iconName} />
            {`${Math.abs(change).toFixed(toFixed)}%`}
        </div>
    );
};
