import axios from 'axios'

export default class EditableCheckbox {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.checkbox = this.element.querySelector('input[type="checkbox"]')
        this.checkbox.addEventListener('change', this.onChange.bind(this))
        return this
    }

    onChange () {
        const data = {
            value: this.checkbox.checked
        }

        axios.post(this.endpoint, data)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
