# Testing the API
Method:POST
URL:http://localhost:3000/tasks 
Request body:
{
    "title": "Buy groceries",
    "description": "Get milk, eggs, and bread"
}

# Get All Tasks:
Method:GET
URL:http://localhost:3000/tasks

# Update Task:
Method:PUT
URL:http://localhost:3000/tasks/1
Request body
{
    "status": "completed"
}

# Delete Task:
Method:DELETE
URL:http://localhost:3000/tasks/1

# Filter Tasks by Status:
Method:GET
URL:http://localhost:3000/tasks/status/completed