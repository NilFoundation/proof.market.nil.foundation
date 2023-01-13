/**
 * @file Env variables checker.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

const requiredEnv = [
    process.env.REACT_APP_BASE_API_URL,
    process.env.REACT_APP_DBMS_DEFAULT_DATABASE,
    process.env.REACT_APP_READONLY_USER,
    process.env.REACT_APP_FORMSPREE_FORM_ID,
    process.env.REACT_APP_SITE_DEFAULT_TITLE,
    process.env.REACT_APP_PROOFMARKET_TOOLCHAIN_REPO,
];

/**
 * Checks env variables definition.
 *
 * @throws An error if any required env is not defined.
 * @returns .
 */
export const checkEnvVariablesAreDefined = (): void =>
    requiredEnv.forEach(x => {
        if (!x) {
            throw new Error(
                'All required environment variables should be defined before running this app',
            );
        }
    });
