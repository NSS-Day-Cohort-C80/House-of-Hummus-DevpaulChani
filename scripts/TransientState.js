export const transientState = {
    entree: null,
    vegetable: null,
    sideDish: null
}
 
export const clearTransientState = () => {
    transientState.entree = null
    transientState.vegetable = null
    transientState.sideDish = null
}
 
export const isComplete = () => {
    return transientState.entree && transientState.vegetable && transientState.sideDish
}