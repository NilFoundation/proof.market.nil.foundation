/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { KeyboardEventHandler, ReactElement, ReactNode } from 'react';
import { useState, Children, isValidElement, cloneElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import styles from './Details.module.scss';

/**
 * Props.
 */
type DetailsProps = {
  children: ReactNode;
  title: ReactNode;
  defaultOpen?: boolean;
  bottomIndent?: boolean;
  unmountOnClose?: boolean;
  disabled?: boolean;
};

/**
 * Details.
 *
 * @param {DetailsProps} props Props.
 * @returns React component.
 */
export const Details = ({
  children,
  title,
  defaultOpen = true,
  bottomIndent = true,
  unmountOnClose = false,
  disabled = false,
}: DetailsProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onKeyDownHandler: KeyboardEventHandler = e => {
    if (e.key !== 'Enter' && e.key !== ' ') {
      return;
    }

    !disabled && toggleIsOpen();
  };

  const iconClassName = `fa-solid fa-angle-${isOpen ? 'up' : 'down'} ${
    disabled ? 'text-muted' : ''
  } ${styles.icon}`;

  return (
    <>
      <div
        className={`${styles.title} ${bottomIndent ? styles.bottomIndent : ''}`}
        onClick={toggleIsOpen}
        onKeyDown={onKeyDownHandler}
        role="button"
        tabIndex={0}
      >
        {title}
        <Icon iconName={iconClassName} />
      </div>
      <>
        {(!unmountOnClose || isOpen) &&
          Children.map(children, child => {
            if (isValidElement(child)) {
              const props = {
                className: `${child.props.className} ${!isOpen ? ' hidden' : ''}`,
              };

              return cloneElement(child, props);
            }

            return child;
          })}
      </>
    </>
  );
};
