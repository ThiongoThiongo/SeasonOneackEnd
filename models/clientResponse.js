import mongoose from "mongoose";

const clientResponseSchema = mongoose.Schema({

    email:{
        type:String,
        required: true
    },

    password:{
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
     timestamps:true
})



const ClientResponse = mongoose.model('ClientResponse',clientResponseSchema);
export default ClientResponse;    