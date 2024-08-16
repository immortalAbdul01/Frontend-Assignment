import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInstanceDetails } from '../services/courseService';

const InstanceDetails = () => {
  const { year, semester, id } = useParams();
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    async function loadInstance() {
      const data = await fetchInstanceDetails(year, semester, id);
      setInstance(data);
    }
    loadInstance();
  }, [year, semester, id]);

  if (!instance) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Course Instance Details</h1>
      <p>Year: {instance.year}</p>
      <p>Semester: {instance.semester}</p>
      {/* Add more details */}
    </div>
  );
};

export default InstanceDetails;
