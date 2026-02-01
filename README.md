# 🌐CharaWik API

CharaWik is a personal blog style wikipedia page for artists to keep track of their original characters.

### GitHub Link

## How to Use

### Download & Run the Project | For Devs Exploring or Using the API for Personal characters

1.  Clone the repository or Download the ZIP file and extract the files.
2.  Open the file in Visual Studio Code.
3.  Open the Terminal using Ctrl + ~
4.  `cd` into the directory 'backend' in the terminal. Like so:
    `cd backend`

    **Ensure NPM is is installed for the project to run:**

    inside the terminal window run `npm i` to install npm

5.  Create a `.env` file in the root directory/folder ( backend ). Add the following to the file:
    - Your personal connection string from [MongoDB](https://www.mongodb.com) in the following format `MONGO_URI=your_connection_string_goes_here/innovative-inc`.
    - A Secret Key in the following format `JWT_SECRET=yourSecretKeyGoesRightHere`
    - (Optional) A port number within the 3000s: `PORT=3000`
6.  (Once NPM is indeed installed in the project file directory, you'll see a node modules folder) Run the project using `node server.js` in the terminal. You can also use npm run dev (Nodemon is installed)

7.  You should see a message appear. Follow the link such as: "http://localhost:3000/" or "http://localhost:3001/" (when no port defined in .env)

From here, you can test creating a new user or logging in as an existing user using software/Visual Studio extension such as Thunderclient or Postman or a simlar software/Visual Studio extension. You can also create characters and activities.

### Endpoints | For Devs Obtaining Data from CharaWik

```JS

/api/users/register //Post/Create User
/api/users/login //Post/Login Existing User

/api/characters // Get/Read All characters or Post/Create a new character. Must be the owner of the character.
/api/characters/:characterId  // Get/Read, Put/Update, Delete characters a specific character. Must be the owner of the character.

/api/characters/:characterId/activities //Get/Read All activity. Must be the owner of the character the activity belongs to.
/api/characters/:characterId/activities/:activityId //Get/View A specific activity by ID. Must be the owner of the character the activity belongs to.
/api/activities/:activityId  //Put/Update & Delete A specific activity by ID. Must be the owner of the character the activity belongs to.
```

---

### Account Creation - POST Route Format -

To create a user using JSON body, following this format:

```JSON

{
    "username": "coolest1stUser",
    "email": "bestCoolemail@gmail.com",
    "password": "b3tterP4ssword"
}

```

To login a user using JSON body, following this format:

```JSON

{
    "email": "bestCoolemail@gmail.com",
    "password": "b3tterP4ssword"
}

```

---

### Character CRUD - POST/GET/PUT/DELETE Formats -

Using the JSON body, **Create** a specific character of a user using this format:
_age, likes, and dislike are not required and can be left out. The actual image string will be processed in the frontend for storage. It will look very different that this example. As it will take the image and turn store it Base64 format inside MongoDB._

```JSON

{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
    "profileImage": "imgStringtoBase64",
    "name": "Strongby Strawbs",
    "age": 28,
    "biography": "The heir to the Strawbs Strawberry Fields Fortune. But all she wants is to do leg day. Find her in the strawberry bushes? No, find her in the gym pumping iron!",
    "likes": ["red", "strawberries", "leg day"],
    "dislikes": ["push ups", "grape jelly"]
}

```

---

Using the JSON body , **Read** all characters for a user using this format:

_URL example: http://localhost:3000/api/characters_

```JSON
{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe"
}

```

---

Using the JSON body and the request parameters, **Read or Delete** a specific character of a user using this format:

_URL example: http://localhost:3000/api/characters/7586a0c64c54f659210c9b75_

```JSON
{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe"
}

```

---

Using the JSON body and the request parameters, **Update** a specific character of a user using this format:

_URL example: http://localhost:3000/api/characters/7586a0c64c54f659210c9b75_

```JSON
//Update Singular Field - Example Format
{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
    "name": "Shelby Strongby Strawbs"
}

//Update Multiple - Example Format
    {
        "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
        "likes": ["red", "strawberries", "leg day", "orange juice"],
        "dislikes": ["push ups", "grape jelly"]
    }

//Update All Simultaneously - Format
    {
        "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
        "profileImage": "img345StringtoBase64",
        "name": "Shelby Strongby Strawbs",
        "age": 25,
        "biography": "The heir to the Strawbs Strawberry Fields Fortune. But all she wants is to do leg day. Find her in the strawberry bushes? No, find her in the gym pumping LEG iron!",
        "likes": ["red", "strawberries", "leg day, orange juice"],
        "dislikes": ["push ups", "grape jelly", "dead lifts"]
    }

```

---

### Activity CRUD - POST/GET/PUT/DELETE Formats -

Using the JSON body, **Create** a activity post for a specific character using this format:

_URL example: http://localhost:3000/api/characters/7586a0c64c54f659210c9b75/activity_

```JSON

{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
    "title": "Rebirth",
    "content": "I was reborn on the fifth phase of the Zereleaus Moon"
}

```

---

Using the JSON body , **Read** all activity post for a character using this format:

_URL example: http://localhost:3000/api/characters/7586a0c64c54f659210c9b75/activity_

```JSON
{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe"
}

```

---

Using the JSON body and the request parameters, **Read or Delete** a specific activity post of a character using this format:

_URL example: http://localhost:3000/api/characters/7586a0c64c54f659210c9b75/activities/553796056d87946c2991526a_

```JSON
{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe"
}

```

---

Using the JSON body and the request parameters, **Update** a specific activity post of a character using this format:

_URL example: http://localhost:3000/api/characters/7586a0c64c54f659210c9b75/activities/553796056d87946c2991526a_

```JSON
//Update Singular Field - Example Format
{
    "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
    "title": "Rebirth & Redirect"
}

//Update All Simultaneously - Format
    {
        "token": "esfodijweijfi439584jjndmlm]e[r][p320403mkdfm]_3483msdlfiowe",
        "title": "Rebirth",
        "content": "I was reborn on the fifth phase of the Zereleaus Moon. My kind are born with able bodies, equivalent to any adult of all races. So was then sent immediately to the workforce encampment by my finders."
    }
```

_For bodies of type Form-encode, simply make a token, chaaracter details, activity details, username, email, and password with their associated values you determine for testing. You can also place the token into the Auth > Bearer token input area._

**Upon testing: You will see corresponding text or JSON messages upon successfully/unsuccessfully creating users, logging in users, creating/reading/updating/delete characters and their activity data.**

**If you Login with Github, you will be redirected to the Github Permissions request page.**

## My process

1. Directory and File Setup.
2. Installed NPM. Installed necessary and preferred packages.
3. Created Database Connection and base route index. Set up and tested Server in Browser.
4. Reused User Model, Controller, and Authentication from previous project due to same structure.
5. Testing via Thunderclient and browser.
6. Created Character Model. Reused and refacorted previous code to create Character routes and controlelr logic.
7. Testing CRUD capabilties via Thunderclient and browser. Tested authentication to ensure correct users have access.
8. Created Activity Model. Reused and refacorted previous code to create Activity routes and controlelr logic.
9. Testing CRUD capabilties via Thunderclient and browser. Tested authentication to ensure correct users have access.
10. Bug Fixing, Polish, and final Testing in Thunderclient for edgecases and clarity in error messages.

### Built with

- Node.js
- Express
- MongoDB / Mongoose
- Javascript
- dotenv
- Nodemon
- JWT (JSON Web Token)
- Bcrypt

### Useful resources

**PerScholas** | Modules 12 - 16 | All lessons.

Tishana Trainor

Bryan Santos

## Author

- LinkedIn - [Amanda Ogletree](https://www.linkedin.com/in/amanda-ogletree-a61b60168)
