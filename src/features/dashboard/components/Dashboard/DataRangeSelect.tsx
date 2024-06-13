/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { DateUnit } from '../../models/DateUnit';

/**
 * Props.
 */
type DataRangeSelectProps = {
  disabled: boolean;
  dataRange: DateUnit;
  setDataRange: (r: DateUnit) => void;
};

/**
 * Data range select.
 *
 * @param {DataRangeSelectProps} props Props.
 * @returns React component.
 */
export const DataRangeSelect = ({
  disabled,
  dataRange,
  setDataRange,
}: DataRangeSelectProps): ReactElement => {
  return (
    <Nav>
      {Object.values(DateUnit).map(x => (
        <Nav.Item
          key={x}
          active={dataRange === x}
          onClick={() => setDataRange(x)}
          disabled={disabled}
        >
          {x}
        </Nav.Item>
      ))}
    </Nav>
  );
};
