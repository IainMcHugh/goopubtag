import type { Attributes, PrivacySettings } from '../../types';

export type UseGPTProps = {};

export type UseGPT = {
  refresh: (adSlots?: string[]) => void;
  setTargetingAttributes: (slotId: string, attributes: Attributes) => void;
  setPageTargetingAttributes: (attributes: Attributes) => void;
  clearTargetingAttributes: (slotId: string, attributes?: string[]) => void;
  clearPageTargetingAttributes: (attributes?: string[]) => void;
  setPrivacySettings: (settings: Partial<PrivacySettings>) => void;
};
