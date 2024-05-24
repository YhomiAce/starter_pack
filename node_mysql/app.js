const express = require('express');
const mysql = require('mysql');

const app = express();

// create connnection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_db'
});

// connect
conn.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Mysql connected');
    }
})

//create database
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE Node_Db";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Database created')
    })
});

//create table
app.get('/table', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Post table created...')
    })
})


// add post
app.get('/addpost1', (req, res) => {
    const posts = { title: "Post Anime", body: 'This post is about anime' };
    let sql = "INSERT INTO posts SET ?";
    conn.query(sql, posts, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send('Post one added')
    })
});

// addpost
app.get('/addpost2', (req, res) => {
    const title = "Blog Post";
    const body = "This blog post is about manga";
    let sql = "INSERT INTO posts(title,body) VALUES(?,?)";
    conn.query(sql, [title, body], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 2 added...')
    })
});

//select post 
app.get('/posts', (req, res) => {
    let sql = "SELECT * FROM posts";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        const output = result.map(data => {
            return {
                title: data.title,
                body: data.body
            }
        })
        res.send(output)
    })
});

//select single post
app.get('/posts/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

//update post 
app.get('/updatepost/:id', (req, res) => {
    let newTitle = "Updated Post";
    let sql = `UPDATE posts SET title =? WHERE id=${req.params.id}`;
    conn.query(sql, newTitle, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`Post ${req.params.id} updated...`)
    })
});

//delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE from posts WHERE id=${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`Post ${req.params.id} deleted..`)
    })
});

//search database 
app.get('/search', (req, res) => {
    let data = '%post%';
    let sql = 'SELECT * FROM posts WHERE title like ?';
    conn.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        let response = result.map(rest => {
            return {
                id: rest.id,
                title: rest.title
            }
        })
        res.send(response)
    })
});

// check length
app.get('/length', (req, res) => {
    let sql = "SELECT * FROM posts WHERE LENGTH(title) <10";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        let response = result.map(rest => {
            return {
                id: rest.id,
                title: rest.title
            }
        })
        res.send(response)
    })
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = 5000
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})