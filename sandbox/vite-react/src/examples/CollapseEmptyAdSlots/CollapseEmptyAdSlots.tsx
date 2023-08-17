import { GPTProvider, GPTSlot } from '../../../../../dist';

const CollapseEmptyAdSlots = () => {
  return (
    <GPTProvider networkId={6355419} debug={true} fallback="collapse">
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  return (
    <div>
      <div className="ad-container">
        <p>Ad slot #1</p>
        <GPTSlot
          slotId="ad-slot-1"
          adUnit="Travel"
          sizes={[300, 250]}
          targetingArguments={{ test: 'responsive' }}
          fallback="default"
        />
      </div>

      <div className="ad-container">
        <p>Ad slot #2</p>
        <GPTSlot
          slotId="ad-slot-2"
          adUnit="Travel"
          sizes={[250, 200]}
          targetingArguments={{ test: 'responsive' }}
          fallback="collapse"
        />
      </div>

      <div className="ad-container">
        <p>Ad slot #3</p>
        <GPTSlot
          slotId="ad-slot-3"
          adUnit="Travel"
          sizes={[200, 150]}
          targetingArguments={{ test: 'responsive' }}
          fallback="expand_strict"
        />
      </div>

      <div className="ad-container">
        <p>Ad slot #4</p>
        <GPTSlot
          slotId="ad-slot-4"
          adUnit="Travel"
          sizes={[150, 100]}
          targetingArguments={{ test: 'responsive' }}
          fallback="expand"
        />
      </div>
    </div>
  );
};

export { CollapseEmptyAdSlots };
