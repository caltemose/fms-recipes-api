import axios from 'axios'

export default class EditableRecipeDirectionsStep {
    constructor (element, endpoint) {
        this.element = element
        this.endpoint = endpoint + '/' + this.element.dataset.stepId
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
        axios.put(this.endpoint, data)
            .then(() => {
                this.value = this.element.innerHTML
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
