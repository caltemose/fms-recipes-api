import axios from 'axios'
import EditableTextInput from './EditableTextInput'
import EditableUrlInput from './EditableUrlInput'
import EditableCheckbox from './EditableCheckbox'
import EditableRecipeDirections from './EditableRecipeDirections'
import EditableDiv from './EditableDiv'
import EditableNumber from './EditableNumber'
import EditableIngredientRow from './EditableIngredientRow'
import Templates from '../templates'

export default class EditableRecipe {
    constructor (element) {
        this.element = element
        this.recipe = {
            _id: element.dataset.recipeId
        }

        // Recipe Title, Source Name
        const editableTextInputs = this.element.querySelectorAll('.EditableInputText')
        for(let i=0; i<editableTextInputs.length; i++) {
            new EditableTextInput(editableTextInputs[i])
        }

        // Core, Active
        const editableCheckboxes = this.element.querySelectorAll('.EditableCheckbox')
        for(let i=0; i<editableCheckboxes.length; i++) {
            new EditableCheckbox(editableCheckboxes[i])
        }

        // Directions
        const directions = this.element.querySelector('.RecipeDirections')
        new EditableRecipeDirections(directions)

        // Notes, Yield Label
        const editableDivs = this.element.querySelectorAll('.EditableDiv')
        for(let i=0; i<editableDivs.length; i++) {
            new EditableDiv(editableDivs[i])
        }

        // Yield Amount
        const numbers = this.element.querySelectorAll('.EditableNumber')
        for(let i=0; i<numbers.length; i++) {
            new EditableNumber(numbers[i])
        }

        // Source URL
        const editableUrlInputs = this.element.querySelectorAll('.EditableUrlInput')
        for(let i=0; i<editableUrlInputs.length; i++) {
            new EditableUrlInput(editableUrlInputs[i])
        }

        // Ingredient list
        this.ingredientListElement = this.element.querySelector('.RecipeIngredients')

        // Ingredient rows
        const ingredientRows = this.element.querySelectorAll('.RecipeIngredientRow')
        this.ingredientRows = []
        for(let i=0; i<ingredientRows.length; i++) {
            this.ingredientRows.push(new EditableIngredientRow(ingredientRows[i]))
        }

        // Add Ingredient button
        const addIngredientButton = this.element.querySelector('.RecipeIngredients-Add')
        addIngredientButton.addEventListener('click', this.addIngredient.bind(this))

        this.data = {}
        this.getIngredients()
    }

    getIngredients () {
        axios.get('/api/ingredients')
            .then(response => {
                this.onIngredientsReceived(response.data.ingredients)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    onIngredientsReceived (ingredients) {
        this.data.Ingredients = ingredients
        this.data.IngredientList = this.data.Ingredients.map(ingredient => ingredient.label)
        this.getRecipes()
    }

    getRecipes () {
        axios.get('/api/recipes')
            .then(response => {
                this.onRecipesReceived(response.data.recipes)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    onRecipesReceived (recipes) {
        this.data.Recipes = recipes
        this.data.RecipeList = this.data.Recipes.map(recipe => recipe.label)
        this.getUnits()
    }

    getUnits () {
        axios.get('/api/units')
            .then(response => {
                this.onUnitsReceived(response.data.units)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    onUnitsReceived (units) {
        this.data.Units = units
        this.data.UnitsList = units.map(unit => unit.label)
        this.ingredientRows.forEach(row => {
            row.setData(this.data)
        })
    }

    addIngredient (event) {
        event.preventDefault()

        const endpoint = `/api/recipes/${this.recipe._id}/ingredient/`

        axios.post(endpoint)
            .then(response => {
                this.onIngredientAdded(response.data)
            })
            .catch(err => {
                console.error(err)
                alert(err)
            })
    }

    onIngredientAdded (doc) {
        const endpoint = `/api/recipes/${this.recipe._id}/ingredient/${doc._id}`

        let ing = Object.assign({}, doc)
        ing.amount.unit = {
            label: '',
            _id: ''
        }
        ing.item = {
            label: '',
            _id: ''
        }
        const data = {
            ingredient: ing,
            endpoint
        }

        const compiled = Templates.editableIngredientRow(data)
        this.ingredientListElement.innerHTML += compiled
        const items = this.element.querySelectorAll('.RecipeIngredientRow')
        const indx = items.length -1
        const newRow = new EditableIngredientRow(items[indx])
        newRow.setData(this.data)
        this.ingredientRows.push(newRow)
    }
}
