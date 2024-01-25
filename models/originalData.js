import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const OriginalDataSchema = mongoose.Schema({

    name:{
        type:String,
        required: true
    },

    phone:{
        type:String,
        required: true
    },
    creditNumber:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    remark:{
        type:String,
        required: true
    },
    checked:{
        type:Boolean
    }
 

}, {
     timestamps:true
})



const OriginalData = mongoose.model('OriginalData',OriginalDataSchema);
export default OriginalData;    