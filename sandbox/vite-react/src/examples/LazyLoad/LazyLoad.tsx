import React from "react";
import { GPTProvider, GPTSlot } from "../../../../../dist";
import type { SlotLoadEvent, SlotRequestEvent } from "../../../../../dist";

const LazyLoad = () => {
	return (
		<GPTProvider
			networkId={6355419}
			debug={true}
			lazyLoad={{
				// Fetch slots within 5 viewports.
				fetchMarginPercent: 500,
				// Render slots within 2 viewports.
				renderMarginPercent: 200,
				// Double the above values on mobile, where viewports are smaller
				// and users tend to scroll faster.
				mobileScaling: 2.0,
			}}
		>
			<Component />
		</GPTProvider>
	);
};

const Component = () => {
	const onFirstRequested = (event: SlotRequestEvent) => {
		const id = event.slot.getSlotElementId();
		console.log(`${id} - fetched`);
	};
	const onFirstLoad = (event: SlotLoadEvent) => {
		const id = event.slot.getSlotElementId();
		console.log(`${id} - rendered`);
	};
	const onSecondRequested = (event: SlotRequestEvent) => {
		const id = event.slot.getSlotElementId();
		console.log(`${id} - fetched`);
	};
	const onSecondLoad = (event: SlotLoadEvent) => {
		const id = event.slot.getSlotElementId();
		console.log(`${id} - rendered`);
	};
	const onThirdRequested = (event: SlotRequestEvent) => {
		const id = event.slot.getSlotElementId();
		console.log(`${id} - fetched`);
	};
	const onThirdLoad = (event: SlotLoadEvent) => {
		const id = event.slot.getSlotElementId();
		console.log(`${id} - rendered`);
	};
	return (
		<div style={{ width: "100%", overflow: "hidden" }}>
			<p>Lazy load</p>
			<GPTSlot
				slotId="div-1"
				adUnit="Travel"
				sizes={[728, 90]}
				targetingArguments={{ test: "lazyload" }}
				onSlotLoad={onFirstLoad}
				onSlotRequested={onFirstRequested}
			/>
			<div style={{ height: "300vh", display: "block" }} />
			<GPTSlot
				slotId="div-2"
				adUnit="Travel"
				sizes={[728, 90]}
				targetingArguments={{ test: "lazyload" }}
				onSlotLoad={onSecondLoad}
				onSlotRequested={onSecondRequested}
			/>
			<div style={{ height: "900vh" }} />
			<GPTSlot
				slotId="div-3"
				adUnit="Travel"
				sizes={[728, 90]}
				targetingArguments={{ test: "lazyload" }}
				onSlotLoad={onThirdLoad}
				onSlotRequested={onThirdRequested}
			/>
			<div style={{ position: "fixed", top: 0, left: 0 }}>
				<table>
					<tbody>
						<tr>
							<th>Ad Slot</th>
							<th>Fetched?</th>
							<th>Rendered?</th>
						</tr>
						<tr>
							<td className="slot-name">Ad Slot 1</td>
							<td id="div-1-fetched">No</td>
							<td id="div-1-rendered">No</td>
						</tr>
						<tr>
							<td className="slot-name">Ad Slot 2</td>
							<td id="div-2-fetched">No</td>
							<td id="div-2-rendered">No</td>
						</tr>
						<tr>
							<td className="slot-name">Ad Slot 3</td>
							<td id="div-3-fetched">No</td>
							<td id="div-3-rendered">No</td>
						</tr>
					</tbody>
				</table>
				<p>Scroll the container below to lazily load the ad slots.</p>
			</div>
		</div>
	);
};

export { LazyLoad };
