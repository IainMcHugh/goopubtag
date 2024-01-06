import { CSSProperties, useEffect } from 'react';

import type { UseGPTSlotProps } from './GPTSlot.type';
import { useGPTContext } from '../GPTProvider/GPTProvider';
import { gtag } from '../../utils/gtag';

const useGPTSlot = (props: UseGPTSlotProps) => {
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
  const adUnitPath = gtag.getAdUnitPath(networkId, adUnit);

  useEffect(() => {
    if (isLoaded) {
      gtag.push(() => {
        let unit: any = null;
        if (outOfPage) {
          unit = gtag.createOutOfPageSlot(adUnitPath, slotId);
        } else {
          unit = gtag.createSlot(adUnitPath, sizes, slotId);
        }

        if (sizeMapping) {
          const mapping = gtag.getMapping();
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
        if (onSlotLoad) gtag.handleSlotLoad(onSlotLoad);
        if (onSlotIsViewable) gtag.handleSlotIsViewable(onSlotIsViewable);
        if (onSlotRenderEnded) gtag.handleSlotRenderEnded(onSlotRenderEnded);

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
        gtag.enableService(slotId);
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

export { useGPTSlot };
