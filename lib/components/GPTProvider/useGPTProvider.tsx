import { useEffect, useState } from 'react';

import type { Attributes, SlotProvider } from '../../types';
import type { Unit } from './GPTProvider.type';
import { getGPTScript } from '../../utils';
import { gtag } from '../../utils/gtag';

type UseGPTProvider = {
  isLoaded: boolean;
  units: Unit[];
  addUnit: (unit: Unit) => void;
};

const useGPTProvider = <PageAttributes extends Attributes>(
  props: SlotProvider<PageAttributes>
): UseGPTProvider => {
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

  useEffect(() => {
    const gptScript = getGPTScript({ limitedAds });
    gptScript.addEventListener('load', () => setIsLoaded(true));
    document.getElementsByTagName('head')[0].appendChild(gptScript);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      gtag.push(() => {
        if (outOfPage) {
          const { settings } = outOfPage;
          // TODO: figure out how to test anchor
          const adUnitPath = gtag.getAdUnitPath(networkId, settings.adUnit);
          let unit = gtag.createOutOfPageSlot(
            adUnitPath,
            gtag.getOutOfPageSlotId(outOfPage)
          );

          if (unit && settings.targetingArguments) {
            Object.keys(settings.targetingArguments).forEach((targetingKey) => {
              unit.setTargeting(
                targetingKey,
                settings.targetingArguments![targetingKey]
              );
            });

            gtag.addService(unit);

            gtag.handleRewarded(outOfPage);
          }
        }
        if (targetingArguments) {
          Object.keys(targetingArguments).forEach((targetingKey) => {
            gtag.setTargeting(targetingKey, targetingArguments[targetingKey]);
          });
        }

        gtag.handleFallback(fallback);
      });
    }
  }, [isLoaded]);

  return {
    isLoaded,
    units,
    addUnit,
  };
};

export { useGPTProvider };
