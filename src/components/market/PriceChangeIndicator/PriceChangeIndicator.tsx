/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
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
}: PriceChangeIndicatorProps): ReactElement => {
    const isGrow = !!change && change > 0;
    const iconName = `fa-solid fa-arrow-${isGrow ? 'up' : 'down'}`;
    const computedClassName = clsx(
        styles.priceChangeIndicator,
        isGrow ? 'growTextColor' : 'lossTextColor',
        className,
    );

    return (
        <div className={computedClassName}>
            <Icon iconName={iconName} />
            {`${change.toFixed(toFixed)}%`}
        </div>
    );
};