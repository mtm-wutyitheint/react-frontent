import { Button, TextField, Card, CardContent, Avatar } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login/style.css'
import LockOpenIcon from '@mui/icons-material/LockOpen';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('-------------------', email, password);
    if (!email.trim() || !password.trim()) {
      return;
    }
    try {
      const response: any = await axios.post('http://localhost:3000/auth/login',
        { email: email, password: password });
      console.log('Data created:', response.data);

      localStorage.setItem('jwt', response.data.access_token);
      navigate('/post/list');
    } catch (err) {
      console.error(err);
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='container'>
      <Card  sx={{ minWidth: 500 }}>
        <CardContent className='card'>
        <Avatar>
            <LockOpenIcon />
          </Avatar>
          <h2>Login</h2>
          <form style={{ display: 'contents' }} onSubmit={handleSubmit}>
            <TextField
              type="text"
              variant='outlined'
              color='secondary'
              label="Email"
              className='custom-textfield'
              onChange={e => setEmail(e.target.value)}
              value={email}
              style={{ maxWidth: '800px' }}
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="password"
              variant='outlined'
              color='secondary'
              label="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              className='custom-textfield'
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <Button variant="outlined" color="secondary" type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default Login