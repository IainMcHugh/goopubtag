import type { Unit } from "lib/components/GPTProvider/GPTProvider.type";
import { vi } from "vitest";

export const mockUnit: Unit = {
	slotId: "mock-unit-id",
	unit: {
		addEventListener: vi.fn(),
		addService: vi.fn(),
		clearTargeting: vi.fn(),
		collapseEmptyDivs: vi.fn(),
		defineSizeMapping: vi.fn(),
		refresh: vi.fn(),
		setCollapseEmptyDiv: vi.fn(),
		setPrivacySettings: vi.fn(),
		setTargeting: vi.fn(),
	},
};
