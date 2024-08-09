import { type CSSProperties, useEffect, useRef } from "react";

import type { Slot } from "../../types";
import { gtag } from "../../utils/gtag";
import { useGPTContext } from "../GPTProvider/GPTProvider";
import type { UseGPTSlotProps } from "./GPTSlot.type";
import type { Unit } from "../GPTProvider/GPTProvider.type";
import { subscribe, unsubscribe } from "../../utils/events";

const useGPTSlot = (props: UseGPTSlotProps) => {
	const {
		adUnit,
		sizes,
		sizeMapping,
		slotId,
		targetingArguments,
		onSlotLoad,
		onSlotRequested,
		onSlotIsViewable,
		onSlotRenderEnded,
		fallback = "default",
	} = props;
	const { networkId, units, lazyLoad, singleRequest, addUnit } =
		useGPTContext();
	const adUnitPath = gtag.getAdUnitPath(networkId, adUnit);
	const unitRef = useRef<Unit>();

	useEffect(() => {
		gtag.init();
		gtag.push(() => {
			let unit: Slot | null = null;
			const isAlreadyDefined =
				unitRef.current || units?.find((u) => u.slotId === slotId);

			if (!isAlreadyDefined) {
				unit = gtag.createSlot(adUnitPath, sizes, slotId);

				if (unit !== null) {
					if (sizeMapping) {
						const mappingBuilder = gtag.getMapping();
						for (const { viewport, sizes } of sizeMapping) {
							mappingBuilder.addSize(viewport, sizes);
						}
						const mapping = mappingBuilder.build();
						unit.defineSizeMapping(mapping);
					}

					if (targetingArguments) {
						for (const targetingKey of Object.keys(targetingArguments)) {
							unit.setTargeting(targetingKey, targetingArguments[targetingKey]);
						}
					}
					if (lazyLoad !== undefined) {
						gtag.enableLazyLoad(lazyLoad);
					}

					if (onSlotLoad) {
						subscribe("slot_load", (event) => {
							const id = event.slot.getSlotElementId();
							if (id === slotId) onSlotLoad(event);
						});
					}
					if (onSlotRequested) {
						subscribe("slot_requested", (event) => {
							const id = event.slot.getSlotElementId();
							if (id === slotId) onSlotRequested(event);
						});
					}
					if (onSlotIsViewable) {
						subscribe("impression_viewable", (event) => {
							const id = event.slot.getSlotElementId();
							if (id === slotId) onSlotIsViewable(event);
						});
					}
					if (onSlotRenderEnded) {
						subscribe("slot_render_ended", (event) => {
							const id = event.slot.getSlotElementId();
							if (id === slotId) onSlotRenderEnded(event);
						});
					}

					if (fallback && fallback !== "default") {
						switch (fallback) {
							case "expand": {
								unit.setCollapseEmptyDiv(true, true);
								break;
							}
							case "expand_strict": {
								unit.setCollapseEmptyDiv(false);
								break;
							}
							case "collapse": {
								unit.setCollapseEmptyDiv(true);
								break;
							}
							default:
								break;
						}
					}
					unitRef.current = { slotId, unit };
					slotId && addUnit({ slotId, unit });
					if (singleRequest) {
						gtag.enableSingleRequest();
					}
					gtag.enableService(slotId);
				}
			}
		});

		return () => {
			/** Cleanup */
			if (onSlotLoad) unsubscribe("slot_load", onSlotLoad);
			if (onSlotRequested) unsubscribe("slot_requested", onSlotRequested);
			if (onSlotIsViewable)
				unsubscribe("impression_viewable", onSlotIsViewable);
			if (onSlotRenderEnded)
				unsubscribe("slot_render_ended", onSlotRenderEnded);
		};
	}, [
		targetingArguments,
		sizeMapping,
		slotId,
		adUnitPath,
		fallback,
		sizes,
		units,
		lazyLoad,
		singleRequest,
		addUnit,
		onSlotLoad,
		onSlotRequested,
		onSlotIsViewable,
		onSlotRenderEnded,
	]);

	const getStyle = (): CSSProperties => {
		if (!sizes) return {};
		if (typeof sizes === "string") {
			return {
				width: "100%",
			};
		}
		if (Array.isArray(sizes[0])) {
			// TODO: going to depend on the viewport - this is wrong
			return {
				width: "100%",
			};
		}
		return {
			width: `${sizes[0] as number}px`,
			height: `${sizes[1] as number}px`,
		};
	};
	return { style: getStyle() };
};

export { useGPTSlot };
