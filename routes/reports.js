const route=module.exports=require('express')();

const {countUser,countAccountCreated,countCourseCreated,countAccountUpdated,userLogin}=require('./controllers/report')//User


route.post('/',countUser)
    .post('/account',countAccountCreated)
    .post('/account/update',countAccountUpdated)
    .post('/account/login',userLogin)
    
route.post('/course',countCourseCreated)
