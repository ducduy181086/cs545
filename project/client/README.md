
# Online store
Online Store for WAA project

## Demo

Click [Link](https://zealous-mushroom-0042a8d1e.5.azurestaticapps.net/) to see online demo

## Short video to show product overview
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/w4TOjGfZYXw/0.jpg)](https://www.youtube.com/watch?v=w4TOjGfZYXw)

## Video explaining verbally the tasks
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/d2bodg2xvI0/0.jpg)](https://www.youtube.com/watch?v=d2bodg2xvI0)

## Installation

 >>> Run client project

 ```bash
 cd client
 npm i
 npm start
 ```

 >>> Run server project

 ```bash
 cd server
 open project
 ```

## Swagger 
Click this [link](https://mini-online-market-bngbdjhuand6cscg.westus-01.azurewebsites.net/swagger-ui/index.html#/) to see API document

## Project structure
```
.
├── client                      # Client folder
│   ├── src                     # Source code
│   │   ├── components          # Define all component of app
│   │   ├── services            # External service (GeminiAPI)
│   │   ├── App.css             # Custom style for widget
│   │   ├── App.js              # Main app
│   │   ├── ...                 # etc.
│   ├── start-client.sh         # Start client app
│   ├── .env                    # Config environment for app
│   ├── ...                     # etc
├── server                      # Server folder
│   ├── config                  # Config for app (DB)
│   ├── controllers             # App controllers
│   ├── models                  # Models
│   ├── routes                  # Routes
│   ├── swagger                 # API document
│   ├── app.js                  # Main app
│   ├── package.json            # Config for app and hosting
│   ├── start-server.sh         # Start server
│   ├── .env                    # Config enviroment for app
│   ├── ...                     # etc
├── ...                         # etc
└── README.md
```
