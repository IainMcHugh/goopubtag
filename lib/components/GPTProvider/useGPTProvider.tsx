import { useCallback, useEffect, useState } from "react";

import type {
	Attributes,
	SlotLoadEvent,
	SlotProvider,
	SlotRenderEndedEvent,
	SlotRequestEvent,
	SlotViewableEvent,
} from "../../types";
import { getGPTScript } from "../../utils";
import { dispatchEvent } from "../../utils/events";
import { gtag } from "../../utils/gtag";
import type { Unit } from "./GPTProvider.type";

type UseGPTProvider = {
	units: Unit[];
	addUnit: (unit: Unit) => void;
};

const useGPTProvider = <PageAttributes extends Attributes>(
	props: SlotProvider<PageAttributes>,
): UseGPTProvider => {
	const [units, setUnits] = useState<Unit[]>([]);
	const [outOfPageUnits, setOutOfPageUnits] = useState<Unit[]>([]);
	const {
		networkId,
		limitedAds = false,
		fallback = "default",
		targetingArguments,
		outOfPage,
	} = props;

	const addOutOfPageUnit = useCallback(
		(unit: Unit) => setOutOfPageUnits((prev) => [...prev, unit]),
		[],
	);

	const addUnit = useCallback(
		(unit: Unit) => setUnits((prev) => [...prev, unit]),
		[],
	);

	const slotLoadEvent = useCallback((detail: SlotLoadEvent) => {
		dispatchEvent("slot_load", detail);
	}, []);

	const slotRequestedEventt = useCallback((detail: SlotRequestEvent) => {
		dispatchEvent("slot_requested", detail);
	}, []);

	const slotIsViewableEvent = useCallback((detail: SlotViewableEvent) => {
		dispatchEvent("impression_viewable", detail);
	}, []);

	const slotRenderEndedEvent = useCallback((detail: SlotRenderEndedEvent) => {
		dispatchEvent("slot_render_ended", detail);
	}, []);

	useEffect(() => {
		const gptScript = getGPTScript({ limitedAds });
		document.getElementsByTagName("head")[0].appendChild(gptScript);
	}, [limitedAds]);

	useEffect(() => {
		const isAlreadyDefined = outOfPageUnits.find(
			(u) => u.slotId === outOfPage?.type,
		);
		if (!isAlreadyDefined) {
			gtag.init();
			gtag.push(() => {
				if (outOfPage) {
					const outOfPageUnit = gtag.createOutOfPageSlot(
						gtag.getAdUnitPath(networkId, outOfPage.adUnit),
						gtag.getOutOfPageSlotId(outOfPage),
					);

					if (outOfPageUnit) {
						if (outOfPage.targetingArguments) {
							for (const targetingKey of Object.keys(
								outOfPage.targetingArguments,
							)) {
								outOfPageUnit.setTargeting(
									targetingKey,
									outOfPage.targetingArguments[targetingKey],
								);
							}
						}

						if (outOfPage.onSlotLoad) {
							gtag.handleSlotLoad(outOfPage.onSlotLoad);
						}

						if (outOfPage.onSlotRequested) {
							gtag.handleSlotRequested(outOfPage.onSlotRequested);
						}

						if (outOfPage.onSlotIsViewable) {
							gtag.handleSlotIsViewable(outOfPage.onSlotIsViewable);
						}

						if (outOfPage.onSlotRenderEnded) {
							gtag.handleSlotRenderEnded(outOfPage.onSlotRenderEnded);
						}

						if (outOfPage.type === "rewarded" && outOfPage.settings.onReady) {
							gtag.handleRewardedSlotReady(outOfPage.settings.onReady);
						}

						if (outOfPage.type === "rewarded" && outOfPage.settings.onClosed) {
							gtag.handleRewardedSlotClosed(outOfPage.settings.onClosed);
						}

						if (outOfPage.type === "rewarded" && outOfPage.settings.onGranted) {
							gtag.handleRewardedSlotGranted(outOfPage.settings.onGranted);
						}

						gtag.addService(outOfPageUnit);
						/**
						 * If static ads are also defined, we should wait for their display call instead.
						 */
						if (!outOfPage.withStaticAds) {
							gtag.enableOutOfPageService(outOfPageUnit);
						}
						addOutOfPageUnit({ slotId: outOfPage.type, unit: outOfPageUnit });
					}
				}

				if (targetingArguments) {
					for (const targetingKey of Object.keys(targetingArguments)) {
						gtag.setTargeting(targetingKey, targetingArguments[targetingKey]);
					}
				}

				gtag.handleSlotLoad(slotLoadEvent);
				gtag.handleSlotRequested(slotRequestedEventt);
				gtag.handleSlotIsViewable(slotIsViewableEvent);
				gtag.handleSlotRenderEnded(slotRenderEndedEvent);

				gtag.handleFallback(fallback);
			});
		}

		return () => {
			gtag.removeSlotLoad(slotLoadEvent);
			gtag.removeSlotRequested(slotRequestedEventt);
			gtag.removeSlotIsViewable(slotIsViewableEvent);
			gtag.removeSlotRenderEnded(slotRenderEndedEvent);
		};
	}, [
		fallback,
		outOfPage,
		targetingArguments,
		networkId,
		outOfPageUnits,
		addOutOfPageUnit,
		slotLoadEvent,
		slotRequestedEventt,
		slotIsViewableEvent,
		slotRenderEndedEvent,
	]);

	return {
		units,
		addUnit,
	};
};

export { useGPTProvider };
