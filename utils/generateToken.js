import jwt from 'jsonwebtoken';


const generateToken = (res, adminId) => {

    const token = jwt.sign({ adminId },'abc123',  {expiresIn:'1d'})
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // Use secure cookies in production
        sameSite: 'none', // Prevent CSRF attacks
        maxAge: 1 * 24 * 60 * 60 * 1000, // 30 days
      });
    
return token;
}

export default  generateToken

