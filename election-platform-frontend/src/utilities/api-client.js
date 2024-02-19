export default class ApiClient {
	apiUrl;
	static jwt;
	static refreshToken;

	constructor(url, jwt = undefined) {
		this.apiUrl = url;
		if (jwt) {
			ApiClient.jwt = jwt;
		}
	}

	static setJwt(jwt) {
		ApiClient.jwt = jwt;
	}

	static setRefreshToken(refreshToken) {
		ApiClient.refreshToken = refreshToken;
	}

	auth = {
		confirm: async (token, type) => {
			const url = `${process.env.REACT_APP_AUTH_URL}/auth/confirm?token_hash=${token}&type=${type}`;
			const response = await fetch(url);
			const data = await response.json();
			const error = response.status === 500 ? data : null;
			return [data, error];
		},
	};

	get = {
		me: async () => {
			const url = `${this.apiUrl}/me`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const data = await response.json();
			return data;
		},
		user: async (id = null) => {
			const url = id
				? `${this.apiUrl}/users/${id}`
				: `${this.apiUrl}/users`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ApiClient.jwt} ${ApiClient.refreshToken}`,
				},
			});
			const data = await response.json();
			return data;
		},
		election: async (id = null) => {
			const url = id
				? `${this.apiUrl}/elections/${id}`
				: `${this.apiUrl}/elections`;
			const headers = {
				Authorization: `Bearer ${ApiClient.jwt} ${ApiClient.refreshToken}`,
			};
			const response = await fetch(url, {
				headers,
			});
			const data = await response.json();
			return data;
		},
		candidate: async (id = null) => {
			const url = id
				? `${this.apiUrl}/candidates/${id}`
				: `${this.apiUrl}/candidates`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const data = await response.json();
			return data;
		},
		vote: async (id = null) => {
			const url = id
				? `${this.apiUrl}/votes/${id}`
				: `${this.apiUrl}/votes`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const data = await response.json();
			return data;
		},
		party: async (id = null) => {
			const url = id
				? `${this.apiUrl}/parties/${id}`
				: `${this.apiUrl}/parties`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const data = await response.json();
			return data;
		},
		collection: async (collectionName, id) => {
			if (!collectionName || collectionName.trim() === "") {
				throw new Error("Collection name is required");
			}
			const url = id
				? `${this.apiUrl}/${collectionName}/${id}`
				: `${this.apiUrl}/${collectionName}`;
			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const data = await response.json();
			return data;
		},
	};

	post = {
		user: async (data) => {
			const url = `${this.apiUrl}/users`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		election: async (data) => {
			const url = `${this.apiUrl}/elections`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		electionParty: async (electionId, data) => {
			if (!electionId || electionId.trim() === "") {
				throw new Error("Election ID is required");
			}
			const url = `${this.apiUrl}/elections/${electionId}/parties`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		candidate: async (data) => {
			const url = `${this.apiUrl}/candidates`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		vote: async (data) => {
			const url = `${this.apiUrl}/votes`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		party: async (data) => {
			const url = `${this.apiUrl}/parties`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		partyCandidate: async (partyId, data) => {
			if (!partyId || partyId.trim() === "") {
				throw new Error("Party ID is required");
			}
			const url = `${this.apiUrl}/parties/${partyId}/candidates`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		collection: async (collectionName, data) => {
			if (!collectionName || collectionName.trim() === "") {
				throw new Error("Collection name is required");
			}
			const url = `${this.apiUrl}/${collectionName}`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
	};

	put = {
		user: async (id, data) => {
			if (!id || id.trim() === "") {
				throw new Error("User ID is required");
			}
			const url = `${this.apiUrl}/users/${id}`;
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		election: async (id, data) => {
			if (!id || id.trim() === "") {
				throw new Error("Election ID is required");
			}
			const url = `${this.apiUrl}/elections/${id}`;
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		candidate: async (id, data) => {
			if (!id || id.trim() === "") {
				throw new Error("Candidate ID is required");
			}
			const url = `${this.apiUrl}/candidates/${id}`;
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
		party: async (id, data) => {
			if (!id || id.trim() === "") {
				throw new Error("Party ID is required");
			}
			const url = `${this.apiUrl}/parties/${id}`;
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			return responseData;
		},
	};

	delete = {
		user: async (id) => {
			if (!id || id.trim() === "") {
				throw new Error("User ID is required");
			}
			const url = `${this.apiUrl}/users/${id}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const responseData = await response.json();
			return responseData;
		},
		election: async (id) => {
			if (!id || id.trim() === "") {
				throw new Error("Election ID is required");
			}
			const url = `${this.apiUrl}/elections/${id}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const responseData = await response.json();
			return responseData;
		},
		electionParty: async (electionId, partyId) => {
			if (!electionId || electionId.trim() === "") {
				throw new Error("Election ID is required");
			}
			if (!partyId || partyId.trim() === "") {
				throw new Error("Party ID is required");
			}
			const url = `${this.apiUrl}/elections/${electionId}/parties/${partyId}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const responseData = await response.json();
			return responseData;
		},
		candidate: async (id) => {
			if (!id || id.trim() === "") {
				throw new Error("Candidate ID is required");
			}
			const url = `${this.apiUrl}/candidates/${id}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const responseData = await response.json();
			return responseData;
		},
		party: async (id) => {
			if (!id || id.trim() === "") {
				throw new Error("Party ID is required");
			}
			const url = `${this.apiUrl}/parties/${id}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const responseData = await response.json();
			return responseData;
		},
		partyCandidate: async (partyId, candidateId) => {
			if (!partyId || partyId.trim() === "") {
				throw new Error("Party ID is required");
			}
			if (!candidateId || candidateId.trim() === "") {
				throw new Error("Candidate ID is required");
			}
			const url = `${this.apiUrl}/parties/${partyId}/candidates/${candidateId}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${ApiClient.jwt}`,
				},
			});
			const responseData = await response.json();
			return responseData;
		},
	};
}
