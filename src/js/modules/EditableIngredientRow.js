// import axios from 'axios'
import EditableNumber from './EditableNumber'
import EditableTextInput from './EditableTextInput'
import EditableSelect from './EditableSelect'
import EditableIngredientLabel from './EditableIngredientLabel'
import EditableIngredientAmountUnit from './EditableIngredientAmountUnit'

export default class EditableIngredientRow {
    constructor (element, destroyRow) {
        this.element = element
        this._id = this.element.dataset.ingredientId
        this.onDestroyComplete = destroyRow
        this.initialize()
        return this
    }

    initialize () {
        // Amount Value
        this.amountValue = new EditableNumber(this.element.querySelector('.RecipeIngredientRow-Amount'))

        // Amount Unit
        this.amountUnit = new EditableIngredientAmountUnit(this.element.querySelector('.RecipeIngredientRow-Unit'), this.getUnitIdByLabel.bind(this))

        // Ingredient Type
        this.ingredientType = new EditableSelect(this.element.querySelector('.RecipeIngredientRow-Type'))
        this.ingredientType.subscribeToSaved(this.onTypeSave.bind(this))

        // Ingredient Label
        this.ingredientLabel = new EditableIngredientLabel(this.element.querySelector('.RecipeIngredientRow-Label'), this.getIngredientIdByLabel.bind(this))
        this.ingredientLabel.setIngredientType(this.ingredientType.getValue())

        // Notes
        this.notes = new EditableTextInput(this.element.querySelector('.RecipeIngredientRow-Notes'))

        // Delete button
        this.deleteButton = this.element.querySelector('.RecipeIngredientRow-Delete')
        this.boundOnDelete = this.onDelete.bind(this)
        this.deleteButton.addEventListener('click', this.boundOnDelete)
    }

    getId () {
        return this._id
    }

    onTypeSave () {
        this.ingredientLabel.setIngredientType(this.ingredientType.getValue())
        this.updateIngredientDataList()
    }

    setData (data) {
        this.data = data
        this.updateIngredientDataList()
        this.updateUnitDataList()
    }

    updateIngredientDataList () {
        const list = this.ingredientType.getValue() + 'List'
        this.ingredientLabel.updateDataList(this.data[list])
    }

    getIngredientIdByLabel (label) {
        const items = this.data[this.ingredientType.getValue() + 's']
        for(let i=0; i<items.length; i++) {
            if (items[i].label === label) {
                return items[i]._id
            }
        }
        return null
    }

    updateUnitDataList () {
        this.amountUnit.updateDataList(this.data.UnitsList)
    }

    getUnitIdByLabel (label) {
        const items = this.data.Units
        for(let i=0; i<items.length; i++) {
            if (items[i].label === label) {
                return items[i]._id
            }
        }
        return null
    }

    onDelete (event) {
        event.preventDefault()
        this.destroyComponents()
        this.destroyListeners()
        this.onDestroyComplete(this._id)
    }

    destroyComponents () {
        this.amountValue.destroy()
        this.amountUnit.destroy()
        this.ingredientType.destroy()
        this.ingredientLabel.destroy()
        this.notes.destroy()
    }

    destroyListeners () {
        this.deleteButton.removeEventListener('click', this.boundOnDelete)
    }
}
