# fancy-todo

Welcome to the fancy todo API, but not so fancy. Here's the documentation:

## User

- **/user/register**

Method | Header | Params | Data |
--- | --- | --- | --- 
`POST` | `none` | `none` | email: `string` <br> password: `string` 

Success Response | Error Response
--- | ---
Status: `201` <br> Content: `{token, created}` | Status: `403` <br> Content: `{"message": "User validation failed: password: password length must be between 6 and 12, email: email already registered"}`


- **/user/login**

Method | Header | Params | Data |
--- | --- | --- | --- 
`POST` | `none` | `none` | email: `string` <br> password: `string` 

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `{token}` | Status: `403` <br> Content: `{"message": "invalid email / password"}`


- **/user/login/google**

Method | Header | Params | Data |
--- | --- | --- | --- 
`POST` | Google `id_token` | `none` | Google Account <br> email: `string` <br> password: `string` 

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `{token}` | Status: `403` <br> Content: `{"message": "The verifyIdToken method requires an ID Token"}`


## Todo
This end point need authentication from verified user.

- **/user/todo/**
Get all todo from authenticated user.

Method | Header | Params | Data |
--- | --- | --- | --- 
`GET` | `token` | `none` | `none`

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `array of objects` | Status: `403` <br> Content: `{"message": "The verifyIdToken method requires an ID Token"}`

- **/user/todo/**
Create a todo for authenticated user.

Method | Header | Params | Data |
--- | --- | --- | --- 
`POST` | `token` | name: `string` | `none`

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `object of todo` | Status: `403` <br> Content: `{"message": "Todo validation failed: name: Path 'name' is required."}`

- **/user/todo/:id**
Get one todo from authenticated user with specific todo `id`.

Method | Header | Params | Data |
--- | --- | --- | --- 
`GET` | `token` | id: `string` | `none`

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `object of todo` | Status: `404` <br> Content: `{"message": "todo's not found"}`


DARI SINI

- **/user/todo/:id**
Update todo's `name` and `description`.

Method | Header | Params | Data |
--- | --- | --- | --- 
`PUT` | `token` | id: `string` | name: `string` <br> description: `string`

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `{"message": todo updated}` | Status: `404` <br> Content: `{"message": "todo's not found"}`


- **/user/todo/:id**
Update todo's `status` to `true`.

Method | Header | Params | Data |
--- | --- | --- | --- 
`PATCH` | `token` | id: `string` | `none`

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `{"message": todo updated}` | Status: `404` <br> Content: `{"message": "todo's not found"}`


- **/user/todo/:id**
Delete `todo`.

Method | Header | Params | Data |
--- | --- | --- | --- 
`DELETE` | `token` | id: `string` | `none`

Success Response | Error Response
--- | ---
Status: `200` <br> Content: `{"message": todo deleted}` | Status: `404` <br> Content: `{"message": "todo's not found"}`

## Usage
Make sure you jave Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
## Link
Access the API via `http://localhost:3000/`