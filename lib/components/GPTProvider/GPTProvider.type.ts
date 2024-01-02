import type { ChildrenWithProps, SlotProvider } from '../../types';

/**
 * A GPT Unit that is established
 */
export type Unit = {
  /**
   * The slot ID for the given unit
   */
  slotId: string;
  /**
   * The unit itself
   */
  unit: any;
};

type SharedContextProps = SlotProvider & {
  debug?: boolean;
};

export type GPTContext = SharedContextProps & {
  isLoaded: boolean;
  addUnit: (unit: Unit) => void;
  units: Unit[];
};

export type GPTProviderProps = ChildrenWithProps<SharedContextProps>;
