import axios from 'axios'

export default class EditableTextInput {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.value
        this.element.addEventListener('focus', this.onFocus.bind(this))
        this.element.addEventListener('blur', this.onBlur.bind(this))
    }

    onFocus (event) {
        this.value = this.element.value
        this.element.removeAttribute('readonly')
    }

    onBlur (event) {
        if (this.value !== this.element.value) {
            this.save()
        }
        this.element.setAttribute('readonly', true)
    }

    save () {
        const data = {
            value: this.element.value
        }
        axios.post(this.endpoint, data)
            .then(response => {
                // console.log(response)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
