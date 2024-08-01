/**
 * When adding a new size you can find references for names here:
 * https://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf
 * https://www.iab.com/wp-content/uploads/2017/08/IABNewAdPortfolio_FINAL_2017.pdf
 */

const UNIT_SIZE = {
	BILLBOARD: [970, 250],
	SKYSCRAPER_WIDE: [300, 600],
	SKYSCRAPER: [160, 600],
	SKYSCRAPER_SLIM: [120, 600],
	LEADERBOARD_XL: [970, 90],
	LEADERBOARD_LARGE: [920, 90],
	LEADERBOARD: [728, 90],
	MPU: [320, 250],
	MPU_300: [300, 250],
	MOBILE_LEADERBOARD_LARGE: [468, 60],
	MOBILE_LEADERBOARD_MEDIUM: [320, 100],
	MOBILE_LEADERBOARD: [320, 50],
	LINE_TEXT_UNIT: [280, 18],
	ONE_BY_ONE: [1, 1],
	FLUID: "fluid",
} as const;

export const SCREEN_SIZE = {
	DESKTOP_LARGEST: [1220, 0],
	DESKTOP_PLUS: [970, 0],
	DESKTOP: [861, 0],
	TABLET_PLUS: [728, 0],
	TABLET: [600, 0],
	MOBILE_PLUS: [468, 0],
	MOBILE: [320, 0],
} as const;

export const GUIDELINES = {
	UNIT_SIZE,
	SCREEN_SIZE,
};
