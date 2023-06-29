import { useState, useEffect } from 'react';
import { GPTProvider, GPTSlot, useGPT } from '../../../../../index';

const ConfigurePrivacy = () => {
  return (
    <GPTProvider networkId={6355419} debug={true}>
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  const [options, setOptions] = useState({
    cdt: false,
    npa: false,
    rdp: false,
    uaoc: false,
  });
  const { setPrivacySettings, refresh } = useGPT();
  const handleClick = (option: string) => {
    switch (option) {
      case 'cdt': {
        setOptions((prev) => ({ ...prev, cdt: !prev.cdt }));
        return;
      }
      case 'npa': {
        setOptions((prev) => ({ ...prev, npa: !prev.npa }));
        return;
      }
      case 'rdp': {
        setOptions((prev) => ({ ...prev, rdp: !prev.rdp }));
        return;
      }
      case 'uaoc': {
        setOptions((prev) => ({ ...prev, uaoc: !prev.uaoc }));
        return;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    setPrivacySettings({
      childDirectedTreatment: options.cdt,
      nonPersonalizedAds: options.npa,
      restrictDataProcessing: options.rdp,
      underAgeOfConsent: options.uaoc,
    });
    refresh();
  }, [options]);
  return (
    <div>
      <p>Configure Privacy</p>
      <GPTSlot
        slotId="banner-ad"
        adUnit="Travel/Europe/France/Paris"
        sizes={[300, 250]}
      />
      <div>
        <button onClick={() => handleClick('cdt')}>
          Child Directed Treatment
        </button>
        <button onClick={() => handleClick('npa')}>Non-personalized Ads</button>
        <button onClick={() => handleClick('rdp')}>
          Restricted Data Processing
        </button>
        <button onClick={() => handleClick('uaoc')}>
          Under Age of Consent
        </button>
      </div>
    </div>
  );
};

export { ConfigurePrivacy };
