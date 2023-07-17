/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Get error message from dbms response.
 *
 * @param e Error.
 * @returns Error message or undefined.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getApiErrorMessage = async (e: any) => {
    try {
        const response = e.response;

        if (!response) {
            return undefined;
        }

        const errJson = await e.response.json();
        const errorMessage = errJson?.errorMessage;

        return typeof errorMessage === 'string' ? errorMessage : undefined;
    } catch {
        return undefined;
    }
};
