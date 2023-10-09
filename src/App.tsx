import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import CreatePost from './pages/post/create';
import PostDetail from './pages/post/detail';
import PostList from './pages/post/list';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to="/auth/login" />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/post/list" element={<PostList />}></Route>
        <Route path="/post/create" element={<CreatePost />}></Route>
        <Route path='/post/detail/:id' element={<PostDetail />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
