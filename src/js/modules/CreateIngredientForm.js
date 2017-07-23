import axios from 'axios'

export default class CreateIngredientForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('[name="addIngredientName"]')
        this.button = this.element.querySelector('[name="addIngredientButton"]')
        this.button.addEventListener('click', this.addNew.bind(this))
    }

    addNew (event) {
        event.preventDefault()

        const label = this.input.value

        if (!label || label.length < 2) {
            alert('Cannot add ingredient with empty name or name fewer than 2 characters')
            return
        }

        axios.post('/api/ingredients', { label })
            .then((result) => {
                const id = result.data.ingredient._id
                console.log('id', id)
                // window.location.href = `/ingredient/${id}`
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })
    }
}
