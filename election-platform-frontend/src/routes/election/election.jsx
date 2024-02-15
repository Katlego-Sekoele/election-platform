import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ApiClient from "utilities/api-client";

export default function Election() {
	const { id } = useParams();
	const [election, setElection] = useState(undefined);

	useEffect(() => {
		async function fetchData() {
			const api = new ApiClient(process.env.REACT_APP_API_URL);
			const data = await api.get.election(id);
			console.log(data);
			setElection(() => data);
		}
		fetchData();
	}, []);

	return (
		<div className="election">
			{election && (
				<div>
					<h1>{election.name}</h1>
					<p>{election.description}</p>
				</div>
			)}
		</div>
	);
}
