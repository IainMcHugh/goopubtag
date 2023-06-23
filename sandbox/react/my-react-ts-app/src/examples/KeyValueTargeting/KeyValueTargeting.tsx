import { useEffect, useState } from 'react';
import { GPTSlot, useGPT } from '../../../../../../index';

const KeyValueTargeting = () => {
  const [toggle, setToggle] = useState(false);
  const { setTargetingAttributes, clearTargetingAttributes } = useGPT();

  const handleClick = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  useEffect(() => {
    if (toggle) {
      setTargetingAttributes('banner-ad-1', { color: 'blue' });
    } else {
      clearTargetingAttributes('banner-ad-1', ['color']);
    }
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
