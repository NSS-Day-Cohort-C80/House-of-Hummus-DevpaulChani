export const Veggies = async () => {
    const vegetables = await fetch("http://localhost:8088/vegetables").then(res => res.json())

    const veggiesHTML = vegetables.map(veggie => {
        return `
            <label>
                <input type="radio" name="vegetable" value="${veggie.id}" />
                ${veggie.type} - $${veggie.price.toFixed(2)}
            </label>
        `
    }).join("")

    return `
        <div class="options">
            <h2>Vegetables</h2>
            <ul class="choices__veggies">
                ${veggiesHTML}
            </ul>
        </div>
    `
}
