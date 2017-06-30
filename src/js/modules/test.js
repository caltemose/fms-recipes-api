// const Test = {
//     helper: function helper() {
//         return 'helper'
//     },

//     test: function () {
//         console.log('test', helper())
//     }
// }

const Test = (function () {

    function test () {
        return 'test ' + helper()
    }

    function helper () {
        return 'helper'
    }

    return {
        test: test
    }
})()

export default Test
