const db = require('../database');

const getTaskDetails = taskId => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM tasks WHERE id = ?;";
        const params = [taskId];

        db.query(query, params, (err, result) => {
            if(err){
                reject(err);
            }else{
                resolve({
                    taskId: result[0].id,
                    taskName: result[0].taskName,
                    taskDesc: result[0].taskDesc,
                    status: result[0].status ? 'Completed' : 'In Progress',
                    assignedDeveloper: result[0].assignedDeveloper,
                    createdDate: result[0].created,
                    modifiedDate: result[0].modified
                });
            }
        })
    })
}

exports.createTask = (req, res) => {
    try {
        let userObj = req.user;
        let taskName = req.body.taskName;
        let taskDesc = req.body.taskDesc;
        let projectId = req.body.projectId * 1;
        let assignedDeveloper = req.body.assignedDeveloper;

        const query = "INSERT INTO tasks(managerId, projectId, taskName, taskDesc, status, assignedDeveloper) VALUES (?,?,?,?,?);";
        const params = [userObj.details[0].id, projectId, taskName, taskDesc, 0, assignedDeveloper];

        db.query(query, params,async (err, result) => {
            if(err) throw err;

            let taskDetails = await getTaskDetails(result.insertId);

            res.status(200).json(taskDetails);
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            message: e
        });
    }
}

exports.updateTaskStatus = (req, res) => {
    try {
        let taskId = req.body.taskId;
        let taskStatus = req.body.taskStatus;

        if(taskStatus.toUpperCase() === "IN PROGRESS"){
            taskStatus = 0;
        }else if(taskStatus.toUpperCase() === "COMPLETED"){
            taskStatus = 1;
        }else{
            res.status(400).json({
                status: "FAILED",
                message: "Invalid task status"
            })
        }

        const query = "UPDATE tasks SET status = ? WHERE id = ?;";
        const params = [taskStatus, taskId];

        db.query(query, params,async (err, result) => {
            if(err) throw err;

            let taskDetails = await getTaskDetails(taskId);

            res.status(200).json(taskDetails);
        })

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "FAILED",
            message: e
        })
    }
}

exports.getAllTasks = (req, res) => {
    try {
        let user = req.user;
        let query, params = [], filter = '';
        let projectId = req.body.projectId;

        if(user.details[0].role.toUpperCase() === "ADMIN"){
            query = "SELECT id as taskId,taskName, taskDesc, status, created, modified FROM tasks WHERE isDeleted = 0";
            params = [];
        }else if(user.details[0].role.toUpperCase() === "MANAGER"){
            query = "SELECT id as taskId,taskName, taskDesc, status, created, modified FROM tasks WHERE isDeleted = 0 AND managerId = ?";
            params = [user.details[0].id];
        }else if(user.details[0].role.toUpperCase() === "DEVELOPER"){
            query = "SELECT id as taskId,taskName, taskDesc, status, created, modified FROM tasks WHERE isDeleted = 0 AND assignedDeveloper = ?";
            params = [user.details[0].id];
        }

        if(typeof projectId !== "undefined"){
            filter = " AND projectId = ?";
            query = `${query}${filter}`;
            params.push(projectId);
        }

        console.log(query, params);

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