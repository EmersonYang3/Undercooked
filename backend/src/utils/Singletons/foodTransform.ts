import type { foodItem } from "shared/types";
import sharedData from "shared/data"
import unqiService from "services/unqi";

const foodData = sharedData.foodData

function TransformFoodMethod(food: string, method: string, id: number, quality?: number,): foodItem {
    let item = sharedData.foodData[food]
    if (!item.methods[method]) { return }

    const returnData = {
        name: food,
        quality: quality || 5,
        id: id,
    }

    return returnData
}

function CanCombineFoodItems(foodA: foodItem, foodB: foodItem): boolean {
    const foodAData = foodData[foodA.name]
    const foodBData = foodData[foodB.name]
    if (!foodAData || !foodBData) { return false }

    const combinationA = foodAData.combinations[foodB.name]
    const combinationB = foodBData.combinations[foodA.name]

    const anyCombination = combinationA || combinationB
    if (!anyCombination) { return false }

    return true
}

function CombineFoodItems(foodA: foodItem, foodB: foodItem, newId?: number): foodItem | null {
    const foodAData = foodData[foodA.name]
    const foodBData = foodData[foodB.name]
    if (!foodAData || !foodBData) { return null }

    const combinationA = foodAData.combinations[foodB.name]
    const combinationB = foodBData.combinations[foodA.name]
    const anyCombination = combinationA || combinationB
    if (!anyCombination) { return null }

    const newIdFinal = newId || unqiService.getUnqi()

    const combinedQuality = (foodA.quality + foodB.quality) / 2
    const returnData: foodItem = {
        name: anyCombination,
        quality: combinedQuality,
        id: newIdFinal,
    }

    return returnData
}

export default { TransformFoodMethod, CanCombineFoodItems, CombineFoodItems };