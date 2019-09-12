# fancy-todo

```html
server:
http://localhost:3000/

client:
http://localhost:8080/
```
---

# **List of User Routes** :

| HTTP    | Routes       | Headers | Body                         | Description                  |
| ---     | -----        | ---     | ---                          | ---                          |
| POST    | /create      | none    | name,emaild, password        | Register new user            |
| POST    | /login       | none    | email,password               | Login user                   |
| POST    | /signGoogle  | none    | gooogleToken                 | Login user by google         |

---

# **List of Todo Routes** :
| HTTP    | Routes     | Headers  | Body                            | Description                                                     |
| ---     | -----      | ---      | ---                             | ---                                                             |
| POST    | /create    | token    | name,description,dueDate        | Create new todos (authentication)                               |
| GET     | /          | token    | none                            | Get all user todos (authentication)                             |
| GET     | /:id       | token    | none                            | Get one todo by id (authorization)                              |
| DELETE  | /:id       | token    | none                            | Delete todo by id  (authorization)                              |
| PATCH   | /:id       | token    | name/description/dueDate/status | Update todo by id  (authorization)                              |
| POST    | /sendHtml  | token    | html                            | Send Picture of description Todo to user emai  (authentication) |

---

# **API Third Party** :

| Name      | Auth     | CORS | HTTPS | Description                 |
| --------- | ------   | ---  | ---   | ----                        | 
| Google    | apiKey   | No   | No    | For Login Google            |
| SendGrid  | apiKey   | Yes  | ?     | For Send html to email user |

---

# **Getting Started**

```
1. npm install
2. open terminal in file server
3. nodemon app.js
4. open terminal (new tab) in file client
5. live-server --host=localhost
6. open localhost:8080

```

# **List of Errors**

1. **Create User**
    Route : /users/create
    Method : POST

| Status    | Message                 | Description                        |
| --------- | ------                  | ---                                | 
| 400       | User Validation failed  | User model validation              |
| 500       | Error Internal Server   | Server Error                       |

---

2. **Login User**
    Route : - /users/login
            - /users/signGoogle
    Method : POST

| Status    | Message                 | Description                        |
| --------- | ------                  | ---                                | 
| 400       | Wrong email/password    | -                                  |
| 400       | Bad Request             | Email/Password is required         |
| 500       | Error Internal Server   | Server Error                       |

---

3. **Any Route From Todo**

| Status    | Message                 | Description                        |
| --------- | ------                  | ---                                | 
| 500       | Error Internal Server   | Server Error                       |
| 400       | Bad Request             | Validation Todo                    |
| 401       | Unathorized             | Not Authorization                  |
| 403       | Forbidden Page          | Not Authentication                 |
| 404       | Not Found               | Not Authentication                 |
 
---
---

**.env Template**

- DEFAULT_PS=?
- JWT_KEY=?
- GOOGLE_CLIENT_ID=?
- SENDGRID_API_KEY=?

