/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
let mongodb = require('mongodb')
let mongoose = require('mongoose')
const {router} = require("express/lib/application");

module.exports = function (app) {
    let uri = 'mongodb+srv://goldmoon321123:' + process.env.PW + '@cluster0.ro6c6or.mongodb.net/personal-library?retryWrites=true&w=majority&appName=Cluster0'
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    let bookSchema = new mongoose.Schema({
        title: {type: String, required: true},
        comments: {type: [String]}
    })
    let Book = mongoose.model('Book', bookSchema)

    app.route('/api/books')
        .get(async function (req, res) {
            try {
                const books = await Book.find({});
                const formattedBooks = books.map(book => ({
                    _id: book._id,
                    title: book.title,
                    commentcount: book.comments.length
                }));
                res.json(formattedBooks);
            } catch (err) {
                res.status(500).send('server error');
            }
            //response will be array of book objects
            //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        })

        .post(async function (req, res) {
            console.log('reached post')
            let title = req.body.title;
            if (!title) {
                return res.send('missing required field title')
            }
            let newBook = new Book({title});

            try {
                const savedBook = await newBook.save();
                console.log('saved');
                res.json({
                    _id: savedBook._id,
                    title: savedBook.title
                    // comments: savedBook.comments,
                    // commentcount: savedBook.commentcount
                });
            } catch (err) {
                res.status(500).send('could not save');
            }
        })

        .delete(async function (req, res) {
            //if successful response will be 'complete delete successful'
            try {
                const deleted = await Book.deleteMany();
                // console.log('deleted')
                res.send('complete delete successful')
            } catch (e) {
                res.send('error')
            }
        });


    app.route('/api/books/:id')
        .get(async function (req, res) {
            let bookid = req.params.id;
            let arrayOfBooks = []
            try {
                const book = await Book.findById(bookid)
                if (!book) {
                    return res.send('no book exists')
                }
                res.json({
                    _id: bookid, title: book.title, comments: book.comments, commentcount: book.comments.length
                });
            } catch (err) {
                return res.send('no book exists');
            }
            //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        })

        .post(async function (req, res) {
            //json res format same as .get
            let bookid = req.params.id;
            let comment = req.body.comment;
            if (!comment) {
                return res.send('missing required field comment')
            }
            try {
                let book = await Book.findById(bookid)
                book.comments.push(comment)
                book = await book.save();
                res.json({
                    _id: book._id,
                    title: book.title,
                    comments: book.comments,
                    commentcount: book.comments.length
                });
            } catch (err) {
                res.send('no book exists')
            }
        })

        .delete(async function (req, res) {
            let bookid = req.params.id;
            try {
                const deleted = await Book.findByIdAndDelete(bookid)
                if (!deleted) throw new Error('no book exists')
                //if successful response will be 'delete successful'
                res.send('delete successful')
            } catch (err) {
                res.send('no book exists')
            }

        });

};
