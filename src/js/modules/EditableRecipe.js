import EditableTextInput from './EditableTextInput'
import EditableUrlInput from './EditableUrlInput'
import EditableCheckbox from './EditableCheckbox'
import EditableRecipeDirections from './EditableRecipeDirections'
import EditableDiv from './EditableDiv'

export default class EditableRecipe {
    constructor (element) {
        this.element = element
        this.recipe = {
            _id: element.dataset.recipeId
        }

        // Editable Recipe Title
        const titleInput = this.element.querySelector('.RecipeTitle').querySelector('input')
        new EditableTextInput(titleInput)

        // Editable URL Inputs (Source Link)
        const editableUrlInputs = this.element.querySelectorAll('.EditableUrlInput')
        for(let i=0; i<editableUrlInputs.length; i++) {
            new EditableUrlInput(editableUrlInputs[i])
        }

        // Editable Checkboxes (core, active)
        const editableCheckboxes = this.element.querySelectorAll('.EditableCheckbox')
        for(let i=0; i<editableCheckboxes.length; i++) {
            new EditableCheckbox(editableCheckboxes[i])
        }

        // Editable Direction Steps
        const directions = this.element.querySelector('.RecipeDirections')
        new EditableRecipeDirections(directions)

        // Editable Notes (EditableDiv)
        const notes = this.element.querySelector('.EditableDiv')
        new EditableDiv(notes)
    }
}
