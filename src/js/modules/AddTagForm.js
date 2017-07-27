import axios from 'axios'

export default class AddTagForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('[name="AddRecipeTag"]')
        // this.input.addEventListener('keypress', this.handleInput.bind(this))
        this.button = this.element.querySelector('[name="AddRecipeTagButton"]')
        this.button.addEventListener('click', this.addNew.bind(this))

        this.endpoint = this.element.dataset.endpoint
        
        this.subscribers = []

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

    subscribeToSaved (callback) {
        this.subscribers.push(callback)
    }

    addNew (event) {
        event.preventDefault()

        const label = this.input.value

        if (!label || label.length < 2) {
            alert('Cannot add tag with empty name or name fewer than 2 characters')
            return
        }

        axios.post(this.endpoint, { label })
            .then((result) => {
                // empty the tag input and focus it
                this.input.value = ''
                this.input.focus()

                // pass the new tag data to the parent so the tag list can be updated
                const tag = result.data.tag
                this.subscribers.forEach(subscriber => subscriber(tag))
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })
    }
}
