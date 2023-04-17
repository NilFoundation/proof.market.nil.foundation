/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Statement statistics.
 */
export type StatementStats = {
    /**
     * Statement key.
     */
    _key: string;
    /**
     * Average proof cost.
     */
    avg_cost: number | null;
    /**
     * Average proof generation time.
     */
    avg_eval_time: number | null;
    /**
     * Count of completed tasks.
     */
    completed: number | null;
};
