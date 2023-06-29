import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DisplayTestAd } from './examples/DisplayTestAd/DisplayTestAd';
import { KeyValueTargeting } from './examples/KeyValueTargeting/KeyValueTargeting';
import { Refresh } from './examples/Refresh/Refresh';
import { AdSizes } from './examples/AdSizes/AdSizes';

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
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
