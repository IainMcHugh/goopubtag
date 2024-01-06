import type { SlotUnit, UnitTargeting } from '../../types';

export type GPTSlotProps<A extends UnitTargeting = UnitTargeting> = SlotUnit<A>;

export type UseGPTSlotProps = GPTSlotProps & { isLoaded: boolean };
