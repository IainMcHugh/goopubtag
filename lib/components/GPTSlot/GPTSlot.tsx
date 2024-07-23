import type { UnitTargeting } from "../../types";
import { useGPTContext } from "../GPTProvider/GPTProvider";
import type { GPTSlotProps } from "./GPTSlot.type";
import { useGPTSlot } from "./useGPTSlot";

/**
 * This is the Ad unit Element to be set in the DOM
 *
 * @param {GPTSlotProps} props
 * @returns {JSX.Element}
 */
const GPTSlot = <A extends UnitTargeting = UnitTargeting>(
	props: GPTSlotProps<A>,
): JSX.Element => {
	const { slotId, className } = props;
	const { isLoaded } = useGPTContext();
	const { style } = useGPTSlot({ ...props, isLoaded });
	return <div id={slotId} style={style} className={className} />;
};

export { GPTSlot };
