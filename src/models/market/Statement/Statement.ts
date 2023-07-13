/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Statement.
 */
export type Statement = {
    /**
     * Id.
     */
    _key: string;
    /**
     * Name.
     */
    name: string;
    /**
     * Created dateTime.
     */
    createdOn?: number;
    /**
     * Updated dateTime.
     */
    updatedOn?: number;
    /**
     * Description.
     */
    description?: string;
    /**
     * Sender.
     */
    sender?: string;
    /**
     * Childs.
     */
    childs: Array<Statement>;
    /**
     * If equals true, statement should be hidden.
     */
    isPrivate?: boolean;
    /**
     * Repository url.
     */
    url?: string;
    /**
     * Statement tag.
     */
    tag?: string;
};
