import type { GPTSlotProps } from './components/GPTSlot/GPTSlot.type';
import type { GPTProviderProps } from './components/GPTProvider/GPTProvider.type';
import type {
  SlotLoadEvent,
  SlotViewableEvent,
  SlotRenderEndedEvent,
  Sizes,
  Size,
} from './types';

import { GPTProvider } from './components/GPTProvider/GPTProvider';
import { GPTSlot } from './components/GPTSlot/GPTSlot';
import { useGPT } from './hooks/useGPT/useGPT';
import { GUIDELINES } from './constants/guidelines';

export type {
  GPTSlotProps,
  GPTProviderProps,
  SlotLoadEvent,
  SlotViewableEvent,
  SlotRenderEndedEvent,
  Sizes,
  Size,
};
export { GPTProvider, GPTSlot, useGPT, GUIDELINES };
