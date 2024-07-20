import type {
	Attributes,
	KeyOfType,
	PrivacySettings,
	UnitTargeting,
} from "../../types";

/**
 * A hook that enables dynamic updates to page level and slot configuration
 */
export type UseGPT<PageAttributes extends Attributes> = {
	/**
	 * This function when called will either:
	 *
	 * - refresh all ad slots (no parameter)
	 * - refresh only the ad slots provided
	 *
	 * @param adSlots The list of ad slot(s)
	 * @returns
	 */
	refresh: (adSlots?: string[]) => void;
	/**
	 * This function when called will set the targeting attributes provided for a given slot
	 * @param slotId The unit slot id
	 * @param attributes The attributes to be set
	 * @returns
	 */
	// setTargetingAttributes: <
	//   SlotId extends string,
	//   UnitAttributes extends Attributes
	// >(
	//   slotId: SlotId,
	//   attributes: UnitAttributes
	// ) => void;
	setTargetingAttributes: <A extends UnitTargeting>(
		slotId: A["slotId"],
		attributes: A["attributes"],
	) => void;
	/**
	 * This function when called will set the targeting attributes at a page level
	 * @param attributes The attributes to be set
	 * @returns
	 */
	setPageTargetingAttributes: (attributes: PageAttributes) => void;
	/**
	 * This function when called will either:
	 *
	 * - clear all attributes for a given slot (when no attributes are provided)
	 * - clear specific attributes based on the attribute keys provided
	 * @param slotId The unit slot id
	 * @param attributes The attributes to be cleared
	 * @returns
	 */
	clearTargetingAttributes: <A extends UnitTargeting>(
		slotId: A["slotId"],
		attributes?: KeyOfType<A["attributes"]>[],
	) => void;
	/**
	 * This function when called will either:
	 *
	 * - clear all page level attributes (when no attributes are provided)
	 * - clear specific page level attributes based on attribute keys provided
	 * @param attributes The attributes to be cleared
	 * @returns
	 */
	clearPageTargetingAttributes: (
		attributes?: KeyOfType<PageAttributes>[],
	) => void;
	/**
	 * This function when called will update the privacy settings with the values provided
	 * @param settings The privacy settings
	 * @returns
	 */
	setPrivacySettings: (settings: Partial<PrivacySettings>) => void;
};
