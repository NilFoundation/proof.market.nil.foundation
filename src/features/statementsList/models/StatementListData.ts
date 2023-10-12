/**
 * @file This file contains the model for the statement list data.
 */

/**
 * Statements list data.
 */
export interface StatementsListData {
  _key: string;
  name: string;
  cost?: number | null;
  change?: number | null;
  tag?: string;
}
