/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import type { DateUnit } from '@/enums';

/**
 * Context type.
 */
type ChartSettingsContectModel = {
    dataRange: DateUnit;
    setDataRange: (unit: DateUnit) => void;
    displayVolumes: boolean;
    setDisplayVolumes: (b: boolean) => void;
};

/**
 * Data range context.
 */
export const ChartSettingsContext = createContext<ChartSettingsContectModel>(
    {} as ChartSettingsContectModel,
);
