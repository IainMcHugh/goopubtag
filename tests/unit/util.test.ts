import { describe, it, expect, vi, beforeEach } from "vitest";

import { getGPTScript } from "lib/utils";
import { GPT_SCRIPT_SRC } from "lib/constants/script";

describe("Unit | Util", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("should create a script element with the standard src when limitedAds is false", () => {
		const script = getGPTScript({ limitedAds: false });
		expect(script).toBeInstanceOf(HTMLScriptElement);
		expect(script.src).toBe(GPT_SCRIPT_SRC.STANDARD);
		expect(script.async).toBe(true);
		expect(script.type).toBe("text/javascript");
	});

	it("should create a script element with the limited ads src when limitedAds is true", () => {
		const script = getGPTScript({ limitedAds: true });
		expect(script).toBeInstanceOf(HTMLScriptElement);
		expect(script.src).toBe(GPT_SCRIPT_SRC.LIMITED_ADS);
		expect(script.async).toBe(true);
		expect(script.type).toBe("text/javascript");
	});
});
