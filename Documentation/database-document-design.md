# Database Structure

## Table of Contents

- [Database Structure](#database-structure)
  - [Table of Contents](#table-of-contents)
  - [Users Collection](#users-collection)
  - [Elections Collection](#elections-collection)
  - [Candidates Collection](#candidates-collection)
  - [Parties collection](#parties-collection)

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
}
```

## Candidates Collection

This collection stores information about candidates belonging to a party

```json
{
  "_id": ObjectId,
  "firstName": string,
  "lastName": string,
  "party": ref(Parties),
  "bio": string,
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
}

```
