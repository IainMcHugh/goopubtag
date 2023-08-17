import { GPTProvider, GPTSlot } from '../../../../../dist';

const DisplayRewardedAd = () => {
  const handleReady = (event: any) => {
    event.makeRewardedVisible();
  };
  return (
    <GPTProvider
      networkId={22639388115}
      debug={true}
      outOfPage={{
        type: 'rewarded',
        settings: {
          adUnit: 'rewarded_web_example',
          onReady: handleReady,
          onClosed: () => console.log('closed!'),
          onGranted: () => console.log('granted!'),
        },
      }}
    >
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  return (
    <div
      id="modal"
      style={{
        display: 'block',
        position: 'fixed',
        zIndex: '1',
        paddingTop: '300px',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        style={{
          margin: 'auto',
          padding: '25px',
          backgroundColor: 'white',
          textAlign: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <p id="modalMessage"></p>

        <span style={{ display: 'block' }}>
          <input
            id="closeButton"
            type="button"
            value="Close"
            style={{
              padding: '0.5rem',
              background: 'blue',
              border: 'none',
              borderRadius: '4px',
              margin: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          />
        </span>

        <span style={{ display: 'block' }}>
          <input
            type="button"
            id="watchAdButton"
            value="Yes"
            style={{
              padding: '0.5rem',
              background: 'blue',
              border: 'none',
              borderRadius: '4px',
              margin: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          />
          <input
            id="noRewardButton"
            type="button"
            value="No"
            style={{
              padding: '0.5rem',
              background: 'blue',
              border: 'none',
              borderRadius: '4px',
              margin: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          />
        </span>
      </div>
    </div>
  );
};

export { DisplayRewardedAd };
