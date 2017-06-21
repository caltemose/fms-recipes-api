import EditableTextInput from './EditableTextInput'
import EditableUrlInput from './EditableUrlInput'

export default class EditableRecipe {
    constructor (element) {
        this.element = element
        this.recipe = {
            _id: element.dataset.recipeId
        }

        // const editableTextInputs = this.element.querySelectorAll('.EditableInputText')
        // for(let i=0; i<editableTextInputs.length; i++) {
        //     new EditableTextInput(editableTextInputs[i])
        // }

        // recipe.label (title) editable input
        const titleInput = this.element.querySelector('.Recipe-Title').querySelector('input')
        new EditableTextInput(titleInput)

        const editableUrlInputs = this.element.querySelectorAll('.EditableUrlInput')
        for(let i=0; i<editableUrlInputs.length; i++) {
            new EditableUrlInput(editableUrlInputs[i])
        }
    }
}
