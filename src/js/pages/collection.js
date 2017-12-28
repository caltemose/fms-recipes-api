import axios from 'axios'
import Sortable from 'sortablejs'

import EditableTextInput from '../modules/EditableTextInput'
import EditableTextarea from '../modules/EditableTextarea'
import AddRecipeForm from '../modules/AddRecipeForm'

const collectionId = document.querySelector('.Collection').dataset.collectionId

// title
new EditableTextInput(document.querySelector('.EditableInputText'))

// description
new EditableTextarea(document.querySelector('.EditableTextarea'))

// add recipe
new AddRecipeForm(document.querySelector('.CreateForm'))

// sortable recipes
const list = document.querySelector('.CollectionRecipes')
new Sortable(list, {
    onUpdate: (event) => {
        const list = event.srcElement
        const listItems = list.querySelectorAll('li')
        const recipes = []
        for(let i=0; i<listItems.length; i++) {
            recipes.push({ 
                item: listItems[i].dataset.id,
                order: i+1
            })
        }
        axios.put(`/api/collections/${collectionId}/recipes`, { recipes })
            .then(() => {
                console.log('recipes saved to collection')
            })
            .catch((err) => {
                console.error(err)
                alert('recipes not saved to collection.')
            })
    }
})
