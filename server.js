const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

// Read .env file
require('dotenv').config()

//
app.use(express.static('public'))

const PORT = process.env.PORT || 2121

// DB configuration
let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'counter',
    collection = 'data'

// DB Connection
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${client.options.dbName} Database`)
        //console.log(client)
        db = client.db(dbName)
    }).catch(error => {
        console.log(error);
    })

//Using EJS for views
app.set("view engine", "ejs");

// 
app.get('/', async (req, res) => {
    if (await db.collection(collection).countDocuments()){
        count = await db.collection(collection).findOne();
        count = count.data;
    }else{
        count = 0;
    }
    res.render('index.ejs', {count: count});
})

// Increment the counter or create it if it doesn't exist
app.post('/add', (req, res) =>{
    db.collection(collection).update({ _id: 1 }, {
            $inc: { 'data': 1 }
        },{ 
            upsert: true 
        })
        .then(result => {
            console.log('Count increased')
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

//
app.put('/decreaseCount',async (req, res) => {
    if (await db.collection(collection).countDocuments()){
        count = await db.collection(collection).findOne();
        count = count.data;
        if (count > 0){
            db.collection(collection).update({ _id: 1 }, {
                $inc: { 'data': -1 }
            },{ 
                upsert: false
            })
            .then(result => {
                res.status(200);
                res.json('Count decreased');
                console.log('Count decreased');
            })
            .catch(error => console.error(error))
        }
    }
})


app.delete('/resetCount', async (req, res) => {
    db.collection(collection).deleteOne({_id: 1})
    .then(result => {
        console.log('Counter Deleted')
        res.status(200);
        res.json('Counter reset')
    })
    .catch(error => console.error(error))
})

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})