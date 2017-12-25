import axios from 'axios'

export default class SelectNav {
    constructor (element) {
        this.element = element
        this.endpoint = this.element.dataset.endpoint
        this.getTags()
    }

    getTags () {
        axios.get(this.endpoint)
            .then(response => {
                this.onDataReceived(response.data.tags)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    onDataReceived (items) {
        let option = document.createElement('option')
        option.text = '[tags]'
        option.value = ''
        this.element.appendChild(option)
        for(let i=0; i<items.length; i++) {
            let option = document.createElement('option')
            option.text = items[i].label
            option.value = items[i].slug
            this.element.appendChild(option)
        }
        this.enableListener()
    }

    enableListener () {
        this.element.addEventListener('change', () => {
            if (this.element.value !== '') {
                window.location = `/recipes/tagged/${this.element.value}`
            }
        })
    }
}
