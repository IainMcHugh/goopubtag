import { GPTProvider } from '../../../../index';
import { DisplayTestAd } from './examples/DisplayTestAd/DisplayTestAd';
import { KeyValueTargeting } from './examples/KeyValueTargeting/KeyValueTargeting';

function App() {
  return (
    <GPTProvider
      networkId={6355419}
      targetingArguments={{ interests: 'basketball' }}
      debug={true}
    >
      <h1>Welcome to GPT React </h1>
      <h2>
        The following examples correspond to Google Publisher Tag examples
        listed{' '}
        <a href="https://github.com/googleads/google-publisher-tag-samples">
          here
        </a>
      </h2>
      <div>
        <DisplayTestAd />
        <br />
        <KeyValueTargeting />
      </div>
    </GPTProvider>
  );
}

export default App;
