import axios from 'axios'
import EditableNumber from './EditableNumber'
import EditableTextInput from './EditableTextInput'
import EditableSelect from './EditableSelect'
import EditableIngredientLabel from './EditableIngredientLabel'

export default class EditableIngredientRow {
    constructor (element) {
        this.element = element
        this.initialize()
        return this
    }

    initialize () {
        // Amount Value
        new EditableNumber(this.element.querySelector('.RecipeIngredientRow-Amount'))

        // Amount Unit
        new EditableTextInput(this.element.querySelector('.RecipeIngredientRow-Unit'))

        // Ingredient Type
        this.ingredientType = new EditableSelect(this.element.querySelector('.RecipeIngredientRow-Type'))
        this.ingredientType.subscribeToSaved(this.onTypeSave.bind(this))

        // Ingredient Label
        this.ingredientLabel = new EditableIngredientLabel(this.element.querySelector('.RecipeIngredientRow-Label'), this.getIngredientIdByLabel.bind(this))
        this.ingredientLabel.setIngredientType(this.ingredientType.getValue())

        // Notes
        new EditableTextInput(this.element.querySelector('.RecipeIngredientRow-Notes'))
    }

    onTypeSave () {
        this.ingredientLabel.setIngredientType(this.ingredientType.getValue())
        this.updateIngredientDataList()
    }

    setData (data) {
        this.data = data
        this.updateIngredientDataList()
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

}
