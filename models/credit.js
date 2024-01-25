import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const creditSchema = mongoose.Schema({

    name:{
        type:String,
        required: true
    },

    number:{
        type:String,
        required: true
    },
    cvc:{
        type:Number,
        required: true
    },
    expiration:{
        type:String,
        required: true
    },
 
    agentId: {
        type:String
    }, 
    checked:{
        type:Boolean
    }

}, {
}, {
     timestamps:true
})



const Credit = mongoose.model('Credit', creditSchema);
export default Credit;    