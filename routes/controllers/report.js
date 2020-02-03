
const user=require('/Users/phamh/Desktop/Project/Project_NCKH/db/models/user');
const course=require('/Users/phamh/Desktop/Project/Project_NCKH/db/models/course');

//Account User
exports.countUser=user.getQuantity;
exports.countAccountCreated=user.CountAcountHaveCreated;
exports.countAccountUpdated=user.CountAccountHaveUpdated;
exports.userLogin=user.userLogin;

//Course
exports.countCourseCreated=course.CountCourseHaveCreated;


exports.test=user.test;