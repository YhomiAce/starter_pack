var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to DB

mongoose.connect('mongodb+srv://admin:admin@todo-65vtm.mongodb.net/todo?retryWrites=true&w=majority');

// create database Schema

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var item1 = Todo({
//     item: 'Learn React'
// }).save(err => {
//     if (err) throw err;
//     console.log('Item saved');
// });



var urlencodedParser = bodyParser.urlencoded({ extended: false });

// var data = [{ item: 'Learn React' }, { item: 'Learn Node' }, { item: 'Learn Angular' }, { item: 'Learn Vue' }]

module.exports = function(app) {

    app.get('/todo', (req, res) => {
        // Get all the data in the database
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data });
        });

    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get the todos from the form field submitted and save to db
        var newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data)
            console.log('Item saved');
        });

    });

    app.delete('/todo/:item', (req, res) => {

        // find a todo from the database and delete it
        Todo({ item: req.params.item }).remove((err, data) => {
            if (err) throw err;
            res.json(data);
            console.log('Todo Deleted');
        });
        // data = data.filter((todo) => {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
}