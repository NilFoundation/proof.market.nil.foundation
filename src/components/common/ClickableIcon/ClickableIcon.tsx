/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Button, Icon } from '@nilfoundation/react-components';
import type { ButtonProps } from '@nilfoundation/react-components';
import styles from './ClickableIcon.module.scss';

/**
 * Props.
 */
type ClicableIconProps = {
    iconName: string;
} & ButtonProps<HTMLButtonElement>;

/**
 * Button, that looks like an icon.
 *
 * @param {ClicableIconProps} props Props.
 * @returns React component.
 */
export const ClickableIcon = ({ iconName, className, ...rest }: ClicableIconProps): JSX.Element => {
    return (
        <Button
            className={`${styles.button} ${className ?? ''}`}
            {...rest}
        >
            <Icon iconName={iconName} />
        </Button>
    );
};
