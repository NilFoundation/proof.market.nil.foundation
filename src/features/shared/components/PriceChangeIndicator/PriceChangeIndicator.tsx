/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ArrowUpIcon, PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
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
  const computedClassName = plainColor
    ? {}
    : isGrow
    ? globalStyles.successText
    : globalStyles.dangerText;
  const computedIconColor = plainColor
    ? undefined
    : isGrow
    ? PRIMITIVE_COLORS.green300
    : PRIMITIVE_COLORS.red300;

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
