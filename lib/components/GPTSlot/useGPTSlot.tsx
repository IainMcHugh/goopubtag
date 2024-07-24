import { type CSSProperties, useEffect } from "react";

import type { Slot } from "../../types";
import { gtag } from "../../utils/gtag";
import { useGPTContext } from "../GPTProvider/GPTProvider";
import type { UseGPTSlotProps } from "./GPTSlot.type";

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
	const { networkId, units, isLoaded, addUnit } = useGPTContext();
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
					if (onSlotLoad) gtag.handleSlotLoad(onSlotLoad);
					if (onSlotRequested) gtag.handleSlotRequested(onSlotRequested);
					if (onSlotIsViewable) gtag.handleSlotIsViewable(onSlotIsViewable);
					if (onSlotRenderEnded) gtag.handleSlotRenderEnded(onSlotRenderEnded);

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
	}, [
		isLoaded,
		outOfPage,
		targetingArguments,
		sizeMapping,
		slotId,
		adUnitPath,
		fallback,
		sizes,
		addUnit,
		onSlotLoad,
		onSlotRequested,
		onSlotIsViewable,
		onSlotRenderEnded,
		units,
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
