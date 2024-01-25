
import asyncHandler from "express-async-handler"
import Supervisor from "../models/supervisor.js";
import generateToken from '../utils/generateToken.js'

// @access public
const authSupervisor = async (req,res) => {
      const {username, password} = req.body;

      const supervisor = await Supervisor.findOne({username});
      if(supervisor  && (await supervisor.matchPassword(password)))
      {
        let token = generateToken(res, supervisor._id )
        res.status(201).json({_id:supervisor._id, name:supervisor.username, token:token})        
      }
      else{
         res.status(401).json({message:'Invalid username'});
                
      }

}

//get all agents 
const getAllSupervisor = async (req,res) => {
   
    const supervisor= await Supervisor.find({});
     if(supervisor)
     {
        res.status(201).json({data:supervisor, message:true})            

     }
     else {
        res.status(201).json({ message:false})            

     }
    

}


// const changePassword = 
//@access private
const registerSupervisor=  async (req, res) => {
    const {username,  password} = req.body
    console.log(username, password)
             
        const supervisorExist = await Supervisor.findOne({ username });
       if(!supervisorExist)
       {
        const supervisor = await Supervisor.create({ username, password });
        if(supervisor)
        {
           res.status(201).json({message:true, supervisor:supervisor})     
        }
        else {
            res.status(201).json({message:false})     

        }
        
       
       }
       else{
        res.status(201).json({message:'user exist'})     
        }
              }
           
const logoutSupervisor = asyncHandler((req,res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires : new Date (0),
    })
    res.status(200).json({message:'User Logged out'})
    
})



const deleteSupervisorProfile = asyncHandler(async (req,res) => {


    const {id } = req.body
    const deletion = await Supervisor.findByIdAndDelete(id);
    if(deletion) 
    {

        res.status(201).json({message:true})     
     
          
            
    }
    else {
        res.status(201).json({message:false})     
       
    }


})


export {
    authSupervisor,  logoutSupervisor, registerSupervisor
, deleteSupervisorProfile, getAllSupervisor}
