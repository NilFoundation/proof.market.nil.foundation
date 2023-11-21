/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorPage } from '@nilfoundation/ui-kit';
import { Path } from '../features/routing';

/**
 * 404 view.
 *
 * @returns React component.
 */
const Page404 = (): ReactElement => (
  <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <ErrorPage
      errorCode={404}
      errorDescription="Page not found"
      redirectTitle="Go to the home page"
      redirectPath={Path.root}
    />
  </>
);

export default Page404;
