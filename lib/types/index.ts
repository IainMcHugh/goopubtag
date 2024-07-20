/** GPT types
 * - reference: https://developers.google.com/publisher-tag/reference
 * - Definitely typed: https://www.npmjs.com/package/@types/google-publisher-tag
 */

import type { ReactNode } from 'react';

/**
 * A generic type for dynamic props with children
 */
export type ChildrenWithProps<T> = T & {
  /**
   * The children prop passed to a react component
   */
  children: ReactNode;
};

/**
 * Key-value pairs used for targeting
 */
export type Attributes = Record<string, string | string[]>;

/**
 * A basic Ad size, defining the width and height respectively
 */
export type Size = readonly [number, number];

/**
 * Sizes can either be:
 * - A string value to define behaviour, eg "fluid"
 * - A basic Ad size (width X height)
 * - An array of basic Ad sizes (width X height) corresponding to the viewport
 */
export type Sizes = string | Size | (string | Size)[];

/**
 * A combination of viewport definitions and ad sizes for responsive ads
 */
type SizeMapping = {
  /**
   * A viewport size, defining the width and height respectively
   */
  viewport: Size;
  /**
   * The ad sizes that can be served for the viewport size provided
   */
  sizes: Sizes;
};

/**
 * Allows configuration of all privacy settings from a single API using a config object
 */
export type PrivacySettings = {
  /**
   * Enables serving to run in limited ads mode to aid in publisher regulatory compliance needs. When enabled, the GPT library itself may optionally be requested from a cookie-less, limited ads URL.
   */
  limitedAds: boolean;
  /**
   * Enables serving to run in non-personalized ads mode to aid in publisher regulatory compliance needs.
   */
  nonPersonalizedAds: boolean;
  /**
   * Indicates whether the page should be treated as child-directed.
   */
  childDirectedTreatment: boolean;
  /**
   * Enables serving to run in restricted processing mode to aid in publisher regulatory compliance needs.
   */
  restrictDataProcessing: boolean;
  /**
   * Indicates whether to mark ad requests as coming from users under the age of consent.
   */
  underAgeOfConsent: boolean;
};

export type CollapseSlot = Collapse | 'expand_strict';

export type Collapse = 'default' | 'expand' | 'collapse';

export type AnchorSettings = Pick<SlotUnit, 'adUnit' | 'targetingArguments'> & {
  position: 'top' | 'bottom';
};

export type RewardedSettings = Pick<
  SlotUnit,
  'adUnit' | 'targetingArguments'
> & {
  onReady?: (event: any) => void;
  onClosed?: (event: any) => void;
  onGranted?: (event: any) => void;
};

export type OutOfPageTypes =
  | {
      type: 'anchor';
      settings: AnchorSettings;
    }
  | { type: 'rewarded'; settings: RewardedSettings };

export type OutOfPage = Pick<SlotUnit, 'adUnit' | 'targetingArguments'> &
  OutOfPageTypes;

export type Mapping = {
  addSize: (viewport: Size, sizes: Sizes) => void;
  build: () => void;
};

/**
 * Enables lazy loading in GPT as defined by the config object. For more detailed examples, see the {@link https://developers.google.com/publisher-tag/samples/lazy-loading Lazy loading sample}.
 */
export type LazyLoad = {
  /**
   *  Fetch slots within 5 viewports.
   */
  fetchMarginPercent: number;
  /**
   * Render slots within 2 viewports.
   */
  renderMarginPercent: number;
  /**
   * Double the above values on mobile.
   */
  mobileScaling: number;
};

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

/**
 * Defines shared props across both the GPTProvider and GPTSlot
 * Generally the GPTSlot prop will overwrite what's defined in the GPTProvider
 */
export type GPT<PageAttributes extends Attributes = Attributes> = {
  /**
   * The parent ad unit code. The Ad unit path follows the format:
   *
   * ```network-code/[parent-ad-unit-code/.../]ad-unit-code```, where:
   *
   * - **parent-ad-unit-code** are the codes of all parent ad units (only applies to non-top level ad units). This is the adUnit.
   */
  adUnit?: string;
  /**
   * The size mappings for responsive ads
   */
  sizeMapping?: SizeMapping[];
  /**
   * Initial Ad Sense attributes
   */
  adSenseAttributes?: Attributes;
  /**
   * Initial targeting attributes
   */
  targetingArguments?: PageAttributes;
};

