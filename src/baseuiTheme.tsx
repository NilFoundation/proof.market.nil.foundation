/**
 * @file Baseui theme.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createDarkTheme } from 'baseui';
import colors from '@/styles/export.module.scss';

const primitives = {
    black: colors.baseColor,
    primary: colors.secondaryColor,
    white: colors.secondaryColor,
};

export const theme = createDarkTheme(primitives);
