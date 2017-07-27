import axios from 'axios'

export default class EditableTextInput {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.value
        this.boundOnFocus = this.onFocus.bind(this)
        this.boundOnBlur = this.onBlur.bind(this)
        this.element.addEventListener('focus', this.boundOnFocus)
        this.element.addEventListener('blur', this.boundOnBlur)
        this.subscribers = []

        return this
    }

    onFocus () {
        this.value = this.element.value
        this.element.removeAttribute('readonly')
    }

    onBlur () {
        if (this.value !== this.element.value) {
            this.save()
        }
        this.element.setAttribute('readonly', true)
    }

    save () {
        const data = {
            value: this.element.value
        }
        axios.put(this.endpoint, data)
            .then(() => {
                this.value = this.element.value
                this.subscribers.forEach(subscriber => subscriber())
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    subscribeToSaved (callback) {
        this.subscribers.push(callback)
    }

    getValue () {
        return this.value
    }

    destroy () {
        this.element.removeEventListener('focus', this.boundOnFocus)
        this.element.removeEventListener('blur', this.boundOnBlur)
        this.subscribers = []
    }
}
