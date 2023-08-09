/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { Router } from '@/features/routing';
import { mobileRoutesConfig } from '../../constants/mobileRoutesConfig';

/**
 * Router tree for mobile app version.
 *
 * @returns Routes.
 */
export const MobileRouter = () => <Router config={mobileRoutesConfig} />;
