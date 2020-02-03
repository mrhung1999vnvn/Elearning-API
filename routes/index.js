const app=require('express')();

/* GET rout default */
app.get('/', function(req, res, next) {
  res.send({msg:'server is up and running!!!'});
});


app.use('/auth',require('./auth'));
app.use('/user',require('./users'));
app.use('/task',require('./task'));
app.use('/report',require('./reports'))
app.use('/project',require('./projects'));



// All route
app.all('*',(req,res)=>{
  res.status(404).send({msg:'not found'});
})
module.exports=app;
