import React, { useState } from "react";
import { GPTProvider } from "../../../../../dist";
import type { Styles } from "../../Config";

const DisplayAnchorAd = () => {
	const [status, setStatus] = useState(
		"Anchor ads are not supported on this page.",
	);

	const handleSlotLoad = () => {
		console.log("aa");
		setStatus("Anchor ad (top) loaded. Scroll down to view..");
	};
	return (
		<GPTProvider
			networkId={6355419}
			debug={true}
			outOfPage={{
				adUnit: "Travel",
				targetingArguments: { test: "anchor" },
				onSlotLoad: handleSlotLoad,
				type: "anchor",
				settings: {
					position: "top",
				},
			}}
		>
			<Component status={status} />
		</GPTProvider>
	);
};

const Component = (props: { status: string }) => {
	return (
		<div style={styles.base}>
			<p>{props.status}</p>
		</div>
	);
};

const styles = {
	base: {
		height: "900vh",
	},
} satisfies Styles;

export { DisplayAnchorAd };
