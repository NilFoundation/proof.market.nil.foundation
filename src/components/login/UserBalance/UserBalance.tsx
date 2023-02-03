/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Label, Spinner } from '@nilfoundation/react-components';
import { selectUserBalance, useAppSelector } from 'src/redux';
import { useLocalStorage } from 'src/hooks';
import { ClicableIcon } from 'src/components';
import { longDash } from 'src/utils';
import { siteMoneyTicker } from 'src/constants';
import styles from './UserBalance.module.scss';

/**
 * Props.
 */
type UserBalanceProps = {
    className?: string;
    canToggleVisibility?: boolean;
};

/**
 * User balance.
 *
 * @param {UserBalanceProps} props - Props.
 * @returns React component.
 */
export const UserBalance = ({ className, canToggleVisibility }: UserBalanceProps): ReactElement => {
    const [hidden, setHidden] = useLocalStorage('userBalanceHidden', false);
    const userBalance = useAppSelector(selectUserBalance);
    const loadingUserBalance = useAppSelector(s => s.userState.balanceIsLoading);

    useEffect(() => {
        canToggleVisibility && setHidden(false);
    }, [canToggleVisibility, setHidden]);

    const balance = userBalance?.balance?.toFixed(2);
    const blocked = userBalance?.blocked?.toFixed(2);
    const iconName = hidden ? 'fa-eye-slash' : 'fa-eye';
    const isNoData = balance === undefined && blocked === undefined;
    const displayLoader = isNoData && loadingUserBalance;

    return (
        <div className={`${styles.balance} ${className ?? ''}`}>
            {canToggleVisibility && (
                <ClicableIcon
                    onClick={() => setHidden(!hidden)}
                    iconName={`fa-solid ${iconName}`}
                />
            )}
            {isNoData && !loadingUserBalance && longDash}
            {balance !== undefined && (
                <span
                    className={`${styles.text} ${hidden ? styles.hiddenText : ''}`}
                    title={hidden ? undefined : `Balance: ${balance}`}
                >
                    {`${hidden ? '*'.repeat(balance.length) : balance}`}
                </span>
            )}
            {blocked !== undefined && (
                <Label className={styles.label}>
                    <span
                        className={hidden ? styles.hiddenText : ''}
                        title={`Blocked: ${blocked}`}
                    >
                        {`${hidden ? '*'.repeat(blocked.length) : blocked}`}
                    </span>
                </Label>
            )}
            {displayLoader ? (
                <Spinner grow />
            ) : (
                !isNoData && <span className={styles.currency}>{siteMoneyTicker}s</span>
            )}
        </div>
    );
};
