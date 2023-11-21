import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Card from './components/Card';
import Auction from './components/Auction';
import Profile from './components/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp'
import Create from './components/Create';
import About from './components/About';
import Search from './components/Search';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Search/>}/>
        <Route path="/cars/:id" element={<Auction/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
  );
}

export default App;
