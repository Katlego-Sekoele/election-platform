import React from 'react';
import ReactDOM from 'react-dom/client';
import "./tailwind.output.css";
import "./index.css";
import Home from "./routes/home/home";
import Admin from "./routes/admin/admin";
import Authentication from "./routes/authentication/authentication";
import ElectionsBrowser from "./routes/election/elections-browser";
import ErrorPage from "./routes/error/error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Election from "routes/election/election";
import { Toaster } from "@/components/ui/toaster";
import { ConfirmAuthentication } from "routes/authentication/confirm-authentication";

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
				element: <ElectionsBrowser />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/election/:id",
				element: <Election />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/auth/confirm",
				element: <ConfirmAuthentication />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<Toaster />
	</React.StrictMode>
);