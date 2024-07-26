import { type CSSProperties, useEffect } from "react";

import type { Slot } from "../../types";
import { gtag } from "../../utils/gtag";
import { useGPTContext } from "../GPTProvider/GPTProvider";
import type { UseGPTSlotProps } from "./GPTSlot.type";
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
		outOfPage = false,
	} = props;
	const { networkId, units, isLoaded, lazyLoad, addUnit } = useGPTContext();
	const adUnitPath = gtag.getAdUnitPath(networkId, adUnit);

	useEffect(() => {
		if (isLoaded) {
			gtag.push(() => {
				let unit: Slot | null = null;
				const isAlreadyDefined = units.find((u) => u.slotId === slotId);

				if (isAlreadyDefined) return;

				if (outOfPage) {
					unit = gtag.createOutOfPageSlot(adUnitPath, slotId);
				} else {
					unit = gtag.createSlot(adUnitPath, sizes, slotId);
				}
				if (unit !== null) {
					if (sizeMapping) {
						const mapping = gtag.getMapping();
						for (const { viewport, sizes } of sizeMapping) {
							mapping.addSize(viewport, sizes);
						}
						mapping.build();
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
					slotId && addUnit({ slotId, unit });
					gtag.enableService(slotId);
				}
			});
		}

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
		isLoaded,
		outOfPage,
		targetingArguments,
		sizeMapping,
		slotId,
		adUnitPath,
		fallback,
		sizes,
		units,
		lazyLoad,
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
