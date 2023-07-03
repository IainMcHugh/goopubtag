import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DisplayTestAd } from './examples/DisplayTestAd/DisplayTestAd';
import { KeyValueTargeting } from './examples/KeyValueTargeting/KeyValueTargeting';
import { Refresh } from './examples/Refresh/Refresh';
import { AdSizes } from './examples/AdSizes/AdSizes';
import { DisplayLimitedAd } from './examples/DisplayLimitedAd/DisplayLimitedAd';
import { ConfigurePrivacy } from './examples/ConfigurePrivacy/ConfigurePrivacy';
import { AdEventListeners } from './examples/AdEventListeners/AdEventListeners';
import { CollapseEmptyAdSlots } from './examples/CollapseEmptyAdSlots/CollapseEmptyAdSlots';
import { DisplayOutOfPageAd } from './examples/DisplayOutOfPageAd/DisplayOutOfPageAd';
import { DisplayAnchorAd } from './examples/DisplayAnchorAd/DisplayAnchorAd';
import { DisplayRewardedAd } from './examples/DisplayRewardedAd/DisplayRewardedAd';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/examples/display-test-ad',
    element: <DisplayTestAd />,
  },
  {
    path: '/examples/key-value-targeting',
    element: <KeyValueTargeting />,
  },
  {
    path: '/examples/refresh',
    element: <Refresh />,
  },
  {
    path: '/examples/ad-sizes',
    element: <AdSizes />,
  },
  {
    path: '/examples/display-limited-ad',
    element: <DisplayLimitedAd />,
  },
  {
    path: '/examples/configure-privacy',
    element: <ConfigurePrivacy />,
  },
  {
    path: '/examples/ad-event-listeners',
    element: <AdEventListeners />,
  },
  {
    path: '/examples/collapse-empty-ad-slots',
    element: <CollapseEmptyAdSlots />,
  },
  {
    path: '/examples/display-out-of-page-ad',
    element: <DisplayOutOfPageAd />,
  },
  {
    path: '/examples/display-anchor-ad',
    element: <DisplayAnchorAd />,
  },
  {
    path: '/examples/display-rewarded-ad',
    element: <DisplayRewardedAd />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
