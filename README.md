# fancy-todo

All the APIs endpoint using base URL:
```javascript
http://localhost:3000
```

## Index of Reference:
* [User]()
* [Todo]()

## User API
|  HTTP  | Endpoint | Headers | Body | Description |
|---|---|---|:-:|---|---|
| POST | /user/signup | none | name: string<br>email: string<br>password: string | Register new user |
| POST | /user/signin | none | email: string<br>password: string | Login user |
| POST | /user/signInGoogle | none | log in using user google account | Login user |

## Todo API
|  HTTP  | Endpoint | Headers | Body | Description | 
|---|---|---|:-:|---|---|
| GET | /todo | {token: JWT token} | none | get user todo list |
| POST | /todo| {token: JWT token} | todo : string<br>description : string<br>dueDate : date | create todo list |
| GET | /todo/search | {token: JWT token, id : userId, todo : string} | none | find user todo and display  |
| GET | /todo/:id | {token: JWT token, id:todoId} | none | find user todo for to be display for update requirements |
| PUT | /todo/:id | {token: JWT token, id : todoId} | {todo :string, description :string, dueDate :date} | update todo that matches with  |
| DELETE | /todo/:id | {token: JWT token, id : userId} | none | get global published articles |

# Request & Response Details

## User
+ ### Register
  method: `POST`<br>
  endpoint: `/user/signup`
  
  #### _Request_ :
  * body: 
    ```javascript
    name: String, required
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    {code: 201, message: "Berhasil SignUp"}

    ```
  - 400
   ```javascript
    {
      "code": 400,
      "message": "Mohon Maaf Nama Harus di Isi"
    }
    ```
    
    + ### Login
  method: `POST`<br>
  endpoint: `/users/login`
  
  #### _Request_ :
  * body: 
    ```javascript
    email: String, required
    password: String, required
    ```
    
  #### _Response_ :
  - 200
    ```javascript
    Get an access token (JWT Token)
    {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Z…DIxfQ.rCDMqKOnNie3UktVbTbwayGzUiN3_SoHT6qlk15RYvI"}
    ```
  - 401
    ```javascript
   {"code":401,"message":"Mohon Maaf Password Salah"}
    ```

    ## Todo
+ ### find all Todo
  method: `GET`<br>
  endpoint: `/todo`
  
  #### _Request_ :
  * body: 
    ```javascript
    todo: "foo",
    desc: "bar, 
    due_date: "2019-10-10",
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJiYWR1IiwiZW1haWwiOiJiYWR1QG1haWwuY29tIiwiaWF0IjoxNTY0OTkzNzgxfQ.Q4JKT7BRNCPOGUgTF-9NQTU2YASPRg7a3kO72fpPRY8
    ```
    
  #### _Response_ :
  - 201
    ```javascript
    status: false,
    _id: 5d757aed076a72e08de1817e,
    userId: 5d757585076a72e08de1817b,
    todo: 'cemilan',
    description: 'macaroni maicih',
    dueDate: 2019-09-16T00:00:00.000Z,
    createdAt: 2019-09-08T22:04:29.632Z,
    updatedAt: 2019-09-08T22:04:29.632Z 
    ```
  - 400
    ```javascript
    {
      "code": 403
    }
    ```

