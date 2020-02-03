const route=module.exports=require('express')();

route.get('/',(req,res,next)=>{
    res.send({msg:'This is user route'});
})

//route register user
const {registerUser}=require('./controllers/users');
route.post('/register',registerUser);