import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { GPTProvider } from "lib/components/GPTProvider/GPTProvider";

// Mock the dependencies
vi.mock("lib/components/GPTDevIcon/GPTDevIcon/GPTDev", () => ({
	GPTDev: () => <div data-testid="gpt-dev-icon" />,
}));

vi.mock("lib/components/GPTProvider/useGPTProvider", () => ({
	useGPTProvider: vi.fn().mockImplementation(() => ({ mockProvider: true })),
}));

describe("Integration | GPT Provider", () => {
	beforeEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it("should render GPTDev icon when debug is true", () => {
		render(
			<GPTProvider networkId={123} debug={true}>
				<div>Test Child</div>
			</GPTProvider>,
		);

		expect(screen.getByTestId("gpt-dev-icon")).toBeDefined();
	});

	it("should not render GPTDev icon when debug is false", () => {
		render(
			<GPTProvider networkId={123} debug={false}>
				<div>Test Child</div>
			</GPTProvider>,
		);
		expect(screen.queryByTestId("gpt-dev-icon")).toBeNull();
	});
});