/**
 * The parameters available to the Slot Provider component
 */
export type SlotProvider<PageAttributes extends Attributes = Attributes> =
  GPT<PageAttributes> & {
    /**
     * The network id or code is a unique identifier for the Ad Manager network the ad unit belongs to
     */
    networkId: number;
    /**
     * If personalized Ads is set. For more information on personalized ads, see {@link https://support.google.com/admanager/answer/9005435 here}.
     */
    personalizedAds?: boolean;
    /**
     * Enables single request mode for fetching multiple ads at the same time. This requires all Publisher Ads slots to be defined and added to the PubAdsService prior to enabling the service. Single request mode must be set before the service is enabled.
     */
    singleRequest?: boolean;
    /**
     * Returns whether or not initial requests for ads was successfully disabled by a previous PubAdsService.disableInitialLoad call. Returns true if a previous call to PubAdsService.disableInitialLoad was successful, false otherwise.
     */
    disableInitialLoad?: boolean;
    /**
     * Enables serving to run in limited ads mode to aid in publisher regulatory compliance needs.
     */
    limitedAds?: boolean;
    /**
     * @ignore
     * Enables lazy loading in GPT as defined by the config object.
     */
    lazyLoad?: boolean | LazyLoad;
    /**
     * Defines the fallback behaviour for when an ad fails to load. The 3 options are:
     *
     * `default`: The default behaviour, can be used to unset previous values
     *
     * `expand`: In this configuration, ad slots are collapsed by default and only expand if they can be filled. Use this if slots will not be filled most of the time
     *
     * `collapse`: In this configuration, ad slots are expanded by default and collapse only if they cannot be filled. Use this if slots will be filled most of the time
     */
    fallback?: Collapse;
    outOfPage?: OutOfPage;
  };

export type SlotUnit<A extends UnitTargeting = UnitTargeting> = GPT<
  A['attributes']
> & {
  /**
   * The network id or code is a unique identifier for the Ad Manager network the ad unit belongs to
   */
  networkId?: string;
  /**
   * The slot id. The Ad unit path follows the format:
   *
   * ```network-code/[parent-ad-unit-code/.../]ad-unit-code```, where:
   *
   * - **ad-unit-code** is the code for the ad unit to be displayed. This is the slotId
   */
  slotId: A['slotId'];
  /**
   * The ad sizes that can be served for the viewport size provided
   */
  sizes: Sizes;
  /**
   * Constructs an out-of-page ad slot with the given ad unit path.
   */
  outOfPage?: boolean;
  /**
   * **This is different behaviour to the `fallback` prop in the GPTProvider**
   * Defines the fallback behaviour for when an ad fails to load. The 3 options are:
   *
   * `default`: The default behaviour, can be used to unset previous values
   *
   * `expand`: In this configuration, ad slots are collapsed by default and only expand if they can be filled. Use this if slots will not be filled most of the time
   *
   * `collapse`: In this configuration, ad slots are expanded by default and collapse only if they cannot be filled. Use this if slots will be filled most of the time
   *
   * `expand_strict`: In this configuration, the ad unit will:
   * - not be collapsed initially
   * - not be collapsed even if an ad does not load
   */
  fallback?: CollapseSlot;
  /**
   * A callback for when the slot is successfully loaded
   * @param event The slot load event
   * @returns
   */
  onSlotLoad?: (event: SlotLoadEvent) => void;
  /**
   * A callback for when the slot is viewable on the page
   * @param event The slot is viewable event
   * @returns
   */
  onSlotIsViewable?: (event: SlotViewableEvent) => void;
  /**
   * A callback for when the slot rendering has ended
   * @param event The slow render ended event
   * @returns
   */
  onSlotRenderEnded?: (event: SlotRenderEndedEvent) => void;
};

export type GetKeys<T extends Attributes> = Extract<keyof T, 'string'>;

type KeyTypes<T> = {
  [K in keyof T]-?: K extends string
    ? string
    : K extends number
    ? number
    : K extends symbol
    ? symbol
    : never;
}[keyof T];

export type KeyOfType<
  T,
  KeyType extends string | number | symbol = KeyTypes<T>
> = Extract<keyof T, KeyType>;

export type UnitTargeting<T extends Attributes = Attributes> = {
  slotId: string;
  attributes: T;
};
