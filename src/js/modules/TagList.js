import axios from 'axios'
import Templates from '../templates'

export default class TagList {
    constructor (element) {
        this.element = element

        this.boundOnDeleteTag = this.onDeleteTag.bind(this)
        this.tags = [ ...this.element.querySelectorAll('li') ]
        for(let i=0; i<this.tags.length; i++) {
            this.activateDeleteButton(this.tags[i])
        }
    }

    addTag (tag) {
        const compiled = Templates.recipeTagItem({ tag })
        const compiledFrag = document.createRange().createContextualFragment(compiled)
        this.element.appendChild(compiledFrag)
        this.tags = [ ...this.element.querySelectorAll('li') ]
        const li = this.tags[this.tags.length-1]
        this.activateDeleteButton(li)
    }

    activateDeleteButton (li) {
        li
            .querySelector('.RecipeTagDelete')
            .addEventListener('click', this.boundOnDeleteTag)
    }

    onDeleteTag (event) {
        const tagId = event.target.dataset.tagId
        const endpoint = this.element.dataset.endpointRoot + tagId

        axios.delete(endpoint)
            .then(result => {
                for(let i=0; i<this.tags.length; i++) {
                    if (this.tags[i].dataset.tagId === tagId) {
                        // remove the listener from the delete button
                        this.tags[i]
                            .querySelector('.RecipeTagDelete')
                            .removeEventListener('click', this.boundOnDeleteTag)
                        // delete the <li>
                        this.tags[i].remove()
                        break
                    }
                }
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }
}
