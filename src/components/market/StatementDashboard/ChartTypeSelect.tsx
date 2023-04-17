/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Nav, useBreakpoints } from '@nilfoundation/react-components';
import { ChartType } from '@/enums';

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
    const { xs, sm } = useBreakpoints();

    return (
        <Nav
            tabs
            vertical={xs || sm}
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
