/**
 * @file Web vitals.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReportHandler } from 'web-vitals';
import ReactGa from 'react-ga4';

const handleWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

const reportHandler: ReportHandler = ({ name, value, id }) => {
  ReactGa.event({
    action: name,
    category: 'Web Vitals',
    label: id,
    nonInteraction: true,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
  });
};

/**
 * Measures core web vitals metrics and sends it to google analytics.
 *
 * @returns Void.
 */
export const reportWebVitals = () => handleWebVitals(reportHandler);
