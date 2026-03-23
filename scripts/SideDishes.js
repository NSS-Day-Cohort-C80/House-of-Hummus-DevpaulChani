export const Sides = async () => {
    const sides = await fetch("http://localhost:8088/sides").then(res => res.json())

    const sidesHTML = sides.map(side => {
        return `
            <label>
                <input type="radio" name="sideDish" value="${side.id}" />
                ${side.title} - $${side.price.toFixed(2)}
            </label>
        `
    }).join("")

    return `
        <div class="options">
            <h2>Side Dishes</h2>
            <ul class="choices__sides">
                ${sidesHTML}
            </ul>
        </div>
    `
}
