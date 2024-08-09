/**
 * This file is for wrapper functions of googletag object functions
 */

import type {
	Collapse,
	LazyLoad,
	Mapping,
	OutOfPage,
	PrivacySettings,
	RewardedOnCloseEvent,
	RewardedOnGrantedEvent,
	RewardedOnReadyEvent,
	Sizes,
	Slot,
	SlotLoadEvent,
	SlotRenderEndedEvent,
	SlotRequestEvent,
	SlotViewableEvent,
} from "../types";

const init = (): void => {
	window.googletag = window.googletag || ({} as unknown as GoogleTag);
	window.googletag.cmd = window.googletag.cmd || [];
};

const push = (fn: () => void): void => {
	window.googletag?.cmd.push(fn);
};

const collapse = (): void => {
	window.googletag?.pubads().collapseEmptyDivs();
};

const expand = (): void => {
	window.googletag?.pubads().collapseEmptyDivs(true);
};

const getTopAnchor = (): number | null => {
	return window.googletag?.enums.OutOfPageFormat.TOP_ANCHOR || null;
};

const getBottomAnchor = (): number | null => {
	return window.googletag?.enums.OutOfPageFormat.BOTTOM_ANCHOR || null;
};

const getLeftSideRail = (): number | null => {
	return window.googletag?.enums.OutOfPageFormat.LEFT_SIDE_RAIL || null;
};

const getRightSideRail = (): number | null => {
	return window.googletag?.enums.OutOfPageFormat.RIGHT_SIDE_RAIL || null;
};

const getRewarded = (): number | null => {
	return window.googletag?.enums.OutOfPageFormat.REWARDED || null;
};

const getOutOfPageSlotId = (outOfPage: OutOfPage): number | null => {
	switch (outOfPage.type) {
		case "anchor": {
			if (outOfPage.settings.position === "top") {
				return getTopAnchor();
			}
			if (outOfPage.settings.position === "bottom") {
				return getBottomAnchor();
			}
			return null;
		}
		case "rewarded": {
			return getRewarded();
		}

		case "rail": {
			if (outOfPage.settings.position === "left") {
				return getLeftSideRail();
			}
			if (outOfPage.settings.position === "right") {
				return getRightSideRail();
			}
			return null;
		}

		default: {
			return null;
		}
	}
};

const createOutOfPageSlot = (
	adUnitPath: string,
	variant: number | null,
): Slot | null => {
	return window.googletag?.defineOutOfPageSlot(adUnitPath, variant) || null;
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

const handleRewardedSlotReady = (
	onSlotReady: (event: RewardedOnReadyEvent) => void,
): void => {
	window.googletag?.pubads().addEventListener("rewardedSlotReady", onSlotReady);
};

const handleRewardedSlotClosed = (
	onSlotClosed: (event: RewardedOnCloseEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.addEventListener("rewardedSlotClosed", onSlotClosed);
};

const handleRewardedSlotGranted = (
	onSlotGranted: (event: RewardedOnGrantedEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.addEventListener("rewardedSlotGranted", onSlotGranted);
};

const removeRewardedSlotReady = (
	onSlotReady: (event: RewardedOnReadyEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.removeEventListener("rewardedSlotReady", onSlotReady);
};

const removeRewardedSlotClosed = (
	onSlotClosed: (event: RewardedOnCloseEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.removeEventListener("rewardedSlotClosed", onSlotClosed);
};

const removeRewardedSlotGranted = (
	onSlotGranted: (event: RewardedOnGrantedEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.removeEventListener("rewardedSlotGranted", onSlotGranted);
};

const handleSlotLoad = (onSlotLoad: (event: SlotLoadEvent) => void): void => {
	window.googletag?.pubads().addEventListener("slotOnload", onSlotLoad);
};

const handleSlotRequested = (
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

const removeSlotLoad = (onSlotLoad: (event: SlotLoadEvent) => void): void => {
	window.googletag?.pubads().removeEventListener("slotOnload", onSlotLoad);
};

const removeSlotRequested = (
	onSlotRequested: (event: SlotRequestEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.removeEventListener("slotRequested", onSlotRequested);
};

const removeSlotIsViewable = (
	onSlotIsViewable: (event: SlotViewableEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.removeEventListener("impressionViewable", onSlotIsViewable);
};

const removeSlotRenderEnded = (
	onSlotRenderEnded: (event: SlotRenderEndedEvent) => void,
): void => {
	window.googletag
		?.pubads()
		.removeEventListener("slotRenderEnded", onSlotRenderEnded);
};

const enableServices = (): void => {
	window.googletag?.enableServices();
};

const enableService = (slotId: string): void => {
	enableServices();
	window?.googletag?.display(slotId);
};

const enableOutOfPageService = (slot: Slot): void => {
	enableServices();
	window?.googletag?.display(slot);
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
	init,
	push,
	getAdUnitPath,
	getTopAnchor,
	getBottomAnchor,
	getLeftSideRail,
	getRightSideRail,
	getRewarded,
	getOutOfPageSlotId,
	getMapping,
	createSlot,
	createOutOfPageSlot,
	handleFallback,
	handleRewardedSlotReady,
	handleRewardedSlotClosed,
	handleRewardedSlotGranted,
	removeRewardedSlotReady,
	removeRewardedSlotClosed,
	removeRewardedSlotGranted,
	handleSlotLoad,
	handleSlotRequested,
	handleSlotIsViewable,
	handleSlotRenderEnded,
	removeSlotLoad,
	removeSlotRequested,
	removeSlotIsViewable,
	removeSlotRenderEnded,
	setTargeting,
	setPrivacySettings,
	clearTargeting,
	refresh,
	addService,
	enableService,
	enableOutOfPageService,
	enableSingleRequest,
	enableLazyLoad,
};
