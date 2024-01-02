import type { SlotUnit } from '../../types';

export type GPTSlotProps = SlotUnit;

export type GPTSlotInternalProps = GPTSlotProps & { isLoaded: boolean };
