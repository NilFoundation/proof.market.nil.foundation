/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { DateUnit } from '@/enums';
import { ChartSettingsContext } from './ChartSettingsContext';

/**
 * Props.
 */
type DataRangeSelectProps = {
    disabled: boolean;
};

/**
 * Data range select.
 *
 * @param {DataRangeSelectProps} props Props.
 * @returns React component.
 */
export const DataRangeSelect = ({ disabled }: DataRangeSelectProps): ReactElement => {
    const { dataRange, setDataRange } = useContext(ChartSettingsContext);
    return (
        <Nav>
            {Object.values(DateUnit).map(x => (
                <Nav.Item
                    key={x}
                    active={dataRange === x}
                    onClick={() => setDataRange(x)}
                    disabled={disabled}
                >
                    {x}
                </Nav.Item>
            ))}
        </Nav>
    );
};
