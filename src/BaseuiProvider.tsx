/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactNode } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { createDarkTheme, BaseProvider } from 'baseui';
import colors from '@/styles/export.module.scss';

type BaseuiProviderProps = {
    children: ReactNode;
};

const engine = new Styletron();

const primitives = {
    black: colors.baseColor,
    primary: colors.secondaryColor,
    white: colors.secondaryColor,
};

const theme = createDarkTheme(primitives);

/**
 * @param {BaseuiProviderProps} props Props.
 * @returns React component.
 */
export const BaseuiProvider = ({ children }: BaseuiProviderProps) => {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={theme}>{children}</BaseProvider>
        </StyletronProvider>
    );
};
