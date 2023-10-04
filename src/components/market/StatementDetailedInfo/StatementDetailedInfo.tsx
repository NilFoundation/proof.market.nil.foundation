/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@nilfoundation/react-components';
import { P, match } from 'ts-pattern';
import { selectCurrentStatement, useAppSelector } from '@/redux';
import type { Statement } from '@/models';
import styles from './StatementDetailedInfo.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
const StatementDetailedInfoComponent = (): ReactElement => {
  const currentSelectedStatement = useSelector(selectCurrentStatement);
  const loadingStatements = useAppSelector(s => s.statementsState.isLoading);

  return (
    <div className={styles.container}>
      <StatementInfoViewFactory
        loading={loadingStatements}
        data={currentSelectedStatement}
      />
    </div>
  );
};

export const StatementDetailedInfo = memo(StatementDetailedInfoComponent);

const StatementInfoViewFactory = ({
  loading,
  data,
}: {
  loading: boolean;
  data?: Statement;
}): ReactElement => {
  return match([loading, data])
    .with([true, undefined], () => <Spinner grow />)
    .with([false, undefined], () => <h4>No statement info was provided.</h4>)
    .with([P.any, P.not(undefined)], ([, data]) => (
      <>
        <div className={styles.text}>
          <span className="text-muted">Description:</span>
          {data!.description}
        </div>
        {data?.url && (
          <div className={styles.text}>
            <span className="text-muted">Url:</span>
            <a
              href={data.url}
              rel="noreferrer"
              target="_blank"
            >
              {data.url}
            </a>
          </div>
        )}
      </>
    ))
    .otherwise(() => <></>);
};
