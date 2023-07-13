/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { Icon, Nav } from '@nilfoundation/react-components';

/**
 * Props.
 */
type DashboardToolbarProps = {
    children?: ReactNode;
    disabled: boolean;
    isFullscreen: boolean;
    setFullScreen: (x: boolean) => void;
    displayVolumes: boolean;
    setDisplayVolumes: (d: boolean) => void;
};

/**
 * Dashboard toolbar.
 *
 * @param {DashboardToolbarProps} props Props.
 * @returns React component.
 */
export const DashboardToolbar = ({
    disabled,
    isFullscreen,
    setFullScreen,
    displayVolumes,
    setDisplayVolumes,
    children,
}: DashboardToolbarProps): ReactElement => {
    return (
        <Nav>
            {children}
            <Nav.Item
                disabled={disabled}
                active={displayVolumes}
                onClick={() => setDisplayVolumes(!displayVolumes)}
            >
                <Icon
                    iconName="fa-solid fa-chart-simple"
                    srOnlyText="Toggles volumes display"
                    title="Display volumes"
                />
            </Nav.Item>
            <Nav.Item
                disabled={disabled}
                active={isFullscreen}
                onClick={() => setFullScreen(!isFullscreen)}
            >
                <Icon
                    iconName={`fa-solid fa-${isFullscreen ? 'compress' : 'expand'}`}
                    srOnlyText="Toggles fullscreen view"
                    title="Fullscreen view"
                />
            </Nav.Item>
        </Nav>
    );
};
