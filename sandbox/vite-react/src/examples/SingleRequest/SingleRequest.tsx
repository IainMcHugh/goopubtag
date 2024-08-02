import React from "react";
import { GPTProvider, GPTSlot } from "../../../../../dist";

const SingleRequest = () => {
	return (
		<GPTProvider networkId={6355419} singleRequest debug>
			<Component />
		</GPTProvider>
	);
};

const Component = () => {
	return (
		<div>
			<h1>Enable single request</h1>
			<GPTSlot
				slotId="banner-ad-1"
				adUnit="Travel/Europe/France/Paris"
				sizes={[300, 250]}
			/>
			<br />
			<GPTSlot
				slotId="banner-ad-2"
				adUnit="Travel/Europe/France/Paris"
				sizes={[300, 250]}
			/>
		</div>
	);
};

export { SingleRequest };
