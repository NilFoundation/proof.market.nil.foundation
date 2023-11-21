/**
 * @file Model.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { NotificationProps } from '@nilfoundation/ui-kit';

/**
 * Data to render notifications.
 */
export type RenderNotificationData = {
  id: string;
} & Pick<NotificationProps, 'kind' | 'children' | 'autoHideDuration'>;
