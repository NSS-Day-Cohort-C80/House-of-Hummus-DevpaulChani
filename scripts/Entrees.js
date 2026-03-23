export const Entrees = async () => {
    const entrees = await fetch("http://localhost:8088/entrees").then(res => res.json())
    
    const entreesHTML = entrees.map(entree => {
        return `
            <label>
                <input type="radio" name="entree" value="${entree.id}" />
                ${entree.name} - $${entree.price.toFixed(2)}
            </label>
        `
    }).join("")

    return `
        <div class="options">
            <h2>Entrees</h2>
            <ul class="choices__base">
                ${entreesHTML}
            </ul>
        </div>
    `
}
