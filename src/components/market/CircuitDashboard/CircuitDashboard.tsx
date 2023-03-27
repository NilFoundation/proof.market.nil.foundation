/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { ChartType, DateUnit } from '@/enums';
import { selectCurrentCircuit, useAppSelector } from '@/redux';
import { useLocalStorage, useWindowHeight } from '@/hooks';
import type { ChartBaseProps } from '../../common';
import { DashboardCard, FullScreenView, ProofCostChart, ProofTimeGenChart } from '../../common';
import { ChartTypeSelect } from './ChartTypeSelect';
import { DataRangeSelect } from './DataRangeSelect';
import { DashboardToolbar } from './DashboardToolbar';
import { CircuitInfoPanel } from '../CircuitInfoPanel';
import { CopyToClipboardNavItem } from './CopyToClipboardNavItem';
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
    const windowHeight = useWindowHeight();

    const [dataRange, setDataRange] = useLocalStorage<DateUnit>(
        'circuitDashboardDataRange',
        DateUnit.hour,
    );

    const [displayVolumes, setDisplayVolumes] = useLocalStorage(
        'circuitDashboardDisplayVolumes',
        false,
    );

    return (
        <DashboardCard>
            <div className="circuitDashboard">
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
                        <DataRangeSelect
                            disabled={!currentCircuit}
                            dataRange={dataRange}
                            setDataRange={setDataRange}
                        />
                        <DashboardToolbar
                            disabled={!currentCircuit}
                            isFullscreen={fullScreen}
                            setFullScreen={setFullScreen}
                            displayVolumes={displayVolumes}
                            setDisplayVolumes={setDisplayVolumes}
                        >
                            <CopyToClipboardNavItem
                                disabled={!currentCircuit}
                                chartType={chartType}
                                chartDataRange={dataRange}
                                displayVolumes={displayVolumes}
                            />
                        </DashboardToolbar>
                    </div>
                    <ChartFactory
                        chartType={chartType}
                        dataRange={dataRange}
                        displayVolumes={displayVolumes}
                        height={fullScreen ? windowHeight - 235 : 406}
                    />
                </FullScreenView>
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
const ChartFactory = ({ chartType, ...rest }: { chartType: ChartType } & ChartBaseProps) => {
    switch (chartType) {
        case ChartType.proofCostChart:
            return <ProofCostChart {...rest} />;
        case ChartType.proofGetTimeChart:
            return <ProofTimeGenChart {...rest} />;
        default:
            return <></>;
    }
};
