import { createContext, useContext } from 'react';

import type { GPTContext, GPTProviderProps } from './GPTProvider.type';
import { useGPTProviderInternal } from './useGPTProviderInternal';
import { GPTDev } from '../GPTDevIcon/GPTDev';

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
