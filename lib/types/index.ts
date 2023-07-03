import type { ReactNode } from 'react';

/** GPT types
 * - reference: https://developers.google.com/publisher-tag/reference
 * - Definitely typed: https://www.npmjs.com/package/@types/google-publisher-tag
 */
export type Attributes = { [key: string]: string };

type Size = readonly [number, number];
type Sizes = string | Size | Size[];

type SizeMapping = {
  viewport: Size;
  sizes: Sizes;
};

export type Unit = {
  slotId: string;
  unit: any;
};

export type PrivacySettings = {
  limitedAds: boolean;
  nonPersonalizedAds: boolean;
  childDirectedTreatment: boolean;
  restrictDataProcessing: boolean;
  underAgeOfConsent: boolean;
};

export type CollapseSlot = Collapse | 'expand_strict';

export type Collapse = 'default' | 'expand' | 'collapse';

type LazyLoad = {
  // Fetch slots within 5 viewports.
  fetchMarginPercent: number;
  // Render slots within 2 viewports.
  renderMarginPercent: number;
  // Double the above values on mobile.
  mobileScaling: number;
};

type AutoReload = Pick<
  SlotProvider,
  | 'networkId'
  | 'personalizedAds'
  | 'singleRequest'
  | 'adUnit'
  | 'sizeMapping'
  | 'adSenseAttributes'
  | 'targetingArguments'
  | 'fallback'
  | 'lazyLoad'
>;

type SlotRender = {
  // complete
  getSlotElementId: Function;
};

type SlotVisibilityChanged = {
  // complete
  getSlotElementId: Function;
};

type Event<T> = {
  serviceName: string;
  slot: T;
};

export type SlotLoadEvent = Event<SlotRender>;
export type SlotRenderEndedEvent = Event<SlotRender>;
export type SlotViewableEvent = Event<SlotVisibilityChanged>;

export type GPT = {
  adUnit?: string;
  sizeMapping?: SizeMapping[];
  adSenseAttributes?: Attributes;
  targetingArguments?: Attributes;
};

export type SlotProvider = GPT & {
  networkId: number;
  personalizedAds?: boolean;
  singleRequest?: boolean;
  disableInitialLoad?: boolean;
  limitedAds?: boolean;
  autoLoad?: boolean;
  lazyLoad?: boolean | LazyLoad;
  autoReload?: AutoReload;
  fallback?: Collapse;
};

export type SlotUnit = GPT & {
  networkId?: string;
  slotId: string;
  sizes: Sizes;
  onSlotLoad?: (event: SlotLoadEvent) => void;
  onSlotIsViewable?: (event: SlotViewableEvent) => void;
  onSlotRenderEnded?: (event: SlotRenderEndedEvent) => void;
  outOfPage?: boolean;
  shouldRefresh?: () => boolean;
  fallback?: CollapseSlot;
};

/** Context types */

type SharedContextProps = SlotProvider & {
  debug?: boolean;
};
export type GPTContext = SharedContextProps & {
  isLoaded: boolean;
  addUnit: (unit: Unit) => void;
  units: Unit[];
};
export type GPTProviderProps = SharedContextProps & {
  children: ReactNode;
};

/** Component types */

export type GPTSlotProps = SlotUnit;

/** Hook types */

export type UseGPTProps = {};
export type UseGPT = {
  refresh: (adSlots?: string[]) => void;
  setTargetingAttributes: (slotId: string, attributes: Attributes) => void;
  setPageTargetingAttributes: (attributes: Attributes) => void;
  clearTargetingAttributes: (slotId: string, attributes?: string[]) => void;
  clearPageTargetingAttributes: (attributes?: string[]) => void;
  setPrivacySettings: (settings: Partial<PrivacySettings>) => void;
};
