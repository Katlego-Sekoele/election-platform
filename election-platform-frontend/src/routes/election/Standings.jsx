import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { countVotes, VotingSubCard } from "./election";

export function Standings(props) {
	const { votes, parties, election, fetchData, showBallot } = props;

	const [partiesState, setPartiesState] = useState(parties);
	const [votesState, setVotesState] = useState(votes);
	const [voteCount, setVoteCount] = useState([]);

	useEffect(() => {
		setPartiesState(parties);
		setVotesState(votes);
		setVoteCount(countVotes(parties, votes));
	}, [parties, votes]);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Vote Count</CardTitle>
					<CardDescription>
						<p>Vote count for each party</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul>
						{voteCount.map((party) => (
							<li key={party._id} className="party-votes-li">
								{party.name}
								<Badge className="vote-number-badge">
									{party.votes}
								</Badge>
								<Progress
									value={
										(party.votes / votesState.length) * 100
									}
								></Progress>
							</li>
						))}
					</ul>
					<p>
						Total Votes: <Badge>{votesState.length}</Badge>
					</p>
				</CardContent>
				{showBallot ? (
					<CardFooter>
						<VotingSubCard
							parties={parties}
							election={election}
							fetchData={fetchData}
						/>
					</CardFooter>
				) : null}
			</Card>
		</>
	);
}
