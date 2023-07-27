import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                // console.log(res);
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            // console.log(book.book_id);
            await axios.delete(`http://localhost:8000/books/${id}`);
            // console.log(res);
            // console.log(id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    
    return (
        <div>
            <h1>Book Collection</h1>
            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.book_id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>${book.price}</span>
                        <button className='delete' onClick={ () => handleDelete(book.book_id) }>Delete</button>
                        <button className="update"><Link to={`/update/${book.book_id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <div>
                <button><Link to="/add">Add new book</Link></button>
            </div>
        </div>
    )
}

export default Books;