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
    const bookId = req.params.book_id;
    // console.log(bookId);
    const q = "DELETE FROM books WHERE book_id = ?";
    db.query(q, [bookId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Book has been deleted");
        }
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.book_id;
    const q = "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE book_id = ?";
    const title = req.body.title;
    const description = req.body.description;
    const cover = req.body.cover;
    const price = req.body.price;
    
    db.query(q, [title, description, cover, price, bookId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Book updated successfully");
        }
    });
});

app.listen(8000, () => {
    console.log("Connected to backend in port 8000")
});

