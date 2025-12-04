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
  "chop_board": "/cuttingboard.png",
  "Avocado toast": "/public/final/Avocado toast.png",
  "Bacon toast": "/public/final/Bacon toast.png",
  "Burger": "/public/final/Burger.png",
  "Carrot stew": "/public/final/Carrot stew.png",
  "Cheese": "/public/final/Cheese.png",
  "Chocolate croissant": "/public/final/Chocolate croissant.png",
  "Chocolate doughnut": "/public/final/Chocolate doughnut.png",
  "Croissant": "/public/final/Croissant.png",
  "Cup of coffee": "/public/final/Cup of coffee.png",
  "Cup of tea": "/public/final/Cup of tea.png",
  "Egg toast": "/public/final/Egg toast.png",
  "Empty bowl 1": "/public/final/Empty bowl 1.png",
  "Empty bowl 2": "/public/final/Empty bowl 2.png",
  "Empty cup 1": "/public/final/Empty cup 1.png",
  "Empty cup 2": "/public/final/Empty cup 2.png",
  "Jam doughnut": "/public/final/Jam doughnut.png",
  "Jam pastrie": "/public/final/Jam pastrie.png",
  "Jam toast": "/public/final/Jam toast.png",
  "Meatballs": "/public/final/Meatballs.png",
  "Milk and cookies": "/public/final/Milk and cookies.png",
  "Mushroom Stew": "/public/final/Mushroom Stew.png",
  "Peanut butter and jelly toast": "/public/final/Peanut butter and jelly toast.png",
  "Pistachio doughnut": "/public/final/Pistachio doughnut.png",
  "Pumpkin soup": "/public/final/Pumpkin soup.png",
  "Strawberry cake": "/public/final/Strawberry cake.png",
  "Strawberry doughnut": "/public/final/Strawberry doughnut.png",
  "Toast": "/public/final/Toast.png",
  "Tomato stew": "/public/final/Tomato stew.png"
}
//base stuff off of this
const dishToPrepared = {
  "Avocado toast": ["Toast", "Mashed avocado"],
  "Bacon toast": ["Toast", "Cooked bacon"],
  "Burger": ["Burger bun", "Cooked burger patty", "Cheese (optional)", "Lettuce (optional)"],
  "Carrot stew": ["Stew base", "Cooked carrots"],
  "Cheese": ["Cheese block"],
  "Chocolate croissant": ["Croissant dough (baked)", "Chocolate filling"],
  "Chocolate doughnut": ["Doughnut (fried)", "Chocolate glaze"],
  "Croissant": ["Croissant dough (baked)"],
  "Cup of coffee": ["Brewed coffee"],
  "Cup of tea": ["Brewed tea"],
  "Egg toast": ["Toast", "Fried egg"],
  "Jam doughnut": ["Doughnut (fried)", "Jam filling"],
  "Jam pastrie": ["Pastry dough (baked)", "Jam filling"],
  "Jam toast": ["Toast", "Jam"],
  "Meatballs": ["Cooked meatballs"],
  "Milk and cookies": ["Milk", "Cookies"],
  "Mushroom Stew": ["Stew base", "Cooked mushrooms"],
  "Peanut butter and jelly toast": ["Toast", "Peanut butter", "Jelly"],
  "Pistachio doughnut": ["Doughnut (fried)", "Pistachio cream"],
  "Pumpkin soup": ["Soup base", "Cooked pumpkin"],
  "Strawberry cake": ["Cake base", "Strawberry frosting", "Strawberries"],
  "Strawberry doughnut": ["Doughnut (fried)", "Strawberry glaze"],
  "Toast": ["Toast"],
  "Tomato stew": ["Stew base", "Cooked tomatoes"]
};
const preparedIngredients = [
  "Toast",
  "Mashed avocado",
  "Cooked bacon",
  "Burger bun",
  "Cooked burger patty",
  "Cheese (optional)",
  "Lettuce (optional)",
  "Stew base",
  "Cooked carrots",
  "Cheese block",
  "Croissant dough (baked)",
  "Chocolate filling",
  "Doughnut (fried)",
  "Chocolate glaze",
  "Brewed coffee",
  "Brewed tea",
  "Fried egg",
  "Jam filling",
  "Pastry dough (baked)",
  "Jam",
  "Cooked meatballs",
  "Milk",
  "Cookies",
  "Cooked mushrooms",
  "Peanut butter",
  "Jelly",
  "Pistachio cream",
  "Soup base",
  "Cooked pumpkin",
  "Cake base",
  "Strawberry frosting",
  "Strawberries",
  "Strawberry glaze",
  "Cooked tomatoes"
];
const rawIngredients = [
  "Bread slice",
  "Avocado",
  "Bacon (raw)",
  "Ground beef",
  "Cheese curds / milk",
  "Flour",
  "Butter",
  "Chocolate",
  "Cocoa",
  "Tea leaves",
  "Coffee beans",
  "Egg",
  "Yeast",
  "Sugar",
  "Milk (raw)",
  "Carrot",
  "Mushroom",
  "Pumpkin",
  "Tomato",
  "Peanuts",
  "Strawberries",
  "Wheat for flour",
  "Oil",
  "Jam ingredients (fruit + sugar)",
  "Pistachios"
];

