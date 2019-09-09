# API - Documentation

__URL__ **http:localhost/5050**



# List user API routing
| Route | HTTP | Header| Body | Description |
| ------ | ------ |------ | ------ | ------ |
|/user/login|POST|none|firstname(string),lastname(string),email(string) and password(string)|register user|
|/user/loginOauth|POST|none|email(string)and password(string)|login user|
|/user/register|POST|none|email(string)and password(string)|login user|



#List of todo routes
| Route | HTTP | Header| Body | Description |
| ------ | ------ |------ | ------ | ------ |
|/todo/gettodo|GET|token|none|get all user's todos|
|/todo//getbyid/:id|GET|token|none|get single user's todo|
|/todo/create|POST|token|title(string),description(string),date(date),owner(id)|Create user's todo|
|/todo//updatetodo/:id|PATCH|token|none|Update user's todo|
|/todo//delete/:id|DELETE|token|node|Delete

 