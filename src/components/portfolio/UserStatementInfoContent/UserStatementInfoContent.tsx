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
  selectSelectedUserStatementInfo,
  UpdateSelectedUserStatementsInfoKey,
  useAppSelector,
} from '@/redux';
import { ObjectAsPlainTextViewer } from '@/components';
import type { UserStatementInfo } from '@/models';
import { mapToHumanReadableUserStatementInfo } from '@/models';
import { Path } from '@/features/routing';
import { useSyncUrlAndSelectedItem } from '@/hooks';
import { RouterParam } from '@/enums';
import { PortfolioInfoList } from '../PortfolioInfoList';
import { PortfolioContent } from '../PortfolioContent';

/**
 * Displays user statement info content.
 *
 * @returns React component.
 */
const UserStatementInfoContent = (): ReactElement => {
  const statementsInfo = useAppSelector(s => s.userStatementInfoState.userStatementInfo, deepEqual);
  const selectedStatementInfo = useAppSelector(selectSelectedUserStatementInfo, deepEqual);
  const isLoading = useAppSelector(s => s.userStatementInfoState.isLoading);
  const isError = useAppSelector(s => s.userStatementInfoState.isError);

  useSyncUrlAndSelectedItem<UserStatementInfo>({
    actionToUpdateSelectedItem: UpdateSelectedUserStatementsInfoKey,
    urlParamToSync: RouterParam.portfolioUserStatementsInfoName,
    itemSelector: selectSelectedUserStatementInfo,
    allItemsSelector: s => s.userStatementInfoState.userStatementInfo,
  });

  return (
    <PortfolioContent
      list={
        <PortfolioInfoList
          title="Statements list"
          items={statementsInfo}
          isLoadingItems={isLoading}
          isError={isError}
          itemsLinksSubPath={Path.statements}
        />
      }
      content={
        <>
          <div className="portfolioHeader">
            <h4>Statement info</h4>
            <span className="text-muted">Aggregated information about your statement</span>
          </div>
          <StatementInfoViewFactory
            info={selectedStatementInfo}
            isLoadingInfo={isLoading}
            isError={isError}
          />
        </>
      }
    />
  );
};

export default UserStatementInfoContent;

const StatementInfoViewFactory = ({
  info,
  isLoadingInfo,
  isError,
}: {
  info?: UserStatementInfo;
  isLoadingInfo: boolean;
  isError: boolean;
}) => {
  const dataToDisplay = useMemo(
    () => (info ? mapToHumanReadableUserStatementInfo(info) : undefined),
    [info],
  );

  return match([isLoadingInfo, isError, dataToDisplay])
    .with([true, false, undefined], () => <Spinner grow />)
    .with([P._, true, undefined], () => <h5>Error while getting data.</h5>)
    .with([false, false, P._], () => <ObjectAsPlainTextViewer data={dataToDisplay!} />)
    .otherwise(() => <h5>No statement info was found.</h5>);
};
