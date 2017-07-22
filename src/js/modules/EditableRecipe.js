import axios from 'axios'
import EditableTextInput from './EditableTextInput'
import EditableUrlInput from './EditableUrlInput'
import EditableCheckbox from './EditableCheckbox'
import EditableRecipeDirections from './EditableRecipeDirections'
import EditableDiv from './EditableDiv'
import EditableNumber from './EditableNumber'
import EditableIngredientRow from './EditableIngredientRow'

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

        // Ingredient rows
        const ingredientRows = this.element.querySelectorAll('.RecipeIngredientRow')
        this.ingredientRows = []
        for(let i=0; i<ingredientRows.length; i++) {
            this.ingredientRows.push(new EditableIngredientRow(ingredientRows[i]))
        }

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
}
