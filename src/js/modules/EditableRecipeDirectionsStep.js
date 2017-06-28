import axios from 'axios'
import EditableTextArea from './EditableTextArea'

export default class EditableRecipeDirectionsStep {
    constructor (element, endpoint) {
        this.element = element
        this.endpoint = endpoint
        const textarea = this.element.querySelector('.EditableTextArea')
        if (textarea) {
            new EditableTextArea(textarea, this.endpoint)
        }
    }
}
