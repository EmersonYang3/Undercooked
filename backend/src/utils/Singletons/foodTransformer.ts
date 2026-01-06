import sharedData from "shared/data"
import sharedEnums from "shared/enums"

import unqi from "services/unqi"
import { createEmptyHoldable } from "./itemPlacer"

import type { holdableItem, internalFoodData, foodItem } from "shared/types"

const foodData = sharedData.foodData
const methods = sharedEnums.methods

function getFoodDefinition(foodName: string): internalFoodData | undefined {
    return foodData[foodName]
}

function createFood(foodName: string, isPlated: boolean, quality: number = 0): holdableItem {
    const item: foodItem = { name: foodName, id: unqi.getUnqi(), quality }
    return { foodItems: [item], isPlated }
}

function CanTransform(item: holdableItem, method: string): boolean {
    if (!item || item.foodItems.length !== 1) { return false }

    const currentFood = item.foodItems[0]
    const definition = getFoodDefinition(currentFood.name)
    if (!definition) { return false }

    return Boolean(definition.methods[method])
}

function Transform(item: holdableItem, method: string): holdableItem {
    if (!CanTransform(item, method)) { return item }

    const currentFood = item.foodItems[0]
    const definition = getFoodDefinition(currentFood.name)
    if (!definition) { return item }

    const targetFoodName = definition.methods[method]
    if (!targetFoodName) { return item }

    return createFood(targetFoodName, item.isPlated, currentFood.quality)
}

function foodsMatchRequired(foodNames: string[], required: string[]): boolean {
    if (required.length !== foodNames.length) { return false }

    const sortedFood = [...foodNames].sort()
    const sortedRequired = [...required].sort()

    return sortedFood.every((name, index) => name === sortedRequired[index])
}

function CombineItems(item: holdableItem, itemToAdd: holdableItem): holdableItem {
    const base = item ?? createEmptyHoldable()
    const addition = itemToAdd ?? createEmptyHoldable()

    const combined: holdableItem = {
        isPlated: base.isPlated || addition.isPlated,
        foodItems: [...base.foodItems.map((f) => ({ ...f })), ...addition.foodItems.map((f) => ({ ...f }))],
    }

    const combinedNames = combined.foodItems.map((f) => f.name)

    for (const [foodName, definition] of Object.entries(foodData)) {
        if (!definition.considerAsRecipe) { continue }
        if (!definition.requiredItems || definition.requiredItems.length === 0) { continue }

        const matches = foodsMatchRequired(combinedNames, definition.requiredItems)
        if (!matches) { continue }

        const totalQuality = combined.foodItems.reduce((sum, f) => sum + (f.quality ?? 0), 0)
        const avgQuality = combined.foodItems.length > 0 ? totalQuality / combined.foodItems.length : 0

        return createFood(foodName, combined.isPlated, avgQuality)
    }

    return combined
}

export default { CanTransform, Transform, CombineItems, methods }
