const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const singUp = new Schema({
    firstName:{
        type:String,
        require:[true,'First Name required']
    },
    lastName:{
        type:String,
        require:[true,'Last Name required']
    },
    loginName:{
        type:String,
        require:[true,'Login Name required']
    },
    password:{
        type:String,
        require:[true,'Password required']
    },
    gender:{
        type:String,
        require:[true,'Gender required']
    },
    dob:{
        type:String,
        require:[true,'Date of Birth required']
    },
    phoneNumber:{
        type:Number,
        require:[true,'Phone Number required']
    }

});
 const singUpModel = mongoose.model('users',singUp);
 module.exports = singUpModel;