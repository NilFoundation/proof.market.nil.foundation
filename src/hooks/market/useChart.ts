/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RefObject, useEffect, useMemo, useState } from 'react';
import { createChart, ColorType, IChartApi, UTCTimestamp } from 'lightweight-charts';
import colors from 'src/styles/export.module.scss';
import { formatUTCTimestamp } from 'src/utils';

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
 * Default charts theme.
 */
const chartsTheme = {
    background: colors.baseDarkerColor,
    fontFamily: 'Roboto',
    layoutTextColor: colors.secondaryDarkerColor,
    gridLineColor: colors.baseLightColor,
};

/**
 * Hook to create charts.
 *
 * @param ref - Ref.
 * @param theme - Theme.
 * @returns Chart.
 */
export const useChart = <T extends HTMLElement>(
    ref: RefObject<T>,
    theme?: Partial<typeof chartsTheme>,
): UseChartsReturnType => {
    const [chart, setChart] = useState<IChartApi>();
    const mergedTheme = useMemo(() => {
        return theme ? { ...chartsTheme, ...theme } : chartsTheme;
    }, [theme]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const chart = createChart(ref.current, {
            layout: {
                background: { type: ColorType.Solid, color: mergedTheme.background },
                fontFamily: mergedTheme.fontFamily,
                textColor: mergedTheme.layoutTextColor,
            },
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            grid: {
                vertLines: { color: mergedTheme.gridLineColor },
                horzLines: { color: mergedTheme.gridLineColor },
            },
            localization: {
                timeFormatter: (t: UTCTimestamp) => formatUTCTimestamp(t, "DD MM 'YY hh:mm"),
            },
            timeScale: {
                tickMarkFormatter: (t: UTCTimestamp) => formatUTCTimestamp(t, 'DD.MM hh:mm'),
            },
        });
        chart.timeScale().fitContent();
        setChart(chart);

        const handleResize = () => {
            ref.current && chart.applyOptions({ width: ref.current.clientWidth });
            chart.timeScale().fitContent();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref, mergedTheme]);

    useEffect(() => {
        return () => {
            chart && chart.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { chart };
};