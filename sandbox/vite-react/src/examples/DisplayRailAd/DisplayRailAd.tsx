import React, { useState } from "react";
import { GPTProvider } from "../../../../../dist";
import type { Styles } from "../../Config";

const DisplayRailAd = () => {
	const [status, setStatus] = useState(
		"Side rail ad (left) is not supported on this page.",
	);

	const handleSlotLoad = () => setStatus("Side rail ad (left) is loaded.");

	return (
		<GPTProvider
			networkId={6355419}
			outOfPage={{
				adUnit: "Travel/Europe",
				type: "rail",
				onSlotLoad: handleSlotLoad,
				settings: {
					position: "left", // or right
				},
			}}
			debug
		>
			<Component status={status} />
		</GPTProvider>
	);
};

const Component = (props: { status: string }) => {
	return (
		<div style={styles.pageContent}>
			<div id="slot1" style={styles.status}>
				{props.status}
			</div>
		</div>
	);
};

const styles: Styles = {
	adSlot: {
		border: "1px dashed",
		display: "inline-block",
		margin: "10px",
	},
	pageContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "calc(100% - 400px)",
		minHeight: "200vh",
		margin: "auto",
	},
	status: {
		margin: "10px",
		minWidth: "50%",
		textAlign: "center",
	},
};

export { DisplayRailAd };
