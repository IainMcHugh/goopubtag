import type { SlotUnit, UnitTargeting } from "../../types";

export type GPTSlotProps<A extends UnitTargeting = UnitTargeting> =
	SlotUnit<A> & {
		className?: string;
		dataTestId?: string;
	};

export type UseGPTSlotProps = GPTSlotProps;
