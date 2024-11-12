import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailCourse from './Pages/DetailCourse/DetailCourse';
import EditCourse from './Pages/EditCourse/EditCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/detail-course" element={<DetailCourse />} />
        <Route path="/edit-course" element={<EditCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
