const Counter = require('../models/Counter');

module.exports = {

    // Render landing page
    getIndex: async (req, res) => {
        try{
            if (await Counter.countDocuments()){
                count = await Counter.findOne();
                count = count.data;
            }else{
                count = 0;
            }
            res.status(200);
            res.render('index.ejs', {count: count});
        }catch(error){
            console.error(error);
        }
    },

    // Increment the counter or create it if it doesn't exist
    addCounter: async (req, res) =>{
        try{
            const result = await Counter.findOneAndUpdate({ _id: 1 }, {
                    $inc: { 'data': 1 }
                },{ 
                    upsert: true 
                });
            console.log('Count increased');
            res.status(200);
            res.redirect('/');
        }catch(error){
            console.error(error)
        }
    },

    // Decrease the counter, if it has a value bigger than 0
    decreaseCounter: async (req, res) => {
        try{
            if (await Counter.countDocuments()){
                count = await Counter.findOne();
                count = count.data;
                if (count > 0){
                    await Counter.findOneAndUpdate({ _id: 1 }, {
                        $inc: { 'data': -1 }
                    },{ 
                        upsert: false
                    });
                    res.status(200);
                    res.json('Count decreased');
                    console.log('Count decreased');
                }
            }
        }catch(error){
            console.error(error);
        }
    },

    // To reset the counter, delete it from the DB
    resetCounter: async (req, res) => {
        try{
            let result = await Counter.deleteOne({ _id: 1 });
            console.log('Counter Deleted');
            res.status(200);
            res.json('Counter reset');
        }catch(error){
            console.error(error);
        }
    }
}