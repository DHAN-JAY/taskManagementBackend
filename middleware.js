const jwt = require('jsonwebtoken');
const db = require('./database');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    //const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    })
}

exports.adminManagerRestriction = (req, res, next) => {
  try {
    const user = req.user;
    const query = "SELECT role FROM accounts WHERE id = ?;";
    const params = [user.details[0].id];

    db.query(query, params, (err, result) => {
      if(err) throw err;
      if(result[0].role.toUpperCase() === "ADMIN" || result[0].role.toUpperCase() === "MANAGER"){
        next();
      }else{
        res.status(400).json({
          status: "FAILED",
          message: "Restricted to only Admins and Managers"
        })
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "FAILED",
      message: e
    });
  }
}

exports.adminRestrict = (req, res, next) => {
  try {
    const user = req.user;
    const query = "SELECT role FROM accounts WHERE id = ?;";
    const params = [user.details[0].id];

    db.query(query, params, (err, result) => {
      if(err) throw err;
      if(result[0].role.toUpperCase() === "ADMIN"){
        next();
      }else{
        res.status(400).json({
          status: "FAILED",
          message: "Restricted to only Admins"
        })
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "FAILED",
      message: e
    })
  }
}

exports.managerRestrict = (req, res, next) => {
  try {
    const user = req.user;
    const query = "SELECT role FROM accounts WHERE id = ?;";
    const params = [user.details[0].id];

    db.query(query, params, (err, result) => {
      if(err) throw err;
      if(result[0].role.toUpperCase() === "MANAGER"){
        next();
      }else{
        res.status(400).json({
          status: "FAILED",
          message: "Restricted to only Managers"
        })
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "FAILED",
      message: e
    })
  }
}