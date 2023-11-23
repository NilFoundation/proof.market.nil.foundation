/**
 * @file Exports public feature interfaces.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import loadable from '@loadable/component';

const NotificationContainer = loadable(
  () => import('./components/NotificationsContainer/NotificationsContainer'),
  {
    fallback: <></>,
  },
);

export { NotificationContainer };
export { notificationActions } from './utils/notificationsActions';
