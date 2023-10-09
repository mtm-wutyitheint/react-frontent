/* eslint-disable jsx-a11y/img-redundant-alt */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import BackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch, useEffect } from 'react';
import { fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } from '../../actions/action';
import axios from 'axios';
import { connect } from 'react-redux';

const PostDetail = (props: { posts: any, dispatch: Dispatch<any> }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const params = { id: id };
  const imageUrl = '../../static/images/rainbow.png';

  useEffect(() => {
    const authToken = localStorage.getItem('jwt');
    if (!authToken) {
      navigate('/auth/login');
    };
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', // You can add other headers as needed
      },
      params: params
    };
    props.dispatch(fetchPostsRequest());
    axios
      .get('http://localhost:3000/post', config)
      .then((res) => {
        if (!res) {
          throw new Error('Network response was not ok!')
        }
        return res;
      })
      .then((post) => {
        props.dispatch(fetchPostsSuccess(post?.data));
      })
      .catch((err) => {
        props.dispatch(fetchPostsFailure(err));
      });
  }, [props.dispatch]);

  const handleBack = () => {
    navigate('/post/list');
  }
  return (
    <div>
      <div className='container'>
        <div className='data-show'>
          <img className='detail-img' src={require('../../static/images/rainbow.png')} alt="Description of the image" />
          <h2>{props.posts?.title}</h2>
          <p>{props.posts?.content}</p>
        </div>
      </div>
    </div>


  );
}

const mapStateToProps = (state: { data: {} }) => {
  console.log('sttttttttttttttt', state)
  return {
    posts: state.data ? state.data : {}
  }
}

export default connect(mapStateToProps)(PostDetail)