import axios from 'axios'

export default class CreateRecipeForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('[name="addRecipeName"]')
        this.button = this.element.querySelector('[name="addRecipeButton"]')
        this.button.addEventListener('click', this.addNewRecipe.bind(this))
    }

    addNewRecipe (event) {
        event.preventDefault()

        const recipeName = this.input.value

        if (!recipeName || recipeName.length < 2) {
            alert('Cannot add recipe with empty name or name fewer than 2 characters')
            return
        }

        // TODO convert to POST
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
}
