import {
	type Mock,
	afterEach,
	beforeEach,
	describe,
	it,
	expect,
	vi,
} from "vitest";
import { mockGoogleTag } from "tests/mocks/googletag.mock";

import type { Mapping, OutOfPage, Slot } from "lib/types";
import { gtag } from "lib/utils/gtag";
import { mockUnit } from "tests/mocks/unit.mock";

describe("Unit | Gtag", () => {
	beforeEach(() => {
		window.googletag = mockGoogleTag;
	});

	afterEach(() => {
		// biome-ignore lint/performance/noDelete: Not relevant for unit test
		delete window.googletag;
	});
	it("should initialize googletag", () => {
		gtag.init();
		expect(window.googletag).toBeDefined();
		expect(window.googletag?.cmd).toBeDefined();
	});

	it("should push a function to googletag.cmd", () => {
		const fn = vi.fn();
		gtag.push(fn);
		expect(window.googletag?.cmd).toContain(fn);
	});

	it("should return top anchor", () => {
		const topAnchor = gtag.getTopAnchor();
		expect(topAnchor).toBeNull();
	});

	it("should return bottom anchor", () => {
		const bottomAnchor = gtag.getBottomAnchor();
		expect(bottomAnchor).toBe(1);
	});

	it("should return left rail", () => {
		const bottomAnchor = gtag.getLeftSideRail();
		expect(bottomAnchor).toBe(3);
	});

	it("should return right rail", () => {
		const bottomAnchor = gtag.getRightSideRail();
		expect(bottomAnchor).toBe(4);
	});

	it("should return rewarded", () => {
		const rewarded = gtag.getRewarded();
		expect(rewarded).toBe(2);
	});

	it("should get out of page slot id for anchor", () => {
		const outOfPage: OutOfPage = {
			type: "anchor",
			settings: { position: "bottom" },
		};
		const slotId = gtag.getOutOfPageSlotId(outOfPage);
		expect(slotId).toBe(1);
	});

	it("should get out of page slot id for rewarded", () => {
		const outOfPage: OutOfPage = { type: "rewarded", settings: {} };
		const slotId = gtag.getOutOfPageSlotId(outOfPage);
		expect(slotId).toBe(2);
	});

	it("should create out of page slot", () => {
		const slot = gtag.createOutOfPageSlot("/1234/adunit", 1);
		expect(slot).toBeTruthy();
		expect(window.googletag?.defineOutOfPageSlot).toHaveBeenCalledWith(
			"/1234/adunit",
			1,
		);
	});

	it("should handle rewarded slot ready", () => {
		const onRewardSlotReady = vi.fn();
		gtag.handleRewardedSlotReady(onRewardSlotReady);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"rewardedSlotReady",
			onRewardSlotReady,
		);
	});

	it("should handle rewarded slot closed", () => {
		const onRewardSlotClosed = vi.fn();
		gtag.handleRewardedSlotClosed(onRewardSlotClosed);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"rewardedSlotClosed",
			onRewardSlotClosed,
		);
	});

	it("should handle rewarded slot granted", () => {
		const onRewardSlotGranted = vi.fn();
		gtag.handleRewardedSlotGranted(onRewardSlotGranted);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"rewardedSlotGranted",
			onRewardSlotGranted,
		);
	});

	it("should handle remove rewarded slot ready", () => {
		const onRewardSlotReady = vi.fn();
		gtag.removeRewardedSlotReady(onRewardSlotReady);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"rewardedSlotReady",
			onRewardSlotReady,
		);
	});

	it("should handle remove rewarded slot closed", () => {
		const onRewardSlotClosed = vi.fn();
		gtag.removeRewardedSlotClosed(onRewardSlotClosed);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"rewardedSlotClosed",
			onRewardSlotClosed,
		);
	});

	it("should handle remove rewarded slot granted", () => {
		const onRewardSlotGranted = vi.fn();
		gtag.removeRewardedSlotGranted(onRewardSlotGranted);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"rewardedSlotGranted",
			onRewardSlotGranted,
		);
	});

	it("should handle fallback collapse", () => {
		gtag.handleFallback("collapse");
		expect(window.googletag?.pubads().collapseEmptyDivs).toHaveBeenCalled();
	});

	it("should handle fallback expand", () => {
		gtag.handleFallback("expand");
		expect(window.googletag?.pubads().collapseEmptyDivs).toHaveBeenCalledWith(
			true,
		);
	});

	it("should set targeting", () => {
		gtag.setTargeting("key", "value");
		expect(window.googletag?.pubads().setTargeting).toHaveBeenCalledWith(
			"key",
			"value",
		);
	});

	it("should clear targeting with key", () => {
		gtag.clearTargeting("key");
		expect(window.googletag?.pubads().clearTargeting).toHaveBeenCalledWith(
			"key",
		);
	});

	it("should clear targeting without key", () => {
		gtag.clearTargeting();
		expect(window.googletag?.pubads().clearTargeting).toHaveBeenCalled();
	});

	it("should add service", () => {
		const unit: Slot = {
			collapseEmptyDivs: vi.fn(),
			addEventListener: vi.fn(),
			clearTargeting: vi.fn(),
			setPrivacySettings: vi.fn(),
			refresh: vi.fn(),
			addService: vi.fn(),
			defineSizeMapping: vi.fn(),
			setCollapseEmptyDiv: vi.fn(),
			setTargeting: vi.fn(),
		};
		gtag.addService(unit);
		expect(unit.addService).toHaveBeenCalledWith(window.googletag?.pubads());
	});

	it("should get ad unit path", () => {
		const path = gtag.getAdUnitPath(1234, "adunit");
		expect(path).toBe("/1234/adunit");
	});

	it("should set privacy settings", () => {
		const privacySettings = { restrictDataProcessing: true };
		gtag.setPrivacySettings(privacySettings);
		expect(window.googletag?.pubads().setPrivacySettings).toHaveBeenCalledWith(
			privacySettings,
		);
	});

	it("should refresh ad slots", () => {
		gtag.refresh(["slot1", "slot2"]);
		expect(window.googletag?.pubads().refresh).toHaveBeenCalledWith([
			"slot1",
			"slot2",
		]);
	});

	it("should refresh without ad slots", () => {
		gtag.refresh();
		expect(window.googletag?.pubads().refresh).toHaveBeenCalled();
	});

	it("should create slot", () => {
		const slot = gtag.createSlot("/1234/adunit", [[300, 250]], "slot1");
		expect(slot).toBeTruthy();
		expect(window.googletag?.defineSlot).toHaveBeenCalledWith(
			"/1234/adunit",
			[[300, 250]],
			"slot1",
		);
		if (slot) {
			expect(slot.addService).toHaveBeenCalledWith(window.googletag?.pubads());
		}
	});

	it("should get mapping", () => {
		const mapping: Mapping = {
			addSize: vi.fn(),
			build: vi.fn(),
		};
		(window.googletag?.sizeMapping as Mock).mockReturnValue(mapping);
		const result = gtag.getMapping();
		expect(result).toBe(mapping);
	});

	it("should handle slot load", () => {
		const onSlotLoad = vi.fn();
		gtag.handleSlotLoad(onSlotLoad);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"slotOnload",
			onSlotLoad,
		);
	});

	it("should handle slot requested", () => {
		const onSlotRequested = vi.fn();
		gtag.handleSlotRequested(onSlotRequested);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"slotRequested",
			onSlotRequested,
		);
	});

	it("should handle slot is viewable", () => {
		const onSlotIsViewable = vi.fn();
		gtag.handleSlotIsViewable(onSlotIsViewable);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"impressionViewable",
			onSlotIsViewable,
		);
	});

	it("should handle slot render ended", () => {
		const onSlotRenderEnded = vi.fn();
		gtag.handleSlotRenderEnded(onSlotRenderEnded);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"slotRenderEnded",
			onSlotRenderEnded,
		);
	});

	it("should handle remove slot load", () => {
		const onSlotLoad = vi.fn();
		gtag.removeSlotLoad(onSlotLoad);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"slotOnload",
			onSlotLoad,
		);
	});

	it("should handle remove slot requested", () => {
		const onSlotRequested = vi.fn();
		gtag.removeSlotRequested(onSlotRequested);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"slotRequested",
			onSlotRequested,
		);
	});

	it("should handle remove slot is viewable", () => {
		const onSlotIsViewable = vi.fn();
		gtag.removeSlotIsViewable(onSlotIsViewable);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"impressionViewable",
			onSlotIsViewable,
		);
	});

	it("should handle remove slot render ended", () => {
		const onSlotRenderEnded = vi.fn();
		gtag.removeSlotRenderEnded(onSlotRenderEnded);
		expect(window.googletag?.pubads().removeEventListener).toHaveBeenCalledWith(
			"slotRenderEnded",
			onSlotRenderEnded,
		);
	});

	it("should enable service and display slot", () => {
		gtag.enableService("slot1");
		expect(window.googletag?.enableServices).toHaveBeenCalled();
		expect(window.googletag?.display).toHaveBeenCalledWith("slot1");
	});

	it("should enable out of page services", () => {
		gtag.enableOutOfPageService(mockUnit.unit);
		expect(window.googletag?.enableServices).toHaveBeenCalled();
		expect(window.googletag?.display).toHaveBeenCalledWith(mockUnit.unit);
	});

	it("should enable single request", () => {
		gtag.enableSingleRequest();
		expect(window.googletag?.pubads().enableSingleRequest).toHaveBeenCalled();
	});

	it("should enable lazy load with boolean", () => {
		gtag.enableLazyLoad(true);
		expect(window.googletag?.pubads().enableLazyLoad).toHaveBeenCalled();
	});

	it("should enable lazy load with config", () => {
		const mockConfig = {
			fetchMarginPercent: 1,
			mobileScaling: 1,
			renderMarginPercent: 1,
		};
		gtag.enableLazyLoad(mockConfig);
		expect(window.googletag?.pubads().enableLazyLoad).toHaveBeenCalledWith(
			mockConfig,
		);
	});
});
