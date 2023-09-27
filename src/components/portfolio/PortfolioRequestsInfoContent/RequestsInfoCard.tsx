/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Col, Container, Row } from '@nilfoundation/react-components';
import { ObjectAsPlainTextViewer } from '@/components/common';
import type { PortfolioRequestsInfo } from '@/models';
import { mapToHumanReadablePortfolioRequestsInfo } from '@/models';
import { selectCurrentStatementName, useAppSelector } from '@/redux';
import { ProofList } from '../ProofList';
import styles from './PortfolioRequestsInfoContent.module.scss';

/**
 * Props.
 */
type RequestsInfoCardProps = {
  info: PortfolioRequestsInfo;
};
/**
 * Displaysrequests info and proof list.
 *
 * @param {RequestsInfoCardProps} props Props.
 * @returns Component.
 */
export const RequestsInfoCard = ({ info }: RequestsInfoCardProps): ReactElement => {
  const selectedStatementName = useAppSelector(selectCurrentStatementName);
  const humanReadbleInfo = useMemo(
    () => (info ? mapToHumanReadablePortfolioRequestsInfo(info) : undefined),
    [info],
  );
  const { _key } = info;

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={6}>
          <div className="portfolioHeader">
            <h4>Request info</h4>
            <span className="text-muted">
              {`Aggregated information about your requests in ${selectedStatementName} statement`}
            </span>
          </div>
          <ObjectAsPlainTextViewer data={humanReadbleInfo!} />
        </Col>
        <Col md={6}>
          <div className="portfolioHeader">
            <h4>Proofs</h4>
            <span className="text-muted">{`Genrated in ${selectedStatementName} statement`}</span>
          </div>
          <ProofList
            selectedRequestsInfoKey={_key}
            key={_key}
          />
        </Col>
      </Row>
    </Container>
  );
};
