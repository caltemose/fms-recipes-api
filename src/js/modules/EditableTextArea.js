import axios from 'axios'

export default class EditableTextArea {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.value
        this.element.addEventListener('focus', this.onFocus.bind(this))
        this.element.addEventListener('blur', this.onBlur.bind(this))
        this.subscribers = []

        return this
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
