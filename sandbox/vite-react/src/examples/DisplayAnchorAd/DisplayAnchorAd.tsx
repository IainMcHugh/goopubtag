import { GPTProvider, GPTSlot } from '../../../../../index';

const DisplayAnchorAd = () => {
  return (
    <GPTProvider
      networkId={6355419}
      debug={true}
      outOfPage={{
        type: 'anchor',
        settings: {
          adUnit: 'Travel',
          position: 'top',
          targetingArguments: { test: 'anchor ' },
        },
      }}
    >
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  return (
    <div id="page-content" style={{ height: '900vh' }}>
      <h1 id="status">Anchor ads are not supported on this page.</h1>
      <GPTSlot slotId="static-ad-1" adUnit="Travel" sizes={[100, 100]} />
    </div>
  );
};

export { DisplayAnchorAd };
