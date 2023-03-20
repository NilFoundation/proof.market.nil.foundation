/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { formatDate } from '@/utils';

/**
 * Proof.
 */
export type Proof = {
    /**
     * Proof unique id.
     */
    _key: string;
    /**
     * Key of bid.
     */
    bid_key: string;
    /**
     * Key of ask.
     */
    ask_key: string;
    /**
     * Proof owner.
     */
    sender: string;
    /**
     * Proof created at.
     */
    createdOn: number;
    /**
     * Proof updated at.
     */
    updatedOn: number;
    /**
     * Generation time.
     */
    generation_time: number;
    /**
     * Statement key.
     */
    statement_key: string;
    /**
     * Statement name.
     */
    statement_name: string;
    /**
     * Input.
     */
    input: Record<string, string>;
    /**
     * Statement description.
     */
    statement_description: string;
};

/**
 * @param proof Proof.
 * @returns Human readable proof.
 */
export const mapToHumanReadableProof = (proof: Proof) => ({
    ['Created at']: formatDate(proof.createdOn, 'DD.MM HH:mm:ss'),
    ['Last update at']: formatDate(proof.updatedOn, 'DD.MM HH:mm:ss'),
    ['Generation time']: `${proof.generation_time?.toFixed(2)} min`,
    ['Ask key']: proof.ask_key,
    ['Bid key']: proof.bid_key,
});
