import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailCourse from './Pages/DetailCourse/DetailCourse';
import EditCourse from './Pages/EditCourse/EditCourse';
import Home from './Pages/Home/Home';
import EditProfile from './Pages/Home/EditProfile';
import Alarm from './Pages/Alarm/Alarm';
import CheckCourse from './Pages/CheckCourse/CheckCourse';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/check-course" element={<CheckCourse />} />
        <Route path="/edit-course" element={<EditCourse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/alarm" element={<Alarm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
