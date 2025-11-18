<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">Select Ingredient to Produce</h2>

    <select v-model="selectedMethod" class="p-2 rounded border w-full">
      <option disabled value="">Select cooking method</option>
      <option v-for="(list, method) in methods" :key="method" :value="method">
        {{ method }}
      </option>
    </select>

    <div v-if="selectedMethod" class="space-y-2">
      <h3 class="text-lg font-semibold">Items you can make:</h3>
      <select v-model="selectedItem" class="p-2 rounded border w-full">
        <option disabled value="">Choose item</option>
        <option v-for="item in methods[selectedMethod]" :key="item.produces" :value="item.produces">
          {{ item.produces }} (from: {{ item.raw }})
        </option>
      </select>
    </div>

    <div v-if="selectedItem" class="p-3 rounded border bg-gray-50">
      <p class="font-medium">Selected Output:</p>
      <p>{{ selectedItem }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//will change this to use the lut
//seems good but the issue is lack of asset paths
//also horrendous ui 
//will fix later
//lack of integration with the game aswell
const Toaster = [
  { raw: "Bread slice", produces: "Toast", time: 10 }
]
const StovePan = [
  { raw: "Bacon (raw)", produces: "Cooked bacon", time: 15 },
  { raw: "Ground beef", produces: "Cooked burger patty", time: 25 },
  { raw: "Egg", produces: "Fried egg", time: 10 },
  { raw: "Mushroom", produces: "Cooked mushrooms", time: 8 }
]
const OvenBakery = [
  { raw: "Dough", produces: "Croissant dough (baked)", time: 30 },
  { raw: "Pastry dough", produces: "Pastry dough (baked)", time: 25 },
  { raw: "Cake batter", produces: "Cake base", time: 35 },
  { raw: "Dough", produces: "Doughnut (fried)", time: 20 }
]
const BoilerPot = [
  { raw: "Carrot", produces: "Cooked carrots", time: 15 },
  { raw: "Pumpkin", produces: "Cooked pumpkin", time: 20 },
  { raw: "Tomato", produces: "Cooked tomatoes", time: 12 }
]
const GrinderMixer = [
  { raw: "Peanuts", produces: "Peanut butter", time: 10 },
  { raw: "Pistachios", produces: "Pistachio cream", time: 12 },
  { raw: "Chocolate", produces: "Chocolate filling", time: 8 },
  { raw: "Cocoa", produces: "Chocolate glaze", time: 10 },
  { raw: "Jam ingredients (fruit + sugar)", produces: "Jam", time: 20 }
]
const Brewer = [
  { raw: "Coffee beans", produces: "Brewed coffee", time: 12 },
  { raw: "Tea leaves", produces: "Brewed tea", time: 10 }
]
const Assembler = [
  { raw: "Avocado", produces: "Mashed avocado", time: 5 },
  { raw: "Strawberries", produces: "Strawberries", time: 2 },
  { raw: "Sugar", produces: "Frosting base", time: 10 }
]

const methods = {
  Toaster,
  StovePan,
  OvenBakery,
  BoilerPot,
  GrinderMixer,
  Brewer,
  Assembler
}

const selectedMethod = ref("")
const selectedItem = ref("")
</script>
