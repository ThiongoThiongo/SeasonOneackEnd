
import asyncHandler from "express-async-handler"
import Admin from '../models/adminModel.js';
import generateToken from '../utils/generateToken.js'

// @access public
const authAdmin = async (req,res) => {
      const {username, password} = req.body;
       console.log(username, password)
      const admin = await Admin.findOne({username});
      if(admin && (await admin.matchPassword(password)))
      {
      const token =   generateToken(res,admin._id);

        res.json({
          _id: admin._id,
         username:admin.username,
         phone:admin.phone,
        type: 'Admin', 
        token:token
        });       
      }
      else{
         res.status(401).json({message:'Invalid username or Password'});
                
      }

}

// const changePassword = 
//@access private
const registerAdmin =  async (req, res) => {
    const {username,phone,  password} = req.body
       
           const admin = await Admin.create({ phone, username, password });
           if(admin)
           {
              generateToken(res, admin._id )
              console.log(res.cookie)
              res.status(201).json({_id:admin._id, name:admin.username, phone:admin.phone, token:res.cookie.jwt})     
           }
           else{
              res.status(400)
              throw new Error('Invalid User data')
           }
          
              }
           
const logoutAdmin = asyncHandler((req,res) => {
  console.log('sdsd')
    res.cookie('jwt', '', {
        httpOnly: true,
        expires : new Date (0),
    })
    res.status(200).json({message:'Admin Logged out'})
    
})
const getAdminProfile = asyncHandler((req,res) => {
    res.status(200).json({message:'User Profile'})

})
const updateAdminProfile = asyncHandler(async (req,res) => {
console.log('sdsd')
  const {password, username, phone, id} = req.body;
console.log(password, username, password, id)
    const admin = await Admin.findById(id);
    if(admin) 
    {

           admin.password = password || admin.password;
           admin.username = username || admin.username;
           admin.phone = phone || admin.phone;

            const updatedAdmin = await admin.save();

          if(updatedAdmin)
          {
            const token =   generateToken(res,updatedAdmin._id);

              res.json({ 
                _id: updatedAdmin._id,
                username:updatedAdmin.username,
               phone:updatedAdmin.phone,
        type: 'Admin', 
        token:token
        });       
      }
      else{
         res.status(401).json({message:false});
            
          }
          

      
          
          
          
    }


})


export {
    authAdmin,  logoutAdmin, getAdminProfile, updateAdminProfile, registerAdmin
}
