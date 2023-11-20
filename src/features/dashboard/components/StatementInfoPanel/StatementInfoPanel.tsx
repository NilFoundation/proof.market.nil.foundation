/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { dequal as deepEqual } from 'dequal';
import { useStyletron } from 'styletron-react';
import { P, match } from 'ts-pattern';
import { Spinner } from '@nilfoundation/ui-kit';
import { selectCurrentStatement, useAppSelector } from '@/redux';
import { renderDashOnEmptyValue } from '@/utils';
import { siteMoneyTickerAbbreviation } from '@/constants';
import type { Statement } from '@/models';
import { StatementDetailedInfo } from './StatementDetailedInfo';
import { styles as s } from './styles';

/**
 * Panel with statement info.
 *
 * @returns React component.
 */
const StatementInfoPanel = (): ReactElement => {
  const currentStatement = useAppSelector(selectCurrentStatement);
  const isLoading = useAppSelector(s => s.statementsState.isLoading);
  const [css] = useStyletron();

  return (
    <div className={css(s.container)}>
      <StatementInfoViewFactory
        statement={currentStatement}
        isLoading={isLoading}
      />
    </div>
  );
};

const StatementContent = ({ name, description, url, _key }: Statement): ReactElement => {
  const displayName = name ? `${name.toUpperCase()} / ${siteMoneyTickerAbbreviation}` : '';
  const stats = useAppSelector(
    s => s.statementsState.statementsStats.find(x => x._key === _key),
    deepEqual,
  );
  const [css] = useStyletron();

  return (
    <>
      <div>{displayName}</div>
      <div className={css(s.infoContainer)}>
        <div>
          <div className={css(s.title)}>Average cost</div>
          <div>{renderDashOnEmptyValue(stats?.avg_cost)}</div>
        </div>
        <div>
          <div className={css(s.title)}>Average generation time</div>
          <div>{renderDashOnEmptyValue(stats?.avg_eval_time)}</div>
        </div>
        <div>
          <div className={css(s.title)}>Completed</div>
          <div>{renderDashOnEmptyValue(stats?.completed, 0)}</div>
        </div>
      </div>
      <StatementDetailedInfo
        description={description}
        url={url}
      />
    </>
  );
};

const StatementInfoViewFactory = ({
  statement,
  isLoading,
}: {
  statement?: Statement;
  isLoading: boolean;
}): ReactElement => {
  return match([isLoading, statement])
    .with([true, undefined], () => <Spinner animation />)
    .with([false, undefined], () => <div>Statement not found</div>)
    .with([P.any, P.not(undefined)], ([, statement]) => <StatementContent {...statement} />)
    .otherwise(() => <></>);
};

export default StatementInfoPanel;
