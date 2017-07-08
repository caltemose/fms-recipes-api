import axios from 'axios'

export default class EditableIngredientLabel {
    constructor (element, getIngredientIdByLabel) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.getIngredientIdByLabel = getIngredientIdByLabel
        this.initialize()
        return this
    }

    initialize () {
        this.labelElement = this.element.querySelector('input[name="ingredientLabel"')
        this.idElement = this.element.querySelector('input[name="ingredientId"]')
        this.labelElement.addEventListener('change', this.onLabelChange.bind(this))
        this.value = this.labelElement.value
    }

    onLabelChange (event) {
        const newValue = this.labelElement.value
        if (this.value !== newValue) {
            const newId = this.getIngredientIdByLabel(newValue)
            this.idElement.value = newId
            this.save()
        }
    }

    updateDataList (list) {
        if (!this.input) {
            this.input = new Awesomplete(this.labelElement, { list })
        } else {
            this.input.list = list
        }
    }

    setIngredientType (type) {
        this.ingredientType = type
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

        const data = {
            label: this.labelElement.value,
            id: this.idElement.value
        }
        axios.post(this.endpoint, data)
            .then(response => {
                this.value = this.element.value
                // this.subscribers.forEach(subscriber => subscriber())
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
