const sql=require('../db');


//contructor
const Course=(id,name,createAt)=>{
    this.id=id;
    this.name=name;
    this.createAt=createAt;
}

Course.CountCourseHaveCreated=(req,res)=>{
    return new Promise((resolve,reject)=>{
        sql.query('CALL CountCourseCreated('+req.body.year+')',(err,result)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    })
    .then(data=>{
        console.log(data);
    })
    .catch(errs=>console.error(errs));
}

module.exports=Course;