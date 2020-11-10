const db = require('../database');

exports.createTask = (req, res) => {
    try {
        
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            message: e
        });
    }
}