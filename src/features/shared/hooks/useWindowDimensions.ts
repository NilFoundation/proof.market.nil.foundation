/**
 * @file React hook.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

function getWindowDimensions() {
  const { innerHeight: height, innerWidth: width } = window;
  return { height, width };
}

/**
 * Hook to get window dimensions.
 *
 * @returns Window dimwnsions.
 */
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowDimensions(getWindowDimensions());
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
