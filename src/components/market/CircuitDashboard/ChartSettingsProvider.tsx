/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { DateUnit } from '@/enums';
import { useLocalStorage } from '@/hooks';
import { ChartSettingsContext } from './ChartSettingsContext';

/**
 * Props.
 */
type ChartSettingsProviderProps = {
    children?: ReactNode;
};

/**
 * Chart settings provider.
 *
 * @param {ChartSettingsProviderProps} props Props.
 * @returns React component.
 */
export const ChartSettingsProvider = ({ children }: ChartSettingsProviderProps): ReactElement => {
    const [dataRange, setDataRange] = useLocalStorage<DateUnit>(
        'circuitDashboardDataRange',
        DateUnit.hour,
    );

    const [displayVolumes, setDisplayVolumes] = useLocalStorage(
        'circuitDashboardDisplayVolumes',
        false,
    );

    return (
        <ChartSettingsContext.Provider
            value={{
                dataRange,
                setDataRange,
                displayVolumes,
                setDisplayVolumes,
            }}
        >
            {children}
        </ChartSettingsContext.Provider>
    );
};
