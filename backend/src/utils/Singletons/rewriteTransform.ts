import type { foodItem, plate } from "shared/types";
import sharedData from "shared/data"
import unqiService from "services/unqi";
import { isFood, methods } from "shared/enums";
import { inputKey, recipesByInput } from "shared/data/foodData";
function TransformFoodMethod(food: string, method: string, id: number, quality?: number): foodItem {
    let item = sharedData.recipesByInput[food];
    if (!item[method]) { return }
    const returnData: foodItem = {
        name: food,
        quality: quality || 5,
        id: id,
    }
    return returnData;
}
function CanCombineFoodItems(foods: Array<foodItem>): boolean {
    for (let i = 0; i < foods.length; i++) {
        if (!isFood(foods[i])) {
            return false;
        }
    }
    let names = foods.map(item => item.name);
    let key = inputKey(names);
    if (!recipesByInput[key]) {
        return false;
    }
    return true;

}
function CombineFoodItems(foods: Array<foodItem>, newId?: number): foodItem | null {
    let names = foods.map(item => item.name);
    let key = inputKey(names);
    let new_recipe = recipesByInput[key][methods.combine];
    if (!new_recipe) { return null };
    const newIDFinal = newId || unqiService.getUnqi();
    let combinedQuality = 0;
    foods.map(item => combinedQuality += item.quality);
    const returnData: foodItem = {
        name: new_recipe,
        quality: combinedQuality,
        id: newIDFinal
    }
    return returnData;
}
function isPlate(item: foodItem | plate): item is plate {
    return (item as plate).foodItem !== undefined;
}

function isFoodItem(item: foodItem | plate): item is foodItem {
    return (item as foodItem).name !== undefined;
}
export default { TransformFoodMethod, CanCombineFoodItems, CombineFoodItems, isPlate, isFoodItem };