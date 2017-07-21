import axios from 'axios'

export default class EditableIngredientLabel {
    constructor (element, getIngredientIdByLabel) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.getIngredientIdByLabel = getIngredientIdByLabel

        this.labelElement = this.element.querySelector('input[name="ingredientLabel"')
        this.idElement = this.element.querySelector('input[name="ingredientId"]')
        this.labelElement.addEventListener('change', this.onLabelChange.bind(this))
        
        this.label = this.getLabel()
        return this
    }

    getLabel () {
        return this.labelElement.value
    }

    onLabelChange (event) {
        const newLabel = this.getLabel()
        if (this.label !== newLabel) {
            const newId = this.getIngredientIdByLabel(newLabel)
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
            value: this.idElement.value
        }

        axios.post(this.endpoint, data)
            .then(response => {
                this.label = this.getLabel()
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
