import { renderHook, act } from "@testing-library/react-hooks";
import { describe, beforeEach, it, expect, vi } from "vitest";

import { mockUseGPTContext } from "tests/mocks/useGPTContext.mock";
import { mockGtag } from "tests/mocks/gtag.mock";
import * as GPTProvider from "lib/components/GPTProvider/GPTProvider";
import { useGPT } from "lib/hooks/useGPT/useGPT";
import { gtag } from "lib/utils/gtag";

vi.mock("lib/components/GPTProvider/GPTProvider", () => ({
	...vi.importActual("lib/components/GPTProvider/GPTProvider"),
	useGPTContext: vi.fn().mockReturnValue(mockUseGPTContext),
}));

vi.mock("lib/utils/gtag", () => ({
	...vi.importActual("lib/utils/gtag"),
	gtag: mockGtag,
}));

describe("Hooks | Use GPT", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.clearAllMocks();
	});

	it("should set targeting attributes", () => {
		/**
		 * By mocking the implementation here and below, we can invoke the function
		 * passed to `push`. This allows us to test the invokations within
		 * the contained function.
		 */
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		const mockSetTargeting = vi.fn();
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue({
			...mockUseGPTContext,
			units: [
				{
					...mockUseGPTContext.units[0],
					unit: {
						...mockUseGPTContext.units[0].unit,
						setTargeting: mockSetTargeting,
					},
				},
			],
		});
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.setTargetingAttributes("slot1", { key: "value" });
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockSetTargeting).toHaveBeenCalledWith("key", "value");
	});

	it("should set page targeting attributes", () => {
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		const mockSetPageTargeting = vi.spyOn(gtag, "setTargeting");
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue(mockUseGPTContext);
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.setPageTargetingAttributes({ pageKey: "pageValue" });
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockSetPageTargeting).toHaveBeenCalledWith("pageKey", "pageValue");
	});

	it("should clear targeting attributes", () => {
		const mockClearTargeting = vi.fn();
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue({
			...mockUseGPTContext,
			units: [
				{
					...mockUseGPTContext.units[0],
					unit: {
						...mockUseGPTContext.units[0].unit,
						clearTargeting: mockClearTargeting,
					},
				},
			],
		});
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.clearTargetingAttributes("slot1", ["key"]);
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockClearTargeting).toHaveBeenCalledWith("key");
	});

	it("should clear all targeting attributes if no attributes provided", () => {
		const mockClearTargeting = vi.fn();
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue({
			...mockUseGPTContext,
			units: [
				{
					...mockUseGPTContext.units[0],
					unit: {
						...mockUseGPTContext.units[0].unit,
						clearTargeting: mockClearTargeting,
					},
				},
			],
		});
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.clearTargetingAttributes("slot1", ["key"]);
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockClearTargeting).toHaveBeenCalled();
	});

	it("should clear page targeting attributes", () => {
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		const mockClearPageTargeting = vi.spyOn(gtag, "clearTargeting");
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue(mockUseGPTContext);
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.clearPageTargetingAttributes(["pageValue"]);
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockClearPageTargeting).toHaveBeenCalledWith("pageValue");
	});

	it("should set privacy settings if limited ads is enabled", () => {
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		const mockSetPrivacySettings = vi.spyOn(gtag, "setPrivacySettings");
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue(mockUseGPTContext);
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.setPrivacySettings({ limitedAds: true });
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockSetPrivacySettings).toHaveBeenCalledWith({ limitedAds: true });
	});

	it("should refresh ad slots", () => {
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		const mockRefresh = vi.spyOn(gtag, "refresh");
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue(mockUseGPTContext);
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.refresh(["slot1"]);
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockRefresh).toHaveBeenCalledWith(["slot1"]);
	});

	it("should refresh all ad slots if no parameters are provided", () => {
		const mockPush = vi.spyOn(gtag, "push").mockImplementation((c) => c());
		const mockRefresh = vi.spyOn(gtag, "refresh");
		vi.spyOn(GPTProvider, "useGPTContext").mockReturnValue(mockUseGPTContext);
		const { result } = renderHook(() => useGPT());

		act(() => {
			result.current.refresh();
		});

		expect(mockPush).toHaveBeenCalled();
		expect(mockRefresh).toHaveBeenCalled();
	});
});
