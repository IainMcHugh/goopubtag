import React from 'react';
import { GPTProvider, GPTSlot } from '../../../../../dist';

const LazyLoad = () => {
  return (
    <GPTProvider
      networkId={6355419}
      debug={true}
      lazyLoad={{
        fetchMarginPercent: 500,
        mobileScaling: 2.0,
        renderMarginPercent: 200,
      }}
    >
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  return (
    <div>
      <p>Lazy load</p>
      <GPTSlot
        slotId="banner-ad"
        adUnit="Travel/Europe/France/Paris"
        sizes={[300, 250]}
      />
    </div>
  );
};

export { LazyLoad };
