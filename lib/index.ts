import { GPTProvider } from './contexts/GPTProvider';
import { GPTSlot } from './components/GPTSlot';
import { useGPT } from './hooks/useGPT';
import { GUIDELINES } from './constants/guidelines';
import type {
  UseGPTProps,
  GPTSlotProps,
  GPTProviderProps,
  SlotLoadEvent,
  SlotViewableEvent,
  SlotRenderEndedEvent,
  Sizes,
} from './types';

export type {
  UseGPTProps,
  GPTSlotProps,
  GPTProviderProps,
  SlotLoadEvent,
  SlotViewableEvent,
  SlotRenderEndedEvent,
  Sizes,
};
export { GPTProvider, GPTSlot, useGPT, GUIDELINES };
