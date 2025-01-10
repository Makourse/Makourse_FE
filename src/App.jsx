import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Myplace from './Pages/MyPlace/Myplace';
import MyplaceSave from './Pages/MyPlace/MyplaceSave';
import Meetingdate from './Pages/MeetingDate/MeetingDate';
import Myplacemap from './Pages/MyPlace/Myplacemap';
import DetailCourse from './Pages/DetailCourse/DetailCourse';
import Home from './Pages/Home/Home';
import EditProfile from './Pages/Home/EditProfile';
import Alarm from './Pages/Alarm/Alarm';
import CheckCourse from './Pages/CheckCourse/CheckCourse';
import Placedetail from './Pages/Placedetail/Placedetail';

const App = () => {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/myplace" element={<Myplace />} />
          <Route path="/myplace/save" element={<MyplaceSave />} />   
          <Route path="/meetingdate" element={<Meetingdate />} />  
          <Route path="/myplace/map" element={<Myplacemap/>} />
         <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/place-detail" element={<Placedetail />} />
        <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/check-course" element={<CheckCourse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/alarm" element={<Alarm/>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
