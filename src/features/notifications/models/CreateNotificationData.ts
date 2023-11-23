/**
 * @file Model.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { NOTIFICATION_KIND } from '@nilfoundation/ui-kit';

/**
 * Data to create notifications.
 */
export type CreateNotificationData = {
  message: string;
  kind?: NOTIFICATION_KIND;
  autoHideDuration?: number;
};
