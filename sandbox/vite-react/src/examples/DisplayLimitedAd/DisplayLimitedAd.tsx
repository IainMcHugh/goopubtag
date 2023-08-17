import { useState, useEffect } from 'react';
import { GPTProvider, GPTSlot, useGPT } from '../../../../../dist';

const DisplayLimitedAd = () => {
  return (
    <GPTProvider networkId={6355419} limitedAds={true} debug={true}>
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  const [limitedAds, setLimitedAds] = useState(false);
  const { setPrivacySettings, refresh } = useGPT();

  const handleClick = () => {
    setLimitedAds((prev) => !prev);
  };

  useEffect(() => {
    setPrivacySettings({ limitedAds });
    refresh();
  }, [limitedAds]);

  return (
    <div>
      <p>Display limited ad</p>
      <GPTSlot
        slotId="banner-ad"
        adUnit="Travel"
        sizes={[728, 90]}
        targetingArguments={{ test: 'privacy' }}
      />
      <div>
        <button onClick={handleClick}>Limited Ads</button>
      </div>
    </div>
  );
};

export { DisplayLimitedAd };
