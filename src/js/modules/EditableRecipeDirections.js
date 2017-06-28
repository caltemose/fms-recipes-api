import axios from 'axios'
import EditableTextArea from './EditableTextArea'
import EditableRecipeDirectionsStep from './EditableRecipeDirectionsStep'

export default class EditableRecipeDirections {
    constructor (element) {
        this.element = element
        this.endpoint = element.dataset.endpoint
        this.list = this.element.querySelector('.RecipeDirections-List')
        this.addStep = this.element.querySelector('.RecipeDirections-Add')

        this.addStep.addEventListener('click', this.onAddStep.bind(this))

        // Editable Direction Steps (list items)
        this.steps = [].slice.call(this.list.querySelectorAll('.RecipeDirections-Step'))
        if (this.steps.length < 1) {
            this.steps = []
        }
        for(let i=0; i<this.steps.length; i++) {
            new EditableRecipeDirectionsStep(this.steps[i], this.endpoint + '/' + i)
        }

        return this
    }

    onAddStep (event) {
        const li = document.createElement('li')
        li.classList.add('RecipeDirections-Step')
        const textarea = document.createElement('textarea')
        textarea.classList.add('EditableTextArea')
        li.appendChild(textarea)
        this.list.appendChild(li)
        const numSteps = this.steps.push(li)
        new EditableRecipeDirectionsStep(li, this.endpoint + '/' + (numSteps -1))
    }
}
