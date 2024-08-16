import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import CourseDetails from './components/CourseDetails';
import CreateCourseForm from './components/CourseForm';
import NotFound from './pages/NotFound';
import InstanceList from './components/InstanceList';
import InstanceDetails from './components/InstanceDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:code" element={<CourseDetails />} />
        <Route path="/create-course" element={<CreateCourseForm />} />
        <Route path="/instances/:year/:semester" element={<InstanceList />} />
        <Route path="/instances/:year/:semester/:id" element={<InstanceDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
