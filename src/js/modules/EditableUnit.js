import axios from 'axios'

export default class EditableUnit {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.value = this.element.value
        this.element.addEventListener('focus', this.onFocus.bind(this))
        this.element.addEventListener('blur', this.onBlur.bind(this))
        return this
    }

    updateDataList (list) {
        list = list.map(item => item.label)
        
        if (!this.input) {
            this.input = new Awesomplete(this.element, { list })
        } else {
            this.input.list = list
        }
    }

    onFocus (event) {
        this.element.removeAttribute('readonly')
    }

    onBlur (event) {
        this.element.setAttribute('readonly', true)
        if (this.value !== this.element.innerHTML) {
            this.save()
        }
    }

    save () {
        if (!this.endpoint || this.endpoint === '') {
            return
        }

        const data = {
            value: this.element.value
        }
        axios.post(this.endpoint, data)
            .then(response => {
                this.value = this.element.value
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
