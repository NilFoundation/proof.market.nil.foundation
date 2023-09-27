/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createApiClient, getApiUrlByParameters } from '../common';
import type { Proposal, TradeOrder } from '../../models';

const httpFetcher = createApiClient('/proposal');

/**
 * Get proposals by parameters.
 *
 * @param {Partial<TradeOrder>} parameters Parameters.
 * @param limit Response limit.
 * @param startFrom Start from.
 * @returns Proposals.
 */
export const getProposals = (
  parameters: Partial<TradeOrder>,
  limit?: number,
  startFrom?: number,
): Promise<Proposal[]> =>
  httpFetcher.get(getApiUrlByParameters(parameters, limit, startFrom)).json();

/**
 * Remove proposal.
 *
 * @param proposalToRemoveId Proposal to remove id.
 * @returns Proposal.
 */
export const removeProposal = (proposalToRemoveId: Proposal['_key']): Promise<void> =>
  httpFetcher.delete(proposalToRemoveId).json();
