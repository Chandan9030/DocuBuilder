import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';

const Protected = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.message);
      } catch (err) {
        setError('Failed to fetch protected data');
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{data}</p>
      {error && <p>{error}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Protected;