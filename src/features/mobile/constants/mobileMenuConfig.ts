/**
 * @file Constant data.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { MobileMenuItem } from '../enums/MobileMenuItem';

type MobileMenuElement = {
  key: MobileMenuItem;
};

/**
 * Mobile menu configuration.
 */
export const mobileMenuConfig: MobileMenuElement[] = [
  {
    key: MobileMenuItem.statements,
  },
  {
    key: MobileMenuItem.charts,
  },
  {
    key: MobileMenuItem.trades,
  },
  {
    key: MobileMenuItem.lastProofProducer,
  },
];
