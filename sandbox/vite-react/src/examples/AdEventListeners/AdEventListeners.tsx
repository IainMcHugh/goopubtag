import React from "react";
import { GPTProvider, GPTSlot } from "../../../../../dist";
import type {
	SlotLoadEvent,
	SlotRenderEndedEvent,
	SlotViewableEvent,
} from "../../../../../dist";

const AdEventListeners = () => {
	return (
		<GPTProvider networkId={6355419} debug={true}>
			<Component />
		</GPTProvider>
	);
};

const Component = () => {
	const handleSlotLoad = (event: SlotLoadEvent) => {
		const slotId = event.slot.getSlotElementId();
		console.log(`${slotId} has fired it's on load event`);
	};

	const handleSlotIsViewable = (event: SlotViewableEvent) => {
		const slotId = event.slot.getSlotElementId();
		console.log(`${slotId} is now viewable`);
	};

	const handleSlotRenderEnded = (event: SlotRenderEndedEvent) => {
		const slotId = event.slot.getSlotElementId();
		console.log(`${slotId} is finished rendering`);
	};

	return (
		<div>
			<p>Ad Event Listeners</p>
			<GPTSlot
				slotId="banner-ad"
				adUnit="Travel/Europe/France/Paris"
				sizes={[300, 250]}
				onSlotLoad={handleSlotLoad}
				onSlotIsViewable={handleSlotIsViewable}
				onSlotRenderEnded={handleSlotRenderEnded}
			/>
		</div>
	);
};

export { AdEventListeners };
