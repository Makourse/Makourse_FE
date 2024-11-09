import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Myplace from './Pages/MyPlace/Myplace';
import MyplaceSave from './Pages/MyPlace/MyplaceSave';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/myplace" element={<Myplace />} />
          <Route path="/myplace/save" element={<MyplaceSave />} />         
        </Routes>
    </Router>
  );
};

export default App;
