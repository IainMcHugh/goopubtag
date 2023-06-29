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
};

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
  | 'collapseEmptyDivs'
  | 'lazyLoad'
>;

type SlotRenderEndedEvent = {
  advertiserId: any;
  campaignId: any;
  companyIds: any;
  creativeId: any;
  creativeTemplateId: any;
  isBackfill: any;
  isEmpty: any;
  labelIds: any;
  lineItemId: any;
  serviceName: any;
  size: any;
  slot: any;
  slotContentChanged: any;
  sourceAgnosticCreativeId: any;
  sourceAgnosticLineItemId: any;
  yieldGroupIds: any;
};

type SlotVisibilityChangedEvent = {
  inViewPercentage: any;
  serviceName: any;
  slot: any;
};

type Event<T> = {
  slotId: string;
  event: T;
};

type SlotRenderEvent = Event<SlotRenderEndedEvent>;
type SlotViewableEvent = Event<SlotVisibilityChangedEvent>;

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
  collapseEmptyDivs?: boolean;
};

export type SlotUnit = GPT & {
  networkId?: string;
  slotId: string;
  sizes: Sizes;
  onSlotRender?: (event: SlotRenderEvent) => void;
  onSlotIsViewable?: (event: SlotViewableEvent) => void;
  renderOutOfThePage?: boolean;
  shouldRefresh?: () => boolean;
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
