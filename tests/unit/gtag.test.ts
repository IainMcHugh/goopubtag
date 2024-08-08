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
		expect(topAnchor).toBe("top-anchor");
	});

	it("should return bottom anchor", () => {
		const bottomAnchor = gtag.getBottomAnchor();
		expect(bottomAnchor).toBe("bottom-anchor");
	});

	it("should return rewarded", () => {
		const rewarded = gtag.getRewarded();
		expect(rewarded).toBe("rewarded");
	});

	it("should get out of page slot id for anchor", () => {
		const outOfPage: OutOfPage = {
			type: "anchor",
			settings: { position: "top" },
		};
		const slotId = gtag.getOutOfPageSlotId(outOfPage);
		expect(slotId).toBe("top-anchor");
	});

	it("should get out of page slot id for rewarded", () => {
		const outOfPage: OutOfPage = { type: "rewarded", settings: {} };
		const slotId = gtag.getOutOfPageSlotId(outOfPage);
		expect(slotId).toBe("rewarded");
	});

	it("should create out of page slot", () => {
		const slot = gtag.createOutOfPageSlot("/1234/adunit", "top-anchor");
		expect(slot).toBeTruthy();
		expect(window.googletag?.defineOutOfPageSlot).toHaveBeenCalledWith(
			"/1234/adunit",
			"top-anchor",
		);
	});

	it("should handle rewarded events", () => {
		const onReady = vi.fn();
		const onClosed = vi.fn();
		const onGranted = vi.fn();
		const outOfPage: OutOfPage = {
			type: "rewarded",
			settings: { onReady, onClosed, onGranted },
		};
		gtag.handleRewarded(outOfPage);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"rewardedSlotReady",
			onReady,
		);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"rewardedSlotClosed",
			onClosed,
		);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"rewardedSlotGranted",
			onGranted,
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

	it("should enable service and display slot", () => {
		gtag.enableService("slot1");
		expect(window.googletag?.enableServices).toHaveBeenCalled();
		expect(window.googletag?.display).toHaveBeenCalledWith("slot1");
	});

	it("should enable single request", () => {
		gtag.enableSingleRequest();
		expect(window.googletag?.pubads().enableSingleRequest).toHaveBeenCalled();
	});

	it("should enable lazy load with boolean", () => {
		gtag.enableLazyLoad(true);
		expect(window.googletag?.pubads().enableLazyLoad).toHaveBeenCalled();
	});

	it("should handle slot render ended", () => {
		const onSlotRenderEnded = vi.fn();
		gtag.handleSlotRenderEnded(onSlotRenderEnded);
		expect(window.googletag?.pubads().addEventListener).toHaveBeenCalledWith(
			"slotRenderEnded",
			onSlotRenderEnded,
		);
	});
});
