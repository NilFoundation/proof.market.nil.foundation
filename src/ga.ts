/**
 * @file Google analytics setup.
 * @copyright Yury Korotovskikh 2023 <u.korotovskiy@nil.foundation>
 */

import ReactGa from 'react-ga4';
import { getRuntimeConfigOrThrow } from './utils';

/**
 * Ga initialize options.
 */
const gaInitOptions = {
    testMode: process.env.NODE_ENV !== 'production',
};

/**
 * Configures ga for the app. Should be called before any other tracking functions will record any data.
 */
export default function configureGA(): void {
    const measurementId = getRuntimeConfigOrThrow().GA_TRACKING_ID;

    if (!measurementId) {
        return;
    }

    ReactGa.initialize(measurementId, gaInitOptions);
}
