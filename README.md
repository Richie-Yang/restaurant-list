# Restaurant list

Restaurant List, the web service which provides restaurant information for people to search for. The project itself is built upon Node.js + Express.js. Within Express.js backend framework, there are handleBars, body-parser, mongoose together making business logic working without issue. About frontend part, we used Bootstrap, SweetAlert, and Axios to guarantee a satisfying user experience.

Recenetly we implemenmted authentication/authorization feature into this project with well-known module called 'Passport'. And not just local login, we also support Facebook login (for demo use and for self-account only). Furthermore, because we take your personal data seriously, so the password you provide during registeration process is hashed with bcrypt.js. (updated at 01/06/2022)


## Screenshots (updated at 01/06/2022)
### login view
![Login Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/final-restaurant-login.jpg)
### index view
![Index Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/final-restaurant-index.jpg)


## Features (updated at 01/06/2022)
1. User can register the new account through local or facebook.
2. User can login into Restaurant list to manage their content.
3. User can sort/filter all restaurants based on custom options.
4. User can create new restaurant info.
5. User can update/delete specific restaurant.
6. user can upload preview image before save all info.
7. User can click one restaurant link to check the detail.
8. User can view all restaurants in homepage.


## Prerequisites (updated at 10/27/2021)
1. Node.js (v14.16.0 is recommended)
3. GitBash or CMder (for Windows) / terminal (for MacOS)


## Installation (updated at 01/06/2022)
1. Open your terminal, then clone the repo to your local.
```
git clone https://github.com/Richie-Yang/restaurant-list.git
```
2. Move to repo directory.
```
cd restaurant-list
```
3. Run the command below to start installing dependencies.
```
npm install
```
4. Create .env file at project root directory
```
touch .env
```
or
```
cp .env.example .env
```
5. Fill out valid string referring to .env.example


## Execution (updated at 01/06/2022)
1. Run below script to add seed data. 
(Every time you run it, the previous seed data will be overwritten)
```
npm run seed
```
2. Start Express server in Node.js env.
```
npm run start
```
or

3. Start Express server in dev mode, which uses nodemon to start server.
```
npm run dev
```
PS: If you don't have nodemon installed, please check [Nodemon](https://www.npmjs.com/package/nodemon) first.


## Usage (updated at 01/06/2022)
1. Open your browser and go to http://127.0.0.1:3000.
2. Click register button to create new account.
3. If you did run 'npm run seed' previously, seed user credentials below are available for use:

First seed user
```
email: user1@example.com
password: 12345678
```

Second seed user
```
email: user2@example.com
password: 12345678
```


## All Branches (updated at 01/06/2022)
* 2021/10/26 AC-Homework-A1
* 2021/10/31 AC-Homework-A5
* 2022/01/06 AC-Homework-A6


## Other Screenshots (updated at 01/06/2022)
### show view
![Show Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-show.jpg)
### new view
![New Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-new.jpg)
### edit view
![Edit Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-edit.jpg)
### no result on index view
![NoResult Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-noResult.jpg)
### error view
![Error Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/final-restaurant-errorHandled.jpg)


## Dependencies
+ bcryptjs: ^2.4.3
+ connect-flash: ^0.1.1
+ dotenv: ^10.0.0
+ express: ^4.17.1
+ express-handlebars: ^5.3.4
+ express-session: ^1.17.2
+ method-override: ^3.0.0
+ mongoose: ^6.0.12
+ passport: ^0.5.2
+ passport-facebook: ^3.0.0
+ passport-local: ^1.0.0


## Contributor
[Richie](https://github.com/Richie-Yang) :wink:
