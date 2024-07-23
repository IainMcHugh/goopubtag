import type {
	Attributes,
	ChildrenWithProps,
	Slot,
	SlotProvider,
} from "../../types";

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
	unit: Slot;
};

type SharedContextProps<PageAttributes extends Attributes = Attributes> =
	SlotProvider<PageAttributes> & {
		debug?: boolean;
	};

export type GPTContext<PageAttributes extends Attributes = Attributes> =
	SharedContextProps<PageAttributes> & {
		isLoaded: boolean;
		addUnit: (unit: Unit) => void;
		units: Unit[];
	};

export type GPTProviderProps<PageAttributes extends Attributes = Attributes> =
	ChildrenWithProps<SharedContextProps<PageAttributes>>;
