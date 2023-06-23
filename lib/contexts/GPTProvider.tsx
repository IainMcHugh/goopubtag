import { createContext, useContext } from 'react';

import type { GPTContext, GPTProviderProps } from '../types';
import { useGPTProviderInternal } from '../hooks/useGPTProviderInternal';
import { GPTDev } from '../components/GPTDev';

const GPTContext = createContext<GPTContext>({} as GPTContext);

const GPTProvider = (props: GPTProviderProps) => {
  const { children, ...GPT } = props;
  const { isLoaded } = useGPTProviderInternal(GPT);
  return (
    <GPTContext.Provider value={{ ...GPT, isLoaded }}>
      {children}
      {GPT.debug && <GPTDev />}
    </GPTContext.Provider>
  );
};

const useGPTContext = () => useContext(GPTContext);

export { GPTProvider, useGPTContext };
