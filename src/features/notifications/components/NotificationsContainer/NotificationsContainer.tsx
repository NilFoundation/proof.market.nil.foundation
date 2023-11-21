/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import { Notification } from '@nilfoundation/ui-kit';
import { useStyletron } from 'styletron-react';
import { Portal } from '../Portal/Portal';
import type { RenderNotificationData } from '../../models/RenderNotificationData';
import { notificationActions } from '../../utils/notificationsActions';
import { styles } from './styles';

/**
 * Notification container props.
 */
type NotificationContainerProps = {
  children: ReactNode;
  maxNotificationsToShow?: number;
};

/**
 * Notification container component.
 *
 * @param {NotificationContainerProps} props - Props.
 * @returns React component.
 */
const NotificationContainer = ({
  children,
  maxNotificationsToShow = 3,
}: NotificationContainerProps): ReactElement => {
  const [queue, setQueue] = useState<RenderNotificationData[]>([]);
  const [css] = useStyletron();

  notificationActions.create = ({ message, autoHideDuration = 3000, ...rest }) => {
    const id = uniqueId('notification-');
    setQueue([
      ...queue,
      {
        autoHideDuration,
        children: message,
        id,
        ...rest,
      },
    ]);

    return id;
  };

  notificationActions.remove = (id: string): void => setQueue(queue.filter(x => x.id !== id));

  return (
    <>
      {children}
      <Portal>
        <div className={css(styles.container)}>
          {queue.slice(0, maxNotificationsToShow).map(({ id, children, ...rest }) => (
            <Notification
              key={id}
              closeable
              onClose={(): void => notificationActions?.remove(id)}
              {...rest}
            >
              {children}
            </Notification>
          ))}
        </div>
      </Portal>
    </>
  );
};

export default NotificationContainer;
