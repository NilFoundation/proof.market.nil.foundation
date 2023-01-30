/**
 * @file Check if all required env variables are set.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

const dotenv = require('dotenv');

const requiredEnvs = [
    'REACT_APP_BASE_API_URL',
    'REACT_APP_DBMS_DEFAULT_DATABASE',
    'REACT_APP_READONLY_USER',
    'REACT_APP_SITE_DEFAULT_TITLE',
    'REACT_APP_PROOFMARKET_TOOLCHAIN_REPO',
    'REACT_APP_API_VERSION'
];

const {parsed} = dotenv.config({ path: '.env.local' });

requiredEnvs.forEach(x => {
    if (!parsed[x]) {
        throw new Error('Some required variables are not set.');
    }
});

console.log('Required env variables are set.');
