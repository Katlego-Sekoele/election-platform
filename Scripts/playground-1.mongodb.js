// Function to generate a random string
function generateRandomString(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
}

// Function to generate random date within a range
function generateRandomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}

// Use the desired database
use("electionplatform");

// Drop existing collections
db.users.drop();
db.parties.drop();
db.elections.drop();
db.candidates.drop();
db.votes.drop();

// Generate a large number of users
const numberOfUsers = 100;
const usersData = Array.from({ length: numberOfUsers }, (_, index) => ({
	authId: `authId${index}`,
	username: `voter${index}`,
	password: `hashed_password${index}`,
	roles: index % 2 === 0 ? ["voter"] : ["admin"],
	identityNumber: `ID${index}`,
	createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	updatedAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	votes: [],
}));

// Insert sample users into the Users collection
const usersResult = db.users.insertMany(usersData);
print(`Inserted ${usersResult.insertedIds.length} users`);

// Generate a large number of parties
const numberOfParties = 20;
const partiesData = Array.from({ length: numberOfParties }, (_, index) => ({
	name: `Party-${index}`,
	description: `Description for Party-${index}`,
	createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	updatedAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	candidates: [],
	votes: [],
}));

// Insert sample parties into the Parties collection
const partiesResult = db.parties.insertMany(partiesData);
print(`Inserted ${partiesResult.insertedIds.length} parties`);

// Generate a large number of elections
const numberOfElections = 10;
const electionsData = Array.from({ length: numberOfElections }, (_, index) => ({
	name: `Election-${index}`,
	type: index % 2 === 0 ? "Presidential" : "Parliamentary",
	startDate: generateRandomDate(new Date(2022, 0, 1), new Date()),
	endDate: generateRandomDate(new Date(2022, 0, 1), new Date()),
	parties: [],
	createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	updatedAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	votes: [],
}));

// Insert sample elections into the Elections collection
const electionsResult = db.elections.insertMany(electionsData);
print(`Inserted ${electionsResult.insertedIds.length} elections`);

// Generate a large number of candidates
const numberOfCandidates = 50;
const candidatesData = Array.from(
	{ length: numberOfCandidates },
	(_, index) => ({
		firstName: `CandidateFirstName-${index}`,
		lastName: `CandidateLastName-${index}`,
		bio: `Bio for Candidate-${index}`,
		position: `Position-${index}`,
		createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
		updatedAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	})
);

// Insert sample candidates into the Candidates collection
const candidatesResult = db.candidates.insertMany(candidatesData);
print(`Inserted ${candidatesResult.insertedIds.length} candidates`);

// Assign candidates to parties
const partiesToUpdate = partiesData.map((party, index) => ({
	updateOne: {
		filter: { _id: partiesResult.insertedIds[index] },
		update: {
			$set: {
				candidates: [
					candidatesResult.insertedIds[index % numberOfCandidates],
				],
			},
		},
	},
}));

// Bulk update parties with assigned candidates
db.parties.bulkWrite(partiesToUpdate);
print(`Assigned candidates to parties`);

// Generate a large number of votes
const numberOfVotes = 200;
const votesData = Array.from({ length: numberOfVotes }, (_, index) => ({
	user: usersResult.insertedIds[index % numberOfUsers],
	party: partiesResult.insertedIds[index % numberOfParties],
	createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
	updatedAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
}));

// Insert sample votes into the Votes collection
const votesResult = db.votes.insertMany(votesData);
print(`Inserted ${votesResult.insertedIds.length} votes`);

// Update users with votes
const usersToUpdate = votesData.map((vote, index) => ({
	updateOne: {
		filter: { _id: vote.user },
		update: { $push: { votes: votesResult.insertedIds[index] } },
	},
}));

// Bulk update users with assigned votes
db.users.bulkWrite(usersToUpdate);
print(`Assigned votes to users`);

// Update parties with votes
const partiesToUpdateWithVotes = votesData.map((vote, index) => ({
	updateOne: {
		filter: { _id: vote.party },
		update: { $push: { votes: votesResult.insertedIds[index] } },
	},
}));

// Bulk update parties with assigned votes
db.parties.bulkWrite(partiesToUpdateWithVotes);
print(`Assigned votes to parties`);
