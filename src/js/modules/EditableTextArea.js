import axios from 'axios'

export default class EditableTextarea {
    constructor (element, endpoint) {
        this.element = element
        this.endpoint = endpoint ? endpoint : this.element.dataset.endpoint
        this.value = this.element.value
        this.element.addEventListener('focus', this.onFocus.bind(this))
        this.element.addEventListener('blur', this.onBlur.bind(this))
        this.subscribers = []

        return this
    }

    onFocus () {
        this.value = this.element.value
        // this.element.removeAttribute('readonly')
    }

    onBlur () {
        if (this.value !== this.element.value) {
            this.save()
        }
        // this.element.setAttribute('readonly', true)
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

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
}
