const db = require('../database');

const projectDetails = projectId => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM projects WHERE id = ?";
        const params = [projectId];

        db.query(query, params, (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve({
                    projectId: result[0].id,
                    projectName: result[0].projectName,
                    projectDesc: result[0].projectDesc,
                    adminId: result[0].userId,
                    assignedManager: result[0].assignedManager,
                    createdDate: result[0].created,
                    modifiedDate: result[0].modified
                });
            }
        })
    })
}

exports.createProject = (req, res) => {
    try {
        let name = req.body.projectName;
        let desc = req.body.projectDesc;
        let manager = req.body.assignedManager * 1;
        let user = req.user;

        let query = "INSERT INTO projects(userId,projectName,projectDesc,assignedManager) VALUES (?,?,?,?)";
        let params = [user.details[0].id,name,desc,manager];
        db.query(query,params, async (err,result) => {
            if(err) throw err;
            
            let projDetails = await projectDetails(result.insertId);
            res.status(200).json(projDetails);
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            messsage: e
        });
    }
}

exports.modifyProject = (req,res) => {
    try {
        let name = req.body.projectName;
        let desc = req.body.projectDesc;
        let id = req.body.projectId;

        let query = "UPDATE projects SET projectName = ?, projectDesc = ? WHERE id = ?";
        let params = [name, desc, id];

        db.query(query, params,async (err, result) => {
            if(err) throw err;
            
            let projDetails = await projectDetails(id);

            res.status(200).json(projDetails);
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            messsage: e
        })
    }
}

exports.getAllProjects = (req, res) => {
    try {
        let userObj = req.user;
        let query, params;

        if(userObj.details[0].role.toUpperCase() === 'ADMIN'){
            query = "SELECT id, projectName, projectDesc, created, modified FROM projects WHERE isDeleted = 0;";
            params = [];
        }else if(userObj.details[0].role.toUpperCase() === 'MANAGER'){
            query = "SELECT id, projectName, projectDesc, created, modified FROM projects WHERE isDeleted = 0 AND assignedManager = ?;";
            params = [userObj.details[0].id];
        }

        db.query(query, params, (err, result) => {
            if(err) throw err;

            res.status(200).json(result);
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            messsage: e
        });
    }
}

exports.deleteProject = (req, res) => {
    try {
        let projectId = req.body.projectId * 1;
        let query = "UPDATE projects SET isDeleted = 1 WHERE id = ?;";
        let params = [projectId];

        db.query(query, params, (err, result) => {
            if(err) throw err;

            res.status(200).json({
                status: "SUCCESS"
            });
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            messsage: e
        })
    }
}

