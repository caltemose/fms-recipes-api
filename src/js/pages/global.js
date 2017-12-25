import SelectNav from '../modules/SelectNav'

const selectNavs = document.querySelectorAll('.SelectNav')
for(let i=0; i<selectNavs.length; i++) {
    new SelectNav(selectNavs[i])
}
