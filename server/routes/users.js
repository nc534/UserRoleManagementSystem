const express = require("express");
const router = express.Router();
const db = require("../util/db");

//login
router.post('/login', (req, res) => {
    const login_user_sql = 'Select id, role from user where email = ? and password = ?';
    db.query(login_user_sql, [req.body.email, req.body.password], (err, data) => {
        if(err) throw err;

        if(JSON.stringify(data) == '[]') {
            res.status(404).json({msg: "User with that email & password does not exist"})
        }else{
            res.json(data)
        }
        
    })
})

//get all users (even admins)
router.get('/', (req, res) => {
    const all_users_sql = 'Select * from user';
    db.query(all_users_sql, (err, data) => {
        if(err) throw err;
        res.json(data);
    })
});

//create a user (also used for register)
router.post('/', (req, res) => {
    const email_exists_sql = 'Select email from user where email = ?';
    const add_user_sql = 'Insert into user (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(email_exists_sql, req.body.email, (err, data) => {
        if(err) throw err;
        if(JSON.stringify(data) !== '[]') {
            res.status(409).send({msg: "User with the email already exists"})
        }else{
            db.query(add_user_sql, [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.role], (err, data) => {
                if(err) return res.json({error: err});
                res.status(201).send({msg: 'User created'});
            })
        }
    })

})

//get a user by their id
router.get('/:id', (req, res) => {
    const user_by_id_sql = `Select * from user where id = ${req.params.id}`;
    db.query(user_by_id_sql, (err, data) => {
        if(err) throw err;
        res.json(data);
    })
})

router.get('/email/:email', (req, res) => {
    const user_by_email_sql = `Select * from user where email = '${req.params.email}'`;
    var query = db.query(user_by_email_sql, (err, data) => {
        if(err) throw err;
        res.json(data);
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