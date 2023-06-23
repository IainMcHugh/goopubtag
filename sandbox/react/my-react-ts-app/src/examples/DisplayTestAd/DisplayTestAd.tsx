import { GPTSlot } from '../../../../../../index';

const DisplayTestAd = () => {
  return (
    <div>
      <p>Display test ad</p>
      <GPTSlot
        slotId="banner-ad"
        adUnit="Travel/Europe/France/Paris"
        sizes={[300, 250]}
      />
    </div>
  );
};

export { DisplayTestAd };
