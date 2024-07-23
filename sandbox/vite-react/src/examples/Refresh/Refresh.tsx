import React from "react";
import { GPTProvider, GPTSlot, useGPT } from "../../../../../dist";

const Refresh = () => {
	return (
		<GPTProvider networkId={6355419} debug={true}>
			<Component />
		</GPTProvider>
	);
};

const Component = () => {
	const { refresh } = useGPT();

	const handleClick = () => {
		refresh();
	};
	return (
		<div>
			<GPTSlot
				slotId="banner-ad"
				adUnit="Travel/Europe/France/Paris"
				sizes={[300, 250]}
			/>
			<button type="button" onClick={handleClick}>
				Refresh
			</button>
		</div>
	);
};

export { Refresh };
