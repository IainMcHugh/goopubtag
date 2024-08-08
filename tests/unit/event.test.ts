import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { dispatchEvent, subscribe } from "../../lib/utils/events";

describe("Unit | Events", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		document.removeEventListener("slot_load", () => {});
		document.removeEventListener("slot_requested", () => {});
		document.removeEventListener("impression_viewable", () => {});
		document.removeEventListener("slot_render_ended", () => {});
	});

	it("should dispatch and handle a SLOT_LOAD event", () => {
		const mockCallback = vi.fn();
		const detail = { slot: "slot1" };

		subscribe("slot_load", mockCallback);
		dispatchEvent("slot_load", detail);

		expect(mockCallback).toHaveBeenCalledWith(detail);

		// TODO: Test this
		// unsubscribe("slot_load", mockCallback);
		// dispatchEvent("slot_load", detail);

		// expect(mockCallback).toHaveBeenCalledTimes(1); // Ensure it doesn't get called after unsubscribe
	});

	it("should dispatch and handle a SLOT_REQUESTED event", () => {
		const mockCallback = vi.fn();
		const detail = { slot: "slot1", requestId: "req1" };

		subscribe("slot_requested", mockCallback);
		dispatchEvent("slot_requested", detail);

		expect(mockCallback).toHaveBeenCalledWith(detail);

		// TODO: Test this
		// unsubscribe("slot_requested", mockCallback);
		// dispatchEvent("slot_requested", detail);

		// expect(mockCallback).toHaveBeenCalledTimes(1); // Ensure it doesn't get called after unsubscribe
	});

	it("should dispatch and handle an IMPRESSION_VIEWABLE event", () => {
		const mockCallback = vi.fn();
		const detail = { slot: "slot1" };

		subscribe("impression_viewable", mockCallback);
		dispatchEvent("impression_viewable", detail);

		expect(mockCallback).toHaveBeenCalledWith(detail);

		// TODO: Test this
		// unsubscribe("impression_viewable", mockCallback);
		// dispatchEvent("impression_viewable", detail);

		// expect(mockCallback).toHaveBeenCalledTimes(1); // Ensure it doesn't get called after unsubscribe
	});

	it("should dispatch and handle a SLOT_RENDER_ENDED event", () => {
		const mockCallback = vi.fn();
		const detail = { slot: "slot1", isEmpty: false };

		subscribe("slot_render_ended", mockCallback);
		dispatchEvent("slot_render_ended", detail);

		expect(mockCallback).toHaveBeenCalledWith(detail);

		// unsubscribe("slot_render_ended", mockCallback);
		// dispatchEvent("slot_render_ended", detail);

		// expect(mockCallback).toHaveBeenCalledTimes(1); // Ensure it doesn't get called after unsubscribe
	});
});
