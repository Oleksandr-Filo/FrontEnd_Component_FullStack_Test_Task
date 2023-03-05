# The median prime number(s) getter App

## DEMO LINK
[DEMO LINK](https://Oleksandr-Filo.github.io/frontend_component)

## Description
APP which allow you input a number and receive the median prime number(s) of the set of prime numbers less than entered value (or an appropriate error message).
The result will be shown at the top of history of previous calculations.
Also you are able to clear history.

Here are some examples of calculations:
- If number = 10, the set of prime numbers less than 10 is [2,3,5,7], and so the medians are [3,5];
- If number = 18, the set of prime numbers less than 18 is [2,3,5,7,11,13,17], and so the median is [7];

## Technologies used:
- React;
- TypeScript;
- Fetch;
- Material UI;
- React testing library;

## BACKEND COMPONENT OF THE APP
[BACKEND COMPONENT](https://github.com/Oleksandr-Filo/backend_component) - Node.js server that finds the median prime number(s) using the Sieve of Eratosthenes algorithm and returns array of results or an error.
There are also endpoints for loading the history of previous calculations and deleting all calculations from the history. (Technologies used: Node.js, TypeScript, Express, Sequelize, Neon DB, Jest);

## Instructions how to run an application locally 
❗️❗️❗️ First of all you have to run server locally from `https://github.com/Oleksandr-Filo/backend_component` ❗️❗️❗️.

After the server is running, follow these steps:
1. Download or clone repository. `git clone git@github.com:Oleksandr-Filo/frontend_component.git`.
2. Open project folder with code editor (VS Code, WebStorm, other).
3. Use a 14th version of Node.js.
4. Run ```npm install``` in terminal.
5. Open second terminal and run ```npm start```.
6. If tab does not open, go to ```http://localhost:3000``` in your browser.
