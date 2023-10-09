import React, { Dispatch, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import '../post/style.css';
import { Box } from '@mui/system';
import { Grid, Link, ListSubheader, Button } from '@mui/material';
import { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { connect } from "react-redux";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } from '../../actions/action';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const PostList = (props: { posts: any[], dispatch: Dispatch<any> }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('jwt');

  const handleDetail = (id: number) => {
    navigate(`/post/detail/${id}`);
  }

  useEffect(() => {
    if (!authToken) {
      navigate('/auth/login');
    };
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
    };
    props.dispatch(fetchPostsRequest());
    axios
      .get('http://localhost:3000/post/', config)
      .then((response) => {
        if (!response) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then((post) => {
        console.log('success post', post?.data)
        props.dispatch(fetchPostsSuccess(post?.data));
      })
      .catch((error) => {
        console.log('errrrr', error.response)
        props.dispatch(fetchPostsFailure(error));
      });
  }, [props.dispatch]);

  return (
    <div>
      <div className="App">
        <List sx={{ width: '100%', bgcolor: 'background.paper', display: 'contents' }}>
          {props.posts.length && props.posts.map(i => (
            <div key={i._id}>
              <ListItem
                alignItems="flex-start" onClick={() => handleDetail(i.id)} style={{ cursor: 'pointer' }}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={require('../../static/images/rainbow.png')} />
                </ListItemAvatar>
                <ListItemText
                  className="list-item"
                  primary={i.title}
                  secondary={<React.Fragment>
                    <span className='list-item'>{i.content}</span>
                  </React.Fragment>
                  } />
                <Chip label="Angular" size="small" />
              </ListItem>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { data: [] }) => {
  return {
    posts: state.data ? state.data : []
  }
}

export default connect(mapStateToProps)(PostList)