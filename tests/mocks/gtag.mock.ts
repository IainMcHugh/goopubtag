import { vi } from "vitest";

export const mockGtag = {
	push: vi.fn(),
	setTargeting: vi.fn(),
	clearTargeting: vi.fn(),
	setPrivacySettings: vi.fn(),
	refresh: vi.fn(),
};
