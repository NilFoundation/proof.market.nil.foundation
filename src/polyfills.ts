/**
 * @file Polyfills entrypoint.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Injects core-js polyfills into bundle to provide old browsers support.
 *
 * @see {@link https://stackoverflow.com/questions/73194573/why-does-babel-in-create-react-app-not-polyfill-array-prototype-at-properly}.
 */
// eslint-disable-next-line
export const r = require('core-js/stable');
