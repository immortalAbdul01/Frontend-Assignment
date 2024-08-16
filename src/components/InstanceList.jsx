import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstances } from '../services/courseService';

const InstanceList = () => {
  const { year, semester } = useParams();
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    async function loadInstances() {
      const data = await fetchInstances(year, semester);
      setInstances(data);
    }
    loadInstances();
  }, [year, semester]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Instances for {year}, Semester {semester}</h1>
      <ul>
        {instances.map(instance => (
          <li key={instance.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p>Course ID: {instance.courseId}</p>
            {/* Add more instance details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstanceList;
