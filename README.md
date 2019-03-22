# REACT CHALLENGE

Your mission is to improve a web application which displays the Premier League results.
There is a public API to fetch relevant data. It's mostly set up already.

We're providing you the initial setup and dependencies, but if you need, feel free to add further dependencies while keeping the core untouched (React 16, React Router 4.x, SuperAgent or similar XHR lib).

To run the project, you need to have Node (and NPM) installed:

    npm install
    npm start


## Tasks to perform

* Create the Result pure component. A winning team should have its name in bold.
* Make weeks start in 1 instead of zero (both visually and route-wise)
* Create a function returning clubs stats given a club's array of results
* Create a table of results
* Display club logos on results and team page
* Style it the way you best see fit
* Feel free to restructure/clean/test the code to best serve your solution


## API

## League Rules

<https://en.wikipedia.org/wiki/Premier_League#Competition_format>
* wins are awarded 3 points, draws 1 and losses 0
* criteria for finding the Premier League ranking are:
  * total points
  * goal difference
  * goals scored
