import { createContext, useContext } from 'react';

import type { GPTContext, GPTProviderProps } from './GPTProvider.type';
import { useGPTProvider } from './useGPTProvider';
import { GPTDev } from '../GPTDevIcon/GPTDev';
import { Attributes } from '../../types';

const GPTContext = createContext<GPTContext<any>>({} as GPTContext<any>);

/**
 * The `GPTProvider` is required to initialize GPT as well as for rendering `GPTSlots` in the DOM.
 * `GPTSlot` must be nested within a `GPTProvider`.
 * @param props Initial GPT Provider props
 * @returns
 */
const GPTProvider = <PageAttributes extends Attributes>(
  props: GPTProviderProps<PageAttributes>
) => {
  const { children, ...passedProps } = props;
  const computedProps = useGPTProvider(passedProps);
  return (
    <GPTContext.Provider value={{ ...passedProps, ...computedProps }}>
      {children}
      {passedProps.debug && <GPTDev />}
    </GPTContext.Provider>
  );
};

const useGPTContext = () => useContext(GPTContext);

export { GPTProvider, useGPTContext };
