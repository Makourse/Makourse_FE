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
import IntroPage from './Login/IntroPage/IntroPage';
import SignUpPage from './Login/SignUpPage/SignUpPage';
import OAuthCallback from './Login/OAuth/OAuthCallback';
import Setparticipant from './Pages/Setparticipant/Setparticipant'
import SetPlaceMap from './Pages/SetPlaces/SetPlace/SetPlaceMap';
import SetPlaceSave from './Pages/SetPlaces/SetPlace/SetPlaceSave';
import SetFirstMap from './Pages/SetPlaces/SetFirst/SetFirstMap';
import SetFirstSave from './Pages/SetPlaces/SetFirst/SetFirstSave';
import MyplaceDetail from './Pages/MyPlace/MyplaceDetail';

const App = () => {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/myplace" element={<Myplace />} />
          <Route path="/myplace/save" element={<MyplaceSave />} />   
          <Route path="/meetingdate" element={<Meetingdate />} />  
          <Route path="/myplace/map" element={<Myplacemap/>} />
          <Route path="/detail-course/:scheduleId" element={<DetailCourse />} />
          <Route path="/place-detail" element={<Placedetail />} />
         <Route path="/check-course" element={<CheckCourse />} />
         <Route path="/home" element={<Home />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/alarm" element={<Alarm/>} />
          <Route path="/account/:provider/callback" element={<OAuthCallback />} />
          <Route path="/setparticipant" element={<Setparticipant />} />       
          <Route path="/setplace/map" element={<SetPlaceMap />} />
          <Route path="/setplace/save" element={<SetPlaceSave />} />
          <Route path="/setfirst/map" element={<SetFirstMap />} />
          <Route path="/setfirst/save" element={<SetFirstSave />} />
          <Route path="/myplace/detail" element={<MyplaceDetail />} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
