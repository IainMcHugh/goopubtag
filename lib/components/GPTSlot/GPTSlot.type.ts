import type { SlotUnit, UnitTargeting } from "../../types";

export type GPTSlotProps<A extends UnitTargeting = UnitTargeting> =
	SlotUnit<A> & {
		className?: string;
	};

export type UseGPTSlotProps = GPTSlotProps;
