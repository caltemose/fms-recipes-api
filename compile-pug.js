const pug = require('pug')
const path = require('path')
const fs = require('fs')
const camelcase = require('camelcase')

// TODO bulletproof this, possibly add subdirectory crawling
const templates = fs.readdirSync('views/shared/')

let compiled = 'const Templates = (function() {'
let returnString = 'return {'

function convertPugRefs (str) {
    let fixed = str.replace(/pug\.rethrow/gi, 'pug_rethrow')
    fixed = str.replace(/pug\.escape/gi, 'pug_escape')
    return fixed
}

templates.forEach((template, index) => {
    const templateName = camelcase( path.basename(template, '.pug') )
    const opts = {
        name: templateName,
        inlineRuntimeFunctions: false
    }
    compiled += convertPugRefs(pug.compileFileClient('views/shared/' + template, opts))
    returnString += templateName + ':' + templateName
    if (index < templates.length-1) {
        returnString += ','
    }
})

compiled += pug.compileClient('h1= ignore', {inlineRuntimeFunctions: true, name: "ignore"})

returnString += '}'

compiled += returnString + '})()\nexport default Templates'

fs.writeFileSync('src/js/templates.js', compiled)
