/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { ChartType } from '@/enums';
import { useBreakpoint } from '@/features/shared';

/**
 * Props.
 */
type ChartTypeSelectProps = {
  chartType: ChartType;
  onSelectChartType: (chartType: ChartType) => void;
  disabled: boolean;
};

/**
 * Chart type selector.
 *
 * @param {ChartTypeSelectProps} props Props.
 * @returns React component.
 */
export const ChartTypeSelect = ({
  chartType,
  onSelectChartType,
  disabled,
}: ChartTypeSelectProps): ReactElement => {
  const bp = useBreakpoint();

  return (
    <Nav
      tabs
      vertical={bp === 'sm'}
    >
      {Object.values(ChartType).map(x => (
        <Nav.Item
          key={x}
          active={x === chartType}
          onClick={() => onSelectChartType(x)}
          disabled={disabled}
        >
          {x}
        </Nav.Item>
      ))}
    </Nav>
  );
};
