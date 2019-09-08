# fancy-todo

```html
server:
http://localhost:3000/
```

## **List of fancy-todo Routes**

 HTTP     | Routes              | Headers  | Body           | Query Params                     | Description                        |
| ---     | -----               | ---      | ---            | ---                              | ---                                |
| POST    | /users/loginform    | none     | email, password | none                             | Login user through normal form    |
| POST     | /users/logingoogle | none     | token           | none                             | Login user through google         |
| POST     | /users/register    | none     | username, password, email | none                    | Register a new user              |
| POST     | /todos     | token     | todo, description, tags | none                    | Register a new todo (Authenticated)     |
| GET      | /todos      | token     | none | none                    | Get all user's todos (Authenticated)          |
| PATCH   | /todos/:_id | token     | todo, description, tags, status |     none       | Update user's todo (Authenticated)          |
| DELETE  | /todos/:_id | token     | none | none                    | Delete user's todo (Authenticated)          |

---
# **Getting Started**
```
1. npm install
2. make a new .env file (See example)
3. open terminal (new tab) in the file client
4. live-server --host=localhost
5. open terminal (new tab) in the file server
6. npm run dev
```

# **List Kesusahan**
```
- Saya masih belum bisa menghandle errornya. sudah saya bikin tapi untuk nangkep dari sisi client masih bingung
- Masih bingung status code yang harus digunakan yang mana
- Pengen belajar css sendiri. Jadi nya nggak pake template. Yang membuat website jadi sederhana
```



