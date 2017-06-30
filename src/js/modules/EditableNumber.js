import axios from 'axios'

export default class EditableNumber {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.innerHTML
        this.element.addEventListener('blur', this.onBlur.bind(this))
        return this
    }

    onBlur (event) {
        if (this.value !== this.element.innerHTML) {
            this.save()
        }
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

        const data = {
            value: Number(this.element.innerHTML)
        }
        axios.post(this.endpoint, data)
            .then(response => {
                this.value = this.element.innerHTML
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
