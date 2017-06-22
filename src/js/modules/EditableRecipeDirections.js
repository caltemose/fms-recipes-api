import axios from 'axios'

export default class EditableRecipeDirections {
    constructor (element) {
        this.element = element
        this.endpoint = element.dataset.endpoint
        this.list = this.element.querySelector('.RecipeDirections-List')
        this.addStep = this.element.querySelector('.RecipeDirections-Add')
        console.log(this.element, this.addStep)
        this.addStep.addEventListener('click', this.onAddStep.bind(this))

        // Editable Direction Steps (list items)
        // const steps = this.list.querySelectorAll('.EditableTextArea')
        // for(let i=0; i<steps.length; i++) {
        //     new EditableTextArea(steps[i])
        // }

        return this
    }

    onAddStep (event) {
        const li = document.createElement('li')
        const textarea = document.createElement('textarea')
        textarea.setAttribute('data-endpoint', this.endpoint)
        textarea.classList.add('.EditableTextArea')
        li.appendChild(textarea)
        this.list.appendChild(li)
        // new EditableTextArea(textarea)
    }
}
/*
li
    textarea.EditableTextArea(data-endpoint=endpoint)= direction
*/
