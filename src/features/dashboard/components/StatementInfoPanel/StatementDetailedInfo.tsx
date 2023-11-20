/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';

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
  return (
    <div>
      <div>
        <span className="text-muted">Description:</span>
        {description ? description : 'No description'}
      </div>
      {url && (
        <div>
          <span className="text-muted">Url:</span>
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
