/**
 * @file Footer component styles.
 */

import { PRIMITIVE_COLORS } from '@nilfoundation/ui-kit';
import type { StyleObject } from 'styletron-react';
import { expandProperty } from 'inline-style-expand-shorthand';

const footer: StyleObject = {
    ...expandProperty('padding', '8rem'),
    borderTop: `1px solid ${PRIMITIVE_COLORS.primary600}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
};

export const styles = {
    footer,
};
