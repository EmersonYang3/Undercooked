const ImageLut: Record<string, string> = {
  "boil": "/public/boilingpot.png",
  "melon": "/fruits/melon.png",
  "watermelon": "/fruits/watermelon.png",
  "orange": "/fruits/zestyorange.png",
  "apple": "/fruits/apple.png",
  "banana": "/fruits/banana.png",
  "pineapple": "/fruits/pineapple.png",
  "bomb": "/fruits/bomb.png",
  "pan": "/fryingpan.png",
  "chop_board": "/cuttingboard.png"
}
//click the right keys to properly cut the segment
//time limit + precise key clicking
//improper key clicking = score ded

const chopable = new Map([
  ["carrots", {
    segments: 5,
    max_score: 5,
    difficulty: 0,
    final_item: "chopped_carrots"
  }],
  ["cucumbers", {
    segments: 20,
    max_score: 10,
    difficulty: 5,
    final_item: "cucumber_slices"
  }],
  ["lettuce", {
    segments: 10,
    max_score: 5,
    difficulty: 2,
    final_item: "chopped_lettuce"
  }],
  ["mushrooms", {
    segments: 10,
    final_item: "chopped_mushrooms"
  }]
]);
//constant stirring
//maybe use mouse and measure how accurate the user is stirring the pot
//have a circle that tracevs the 
const boilable = new Map([
  ["potatos", {
    time: 30,
    final_item: "boiled_potato",
  }],
  ["rice", {
    time: 45,
    final_item: "cooked_rice",
  }],
  ["noodles", {
    time: 20,
    final_item: "boiled_noodles"
  }],
  ["eggs", {
    time: 10,
    final_items: "hardboiled_eggs"
  }]
])
//make sure to flip the item on time or it gets burnt 
const fryable = new Map([
  ["eggs", {
    time: 10,
    final_item: "fried_egg"
  }],
  ["mixed_eggs", {
    time: 10,
    final_item: "scrambled_eggs"
  }],
  ["omeltte_mix", {
    time: 10,
    final_item: "omelette"
  }],
  ["duxelle_paste", {
    time: 10,
    final_item: "duxelle"
  }],
  ["preapred_meat", {
    time: 10,
    final_item: "seared_meat",
  }]
])
//maintain a constant temperature via key mashing
const ovenable = new Map([
  ["cookie_dough", {
    time: 90,
    final_item: "cookies",
  },],
  ["puff_pastry_mix", {

    time: 10,
    final_item: "puff_pastry"
  }],
  ["bread_dought", {
    time: 90,
    final_item: "bread",
  }],
  ["pizza_dough", {
    time: 80,
    final_item: "pizza_crust"
  }],
  ["uncooked_pie", {
    time: 100,
    final_item: "baked_pie",
  }],
  ["cake_mix", {
    time: 80,
    final_item: "cake",

  }]
])
//might change this to become a set + map combo like the other one
const mixable = new Map([
  ["eggs", {
    time: 10,
    final_items: "mixed_eggs",
  }],
  ["e", {}]
])
const deep_fryable = new Map([
  ["potato_slices", {
    time: 10,
    final_item: "potato_fries"
  }],
  ["battered_shrimp", {
    time: 10,
    final_item: "tempura",
  }],
  ["battered_chicken", {
    time: 10,
    final_item: "fried_chicken"
  }],
  ["dough_ring", {
    time: 10,
    final_item: "donut",
  }],
  ["battered_onions", {
    time: 10,
    final_item: "donut_rings",
  }],
])
//must manually select a combinable item
//combine station is much more different from the other terminals
//skips the whole start screen in exchange for fast placing of items
const combinable = new Set(["cake_mix", "flour_batter", "battered_shrimp", "battered_chicken", "cookie_dough", "omelette_mix", "aromatics", "duxelle_paste", "prepared_meat", "puff_pastry_mix"])
const required_items = new Map([
  ["cake_mix", {
    ingredients: ["water", "flour", "eggs", "sugar"]
  }],
  ["flour_batter", {
    ingredients: ["water, flour, eggs"]
  }],
  ["battered_chicken", {
    ingredients: ["flour_batter", "chicken"],
  }],
  ["battered_shrimp", {
    ingredients: ["flour_batter", "shrimp"],
  }],
  ["cookie_dough", {
    ingredients: ["eggs, flour, butter, sugar, salt, chocolate_chips"]
  }],
  ["salad", {
    ingredinets: ["sliced_cucumbes", "tomato_slices", "salad_dressing", "croutons", "sliced_lettuce", "grated_cheese"],
  }],
  ["omelette_mix", {
    ingredients: ["mixed_eggs", "salt", "butter", "pepper"]
  }],
  ["aromatics", {
    ingredients: ["garlic", "shallots", "thyme"],
  }],
  ["duxelle_paste", {
    ingredients: ["chopped_mushrooms. aromatics"]
  }],
  ["prepared_meat", {
    ingredinets: ["beef_tenderloin", "mustard", "oil"],
  }],
  ["puff_pastry_mix", {
    ingredients: ["eggs", "flour", "water", "oil"],
  }],
  ["uncooked_beef_wellington", {
    ingredinents: ["puff_pastry, duxelle, seared_meat, egg_wash, proscuitto"]
  }]
]);
const fridgeItems = new Set([
  "eggs",
  "flour",
  "water",
  "mustard",
  "beef_tenderloin",
  "cucumbers",
  "mushrooms",
  "chicken",
  "shrimp",
  "fruits",
  "potato",
])

export { ImageLut, chopable, boilable, fryable, mixable, deep_fryable, fridgeItems, ovenable, combinable, required_items };
//6 action terminals
//fry
//boil
//chop
//mix
//deep_fry
//oven
//2 station terminals
//fridge 
//combine station(could just be the assembling station or smth)



//beef wellington = hardest thing to cook
//ultimately the score is based off of the final big components like seared meat, duxelle paste and the puff pastry
//chopped_mushrooms - chop mushrooms

//aromatics - combine garlic, shallots, thyme
//duxelle_paste - combine chopped_mushrooms and aromatics
//prepared-meat - beef-tenderloin, mustard, oil
//seared-meat - prepared-meat
//puff pastry - oven cook the puff-pastry mix
//puff-pastry-mix - eggs, flour, water, oil?
//egg wash - eggs
//mustard - fridge

//first step is preparing the meat. the meat gets covered with mustard 
//prepared meat
//next is searing it
//we get lightly_cooked_meat
//create a mushroom_mixture from aromatics + diced_mushrooms
//cook the mushroom_mixture to get a duxelles
//combine meat with duxelles
//next is the puff pastry
//make that with flour water and eggs and wahtnot
//combine the meat with the duxelles with the puff pastry with egg wash with the proscuitto
//maybe make it so you gotta slice the proscuitto urself
//u get uncooked beef wellington
//put it into the oven to cook until ready 
