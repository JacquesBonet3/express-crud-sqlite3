# Tasks API

A simple Task Manager API built with **Node.js**, **Express**, **TypeScript**, and **SQLite**. This project provides CRUD operations for managing tasks, ensuring type safety and modular architecture. It also integrates SQLite as the local database for persistence.

---

## Features

- Full CRUD support: Create, Read, Update, Delete tasks.
- **SQLite** as a lightweight database for local development.
- **TypeScript** ensures a clean and type-safe codebase.
- Validation with **class-validator** and **class-transformer**.
- Configurable scripts for development, production, and linting.

---

## Repository

This project is hosted on GitHub:  
[https://github.com/PullStackDeveloper/express-crud-sqlite3.git](https://github.com/PullStackDeveloper/express-crud-sqlite3.git)

---

## Installation and Usage

### Clone the Repository
```bash
git clone https://github.com/PullStackDeveloper/express-crud-sqlite3.git
cd express-crud-sqlite3
```

### Install Dependencies
```bash
npm install
```

### Run in Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start the Production Server
```bash
npm start
```

### Lint the Codebase
```bash
npm run lint
```

---

## API Endpoints

### Base URL: `http://localhost:3000`

#### **Tasks**

1. **GET `/tasks`**
    - Retrieves all tasks.

2. **POST `/tasks`**
    - Creates a new task.
    - **Example Request Body:**
      ```json
      {
        "title": "Sample Task",
        "completed": false
      }
      ```

3. **PUT `/tasks/:id`**
    - Updates an existing task by ID.
    - **Example Request Body:**
      ```json
      {
        "title": "Updated Task",
        "completed": true
      }
      ```

4. **DELETE `/tasks/:id`**
    - Deletes a task by ID.

---

## Package Information

### Project Metadata
- **Name:** tasks
- **Version:** 1.0.0
- **Description:** Task manager API

### Key Dependencies
- **class-transformer**: For data transformation and validation.
- **class-validator**: For validating incoming requests.
- **express**: Backend framework for building APIs.
- **sqlite**: Integration with SQLite.
- **sqlite3**: Driver for SQLite.

### Development Tools
- **TypeScript**: Ensures type safety.
- **ts-node-dev**: Hot-reloading for development.
- **eslint**: Linting to maintain code quality.

---

## Technologies Used

- **Node.js**
- **Express**
- **SQLite**
- **TypeScript**
- **ESLint**

---

## License

This project is licensed under the MIT License.