/**
 * @file React context.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import type { MobileMenuContext as MobileMenuContextType } from '../../models/MobileMenuContext';

/**
 * Mobile menu context.
 */
export const MobileMenuContext = createContext<MobileMenuContextType>({} as MobileMenuContextType);
