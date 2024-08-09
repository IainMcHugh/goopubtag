import { vi } from "vitest";

export const mockGoogleTag: GoogleTag = {
	_loaded_: false,
	_loadStarted_: false,
	_vars_: null,
	apiReady: false,
	//@ts-ignore
	cmd: [],
	companionAds: null,
	content: null,
	defineOutOfPageSlot: vi
		.fn()
		.mockReturnValue({ addService: vi.fn().mockReturnThis() }),
	defineSlot: vi.fn().mockReturnValue({
		addService: vi.fn().mockReturnThis(),
	}),
	defineUnit: vi.fn(),
	destroySlots: vi.fn(),
	disablePublisherConsole: vi.fn(),
	display: vi.fn(),
	enableServices: vi.fn(),
	encryptedSignalProviders: null,
	enums: {
		OutOfPageFormat: {
			TOP_ANCHOR: 0,
			BOTTOM_ANCHOR: 1,
			REWARDED: 2,
			LEFT_SIDE_RAIL: 3,
			RIGHT_SIDE_RAIL: 4,
			INTERSTITIAL: 5,
		},
	},
	evalScripts: vi.fn(),
	getEventLog: vi.fn(),
	getVersions: vi.fn(),
	getWindowsThatCanCommunicateWithHostpageLibrary: vi.fn(),
	onPubConsoleJsLoad: vi.fn(),
	openConsole: vi.fn(),
	pubads: vi.fn().mockReturnValue({
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		collapseEmptyDivs: vi.fn(),
		setTargeting: vi.fn(),
		clearTargeting: vi.fn(),
		enableLazyLoad: vi.fn(),
		enableSingleRequest: vi.fn(),
		refresh: vi.fn(),
		setPrivacySettings: vi.fn(),
	}),
	pubadsReady: false,
	secureSignalProviders: null,
	setAdIframeTitle: vi.fn(),
	setConfig: vi.fn(),
	sizeMapping: vi.fn(),
};
