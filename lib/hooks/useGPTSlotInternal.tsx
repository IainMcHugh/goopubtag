import { CSSProperties, useEffect } from 'react';

import type { GPTSlotProps } from '../types';
import { useGPTContext } from '../contexts/GPTProvider';

const useGPTSlotInternal = (props: GPTSlotProps & { isLoaded: boolean }) => {
  const {
    adUnit,
    sizes,
    sizeMapping,
    slotId,
    isLoaded,
    targetingArguments,
    onSlotLoad,
    onSlotIsViewable,
    onSlotRenderEnded,
    fallback = 'default',
    outOfPage = false,
  } = props;
  const { networkId, addUnit } = useGPTContext();

  const adUnitPath = `/${networkId}/${adUnit}`;
  useEffect(() => {
    if (isLoaded) {
      window.googletag?.cmd.push(() => {
        let unit: any = null;
        if (outOfPage) {
          unit = window.googletag
            ?.defineOutOfPageSlot(adUnitPath, slotId)
            ?.addService(window?.googletag?.pubads());
        } else {
          unit = window.googletag
            ?.defineSlot(adUnitPath, sizes, slotId)
            ?.addService(window?.googletag?.pubads());
        }

        if (sizeMapping) {
          const mapping = window.googletag?.sizeMapping();
          sizeMapping.forEach(({ viewport, sizes }) => {
            mapping.addSize(viewport, sizes);
          });
          mapping.build();
          unit.defineSizeMapping(mapping);
        }

        if (targetingArguments) {
          Object.keys(targetingArguments).forEach((tagetingKey) => {
            unit.setTargeting(tagetingKey, targetingArguments[tagetingKey]);
          });
        }
        if (onSlotLoad) {
          window.googletag?.pubads().addEventListener('slotOnload', onSlotLoad);
        }
        if (onSlotIsViewable) {
          window.googletag
            ?.pubads()
            .addEventListener('impressionViewable', onSlotIsViewable);
        }
        if (onSlotRenderEnded) {
          window.googletag
            ?.pubads()
            .addEventListener('slotRenderEnded', onSlotRenderEnded);
        }
        if (fallback && fallback !== 'default') {
          switch (fallback) {
            case 'expand': {
              unit.setCollapseEmptyDiv(true, true);
              break;
            }
            case 'expand_strict': {
              unit.setCollapseEmptyDiv(false);
              break;
            }
            case 'collapse': {
              unit.setCollapseEmptyDiv(true);
              break;
            }
            default:
              break;
          }
        }
        slotId && addUnit({ slotId, unit });
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
    } else if (Array.isArray(sizes[0])) {
      // TODO: going to depend on the viewport - this is wrong
      return {
        width: '100%',
      };
    } else {
      return {
        width: sizes[0] as number,
        height: sizes[1] as number,
      };
    }
  };
  return { style: getStyle() };
};

export { useGPTSlotInternal };
