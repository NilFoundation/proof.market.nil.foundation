/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type {
  CandlestickSeriesPartialOptions,
  DeepPartial,
  PriceScaleOptions,
} from 'lightweight-charts';

/**
 * Series default options.
 */
export const seriesDefaultOptions: CandlestickSeriesPartialOptions = {
  priceFormat: {
    type: 'price',
    precision: 4,
    minMove: 0.0001,
  },
};

/**
 * Volume series options.
 */
export const volumeSeriesOptions: CandlestickSeriesPartialOptions = {
  ...seriesDefaultOptions,
  priceScaleId: 'right',
};

/**
 * Volume series price scale options.
 */
export const volumeSPriceScaleOPtions: DeepPartial<PriceScaleOptions> = {
  scaleMargins: {
    top: 0.5,
    bottom: 0,
  },
};
