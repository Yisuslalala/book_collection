import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from "axios";
import {Link} from "react-router-dom";
import "../styles/Books.css";


const Books = () => {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await Axios.get("http://localhost:8000/books");
                // console.log(res);
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, []);

    const handleDelete = (book_id) => {
        console.log(book_id);
        Axios.delete(`http://localhost:8000/delete/${book_id}`);
    };

    
    return (
        <div>
            <h1>Book Collection</h1>
            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.book_id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <div className='information'>
                            <h2>{book.title}</h2>
                            <p>{book.description}</p>
                            <span>${book.price}</span>
                        </div>
                        <button 
                            className='delete' 
                            onClick={ () => {
                                handleDelete(book.book_id) 
                            }}
                        >
                            Delete
                        </button>
                        <button className="update"><Link to={`/update/${book.book_id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <div>
                <button className='newBtn'><Link to="/add">Add book</Link></button>
            </div>
        </div>
    )
}

export default Books;