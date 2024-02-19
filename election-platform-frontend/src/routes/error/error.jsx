import { useRouteError } from "react-router-dom";
import "./error.css";

export default function ErrorPage(props) {
	const error = useRouteError();
	const propError = props.error;

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{propError.message || error.statusText || error.message}</i>
			</p>
		</div>
	);
}