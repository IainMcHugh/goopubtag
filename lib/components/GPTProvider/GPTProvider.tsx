import { createContext, useContext, useMemo } from "react";

import type { Attributes } from "../../types";
import { GPTDev } from "../GPTDevIcon/GPTDev";
import type {
	GPTProviderProps,
	GPTContext as TGPTContext,
} from "./GPTProvider.type";
import { useGPTProvider } from "./useGPTProvider";

const GPTContext = createContext<TGPTContext>({} as TGPTContext);

/**
 * The `GPTProvider` is required to initialize GPT as well as for rendering `GPTSlots` in the DOM.
 * `GPTSlot` must be nested within a `GPTProvider`.
 * @param props Initial GPT Provider props
 * @returns
 */
const GPTProvider = <PageAttributes extends Attributes>(
	props: GPTProviderProps<PageAttributes>,
) => {
	const { children, ...rest } = props;
	const goopub = useGPTProvider(rest);
	const memoized = useMemo(() => goopub, [goopub]);
	return (
		<GPTContext.Provider value={{ ...rest, ...memoized }}>
			{children}
			{rest.debug && <GPTDev />}
		</GPTContext.Provider>
	);
};

const useGPTContext = () => useContext(GPTContext);

export { GPTProvider, useGPTContext };
