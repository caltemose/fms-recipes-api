import axios from 'axios'

export default class EditableIngredientAmountUnit {
    constructor (element, getUnitIdByLabel) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.getUnitIdByLabel = getUnitIdByLabel

        this.labelElement = this.element.querySelector('input[name="unitLabel"')
        this.idElement = this.element.querySelector('input[name="unitId"]')
        this.boundOnLabelChange = this.onLabelChange.bind(this)
        this.labelElement.addEventListener('change', this.onLabelChange.bind(this))
        
        this.label = this.getLabel()
        return this
    }

    getLabel () {
        return this.labelElement.value
    }

    onLabelChange () {
        const newLabel = this.getLabel()
        if (this.label !== newLabel) {
            const newId = this.getUnitIdByLabel(newLabel)
            // save only if the label has a maching id (e.g. it's in the database)
            if (newId !== null) {
                this.idElement.value = newId
                this.save()
            } else {
                alert('unsaved: unknown unit label')
            }
        }
    }

    updateDataList (list) {
        if (!this.input) {
            this.input = new Awesomplete(this.labelElement, { list })
        } else {
            this.input.list = list
        }
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

        const data = {
            value: this.idElement.value
        }

        axios.put(this.endpoint, data)
            .then(() => {
                this.label = this.getLabel()
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    destroy () {
        if (this.input) this.input.destroy()
        this.labelElement.removeEventListener('change', this.onLabelChange.bind(this))
    }
}
