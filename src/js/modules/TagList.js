import axios from 'axios'

export default class TagList {
    constructor (element) {
        this.element = element
        this.tags = this.element.querySelectorAll('li')
        this.boundOnDeleteTag = this.onDeleteTag.bind(this)
        for(let i=0; i<this.tags.length; i++) {
            this.tags[i]
                .querySelector('.RecipeTagDelete')
                .addEventListener('click', this.boundOnDeleteTag)
        }
    }

    addTag (tag) {
        // TODO update this to use a compiled pug template
        const li = document.createElement('li')
        li.dataset.tagId = tag._id
        li.innerHTML = tag.label
        this.element.appendChild(li)
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
/*

ul.RecipeTagsList(data-endpoint-root=`${apiRoot}/tags/`)
    each tag in recipe.tags
        li(data-tag-id=tag._id)
            a(href="/recipes/tagged/" + tag.slug)= tag.label
            button(data-tag-id=tag._id).RecipeTagDelete
                span.close

*/
