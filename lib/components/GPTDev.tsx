const GPTDev = () => {
  const openConsole = () => {
    window.googletag?.openConsole();
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        padding: '16px',
        backgroundColor: 'rebeccapurple',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
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
        Open GPT console
      </button>
    </div>
  );
};

export { GPTDev };
