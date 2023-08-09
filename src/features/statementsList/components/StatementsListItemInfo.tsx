/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Media, Spinner } from '@nilfoundation/react-components';
import { useAppSelector } from '@/redux';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { PriceChangeIndicator } from '@/components/market/PriceChangeIndicator';
import styles from './StatementsList.module.scss';

/**
 * Props.
 */
type StatementsListItemInfoProps = {
    cost?: number | null;
    change?: number | null;
    isSelected?: boolean;
};

/**
 * Currencies list item brief info.
 *
 * @param {StatementsListItemInfoProps} props - Props.
 * @returns React component.
 */
export const StatementsListItemInfo = memo(function StatementsListItemInfo({
    cost,
    change,
    isSelected,
}: StatementsListItemInfoProps): ReactElement {
    const isLoadingInfo = useAppSelector(s => s.statementsState.isLoadingStatementsInfo);

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
