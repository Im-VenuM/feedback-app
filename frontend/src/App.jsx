import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [feedback, setFeedback] = useState('');
  const [list, setList] = useState([]);

  const fetchFeedback = async () => {
    const res = await axios.get('http://127.0.0.1:8000/feedback');
    setList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8000/feedback', { text: feedback });
    setFeedback('');
    fetchFeedback();
  };

  useEffect(() => { fetchFeedback(); }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Feedback App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter feedback"
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {list.map((f, i) => (
          <li key={i}>{f.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
