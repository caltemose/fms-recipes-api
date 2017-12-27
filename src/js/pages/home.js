import CreateForm from '../modules/CreateForm'

const createForms = document.querySelectorAll('.CreateForm')
for(let i=0; i<createForms.length; i++) {
    new CreateForm(createForms[i])
}
