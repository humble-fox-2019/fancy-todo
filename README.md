# fancy-todo

##### List of user Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
|  user/register | POST  |  none | username:string,   password:string(Requeired)    | Register a new User   |
| user/login  | POST  |  none | username:string,   password:string(Requeired)   | Login User  |
| user/register/google  | POST  |  none |  none  | Login with Google  |


##### List of Todo Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
| /todo  | GET  | token , payload   | none  | List Of Todos   |
|  /todo | POST  | token , payload   | name:string , description:string, due_date:date |  Create new Todo |
|  /todo/:id | DELETE  | token , payload   |  none   | delete a todo  |
|  /todo/:id/complete | PATCH  |  token , payload  |  title:string(Required) , description:string(Required) |  complete a todo |
|  /todo/:id/uncomplete | PATCH  |  token , payload  |  title:string(Required) , description:string(Required) |  uncomplete a todo |
|  /todo/:id | PUT  |  token , payload  | title:string(Required) , description:string(Required)  | update a todo  |

#### List of Project Routes

| Route  | HTTP   | Headers   | Body  | Description  |
|---|---|---|---|---|
| /project  | GET  | token , payload   | none  | List Of projects   |
|  /project | GET | token , payload   | none |  Get All Other User except user logged in |
|  /project | POST | token , payload   |  name:string(Required) , des:string , date:date , member:string   | delete a new Project  |
|  /project/invite | GET  |  token , payload  |  none |  GET ALL INVITATION |
|  /project/confirm/:id | PATCH  |  token , payload  | none |  Confirm to Join Project |
|  /project/:id | GET  |  token , payload  | none  | get single todo Project |
|  /project/:id/todo | PATCH  |  token , payload  | name:string(Require) , des:string , date:date | Add new Todo In the Project|
|  /project/:id/todo/:todoId/complete | PATCH  |  token , payload  | none | Change / update todo status true / complete |
|  /project/:id/todo/:todoId/uncomplete | PATCH  |  token , payload  | none | Change / update todo status false / uncomplete |