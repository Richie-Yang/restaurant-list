# Restaurant list

Restaurant List, the web service which provides restaurant information for people to search for. The project itself is built upon Node.js + Express.js. Within Express.js backend framework, there are handleBars, body-parser, mongoose together making business logic working without issue. About frontend part, we used Bootstrap, SweetAlert, and Axios to guarantee a satisfying user experience.
Recenetly we implemenmted authentication/authorization feature into this project with well-known module called 'Passport'. And not just local login, we also support Facebook login (for demo use and for self-account only). Furthermore, because we take your personal data seriously, so the password you provide during registeration process is hashed with bcrypt.js. (updated at 01/06/2022)


## Screenshots (updated at 10/31/2021)
### index.hbs view
![Index Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-index.jpg)
### show.hbs view
![Show Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-show.jpg)


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


## Installation
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


## Execution (updated at 10/27/2021)
1. Run below script to add seed data.
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


## All Branches (updated at 01/06/2022)
* 2021/10/26 AC-Homework-A1
* 2021/10/31 AC-Homework-A5
* 2022/01/06 AC-Homework-A6


## Other Screenshots (updated at 10/31/2021)
### new.hbs view
![New Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-new.jpg)
### edit.hbs view
![Edit Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-edit.jpg)
### index.hbs no result view
![NoResult Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a6-restaurant-noResult.jpg)


## Contributor
[Richie](https://github.com/Richie-Yang)
