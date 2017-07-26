// import axios from 'axios'
import AddTagForm from './AddTagForm'
import TagList from './TagList'

export default class RecipeTags {
    constructor (element) {
        this.element = element

        // add tag form
        this.addTagForm = new AddTagForm(this.element.querySelector('.RecipeTagsAdd'))
        this.addTagForm.subscribeToSaved(this.onTagAdded.bind(this))

        // tag list
        this.tagList = new TagList(this.element.querySelector('.RecipeTagsList'))
    }

    onTagAdded (tag) {
        // add the new tag to the tag list
        this.tagList.addTag(tag)
    }
}
