import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import ApiClient from "utilities/api-client";
import ErrorPage from "routes/error/error";

export function ConfirmAuthentication() {
	const navigate = useNavigate();
	const api = new ApiClient(process.env.REACT_APP_AUTH_URL);
	const [searchParams] = useSearchParams();
	const [authData, setAuthData] = useState(null);
	const [error, setError] = useState(null);

	const errorUi = (
		<section>
			<ErrorPage error={error} />
		</section>
	);

	const dataUi = (
		<section
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "1rem",
			}}
		>
			<p>Account confirmed, redirecting to sign in page...</p>
			<p>
				If you are not redirected, click{" "}
				<Link to="/authentication">here</Link>
			</p>
		</section>
	);

	useEffect(() => {
		async function confirmAuthentication() {
			const token_hash = searchParams.get("token_hash");
			const type = searchParams.get("type");
			const [data, error] = await api.auth.confirm(token_hash, type);

			if (error) {
				setError(error);
			} else if (data) {
				setAuthData(data);
				setTimeout(() => {
					navigate("/authentication");
				}, 2000);
			}
		}
		confirmAuthentication();
	}, []);

	return (
		<div>
			<h1>Confirm Authentication</h1>
			{error && !authData ? errorUi : null}
			{authData ? dataUi : null}
		</div>
	);
}
