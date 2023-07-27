import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
        price: null,
    });

    const [error, setError] = useState(false);
    
    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };
    // console.log(book);

    return (
        <div className='form'>
            <h1>Update the Book</h1>
            <input 
                type="text" 
                placeholder='Title' 
                onChange={handleChange} 
                name='title'
            />
            <input 
                type="text" 
                placeholder='Description' 
                onChange={handleChange} 
                name='description'
            />
            <input 
                type="number" 
                placeholder='price'     
                onChange={handleChange} 
                name='price'
            />
            <input 
                type="text" 
                placeholder='cover' 
                onChange={handleChange} 
                name='cover'/>
            <button onClick={handleClick} className='formButton'>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};


export default Update;