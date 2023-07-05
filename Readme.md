# Task Tracker

This project is a backend server for a TODO app that provides all the necessary features for creating, reading, and updating todos. Additionally, it allows users to upload files to enhance their task management experience. The backend routes are well validated to ensure data integrity and security.

## Features

- Create, read, and update todos: Users can easily create new tasks, view existing tasks, and update task details as needed.
- File upload capability: Users have the option to upload files related to their tasks for better organization and reference.
- Well-validated backend routes: The implemented routes are thoroughly validated to prevent data inconsistencies and malicious activities.

## Installation

Install my-project with npm

```bash
  cd my-project
  npm install
  npm run
```

## Technologies

Node, Express, MongoDB, Cloudinary

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
PORT=
MONGO_URI=

CLOUDINARY_API_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
```

## API Reference

#### Get all Todos

```http
  GET /todo/
```

#### Get Single Todo

```http
  GET /todo/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create Single Todo

```http
  POST /todo/
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `title`    | `string` | **Required**. Title of TODO    |
| `Subtitle` | `string` | **Optional**. Subtitle of TODO |
| `Content`  | `string` | **Required**. Content of TODO  |
| `File`     | `File`   | **Optional**. File for TODO    |

#### Update Single Todo

```http
  PATCH /todo/${id}
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `id`       | `string` | **Required**. Id of item to fetch |
| `title`    | `string` | **Required**. Title of TODO       |
| `Subtitle` | `string` | **Optional**. Subtitle of TODO    |
| `Content`  | `string` | **Required**. Content of TODO     |
| `File`     | `File`   | **Optional**. File for TODO       |

#### Delete Single Todo

```http
  DEL /todo/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of Todo to Delete |

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Authors

[@sarthakag-dev](https://www.github.com/sarthakag-dev)
