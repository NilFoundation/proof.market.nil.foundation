/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import sum from 'lodash/sum';
import type {
    CandlestickData,
    HistogramData,
    LineData,
    UTCTimestamp,
    WhitespaceData,
} from 'lightweight-charts';
import { useAppSelector, selectChartData } from '@/redux';
import { getUTCTimestamp } from '@/utils';
import { DateUnit } from '@/enums';
import colors from '@/styles/export.module.scss';
import type { Ask, Bid } from '@/models';

/**
 * Hook return type.
 */
type UseGetCircuitDashboardDataReturnType = {
    chartData: {
        candlestickChartData: CandlestickData[];
        proofGenTimeData: LineData[];
        volumesData?: Array<WhitespaceData | HistogramData>;
    };
    loadingData: boolean;
};

/**
 * Get data to draw circuit chart.
 *
 * @param [withVolumes] Should calculate volumes data.
 * @param [dataRange] Data range.
 * @returns Data to draw circuit chart.
 */
export const useGetCircuitDashboardData = (
    withVolumes = false,
    dataRange = DateUnit.day,
): UseGetCircuitDashboardDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading || s.chartsState.isLoading);
    const asks = useSelector(selectChartData, deepEqual);
    const grouppedOrders = useMemo(() => {
        return reduceOrdersByDate(asks, dataRange);
    }, [asks, dataRange]);

    const chartData = useMemo(
        () => ({
            candlestickChartData: getCandlestickData(grouppedOrders),
            proofGenTimeData: getProofGenTimeData(grouppedOrders),
            volumesData: withVolumes ? getVolumesData(grouppedOrders) : undefined,
        }),
        [grouppedOrders, withVolumes],
    );

    return { chartData, loadingData };
};

/**
 * Takes orders array and returns dict, where keys are dates, and values are arrays of orders.
 *
 * @param asks Asks.
 * @param dataRange Data range.
 * @returns Orders, grouped by date.
 */
const reduceOrdersByDate = <T extends Bid | Ask>(asks: T[], dataRange: DateUnit) => {
    return asks.reduce((previousValue: Record<string, T[]>, currentValue: T) => {
        const date = getUTCTimestamp(currentValue.updatedOn!, dataRange);

        if (!previousValue[date]) previousValue[date] = [];

        previousValue[date].push(currentValue);

        return previousValue;
    }, {});
};

/**
 * Creates candleStick data {@link CandlestickData} array from orders, groupped by date.
 *
 * @param ordersGrouppedByDate Orders array.
 * @returns Array of candleStick data.
 */
const getCandlestickData = <T extends Bid | Ask>(
    ordersGrouppedByDate: Record<string, T[]>,
): CandlestickData[] => {
    const keys = Object.keys(ordersGrouppedByDate);

    return keys.map((x, index) => {
        const ordersCosts = ordersGrouppedByDate[x].map(x => x.cost);

        const high = Math.max(...ordersCosts);
        const low = Math.min(...ordersCosts);
        const open =
            index === 0 ? ordersCosts[0] : ordersGrouppedByDate[keys[index - 1]].at(-1)!.cost;
        const close = ordersCosts[ordersCosts.length - 1];

        return {
            time: Number(x) as UTCTimestamp,
            high,
            low,
            open,
            close,
        };
    });
};

/**
 * Creates line data {@link LineData} array from orders, groupped by date.
 *
 * @param ordersGrouppedByDate Orders array.
 * @returns Array of line data.
 */
const getProofGenTimeData = <T extends Bid | Ask>(
    ordersGrouppedByDate: Record<string, T[]>,
): LineData[] => {
    return Object.keys(ordersGrouppedByDate).map(x => {
        const ordersEvalTime = ordersGrouppedByDate[x].map(x => x.generation_time);
        const averageEvalTime = sum(ordersEvalTime) / ordersEvalTime.length;

        return { time: Number(x) as UTCTimestamp, value: averageEvalTime };
    });
};

/**
 * Generates volume data.
 *
 * @param ordersGrouppedByDate Orders array.
 * @returns Volume data.
 */
const getVolumesData = <T extends Bid | Ask>(
    ordersGrouppedByDate: Record<string, T[]>,
): Array<WhitespaceData | HistogramData> => {
    const keys = Object.keys(ordersGrouppedByDate);

    return keys.map((x, index) => {
        const costs = ordersGrouppedByDate[x].map(x => x.cost);

        const open = index === 0 ? costs[0] : ordersGrouppedByDate[keys[index - 1]].at(-1)!.cost;
        const close = costs[costs.length - 1];

        return {
            time: Number(x) as UTCTimestamp,
            value: ordersGrouppedByDate[x].length,
            color: open < close ? colors.transparentSuccessColor : colors.transparentDangerColor,
        };
    });
};
