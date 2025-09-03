import { gtag } from "./gtag";

/**
 * This function when called will either:
 *
 * - refresh all ad slots (no parameter)
 * - refresh only the ad slots provided
 *
 * @param adSlots The list of ad slot(s)
 * @returns
 */
export const refresh = <AdSlots extends string[] = string[]>(
  adSlots?: AdSlots
) => {
  gtag.push(() => {
    if (adSlots && adSlots.length !== 0) {
      gtag.refresh(adSlots);
    } else {
      gtag.refresh();
    }
  });
};

/**
 * This function when called will either:
 *
 * - destroy the ad slots provided
 * - destroy all slots if no parameter is provided
 * @param adSlots The list of ad slot(s)
 * @returns
 */
export const destroySlots = <AdSlots extends string[] = string[]>(
  adSlots?: AdSlots
) => {
  gtag.push(() => {
    gtag.destroySlots(adSlots);
  });
};
