
import asyncHandler from "express-async-handler"
import Agent from '../models/agentModel.js';
import generateToken from '../utils/generateToken.js'

// @access public
const authAgent = async (req,res) => {
      const {username, password} = req.body;

      const agent = await Agent.findOne({username});
      if(agent && (await agent.matchPassword(password)))
      {
        let token = generateToken(res, agent._id )
        res.status(201).json({_id:agent._id,start:agent.start, end:agent.end, name:agent.username, token:token})        
      }
      else{
         res.status(401).json({message:'Invalid username'});
                
      }

}

//get all agents 
const getAllAgents = async (req,res) => {
   
    const agents= await Agent.find({});
     if(agents)
     {
        res.status(201).json({data:agents, message:true})            

     }
     else {
        res.status(201).json({ message:false})            

     }
    

}


// const changePassword = 
//@access private
const registerAgent =  async (req, res) => {
    const {username,  password} = req.body

     console.log(username, password)         
        const agentExists = await Agent.findOne({ username });
       if(!agentExists)
       {
        const agent = await Agent.create({ username, password, start:'', end:'' });
        if(agent)
        {
            console.log(agent)
           res.status(201).json({message:true, agent:agent})     
        }
        else {
            res.status(201).json({message:false})     

        }
        
       
       }
       else{
        res.status(201).json({message:'user exist'})     
        }
              }
           
const logoutAgent = asyncHandler((req,res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires : new Date (0),
    })
    res.status(200).json({message:'User Logged out'})
    
})
const getAgentProfile = asyncHandler((req,res) => {
    res.status(200).json({message:'User Profile'})

})
const updateAgentProfile = asyncHandler(async (req,res) => {


    const {agentId, username, password, start, end} = req.body
    const agent = await Agent.findById(agentId);
    console.log(start, end, agentId)
    if(agent) 
    {

           agent.password = password || agent.password
           agent.username = username || agent.username
        if(start == '' || !start )
        {
 agent.start = agent.start
 agent.end = agent.end
        }
        else {
            if(start === -1)
            {
             agent.start = ''
             agent.end = ''
 
            }
            else {
             agent.start = start.toString() || agent.start
 
             agent.end = end.toString() ||agent.end
  
            }
 
        }

            const updatedAgent = await agent.save();
  
          if(updatedAgent)
          {
            res.status(200).json({message:true 
            })
          }

        else {
            res.status(200).json({message:false
            }) 
        }
          
          
    }


})

const deleteAgentProfile = asyncHandler(async (req,res) => {


    const {id } = req.body
    const deletion = await Agent.findByIdAndDelete(id);
    if(deletion) 
    {

        res.status(201).json({message:true})     
     
          
            
    }
    else {
        res.status(201).json({message:false})     
       
    }


})


export {
    authAgent,  logoutAgent, getAgentProfile, updateAgentProfile, registerAgent
, deleteAgentProfile, getAllAgents}
