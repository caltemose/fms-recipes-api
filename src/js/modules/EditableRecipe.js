import EditableTextInput from './EditableTextInput'
import EditableUrlInput from './EditableUrlInput'
import EditableCheckbox from './EditableCheckbox'
import EditableRecipeDirections from './EditableRecipeDirections'
import EditableDiv from './EditableDiv'
import EditableNumber from './EditableNumber'

export default class EditableRecipe {
    constructor (element) {
        this.element = element
        this.recipe = {
            _id: element.dataset.recipeId
        }

        // Recipe Title, Source Name
        const editableTextInputs = this.element.querySelectorAll('.EditableInputText')
        for(let i=0; i<editableTextInputs.length; i++) {
            new EditableTextInput(editableTextInputs[i])
        }

        // Core, Active
        const editableCheckboxes = this.element.querySelectorAll('.EditableCheckbox')
        for(let i=0; i<editableCheckboxes.length; i++) {
            new EditableCheckbox(editableCheckboxes[i])
        }

        // Directions
        const directions = this.element.querySelector('.RecipeDirections')
        new EditableRecipeDirections(directions)

        // Notes, Yield Label
        const editableDivs = this.element.querySelectorAll('.EditableDiv')
        for(let i=0; i<editableDivs.length; i++) {
            new EditableDiv(editableDivs[i])
        }

        // Yield Amount
        const numbers = this.element.querySelectorAll('.EditableNumber')
        for(let i=0; i<numbers.length; i++) {
            new EditableNumber(numbers[i])
        }

        // Source URL
        const editableUrlInputs = this.element.querySelectorAll('.EditableUrlInput')
        for(let i=0; i<editableUrlInputs.length; i++) {
            new EditableUrlInput(editableUrlInputs[i])
        }
    }
}
