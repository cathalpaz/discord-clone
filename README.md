# Slacord
<img width="1705" alt="Screenshot 2023-08-06 at 9 35 05 PM" src="https://github.com/cathalpaz/discord-clone/assets/16927689/01d9ef70-e08b-4e34-bdef-446d4979bab5"> <br>

- [LIVE LINK](https://slacord.onrender.com)

Slacord is a clone of Discord, a free communications app that keeps you connected with friends, communities, and developers. Users stay connected to their friends via direct messaging and by joining servers they create together so they can chat in real time.

For more details of current features, visit our wiki page:
* [Feature List](https://github.com/cathalpaz/discord-clone/wiki/Feature-List)
* [Database Diagram](https://github.com/cathalpaz/discord-clone/wiki/Database-Diagram)
* [User Stories](https://github.com/cathalpaz/discord-clone/wiki/User-Stories)

# Home and Friends View
![slacord-home](https://github.com/cathalpaz/discord-clone/assets/65454757/4e1aeaab-7515-48c4-bf9f-5c765163bbaa)

# Server and Channel View
![slacord-channels](https://github.com/cathalpaz/discord-clone/assets/65454757/9d7cdccc-6545-430a-b566-2ace4f4122a9)

## Technologies used

**Frontend**  
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**Backend**  
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

 **Cloud Services**
 - AWS (Amazon Web Services)

## Features

While using Slacord, users can:

 - Create an account and login, or sign in with a demo user.
 - Customize your own profile by being able to create and read their own profile pictures and server images.
 - Add friends, and have the ability to see if they are online or offline.
 - Create servers to send messages in, update servers and delete servers.
 - Direct message your friends to chat privately
 - Chat in slacord servers that the user is subscribed to, and direct message one another in real time. 
 - Browse community slacord servers. These public servers can be joined by any user to chat in communities with shared interests.

## Endpoints

| REQUEST | PURPOSE |
| ------- |-------|
| PUT /api/channels/:id | This fetch attempts to update the server's channel information based on channel id |
| DELETE  /api/channels/:id | This fetch will delete the channel based on channel's id |
| GET /api/channels/:id/messages | This fetch will get all channel messages based on channel id |
| POST /api/channels/:id/messages | This fetch will create channel messages based on channel id |
| PUT /api/channels/:id/messages/:messageId | This fetch will edit a channel message based on the channel's id and message's id |
| DELETE /api/channels/:id/messages/:messageId | This fetch will delete a channel message based on the channel's id and message's id |
| GET /api/@me | This fetch will get all of the direct messages from the current logged in user |
| GET /api/@me/:id | This fetch will get a single direct message based on the direct message's id |
| GET /api/@me/friends | This fetch will get all of the current logged in user's friends |
| POST /api/@me/friends/:username/send-request | This fetch will send a friend request to the given username |
| POST /api/@me/friends/:username/accept-request | This fetch will accept a friend request to the given username |
| POST /api/@me/friends/:username/reject-request | This fetch will reject a friend request to the given username |
| GET /api/@me/friends/:id | This fetch will get all the direct messages of a friend based on friend id |
| POST /api/@me/:id | This fetch will create a direct messages to a friend based on friend id |
| PUT /api/@me/:id | This fetch will update a direct messages to a friend based on friend id |
| DELETE /api/@me/:id | This fetch will delete a direct messages to a friend based on friend id |
| GET /api/servers | This fetch will get all of the publically available servers | 
| GET /api/servers/current | This fetch will get all of the current logged in user's servers | 
| GET /api/servers/:id | This fetch will get the server's information based on server's id | 
| GET /api/servers/:id/channels | This fetch will get all the channels inside of a server, if you are an authenticated user | 
| POST /api/servers/:id/channels | This fetch will allow you to create a new server channel if you are the owner of the server | 
| POST /api/servers/new | This fetch will create a new server | 
| DELETE /api/servers/:id | This fetch will delete a server based on server's id| 
| PUT /api/servers/:id| This fetch will update a server based on server's id | 
| GET /api/servers/:id/join | This fetch will allow the current signed in user to join the public server | 
| GET /api/servers/:id/leave | This fetch will allow the current signed in user to leave the public server | 
| GET /api/server-invites/current | This fetch will get the current signed in user's server invites |
| POST /api/server-invites/:username/:serverId | This fetch will send a server invite to the given username inside of the server based on server's id |
| PUT /api/server-invites/:id | This fetch will allow you to accept or decline a server's invite based on server's id |
| POST /api/login | This fetch attempts to login a user with the provided credentials. It returns an object representing the current user, if validation succeeds |
| DELETE /api/login/ | This fetch attempts to log out the current user. |

## Future Goals
* Create the frontend components for sending, accepting and declining a server invite (backend already complete)
* Create a mobile friendly version
  
## Contact Us
| Jun "JP" Park | Zachary Stallings | Jason Murphy | Cathal Paz |
| ------ | ----- | ---- | ---- |
| [GitHub](https://github.com/thejhp1) | [GitHub](https://github.com/zachary5939) | [GitHub](https://github.com/jmurphy1196) | [GitHub](https://github.com/cathalpaz) |
| [LinkedIn](https://www.linkedin.com/in/jun-park-3b23b7285/) | [LinkedIn](https://www.linkedin.com/in/zachstallings/) | [LinkedIn](https://www.linkedin.com/in/jason-murphy-3704ba1b8/) | [LinkedIn](https://www.linkedin.com/in/cathal-paz/) |
| [Wellfound](https://wellfound.com/u/jun-park-35) | | | [Wellfound](https://wellfound.com/u/cathal-paz)|

