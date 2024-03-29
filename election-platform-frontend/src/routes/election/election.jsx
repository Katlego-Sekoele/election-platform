import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import ApiClient from "utilities/api-client";
import { PartiesList } from "@/components/ui/party-list";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import "./election.css";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { SupabaseSessionContext } from "utilities/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { Standings } from "./Standings";

export default function Election() {
	const { id } = useParams();
	const [election, setElection] = useState(undefined);

	async function fetchData() {
		const api = new ApiClient(process.env.REACT_APP_API_URL);
		const data = await api.get.election(id);
		setElection(() => data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="election">
			{election && (
				<div>
					<h1>{election.name}</h1>
					<p>{election.description}</p>
					<section className="standings-container">
						<Standings
							parties={election.parties}
							votes={election.votes}
							election={election}
							fetchData={fetchData}
							showBallot={true}
						/>
					</section>
					<section className="parties-container">
						<h2>Parties</h2>
						<PartiesList parties={election.parties} fetchData />
					</section>
				</div>
			)}
		</div>
	);
}

export function VotingSubCard(props) {
	const { parties, election, fetchData } = props;
	const [selectedParty, setSelectedParty] = useState(null);
	const [session, setSession] = useContext(SupabaseSessionContext);
	const apiClient = new ApiClient(process.env.REACT_APP_API_URL);
	const { toast } = useToast();

	const handlePartyChange = (partyId) => {
		setSelectedParty(partyId);
	};

	const onFormSubmit = async () => {
		const user = await apiClient.get.me();

		if (!user) {
			toast({
				variant: "destructive",
				title: "Error casting vote",
				description: "You must be logged in to vote",
			});
			return;
		}

		const body = {
			partyId: selectedParty,
			electionId: election._id,
			userId: user._id,
		};
		const data = await apiClient.post.vote(body);

		if (data.error) {
			toast({
				variant: "destructive",
				title: "Error casting vote",
				description:
					data.error ||
					data.message ||
					data.error.message ||
					data.error.error ||
					"An error occurred",
			});
		} else {
			toast({
				title: "Vote cast successfully",
				description: "Thank you for voting!",
			});
		}

		fetchData();
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Voting Ballot</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-4">
					<RadioGroup name="party">
						{parties.map((party) => (
							<span
								key={party._id}
								className="flex items-center space-x-2"
							>
								<RadioGroupItem
									key={party._id}
									value={party._id}
									label={party.name}
									checked={selectedParty === party._id}
									onChange={() =>
										handlePartyChange(party._id)
									}
								/>
								<Label htmlFor={party._id}>{party.name}</Label>
							</span>
						))}
					</RadioGroup>
				</div>
			</CardContent>
			<CardFooter className="flex space-x-2">
				<Button type="submit" onClick={onFormSubmit}>
					Submit
				</Button>
			</CardFooter>
		</Card>
	);
}

export function countVotes(parties, votes) {
	const partyVotes = parties.map((party) => {
		const partyVotes = votes.filter((vote) => vote.party._id === party._id);
		return {
			...party,
			votes: partyVotes.length,
		};
	});

	return partyVotes;
}
