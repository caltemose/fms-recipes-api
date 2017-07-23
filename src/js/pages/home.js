import axios from 'axios'

const addRecipeInput = document.getElementById('addRecipeName')
const addRecipeButton = document.getElementById('addRecipeButton')

const addNewRecipe = function addNewRecipe (event) {
    event.preventDefault()

    const recipeName = addRecipeInput.value

    axios.put('/api/recipes', { recipeName })
        .then((result) => {
            const id = result.data.recipe._id
            window.location.href = `/recipes/${id}`
        })
        .catch((err) => {
            console.error(err)
            alert(err)
        })
}

addRecipeButton.addEventListener('click', addNewRecipe)

