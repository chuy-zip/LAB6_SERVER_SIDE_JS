# LAB6_SERVER_SIDE_JS
The general theme of this project is to crate a web app by making both frontend and backend, for a blog about a topic of interest. In my case I decided to make it about my favorite games and im creating my own API for managing HTTP requests that can get or insert data into a DataBase.

## Technologies used
* Java Script
* Docker
* Node JS
* Express
* MySql
* JSON
* NPM

## Technologies to be implemented
* HTML
* CSS

## Usage 
Running this project is fairly simple. The only requirements are to have Node.js installed and also Docker, in order to lift the containers with docker-compose. Once you have this and have cloned the repository you only have to run on the root of the project:

```
docker-compose up
```
or
```
docker-compose up -d
```
If you don't want your command line to be taken.

And always remember to shutdown the container if you are not going to use it any longer with:
```
docker-compose down
```

## Endpoints
The app manages 5 different requests depending on the endpoint and the HTTP's request type. Feel free to test them with Postman, Hoppscotch, etc **(NOTE: port must be 22107 as definied in the dcokerfiles)**. These are the defined endpoints:

## Endpoints

| HTTP Method | Endpoint                              | Description                                 |
|-------------|---------------------------------------|---------------------------------------------|
| POST        | http://localhost:22107/posts           | Adds a game to the database                 |
| GET         | http://localhost:22107/posts           | Gets all the stored games on the database   |
| GET         | http://localhost:22107/posts/:postId  | Gets a post with a specific ID              |
| PUT         | http://localhost:22107/posts/:postId  | Changes the title and description of a specific game |
| DELETE      | http://localhost:22107/posts/:postId  | Deletes a game from the database            |


**Where ":postId" is the id you want to get, change or delete.** You can also try to make requests with invalid endpoints or nonexistent id's. You should be able to see different cases for error handling.

For the POST, the body should be an "application/json" and the structure is like this:

```sh
{
  "title": "A game title",
  "game_description": "Description of game",
  "genre": "Action",
  "main_platform": "PS2",
  "multiplayer_support": true,
  "online_features": true
}
```
For the PUT request (change data on an existing register on the Data Base) the body should be an "application/json" and the structure is like this:
```sh
{
  "title": "Updated Title",
  "game_description": "Updated Description"
}
```

## Commands used
There are several commands that I used in order to make the project as I needed different downloads from npm. This are the commands that helped me with the setup. **CAREFUL: This is not a detailed guide of how to do this project, im just going through the general commands but some also need specific changes to the packa.json or ESlint configuration file**

#### Creation of package.json
```sh
npm init -y
```

#### Download of Express framework:
```sh
npm install Express
```
**DO NOT COMMIT "node_modules" EVER**

#### Mysql2 to make queries to the Data Base:
```sh
npm install mysql2
```

#### To make the Eslint configuration file answer all the questions after running:
```sh
npm init @eslint/config --save-dev
```

#### Download airbnb base config for detecting style errors
```sh
npm install eslint-config-airbnb-base --save-dev
```

#### Running the lint test **(This script has to be added to the package.json. See the file in this repo)**
```sh
npm run lint
```





