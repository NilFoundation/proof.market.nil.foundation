/**
 * @file Index.
 * @copyright Yury Korotovskikh 2023 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect } from 'react';
import ReactGa from 'react-ga4';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics location change tracker.
 *
 * @returns React component.
 */
export const GALocationTracker = (): ReactElement => {
    const { pathname } = useLocation();
    const mainPath = pathname.split('/').slice(0, 2).join('');

    useEffect(() => {
        ReactGa.send({ hitType: 'pageview', page: mainPath });
    }, [mainPath]);

    return <></>;
};
