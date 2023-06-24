import { createContext, useContext } from 'react';

import type { GPTContext, GPTProviderProps } from '../types';
import { useGPTProviderInternal } from '../hooks/useGPTProviderInternal';
import { GPTDev } from '../components/GPTDev';

const GPTContext = createContext<GPTContext>({} as GPTContext);

const GPTProvider = (props: GPTProviderProps) => {
  const { children, ...gpt } = props;
  const rest = useGPTProviderInternal(gpt);
  return (
    <GPTContext.Provider value={{ ...gpt, ...rest }}>
      {children}
      {gpt.debug && <GPTDev />}
    </GPTContext.Provider>
  );
};

const useGPTContext = () => useContext(GPTContext);

export { GPTProvider, useGPTContext };
