import axios from 'axios'

export default class EditableSelect {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.value
        this.boundOnChange = this.onChange.bind(this)
        this.element.addEventListener('change', this.boundOnChange)
        this.subscribers = []

        return this
    }

    onChange () {
        if (this.value !== this.element.value) {
            this.save()
        }
    }

    save () {
        const data = {
            value: this.element.value
        }

        axios.post(this.endpoint, data)
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
        this.element.removeEventListener('change', this.boundOnChange)
        this.subscribers = []
    }
}
