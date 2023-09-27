/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import type { IChartApi, DeepPartial, ChartOptions } from 'lightweight-charts';
import colors from '@/styles/export.module.scss';

/**
 * Return type.
 */
type UseChartsReturnType = {
  /**
   * Chart instance.
   */
  chart?: IChartApi;
};

/**
 * Use chart params.
 */
type UseChartParams<T extends HTMLElement> = {
  ref: RefObject<T>;
  options?: DeepPartial<ChartOptions>; // Don't forget to memoize options object.
};

/**
 * Hook to create and manage charts.
 *
 * @param {UseChartParams} params Parameters.
 * @returns Chart.
 */
export const useChart = <T extends HTMLElement>({
  ref,
  options,
}: UseChartParams<T>): UseChartsReturnType => {
  const [chart, setChart] = useState<IChartApi>();

  useEffect(() => {
    const { current: htmlElement } = ref;
    if (!htmlElement) {
      return;
    }

    const chart = createChart(htmlElement, {
      width: htmlElement.clientWidth,
      height: htmlElement.clientHeight,
      ...chartDefaultOptions,
    });
    chart.timeScale().fitContent();
    setChart(chart);

    const handleResize = () => {
      chart.applyOptions({ width: htmlElement.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  useEffect(() => {
    chart && options && chart.applyOptions(options);
  }, [options, chart]);

  useEffect(() => {
    return () => {
      chart && chart.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { chart };
};

/**
 * Default charts theme.
 */
const chartDefaultTheme = {
  background: colors.baseDarkerColor,
  fontFamily: 'inherit',
  layoutTextColor: colors.secondaryDarkerColor,
  gridLineColor: colors.baseLightColor,
};

/**
 * Chart constant options.
 */
const chartDefaultOptions = {
  layout: {
    background: { type: ColorType.Solid, color: chartDefaultTheme.background },
    fontFamily: chartDefaultTheme.fontFamily,
    textColor: chartDefaultTheme.layoutTextColor,
  },
  grid: {
    vertLines: { color: chartDefaultTheme.gridLineColor },
    horzLines: { color: chartDefaultTheme.gridLineColor },
  },
};
