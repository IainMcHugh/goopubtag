import { GooPubTagIcon } from './GPTDevIcon';

const GPTDev = () => {
  const openConsole = () => {
    window.googletag?.openConsole();
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        width: '56px',
        height: '56px',
        padding: '4px 4px 0px 4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
        border: '1px dotted rebeccapurple',
        backgroundColor: '#66339933',
      }}
    >
      <button
        onClick={openConsole}
        style={{
          all: 'unset',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <GooPubTagIcon />
      </button>
    </div>
  );
};

export { GPTDev };
