import './App.css';
import Header from './components/Header';
import ParkingPermitTable from './components/ParkingPermitTable';
import { useState, useEffect } from "react";

const API_URL = 'http://localhost:8080/api/permit';

const App = () => {
  const [permits, setPermits] = useState([]);

  useEffect(() => {
    const getPermits = async () => {
      const permitsFromServer = await fetchPermits()
      setPermits(permitsFromServer)
    }

    getPermits()
  }, [])

  // Fetch Permits
  const fetchPermits = async () => {
    const data = await fetch(API_URL).then((res) => res.json());

    return data
  }

  return (
    <div>
      <Header />
      <ParkingPermitTable permits={permits}/>
    </div>
  );
}

export default App;
