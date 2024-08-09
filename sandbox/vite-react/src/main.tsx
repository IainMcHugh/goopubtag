import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { config } from "./Config";

const routes = config.map((x) => ({
	path: x.path,
	element: x.element,
}));

const router = createBrowserRouter(routes);

ReactDOM.render(
	<RouterProvider router={router} />,
	document.getElementById("root"),
);
