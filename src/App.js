import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
      <Header />

      {/* Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create-blog' element={
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>} />
        <Route path='/blogs' element={<Blogs />} />

      </Routes>
    </div>
  );
}

export default App;
