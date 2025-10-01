type Image = {
    name:string,
    file_path: string,
}

const ImageLut:Record<string, Image> = {
    "Boil":{
    name:"boil",
    file_path:"/public/boilingpot.png"
    },
    "melon":{
        name:"banana",
        file_path:"/fruits/melon.png"
    },
    "watermelon":{
        name:"banana",
        file_path:"/fruits/watermelon.png"
    },
    "orange":{
        name:"banana",
        file_path:"/fruits/zestyorange.png"
    },
    "apple":{
        name:"banana",
        file_path:"/fruits/apple.png"
    },
    "banana":{
        name:"banana",
        file_path:"/fruits/banana.png"
    },
    "pineapple":{
        name:"banana",
        file_path:"/fruits/pineapple.png"
    },
    "bomb":{
        name:"bomb",
        file_path:"/fruits/bomb.png"
    }

}//example of a lut entry
export {ImageLut};
