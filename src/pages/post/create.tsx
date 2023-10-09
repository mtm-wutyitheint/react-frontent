import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addPost } from '../../actions/action';
import '../post/style.css';
import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Button, TextField } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
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

  const handleBack = () => {
    navigate('/post/list');
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='app-bar'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleBack}
            >
              <BackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Create Post
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='container'>
        <h2>Create Post</h2>
        <form style={{ display: 'contents' }} onSubmit={handleSubmit}>
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