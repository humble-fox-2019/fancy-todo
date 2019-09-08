# Fancy TODO 

SERVER
```
npm install
npm run dev
```

CLIENT
```
live-server --host=localhost
```

jangan lupa membuat .env file seperti template env yang disediakan.
# 
## Routes
### Sign In
Route : `/signin`  
Method : `POST`  
Headers : -   
Body : 
```
{
	"email" : "johnDoe@email.com",
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 200,
    "message": "Login Success",
    "token": <TOKEN>
}

Error :
{
    "status": 400,
    "message": "Invalid username / password"
}
```
# 

### Update Password
Route : `/updata/password`  
Method : `PATCH`  
Headers : < TOKEN >   
Body : 
```
{
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 200,
    "message": "Password Updated"
}

Error :
{
    "status": 401,
    "message": "You must Login First"
}
```

# 
### Sign Up
Route : `/signup`  
Method : `POST`  
Headers : -   
Body : 
```
{
	"email" : "johnDoe@email.com",
	"password" : "johnDoe123"
}
```
Response : 
```
Success :
{
    "status": 201,
    "message": "User Created",
    "token": <TOKEN>
}

Error :
{
    "status": 400,
    "message": "Email already registered!"
}
```
# 

### Google Sign in
Route : `/googleSignIn`  
Method : `POST`  
Headers : -   
Body : 
```
{
	"idToken" : <ID TOKEN>
}
```
Response : 
```
Success :
{
    "status": 200,
    "message": "Login Success",
    "token": <TOKEN>
}

Error :
{
    "status": 500,
    "message": <ERROR MESSAGE>
}
```
# 

## Error For following routes
```
Error :
{
    "status": 401,
    "message": "You must Login First"
}
OR 
{
    "status": 401,
    "message": "Not Authorized"
}
```
# 
### Get All User Todos
Route : `/todos`  
Method : `GET`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : -  
query : search < search by title / description in user's todo >  
Response : 
```
Success :
{
    "status": 200,
    "todos": [< User's TODOs >]
}
OR
{
    "status": 200,
    "message": "Search Complete",
    "result": [< todos >]
}
```

# 
### Get One User Todos
Route : `/todos/:id`  
Method : `GET`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : -  
Response : 
```
Success :
{
    "status": 200,
    "todos": [< User's TODOs >]
}
```


# 
### Create New TODO's
Route : `/todos`
Method : `POST`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : 
```
{
	"title" : <Todo Title> [ Default: Untitled ] ,
	"description" : <Description> [ Default : "" ]
}
```

Response : 
```
Success :
{
    "status": 200,
    "message": "OK",
    "created": {
        "title",
        "description",
        "completed",
        "_id":,
        "userId",
        "__v"
    }
}
```

# 
### Update Todo 
Route : `/todos`  
Method : `PUT`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : 
```
{
	"title"
	"description"
	"todoId"
}
```
Response :
```
Success : < Previous Updated Data >
{
    "title"
    "description"
    "completed"
    "_id"
    "userId"
    "__v"
}
```

# 
### Delete Todo 
Route : `/todos`  
Method : `DELETE`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : 
```
{
	"todoId"
}
```
Response :
```
Success :
{
    "status": 200,
    "message": "OK",
    "deletedCount": 1
}
```
# 
### Update Completed Todo Status
Route : `/todos`  
Method : `PATCH`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : 
```
{
	"todoId"
}
```
Response : 
```
Success : < Previous Updated Data >
{
    "title"
    "description"
    "completed"
    "_id"
    "userId"
    "__v"
}
```


# 
### Get Todo by Status
Route : `/todos/status/false`  
Method : `GET`  
Headers : 
```
{
    token : <TOKEN>
}
```
Body : -  


Response : 
```
Success : < Previous Updated Data >
{
    status : 200,
    todos : [< todo's >]
}
```