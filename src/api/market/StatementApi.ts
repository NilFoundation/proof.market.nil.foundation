/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Statement, StatementInfo, StatementStats } from '@/models';
import { createApiClient } from '../common';

const httpFetcher = createApiClient('/statement');

/**
 * Get statements.
 *
 * @returns Statement list.
 */
export const getStatements = (): Promise<Statement[]> => httpFetcher.get('').json();

/**
 * Get statements info.
 *
 * @returns .
 */
export const getStatementsInfo = (): Promise<StatementInfo[]> => httpFetcher.get('?info').json();

/**
 * Get statements statistics.
 *
 * @returns .
 */
export const getStatementsStats = (): Promise<StatementStats[]> =>
  httpFetcher.get('?statistics').json();
