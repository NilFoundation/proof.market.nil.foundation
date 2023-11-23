/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { ErrorPage } from '@nilfoundation/ui-kit';
import { Helmet } from 'react-helmet-async';
import { Path } from '@/features/routing';

/**
 * App Error view.
 *
 * @returns React component.
 */
const ErrorView = (): ReactElement => (
  <>
    <Helmet>
      <title>Error occured</title>
    </Helmet>
    <ErrorPage
      errorDescription="Something went wrong... Please reload the page or try again later."
      errorCode={500}
      redirectPath={Path.market}
      redirectTitle="Go to the home page"
    />
  </>
);

export default ErrorView;
