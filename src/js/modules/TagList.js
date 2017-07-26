export default class TagList {
    constructor (element) {
        this.element = element
    }

    addTag (tag) {
        const li = document.createElement('li')
        li.dataset.tagId = tag._id
        li.innerHTML = tag.label
        this.element.appendChild(li)
    }
}
