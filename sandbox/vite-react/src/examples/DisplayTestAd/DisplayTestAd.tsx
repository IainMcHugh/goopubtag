import React from "react";
import { GPTProvider, GPTSlot } from "../../../../../dist";

const DisplayTestAd = () => {
	return (
		<GPTProvider networkId={6355419} debug={true}>
			<Component />
		</GPTProvider>
	);
};

const Component = () => {
	return (
		<div>
			<p>Display test ad</p>
			<GPTSlot
				slotId="banner-ad"
				adUnit="Travel/Europe/France/Paris"
				sizes={[300, 250]}
			/>
		</div>
	);
};

export { DisplayTestAd };
