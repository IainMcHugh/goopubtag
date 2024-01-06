import { useEffect, useState } from 'react';
import { GPTProvider, GPTSlot, useGPT } from '../../../../../dist';

const SLOT = {
  BANNER_AD_1: 'banner-ad-1',
  BANNER_AD_2: 'banner-ad-2',
} as const;

/**
 * Optional typing for page level targeting
 */
type PageLevelTargeting = {
  interests: string;
};

/**
 * Optional typing for unit level targeting
 */
type BannerAd1 = {
  slotId: 'banner-ad-1';
  attributes: {
    color?: string;
    position?: string;
  };
};
type BannerAd2 = {
  slotId: 'banner-ad-2';
  attributes: {
    position?: string;
  };
};

const KeyValueTargeting = () => {
  return (
    <GPTProvider<PageLevelTargeting>
      networkId={6355419}
      targetingArguments={{ interests: 'basketball' }}
      debug={true}
    >
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  const [toggle, setToggle] = useState(true);
  const {
    setTargetingAttributes,
    setPageTargetingAttributes,
    clearTargetingAttributes,
    clearPageTargetingAttributes,
    refresh,
  } = useGPT<PageLevelTargeting>();

  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  useEffect(() => {
    if (toggle) {
      setPageTargetingAttributes({ interests: 'basketball' });
      setTargetingAttributes<BannerAd1>('banner-ad-1', {
        color: 'red',
      });
    } else {
      clearPageTargetingAttributes();
      clearTargetingAttributes<BannerAd1>('banner-ad-1', ['color']);
    }
    refresh();
  }, [toggle]);
  return (
    <div>
      <p>Key value targeting</p>
      <GPTSlot<BannerAd1>
        slotId="banner-ad-1"
        adUnit="Travel/Asia"
        sizes={[728, 90]}
        targetingArguments={{ color: 'red', position: 'atf' }}
      />
      <br />
      <GPTSlot<BannerAd2>
        slotId="banner-ad-2"
        adUnit="Travel/Asia"
        sizes={[728, 90]}
        targetingArguments={{ position: 'btf' }}
      />
      <button onClick={handleClick}>Toggle targeting attributes</button>
    </div>
  );
};

export { KeyValueTargeting };
