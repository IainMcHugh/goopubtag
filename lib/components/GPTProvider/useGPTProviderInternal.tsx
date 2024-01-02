import { useEffect, useState } from 'react';

import type { OutOfPage, SlotProvider } from '../../types';
import type { Unit } from './GPTProvider.type';
import { getGPTScript } from '../../utils';

const useGPTProviderInternal = (props: SlotProvider) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const {
    networkId,
    limitedAds = false,
    fallback = 'default',
    targetingArguments,
    outOfPage,
  } = props;

  const addUnit = (unit: Unit) => setUnits((prev) => [...prev, unit]);

  const getOutOfPageSlotId = (outOfPage: OutOfPage) => {
    switch (outOfPage.type) {
      case 'anchor': {
        if (outOfPage.settings.position === 'top') {
          return window.googletag?.enums.OutOfPageFormat.TOP_ANCHOR;
        } else {
          return window.googletag?.enums.OutOfPageFormat.BOTTOM_ANCHOR;
        }
      }
      case 'rewarded': {
        return window.googletag?.enums.OutOfPageFormat.REWARDED;
      }

      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    const gptScript = getGPTScript({ limitedAds });
    gptScript.addEventListener('load', () => setIsLoaded(true));
    document.getElementsByTagName('head')[0].appendChild(gptScript);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.googletag?.cmd.push(() => {
        if (outOfPage) {
          const { settings } = outOfPage;
          // TODO: figure out how to test anchor
          const adUnitPath = `/${networkId}/${settings.adUnit}`;
          let unit = window.googletag
            ?.defineOutOfPageSlot(adUnitPath, getOutOfPageSlotId(outOfPage))
            ?.addService(window?.googletag?.pubads());

          if (unit && settings.targetingArguments) {
            Object.keys(settings.targetingArguments).forEach((tagetingKey) => {
              unit.setTargeting(
                tagetingKey,
                settings.targetingArguments![tagetingKey]
              );
            });

            unit.addService(window.googletag?.pubads());
            if (outOfPage.type === 'rewarded') {
              window.googletag
                ?.pubads()
                .addEventListener(
                  'rewardedSlotReady',
                  outOfPage.settings.onReady
                );

              window.googletag
                ?.pubads()
                .addEventListener(
                  'rewardedSlotClosed',
                  outOfPage.settings.onClosed
                );

              window.googletag
                ?.pubads()
                .addEventListener(
                  'rewardedSlotGranted',
                  outOfPage.settings.onGranted
                );
            }
          }
        }
        if (targetingArguments) {
          Object.keys(targetingArguments).forEach((tagetingKey) => {
            window.googletag
              ?.pubads()
              .setTargeting(tagetingKey, targetingArguments[tagetingKey]);
          });
        }

        if (fallback && fallback !== 'default') {
          switch (fallback) {
            case 'collapse': {
              window.googletag?.pubads().collapseEmptyDivs();
              break;
            }
            case 'expand': {
              window.googletag?.pubads().collapseEmptyDivs(true);
              break;
            }
            default: {
              break;
            }
          }
        }
      });
    }
  }, [isLoaded]);

  return {
    isLoaded,
    addUnit,
    units,
  };
};

export { useGPTProviderInternal };
