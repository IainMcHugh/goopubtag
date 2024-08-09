import type { GPTProviderProps } from "./components/GPTProvider/GPTProvider.type";
import type { GPTSlotProps } from "./components/GPTSlot/GPTSlot.type";
import type {
	Size,
	Sizes,
	SlotLoadEvent,
	SlotRequestEvent,
	SlotRenderEndedEvent,
	SlotViewableEvent,
	RewardedOnReadyEvent,
	RewardedOnGrantedEvent,
} from "./types";

import { GPTProvider } from "./components/GPTProvider/GPTProvider";
import { GPTSlot } from "./components/GPTSlot/GPTSlot";
import { GUIDELINES } from "./constants/guidelines";
import { useGPT } from "./hooks/useGPT/useGPT";

export type {
	GPTSlotProps,
	GPTProviderProps,
	SlotLoadEvent,
	SlotRequestEvent,
	SlotViewableEvent,
	SlotRenderEndedEvent,
	RewardedOnReadyEvent,
	RewardedOnGrantedEvent,
	Sizes,
	Size,
};
export { GPTProvider, GPTSlot, useGPT, GUIDELINES };
