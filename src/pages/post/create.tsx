import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addPost } from '../../actions/action';
import '../post/style.css';
import { useNavigate } from "react-router-dom";

import { Button, TextField } from '@mui/material';
import axios from 'axios';

interface AddPostProps {
  dispatch: Dispatch<any>
}

const CreatePost = (props: AddPostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('jwt');
    if (!authToken) {
      navigate('/auth/login');
    };
  })

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!title.trim() || !content.trim) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/post', { title: title, content: content });
      console.log('Data created:', response.data);
      props.dispatch(addPost(response.data));
    } catch (error) {
      console.error('Error creating data:', error);
    }
    setTitle('');
    setContent('');
    navigate('/post/list');
  }

  return (
    <div>
      <div className='container' style={{ width: '500px'}}>
        <h2>Create Post</h2>
        <form style={{ display: 'contents'}} onSubmit={handleSubmit}>
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="Title"
            className='custom-textfield'
            onChange={e => setTitle(e.target.value)}
            value={title}
            style={{ maxWidth: '800px' }}
            required
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            type="text"
            variant='outlined'
            color='secondary'
            label="Content"
            onChange={e => setContent(e.target.value)}
            value={content}
            className='custom-textfield'
            required
            fullWidth
            multiline
            rows={8}
            sx={{ mb: 4 }}
          />
          <Button variant="outlined" color="secondary" type="submit">Create</Button>
        </form>
      </div>
    </div>
  )
}

export default connect()(CreatePost)