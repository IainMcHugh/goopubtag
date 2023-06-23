import { GPTSlot, useGPT } from '../../../../../../index';

const Refresh = () => {
  const { refresh } = useGPT();

  const handleClick = () => {
    refresh();
  };
  return (
    <div>
      <GPTSlot
        slotId="banner-ad"
        adUnit="Travel/Europe/France/Paris"
        sizes={[300, 250]}
      />
      <button onClick={handleClick}>Refresh</button>
    </div>
  );
};

export { Refresh };
