import { useEffect, useState } from 'react';
import { GPTSlot, useGPT } from '../../../../../index';

const KeyValueTargeting = () => {
  const [toggle, setToggle] = useState(true);
  const {
    setTargetingAttributes,
    setPageTargetingAttributes,
    clearTargetingAttributes,
    clearPageTargetingAttributes,
    refresh,
  } = useGPT();

  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  useEffect(() => {
    if (toggle) {
      setPageTargetingAttributes({ interests: 'basketball' });
      setTargetingAttributes('banner-ad-1', { color: 'red' });
    } else {
      clearPageTargetingAttributes();
      clearTargetingAttributes('banner-ad-1', ['color']);
    }
    refresh();
  }, [toggle]);
  return (
    <div>
      <p>Key value targeting</p>
      <GPTSlot
        slotId="banner-ad-1"
        adUnit="Travel/Asia"
        sizes={[728, 90]}
        targetingArguments={{ color: 'red', position: 'atf' }}
      />
      <br />
      <GPTSlot
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
