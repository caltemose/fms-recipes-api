import axios from 'axios'

export default class AddRecipeForm {
    constructor (element) {
        this.element = element
        this.id = this.element.dataset.id
        this.input = this.element.querySelector('input[name="recipeToAdd"]')
        this.list = document.querySelector(this.element.dataset.listSelector)
        this.button = this.element.querySelector('button')
        this.button.addEventListener('click', this.addNew.bind(this))

        const recipeEndpoint = this.element.dataset.recipeEndpoint

        axios.get(recipeEndpoint)
            .then(result => {
                this.recipes = result.data.recipes
                const list = result.data.recipes.map(recipe => recipe.label)
                this.awesomplete = new Awesomplete(this.input, { list })
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
        
        return this
    }

    getRecipeId (label) {
        for(let i=0; i<this.recipes.length; i++) {
            if (this.recipes[i].label === label) {
                return this.recipes[i]._id
            }
        }
        return null
    }

    addNew (event) {
        event.preventDefault()

        const recipeLabel = this.input.value
        const recipeId = this.getRecipeId(recipeLabel)
        const listItems = this.list.querySelectorAll('li')
        const order = listItems.length + 1

        // add recipe to collection.recipes
        const collectionEndpoint = this.element.dataset.collectionEndpoint
        axios.post(collectionEndpoint, { id: this.id, recipeId, order })
            .then(() => {
                this.input.value = ''
                this.input.focus()

                // add recipe to DOM element
                let li = document.createElement('li')
                li.setAttribute('data-id', recipeId)
                let anchor = document.createElement('a')
                let text = document.createTextNode(recipeLabel)
                anchor.appendChild(text)
                anchor.setAttribute('href', `/recipes/${recipeId}`)
                li.appendChild(anchor)
                this.list.appendChild(li)
            })
            .catch((err) => {
                console.error(err)
                alert(err)
            })

    }
}

