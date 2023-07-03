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
        <Link to={'/examples/display-test-ad'} reloadDocument>
          Display test ad
        </Link>
        <br />
        <Link to={'/examples/key-value-targeting'} reloadDocument>
          Key value targeting
        </Link>
        <br />
        <Link to={'/examples/refresh'} reloadDocument>
          Refresh
        </Link>
        <br />
        <Link to={'/examples/ad-sizes'} reloadDocument>
          Ad sizes
        </Link>
        <br />
        <Link to={'/examples/display-limited-ad'} reloadDocument>
          Display limited ad
        </Link>
        <br />
        <Link to={'/examples/configure-privacy'} reloadDocument>
          Configure privacy
        </Link>
        <br />
        <Link to={'/examples/ad-event-listeners'} reloadDocument>
          Ad event Listeners
        </Link>
        <br />
        <Link to={'/examples/collapse-empty-ad-slots'} reloadDocument>
          Collapse empty ad slots
        </Link>
        <br />
        <Link to={'/examples/display-out-of-page-ad'} reloadDocument>
          Display out of page ad
        </Link>
        <br />
      </div>
    </div>
  );
}

export default App;
