import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  // Fetch the message from the API on component load
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:3000/render/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setMessage(data.message); // Set the message from the API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessage();
  }, []); // Empty dependency array ensures this runs once on page load

  return (
    <div>
      <h1>{message ? message : 'Loading...'}</h1>
    </div>
  );
}

export default App
