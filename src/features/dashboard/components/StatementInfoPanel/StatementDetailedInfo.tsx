/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useStyletron } from 'styletron-react';
import { globalStyles } from '@/styles/globalStyles';

type StatementDetailedInfoProps = {
  description?: string;
  url?: string;
};

/**
 * Statement detailed info component.
 *
 * @param {StatementDetailedInfoProps} props Props.
 * @returns React component.
 */
export const StatementDetailedInfo = ({
  description,
  url,
}: StatementDetailedInfoProps): ReactElement => {
  const [css] = useStyletron();

  return (
    <div>
      <div>
        <span className={css(globalStyles.textMuted)}>Description:</span>
        {description ? ` ${description}` : 'No description'}
      </div>
      {url && (
        <div>
          <span className={css(globalStyles.textMuted)}>Url:</span>{' '}
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
          >
            {url}
          </a>
        </div>
      )}
    </div>
  );
};
