/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Icon, Nav, notificationActions, Variant } from '@nilfoundation/react-components';
import loadable from '@loadable/component';
import { useParams } from 'react-router-dom';
import type { DateUnit, ChartType } from '@/enums';
import { RouterSearchParam, RouterParam } from '@/enums';
import { Path } from '@/routing';

const CopyToClipboard = loadable.lib(() => import('react-copy-to-clipboard'));

/**
 * Props.
 */
type CopyToClipboardNavItemProps = {
    disabled: boolean;
    chartType: ChartType;
    chartDataRange: DateUnit;
    displayVolumes: boolean;
};

/**
 * Copy to clipboard nav item.
 *
 * @param {CopyToClipboardNavItemProps} props Props.
 * @returns React component.
 */
export const CopyToClipboardNavItem = ({
    disabled,
    chartType,
    chartDataRange,
    displayVolumes,
}: CopyToClipboardNavItemProps): ReactElement => {
    const statementName = useParams()[RouterParam.statementName];

    const shareChartText = useMemo(() => {
        let baseUrl = `${window.location.protocol}//${window.location.hostname}`;

        if (import.meta.env.DEV) {
            baseUrl += `:${window.location.port}`;
        }

        const path = `${Path.charts}/#/${statementName}/${chartType}`;

        let urlSearchParams = `?${RouterSearchParam.chartDataRange}=${chartDataRange}`;

        if (displayVolumes) {
            urlSearchParams += `&${RouterSearchParam.chartDisplayVolumes}=true`;
        }

        const src = baseUrl + path + urlSearchParams;

        return `<iframe src="${src}" title="${chartType}"></iframe>`;
    }, [chartType, statementName, chartDataRange, displayVolumes]);

    return (
        <CopyToClipboard fallback={<></>}>
            {({ default: Lib }) => {
                return (
                    <Lib.CopyToClipboard
                        text={shareChartText}
                        onCopy={() =>
                            notificationActions?.create({
                                title: 'Copied to clipboard',
                                variant: Variant.success,
                                lifeTime: 1080,
                            })
                        }
                    >
                        <Nav.Item disabled={disabled}>
                            <Icon
                                iconName="fa-solid fa-code"
                                srOnlyText="Copy share chart html"
                                title="Share"
                            />
                        </Nav.Item>
                    </Lib.CopyToClipboard>
                );
            }}
        </CopyToClipboard>
    );
};
