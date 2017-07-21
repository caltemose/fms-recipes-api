import axios from 'axios'

export default class EditableNumber {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.getValue()
        this.element.addEventListener('blur', this.onBlur.bind(this))
        return this
    }

    getValue () {
        if (this.element.tagName === 'INPUT') {
            return this.element.value
        } else {
            return this.element.innerHTML
        }
    }


    onBlur (event) {
        if (this.value !== this.getValue()) {
            this.save()
        }
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

        const data = {
            value: Number(this.getValue())
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
