/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

/**
 * Props.
 */
type TCellProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Table cell.
 *
 * @param {TCellProps} props Props.
 * @returns React component.
 */
export const TCell = ({ children, ...rest }: TCellProps): ReactElement => {
    return (
        <div
            role="cell"
            {...rest}
        >
            {children}
        </div>
    );
};
