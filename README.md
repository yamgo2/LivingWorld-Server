# LivingWorld - Node.js
Node.js server that exposes various REST API endpoints to manage image targets, libraries, users and videos in a SQL database. Used for an accompanying Unity AR application available at:

https://github.com/yamgo2/LivingWorld-ARFoundation

## Pre-requisites
- Install [Node.js](https://nodejs.org/en/) latest or recommend version

## Getting started
- Clone the repository
```
git clone  <project_url>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Set your database information in the db.config.js file
```
module.exports = {
  HOST: "hostname",
  USER: "username",
  PASSWORD: "password",
  DB: "databasename"
};
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8080`

## API endpoints
All endpoints are accessed via `<host_adress>/api/data/<endpoint_name>`

| HTTP method | Name | Description |
| - | - | - |
| POST | /videos | Create a new video |
| POST | /images | Create a new image and increase image count of the associated library |
| POST | /libraries | Create a new library |
| POST | /users | Create a new user |
| POST | /users/login | Check if user with password exists |
| DELETE | /videos/:videoid | Delete video with specific ID |
| DELETE | /images/:imageid | Delete image with specific ID and reduce image count of associated library |
| DELETE | /libraries/:name | Delete library with specific name |
| GET | /libraries | Retrieve all libraries |
| GET | /images/:imageid | Retrieve image with specific ID |
| GET | /libraries/:name/imageids | Get all associated image IDs for a specific reference library |
| GET | /images/:imageid/videos | Get all associated videos for a specific image |
| PUT | /videos/:videoid/likes | Remove or add a like to a video with specific ID |
| PUT | /libraries/:name/views | Increase the views of a library with specific name |

## Database Setup
The server requires access to a local or hosted database with the entities users, libraries, images, and videos.

The following SQL code can be used in the database creation:

```
CREATE TABLE users(
    name VARCHAR(35) NOT NULL PRIMARY KEY,
    password VARCHAR(50) NOT NULL
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE libraries(
    name VARCHAR(35) NOT NULL PRIMARY KEY,
    creator VARCHAR(35),
    FOREIGN KEY(creator) REFERENCES users(name),
    description VARCHAR(255) NOT NULL,
    views INT UNSIGNED NOT NULL DEFAULT 0,
    imagecount INT UNSIGNED NOT NULL DEFAULT 0
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE images(
    imageid CHAR(36) NOT NULL PRIMARY KEY,
    library VARCHAR(35) NOT NULL,
    FOREIGN KEY(library) REFERENCES libraries(name) ON DELETE CASCADE,
    image LONGTEXT NOT NULL
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE videos(
    videoid CHAR(36) NOT NULL PRIMARY KEY,
    imageid CHAR(36) NOT NULL,
    FOREIGN KEY(imageid) REFERENCES images(imageid) ON DELETE CASCADE,
    creator VARCHAR(35),
    FOREIGN KEY(creator) REFERENCES users(name) ON DELETE 
       CASCADE,
    title VARCHAR(100) NOT NULL,
    link VARCHAR(255) NOT NULL,
    likes INT UNSIGNED NOT NULL DEFAULT 0,
    width SMALLINT UNSIGNED NOT NULL,
    height SMALLINT UNSIGNED NOT NULL
) DEFAULT CHARSET = utf8mb4;
```

## Community and Feedback

This project can be freely modified and used in any context. It is meant to be added upon and serve as a foundation for further development. The ultimate goal is a centralized platform that enables users to create and upload their own AR tracking targets and associate them with virtual content. The platform would act as a single entry point, providing a server and database that allows for easy access to all user-generated AR content. This centralized approach would facilitate the discovery and sharing of AR experiences, as users can access all available content from one hub.

If you you have a question, find a bug, or would like to request a new feature, please [submit a GitHub issue](https://github.com/yamgo2/LivingWorld-Server/issues).
