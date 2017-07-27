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

    onFocus () {
        this.value = this.element.value
        this.element.removeAttribute('readonly')
    }

    onBlur () {
        if (this.value !== this.element.value) {
            this.save()
        }
        this.element.setAttribute('readonly', true)
    }

    onInputSave (err) {
        if (err) console.error(err)
        else {
            console.log('url saved', this.urlInput.getValue())
            this.anchor.setAttribute('href', this.urlInput.getValue())
        }
    }
}
