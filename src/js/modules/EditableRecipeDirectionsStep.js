import axios from 'axios'

export default class EditableRecipeDirectionsStep {
    constructor (element, endpoint) {
        this.element = element
        this.endpoint = endpoint
        this.value = this.element.innerHTML
        this.element.addEventListener('blur', this.onBlur.bind(this))
        return this
    }

    onBlur () {
        if (this.value !== this.element.innerHTML) {
            this.save()
            // console.log('saving', this.element.innerHTML, this.endpoint)
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
                // this.subscribers.forEach(subscriber => subscriber())
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
