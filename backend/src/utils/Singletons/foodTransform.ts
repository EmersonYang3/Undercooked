import type { foodItem } from "shared/types";
import sharedData from "shared/data"

const foodData = sharedData.foodData



function TransformFoodMethod(food: string, method: string, id: number, quality?: number,): foodItem {
    let item = sharedData.foodData[food];
    if (item.methods[method]) {
        return {
            name: food,
            quality: quality | 5,
            id: id,
        }
    }
}

export default { TransformFoodMethod };