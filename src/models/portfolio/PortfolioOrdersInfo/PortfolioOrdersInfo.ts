/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * User statement info.
 */
export type PortfolioOrdersInfo = {
    /**
     * Unique key.
     */
    _key: string;
    /**
     * Statement name.
     */
    name: string;
    /**
     * Overall orders amount.
     */
    amount: string;
    /**
     * Overall orders costs amount.
     */
    fees: string | null;
    /**
     * Average orders generation time.
     */
    avg_generation_time: number | null;
    /**
     * Average orders cost.
     */
    avg_cost: number | null;
};
