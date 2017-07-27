import axios from 'axios'

export default class EditableNumber {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.getValue()
        this.boundOnBlur = this.onBlur.bind(this)
        this.element.addEventListener('blur', this.boundOnBlur)
        return this
    }

    getValue () {
        if (this.element.tagName === 'INPUT') {
            return this.element.value
        } else {
            return this.element.innerHTML
        }
    }

    onBlur () {
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
        axios.put(this.endpoint, data)
            .then(() => {
                this.value = this.element.innerHTML
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    destroy () {
        this.element.removeEventListener('blur', this.boundOnBlur)
    }
}
