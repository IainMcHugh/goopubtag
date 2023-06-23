import { CSSProperties, useEffect } from 'react';

import type { GPTSlotProps } from '../types';
import { useGPTContext } from '../contexts/GPTProvider';

const useGPTSlotInternal = (props: GPTSlotProps & { isLoaded: boolean }) => {
  const { adUnit, sizes, slotId, isLoaded, targetingArguments } = props;
  const { networkId } = useGPTContext();

  const adUnitPath = `/${networkId}/${adUnit}`;
  useEffect(() => {
    if (isLoaded) {
      window.googletag?.cmd.push(() => {
        const a = window.googletag
          ?.defineSlot(adUnitPath, sizes, slotId)
          ?.addService(window?.googletag?.pubads());

        if (targetingArguments) {
          Object.keys(targetingArguments).forEach((tagetingKey) => {
            a.setTargeting(tagetingKey, targetingArguments[tagetingKey]);
          });
        }

        // Enable the PubAdsService.
        window.googletag?.enableServices();
        window?.googletag?.display(slotId);
      });
    }
  }, [isLoaded]);

  const getStyle = (): CSSProperties => {
    if (!sizes) return {};
    if (typeof sizes === 'string') {
      return {
        width: '100%',
      };
    } else {
      return {
        width: sizes[0],
        height: sizes[1],
      };
    }
  };
  return { style: getStyle() };
};

export { useGPTSlotInternal };
