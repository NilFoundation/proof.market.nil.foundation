/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { Ask } from '@/models';

/**
 * Data to build charts.
 */
export const UpdateChartsData = createAction<Ask[]>('@charts/UPDATE_COMPLETED_ORDERS');

/**
 * Update loading data state.
 */
export const UpdateIsLoadingChartsData = createAction<boolean>('@charts/UPDATE_IS_LOADING');

/**
 * Update getting data error.
 */
export const UpdateIsErrorGettingChartsData = createAction<boolean>('@charts/UPDATE_ERROR');
