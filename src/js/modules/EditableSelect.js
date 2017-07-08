import axios from 'axios'

export default class EditableSelect {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.value
        this.element.addEventListener('change', this.onChange.bind(this))
        this.subscribers = []

        return this
    }

    onChange (event) {
        if (this.value !== this.element.value) {
            this.save()
        }
    }

    save () {
        const data = {
            value: this.element.value
        }

        axios.post(this.endpoint, data)
            .then(response => {
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
}
