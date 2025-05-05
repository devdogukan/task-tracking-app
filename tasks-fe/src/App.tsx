//import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

function App() {

  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/task-lists');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data.map((item: Task) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
