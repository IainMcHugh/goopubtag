import React from "react";
import { GPTProvider, GPTSlot } from "../../../../../dist";

const DisplayOutOfPageAd = () => {
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
				slotId="out-of-page-ad"
				adUnit="Travel/Europe/France/Paris"
				sizes={[300, 250]}
				targetingArguments={{ test: "outofpage" }}
				outOfPage={true}
			/>
		</div>
	);
};

export { DisplayOutOfPageAd };
