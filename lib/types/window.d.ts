type GoogleTag = {
  cmd: {
    push: Function;
  };
  companionAds: Function;
  content: Function;
  defineOutOfPageSlot: Function;
  defineSlot: Function;
  defineUnit: Function;
  destroySlots: Function;
  disablePublisherConsole: Function;
  display: Function;
  enableServices: Function;
  evalScripts: Function;
  getEventLog: Function;
  getVersions: Function;
  getWindowsThatCanCommunicateWithHostpageLibrary: Function;
  onPubConsoleJsLoad: Function;
  openConsole: Function;
  pubads: Function;
  setAdIframeTitle: Function;
  setConfig: Function;
  sizeMapping: Function;
  enums: Object;
  encryptedSignalProviders: Object;
  secureSignalProviders: Object;
  _vars_: Object;
  _loaded_: boolean;
  _loadStarted_: boolean;
  apiReady: boolean;
  pubadsReady: boolean;
};

/** Declaration override */
interface Window {
  googletag: GoogleTag | undefined;
}
