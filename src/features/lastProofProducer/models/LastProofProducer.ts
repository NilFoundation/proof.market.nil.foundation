/**
 * @file Typings.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

/**
 * Last proof producer data model.
 */
export type LastProofProducer = {
  /**
   * Statement of generated proof key.
   */
  statement_key: string;
  /**
   * Last proof producer username.
   */
  sender: string;
};
