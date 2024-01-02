import { CSSProperties, useEffect } from 'react';

import type { GPTSlotInternalProps } from './GPTSlot.type';
import type { Sizes, SlotLoadEvent, SlotViewableEvent } from '../../types';
import { useGPTContext } from '../GPTProvider/GPTProvider';

const defineSlot = (adUnitPath: string, sizes: Sizes, slotId: string) =>
  window.googletag
    ?.defineSlot(adUnitPath, sizes, slotId)
    ?.addService(window.googletag?.pubads());

const defineOutOfPageSlot = (adUnitPath: string, slotId: string) =>
  window.googletag
    ?.defineOutOfPageSlot(adUnitPath, slotId)
    ?.addService(window.googletag?.pubads());

const getMapping = () => window.googletag?.sizeMapping();

const handleSlotLoad = (onSlotLoad: (event: SlotLoadEvent) => void) =>
  window.googletag?.pubads().addEventListener('slotOnload', onSlotLoad);

const handleSlotIsViewable = (
  onSlotIsViewable: (event: SlotViewableEvent) => void
) =>
  window.googletag
    ?.pubads()
    .addEventListener('impressionViewable', onSlotIsViewable);

const useGPTSlotInternal = (props: GPTSlotInternalProps) => {
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
          unit = defineOutOfPageSlot(adUnitPath, slotId);
        } else {
          unit = defineSlot(adUnitPath, sizes, slotId);
        }

        if (sizeMapping) {
          const mapping = getMapping();
          // const mapping = window.googletag?.sizeMapping();
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
        if (onSlotLoad) handleSlotLoad(onSlotLoad);
        if (onSlotIsViewable) handleSlotIsViewable(onSlotIsViewable);
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
