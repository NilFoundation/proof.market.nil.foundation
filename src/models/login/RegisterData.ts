/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Register data.
 */
export type RegisterData = {
    /**
     * User email.
     */
    email: string;
    /**
     * Email subject.
     */
    _subject?: string;
};