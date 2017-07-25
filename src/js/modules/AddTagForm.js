import axios from 'axios'

export default class AddTagForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('[name="AddRecipeTag"]')
        // this.input.addEventListener('keypress', this.handleInput.bind(this))
        this.button = this.element.querySelector('[name="AddRecipeTagButton"]')
        this.button.addEventListener('click', this.addNew.bind(this))

        this.endpoint = this.element.dataset.endpoint
        console.log(this.endpoint)

        axios.get('/api/tags')
            .then(result => {
                this.tags = result.data.tags
                const list = result.data.tags.map(tag => tag.label)
                this.awesomplete = new Awesomplete(this.input, { list })
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    addNew (event) {
        event.preventDefault()

        const label = this.input.value

        if (!label || label.length < 2) {
            alert('Cannot add tag with empty name or name fewer than 2 characters')
            return
        }

        // axios.post('/api/recipes/', { label })
        //     .then((result) => {
        //         const id = result.data.unit._id
        //         window.location.href = `/units/${id}`
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //         alert(err)
        //     })
    }
}
