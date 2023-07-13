/**
 * @file Hooks helpers.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootStateType } from '../RootStateType';

/**
 * Typed use selector.
 */
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
