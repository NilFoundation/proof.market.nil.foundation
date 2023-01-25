/**
 * @file Api helpers.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

/**
 * Api base url.
 */
export const apiBaseUrl = `_db/${db}/${apiVersion}`;
