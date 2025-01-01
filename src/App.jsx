import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailCourse from './Pages/DetailCourse/DetailCourse';
import EditCourse from './Pages/EditCourse/EditCourse';
import Placedetail from './Pages/Placedetail/Placedetail';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/place-detail" element={<Placedetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
