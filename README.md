# fancy-todo

REST API with Express, AJAX and Mongoose. <br>
Access API with aplication Postman/Insomnia/Curl <br>

## Validation
#### User
    1. Email validation format
    2. Email Unique
    3. Phone Number must between 11 and 13 char
    4. Phone Unique
    5. Username Unique
    6. Username must berween 6 and 10 char
    7. password minimum 8 char
    8. password must be include minimum 1 numeric, 1 Capital Alphabet and 1 small Alphabet 
## Default value
#### User
    if you logged in with google
    - username = jti from payload google
    _ password = Todos123

#### Todos
    - Status = false

## Response
    - HTTP GET if success will throw you Data JSON, status code 200
    - HTTP POST if success will throw you Data JSON, status code 201
    - HTTP PUT if success will throw you message, status code 201
    - HTTP PATCH if success will throw you message, status code 201
    - HTTP DELETE if success will throw you message, status code 200



List of user routes : <br>

Route              | HTTP   | Header(s) | Body                                     | Params           | Description
----------         | ------ | --------- |------------------------------            | --------         | -----------
/users/register    | POST   | none      | {username, password, nama, email, phone} | none             | register new user
/users/login       | POST   | none      | {token_id}                               | none             | logged in user with google
/users/signIn      | POST   | none      | {email, password}                        | none             | logged in user with form login
/users/:username   | GET    | none      | none                                     | usernameUser     | get one users
/users/:username   | PUT    | none      | {username, nama, email, phone}           | usernameUSer     | update a user with new info
/users/:username   | PATCH  | none      | { password }                             | usernameUser     | Update password user with new info
/users/:username   | DELETE | none      | none                                     | usernameUser     | delete a user
/lists             | GET    | {token}   | none                                     | none             | Get all the lists info where username logged
/lists/:id         | GET    | {token}   | none                                     | ObjectId         | Get a single list info
/lists             | POST   | {token}   | {name}                                   | none             | store a list
/lists/:id         | DELETE | {token}   | none                                     | ObjectId         | Delete a list
/lists/:id         | PUT    | {token}   | {name}                                   | ObjectId         | Update a list with new info
/todos/:listId     | GET    | {token}   | none                                     | ListId           | Get all the todos info where username logged and this list
/todos/:listId     | POST   | {token}   | {name, description, status, due_date}    | ListId           | store a todos
/todos/:listId/:id | PUT    | {token}   | {name, description, status, due_date}    | ListId, ObjectId | update a todos with new info
/todos/:listId/:id | DELETE | {token}   | none                                     | ListId, ObjectId | Delete a todos

## Usage

Make sure you have Node.js and npm live-server your computer, and then run <br> these commands: <br>
### server
    $ npm install
    touch .env
    npm run dev

### client
    live-server --host=localhost --port=8088
    
Make sure you set PORT 3000 in file app.js besfore RUN the app<br>
Acces the API via [localhost](http://localhost:3000/) in POSTMAN/Insomnia/Curl
