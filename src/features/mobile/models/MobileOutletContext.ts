/**
 * @file Typings.
 */
import type { MobileMenuItem } from '../enums/MobileMenuItem';

/**
 * Context for react-router-dom's `Outlet` component.
 */
export interface MobileOutletContext {
    selectedMenuOption?: MobileMenuItem;
}
