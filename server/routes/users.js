const express = require("express");
const router = express.Router();
const db = require("../util/db");

//get all users (even admins)
router.get('/', (req, res) => {
    const all_users_sql = 'Select * from user';
    db.query(all_users_sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    })
});

//ToDo: Check if email already exists
//create a user
router.post('/', (req, res) => {
    const add_user_sql = 'Insert into user (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(add_user_sql, [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.role], (err, data) => {
        if(err) return res.json({error: err});
        res.send({msg: 'User created'});
    })
})

//get a user by their id
router.get('/:id', (req, res) => {
    const user_by_id_sql = `Select * from user where id = ${req.params.id}`;
    db.query(user_by_id_sql, (err, data) => {
        if(err) throw err;
        res.send(data);
    })
})

//update a user
router.patch('/:id', (req, res) => {
    const update_user_sql = `Update user set ? where id = ${req.params.id}`;
    db.query(update_user_sql, req.body, (err) => {
        if(err) throw err;
        res.send({msg: 'User updated'});
    })
})

//delete a user
router.delete('/:id', (req, res) => {
    const delete_user_sql = `Delete from user where id = ${req.params.id}`;
    db.query(delete_user_sql, (err) => {
        if(err) throw err;
        res.send({msg: 'User deleted'});
    })
})

module.exports = router;