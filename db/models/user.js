const sql = require('../db');
var bcrypt = require('bcryptjs');

//constructor
const User = (customer) => {
    this.number = customer.number;
}


var RenderQuantity = (from, to) => {
    return new Promise((resolve, reject) => {
        sql.query('CALL CountUser(' + from + ',' + to + ')', (err, result) => {
            if (!err) {
                return resolve(result);
            }
            return reject(err);
        });
    })
}

User.userLogin = (req, res) => {
    console.log(req.body.name);
    return new Promise((resolve, reject) => {
        var query = "SELECT user.username, user.firstname, user.lastname, user.email,user.password from mdl_user user where username='" + req.body.name + "'";
        sql.query(query, (err, result) => {
            if (!err) {
                return resolve(result);
            }
            return reject(err);
        });
    })
        .then((user) => {
            console.log();
            const result = bcrypt.compareSync(req.body.password, user[0].password)
            if (result) {
                res.send(user);
            }
            else res.send(null);
        })
        .catch(errr => console.log(errr))
}

//Goi ham lay so luong dang nhap cua user    -7h de chuyen VN Sang GMT
//Date format mm/DD/yyyy
User.getQuantity = (req, res) => {

    var test = new Date(req.body.dateFrom + ' 6:00:00 GMT+7').toUTCString().toString();


    var from6AM = Date.parse(new Date(req.body.dateFrom + ' 06:00:00 GMT+7').toUTCString()).toString().slice(0, 10);
    var to9AM = Date.parse(new Date(req.body.dateTo + ' 09:00:00 GMT+7').toUTCString()).toString().slice(0, 10);


    var from9AM = Date.parse(new Date(req.body.dateFrom + ' 09:00:00 GMT+7').toUTCString()).toString().slice(0, 10);
    var to12PM = Date.parse(new Date(req.body.dateTo + ' 12:00:00 GMT+7').toUTCString()).toString().slice(0, 10);

    var from12PM = Date.parse(new Date(req.body.dateFrom + ' 12:00:00 GMT+7').toUTCString()).toString().slice(0, 10);
    var to3PM = Date.parse(new Date(req.body.dateTo + ' 15:00:00 GMT+7').toUTCString()).toString().slice(0, 10);

    var from3PM = Date.parse(new Date(req.body.dateFrom + ' 15:00:00 GMT+7').toUTCString()).toString().slice(0, 10);
    var to6PM = Date.parse(new Date(req.body.dateTo + ' 18:00:00 GMT+7').toUTCString()).toString().slice(0, 10);

    var from6PM = Date.parse(new Date(req.body.dateFrom + ' 18:00:00 GMT+7').toUTCString()).toString().slice(0, 10);
    var to9PM = Date.parse(new Date(req.body.dateTo + ' 21:00:00 GMT+7').toUTCString()).toString().slice(0, 10);


    var from9PM = Date.parse(new Date(req.body.dateFrom + ' 21:00:00 GMT+7').toUTCString()).toString().slice(0, 10);
    var to12AM = Date.parse(new Date(req.body.dateTo + ' 00:00:00 GMT+7').toUTCString()).toString().slice(0, 10);

    // console.log(from6AM);

    return Promise.all([
        RenderQuantity(from6AM, to9AM),
        RenderQuantity(from9AM, to12PM),
        RenderQuantity(from12PM, to3PM),
        RenderQuantity(from3PM, to6PM),
        RenderQuantity(from6PM, to9PM),
        RenderQuantity(from9PM, to12AM),
    ])
        .then((ressult) => res.send(JSON.stringify(ressult[0])))
        .catch(err => console.log(err))
}


User.CountAcountHaveCreated = (req, res) => {
    return new Promise((resolve, reject) => {
        sql.query('CALL CountUserCreated(' + req.body.year + ')', (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
        .then((ress) => console.log("Month " + ress[0][0].Month + ": " + ress[0][0].Count + " user"))
        .catch(errs => console.error(errs))
}

User.CountAccountHaveUpdated = (req, res) => {
    return new Promise((resolve, reject) => {
        sql.query('CALL CountUserUpdate(' + req.body.year + ')', (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
        .then((ress) => res.send("Month " + ress[0][0].Month + ": " + ress[0][0].Count + " user update"))
        .catch(errs => console.error(errs))
}




//Test thoi
User.test = (req, res) => {
    sql.query('CALL test()', (err, result) => {
        if (!err) {
            res.send(result);
        }
        res.send(err);
    });
}

module.exports = User;