import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const agentSchema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }, 
    start: {
        type:String,

    },
    end: {
        type:String
    }

}, {
     timestamps:true
})


agentSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
           next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})


agentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const Agent = mongoose.model('Agent',agentSchema);
export default Agent;    