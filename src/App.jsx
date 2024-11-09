import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Myplace from './Pages/MyPlace/Myplace';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/myplace" element={<Myplace />} />
        </Routes>
    </Router>
  );
};

export default App;
