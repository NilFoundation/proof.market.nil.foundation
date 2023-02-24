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
    selectSelectedPortfolioProposalsInfo,
    UpdateSelectedPortfolioProposalsInfoKey,
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
 * Proposal content.
 *
 * @returns React component.
 */
const PortfolioProposalsInfoContent = (): ReactElement => {
    const portfolioProposalsInfo = useAppSelector(s => s.portfolioProposalsInfo.info, deepEqual);
    const selectedProofProducerInfo = useAppSelector(selectSelectedPortfolioProposalsInfo);
    const isLoadingInfo = useAppSelector(s => s.portfolioProposalsInfo.isLoading);
    const isError = useAppSelector(s => s.portfolioProposalsInfo.isError);

    const selectedStatement = useAppSelector(
        selectCurrentCircuit,
        (prev, next) => prev?.name === next?.name,
    );

    useSyncUrlAndSelectedItem({
        urlParamToSync: RouterParam.portfolioProposalsInfoStatementName,
        actionToUpdateSelectedItem: UpdateSelectedPortfolioProposalsInfoKey,
        itemSelector: selectSelectedPortfolioProposalsInfo,
        allItemsSelector: s => s.portfolioProposalsInfo.info,
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
                    <h4>Proposal info</h4>
                    <span className="text-muted">
                        {`Aggregated information about your proposals in ${selectedStatement?.name} statement`}
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

export default PortfolioProposalsInfoContent;

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
