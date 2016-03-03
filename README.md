#MEAN HACKER

A study of technologies, database relationships, and UX design choices of popular websites and applications. This app is built ontop of MEAN Stack boilerplate, check out [MEAN STACK API][1] to read up on the project.

##Description

MEAN HACKER is the third of a series of webpage clones and highlights some of the core functionality of Hacker News. The application is built on top of another project [MEAN STACK API][1] to handle the server side configuration. Currently the application has a functioning backend, and handles basic crud on the client side including adding new posts, commenting, and up voting.

##Technologies and Dependencies Used

* MongoDB
* Express
* Node
* lodash
* mongoose
* bcrypt
* morgan
* body-parser
* colors
* jsonwebtoken
* expressjwt
* mocha
* chai
* supertest
* cors
* method-override
* cookie-parser
* path
* server-favicon

I started this project as a study of technologies, database relationships, and UX design choices of popular websites and applications. The app is built on top of another project [MEAN STACK API][1] a MEAN stack boilerplate, that’s used for the initial server side configuration. The app uses path to facilitate asset handling to the client directory. The client directory expands on the modular configuration of the MEAN stack API boilerplate organizing, views, controllers, services, and assets by feature rather than file type.

##Next steps 

The app handles basic crud for retrieving posting and up/down voting. I’m currently working on building authentication on the client side including storing tokens in local storage, persisting login, and handling logouts. 

## Notes

* Currently the main config file is set to look for secrets in process.env.JWT but defaults to a hardcoded moc secret if unavailable. Remember to never hardcode secrets, if using this boilerplate, make sure to remove that and handle secrets appropriately.
* To start the application run ```npm start```.
* To start the test suite run ```npm test```.

[1]:https://github.com/Brunation11/MEAN-Stack-API-Boilerplate
