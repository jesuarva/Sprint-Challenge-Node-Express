# Review Questions

## What is Node.js?

* Is a platform that provide a runtime enviroment to run Javascript with the V8 Chrome Engine
* Is build upon an Events-Driven abstraction, that abstraction makes the most part of the Node programs to run in a non blocking manner providing a fast enviroment.

## What is Express?

* Express is an API that offers a preset of features and methods to build and handle Servers in Node.
* It helps us to build/code a robust server from the ground up.

## Mention two parts of Express that you learned about this week.

* Middlewears.
* expres.Router.
* Routes.

## What is Middleware?

* In the Node context is a handler that is triggered in response to an event => event: HttpRequestMethod + Path
* In the express context is a helper function. This helper function help us to maintain a separation of concerns in our logic, modularity, keep our code tidy and deal with errors in an easy manner.

## What is a Resource?

* Is any type of data that a server can serve to a client request.

## What can the API return to help clients know if a request was successful?

* HTTP request Status codes.

## How can we partition our application into sub-applications?

* Routers and sub-routers...and so on...

## What is CORS and why do we need it?

* Cross Origin Resours Sharing.
* Is a specification that offer a layer of security to our resources, The server and the Client (browser as an example) works in harmony to handle what resources can be delivered to whom.
