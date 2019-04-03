
# REACT CHALLENGE

  

Your mission is to improve a web application which displays the Premier League results.

There is a public API to fetch relevant data. It's mostly set up already.

  

We're providing you the initial setup and dependencies, but if you need, feel free to add further dependencies while keeping the core untouched (React 16, React Router 4.x, SuperAgent or similar XHR lib).

  

To run the project, you need to have Node (and NPM) installed:

  
```
npm install
```
```
npm start --reset-cache
```  
## Live Demo
  [Premier League - React Challenge - Erick Maeda](http://www.erickmaeda.com.br/#/)

## Screenshots
[Images full screen](https://github.com/ErickMaeda/premier-league/tree/master/assets/screenshots)

## Tasks to perform

 - [x] Create the Result in a **PureComponent**. A winning team should have its name in **bold**.

 - [ ] Make weeks start in 1 instead of zero (both visually and route-wise)
	 - I didn't create a screen that only shows the week games. I show the week games on HomeScreen or RankingScreen together with table of results. I also have created the week results in the team page. 
	 - Based on other tables like, I show the last week first when the data is first available. The user can choose from the **1st** to last week. 
		 - [GloboEsporte - Premier League](https://globoesporte.globo.com/futebol/futebol-internacional/futebol-ingles/)
		 - [Premier League](https://www.premierleague.com/tables)

 - [x] Create a function returning clubs stats given a club's array of results

 - [x] Create a table of results
	 - Compute goals
	 - Compute wins
	 - Compute draws
	 - Compute losses
	 - Compute goal difference
	 - Compute position

 - [x] Display club logos on results and team page
	 - Display on Team Screen / Teams Screen / Home Screen

 - [x] Style it the way you best see fit 

 - [x] Feel free to restructure/clean/test the code to best serve your solution
	- The project follow the structure.
		- **actions** - Actions dispatched from screen using redux-thunk to dispatch action
		- **hocs** - Using High Order Components with Compose from redux to reuse easily 
		- **assets** - All the assets from using in the project. In this case only the Premier League & Sky logo.
 		- **components** - The reusable components all in PureComponent.
 		-  **configs** - The configuration of redux and other configuration of the project, but in this case we have only the redux to configure.
	 		- Set the redux to use thunk as a middleware
	 		- Set the devtools of react-redux;
	 		- Set the persist store as a WebStorage
 		- **helpers** - Utils for all the project.
 		- **reducers** - The reducers used in this project. The `index.js` from reducers is the root that has the `combineReducer()`
 		- **screens** - Screens used in this project. The `index.js` from screens configure all the routes with `react-router-dom`
 		- **selectors** - It's like a query selector of reducers. It provide the data from reducer without the user know where is located the data.
 		- **services** - We have a Rest API use to help us to make http requests using axios. It should be as abstracted as possible.

  
## API

### Premier League API

- Base URL
    - http://acor.sl.pt:7777
- Available EndPoints
    - http://acor.sl.pt:7777/teams
    -  http://acor.sl.pt:7777/teams/:teamId
    - http://acor.sl.pt:7777/logos/:teamId
    - http://acor.sl.pt:7777/weeks
    - http://acor.sl.pt:7777/weeks/:weekIdx
> All the EndPoints are GET method.


## League Rules

  

<https://en.wikipedia.org/wiki/Premier_League#Competition_format>

- wins are awarded 3 points, draws 1 and losses 0
- criteria for finding the Premier League ranking are:
- total points
- goal difference
- goals scored
