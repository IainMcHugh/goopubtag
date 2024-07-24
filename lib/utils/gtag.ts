/**
 * This file is for wrapper functions of googletag object functions
 */

import type {
	Collapse,
	LazyLoad,
	Mapping,
	OutOfPage,
	PrivacySettings,
	Sizes,
	Slot,
	SlotLoadEvent,
	SlotRenderEndedEvent,
	SlotRequestEvent,
	SlotViewableEvent,
} from "../types";

const push = (fn: () => void): void => {
	window.googletag?.cmd.push(fn);
};

const collapse = (): void => {
	window.googletag?.pubads().collapseEmptyDivs();
};

const expand = (): void => {
	window.googletag?.pubads().collapseEmptyDivs(true);
};

const getTopAnchor = (): string | null => {
	return window.googletag?.enums.OutOfPageFormat.TOP_ANCHOR || null;
};

const getBottomAnchor = (): string | null => {
	return window.googletag?.enums.OutOfPageFormat.BOTTOM_ANCHOR || null;
};

const getRewarded = (): string | null => {
	return window.googletag?.enums.OutOfPageFormat.REWARDED || null;
};

const getOutOfPageSlotId = (outOfPage: OutOfPage): string | null => {
	switch (outOfPage.type) {
		case "anchor": {
			if (outOfPage.settings.position === "top") {
				return window.googletag?.enums.OutOfPageFormat.TOP_ANCHOR || null;
			}
			return window.googletag?.enums.OutOfPageFormat.BOTTOM_ANCHOR || null;
		}
		case "rewarded": {
			return window.googletag?.enums.OutOfPageFormat.REWARDED || null;
		}

		default: {
			return null;
		}
	}
};

const createOutOfPageSlot = (
	adUnitPath: string,
	slotId: string | null,
): Slot | null => {
	return (
		window.googletag
			?.defineOutOfPageSlot(adUnitPath, slotId)
			?.addService(window?.googletag?.pubads()) || null
	);
};

const handleRewarded = (outOfPage: OutOfPage): void => {
	if (outOfPage.type === "rewarded") {
		window.googletag
			?.pubads()
			.addEventListener("rewardedSlotReady", outOfPage.settings.onReady);

		window.googletag
			?.pubads()
			.addEventListener("rewardedSlotClosed", outOfPage.settings.onClosed);

		window.googletag
			?.pubads()
			.addEventListener("rewardedSlotGranted", outOfPage.settings.onGranted);
	}
};

const handleFallback = (fallback: Collapse): void => {
	if (fallback && fallback !== "default") {
		switch (fallback) {
			case "collapse": {
				collapse();
				break;
			}
			case "expand": {
				expand();
				break;
			}
			default: {
				break;
			}
		}
	}
};

const setTargeting = (k: string, v: string | string[]): void => {
	window.googletag?.pubads().setTargeting(k, v);
};

const clearTargeting = (key?: string): void => {
	if (key) window.googletag?.pubads().clearTargeting(key);
	else window.googletag?.pubads().clearTargeting();
};

const addService = (unit: Slot): void => {
	unit.addService(window.googletag?.pubads());
};

const getAdUnitPath = (networkId: number, adUnit?: string): string => {
	return `/${networkId}/${adUnit}`;
};

const setPrivacySettings = (
	privacySettings: Partial<PrivacySettings>,
): void => {
	window.googletag?.pubads().setPrivacySettings(privacySettings);
};

const refresh = (adSlots?: string[]): void => {
	if (adSlots) window.googletag?.pubads().refresh(adSlots);
	else window.googletag?.pubads().refresh();
};

const createSlot = (
	adUnitPath: string,
	sizes: Sizes,
	slotId: string,
): Slot | null => {
	return (
		window.googletag
			?.defineSlot(adUnitPath, sizes, slotId)
			?.addService(window.googletag?.pubads()) || null
	);
};

const getMapping = (): Mapping => window.googletag?.sizeMapping();

const handleSlotLoad = (onSlotLoad: (event: SlotLoadEvent) => void): void => {
	window.googletag?.pubads().addEventListener("slotOnload", onSlotLoad);
};

const handleSlotRequested = (
	// TODO: Fix event type
	onSlotRequested: (event: SlotRequestEvent) => void,
): void => {
	window.googletag?.pubads().addEventListener("slotRequested", onSlotRequested);
};

const handleSlotIsViewable = (
	onSlotIsViewable: (event: SlotViewableEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.addEventListener("impressionViewable", onSlotIsViewable);
};

const handleSlotRenderEnded = (
	onSlotRenderEnded: (event: SlotRenderEndedEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.addEventListener("slotRenderEnded", onSlotRenderEnded);
};

const enableService = (slotId: string): void => {
	window.googletag?.enableServices();
	window?.googletag?.display(slotId);
};

const enableSingleRequest = () => {
	window.googletag?.pubads().enableSingleRequest();
};

const enableLazyLoad = (lazyLoad: boolean | LazyLoad): void => {
	if (typeof lazyLoad === "boolean") {
		window.googletag?.pubads().enableLazyLoad();
	} else {
		window.googletag?.pubads().enableLazyLoad(lazyLoad);
	}
};

export const gtag = {
	push,
	getAdUnitPath,
	getTopAnchor,
	getBottomAnchor,
	getRewarded,
	getOutOfPageSlotId,
	getMapping,
	createSlot,
	createOutOfPageSlot,
	handleRewarded,
	handleFallback,
	handleSlotLoad,
	handleSlotRequested,
	handleSlotIsViewable,
	handleSlotRenderEnded,
	setTargeting,
	setPrivacySettings,
	clearTargeting,
	refresh,
	addService,
	enableService,
	enableSingleRequest,
	enableLazyLoad,
};
