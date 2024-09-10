# SWOLmate
SWOLmate is a social meetup platform designed to pair up users based on their fitness goals and help them find their perfect gym buddy!
Users can sign up for the platform and make a profile, and via the Google Maps API and geolocation-based services, SWOLmate users
are able to find other like-minded active people, gyms and meetup spots near their location.

# Programming

- JavaScript
- Backend: Express, Node
- Frontend: React
- Database: PostgreSQL

Third party API
- <a href="https://developers.google.com/maps" target="_blank">Google Maps API</a> 
- <a href="https://aws.amazon.com/?nc2=h_lg" target="_blank">AWS Image Hosting</a>

Future APIs
- <a href="https://api-ninjas.com/api/exercises" target="_blank">Exercises API from API Ninjas</a>

# Development

- Prerequisite: have Yarn version 1.22.19 and Node version ^16.18
- Clone the repository (git clone https://github.com/DavidThomas-coder/SWOLmate.git)
- cd swolmate
- Install packages with Yarn (yarn install)
- cd server
- yarn run migrate:latest
- yarn db:seed
- yarn run dev
- Open the development site at localhost:3000

![image](https://github.com/DavidThomas-coder/SWOLmate/assets/70552266/939a8e98-7cd5-4350-a7f6-564630dd1578)

# Features
- A homepage showing other users, and the Google Maps API with a dropdown search bar and results below
- User Profile page showing your information and all chats you are in
- A chat "show" page, with all sent messages saved and persisted
- Group page (in progress), where you can make a group and invite other users

# How to Contribute
Looking to incorporate WebSockets for real-time chat, any advice/resources on that would be appreciated!

