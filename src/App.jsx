import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Myplace01 from './Pages/MyPlace/Myplace01';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/myplace" element={<Myplace01 />} />
        </Routes>
    </Router>
  );
};

export default App;
