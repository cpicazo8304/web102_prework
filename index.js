/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){

        // create a new div element, which will become the game card
        let new_div = document.createElement('div');


        // add the class game-card to the list
        new_div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        let display = `
            <div class = "game-card">
                <img class="game-img" src="${games[i].img}" alt="${games[i].name}" </img>
                <h3>${games[i].name}</h3>
                <p> ${games[i].description} </p><br>
                <p> Backers: ${games[i].backers} </p>
            </div>
        `;
        new_div.innerHTML = display;
        // append the game to the games-container
        gamesContainer.appendChild(new_div);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let total_contributions = GAMES_JSON.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.backers; // Accumulate the sum
  }, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
let contributions_display = `
    <p id="num-contributions">${total_contributions.toLocaleString()}</p>
`;

contributionsCard.innerHTML = contributions_display;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let total_raised = GAMES_JSON.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.pledged; // Accumulate the sum
  }, 0);

// set inner HTML using template literal
let raised_display = `
    <p id="total-raised">${total_raised.toLocaleString()}</p>
`;
raisedCard.innerHTML = raised_display;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let num_games = GAMES_JSON.length;

let games_display = `
    <p id="num-games">${num_games}</p>
`;

gamesCard.innerHTML = games_display;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let games_unfunded = GAMES_JSON.filter(currentValue =>{
        return currentValue.pledged < currentValue.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games_unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let games_funded = GAMES_JSON.filter(currentValue =>{
        return currentValue.pledged >= currentValue.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games_funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let games_unfunded = GAMES_JSON.filter(currentValue =>{
    return currentValue.pledged < currentValue.goal;
});

let num_games_unfunded = games_unfunded.length;
let check_if_more_than_one = num_games_unfunded > 1;

// create a string that explains the number of unfunded games using the ternary operator
let explanation = `A total of $${total_raised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
Currently, ${num_games_unfunded} ${num_games_unfunded > 1 ? "games remain" : "game remains"} unfunded. We need your help
to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
let new_paragraph = document.createElement('p');

let paragraph_display = `
    <p>${explanation}</p>
`;

new_paragraph.innerHTML = paragraph_display;

descriptionContainer.appendChild(new_paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first_game, second_game, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_game = document.createElement('p');

const top_game_display = `
    <p>${first_game.name}</p>
`;
top_game.innerHTML = top_game_display;

firstGameContainer.appendChild(top_game);

// do the same for the runner up item
const second_top_game = document.createElement('p');

const second_top_game_display = `
    <p>${second_game.name}</p>
`;
second_top_game.innerHTML = second_top_game_display;

secondGameContainer.appendChild(second_top_game);