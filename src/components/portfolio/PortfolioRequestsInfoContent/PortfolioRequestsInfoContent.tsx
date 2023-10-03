/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { dequal as deepEqual } from 'dequal';
import { Spinner } from '@nilfoundation/react-components';
import { match, P } from 'ts-pattern';
import {
  selectSelectedPortfolioRequestsInfo,
  UpdateSelectedPortfolioRequestsInfoKey,
  useAppSelector,
} from '@/redux';
import type { PortfolioRequestsInfo } from '@/models';
import { Path } from '@/features/routing';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { PortfolioInfoList } from '../PortfolioInfoList';
import { PortfolioContent } from '../PortfolioContent';
import { RequestsInfoCard } from './RequestsInfoCard';

/**
 * Requests content.
 *
 * @returns React component.
 */
const PortfolioRequestsInfoContent = (): ReactElement => {
  const portfolioRequestsInfo = useAppSelector(s => s.portfolioRequestsInfo.info, deepEqual);
  const selectedRequestsInfo = useAppSelector(selectSelectedPortfolioRequestsInfo);
  const isLoadingInfo = useAppSelector(s => s.portfolioRequestsInfo.isLoading);
  const isError = useAppSelector(s => s.portfolioRequestsInfo.isError);

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
          title="Statements list"
          items={portfolioRequestsInfo}
          isLoadingItems={false}
          isError={false}
          itemsLinksSubPath={Path.requests}
        />
      }
      content={
        <ViewFactory
          info={selectedRequestsInfo}
          isLoadingInfo={isLoadingInfo}
          isError={isError}
        />
      }
    />
  );
};

export default PortfolioRequestsInfoContent;

const ViewFactory = ({
  info,
  isLoadingInfo,
  isError,
}: {
  info?: PortfolioRequestsInfo;
  isLoadingInfo: boolean;
  isError: boolean;
}) => {
  return match([isLoadingInfo, isError, info])
    .with([true, false, undefined], () => <Spinner grow />)
    .with([P._, true, undefined], () => <h5>Error while getting data.</h5>)
    .with([P._, false, P.not(undefined)], ([_, , info]) => <RequestsInfoCard info={info} />)
    .with([false, false, undefined], () => <h5>No proof producer info was found.</h5>)
    .otherwise(() => <></>);
};
