import React from "react";
import { Link } from "react-router-dom";

import { config } from "./Config";

function App() {
	return (
		<div>
			<h1>Welcome to Goopubtag </h1>
			<div
				style={{
					display: "inline-flex",
					alignItems: "center",
					fontSize: "24px",
				}}
			>
				<h2 style={{ marginRight: "8px", fontSize: "24px", fontWeight: 200 }}>
					The following examples correspond to Google Publisher Tag examples
					listed
				</h2>
				<a
					href="https://github.com/googleads/google-publisher-tag-samples"
					style={{
						fontSize: "24px",
						textDecoration: "none",
						fontWeight: 200,
						color: "darkcyan",
					}}
				>
					here
				</a>
			</div>
			<ul style={{ paddingInlineStart: "0" }}>
				{config.map((x) => (
					<li
						key={x.name}
						style={{
							listStyle: "none",
							padding: "4px",
						}}
					>
						<Link
							to={x.path}
							reloadDocument
							style={{
								fontSize: "20px",
								textDecoration: "none",
								fontWeight: 200,
								color: "darkcyan",
							}}
						>
							{x.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
