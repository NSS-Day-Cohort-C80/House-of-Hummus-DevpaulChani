import { FoodTruck } from "./FoodTruck.js"
import { transientState, clearTransientState, isComplete } from "./TransientState.js"
 
const mainContainer = document.querySelector("#container")
 
const renderAllHTML = async () => {
    mainContainer.innerHTML = await FoodTruck()
    attachEventListeners()
}
 
const attachEventListeners = () => {
    document.querySelectorAll('input[name="entree"]').forEach(radio => {
        radio.addEventListener("change", (event) => {
            transientState.entree = event.target.value
        })
    })
 
    document.querySelectorAll('input[name="vegetable"]').forEach(radio => {
        radio.addEventListener("change", (event) => {
            transientState.vegetable = event.target.value
        })
    })
 
    document.querySelectorAll('input[name="sideDish"]').forEach(radio => {
        radio.addEventListener("change", (event) => {
            transientState.sideDish = event.target.value
        })
    })
 
    //purchase button
    document.querySelector("#purchase").addEventListener("click", purchaseMeal)
}
 

const purchaseMeal = async () => {
    //check if all selections are made
    if (!isComplete()) {
        return
    }
 
    //get prices for selected items
    const entrees = await fetch("http://localhost:8088/entrees").then(res => res.json())
    const vegetables = await fetch("http://localhost:8088/vegetables").then(res => res.json())
    const sides = await fetch("http://localhost:8088/sides").then(res => res.json())
 
    const entreePrice = entrees.find(entree => entree.id == transientState.entree).price
    const veggiePrice = vegetables.find(vegetable => vegetable.id == transientState.vegetable).price
    const sidePrice = sides.find(side => side.id == transientState.sideDish).price
 
    const totalCost = entreePrice + veggiePrice + sidePrice
 
    //create purchase object
    const newPurchase = {
        entreeId: parseInt(transientState.entree),
        vegetableId: parseInt(transientState.vegetable),
        sideDishId: parseInt(transientState.sideDish),
        totalCost: totalCost
    }
 
    //post to json database
    await fetch("http://localhost:8088/purchases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPurchase)
    })
 
    //reset transient state
    clearTransientState()
 
    //re-render
    await renderAllHTML()
}
 
renderAllHTML()
 

