import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to GPT React </h1>
      <h2>
        The following examples correspond to Google Publisher Tag examples
        listed
      </h2>
      <a href="https://github.com/googleads/google-publisher-tag-samples">
        here
      </a>
      <div>
        <Link to={'/examples/display-test-ad'}>Display test ad</Link>
        <br />
        <Link to={'/examples/key-value-targeting'}>Key value targeting</Link>
        <br />
        <Link to={'/examples/refresh'}>Refresh</Link>
        <br />
        <Link to={'/examples/ad-sizes'}>Ad sizes</Link>
      </div>
    </div>
  );
}

export default App;
