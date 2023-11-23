/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { ErrorPage } from '@nilfoundation/ui-kit';
import { Path } from '../features/routing';

type Page404Props = {
  showRedirect?: boolean;
};

/**
 * 404 view.
 *
 * @param {Page404Props} props Props.
 * @returns React component.
 */
const Page404 = ({ showRedirect }: Page404Props): ReactElement => (
  <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <ErrorPage
      errorCode={404}
      errorDescription="Page not found"
      redirectTitle={showRedirect ? 'Go to the home page' : ''}
      redirectPath={showRedirect ? Path.market : ''}
    />
  </>
);

export default Page404;
