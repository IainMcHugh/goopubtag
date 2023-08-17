import { GPTProvider, GPTSlot, GUIDELINES } from '../../../../../dist';

const { UNIT_SIZE, SCREEN_SIZE } = GUIDELINES;

const AdSizes = () => {
  return (
    <GPTProvider networkId={6355419} debug={true}>
      <Component />
    </GPTProvider>
  );
};

const Component = () => {
  return (
    <div>
      <h1>Fixed size ad slot</h1>
      <p>This ad slot will display an ad sized 300x250.</p>
      <div
        style={{
          border: 'solid',
          width: '100%',
        }}
      >
        <GPTSlot
          adUnit="Travel/Europe/France/Paris"
          slotId="banner-ad"
          sizes={UNIT_SIZE.MPU_300}
        />
      </div>
      <h1>Multi-size ad slot</h1>
      <p>
        This ad slot will display an ad with any of the following dimensions:
        300x250, 728x90, 750x200.
      </p>
      <div
        style={{
          border: 'solid',
          width: '100%',
        }}
      >
        <GPTSlot
          adUnit="Travel/Europe"
          slotId="multi-size-ad"
          sizes={[UNIT_SIZE.MPU_300, UNIT_SIZE.LEADERBOARD, [750, 200]]}
        />
      </div>
      <h1>Fluid ad slot</h1>
      <p>
        This ad slot will resize its height to fit the creative content being
        displayed. For this example, the slot is limited to 50% of the width of
        its parent container.
      </p>
      <div
        style={{
          border: 'solid',
          width: '100%',
        }}
      >
        <div id="native-ad" className="ad-slot native-slot"></div>
        <GPTSlot
          adUnit="Travel/Europe"
          slotId="native-ad"
          sizes={UNIT_SIZE.FLUID}
        />
      </div>
      <h1>Responsive ad slot</h1>
      <p>
        This ad slot will display different sized ads depending on the size of
        the browser viewport at page load time:
      </p>
      <ul>
        <li>
          When viewport &gt;= 1024x768, ads sized 750x200 or 728x90 may be
          displayed.
        </li>
        <li>
          When 1024x768 &gt; viewport &gt;= 640x480, ads sized 300x250 may be
          displayed.
        </li>
        <li>When viewport &lt; 640x480, no ads may be displayed.</li>
      </ul>
      <div
        style={{
          border: 'solid',
          width: '100%',
        }}
      >
        <GPTSlot
          adUnit="Travel/Europe"
          slotId="responsive-ad"
          sizes={[UNIT_SIZE.MPU_300, UNIT_SIZE.LEADERBOARD, [750, 200]]}
          sizeMapping={[
            {
              viewport: [1024, 768],
              sizes: [[750, 200], UNIT_SIZE.LEADERBOARD],
            },
            {
              viewport: [640, 480],
              sizes: UNIT_SIZE.MPU_300,
            },
            {
              viewport: [0, 0],
              sizes: UNIT_SIZE.BLANK,
            },
          ]}
        />
      </div>
    </div>
  );
};

export { AdSizes };
