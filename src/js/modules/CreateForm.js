import axios from 'axios'

export default class CreateForm {
    constructor (element) {
        this.element = element
        this.input = this.element.querySelector('input')
        this.button = this.element.querySelector('button')
        this.button.addEventListener('click', this.addNew.bind(this))
    }

    addNew (event) {
        event.preventDefault()

        const label = this.input.value
        const alertName = this.element.dataset.alertName
        const endpoint = this.element.dataset.endpoint
        const redirect = this.element.dataset.redirect

        if (!label || label.length < 2) {
            alert(`Cannot add ${alertName} with a name fewer than 2 characters`)
            return
        }

        axios.post(endpoint, { label })
            .then((result) => {
                const id = result.data.doc._id
                window.location.href = `${redirect}${id}`
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })
    }
}
