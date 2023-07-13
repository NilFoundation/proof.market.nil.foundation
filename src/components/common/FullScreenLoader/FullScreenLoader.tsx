/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { Spinner } from '@nilfoundation/react-components';

/**
 * @returns React component.
 */
export const FullScreenLoader = () => (
    <div
        style={{
            position: 'fixed',
            zIndex: '2',
            background: 'transparent',
            height: '100vh',
            width: '100vw',
            top: 0,
        }}
    >
        <Spinner grow />
    </div>
);
