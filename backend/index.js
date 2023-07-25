import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "yisus",
    password: "1235",
    database: "book_collection"
});

app.get("/", (req, res) => {
    res.json("Hello");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/books", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const cover = req.body.cover;
    const price = req.body.price;
    // console.log(title, description, cover);
    const q = "INSERT INTO books (title, description, cover, price) VALUES(?, ?, ?, ?)"
    db.query(q, [title, description, cover, price], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE book_id = ?";
    db.query(q, [bookId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            return res.json("Book has been deleted");
        }
    });
});

/*
app.delete("/delete_book/:book_id", (res, req) => {
    const id = req.params.id;
    q = "DELETE FROM books WHERE book_id = ?";
    db.query(q, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(result);
        }
    });
});
*/

app.listen(8000, () => {
    console.log("Connected to backend in port 8000")
});

