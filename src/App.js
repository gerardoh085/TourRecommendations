import logo from './logo.svg';
import {useState, useEffect} from 'react';
// import './App.css';
import './styles.css';
import Tours from './Tours.js';
import React from 'react';
import Loading from './Loading.js';
const url = 'https://course-api.com/react-tours-project';

function App() {

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id)=>{
    const newTours = tours.filter((tour)=>tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async() =>{
    setLoading(true);
    try {
      const response = await fetch(url);
      const tour = await response.json();
      setLoading(false);
      setTours(tour);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchTours();
  },[])

   if(loading){
      return(
        <main className='loading'>
          <Loading />
        </main>
      );
   }
   if(tours.length === 0){
    return <main>
      <div className='title'>
          <h2>No Tours Left</h2>
          <button className='btn' onClick={fetchTours}>Refresh</button>
      </div>
    </main>
   }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  );
}

export default App;
