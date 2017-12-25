// import axios from 'axios'
import EditableTextInput from './EditableTextInput'

export default class EditableUrlInput {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.url = this.element.dataset.url
        this.anchor = this.element.querySelector('a')

        const urlInput = this.element.querySelector('input')
        this.urlInput = new EditableTextInput(urlInput)
        this.urlInput.subscribeToSaved(this.onInputSave.bind(this))

        return this
    }

    onInputSave (err) {
        if (err) console.error(err)
        else {
            this.anchor.setAttribute('href', this.urlInput.getValue())
        }
    }
}