const Toaster = [
  { raw: "Bread slice", produces: "Toast", time: 10 }
];
const StovePan = [
  { raw: "Bacon (raw)", produces: "Cooked bacon", time: 15 },
  { raw: "Ground beef", produces: "Cooked burger patty", time: 25 },
  { raw: "Egg", produces: "Fried egg", time: 10 },
  { raw: "Mushroom", produces: "Cooked mushrooms", time: 8 }
];
const OvenBakery = [
  { raw: "Dough", produces: "Croissant dough (baked)", time: 30 },
  { raw: "Pastry dough", produces: "Pastry dough (baked)", time: 25 },
  { raw: "Cake batter", produces: "Cake base", time: 35 },
  { raw: "Dough", produces: "Doughnut (fried)", time: 20 }
];
const BoilerPot = [
  { raw: "Carrot", produces: "Cooked carrots", time: 15 },
  { raw: "Pumpkin", produces: "Cooked pumpkin", time: 20 },
  { raw: "Tomato", produces: "Cooked tomatoes", time: 12 }
];
const GrinderMixer = [
  { raw: "Peanuts", produces: "Peanut butter", time: 10 },
  { raw: "Pistachios", produces: "Pistachio cream", time: 12 },
  { raw: "Chocolate", produces: "Chocolate filling", time: 8 },
  { raw: "Cocoa", produces: "Chocolate glaze", time: 10 },
  { raw: "Jam ingredients (fruit + sugar)", produces: "Jam", time: 20 }
];
const Brewer = [
  { raw: "Coffee beans", produces: "Brewed coffee", time: 12 },
  { raw: "Tea leaves", produces: "Brewed tea", time: 10 }
];
const Assembler = [
  { raw: "Avocado", produces: "Mashed avocado", time: 5 },
  { raw: "Strawberries", produces: "Strawberries", time: 2 },
  { raw: "Sugar", produces: "Frosting base", time: 10 }
];
const makeSet = (list: { raw: string }[]) =>
  new Set(list.map(item => item.raw));

// Generated sets
const toasterSet = makeSet(Toaster);
const stovePanSet = makeSet(StovePan);
const ovenBakerySet = makeSet(OvenBakery);
const boilerPotSet = makeSet(BoilerPot);
const grinderMixerSet = makeSet(GrinderMixer);
const brewerSet = makeSet(Brewer);
const assemblerSet = makeSet(Assembler);

// Example export
export type StationType =
  | "stove"
  | "oven"
  | "toaster"
  | "boiler"
  | "mixer"
  | "brewer"
  | "assembler"
  | "dispenser";
export const stationRawMap: Record<StationType, Set<string>> = {
  stove: stovePanSet,
  oven: ovenBakerySet,
  toaster: toasterSet,
  boiler: boilerPotSet,
  mixer: grinderMixerSet,
  brewer: brewerSet,
  assembler: assemblerSet,
  dispenser: new Set(), // no raw ingredients
};
const preparationStations = {
  Toaster,
  StovePan,
  OvenBakery,
  BoilerPot,
  GrinderMixer,
  Brewer,
  Assembler
};
export { ImageLut, preparationStations, dishToPrepared };