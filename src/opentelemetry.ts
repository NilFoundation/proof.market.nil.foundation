/**
 * @file Opentelemtry configuration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter as HttpTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import type { OTLPExporterNodeConfigBase } from '@opentelemetry/otlp-exporter-base';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { getRuntimeConfigOrThrow } from './utils';
import packageJson from '../package.json';

const { OTEL_TRACE_EXPORTER_URL, OTEL_SERVICE_NAME = packageJson.name } = getRuntimeConfigOrThrow();

const exporterOptions = {
  url: OTEL_TRACE_EXPORTER_URL,
} satisfies OTLPExporterNodeConfigBase;

const provider = new WebTracerProvider({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: OTEL_SERVICE_NAME,
  }),
});

const exporter = new HttpTraceExporter(exporterOptions);

// eslint-disable-next-line jsdoc/require-jsdoc
export const initOpentelemetry = () => {
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();
};

/**
 * Register error in opentelemetry.
 *
 * @param error - Error to be reported.
 */
export const exportErrorToOtelCollector = (error: Error) => {
  const span = provider.getTracer('default').startSpan('Operational error');

  span.setAttribute('message', error.message);
  span.recordException(error);
  span.setStatus({ code: 2, message: error.message });

  span.end();
};

// Register global error handler to report uncaught errors.
window.onerror = function (message, _source, _lineno, _colno, error) {
  const span = provider.getTracer('default').startSpan('Uncaught error');

  error && span.recordException(error);
  typeof message === 'string' && span.setAttribute('message', message);
  span.setStatus({ code: 2, message: typeof message === 'string' ? message : '' });

  span.end();
};
