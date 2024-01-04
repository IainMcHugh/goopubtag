import type { Attributes, PrivacySettings } from '../../types';
import type { UseGPT } from './useGPT.type';
import { useGPTContext } from '../../components/GPTProvider/GPTProvider';
import { gtag } from '../../utils/gtag';

/**
 * A hook that enables dynamic updates to page level and slot configuration
 * @returns
 */
const useGPT = (): UseGPT => {
  const { units, limitedAds } = useGPTContext();

  /**
   * This function when called will set the targeting attributes provided for a given slot
   * @param slotId The unit slot id
   * @param attributes The attributes to be set
   * @returns
   */
  const setTargetingAttributes = (slotId: string, attributes: Attributes) => {
    gtag.push(() => {
      const unit = units.find((unit) => unit.slotId === slotId)?.unit;
      Object.keys(attributes).forEach((tagetingKey) => {
        unit.setTargeting(tagetingKey, attributes[tagetingKey]);
      });
    });
  };

  /**
   * This function when called will set the targeting attributes at a page level
   * @param attributes The attributes to be set
   * @returns
   */
  const setPageTargetingAttributes = (attributes: Attributes) => {
    gtag.push(() => {
      Object.keys(attributes).forEach((targetingKey) => {
        gtag.setTargeting(targetingKey, attributes[targetingKey]);
      });
    });
  };

  /**
   * This function when called will either:
   *
   * - clear all attributes for a given slot (when no attributes are provided)
   * - clear specific attributes based on the attribute keys provided
   * @param slotId The unit slot id
   * @param attributes The attributes to be cleared
   * @returns
   */
  const clearTargetingAttributes = (slotId: string, attributes?: string[]) => {
    gtag.push(() => {
      const unit = units.find((unit) => unit.slotId === slotId)?.unit;
      if (attributes) {
        attributes.forEach((tagetingKey) => {
          unit.clearTargeting(tagetingKey);
        });
      } else unit.clearTargeting();
    });
  };

  /**
   * This function when called will either:
   *
   * - clear all page level attributes (when no attributes are provided)
   * - clear specific page level attributes based on attribute keys provided
   * @param attributes The attributes to be cleared
   * @returns
   */
  const clearPageTargetingAttributes = (attributes?: string[]) => {
    gtag.push(() => {
      if (attributes) {
        attributes.forEach((targetingKey) => {
          gtag.clearTargeting(targetingKey);
        });
      } else gtag.clearTargeting();
    });
  };

  /**
   * This function when called will update the privacy settings with the values provided
   * @param settings The privacy settings
   * @returns
   */
  const setPrivacySettings = (privacySettings: Partial<PrivacySettings>) => {
    if (!limitedAds && privacySettings.limitedAds !== undefined) {
      throw new Error(
        'limited ads must be enabled on GPTContext to set privacy settings'
      );
    } else {
      gtag.push(() => {
        gtag.setPrivacySettings(privacySettings);
      });
    }
  };

  /**
   * This function when called will either:
   *
   * - refresh all ad slots (no parameter)
   * - refresh only the ad slots provided
   *
   * @param adSlots The list of ad slot(s)
   * @returns
   */
  const refresh = (adSlots?: string[]) => {
    gtag.push(() => {
      if (adSlots && adSlots.length !== 0) {
        gtag.refresh(adSlots);
      } else {
        gtag.refresh();
      }
    });
  };

  return {
    refresh,
    setTargetingAttributes,
    setPageTargetingAttributes,
    clearTargetingAttributes,
    clearPageTargetingAttributes,
    setPrivacySettings,
  };
};

export { useGPT };
