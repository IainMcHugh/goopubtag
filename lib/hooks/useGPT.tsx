import type { UseGPTProps, UseGPT, Attributes } from '../types';

const useGPT = (props?: UseGPTProps): UseGPT => {
  const setTargetingAttributes = (slotId: string, attributes: Attributes) => {
    // come back to
    refresh();
  };

  const clearTargetingAttributes = (slotId: string, attributes: string[]) => {
    // come back to
    refresh();
  };

  const refresh = (adSlots?: string[]) => {
    window.googletag?.cmd.push(() => {
      if (adSlots && adSlots.length !== 0) {
        window.googletag?.pubads().refresh(adSlots);
      } else {
        window.googletag?.pubads().refresh();
      }
    });
  };
  return {
    refresh,
    setTargetingAttributes,
    clearTargetingAttributes,
  };
};

export { useGPT };
