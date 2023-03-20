/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Media, Spinner } from '@nilfoundation/react-components';
import { useAppSelector } from '@/redux';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { PriceChangeIndicator } from '../PriceChangeIndicator';
import styles from './CircuitsList.module.scss';

/**
 * Props.
 */
type CircuitsListItemInfoProps = {
    cost?: number | null;
    change?: number | null;
    isSelected?: boolean;
};

/**
 * Currencies list item brief info.
 *
 * @param {CircuitsListItemInfoProps} props - Props.
 * @returns React component.
 */
export const CircuitsListItemInfo = memo(function CircuitsListItemInfo({
    cost,
    change,
    isSelected,
}: CircuitsListItemInfoProps): ReactElement {
    const isLoadingInfo = useAppSelector(s => s.circuitsState.isLoadingCircuitsInfo);

    return (
        <Media.Item position="right">
            {cost && (
                <div className={styles.cost}>{`${cost.toFixed(
                    4,
                )} ${siteMoneyTickerAbbreviation}`}</div>
            )}
            {!!change && (
                <PriceChangeIndicator
                    change={change}
                    className={styles.dailyChangeIndicator}
                    plainColor={isSelected}
                />
            )}
            {isLoadingInfo && cost === undefined && change === undefined && <Spinner />}
        </Media.Item>
    );
});
