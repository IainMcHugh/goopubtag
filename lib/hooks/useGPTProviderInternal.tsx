import { useEffect, useState } from 'react';

import type { SlotProvider } from '../types';
import { getGPTScript } from '../utils';

const useGPTProviderInternal = (props: SlotProvider) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { limitedAds = false, targetingArguments } = props;

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
      });
    }
  }, [isLoaded]);

  return {
    isLoaded,
  };
};

export { useGPTProviderInternal };
