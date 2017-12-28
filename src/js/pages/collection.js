// import axios from 'axios'
import EditableTextInput from '../modules/EditableTextInput'
import EditableTextarea from '../modules/EditableTextarea'
import AddRecipeForm from '../modules/AddRecipeForm'

const endpoint = document.querySelector('.Collection').dataset.collectionId

// title
new EditableTextInput(document.querySelector('.EditableInputText'), endpoint)

// description
new EditableTextarea(document.querySelector('.EditableTextarea'))

// add recipe
new AddRecipeForm(document.querySelector('.CreateForm'))
