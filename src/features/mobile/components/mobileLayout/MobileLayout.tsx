/**
 * @file Layout.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/features/shared';
import { ReadonlyAccessProvider } from '@/features/auth';
import { FullScreenLoader } from '../../../../components';
import { MobileMenu } from '../mobileMenu/MobileMenu';
import { MobileMenuItem } from '../../enums/MobileMenuItem';
import { MobileMenuContext } from './MobileMenuContext';
import styles from './MobileLayout.module.scss';

/**
 * Mobile app layout.
 *
 * @returns React element.
 */
const MobileLayout = (): ReactElement => {
  const [selectedMenuOption, setSeleectedMenuOption] = useState<MobileMenuItem>(
    MobileMenuItem.statements,
  );

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>
        <ReadonlyAccessProvider fallback={<FullScreenLoader />}>
          <MobileMenuContext.Provider value={{ selectedMenuOption }}>
            <Outlet />
          </MobileMenuContext.Provider>
        </ReadonlyAccessProvider>
      </div>
      <MobileMenu
        selectedMenuOption={selectedMenuOption}
        onSetMenuOption={setSeleectedMenuOption}
      />
    </div>
  );
};

export default MobileLayout;
