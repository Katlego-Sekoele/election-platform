import React from 'react';
import ReactDOM from 'react-dom/client';
import "./tailwind.output.css";
import "./index.css";
import Home from "./routes/home";
import Admin from "./routes/admin";
import Authentication from "./routes/authentication";
import Election from "./routes/election";
import ErrorPage from "./routes/error";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/admin",
				element: <Admin />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/authentication",
				element: <Authentication />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/election",
				element: <Election />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/election/:id",
				element: <Election />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);