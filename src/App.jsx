import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailCourse from './Pages/DetailCourse/DetailCourse';
import EditCourse from './Pages/EditCourse/EditCourse';
import Home from './Pages/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/edit-course" element={<EditCourse />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
