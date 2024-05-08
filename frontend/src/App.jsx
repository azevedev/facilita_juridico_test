/* eslint-disable react/no-unescaped-entities */
import './App.css'
import { useState, useEffect } from 'react';
import ActivityList from './ActivityList';

function App() {
  const [activities, setActivities] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1);
  const [prBtn, setPrBtn] = useState(-1);
  const [participants, setParticipants] = useState(1);
  const [partBtn, setPartBtn] = useState(-1);
  const [difficulty, setDifficulty] = useState(0);
  const [diffBtn, setDiffBtn] = useState(-1);
  const [type, setType] = useState('');

  const fetchActivities = async () => {
    const response = await fetch('http://localhost:5000/activities');
    const data = await response.json();
    setActivities(data);
  }

  // fetching User on mount
  useEffect(() => {
    fetchActivities();
  }, [])

  const getNewActivity = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/activities';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        minPrice: minPrice,
        maxPrice: maxPrice,
        participants: participants,
        difficulty: difficulty,
        type: type
      }),
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok || (response.status !== 200 && response.status !== 201) ) {
      alert(data.message);
      return;
    }
    setActivities([...activities, data]);
  }

  return (
    <>
      <div>Let's stop being lazy, shall we? </div>
      {
        // Creating a list of options for a new activity
      }
      <h5>
          <label>Price:</label><br/>
          <button onClick={() => {setMinPrice(0); setMaxPrice(0.02); setPrBtn(0)}} 
                  className={prBtn == 0? 'active' : ''}>
                  Free! 🎉
          </button>
          <button onClick={() => {setMinPrice(0.03); setMaxPrice(0.1); setPrBtn(1)}} 
                  className={prBtn == 1? 'active' : ''}>
                  Cheap 😎
          </button>
          <button onClick={() => {setMinPrice(0.1); setMaxPrice(0.4); setPrBtn(2)}} 
                  className={prBtn == 2? 'active' : ''}>
                  Expensive 💰
          </button>
          <button onClick={() => {setMinPrice(0.4); setMaxPrice(0.6); setPrBtn(3)}} 
                  className={prBtn == 3? 'active' : ''}>
                  Premium 🤑
          </button>
      </h5>

      
      <h5>
          <label>Participants:</label><br/>
          <button onClick={() => { setParticipants(1); setPartBtn(0) }}
                  className={partBtn == 0? 'active' : ''}>
                  Just me! 👋
          </button>
          <button onClick={() => { setParticipants(2); setPartBtn(1) }}
                  className={partBtn == 1? 'active' : ''}>
                  Couple 👀
          </button>
          <button onClick={() => { setParticipants(3); setPartBtn(2) }} 
                  className={partBtn == 2? 'active' : ''}>
                  Trio 🤸‍♀️
          </button>
          <button onClick={() => { setParticipants(4); setPartBtn(3) }} 
                  className={partBtn == 3? 'active' : ''}>
                  Squad 🍀
          </button>
          <button onClick={() => { setParticipants(5); setPartBtn(4) }} 
                  className={partBtn == 4? 'active' : ''}>
                  5+ 
          </button>
      </h5>

      <h5>
          <label>Difficulty:</label><br/>
          <button onClick={() => { setDifficulty(0); setDiffBtn(0) }}
                  className={diffBtn == 0? 'active' : ''}>
                  Easy-peasy 🍭
          </button>
          <button onClick={() => { setDifficulty(0.25); setDiffBtn(1) }}
                  className={diffBtn == 1? 'active' : ''}>
                  Normal 🙃
          </button>
          <button onClick={() => { setDifficulty(0.5); setDiffBtn(2) }} 
                  className={diffBtn == 2? 'active' : ''}>
                  Challenging 🤔
          </button>
          <button onClick={() => { setDifficulty(0.75); setDiffBtn(3) }} 
                  className={diffBtn == 3? 'active' : ''}>
                  Hard 😡
          </button>
          <button onClick={() => { setDifficulty(1); setDiffBtn(4) }} 
                  className={diffBtn == 4? 'active' : ''}>
                  Impossible 🥶
          </button>
      </h5>

      <h5>
          <label>Type:</label><br/>
          <select name='type' defaultValue={''} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="education">Education</option>
            <option value="recreational">Recreational</option>
            <option value="social">Social</option>
            <option value="diy">DIY</option>
            <option value="charity">Charity</option>
            <option value="cooking">Cooking</option>
            <option value="relaxation">Relaxation</option>
            <option value="music">Music</option>
            <option value="busywork">Busywork</option>
          </select>

      </h5>
      

      <h3><button onClick={getNewActivity}>Get new activity</button></h3>
      <ActivityList activities={activities} />
    </>
  )
}

export default App
