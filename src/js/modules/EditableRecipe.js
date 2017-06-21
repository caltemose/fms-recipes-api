import EditableTextInput from './EditableTextInput'

export default class EditableRecipe {
    constructor (element) {
        this.element = element
        this.recipe = {
            _id: element.dataset.recipeId
        }
        console.log('EditableRecipe :: constructor :: ', this.recipe._id)

        const editableTextInputs = this.element.querySelectorAll('.EditableInputText')
        this.editableTextInputs = []

        for(let i=0; i<editableTextInputs.length; i++) {
            this.editableTextInputs.push(new EditableTextInput(editableTextInputs[i]))
        }
    }
}
