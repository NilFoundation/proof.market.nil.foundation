/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { CreateNotificationData } from '../models/CreateNotificationData';

/**
 * Notification actions type.
 */
type NotificationActions = {
  create: (data: CreateNotificationData) => string;
  remove: (id: string) => void;
};

/**
 * Notification actions.
 */
// eslint-disable-next-line prefer-const
export let notificationActions: NotificationActions = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create: () => '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove: () => {},
};
