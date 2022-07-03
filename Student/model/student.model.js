const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
first_name: {type:'string'},
last_name: {type:'string'},
email: {type:'string'},
password: {type:'string'}
},
    {
        collection: 'students'
    }

);

module.exports = mongoose.model('StudentSchema', studentSchema);