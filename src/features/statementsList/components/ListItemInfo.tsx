/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { SPINNER_SIZE, Spinner } from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
import { useAppSelector } from '@/redux';
import { siteMoneyTickerAbbreviation } from '@/constants';
import { PriceChangeIndicator } from '@/features/shared';
import { styles as s } from './styles';

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
export const ListItemInfo = memo(function StatementsListItemInfo({
  cost,
  change,
  isSelected,
}: StatementsListItemInfoProps): ReactElement {
  const isLoadingInfo = useAppSelector(s => s.statementsState.isLoadingStatementsInfo);
  const [css] = useStyletron();

  return (
    <div className={css(s.priceIndicator)}>
      {cost && <div>{`${cost.toFixed(4)} ${siteMoneyTickerAbbreviation}`}</div>}
      {!!change && (
        <PriceChangeIndicator
          change={change}
          plainColor={isSelected}
        />
      )}
      {isLoadingInfo && cost === undefined && change === undefined && (
        <Spinner size={SPINNER_SIZE.small} />
      )}
    </div>
  );
});
