function assign_recipe() {

}
type TerminalName = "oven" | "stove" | "chop" | "cook" | "boil" | "gather" | "serve" | "holding";
const terminalLookUp:Record<TerminalName, number> = {
    //contains the list of current terminals
    "oven" : 1,
    "stove": 1,
    "chop" : 1,
    "cook" : 1,
    "boil" : 1,
    "gather": 1,
    "serve": 1,
    "holding" : 1,
};
//have a set that holds all the unique terminals for actual recipe calculations
//makes it much more easier
//if needed for efficiency could pre calculate the possible permutations beforehand for a given amount
const uniqueTerminals = new Set();

//iterate thru the food
//read the methods attributed with each
//use set.cotains

const foods = [];

function possible_recipes() {
    for(let i = 0; i<foods.length; i++) {
        uniqueTerminals.has(foods[i])
    }
}
//game has to calculate the list of possible recipes that can be done
function possible_terminal_type() {
    f
}