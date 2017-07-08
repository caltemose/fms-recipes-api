const loadJsonFile = require('load-json-file')
const config = require('../config/config')
const MongoClient = require('mongodb').MongoClient

function insertJson (json) {
    MongoClient.connect(config.dbHost + config.db, (err, db) => {
        if (err) {
            reject(err)
        }

        const units = json.units.map(unit => { 
            return { label: unit }
        })

        const collection = db.collection('units')
        collection.insertMany(units, (err, res) => {
            db.close()

            if (err) {
                console.log(err)
            }

            console.log(units.length + ' items inserted into database')
        })
    })
}

loadJsonFile('./units.json')
    .then(result => insertJson(result))
    .catch(error => { console.log(error) })
