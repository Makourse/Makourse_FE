import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Myplace from './Pages/MyPlace/Myplace';
import MyplaceSave from './Pages/MyPlace/MyplaceSave';
import Meetingdate from './Pages/MeetingDate/MeetingDate';
import Myplacemap from './Pages/MyPlace/Myplacemap';
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/myplace" element={<Myplace />} />
          <Route path="/myplace/save" element={<MyplaceSave />} />   
          <Route path="/meetingdate" element={<Meetingdate />} />  
          <Route path="/myplace/map" element={<Myplacemap/>} />
        </Routes>
    </Router>
  );
};

export default App;
