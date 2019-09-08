
function cardConstructor({ _id, name, description, createdAt, updatedAt, dueDate }) {
    if (!description) description = 'No Description'
    let base = `<div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${description}</p>
                            <p class="card-text" id="dates">
                                <small class="text-muted">Last updated: <abbr class="timeago" title="${updatedAt}">${updatedAt}</abbr></small><br>
                                <small class="text-muted">Date Created: <abbr class="timeago" title="${createdAt}">${createdAt}</abbr></small><br>
                            </p>
                            <div class="card-footer">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-6 change-color clickable" onclick="editTodo('${_id}')">
                                            <small class="text-muted text-align:center">Edit</small>
                                        </div>
                                        <div class="col-6 change-color clickable" onclick="deleteTodo('${_id}')">
                                            <small class="text-muted">Delete</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
    if (dueDate) base = base.replace(`<p class="card-text" id="dates">`,
        `<p class="card-text" id="dates">
            <small class="text-muted">Due Date: <abbr class="timeago" title="${dueDate}">${dueDate}</abbr></small><br>`
    )
    return base
}