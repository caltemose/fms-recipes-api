import axios from 'axios'

export default class EditableDiv {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.innerHTML
        this.element.addEventListener('blur', this.onBlur.bind(this))
        return this
    }

    onBlur () {
        if (this.value !== this.element.innerHTML) {
            this.save()
        }
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

        const data = {
            value: this.element.innerHTML
        }
        axios.post(this.endpoint, data)
            .then(() => {
                this.value = this.element.innerHTML
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
