import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import type { GPTSlotProps } from "lib/components/GPTSlot/GPTSlot.type";
import { GPTSlot } from "lib/components/GPTSlot/GPTSlot";

vi.mock("lib/components/GPTSlot/useGPTSlot", () => ({
	useGPTSlot: vi
		.fn()
		.mockReturnValue({ style: { width: "300px", height: "250px" } }),
}));

describe("Integration | GPT Slot", () => {
	it("should render the component with correct props", () => {
		const testId = "test-id";
		const props: GPTSlotProps = {
			slotId: "test-slot",
			className: "test-class",
			sizes: [],
			dataTestId: testId,
		};

		// @ts-ignore
		const r = render(<GPTSlot {...props} />);
		const { getByTestId } = r;
		const element = getByTestId(testId);
		expect(element).toBeDefined();
	});
});
