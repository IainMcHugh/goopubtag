import { vi } from "vitest";

import type * as GPTProvider from "lib/components/GPTProvider/GPTProvider";

export const mockUseGPTContext: ReturnType<
	(typeof GPTProvider)["useGPTContext"]
> = {
	addUnit: vi.fn(),
	networkId: 123,
	adSenseAttributes: {},
	adUnit: "ad_unit",
	debug: false,
	disableInitialLoad: false,
	fallback: "default",
	lazyLoad: false,
	personalizedAds: false,
	singleRequest: false,
	sizeMapping: [],
	targetingArguments: {},
	units: [
		{
			slotId: "slot1",
			unit: {
				setTargeting: vi.fn(),
				clearTargeting: vi.fn(),
				collapseEmptyDivs: vi.fn(),
				addEventListener: vi.fn(),
				addService: vi.fn(),
				defineSizeMapping: vi.fn(),
				refresh: vi.fn(),
				setCollapseEmptyDiv: vi.fn(),
				setPrivacySettings: vi.fn(),
			},
		},
	],
	limitedAds: true,
};
