import axios from 'axios'
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
            new EditableRecipeDirectionsStep(this.steps[i], this.endpoint)
        }

        return this
    }

    onAddStep (event) {
        event.preventDefault()

        axios.put(this.endpoint)
            .then(response => {
                this.onStepAdded(response.data.doc._id)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    onStepAdded (id) {
        const li = document.createElement('li')
        li.classList.add('RecipeDirections-Step')
        li.contentEditable = true
        li.dataset.stepId = id
        this.list.appendChild(li)
        
        this.steps.push(li)
        
        new EditableRecipeDirectionsStep(li, this.endpoint)
    }
}
