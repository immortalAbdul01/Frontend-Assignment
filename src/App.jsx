import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import CourseDetails from './components/CourseDetails';
import CreateCourseForm from './components/CourseForm';
import NotFound from './pages/NotFound';
import InstanceList from './components/InstanceList';
import InstanceDetails from './components/InstanceDetails';
import CreateInstance from './components/CreateInstance';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:code" element={<CourseDetails />} />
        <Route path="/create-course" element={<CreateCourseForm />} />
        <Route path="/course-instances" exact element={<InstanceList/>} />
        <Route path="/course/:code/create-instance" exact element={<CreateInstance/>} />
        <Route path="/course/:code/instances/:year/:semester/:id" exact element={<InstanceDetails/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
