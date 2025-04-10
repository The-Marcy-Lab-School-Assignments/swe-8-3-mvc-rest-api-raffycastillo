# swe-8-3-mvc-rest-api

Deployment Link:

## Overview

The homework this week will be a little bit different! Rather than building something from scratch, you will be "remixing" code found in the `1-fellow-tracker-final/` directory of the repo below to build your own app!

https://github.com/The-Marcy-Lab-School/8-1-0-express-rest-api-model

This repository contains a server application with controllers and a model for managing a collection of `Fellow` objects. The repository also provides a frontend application that enables users to interact with the server's API through various forms and buttons.

### Your Task

You will be tasked with "remixing" the provided application and adjusting it for the domain area of your choice. For example, you may choose to implement a Playlist API that lets users manage a list of songs or a Library API that lets users manage a list of books.

Regardless of your choice, the API should manage a **collection of objects**.

To get to 75% completion, you are required to build the server application (controllers and model). To get 100% on this assignment, you must build a frontend that interacts with the server. Completing both sides of the application will confirm your mastery of the material!

Remember, a server application is mostly “boilerplate” (it’s the same every time) so feel free to copy the example applications in the notes and refactor them to suit your needs. Remixing is the real challenge here, not creating from scratch.

### Setup

After cloning down this repository, make a `draft` branch:

```sh
git checkout -b draft
```

Then, open the example repository:

https://github.com/The-Marcy-Lab-School/8-1-0-express-rest-api-model

Next, create a `server` directory for your server application and set up the dependencies and file structure:

* Create a `package.json` file
* Install dependencies:
  * `express`
  * `nodemon` (developer dependency)
* Setup the file structure to match the example repository, updating the file names according to your chosen domain area:

  ```
  server/
  ├── index.js
  ├── controllers/
  │   └── fellowControllers.js
  ├── models/
  │   └── Fellow.js
  └── utils/
      └── getId.js
  ```

* Get building!

## Technical Requirements

Below, you will find the technical requirements for this assignment.

There are a total of 20 total requirements:
- 6 model requirements
- 8 endpoint/controller requirements
- 1 deployment requirement
- 5 frontend requirements

### Model Requirements

- [x] A collection of objects is managed by the server API
- [x] Every object in the collection has a unique `id` and at least two (2) additional properties

* Interactions with the data are provided by a `class` with at least:

  - [x] a `static` method to **create** a new resource.
  - [x] a `static` method to **read** existing resources (either all or one at a time).
  - [x] a `static` method to **update** an existing resource.
  - [x] a `static` method to **delete** an existing resource.

### Endpoint / Controller Requirements

* The server has endpoints including at least:
  - [x] one `GET` method
  - [x] one `POST` method
  - [x] one `PATCH` method with a route parameter for `:id`
  - [x] one `DELETE` method with a route parameter for `:id`

- [x] The server can parse JSON in incoming requests with `express.json()` middleware
- [x] All endpoints begin with `/api`
- [x] All endpoints use plural nouns (e.g. `/api/fellows`), NOT verbs (e.g. `/api/getFellows`)
- [x] Error codes are used appropriately (see below for error code information):

### Deployment Requirements

- [ ] Your application is deployed using Render and the public URL is added to the top of this README.

### Frontend Requirements

- [x] The server serves a frontend application at `/` using `express.static()` middleware.
- [x] The frontend application can send a `GET request` for and render the collection of resources from the server's "database"
- [x] The frontend application can send a `POST request` to create a new resource in the server's "database".
- [x] The frontend application can send a `PATCH request` to update an existing resource in the server's "database".
- [x] The frontend application can send a `DELETE request` to delete an existing resource in the server's "database".

## Error Codes:

The following error codes are commonly used by APIs

* Success Responses
  * `200` OK — Standard success (GET, PUT, DELETE).
  * `201` Created — Resource was created (POST).
  * `204` No Content — Successful but no response body (e.g. DELETE or empty PATCH).
* Client Errors
  * `400` Bad Request — Input is invalid (e.g. missing fields, bad JSON).
  * `404` Not Found — Resource doesn’t exist (e.g. user ID not found).
* Server Errors
  * `500` Internal Server Error — Unexpected error on your backend.
  * `503` Service Unavailable — Server is overloaded or down (e.g. maintenance or unavailable 3rd party API).
