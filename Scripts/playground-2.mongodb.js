// Import necessary MongoDB packages
import { MongoClient, ObjectId } from "mongodb";
import { fakerEN as faker, fakerDE, fakerZH_CN } from "@faker-js/faker";

function generateUsername() {
	return faker.internet.userName();
}

function generateIdentityNumber() {
	return faker.number.int({ min: 100000000, max: 999999999 }).toString();
}

const generateUsers = (count) => {
	const users = [];
	for (let i = 0; i < count; i++) {
		users.push({
			authId: `auth_id_${i + 1}`,
			username: generateUsername(),
			password: `hashed_password_${i + 1}`,
			roles: i % 5 === 0 ? ["admin"] : ["voter"],
			identityNumber: generateIdentityNumber(),
			createdAt: new Date(),
			updatedAt: new Date(),
			votes: [],
		});
	}
	return users;
};

const generateElections = (count) => {
	const elections = [];
	for (let i = 0; i < count; i++) {
		elections.push({
			name: `Election ${i + 1}`,
			type: i % 2 === 0 ? "general" : "local",
			startDate: faker.date.future(),
			endDate: faker.date.future({ years: 0.1, refDate: new Date() }),
			parties: [],
			createdAt: new Date(),
			updatedAt: new Date(),
			votes: [],
		});
	}
	return elections;
};

const generateCandidates = (count) => {
	const candidates = [];
	for (let i = 0; i < count; i++) {
		candidates.push({
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			bio: faker.lorem.sentence(),
			position: i % 2 === 0 ? "President" : "Mayor",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
	return candidates;
};

const generateParties = (count, candidates) => {
	const parties = [];
	for (let i = 0; i < count; i++) {
		const partyCandidates = candidates.slice(i * 2, (i + 1) * 2);
		parties.push({
			name: `Party ${i + 1}`,
			description: faker.lorem.paragraph(),
			createdAt: new Date(),
			updatedAt: new Date(),
			candidates: partyCandidates.map((candidate) => candidate._id),
			votes: [],
		});
	}
	return parties;
};

const generateVotes = (count, users, parties) => {
	const votes = [];
	for (let i = 0; i < count; i++) {
		const randomUser = users[Math.floor(Math.random() * users.length)];
		const randomParty = parties[Math.floor(Math.random() * parties.length)];
		votes.push({
			user: randomUser._id,
			party: randomParty._id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		randomUser.votes.push(votes[votes.length - 1]._id);
		randomParty.votes.push(votes[votes.length - 1]._id);
	}
	return votes;
};

const uri =
	"mongodb+srv://election-platform-admin:pMv5OBh8YjuMZF87@electionplatform.24kbi0s.mongodb.net/electionplatform?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		const database = client.db();

		// Check if collections exist before dropping
		const existingCollections = await database.listCollections().toArray();
		const collectionsToDrop = [
			"users",
			"elections",
			"candidates",
			"parties",
			"votes",
		];

		for (const collectionName of collectionsToDrop) {
			if (
				existingCollections.some(
					(collection) => collection.name === collectionName
				)
			) {
				await database.dropCollection(collectionName);
			}
		}

		// Generate mock data
		const usersData = generateUsers(50);
		const electionsData = generateElections(5);
		const candidatesData = generateCandidates(20);
		const partiesData = generateParties(10, candidatesData);
		const votesData = generateVotes(100, usersData, partiesData);

		// Insert mock data into Users Collection
		const usersCollection = database.collection("users");
		const insertedUsers = await usersCollection.insertMany(usersData);

		const userMap = new Map();
		for (let i = 0; i < insertedUsers.insertedIds.length; i++) {
			userMap.set(usersData[i].authId, insertedUsers.insertedIds[i]);
		}

		// Insert mock data into Elections Collection
		const electionsCollection = database.collection("elections");
		const insertedElections = await electionsCollection.insertMany(
			electionsData
		);

		const electionMap = new Map();
		for (let i = 0; i < insertedElections.insertedIds.length; i++) {
			electionMap.set(
				electionsData[i].name,
				insertedElections.insertedIds[i]
			);
		}

		// Insert mock data into Candidates Collection
		const candidatesCollection = database.collection("candidates");
		const insertedCandidates = await candidatesCollection.insertMany(
			candidatesData
		);

		const candidateMap = new Map();
		for (let i = 0; i < insertedCandidates.insertedIds.length; i++) {
			candidateMap.set(
				candidatesData[i].firstName,
				insertedCandidates.insertedIds[i]
			);
		}

		// Insert mock data into Parties Collection
		const partiesCollection = database.collection("parties");
		const insertedParties = await partiesCollection.insertMany(partiesData);

		const partyMap = new Map();
		for (let i = 0; i < insertedParties.insertedIds.length; i++) {
			partyMap.set(partiesData[i].name, insertedParties.insertedIds[i]);
		}

		// Insert mock data into Votes Collection
		const votesCollection = database.collection("votes");
		await votesCollection.insertMany(votesData);

		// Ensure referential integrity between Users, Parties, and Votes
		const updateUsersPromises = usersData.map((user) => {
			const updatedVotes = user.votes.map((authId) =>
				userMap.get(authId)
			);
			return usersCollection.updateOne(
				{ authId: user.authId },
				{ $set: { votes: updatedVotes } }
			);
		});

		const updatePartiesPromises = partiesData.map((party) => {
			const updatedCandidates = party.candidates.map((firstName) =>
				candidateMap.get(firstName)
			);
			const updatedVotes = party.votes.map((authId) =>
				partyMap.get(authId)
			);
			return partiesCollection.updateOne(
				{ name: party.name },
				{ $set: { candidates: updatedCandidates, votes: updatedVotes } }
			);
		});

		await Promise.all([...updateUsersPromises, ...updatePartiesPromises]);

		console.log(
			"Mock data inserted successfully with referential integrity."
		);
	} finally {
		await client.close();
	}
}

run().catch(console.error);
