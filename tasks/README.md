# Tasks Application

This is a Spring Boot-based backend application for managing task lists and tasks. It provides RESTful APIs for creating, updating, retrieving, and deleting task lists and tasks. The application uses PostgreSQL as the database in production and H2 for testing.

---

## Backend Overview

### Entities

1. **TaskList**
   - Represents a list of tasks.
   - Fields:
     - `id` (UUID): Unique identifier.
     - `title` (String): Title of the task list.
     - `description` (String): Description of the task list.
     - `tasks` (List<Task>): List of tasks in the task list.
     - `created` (LocalDateTime): Creation timestamp.
     - `updated` (LocalDateTime): Last updated timestamp.

2. **Task**
   - Represents an individual task.
   - Fields:
     - `id` (UUID): Unique identifier.
     - `title` (String): Title of the task.
     - `description` (String): Description of the task.
     - `dueDate` (LocalDateTime): Due date of the task.
     - `status` (TaskStatus): Status of the task (`OPEN` or `CLOSED`).
     - `priority` (TaskPriority): Priority of the task (`HIGH`, `MEDIUM`, `LOW`).
     - `taskList` (TaskList): The task list this task belongs to.
     - `created` (LocalDateTime): Creation timestamp.
     - `updated` (LocalDateTime): Last updated timestamp.

---

### REST API Endpoints

#### Task List Endpoints

1. **GET /task-lists**
   - Retrieves all task lists.
   - Response: List of `TaskListDto`.

2. **POST /task-lists**
   - Creates a new task list.
   - Request Body: `TaskListDto`.
   - Response: Created `TaskListDto`.

3. **GET /task-lists/{task_list_id}**
   - Retrieves a specific task list by ID.
   - Response: `TaskListDto`.

4. **PUT /task-lists/{task_list_id}**
   - Updates a specific task list by ID.
   - Request Body: `TaskListDto`.
   - Response: Updated `TaskListDto`.

5. **DELETE /task-lists/{task_list_id}**
   - Deletes a specific task list by ID.
   - Response: HTTP 200 OK.

#### Task Endpoints

1. **GET /task-list/{task_list_id}/tasks**
   - Retrieves all tasks in a specific task list.
   - Response: List of `TaskDto`.

2. **POST /task-list/{task_list_id}/tasks**
   - Creates a new task in a specific task list.
   - Request Body: `TaskDto`.
   - Response: Created `TaskDto`.

3. **GET /task-list/{task_list_id}/tasks/{task_id}**
   - Retrieves a specific task by ID in a task list.
   - Response: `TaskDto`.

4. **PUT /task-list/{task_list_id}/tasks/{task_id}**
   - Updates a specific task by ID in a task list.
   - Request Body: `TaskDto`.
   - Response: Updated `TaskDto`.

5. **DELETE /task-list/{task_list_id}/tasks/{task_id}**
   - Deletes a specific task by ID in a task list.
   - Response: HTTP 200 OK.

---

### Request and Response DTOs

1. **TaskListDto**
   - Fields:
     - `id` (UUID): Unique identifier.
     - `title` (String): Title of the task list.
     - `description` (String): Description of the task list.
     - `count` (Integer): Number of tasks in the list.
     - `progress` (Double): Progress percentage (completed tasks / total tasks).
     - `tasks` (List<TaskDto>): List of tasks.

2. **TaskDto**
   - Fields:
     - `id` (UUID): Unique identifier.
     - `title` (String): Title of the task.
     - `description` (String): Description of the task.
     - `dueDate` (LocalDateTime): Due date of the task.
     - `priority` (TaskPriority): Priority of the task.
     - `status` (TaskStatus): Status of the task.

3. **ErrorResponse**
   - Fields:
     - `status` (int): HTTP status code.
     - `message` (String): Error message.
     - `details` (String): Additional details.

---

### Error Handling

The application uses a global exception handler to return consistent error responses. For example:

- **400 Bad Request**:
  ```json
  {
    "status": 400,
    "message": "Task title must be present!",
    "details": "uri=/task-list/123/tasks"
  }
  ```

---

## Frontend Prompt

Here is the prompt you can use to generate a React frontend for this backend:

---

**Prompt for Frontend AI**

Create a React frontend for a task management application with the following features:

1. **Dark/Light Mode**: Allow users to toggle between dark and light themes.
2. **Task List Management**:
   - Display all task lists with their progress and task count.
   - Allow users to create, update, and delete task lists.
3. **Task Management**:
   - Display tasks within a selected task list.
   - Allow users to create, update, and delete tasks.
   - Show task details, including title, description, due date, priority, and status.
4. **Error Handling**:
   - Display error messages returned by the backend in a user-friendly way.
5. **API Integration**:
   - Use the following endpoints to interact with the backend:
     - `GET /task-lists`
     - `POST /task-lists`
     - `GET /task-lists/{task_list_id}`
     - `PUT /task-lists/{task_list_id}`
     - `DELETE /task-lists/{task_list_id}`
     - `GET /task-list/{task_list_id}/tasks`
     - `POST /task-list/{task_list_id}/tasks`
     - `GET /task-list/{task_list_id}/tasks/{task_id}`
     - `PUT /task-list/{task_list_id}/tasks/{task_id}`
     - `DELETE /task-list/{task_list_id}/tasks/{task_id}`
6. **UI Components**:
   - Task List Table: Show task list details with progress bars.
   - Task Table: Show task details with filters for priority and status.
   - Forms: Create and update forms for task lists and tasks.

---

## Running the Backend

1. **Start PostgreSQL**:
   - Use the provided `docker-compose.yml` file to start a PostgreSQL instance:
     ```bash
     docker-compose up -d
     ```

2. **Run the Application**:
   - Use Maven to start the Spring Boot application:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Access the API**:
   - The API will be available at `http://localhost:8080`.

---

## Frontend Integration

Once the React frontend is generated, integrate it with this backend by configuring the API base URL (`http://localhost:8080`) in the frontend application.

