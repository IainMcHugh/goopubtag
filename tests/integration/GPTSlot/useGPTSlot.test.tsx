import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";

import type { UseGPTSlotProps } from "lib/components/GPTSlot/GPTSlot.type";
import { useGPTSlot } from "lib/components/GPTSlot/useGPTSlot";
import { gtag } from "lib/utils/gtag";
import { subscribe, unsubscribe } from "lib/utils/events";

const mockAddSize = vi.fn();
const mockBuild = vi.fn();
const mockDefineSizeMapping = vi.fn();
const mockSetTargeting = vi.fn();
const mockSetCollapseEmptyDiv = vi.fn();

vi.mock("lib/utils/gtag", () => ({
	gtag: {
		init: vi.fn(),
		push: vi.fn().mockImplementation((c) => c()),
		getAdUnitPath: vi.fn(() => "mockAdUnitPath"),
		createOutOfPageSlot: vi.fn(() => ({
			defineSizeMapping: vi.fn(),
			setTargeting: vi.fn(),
			setCollapseEmptyDiv: vi.fn(),
		})),
		createSlot: vi.fn(() => ({
			defineSizeMapping: mockDefineSizeMapping,
			setTargeting: mockSetTargeting,
			setCollapseEmptyDiv: mockSetCollapseEmptyDiv,
		})),
		getMapping: vi
			.fn()
			.mockImplementation(() => ({ addSize: mockAddSize, build: mockBuild })),
		enableLazyLoad: vi.fn(),
		enableSingleRequest: vi.fn(),
		enableService: vi.fn(),
	},
}));

vi.mock("lib/utils/events", () => ({
	subscribe: vi.fn(),
	unsubscribe: vi.fn(),
}));

vi.mock("lib/components/GPTProvider/GPTProvider", () => ({
	useGPTContext: vi.fn(() => ({
		networkId: "testNetworkId",
		units: [],
		lazyLoad: undefined,
		singleRequest: false,
		addUnit: vi.fn(),
	})),
}));

describe("Hooks | Use GPT Slot", () => {
	it("should initialize gtag and create ad slot", () => {
		const props: UseGPTSlotProps = {
			adUnit: "testAdUnit",
			sizes: [300, 250],
			slotId: "testSlotId",
		};

		renderHook(() => useGPTSlot(props));

		expect(gtag.init).toHaveBeenCalled();
		expect(gtag.push).toHaveBeenCalled();
		expect(gtag.createSlot).toHaveBeenCalledWith(
			"mockAdUnitPath",
			[300, 250],
			"testSlotId",
		);
	});

	it("should set size mapping when provided", () => {
		const props: UseGPTSlotProps = {
			adUnit: "testAdUnit",
			sizes: [300, 250],
			slotId: "testSlotId",
			sizeMapping: [
				{ viewport: [0, 0], sizes: [300, 250] },
				{ viewport: [1024, 768], sizes: [728, 90] },
			],
		};

		renderHook(() => useGPTSlot(props));

		expect(gtag.getMapping).toHaveBeenCalled();
		expect(mockAddSize).toHaveBeenCalledWith([0, 0], [300, 250]);
		expect(mockAddSize).toHaveBeenCalledWith([1024, 768], [728, 90]);
		expect(mockBuild).toHaveBeenCalled();
	});

	it("should set targeting arguments when provided", () => {
		const props: UseGPTSlotProps = {
			adUnit: "testAdUnit",
			sizes: [300, 250],
			slotId: "testSlotId",
			targetingArguments: {
				key1: "value1",
				key2: "value2",
			},
		};

		renderHook(() => useGPTSlot(props));

		expect(gtag.createSlot).toHaveBeenCalled();
		expect(mockSetTargeting).toHaveBeenCalledWith("key1", "value1");
		expect(mockSetTargeting).toHaveBeenCalledWith("key2", "value2");
	});

	it("should handle fallback options", () => {
		const props: UseGPTSlotProps = {
			adUnit: "testAdUnit",
			sizes: [300, 250],
			slotId: "testSlotId",
			fallback: "collapse",
		};

		renderHook(() => useGPTSlot(props));

		expect(gtag.createSlot).toHaveBeenCalled();
		expect(mockSetCollapseEmptyDiv).toHaveBeenCalledWith(true);
	});

	it("should subscribe to events and cleanup on unmount", () => {
		const props: UseGPTSlotProps = {
			adUnit: "testAdUnit",
			sizes: [300, 250],
			slotId: "testSlotId",
			onSlotLoad: vi.fn(),
			onSlotRequested: vi.fn(),
			onSlotIsViewable: vi.fn(),
			onSlotRenderEnded: vi.fn(),
		};

		const { unmount } = renderHook(() => useGPTSlot(props));

		expect(subscribe).toHaveBeenCalledWith("slot_load", expect.any(Function));
		expect(subscribe).toHaveBeenCalledWith(
			"slot_requested",
			expect.any(Function),
		);
		expect(subscribe).toHaveBeenCalledWith(
			"impression_viewable",
			expect.any(Function),
		);
		expect(subscribe).toHaveBeenCalledWith(
			"slot_render_ended",
			expect.any(Function),
		);

		unmount();

		expect(unsubscribe).toHaveBeenCalledWith("slot_load", props.onSlotLoad);
		expect(unsubscribe).toHaveBeenCalledWith(
			"slot_requested",
			props.onSlotRequested,
		);
		expect(unsubscribe).toHaveBeenCalledWith(
			"impression_viewable",
			props.onSlotIsViewable,
		);
		expect(unsubscribe).toHaveBeenCalledWith(
			"slot_render_ended",
			props.onSlotRenderEnded,
		);
	});

	it("should return correct style based on sizes", () => {
		const props: UseGPTSlotProps = {
			adUnit: "testAdUnit",
			sizes: [300, 250],
			slotId: "testSlotId",
		};

		const { result } = renderHook(() => useGPTSlot(props));

		expect(result.current.style).toEqual({ width: "300px", height: "250px" });
	});

	it("should return full width style for string sizes", () => {
		const props = {
			adUnit: "testAdUnit",
			sizes: "fluid",
			slotId: "testSlotId",
		};

		const { result } = renderHook(() => useGPTSlot(props));

		expect(result.current.style).toEqual({ width: "100%" });
	});
});
