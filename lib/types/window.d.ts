type PrivacySettings = {
	limitedAds: boolean;
	nonPersonalizedAds: boolean;
	childDirectedTreatment: boolean;
	restrictDataProcessing: boolean;
	underAgeOfConsent: boolean;
};

type Pubads = Slot;

type GoogleTag = {
	cmd: {
		push: (fn: () => void) => void;
	};
	companionAds: unknown;
	content: unknown;
	defineOutOfPageSlot: (
		adUnitPath: string,
		slotId: string | null,
	) => {
		addService: (slot: Slot) => Slot;
	};
	defineSlot: (
		adUnitPath: string,
		sizes: Sizes,
		slotId: string,
	) => {
		addService: (slot: Slot) => Slot;
	};
	defineUnit: unknown;
	destroySlots: unknown;
	disablePublisherConsole: unknown;
	display: (slotId: string) => void;
	enableServices: () => void;
	evalScripts: unknown;
	getEventLog: unknown;
	getVersions: unknown;
	getWindowsThatCanCommunicateWithHostpageLibrary: unknown;
	onPubConsoleJsLoad: unknown;
	openConsole: () => void;
	pubads: () => Pubads;
	setAdIframeTitle: unknown;
	setConfig: unknown;
	sizeMapping: () => Mapping;
	enums: {
		OutOfPageFormat: {
			TOP_ANCHOR: string;
			BOTTOM_ANCHOR: string;
			REWARDED: string;
		};
	};
	encryptedSignalProviders: unknown;
	secureSignalProviders: unknown;
	_vars_: unknown;
	_loaded_: boolean;
	_loadStarted_: boolean;
	apiReady: boolean;
	pubadsReady: boolean;
};

/** Declaration override */
interface Window {
	googletag: GoogleTag | undefined;
}
