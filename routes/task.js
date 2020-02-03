const route=module.exports=require('express')();

route.get('/',(req,res,next)=>{
    res.send({msg:'This is task route'});
})