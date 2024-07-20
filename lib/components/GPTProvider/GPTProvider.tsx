import { createContext, useContext } from "react";

import type { Attributes } from "../../types";
import { GPTDev } from "../GPTDevIcon/GPTDev";
import type {
	GPTProviderProps,
	GPTContext as TGPTContext,
} from "./GPTProvider.type";
import { useGPTProvider } from "./useGPTProvider";

const GPTContext = createContext<TGPTContext<any>>({} as TGPTContext<any>);

/**
 * The `GPTProvider` is required to initialize GPT as well as for rendering `GPTSlots` in the DOM.
 * `GPTSlot` must be nested within a `GPTProvider`.
 * @param props Initial GPT Provider props
 * @returns
 */
const GPTProvider = <PageAttributes extends Attributes>(
	props: GPTProviderProps<PageAttributes>,
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
