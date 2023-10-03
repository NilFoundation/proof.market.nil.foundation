/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { dequal as deepEqual } from 'dequal';
import { Spinner } from '@nilfoundation/react-components';
import { P, match } from 'ts-pattern';
import {
  selectCurrentStatementName,
  selectSelectedPortfolioProposalsInfo,
  UpdateSelectedPortfolioProposalsInfoKey,
  useAppSelector,
} from '@/redux';
import { ObjectAsPlainTextViewer } from '@/components';
import type { PortfolioProposalsInfo } from '@/models';
import { mapToHumanReadablePortfolioProposalsInfo } from '@/models';
import { Path } from '@/features/routing';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { PortfolioInfoList } from '../PortfolioInfoList';
import { PortfolioContent } from '../PortfolioContent';

/**
 * Proposal content.
 *
 * @returns React component.
 */
const PortfolioProposalsInfoContent = (): ReactElement => {
  const portfolioProposalsInfo = useAppSelector(s => s.portfolioProposalsInfo.info, deepEqual);
  const selectedProposalsInfo = useAppSelector(selectSelectedPortfolioProposalsInfo);
  const isLoadingInfo = useAppSelector(s => s.portfolioProposalsInfo.isLoading);
  const isError = useAppSelector(s => s.portfolioProposalsInfo.isError);

  const selectedStatementName = useAppSelector(selectCurrentStatementName);

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
          title="Statements list"
          items={portfolioProposalsInfo}
          isLoadingItems={false}
          isError={false}
          itemsLinksSubPath={Path.proposals}
        />
      }
      content={
        <>
          <div className="portfolioHeader">
            <h4>Proposal info</h4>
            <span className="text-muted">
              {`Aggregated information about your proposals in ${selectedStatementName} statement`}
            </span>
          </div>
          <ProposalContentViewFactory
            info={selectedProposalsInfo}
            isLoadingInfo={isLoadingInfo}
            isError={isError}
          />
        </>
      }
    />
  );
};

export default PortfolioProposalsInfoContent;

const ProposalContentViewFactory = ({
  info,
  isLoadingInfo,
  isError,
}: {
  info?: PortfolioProposalsInfo;
  isLoadingInfo: boolean;
  isError: boolean;
}) => {
  const humanReadbleInfo = useMemo(
    () => (info ? mapToHumanReadablePortfolioProposalsInfo(info) : undefined),
    [info],
  );

  return match([isLoadingInfo, isError, humanReadbleInfo])
    .with([true, false, undefined], () => <Spinner grow />)
    .with([P._, true, undefined], () => <h5>Error while getting data.</h5>)
    .with([P._, false, P.not(undefined)], ([_, , info]) => <ObjectAsPlainTextViewer data={info} />)
    .otherwise(() => <h5>No proposal info was found.</h5>);
};
