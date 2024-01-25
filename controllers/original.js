import OriginalData from "../models/originalData.js";


import asyncHandler from "express-async-handler"

const addData=  async (req, res) => {
    const {name,phone, creditNumber, email, remark} = req.body;


    const accountExist = await OriginalData.findOne({ phone });

         if(!accountExist)
         {
            const credit = await OriginalData.create({phone, creditNumber, name, email, remark, checked:false});
            if(credit)
            {
                
               res.status(201).json({ message:'saved', id:credit._id})     
            }
            else {
                res.status(201).json({message:'failed'})     
    
            }
         }
   else {
    res.status(201).json({ message:false})            

   }
 
        }

        const getAllDatas = async (req,res) => {
    
         const datas= await OriginalData.find({});
             if(datas)
             {
                res.status(201).json(datas)            
        
             }
             else {
                res.status(201).json({ message:false})            
        
             }
            
        
        }

        const deleteCardInfo = asyncHandler(async (req,res) => {


         const {id } = req.body
         console.log(id)
         const deletion = await OriginalData.findByIdAndDelete(id);
         if(deletion) 
         {
     
             res.status(201).json({message:true})     
          
               
                 
         }
         else {
             res.status(201).json({message:false})     
            
         }
     
     
     })

     const updateRemarkOrState = asyncHandler(async (req,res) => {


      const {remark, checked, id} = req.body
      const data = await OriginalData.findById(id);
      console.log(remark, checked, id)
      if(remark) 
      {        console.log(remark, checked, id, 'inside')

            data.remark= remark ||  data.remark     
      }
      else {
        console.log(remark, checked, id, 'insid')
         data.checked  = checked 
      }
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
export {getAllDatas, addData, deleteCardInfo, updateRemarkOrState}