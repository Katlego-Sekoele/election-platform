# Database Structure

## Table of Contents

- [Database Structure](#database-structure)
  - [Table of Contents](#table-of-contents)
  - [Users Collection](#users-collection)
  - [Elections Collection](#elections-collection)
  - [Candidates Collection](#candidates-collection)
  - [Parties collection](#parties-collection)
  - [Votes Collection](#votes-collection)

## Users Collection

This collection stores information about both voters and admins.

```json
{
  "_id": ObjectId,
  "authId": string,
  "username": string,
  "password": "hashed_password",
  "roles": string[],
  "identityNumber": string,
  "createdAt": datetime,
  "updatedAt": datetime,
  "votes": ref(Votes)[],
}

```

## Elections Collection

This collection stores information about elections.

```json
{
  "_id": ObjectId,
  "name": string,
  "type": string,
  "startDate": datetime,
  "endDate": datetime,
  "parties": ref(Parties)[],
  "createdAt": datetime,
  "updatedAt": datetime,
  "votes": ref(Votes)[],
}
```

## Candidates Collection

This collection stores information about candidates belonging to a party

```json
{
  "_id": ObjectId,
  "firstName": string,
  "lastName": string,
  "bio": string,
  "position": string,
  "createdAt": datetime,
  "updatedAt": datetime,
}

```

## Parties collection

This collection stores information about parties in the system

```json
{
  "_id": ObjectId,
  "name": string,
  "description": string,
  "createdAt": datetime,
  "updatedAt": datetime,
  "candidates": ref(Candidates)[],
  "votes": ref(Votes)[],
}

```

## Votes Collection

This collection stores information about votes casted by voters

```json
{
  "_id": ObjectId,
  "user": ref(Users),
  "party": ref(party),
  "createdAt": datetime,
  "updatedAt": datetime,
}

```
