import React, { type CSSProperties } from "react";

import App from "./App";
import { AdEventListeners } from "./examples/AdEventListeners/AdEventListeners";
import { AdSizes } from "./examples/AdSizes/AdSizes";
import { CollapseEmptyAdSlots } from "./examples/CollapseEmptyAdSlots/CollapseEmptyAdSlots";
import { ConfigurePrivacy } from "./examples/ConfigurePrivacy/ConfigurePrivacy";
import { DisplayAnchorAd } from "./examples/DisplayAnchorAd/DisplayAnchorAd";
import { DisplayLimitedAd } from "./examples/DisplayLimitedAd/DisplayLimitedAd";
import { DisplayRailAd } from "./examples/DisplayRailAd/DisplayRailAd";
import { DisplayRewardedAd } from "./examples/DisplayRewardedAd/DisplayRewardedAd";
import { DisplayTestAd } from "./examples/DisplayTestAd/DisplayTestAd";
import { KeyValueTargeting } from "./examples/KeyValueTargeting/KeyValueTargeting";
import { LazyLoad } from "./examples/LazyLoad/LazyLoad";
import { Refresh } from "./examples/Refresh/Refresh";
import { SingleRequest } from "./examples/SingleRequest/SingleRequest";

export const config = [
	{
		name: "Home",
		path: "/",
		element: <App />,
	},
	{
		name: "Display test ad",
		path: "/examples/display-test-ad",
		element: <DisplayTestAd />,
	},
	{
		name: "Key value targeting",
		path: "/examples/key-value-targeting",
		element: <KeyValueTargeting />,
	},
	{
		name: "Refresh",
		path: "/examples/refresh",
		element: <Refresh />,
	},
	{
		name: "Ad sizes",
		path: "/examples/ad-sizes",
		element: <AdSizes />,
	},
	{
		name: "Display limited ad",
		path: "/examples/display-limited-ad",
		element: <DisplayLimitedAd />,
	},
	{
		name: "Configure privacy",
		path: "/examples/configure-privacy",
		element: <ConfigurePrivacy />,
	},
	{
		name: "Ad event Listeners",
		path: "/examples/ad-event-listeners",
		element: <AdEventListeners />,
	},
	{
		name: "Collapse empty ad slots",
		path: "/examples/collapse-empty-ad-slots",
		element: <CollapseEmptyAdSlots />,
	},
	{
		name: "Display side rail ad",
		path: "/examples/display-side-rail-ad",
		element: <DisplayRailAd />,
	},
	{
		name: "Display anchor ad",
		path: "/examples/display-anchor-ad",
		element: <DisplayAnchorAd />,
	},
	{
		name: "Display rewarded ad",
		path: "/examples/display-rewarded-ad",
		element: <DisplayRewardedAd />,
	},
	{
		name: "Lazy load",
		path: "/examples/lazy-load",
		element: <LazyLoad />,
	},
	{
		name: "Single Request",
		path: "/examples/enable-single-request",
		element: <SingleRequest />,
	},
];

export type Styles = Record<string, CSSProperties>;
