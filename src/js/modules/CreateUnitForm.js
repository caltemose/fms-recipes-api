import axios from 'axios'

export default class CreateUnitForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('[name="addUnitName"]')
        this.button = this.element.querySelector('[name="addUnitButton"]')
        this.button.addEventListener('click', this.addNew.bind(this))
    }

    addNew (event) {
        event.preventDefault()

        const label = this.input.value

        if (!label || label.length < 2) {
            alert('Cannot add unit with empty name or name fewer than 2 characters')
            return
        }

        axios.post('/api/units', { label })
            .then((result) => {
                const id = result.data.unit._id
                window.location.href = `/units/${id}`
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })
    }
}
