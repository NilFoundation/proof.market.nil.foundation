/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { UserStatementInfo } from '@/models';
import { createApiClient } from '../common';

const httpFetcher = createApiClient('/statement');

/**
 * Get portfolio requests info.
 *
 * @returns Requests info.
 */
export const getPortfolioRequestsInfo = (): Promise<UserStatementInfo[]> =>
  httpFetcher.get('requested').json();

/**
 * Get portfolio proposals info.
 *
 * @returns Proposals info.
 */
export const getPortfolioProposalsInfo = (): Promise<UserStatementInfo[]> =>
  httpFetcher.get('proposed').json();

/**
 * Get current user statements info.
 *
 * @returns .
 */
export const getUserStatementsInfo = (): Promise<UserStatementInfo[]> =>
  httpFetcher.get('owner').json();
