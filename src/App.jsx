import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Myplace from './Pages/MyPlace/Myplace';
import MyplaceSave from './Pages/MyPlace/MyplaceSave';
import Meetingdate from './Pages/MeetingDate/MeetingDate';
import Myplacemap from './Pages/MyPlace/Myplacemap';
import DetailCourse from './Pages/DetailCourse/DetailCourse';
import EditCourse from './Pages/EditCourse/EditCourse';
import Placedetail from './Pages/Placedetail/Placedetail';
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/myplace" element={<Myplace />} />
          <Route path="/myplace/save" element={<MyplaceSave />} />   
          <Route path="/meetingdate" element={<Meetingdate />} />  
          <Route path="/myplace/map" element={<Myplacemap/>} />
         <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/place-detail" element={<Placedetail />} />
        </Routes>
    </Router>
  );
};

export default App;
