/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Size, Variant } from '@nilfoundation/react-components';
import { Path } from 'src/routing';
import { useAuth } from 'src/hooks';
import { Overlay } from 'src/components/common';
import styles from './ProtectedContent.module.scss';

/**
 * Props.
 */
type ProtectedComponentProps = {
    children: ReactNode;
    overlayTitle?: string;
    overlayButtonText?: string;
};

/**
 * Component to restrict non-authorized and readonly users access.
 * Renders an overlay with a link to login page.
 *
 * Consider to add position: relative to parent container.
 *
 * @param {ProtectedComponentProps} props - Props.
 * @returns React component.
 */
export const ProtectedContent = ({
    children,
    overlayTitle,
    overlayButtonText = 'Sign in',
}: ProtectedComponentProps): ReactElement => {
    const { isAuthentificated, isReadonly } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {(!isAuthentificated || isReadonly) && (
                <Overlay>
                    <div className={styles.container}>
                        {overlayTitle && <h4 className="text-center">{overlayTitle}</h4>}
                        <Button
                            variant={Variant.success}
                            size={Size.lg}
                            onClick={() => navigate(Path.login)}
                        >
                            {overlayButtonText}
                        </Button>
                    </div>
                </Overlay>
            )}
            {children}
        </>
    );
};
