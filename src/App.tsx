import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Login from './pages/login/login';
import CreatePost from './pages/post/create';
import PostDetail from './pages/post/detail';
import PostList from './pages/post/list';

function App() {
  const appStyles: React.CSSProperties = {
    backgroundColor: 'rgb(254, 248, 190)', 
    minHeight: '100vh', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <Router>
      <Header />
      <div style={appStyles}>
        <Routes>
          <Route path="" element={<Navigate to="/auth/login" />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/post/list" element={<PostList />}></Route>
          <Route path="/post/create" element={<CreatePost />}></Route>
          <Route path='/post/detail/:id' element={<PostDetail />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
