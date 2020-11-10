const bcrypt = require('bcrypt');
const db = require('../database');
const jwt = require('jsonwebtoken');

const fetchUserDetails = email => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT password,id,role,email,userName FROM accounts WHERE email like ?';
        const params = [email];

        db.query(query,params, (err, res) => {
            if(err){
                reject(err);
            }else{
                resolve(res);
            } 
        })
    })
}

const checkEmailExists = email => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS cnt FROM accounts WHERE email like ?';
        const params = [email];

        db.query(query, params, (err, res) => {
            if(err){
                reject(err);
            }else{
                resolve(res[0].cnt);
            }
        })
    })
}

exports.getAllUsers = (req, res) => {
    try {
        const query = 'SELECT id,userName,email,role FROM accounts;';
        db.query(query,[], (err, result) => {
            if(err) throw err;
            res.status(200).json({
                status: "PASSED",
                data:result
            })
        })
    } catch (e) {
        res.status(400).json({
            status: "FAILED",
            message: e
        });
    }
}

exports.signup = async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const username = req.body.username;
        const role = req.body.role;
        const email = req.body.email;

        const query = 'INSERT INTO accounts(userName,email,role,password) VALUES (?,?,?,?)';
        const params = [username,email,role,hashedPass];

        db.query(query,params, (err, result) => {
            if(err){
                if(err.code === "ER_DUP_ENTRY"){
                    return res.status(400).json({
                        status: "FAILED",
                        message: "Account already exists"
                    });
                }else{
                    return res.status(400).json({
                        status: "FAILED",
                        message: "DATABASE ERROR, please contact admin"
                    });
                }
            }
            res.status(200).json({
                username: username,
                email: email,
                role: role,
                id: result.insertId
            });
        })

    } catch (e) {
        console.log('ERROR ---------------',e);
    }
}

exports.login = async (req, res) => {
    try {
        let user = await checkEmailExists(req.body.email);
        if(user){
            let details = await fetchUserDetails(req.body.email);
            if(await bcrypt.compare(req.body.password, details[0].password)){
                delete details[0].password;
                let accessToken = jwt.sign({details}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2 days' });
                res.status(200).json({
                    accessToken: accessToken,
                    username: details[0].userName,
                    id: details[0].id,
                    email: details[0].email,
                    role: details[0].role
                });
            }else{
                res.status(400).json({
                    status: "FAILED",
                    message: "Wrong Password"
                })
            }
        }else{
            res.status(404).json({
                status: "FAILED",
                message: "USER NOT FOUND"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status:"FAILED",
            message: e
        })
    }
}

exports.getAllManagers = (req, res) => {
    try {
         const query = "SELECT id,userName,email,role FROM accounts WHERE UPPER(role) like 'MANAGER';";
         const params = [];

         db.query(query, params, (err, result) => {
             if(err) throw err;

             res.status(200).json(result);
         })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            message: e
        })
    }
}