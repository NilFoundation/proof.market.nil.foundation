/**
 * @file Session storage API.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { SessionStorageKey } from './SessionStorageKey';

/**
 * Session storage API.
 */
class SessionStorage {
  /**
   * Get sesstionStorage item.
   *
   * @param ItemKey - Key.
   * @returns Item value.
   */
  public getItem<T>(ItemKey: SessionStorageKey): T | undefined {
    try {
      const serialisedValue = sessionStorage.getItem(ItemKey);
      if (serialisedValue === null) {
        return undefined;
      }
      return JSON.parse(serialisedValue);
    } catch {
      return undefined;
    }
  }

  /**
   * Set sessionStorage item.
   *
   * @param ItemKey - Key.
   * @param ItemValue - Value.
   */
  public setItem<T>(ItemKey: SessionStorageKey, ItemValue: T): void {
    try {
      const serialisedValue = JSON.stringify(ItemValue);
      sessionStorage.setItem(ItemKey, serialisedValue);
    } catch {
      // Do nothing
    }
  }

  /**
   * Remove item from sessionStorage.
   *
   * @param ItemKey - Key.
   */
  public removeItem(ItemKey: SessionStorageKey): void {
    try {
      sessionStorage.removeItem(ItemKey);
    } catch {
      // Do nothing
    }
  }
}

export const SessionStorageAPI = new SessionStorage();
