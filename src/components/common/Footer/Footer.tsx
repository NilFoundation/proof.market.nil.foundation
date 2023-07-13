/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { socialLinks } from '@/constants';
import { SocialLinks } from '../SocialLinks';
import { Copyright } from '../Copyright';
import styles from './Footer.module.scss';

/**
 * Footer.
 *
 * @returns React component.
 */
export const Footer = (): ReactElement => (
    <Container className={styles.footer}>
        <Row>
            <Col>
                <SocialLinks
                    socialLinks={socialLinks}
                    bottomIndent
                />
            </Col>
        </Row>
        <Row className="text-center">
            <Col>
                <Copyright />
            </Col>
        </Row>
    </Container>
);
