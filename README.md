# Welcome!

This project is a Back-end API for registering lecturers ('talkers'). This was my first Back-end project with Node and it's a CRUD API that uses files as a database with Node's `fs` module and also validates user inputs with middlewares.

This project was developed while studying Back-end web development [@betrybe](https://github.com/betrybe). The files I worked on are in the ```/src``` folder. I got approval on 100% of this project's requirements.

## Main languages and tools used

- Node.js
- Express.js
- Docker

## Installation

<details>
<summary><strong>With Docker</strong></summary>

- Start the `talker_manager` container with the `docker-compose up -d` command
- Access the container's terminal with `docker exec -it talker_manager bash`
- In the terminal, install the dependencies with `npm install`
- **All other node commands must be run inside the container**

</details>

<details>
<summary><strong>Without Docker</strong></summary>

- Install the dependencies with ``` npm install ``` (requires node on version 16)

</details>

<details>
<summary><strong>Commands</strong></summary>

- Run the app with `npm start` or `npm run dev` (live reload)
- To run the project's requirements tests, first start the app with `npm run dev`, then `npm test` for all tests or `npm test <test-name>` for a specific requirement (ex. `npm test 01`)
- Use `npm run restore` to restore the `src/talker.json` file to its original state

</details>

## Endpoints

<details>
<summary><strong>GET</strong> <code>/talker</code></summary>

<br />

- Returns an array with all the registered lecturers, or an empty array if there are no registers. 

<br />

- Example:

```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```

</details>

<details>
<summary><strong>GET</strong> <code>/talker/:id</code></summary>

<br />

- Returns the lecturer with the specified `id`. If there are no matches, returns status 404 with a message.

<br />

- Example of match:

```json
{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": { "watchedAt": "23/10/2020", "rate": 5 }
}
```

- Example of no match:

```json
{
  "message": "Pessoa palestrante não encontrada"
}
```

</details>

<details>
<summary><strong>POST</strong> <code>/login</code></summary>

<br />

- Returns a random 16 character token required to access some of the endpoints. In the request body, the user must inform an email and password.

<br />

- Example request body:

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

- Example of returned token:

```json
{
  "token": "7mqaVRXJSp886CGr"
}
```

</details>

<details>
<summary><strong>POST</strong> <code>/talker</code></summary>

<br />

- **Requires token in the request header under `authorization`**  
- Adds a new lecturer and returns it with the respective id.

<br />

- Example request body:

```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

- Example of return:

```json
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

</details>

<details>
<summary><strong>PUT</strong> <code>/talker/:id</code></summary>

<br />

- **Requires token in the request header under `authorization`**  
- Updates a lecturer and returns it with the respective id. 

<br />

- Example request body:

```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

- Example of return:

```json
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

</details>

<details>
<summary><strong>DELETE</strong> <code>/talker/:id</code></summary>

<br />

- **Requires token in the request header under `authorization`**  
- Deletes a lecturer and returns status 204.

</details>

<details>
<summary><strong>GET</strong> <code>/talker/search?q=searchTerm</code></summary>

<br />

- **Requires token in the request header under `authorization`**  
- Returns an array of lecturers whose names matches the request search term. If there are no matches, returns an empty array. If the search term is empty, returns an array with all registered lecturers.

<br />

- Example of match:

```
/search?q=Da
```

```json
[
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5,
    },
  }
]
```

</details>
