import { vi } from "vitest";

Object.defineProperty(global.document, "getElementsByTagName", {
	value: vi.fn().mockImplementation(() => [
		{
			appendChild: vi.fn(),
		},
	]),
});
