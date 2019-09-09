
# fancy-todo

  

```html

server:
npm run dev
http://localhost:3000/

```

```html

client:
live-server --host=localhost
http://localhost:8080/

```


## **Routes**

  

|HTTP | Routes | Headers | Body | Query Params | Description |
| --- | ----- | --- | --- | --- | --- |
| POST | /user/login | none | email, password | none | Login user |
| POST | /user/googleSignIn | none | token | none | Login with google |
| POST | /user/register | none | name, password, email | none | Register a new user |
| POST | /todo | token | name, description | none | Create a new todo (Authenticated) |
| GET | /todo | token | none | none | Get all user's todos (Authenticated) |
| PATCH | /todo/:id | token | name, description | none | Update user's todo (Authenticated) |
| PATCH | /todo/:id/done | token | isDone | none | Update user's todo status isDone true/false (Authenticated) |
| DELETE | /todo/:id | token | none | none | Delete user's todo (Authenticated) |

---


## **Fitur Tambahan**
- Tidak ada

## **Kesulitan**
JQUERY
Gagal integrasi fitur tambahan

