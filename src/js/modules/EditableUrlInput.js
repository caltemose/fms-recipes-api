import axios from 'axios'

export default class EditableUrlInput {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.url = this.element.dataset.url
        // this.input = this.element.querySelector('input')
        this.anchor = this.element.querySelector('a')
        console.log(this)
        // this.element.addEventListener('focus', this.onFocus.bind(this))
        // this.element.addEventListener('blur', this.onBlur.bind(this))
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
