import SelectNav from '../modules/SelectNav'

const selectNavs = document.querySelectorAll('.SelectNav')
for(let i=0; i<selectNavs.length; i++) {
    console.log(selectNavs[i])
    new SelectNav(selectNavs[i])
}
