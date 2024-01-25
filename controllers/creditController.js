import Credit from '../models/credit.js';

import asyncHandler from "express-async-handler"

 const getAllDatas = async (req,res) => {
    
         const datas= await Credit.find({});
             if(datas)
             {
                res.status(201).json(datas)            
        
             }
             else {
                res.status(201).json({ message:false})            
        
             }
            
        
        }


const addCredit =  async (req, res) => {
    const {number,expiration, cvc, name, agentId} = req.body;

       if(!agentId || agentId === ' '){
             agentId = ' '
       }
    
        const credit = await Credit.create({ name, number,expiration, cvc, agentId, checked:false});
        if(credit)
        {
            
           res.status(201).json({name:credit.name, message:'saved'})     
        }
        else {
            res.status(201).json({message:'failed'})     

        }
 
        }
        const updateCredit= asyncHandler(async (req,res) => {


         const { checked, id} = req.body
         const data = await Credit.findById(id);
     
          data.checked  = checked 
         
         const updated = await data.save();
     
         if(updated)
         {
           res.status(200).json({message:true 
           })
         }
     
       else {
           res.status(200).json({message:false
           }) 
       }
     
     })

export { addCredit, getAllDatas, updateCredit}
            