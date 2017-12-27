import axios from 'axios'

export default class CreateCollectionForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('[name="addCollectionName"]')
        this.button = this.element.querySelector('[name="addCollectionButton"]')
        this.button.addEventListener('click', this.addNew.bind(this))
    }

    addNew (event) {
        event.preventDefault()

        const label = this.input.value

        if (!label || label.length < 2) {
            alert('Cannot add collection with empty name or name fewer than 2 characters')
            return
        }

        axios.post('/api/collections', { label })
            .then((result) => {
                console.log(result.data)
                const id = result.data.collection._id
                window.location.href = `/collections/${id}`
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })
    }
}
