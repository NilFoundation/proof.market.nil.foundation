/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

/**
 * Props.
 */
type TBodyProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Table body.
 *
 * @param {TBodyProps} props Props.
 * @returns React component.
 */
export const TBody = ({ children, className, ...rest }: TBodyProps): ReactElement => {
    return (
        <div
            role="rowgroup"
            className={`tableBody ${className ?? ''}`}
            {...rest}
        >
            {children}
        </div>
    );
};
