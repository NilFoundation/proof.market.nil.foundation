/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Google user info.
 */
export type GoogleUserinfo = {
    email: string;
    family_name: string;
    given_name: string;
    hd: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    verified_email: boolean;
};
