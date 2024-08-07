import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, beforeEach, vi } from "vitest";

import type { OutOfPage } from "lib/types";
import { useGPTProvider } from "lib/components/GPTProvider/useGPTProvider";
import { gtag } from "lib/utils/gtag";
import { mockUnit } from "tests/mocks/unit.mock";
import * as utils from "lib/utils";

const mockSetTargeting = vi.fn();

vi.mock("lib/utils", () => ({
	getGPTScript: vi.fn(),
}));

vi.mock("lib/utils/events", () => ({
	dispatchEvent: vi.fn(),
}));

vi.mock("lib/utils/gtag", () => ({
	gtag: {
		init: vi.fn(),
		push: vi.fn((cb) => cb()),
		getAdUnitPath: vi.fn(() => "mockAdUnitPath"),
		createOutOfPageSlot: vi.fn().mockImplementation(() => ({
			setTargeting: mockSetTargeting,
			addService: vi.fn(),
			handleRewarded: vi.fn(),
		})),
		getOutOfPageSlotId: vi.fn(() => "mockOutOfPageSlotId"),
		setTargeting: vi.fn(),
		handleSlotLoad: vi.fn(),
		handleSlotRequested: vi.fn(),
		handleSlotIsViewable: vi.fn(),
		handleSlotRenderEnded: vi.fn(),
		handleFallback: vi.fn(),
		addService: vi.fn(),
		handleRewarded: vi.fn(),
	},
}));

describe("Hooks | Use GPT Provider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should append GPT script to the document head", () => {
		const mockGetGPTScript = vi.spyOn(utils, "getGPTScript");
		renderHook(() => useGPTProvider({ networkId: 123456 }));
		expect(mockGetGPTScript).toHaveBeenCalledWith({ limitedAds: false });
	});

	it("should initialize gtag and set up slots and targeting", () => {
		const targetingArguments = {
			key1: "value1",
			key2: "value2",
		};

		renderHook(() =>
			useGPTProvider({
				networkId: 123456,
				targetingArguments,
			}),
		);

		expect(gtag.init).toHaveBeenCalled();
		expect(gtag.push).toHaveBeenCalled();
		expect(gtag.setTargeting).toHaveBeenCalledWith("key1", "value1");
		expect(gtag.setTargeting).toHaveBeenCalledWith("key2", "value2");
	});

	it("should handle outOfPage slot", () => {
		const outOfPage: OutOfPage = {
			type: "anchor",
			settings: {
				position: "top",
				adUnit: "testAdUnit",
				targetingArguments: {
					key1: "value1",
				},
			},
		};

		renderHook(() =>
			useGPTProvider({
				networkId: 123456,
				outOfPage,
			}),
		);

		expect(gtag.createOutOfPageSlot).toHaveBeenCalledWith(
			"mockAdUnitPath",
			"mockOutOfPageSlotId",
		);

		expect(mockSetTargeting).toHaveBeenCalledWith("key1", "value1");
		expect(gtag.addService).toHaveBeenCalled();
		expect(gtag.handleRewarded).toHaveBeenCalledWith(outOfPage);
	});

	it("should handle slot events", () => {
		renderHook(() => useGPTProvider({ networkId: 123456 }));

		expect(gtag.handleSlotLoad).toHaveBeenCalledWith(expect.any(Function));
		expect(gtag.handleSlotRequested).toHaveBeenCalledWith(expect.any(Function));
		expect(gtag.handleSlotIsViewable).toHaveBeenCalledWith(
			expect.any(Function),
		);
		expect(gtag.handleSlotRenderEnded).toHaveBeenCalledWith(
			expect.any(Function),
		);
	});

	it("should handle fallback setting", () => {
		renderHook(() =>
			useGPTProvider({
				networkId: 123456,
				fallback: "collapse",
			}),
		);

		expect(gtag.handleFallback).toHaveBeenCalledWith("collapse");
	});

	it("should provide addUnit function and manage units state", () => {
		const { result } = renderHook(() => useGPTProvider({ networkId: 123456 }));

		expect(result.current.units).toEqual([]);

		act(() => {
			result.current.addUnit(mockUnit);
		});

		expect(result.current.units).toEqual([mockUnit]);
	});
});
