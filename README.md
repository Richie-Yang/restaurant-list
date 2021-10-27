# Restaurant list

Restaurant List, the web service which provides restaurant information for people to search for. The project itself is built upon Node.js + Express.js. Within Express.js backend framework, there are handleBars, body-parser, mongoose together making business logic working without issue. About frontend part, we used Bootstrap, SweetAlert, and Axios to guarantee a satisfying user experience.  


## Screenshots (updated at 10/27/2021)
### index.hbs view
![Index Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a5-restaurant-index.jpg)
### show.hbs view
![Show Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a5-restaurant-show.jpg)


## Features (updated at 10/27/2021)
1. User can read all restaurant info in index page.
2. User can create new restaurant info in new page.
3. User can update/delete specific restaurant info in edit page.
4. user can upload preview image before save all info.
5. User can click one restaurant link to check the detail.
6. User can search specific restaurants based on keyword.


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


## All Branches
2021/10/26 AC-Homework-A1 (branch)


## Other Screenshots (updated at 10/27/2021)
### new.hbs view
![New Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a5-restaurant-new.jpg)
### edit.hbs view
![Edit Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a5-restaurant-edit.jpg)
### index.hbs no result view
![NoResult Page](https://github.com/Richie-Yang/restaurant-list/blob/main/public/img/a5-restaurant-noResult.jpg)


## Contributor
[Richie](https://github.com/Richie-Yang)
