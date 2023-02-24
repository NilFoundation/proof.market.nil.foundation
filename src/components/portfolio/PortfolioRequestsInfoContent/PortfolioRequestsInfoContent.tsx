/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo, memo } from 'react';
import { dequal as deepEqual } from 'dequal';
import { Spinner } from '@nilfoundation/react-components';
import {
    selectCurrentCircuit,
    selectSelectedPortfolioRequestsInfo,
    UpdateSelectedPortfolioRequestsInfoKey,
    useAppSelector,
} from 'src/redux';
import { ObjectAsPlainTextViewer } from 'src/components';
import type { PortfolioProposalsInfo } from 'src/models';
import { mapToHumanReadablePortfolioProposalsInfo } from 'src/models';
import { Path } from 'src/routing';
import { useSyncUrlAndSelectedItem } from 'src/hooks';
import { RouterParam } from 'src/enums';
import { PortfolioInfoList } from '../PortfolioInfoList';
import { PortfolioContent } from '../PortfolioContent';

/**
 * Requests content.
 *
 * @returns React component.
 */
const PortfolioRequestsInfoContent = (): ReactElement => {
    const portfolioProposalsInfo = useAppSelector(s => s.portfolioRequestsInfo.info, deepEqual);
    const selectedProofProducerInfo = useAppSelector(selectSelectedPortfolioRequestsInfo);
    const isLoadingInfo = useAppSelector(s => s.portfolioRequestsInfo.isLoading);
    const isError = useAppSelector(s => s.portfolioRequestsInfo.isError);

    const selectedStatement = useAppSelector(
        selectCurrentCircuit,
        (prev, next) => prev?.name === next?.name,
    );

    useSyncUrlAndSelectedItem({
        urlParamToSync: RouterParam.portfolioRequestsInfoStatementName,
        actionToUpdateSelectedItem: UpdateSelectedPortfolioRequestsInfoKey,
        itemSelector: selectSelectedPortfolioRequestsInfo,
        allItemsSelector: s => s.portfolioRequestsInfo.info,
    });

    return (
        <PortfolioContent
            list={
                <PortfolioInfoList
                    items={portfolioProposalsInfo}
                    isLoadingItems={false}
                    isError={false}
                    itemsLinksSubPath={Path.proposals}
                />
            }
            title={
                <>
                    <h4>Request info</h4>
                    <span className="text-muted">
                        {`Aggregated information about your requests in ${selectedStatement?.name} statement`}
                    </span>
                </>
            }
            content={
                <ProposalContentViewFactory
                    info={selectedProofProducerInfo}
                    isLoadingInfo={isLoadingInfo}
                    isError={isError}
                />
            }
        />
    );
};

export default PortfolioRequestsInfoContent;

/**
 * Conditionally renders data.
 */
const ProposalContentViewFactory = memo(function StatementInfoViewFactory({
    info,
    isLoadingInfo,
    isError,
}: {
    info?: PortfolioProposalsInfo;
    isLoadingInfo: boolean;
    isError: boolean;
}) {
    const humanReadbleInfo = useMemo(
        () => (info ? mapToHumanReadablePortfolioProposalsInfo(info) : undefined),
        [info],
    );

    switch (true) {
        case isLoadingInfo && info === undefined:
            return <Spinner grow />;
        case isError:
            return <h5>Error while getting data.</h5>;
        case info !== undefined:
            return <ObjectAsPlainTextViewer data={humanReadbleInfo!} />;
        case info === undefined:
            return <h5>No proof producer info was found.</h5>;
        default:
            return <></>;
    }
});
