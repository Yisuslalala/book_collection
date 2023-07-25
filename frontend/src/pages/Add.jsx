import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
        price: null,
    });
    
    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate();

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    // console.log(book);

    return (
        <div className='form'>
            <h1>Add New Book</h1>
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
                type="text" 
                placeholder='cover' 
                onChange={handleChange} 
                name='cover'/>
            <input 
                type="number" 
                placeholder='price'     
                onChange={handleChange} 
                name='price'
            />
            <button onClick={handleClick}>Add Book</button>
        </div>
    );
};


export default Add;