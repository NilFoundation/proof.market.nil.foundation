/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { ChartType } from '@/enums';
import { selectCurrentCircuit, useAppSelector } from '@/redux';
import { DashboardCard, FullScreenView } from '../../common';
import { ChartTypeSelect } from './ChartTypeSelect';
import { DataRangeSelect } from './DataRangeSelect';
import { ProofCostChart, ProofTimeGenChart } from '../CircuitCharts';
import { ChartSettingsProvider } from './ChartSettingsProvider';
import { DashboardToolbar } from './DashboardToolbar';
import { CircuitInfoPanel } from '../CircuitInfoPanel';
import './CircuitDashboard.scss';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const currentCircuit = useAppSelector(selectCurrentCircuit);
    const [chartType, setChartType] = useState(ChartType.proofCostChart);
    const [fullScreen, setFullScreen] = useState(false);

    return (
        <DashboardCard>
            <div className="circuitDashboard">
                <ChartSettingsProvider>
                    <ChartTypeSelect
                        chartType={chartType}
                        onSelectChartType={setChartType}
                        disabled={!currentCircuit}
                    />
                    <FullScreenView
                        showFullScreen={fullScreen}
                        className="fullScreenChartContainer"
                    >
                        {fullScreen && <CircuitInfoPanel />}
                        <div className="circuitDashboard__toolbar">
                            <DataRangeSelect disabled={!currentCircuit} />
                            <DashboardToolbar
                                disabled={!currentCircuit}
                                isFullscreen={fullScreen}
                                setFullScreen={setFullScreen}
                            />
                        </div>
                        <ChartFactory chartType={chartType} />
                    </FullScreenView>
                </ChartSettingsProvider>
            </div>
        </DashboardCard>
    );
};

/**
 * Renders chart depending on its type.
 *
 * @param {{chartType: ChartType}} props Props.
 * @returns Chart.
 */
const ChartFactory = ({ chartType }: { chartType: ChartType }) => {
    switch (chartType) {
        case ChartType.proofCostChart:
            return <ProofCostChart />;
        case ChartType.proofGetTimeChart:
            return <ProofTimeGenChart />;
        default:
            return <></>;
    }
};
