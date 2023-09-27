/**
 * @file Api.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { DownloadProgress } from 'ky';
import { createApiClient, getApiUrlByParameters } from '../common';
import type { Proof } from '../../models';

const httpFetcher = createApiClient('/proof');

/**
 * Get current user proofs by parameters.
 *
 * @param {Partial<Proof>} parameters Parameters.
 * @param limit Response limit.
 * @param startFrom Start from.
 * @returns Proofs.
 */
export const getProofs = (
  parameters: Partial<Proof>,
  limit?: number,
  startFrom?: number,
): Promise<Proof[]> =>
  httpFetcher
    .get(getApiUrlByParameters<Partial<Proof>>(parameters, limit, startFrom, 'owner'))
    .json();

/**
 * Get proof by key.
 *
 * @param proofKey Proof key.
 * @param {DownloadProgress} downloadProgressHandler Callback to handle download progress.
 * @returns Proofs.
 */
export const getProofById = (
  proofKey: Proof['_key'],
  downloadProgressHandler?: (progress: DownloadProgress) => void,
): Promise<Proof> =>
  httpFetcher
    .get(
      proofKey,
      downloadProgressHandler
        ? {
            onDownloadProgress: progress => downloadProgressHandler(progress),
          }
        : undefined,
    )
    .json();
