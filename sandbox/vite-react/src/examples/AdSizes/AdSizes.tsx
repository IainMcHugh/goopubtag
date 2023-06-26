import { GPTProvider, GPTSlot } from '../../../../../index';

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
      <p>Display test ad</p>
      <h1>Fixed size ad slot</h1>
      <p>This ad slot will display an ad sized 300x250.</p>
      <div
        style={{
          border: 'solid',
          width: '100%',
        }}
      >
        {/* <div id="fixed-size-ad" className="ad-slot"></div> */}
        <GPTSlot slotId="fixed-size-ad" sizes={[300, 250]} />
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
        {/* <div id="multi-size-ad" className="ad-slot"></div> */}
        <GPTSlot
          slotId="multi-size-ad"
          sizes={[
            [300, 250],
            [728, 90],
            [750, 200],
          ]}
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
        <div id="responsive-ad" className="ad-slot"></div>
      </div>
    </div>
  );
};

export { AdSizes };
