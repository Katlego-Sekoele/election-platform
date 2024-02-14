import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApiClient from "utilities/api-client";
import "./styles/elections-list.css";

export function ElectionCard(props) {
	const { name, type, description, startDate, endDate } = props;

	return (
		<Card>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>
					{description || "No description provided."}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Badge variant="">{type}</Badge>
			</CardContent>
			<CardFooter>
				<Badge variant="secondary">
					{new Date(endDate).toLocaleDateString()}
				</Badge>
			</CardFooter>
		</Card>
	);
}
export function ElectionsList(props) {
	const api = new ApiClient(process.env.REACT_APP_API_URL);
	const { heading, length } = props;

	const [elections, setElections] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);

	async function fetchData() {
		try {
			const usersResponse = await api.get.election();

			let elections;
			if (Number(length) > 0) {
				elections =
					usersResponse.length < length
						? usersResponse
						: usersResponse.slice(0, length);
			} else {
				elections = usersResponse;
			}

			setElections(elections);
		} catch (error) {
			console.error("Error fetching elections:", error);
			// Handle error: set error state or display message
		}
	}

	useEffect(() => {
		fetchData()
			.then(() => setIsLoading(false))
			.catch(() => setIsLoading(false));
	}, []);

	const featuredElectionsComponent = (
		<section className="election-card-container">
			{elections?.map((election) => (
				<ElectionCard
					key={election._id}
					name={election.name}
					type={election.type}
					description={election.description}
					startDate={election.startDate}
					endDate={election.endDate}
				/>
			))}
		</section>
	);

	const noElectionsComponent = (
		<p>No featured elections at the moment. Please check back later.</p>
	);

	let electionsComponent;
	if (isLoading) {
		electionsComponent = <p>Loading elections...</p>;
	} else if (elections?.length > 0) {
		electionsComponent = featuredElectionsComponent;
	} else {
		electionsComponent = noElectionsComponent;
	}

	return (
		<div className="featured-elections">
			<h2>{heading}</h2>
			{electionsComponent}
		</div>
	);
}
