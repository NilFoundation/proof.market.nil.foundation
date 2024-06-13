/**
 * @file React context.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import type { DashboardContext as DashboardContextType } from '../../models/DashboardContext';

export const DashboardContext = createContext({} as DashboardContextType);
DashboardContext.displayName = 'DashboardContext';
