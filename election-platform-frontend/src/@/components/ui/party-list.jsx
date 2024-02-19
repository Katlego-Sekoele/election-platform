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
import "./styles/party-list.css";
import { Link } from "react-router-dom";

export function PartyCard(props) {
	const { candidates, description, name } = props;
	const [seeMore, setSeeMore] = useState(false);

	function toggleSeeMore() {
		setSeeMore(!seeMore);
	}

	/*
    candidates: [
    {
        _id: "60a2e4f5c8d0e3e9f3e6f4c1",
        firstName: "John",
        lastName: "Doe",
        bio: "I am John Doe",
    }
    ]
    */

	return (
		<Card>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>
					{description || "No description provided."}
					{description && description.length > 100 && !seeMore ? (
						<button
							className="see-more-button"
							onClick={toggleSeeMore}
						>
							See more
						</button>
					) : null}
					{description && description.length > 100 && seeMore ? (
						<button
							className="see-more-button"
							onClick={toggleSeeMore}
						>
							See less
						</button>
					) : null}
				</CardDescription>
			</CardHeader>
			{seeMore ? (
				<CardContent className="card-content">
					<h3 className="candidates-h3">
						{candidates.length ? "Candidates" : null}
					</h3>
					<ul>
						{candidates.map((candidate) => (
							<li className="candidate-li" key={candidate._id}>
								<h4 className="candidate-name">
									{candidate.firstName} {candidate.lastName}
								</h4>
								<p className="candidate-bio">{candidate.bio}</p>
							</li>
						))}
					</ul>
				</CardContent>
			) : null}
			<CardFooter></CardFooter>
		</Card>
	);
}
export function PartiesList(props) {
	const { heading, parties } = props;

	const [partiesState, setParties] = useState(undefined);

	useEffect(() => {
		setParties(parties);
	}, [parties]);

	const electionPartiesComponent = (
		<section className="party-card-container">
			{partiesState?.map((party) => (
				<PartyCard
					key={party._id}
					id={party._id}
					name={party.name}
					description={party.description}
					candidates={party.candidates}
				/>
			))}
		</section>
	);

	return (
		<div className="featured-elections">
			<h2>{heading}</h2>
			{electionPartiesComponent}
		</div>
	);
}
