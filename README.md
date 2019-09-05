# Free-Mentors
[![Build Status](https://travis-ci.org/ramadhanbridge/Free-Mentors.svg?branch=develop)](https://travis-ci.org/ramadhanbridge/Free-Mentors)  [![Coverage Status](https://coveralls.io/repos/github/ramadhanbridge/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/ramadhanbridge/Free-Mentors?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/85154ae78c2912709761/maintainability)](https://codeclimate.com/github/ramadhanbridge/Free-Mentors/maintainability)

***
#### FreeMentors is a social initiative where acomplished professionals become rolemodels to young people to provide free mentorship sessions.
***

> ###  UI demo
1) View user   demo by clicking   [user demo](https://ramadhanbridge.github.io/Free-Mentors/UI/html/index.html)
2) view mentor demo by clicking [mentor demo](https://ramadhanbridge.github.io/Free-Mentors/UI/html/mentor.html)
3) View admin  demo by clicking  [admin demo](https://ramadhanbridge.github.io/Free-Mentors/UI/html/admin.html)

###### Or you can simply login with mentor@gmail.com to access mentor dashboard or use admin@gmail.com to acces admin dash board 

#### Language used to create UI:
!)   HTML
!!)  CSS
!!!) JAVASCRIPT

*** 

> ### API endpoints

#####With  endpoints, seven of them were complusory  and the rest were optional, you can test them by using heroku by simply  [clicking here](https://adc10.herokuapp.com/api/v1)

#### Simple description of endpoints

| Method        | Endpoint                 | Description|
| ------------- | --------------------------|------------|
| POST           |`/auth/signup`   |user should be able to create account|
| POST          | `/auth/signin`   |user should be able to signin |
| PATCH       | `/user/:userId`   |Admin should be able to change user to a mentor|
| GET        | `/mentors `   | mentee should be able to get all mentors|
| GET          | `/mentors/:userId:`   |mentee should be able get specific mentor|
| POST  |`/sessions` |mentee should be able to create mentorship request|
| GET         | `/sessions`   |Mentor should be able to view all mentorship request sessions|
| GET         | `/sessions`   |Mentee should be able to view all his mentorship  sessions request |
| PATCH          | `:userId/accept`   |Mentor should be able to accept a mentorship request sessions|
| PATCH          | `/:userId>/reject`   |Mentor should be able to reject a mentorship sessions request |
| DELETE          | `/sessions/:userId>/review`   | Admin should be able to delete review deemed inappropriate |


 #### Technology used to create endpoints:
!)   Nodejs
!!)  MOCHA
!!!) TRAVIS CI

 #### How to test endpoints
 1) clone the project  and write 
 ```#js
 npm install and then npm run start
 ``` 
 start testing them using postaman(highly recommended)

 2) user heroku deployement link provided above

***

## Author

[Nyiringondo Ramadhan](https://github.com/ramadhanbridge/Free-Mentors/)

## License

This project is licensed under the MIT License - checkout  the [LICENSE](LICENSE.md) file for more details

## Acknowledgments

* [Andela Kigali](https://andela.com/)

***

