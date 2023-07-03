import { useEffect, useState } from 'react';

import type { SlotProvider, Unit } from '../types';
import { getGPTScript } from '../utils';

const useGPTProviderInternal = (props: SlotProvider) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const {
    limitedAds = false,
    fallback = 'default',
    targetingArguments,
  } = props;

  const addUnit = (unit: Unit) => setUnits((prev) => [...prev, unit]);

  useEffect(() => {
    const gptScript = getGPTScript({ limitedAds });
    gptScript.addEventListener('load', () => setIsLoaded(true));
    document.getElementsByTagName('head')[0].appendChild(gptScript);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.googletag?.cmd.push(() => {
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
