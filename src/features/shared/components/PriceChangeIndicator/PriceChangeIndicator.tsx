/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ArrowUpIcon, PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
import { match } from 'ts-pattern';
import { globalStyles } from '@/styles/globalStyles';
import { styles as s } from './styles';

/**
 * Props.
 */
type PriceChangeIndicatorProps = {
  change: number;
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
  toFixed = 4,
  plainColor,
}: PriceChangeIndicatorProps): ReactElement => {
  const [css] = useStyletron();
  const isGrow = !!change && change > 0;

  const computedClassName = match([plainColor, isGrow])
    .with([false, true], () => globalStyles.successText)
    .with([false, false], () => globalStyles.dangerText)
    .otherwise(() => ({}));

  const computedIconColor = match([plainColor, isGrow])
    .with([false, true], () => PRIMITIVE_COLORS.green300)
    .with([false, false], () => PRIMITIVE_COLORS.red300)
    .otherwise(() => undefined);

  return (
    <div className={css({ ...computedClassName, ...s.container })}>
      <ArrowUpIcon
        color={computedIconColor}
        className={isGrow ? undefined : css(s.revertedIcon)}
      />
      {`${Math.abs(change).toFixed(toFixed)}%`}
    </div>
  );
};
